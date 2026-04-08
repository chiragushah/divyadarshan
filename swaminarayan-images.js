// swaminarayan-images.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const { put } = require('@vercel/blob')

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

// Verified Wikipedia image URLs for each Swaminarayan temple
const TEMPLE_IMAGES = {
  'swaminarayan-mandir-kalupur-ahmedabad': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Ahmedabad_Swaminarayan_Temple.jpg/800px-Ahmedabad_Swaminarayan_Temple.jpg',
  'swaminarayan-mandir-bhuj': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Swaminarayan_Temple_Bhuj.jpg/800px-Swaminarayan_Temple_Bhuj.jpg',
  'swaminarayan-mandir-vadtal': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Vadtal_Swaminarayan_Temple.jpg/800px-Vadtal_Swaminarayan_Temple.jpg',
  'swaminarayan-akshardham-delhi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Akshardham_%28Delhi%29_in_October_2014.jpg/800px-Akshardham_%28Delhi%29_in_October_2014.jpg',
  'baps-akshardham-gandhinagar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Akshardham_Gandhinagar.jpg/800px-Akshardham_Gandhinagar.jpg',
  'baps-sarangpur-hanuman-temple': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Lete_Hanuman_Ji_Mandir.jpg/800px-Lete_Hanuman_Ji_Mandir.jpg',
}

// Fallback — use Akshardham Delhi image for all others
const FALLBACK_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Akshardham_%28Delhi%29_in_October_2014.jpg/800px-Akshardham_%28Delhi%29_in_October_2014.jpg'

async function downloadAndUpload(url, slug) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'DivyaDarshan/1.0 (https://divyadarshan.in; chirag@dynaimers.com)',
        'Accept': 'image/jpeg,image/png,image/*',
        'Referer': 'https://en.wikipedia.org/',
      },
      signal: AbortSignal.timeout(20000)
    })
    if (!res.ok) {
      console.log('  HTTP', res.status, 'for', url.slice(0, 60))
      return null
    }
    const buffer = await res.arrayBuffer()
    if (buffer.byteLength < 5000) {
      console.log('  Too small:', buffer.byteLength, 'bytes')
      return null
    }
    const blob = await put(`temples/${slug}-sw.jpg`, Buffer.from(buffer), {
      access: 'public',
      token: BLOB_TOKEN,
      contentType: 'image/jpeg',
    })
    return blob.url
  } catch(e) {
    console.log('  Error:', e.message)
    return null
  }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  // Get all Swaminarayan temples missing blob images
  const temples = await T.find({
    type: 'Swaminarayan',
    $or: [{ blob_image_url: { $exists: false } }, { blob_image_url: '' }, { blob_image_url: null }]
  }, { name: 1, slug: 1 }).lean()

  console.log('Swaminarayan temples needing images:', temples.length)

  let fixed = 0
  let failed = 0

  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]
    process.stdout.write(`[${i+1}/${temples.length}] ${t.name}... `)

    // Try specific image first, then fallback
    const imageUrl = TEMPLE_IMAGES[t.slug] || FALLBACK_URL
    const isSpecific = !!TEMPLE_IMAGES[t.slug]

    const blobUrl = await downloadAndUpload(imageUrl, t.slug)

    if (blobUrl) {
      await T.updateOne({ _id: t._id }, { $set: { blob_image_url: blobUrl, image_url: blobUrl } })
      console.log(isSpecific ? '✅ Specific image' : '✅ Akshardham fallback')
      fixed++
    } else if (!isSpecific) {
      // Already tried fallback, set a placeholder
      console.log('❌ Failed')
      failed++
    } else {
      // Try fallback
      process.stdout.write('  Trying fallback... ')
      const fallbackUrl = await downloadAndUpload(FALLBACK_URL, t.slug + '-fb')
      if (fallbackUrl) {
        await T.updateOne({ _id: t._id }, { $set: { blob_image_url: fallbackUrl, image_url: fallbackUrl } })
        console.log('✅ Fallback')
        fixed++
      } else {
        console.log('❌ Failed')
        failed++
      }
    }

    await new Promise(r => setTimeout(r, 1500))
  }

  const total = await T.countDocuments()
  const swami = await T.countDocuments({ type: 'Swaminarayan', blob_image_url: { $exists: true, $ne: '' } })

  console.log('\n=== Done! ===')
  console.log('Fixed:', fixed, '| Failed:', failed)
  console.log('Swaminarayan temples with images:', swami)
  console.log('Total temples:', total)

  await mongoose.disconnect()
}

main().catch(console.error)
