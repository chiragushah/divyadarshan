// fix-jain-images.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const { put } = require('@vercel/blob')

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

// Wikipedia page titles for temples with wrong images
const FIX_IMAGES = [
  // Sai Baba image group
  { slug: 'ellora-jain-caves', page: 'Ellora_Caves' },
  { slug: 'shravanabelagola-bahubali-temple', page: 'Shravanabelagola' },
  { slug: 'antriksh-parshwanath-jain-temple', page: 'Jain_temple' },
  { slug: 'chandragiri-jain-temple-sravanabelagola', page: 'Shravanabelagola' },
  { slug: 'pavapuri-jal-mandir', page: 'Pawapuri' },
  { slug: 'shri-digambar-jain-atishaya-kshetra-mangitungi', page: 'Mangi_Tungi' },
  { slug: 'ellora-jain-cave-32-indra-sabha', page: 'Ellora_Caves' },
  { slug: 'tijara-fort-jain-temple', page: 'Tijara_Fort' },
  { slug: 'bhandasar-jain-temple', page: 'Bikaner' },
  // Kangra Fort image group
  { slug: 'muchhal-mahavir-temple', page: 'Ranakpur_Jain_temple' },
  { slug: 'rishabhdeo-temple-dhulev', page: 'Rishabhdeo' },
  { slug: 'narlai-jain-temples', page: 'Ranakpur_Jain_temple' },
  { slug: 'gir-somnath-jain-temples', page: 'Palitana_temples' },
  { slug: 'modasa-jain-temple', page: 'Hutheesing_Jain_Temple' },
  { slug: 'varanga-jain-temple', page: 'Shravanabelagola' },
  { slug: 'deogarh-jain-temples', page: 'Khajuraho_Group_of_Monuments' },
  { slug: 'kalugumalai-jain-rock-cut-temples', page: 'Kalugumalai' },
  { slug: 'sittannavasal-cave-temple', page: 'Sittannavasal' },
  { slug: 'antri-jain-temple-nagpur', page: 'Nagpur' },
  { slug: 'rishikesh-jain-temple', page: 'Rishikesh' },
]

async function getWikipediaImage(pageTitle) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DivyaDarshanam/1.0 (https://divyadarshanam.in)' },
      signal: AbortSignal.timeout(15000)
    })
    if (!res.ok) return null
    const data = await res.json()
    return data.originalimage?.source || data.thumbnail?.source || null
  } catch(e) { return null }
}

async function downloadAndUpload(imageUrl, slug) {
  try {
    const res = await fetch(imageUrl, {
      headers: { 'User-Agent': 'DivyaDarshanam/1.0', 'Referer': 'https://en.wikipedia.org/' },
      signal: AbortSignal.timeout(25000)
    })
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    if (buffer.byteLength < 5000) return null
    const ext = imageUrl.match(/\.(jpg|jpeg|png)/i)?.[1]?.toLowerCase() || 'jpg'
    const blob = await put(`temples/jain2-${slug}.${ext}`, Buffer.from(buffer), {
      access: 'public', token: BLOB_TOKEN,
      contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
    })
    return blob.url
  } catch(e) { return null }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  const imageCache = {}
  let fixed = 0

  console.log(`\nFixing ${FIX_IMAGES.length} Jain temples with wrong images...\n`)

  for (const { slug, page } of FIX_IMAGES) {
    const temple = await T.findOne({ slug }, { name: 1 }).lean()
    if (!temple) { console.log(`SKIP ${slug} — not found`); continue }

    process.stdout.write(`${temple.name}... `)

    // Get from cache or Wikipedia
    let imageUrl = imageCache[page]
    if (!imageUrl) {
      imageUrl = await getWikipediaImage(page)
      if (imageUrl) imageCache[page] = imageUrl
      await new Promise(r => setTimeout(r, 500))
    }

    if (!imageUrl) { console.log('No image found'); continue }

    const blobUrl = await downloadAndUpload(imageUrl, slug)
    if (blobUrl) {
      await T.updateOne({ slug }, { $set: { blob_image_url: blobUrl, image_url: blobUrl } })
      console.log('✅')
      fixed++
    } else {
      console.log('❌ Download failed')
    }
    await new Promise(r => setTimeout(r, 1000))
  }

  console.log(`\n=== Done! Fixed: ${fixed}/${FIX_IMAGES.length} ===`)
  await mongoose.disconnect()
}

main().catch(console.error)
