// Seeds scraped temples from JSON file into MongoDB
// Run AFTER scrape-temples.js: node scripts/seed-scraped-temples.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const fs = require('fs')

const MONGODB_URI = process.env.MONGODB_URI

async function main() {
  if (!fs.existsSync('scripts/scraped-temples.json')) {
    console.error('Run scrape-temples.js first!')
    process.exit(1)
  }

  const temples = JSON.parse(fs.readFileSync('scripts/scraped-temples.json', 'utf8'))
  console.log('Temples to insert: ' + temples.length)

  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db

  // Double check deduplication against current DB
  const existing = await db.collection('temples').find({}, { projection: { slug: 1, name: 1 } }).toArray()
  const existingSlugs = new Set(existing.map(t => t.slug))
  const existingNames = new Set(existing.map(t => t.name.toLowerCase().trim()))

  const toInsert = temples.filter(t =>
    !existingSlugs.has(t.slug) && !existingNames.has(t.name.toLowerCase().trim())
  )

  console.log('After dedup: ' + toInsert.length + ' new temples to add')
  console.log('Skipping: ' + (temples.length - toInsert.length) + ' duplicates\n')

  if (toInsert.length === 0) {
    console.log('Nothing to insert!')
    await mongoose.disconnect()
    return
  }

  // Insert in batches of 50
  let inserted = 0
  const batchSize = 50
  for (let i = 0; i < toInsert.length; i += batchSize) {
    const batch = toInsert.slice(i, i + batchSize)
    await db.collection('temples').insertMany(batch, { ordered: false })
    inserted += batch.length
    console.log('Inserted ' + inserted + '/' + toInsert.length)
  }

  console.log('\nDone! Added ' + inserted + ' new temples to MongoDB')
  console.log('Total temples now: ' + (existing.length + inserted))
  console.log('\nNext steps:')
  console.log('1. node scripts/upload-images.js   (upload Wikipedia images to Vercel Blob)')
  console.log('2. node scripts/seed-nearby.js     (add nearby places)')
  console.log('3. node scripts/seed-poojas.ts     (add pooja data)')

  await mongoose.disconnect()
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1) })
