// fetch-temple-images.js
// Fetches Wikimedia Commons images for all temples and updates MongoDB
// Run with: node fetch-temple-images.js

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local')
  process.exit(1)
}

// ── Wikimedia image fetcher ────────────────────────────────────────────────
async function fetchWikimediaImage(templeName, city, state) {
  const queries = [
    `${templeName}`,
    `${templeName} ${city}`,
    `${templeName} temple`,
    `${city} ${state} temple`,
  ]

  for (const q of queries) {
    try {
      // Step 1: Search Wikipedia for the page
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=1&origin=*`
      const searchRes = await fetch(searchUrl)
      const searchData = await searchRes.json()
      const pages = searchData?.query?.search
      if (!pages || pages.length === 0) continue

      const pageId = pages[0].pageid

      // Step 2: Get images from that page
      const imgUrl = `https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=pageimages&format=json&pithumbsize=800&origin=*`
      const imgRes = await fetch(imgUrl)
      const imgData = await imgRes.json()
      const pageInfo = imgData?.query?.pages?.[pageId]
      const thumb = pageInfo?.thumbnail?.source

      if (thumb) {
        // Upgrade to higher resolution
        const hiRes = thumb.replace(/\/\d+px-/, '/800px-')
        console.log(`  ✅ Found: ${q} → ${hiRes.substring(0, 60)}...`)
        return hiRes
      }
    } catch (e) {
      // Continue to next query
    }
  }

  // Step 3: Try Wikimedia Commons search as fallback
  try {
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(templeName + ' temple india')}&srnamespace=6&format=json&srlimit=1&origin=*`
    const commonsRes = await fetch(commonsUrl)
    const commonsData = await commonsRes.json()
    const files = commonsData?.query?.search
    if (files && files.length > 0) {
      const fileName = files[0].title.replace('File:', '')
      const encodedName = encodeURIComponent(fileName)
      const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodedName}&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`
      const infoRes = await fetch(infoUrl)
      const infoData = await infoRes.json()
      const pages2 = infoData?.query?.pages
      const pageKey = Object.keys(pages2 || {})[0]
      const imageUrl = pages2?.[pageKey]?.imageinfo?.[0]?.thumburl
      if (imageUrl) {
        console.log(`  ✅ Commons: ${templeName} → ${imageUrl.substring(0, 60)}...`)
        return imageUrl
      }
    }
  } catch (e) {}

  console.log(`  ⚠️  No image found for: ${templeName}`)
  return null
}

// ── Sleep helper to avoid rate limiting ───────────────────────────────────
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔗 Connecting to MongoDB Atlas…')
  await mongoose.connect(MONGODB_URI)

  const Temple = mongoose.model('Temple', new mongoose.Schema({
    name:      String,
    city:      String,
    state:     String,
    image_url: String,
    slug:      String,
  }, { strict: false }))

  // Only fetch for temples missing images
  const temples = await Temple.find({
    $or: [
      { image_url: { $exists: false } },
      { image_url: null },
      { image_url: '' },
    ]
  }).lean()

  console.log(`\n🛕 Found ${temples.length} temples without images\n`)

  let updated = 0
  let failed  = 0

  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]
    console.log(`[${i + 1}/${temples.length}] ${t.name}`)

    const imageUrl = await fetchWikimediaImage(t.name, t.city, t.state)

    if (imageUrl) {
      await Temple.updateOne({ _id: t._id }, { $set: { image_url: imageUrl } })
      updated++
    } else {
      failed++
    }

    // Rate limit: 1 request per 300ms
    await sleep(300)
  }

  console.log(`\n✅ Done!`)
  console.log(`   Updated: ${updated} temples`)
  console.log(`   No image found: ${failed} temples`)

  await mongoose.disconnect()
  console.log('🔌 Disconnected.')
}

main().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
