require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

async function main() {
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db

  // Check what image URLs we have
  const temples = await db.collection('temples').find({}).limit(20).toArray()
  
  console.log('Sample image URLs:\n')
  for (const t of temples) {
    const hasBlob = !!t.blob_image_url
    const hasImg = !!t.image_url
    console.log(t.name + ':')
    console.log('  blob: ' + (hasBlob ? t.blob_image_url?.slice(0,60) : 'none'))
    console.log('  img:  ' + (hasImg ? t.image_url?.slice(0,80) : 'none'))
  }

  // Count stats
  const total = await db.collection('temples').countDocuments()
  const withBlob = await db.collection('temples').countDocuments({ blob_image_url: { $exists: true } })
  const withImg = await db.collection('temples').countDocuments({ image_url: { $exists: true, $ne: '' } })
  const noImg = await db.collection('temples').countDocuments({ $or: [{ image_url: { $exists: false } }, { image_url: '' }] })

  console.log('\nStats:')
  console.log('Total temples: ' + total)
  console.log('With Blob image: ' + withBlob)
  console.log('With any image URL: ' + withImg)
  console.log('No image at all: ' + noImg)

  await mongoose.disconnect()
}

main().catch(console.error)
