// fetch-temple-contacts.js
// Fetches website, phone, address, entry fee from Wikipedia for all temples
// Run with: node fetch-temple-contacts.js

require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local')
  process.exit(1)
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

// ── Clean Wikipedia markup ─────────────────────────────────────────────────
function cleanWikiText(text) {
  if (!text) return null
  return text
    .replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, '$2')  // [[link|text]] → text
    .replace(/\{\{[^}]+\}\}/g, '')                     // remove templates
    .replace(/'{2,3}/g, '')                             // remove bold/italic
    .replace(/<[^>]+>/g, '')                            // remove HTML tags
    .replace(/\s+/g, ' ')
    .trim()
}

// ── Extract fields from Wikipedia infobox ─────────────────────────────────
function parseInfobox(wikitext) {
  const result = {
    website:    null,
    phone:      null,
    address:    null,
    entry_fee:  null,
    governance: null,
  }

  if (!wikitext) return result

  // Website
  const websiteMatch = wikitext.match(/\|\s*website\s*=\s*([^\n|]+)/i)
    || wikitext.match(/\|\s*url\s*=\s*([^\n|]+)/i)
  if (websiteMatch) {
    const raw = websiteMatch[1].trim()
    // Extract URL from {{URL|...}} template
    const urlTemplate = raw.match(/\{\{URL\|([^}|]+)/i)
    result.website = urlTemplate
      ? urlTemplate[1].trim()
      : raw.replace(/\[\[|\]\]/g, '').replace(/\[([^\s]+)\s.*\]/, '$1').trim()
    if (!result.website.startsWith('http') && result.website.includes('.')) {
      result.website = 'https://' + result.website
    }
    if (!result.website.includes('.')) result.website = null
  }

  // Phone
  const phoneMatch = wikitext.match(/\|\s*phone\s*=\s*([^\n|]+)/i)
    || wikitext.match(/\|\s*telephone\s*=\s*([^\n|]+)/i)
    || wikitext.match(/\|\s*contact\s*=\s*([^\n|]+)/i)
  if (phoneMatch) result.phone = cleanWikiText(phoneMatch[1])

  // Address / location
  const addressMatch = wikitext.match(/\|\s*address\s*=\s*([^\n|]+)/i)
    || wikitext.match(/\|\s*location\s*=\s*([^\n|]+)/i)
  if (addressMatch) result.address = cleanWikiText(addressMatch[1])

  // Entry fee
  const feeMatch = wikitext.match(/\|\s*(?:entry[_\s]?fee|fees?|admission)\s*=\s*([^\n|]+)/i)
  if (feeMatch) result.entry_fee = cleanWikiText(feeMatch[1])

  // Governance / trust
  const govMatch = wikitext.match(/\|\s*(?:governing[_\s]?body|trust|board|managed[_\s]?by|administered[_\s]?by)\s*=\s*([^\n|]+)/i)
  if (govMatch) result.governance = cleanWikiText(govMatch[1])

  return result
}

// ── Fetch Wikipedia data for a temple ─────────────────────────────────────
async function fetchTempleContacts(name, city, state) {
  const queries = [
    name,
    `${name} ${city}`,
    `${name} temple`,
    `${name} ${state}`,
  ]

  for (const q of queries) {
    try {
      // Search Wikipedia
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=1&origin=*`
      const searchRes = await fetch(searchUrl)
      const searchData = await searchRes.json()
      const pages = searchData?.query?.search
      if (!pages || pages.length === 0) continue

      const pageTitle = pages[0].title

      // Get raw wikitext to parse infobox
      const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=revisions&rvprop=content&rvslots=main&format=json&origin=*`
      const contentRes = await fetch(contentUrl)
      const contentData = await contentRes.json()
      const pagesObj = contentData?.query?.pages
      const pageKey = Object.keys(pagesObj || {})[0]
      const wikitext = pagesObj?.[pageKey]?.revisions?.[0]?.slots?.main?.['*']

      if (!wikitext) continue

      const result = parseInfobox(wikitext)

      // Also try to extract external links section for official site
      if (!result.website) {
        const extLinkMatch = wikitext.match(/\[https?:\/\/(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s\]]*)\s+(?:Official|Website|official website)/i)
        if (extLinkMatch) {
          result.website = extLinkMatch[0].replace(/\[([^\s]+)\s.*/, '$1').replace('[', '')
        }
      }

      // Check if we got anything useful
      if (result.website || result.phone || result.entry_fee || result.governance) {
        return result
      }

      // Got wikitext but no infobox fields — still return with Wikipedia URL
      return {
        ...result,
        wikipedia_url: `https://en.wikipedia.org/wiki/${encodeURIComponent(pageTitle.replace(/ /g, '_'))}`,
      }

    } catch (e) {
      continue
    }
  }

  return null
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('🔗 Connecting to MongoDB Atlas…')
  await mongoose.connect(MONGODB_URI)

  const Temple = mongoose.model('Temple', new mongoose.Schema({
    name:         String,
    city:         String,
    state:        String,
    website:      String,
    phone:        String,
    address_full: String,
    entry_fee:    String,
    governance:   String,
    wikipedia_url: String,
  }, { strict: false }))

  const temples = await Temple.find({}).lean()
  console.log(`\n🛕 Processing ${temples.length} temples...\n`)

  let updated   = 0
  let noData    = 0
  let hasWebsite = 0
  let hasPhone   = 0

  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]
    process.stdout.write(`[${i + 1}/${temples.length}] ${t.name}... `)

    const data = await fetchTempleContacts(t.name, t.city, t.state)

    if (data) {
      const updateFields = {}
      if (data.website)      { updateFields.website       = data.website;       hasWebsite++ }
      if (data.phone)        { updateFields.phone         = data.phone;         hasPhone++   }
      if (data.address)      { updateFields.address_full  = data.address               }
      if (data.entry_fee)    { updateFields.entry_fee     = data.entry_fee              }
      if (data.governance)   { updateFields.governance    = data.governance             }
      if (data.wikipedia_url){ updateFields.wikipedia_url = data.wikipedia_url          }

      if (Object.keys(updateFields).length > 0) {
        await Temple.updateOne({ _id: t._id }, { $set: updateFields })
        updated++
        const tags = [
          data.website    ? '🌐' : '',
          data.phone      ? '📞' : '',
          data.entry_fee  ? '🎟️' : '',
          data.governance ? '🏛️' : '',
        ].filter(Boolean).join('')
        console.log(`✅ ${tags}`)
      } else {
        console.log('📖 Wikipedia found, no contact fields')
        noData++
      }
    } else {
      console.log('⚠️  Not found')
      noData++
    }

    await sleep(400)
  }

  console.log(`\n✅ Done!`)
  console.log(`   Updated:       ${updated} temples`)
  console.log(`   With website:  ${hasWebsite} temples`)
  console.log(`   With phone:    ${hasPhone} temples`)
  console.log(`   No data:       ${noData} temples`)

  await mongoose.disconnect()
  console.log('🔌 Disconnected.')
}

main().catch(err => {
  console.error('Failed:', err)
  process.exit(1)
})
