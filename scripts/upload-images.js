require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const { put } = require('@vercel/blob')

const MONGODB_URI = process.env.MONGODB_URI
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

// Wikipedia thumbnail URLs have a pattern - extract the direct file URL
function getDirectImageUrl(url) {
  if (!url) return null
  
  // Convert thumb URL to direct URL
  // From: https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Konarka_Temple.jpg/600px-Konarka_Temple.jpg
  // To:   https://upload.wikimedia.org/wikipedia/commons/4/47/Konarka_Temple.jpg
  if (url.includes('/thumb/')) {
    const parts = url.split('/thumb/')
    if (parts.length === 2) {
      const pathParts = parts[1].split('/')
      // Remove last element (the sized filename like "600px-xxx.jpg")
      pathParts.pop()
      return parts[0] + '/' + pathParts.join('/')
    }
  }
  return url
}

async function downloadWithRetry(url, retries = 3) {
  const headers = {
    'User-Agent': 'DivyaDarshan/1.0 (https://divyadarshan.in; chirag@dynaimers.com) node-fetch',
    'Accept': 'image/jpeg,image/png,image/*',
    'Referer': 'https://en.wikipedia.org/',
  }
  
  for (let i = 0; i < retries; i++) {
    try {
      // Try direct URL first
      const directUrl = getDirectImageUrl(url)
      const res = await fetch(directUrl, { headers })
      
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer())
        if (buffer.length > 5000) return buffer // Valid image
      }
      
      // Try original thumb URL
      const res2 = await fetch(url, { headers })
      if (res2.ok) {
        const buffer = Buffer.from(await res2.arrayBuffer())
        if (buffer.length > 5000) return buffer
      }
      
      await new Promise(r => setTimeout(r, 1000 * (i + 1)))
    } catch (e) {
      await new Promise(r => setTimeout(r, 1000))
    }
  }
  return null
}

async function main() {
  console.log('BLOB TOKEN:', BLOB_TOKEN ? BLOB_TOKEN.slice(0,15) + '...' : 'MISSING!')
  if (!BLOB_TOKEN) { process.exit(1) }

  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db

  const temples = await db.collection('temples').find({
    image_url: { $exists: true, $nin: ['', null] },
    blob_image_url: { $exists: false }
  }).toArray()

  console.log('Temples to process: ' + temples.length + '\n')

  let uploaded = 0, failed = 0

  for (const temple of temples) {
    try {
      process.stdout.write('► ' + temple.name.slice(0, 40).padEnd(40) + ' ')
      
      const imageData = await downloadWithRetry(temple.image_url)

      if (!imageData) {
        failed++
        process.stdout.write('SKIP\n')
        continue
      }

      const ext = temple.image_url.toLowerCase().includes('.png') ? 'png' : 'jpg'
      const blob = await put('temples/' + temple.slug + '.' + ext, imageData, {
        access: 'public',
        contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
        token: BLOB_TOKEN,
      })

      await db.collection('temples').updateOne(
        { _id: temple._id },
        { $set: { image_url: blob.url, blob_image_url: blob.url, image_source: 'vercel_blob' } }
      )

      uploaded++
      process.stdout.write('OK (' + Math.round(imageData.length/1024) + 'KB)\n')
    } catch (e) {
      failed++
      process.stdout.write('ERR: ' + e.message.slice(0, 40) + '\n')
    }

    // Respectful delay
    await new Promise(r => setTimeout(r, 600))
  }

  console.log('\n✅ Done! Uploaded: ' + uploaded + ' | Failed: ' + failed)
  console.log('Total on Blob: ' + (14 + uploaded) + '/' + (temples.length + 14))
  await mongoose.disconnect()
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1) })
