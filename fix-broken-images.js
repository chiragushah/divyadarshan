// fix-broken-images.js
// Checks all temple image URLs and re-fetches broken ones from Wikipedia
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function fetchWikimediaImage(name, city, state) {
  const queries = [name, `${name} temple`, `${name} ${city}`, `${name} ${state}`]
  for (const q of queries) {
    try {
      const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&srlimit=1&origin=*`)
      const searchData = await searchRes.json()
      const pages = searchData?.query?.search
      if (!pages?.length) continue
      const pageId = pages[0].pageid
      const imgRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=pageimages&format=json&pithumbsize=800&origin=*`)
      const imgData = await imgRes.json()
      const thumb = imgData?.query?.pages?.[pageId]?.thumbnail?.source
      if (thumb) return thumb.replace(/\/\d+px-/, '/800px-')
    } catch(e) {}
  }
  return null
}

async function main() {
  console.log('🔗 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)

  const Temple = mongoose.model('Temple', new mongoose.Schema({
    name: String, city: String, state: String, image_url: String
  }, { strict: false }))

  const temples = await Temple.find({}).lean()
  console.log(`\n🔍 Checking ${temples.length} temple image URLs...\n`)

  const broken = []

  // Check URLs in batches of 10
  for (let i = 0; i < temples.length; i += 10) {
    const batch = temples.slice(i, i + 10)
    await Promise.all(batch.map(async (t) => {
      try {
        const res = await fetch(t.image_url, {
          method: 'HEAD',
          headers: { 'User-Agent': 'DivyaDarshan/1.0' },
          signal: AbortSignal.timeout(5000)
        })
        if (!res.ok) {
          broken.push(t)
          process.stdout.write('✗')
        } else {
          process.stdout.write('.')
        }
      } catch(e) {
        broken.push(t)
        process.stdout.write('✗')
      }
    }))
    await sleep(200)
  }

  console.log(`\n\n❌ Found ${broken.length} broken image URLs\n`)

  if (broken.length === 0) {
    console.log('✅ All images are working!')
    await mongoose.disconnect()
    return
  }

  // Clear broken URLs and re-fetch
  console.log('🔄 Re-fetching broken images from Wikipedia...\n')
  let fixed = 0
  let failed = 0

  for (let i = 0; i < broken.length; i++) {
    const t = broken[i]
    process.stdout.write(`[${i+1}/${broken.length}] ${t.name}... `)

    // Clear the broken URL first
    await Temple.updateOne({ _id: t._id }, { $unset: { image_url: 1 } })

    const newUrl = await fetchWikimediaImage(t.name, t.city, t.state)
    if (newUrl) {
      await Temple.updateOne({ _id: t._id }, { $set: { image_url: newUrl } })
      console.log('✅')
      fixed++
    } else {
      console.log('⚠️  not found')
      failed++
    }
    await sleep(400)
  }

  console.log(`\n✅ Done!`)
  console.log(`   Fixed: ${fixed}`)
  console.log(`   Still missing: ${failed}`)
  await mongoose.disconnect()
  console.log('🔌 Disconnected.')
}

main().catch(err => { console.error(err); process.exit(1) })
