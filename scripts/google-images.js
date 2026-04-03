// Fetches temple images from Google Custom Search API and uploads to Vercel Blob
// Run: node scripts/google-images.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const { put } = require('@vercel/blob')

const MONGODB_URI = process.env.MONGODB_URI
const BLOB_TOKEN  = process.env.BLOB_READ_WRITE_TOKEN
const GOOGLE_API_KEY = 'AIzaSyBGGxF6L92_ZMvQhj-Dilk9d9o18dQzqpM'
const GOOGLE_CSE_ID  = 'f5a885404e5c243f5'

// Search Google Images for a temple
async function searchImage(templeName, city, state) {
  const query = `${templeName} ${city} ${state} temple India`
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${GOOGLE_CSE_ID}&q=${encodeURIComponent(query)}&searchType=image&num=3&imgSize=large&imgType=photo&safe=active`

  try {
    const res = await fetch(url)
    const data = await res.json()

    if (data.error) {
      console.log('  Google API error:', data.error.message)
      return null
    }

    const items = data.items || []
    // Return first valid image URL
    for (const item of items) {
      const imgUrl = item.link
      if (imgUrl && (imgUrl.includes('.jpg') || imgUrl.includes('.jpeg') || imgUrl.includes('.png') || imgUrl.includes('.webp'))) {
        return imgUrl
      }
    }
    return items[0]?.link || null
  } catch (e) {
    console.log('  Search error:', e.message)
    return null
  }
}

// Download image from URL
async function downloadImage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*',
      },
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    if (buffer.length < 5000) return null // Skip tiny images
    return buffer
  } catch {
    return null
  }
}

async function main() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db

  // Find temples WITHOUT blob images
  const temples = await db.collection('temples').find({
    blob_image_url: { $exists: false },
  }).toArray()

  console.log(`Temples needing images: ${temples.length}`)
  console.log(`Google API free quota: 100 searches/day\n`)

  let uploaded = 0, failed = 0, quota = 0
  const MAX_PER_RUN = 95 // Stay under 100/day limit

  for (const temple of temples) {
    if (quota >= MAX_PER_RUN) {
      console.log(`\nReached daily quota limit (${MAX_PER_RUN}). Run again tomorrow!`)
      break
    }

    process.stdout.write(`[${quota+1}] ${temple.name.slice(0, 40).padEnd(40)} `)

    // Search Google Images
    const imageUrl = await searchImage(temple.name, temple.city || '', temple.state || '')
    quota++

    if (!imageUrl) {
      failed++
      process.stdout.write('NO RESULT\n')
      continue
    }

    // Download the image
    const imageData = await downloadImage(imageUrl)
    if (!imageData) {
      failed++
      process.stdout.write('DOWNLOAD FAIL\n')
      continue
    }

    // Upload to Vercel Blob
    try {
      const ext = imageUrl.includes('.png') ? 'png' : 'jpg'
      const blob = await put(`temples/${temple.slug}.${ext}`, imageData, {
        access: 'public',
        contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
        token: BLOB_TOKEN,
      })

      await db.collection('temples').updateOne(
        { _id: temple._id },
        { $set: {
          image_url: blob.url,
          blob_image_url: blob.url,
          image_source: 'google_cse',
        }}
      )

      uploaded++
      process.stdout.write(`OK (${Math.round(imageData.length/1024)}KB)\n`)
    } catch (e) {
      failed++
      process.stdout.write(`BLOB ERR: ${e.message.slice(0,30)}\n`)
    }

    // Delay to be respectful
    await new Promise(r => setTimeout(r, 500))
  }

  console.log(`\n✅ Done! Uploaded: ${uploaded} | Failed: ${failed} | API calls used: ${quota}`)
  console.log(`Remaining quota today: ~${100 - quota}`)

  const total = await db.collection('temples').countDocuments({ blob_image_url: { $exists: true } })
  console.log(`Total temples with images: ${total}/356`)

  await mongoose.disconnect()
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1) })
