// Scrapes Hindu temples from Wikipedia API - no AI, no token limits
// Run: node scripts/scrape-temples.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const fs = require('fs')

const MONGODB_URI = process.env.MONGODB_URI

// Wikipedia categories to scrape
const WIKI_CATEGORIES = [
  'Hanuman_temples_in_India',
  'Krishna_temples_in_India',
  'Jain_temples_in_India',
  'Shiva_temples_in_India',
  'Vishnu_temples_in_India',
  'Durga_temples_in_India',
  'Ganesha_temples_in_India',
  'Rama_temples_in_India',
  'Murugan_temples_in_India',
  'Shakti_temples_in_India',
  'Buddhist_temples_in_India',
]

// Indian states for filtering
const INDIAN_STATES = [
  'andhra pradesh','arunachal pradesh','assam','bihar','chhattisgarh','goa','gujarat',
  'haryana','himachal pradesh','jharkhand','karnataka','kerala','madhya pradesh',
  'maharashtra','manipur','meghalaya','mizoram','nagaland','odisha','punjab',
  'rajasthan','sikkim','tamil nadu','telangana','tripura','uttar pradesh',
  'uttarakhand','west bengal','delhi','jammu','kashmir','ladakh','puducherry',
]

function isIndia(location) {
  if (!location) return false
  const l = location.toLowerCase()
  return INDIAN_STATES.some(s => l.includes(s)) || l.includes('india')
}

function slugify(name) {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function getDeity(category) {
  if (category.includes('Hanuman')) return 'Hanuman'
  if (category.includes('Krishna')) return 'Krishna'
  if (category.includes('Jain')) return 'Multiple/Jain'
  if (category.includes('Shiva')) return 'Shiva'
  if (category.includes('Vishnu')) return 'Vishnu'
  if (category.includes('Durga')) return 'Durga/Shakti'
  if (category.includes('Ganesha')) return 'Ganesha'
  if (category.includes('Rama')) return 'Rama'
  if (category.includes('Murugan')) return 'Murugan'
  if (category.includes('Shakti')) return 'Durga/Shakti'
  if (category.includes('Buddhist')) return 'Buddha'
  return 'Multiple'
}

async function getCategoryMembers(category) {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:' +
    category + '&cmlimit=500&cmnamespace=0&format=json&origin=*'
  try {
    const res = await fetch(url)
    const data = await res.json()
    return data.query?.categorymembers || []
  } catch (e) {
    console.log('Error fetching category ' + category + ': ' + e.message)
    return []
  }
}

async function getPageData(pageId) {
  const url = 'https://en.wikipedia.org/w/api.php?action=query&pageids=' + pageId +
    '&prop=extracts|pageimages|coordinates|categories&exintro=1&exchars=500' +
    '&piprop=original&pithumbsize=800&format=json&origin=*'
  try {
    const res = await fetch(url)
    const data = await res.json()
    const page = data.query?.pages?.[pageId]
    return page || null
  } catch (e) {
    return null
  }
}

function extractStateCity(text, title) {
  if (!text) return { state: '', city: '' }
  const lower = text.toLowerCase()

  let state = ''
  let city = ''

  // Find state
  for (const s of INDIAN_STATES) {
    if (lower.includes(s)) {
      state = s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      break
    }
  }

  // Try to extract city from title
  // Titles like "Hanuman Temple, Varanasi" or "Ram Mandir, Ayodhya"
  const titleParts = title.split(',')
  if (titleParts.length > 1) {
    city = titleParts[titleParts.length - 1].trim()
      .replace(/\(.*?\)/g, '').trim()
  }

  return { state, city }
}

async function main() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db

  // Get existing temple slugs to avoid duplicates
  const existing = await db.collection('temples').find({}, { projection: { slug: 1, name: 1 } }).toArray()
  const existingSlugs = new Set(existing.map(t => t.slug))
  const existingNames = new Set(existing.map(t => t.name.toLowerCase().trim()))
  console.log('Existing temples: ' + existing.length)

  const newTemples = []

  for (const category of WIKI_CATEGORIES) {
    console.log('\nScraping category: ' + category)
    const members = await getCategoryMembers(category)
    console.log('Found ' + members.length + ' pages')

    const deity = getDeity(category)

    for (const member of members) {
      // Small delay to be respectful to Wikipedia API
      await new Promise(r => setTimeout(r, 200))

      const pageData = await getPageData(member.pageid)
      if (!pageData) continue

      const title = pageData.title || member.title
      const extract = pageData.extract || ''
      const coords = pageData.coordinates?.[0]
      const imageUrl = pageData.original?.source || pageData.thumbnail?.source || ''

      // Skip non-India temples
      const { state, city } = extractStateCity(extract + ' ' + title, title)
      if (!isIndia(extract + ' ' + state)) continue

      // Skip if already exists
      const slug = slugify(title)
      const nameLower = title.toLowerCase().trim()
      if (existingSlugs.has(slug) || existingNames.has(nameLower)) {
        continue
      }

      // Build temple object
      const temple = {
        slug,
        name: title,
        state: state || 'India',
        city: city || state || 'India',
        deity,
        type: category.includes('Jain') ? 'Jain' : category.includes('Buddhist') ? 'Buddhist' : 'Temple',
        description: extract.replace(/<[^>]*>/g, '').slice(0, 300) || title + ' is a sacred temple in India.',
        categories: [deity],
        has_live: false,
        image_url: imageUrl,
        image_source: 'wikipedia',
        lat: coords?.lat || null,
        lng: coords?.lon || null,
        rating_avg: 0,
        rating_count: 0,
        nearby_places: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      newTemples.push(temple)
      existingSlugs.add(slug)
      existingNames.add(nameLower)
      console.log('+ ' + title + ' (' + state + ')')
    }
  }

  console.log('\n\nTotal new temples found: ' + newTemples.length)

  // Save to a JSON file for review before inserting
  fs.writeFileSync('scripts/scraped-temples.json', JSON.stringify(newTemples, null, 2))
  console.log('Saved to scripts/scraped-temples.json')
  console.log('Review the file then run: node scripts/seed-scraped-temples.js')

  await mongoose.disconnect()
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1) })
