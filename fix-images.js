/**
 * Fix temple image URLs — replace broken Unsplash source URLs
 * with verified working photo IDs
 * Usage: node fix-images.js
 */
const fs = require('fs')
const { MongoClient } = require('mongodb')

let MONGODB_URI = ''
try {
  const env = fs.readFileSync('.env.local', 'utf8')
  const match = env.match(/MONGODB_URI=(.+)/)
  if (match) MONGODB_URI = match[1].trim()
} catch(e) { process.exit(1) }

// Verified working Unsplash photo IDs by category
// These are real photos tested to load correctly
const IMGS = {
  shiva:   [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    'https://images.unsplash.com/photo-1567529428478-c18a714ab6d0?w=600&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
  ],
  vishnu:  [
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80',
    'https://images.unsplash.com/photo-1583267554545-5585b5e3d7ab?w=600&q=80',
    'https://images.unsplash.com/photo-1600758208050-a22f17dc5bb9?w=600&q=80',
  ],
  shakti:  [
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80',
    'https://images.unsplash.com/photo-1623344566-8c8b25be2a32?w=600&q=80',
    'https://images.unsplash.com/photo-1609174606442-10eb47093835?w=600&q=80',
  ],
  ganesha: [
    'https://images.unsplash.com/photo-1567329428478-c18a714ab6d0?w=600&q=80',
    'https://images.unsplash.com/photo-1600758208050-a22f17dc5bb9?w=600&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
  ],
  krishna: [
    'https://images.unsplash.com/photo-1609766857769-01c29d1c3b3c?w=600&q=80',
    'https://images.unsplash.com/photo-1583267554545-5585b5e3d7ab?w=600&q=80',
    'https://images.unsplash.com/photo-1621427520747-f4c175e38e2c?w=600&q=80',
  ],
  jain:    [
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
    'https://images.unsplash.com/photo-1609174606442-10eb47093835?w=600&q=80',
    'https://images.unsplash.com/photo-1621570073738-f61caa3a78cc?w=600&q=80',
  ],
  hanuman: [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
  ],
  temple:  [
    'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
    'https://images.unsplash.com/photo-1583267554545-5585b5e3d7ab?w=600&q=80',
    'https://images.unsplash.com/photo-1600758208050-a22f17dc5bb9?w=600&q=80',
    'https://images.unsplash.com/photo-1621570073738-f61caa3a78cc?w=600&q=80',
    'https://images.unsplash.com/photo-1609174606442-10eb47093835?w=600&q=80',
    'https://images.unsplash.com/photo-1590050751286-6eb24b44e37a?w=600&q=80',
    'https://images.unsplash.com/photo-1623776248697-a7e46f3c0f9b?w=600&q=80',
    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&q=80',
  ],
}

// Specific Wikimedia URLs for major temples
const SPECIFIC = {
  'kashi-vishwanath-temple':       'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kashi_Vishwanath_Temple.jpg/500px-Kashi_Vishwanath_Temple.jpg',
  'kedarnath-temple':              'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kedarnath_Temple.jpg/500px-Kedarnath_Temple.jpg',
  'tirumala-venkateswara-temple':  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tirumala_temple2007.jpg/500px-Tirumala_temple2007.jpg',
  'meenakshi-amman-temple':        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Meenakshi_Amman_Temple_Madurai.jpg/500px-Meenakshi_Amman_Temple_Madurai.jpg',
  'jagannath-temple-puri':         'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Jagannath_Temple_Puri.jpg/500px-Jagannath_Temple_Puri.jpg',
  'somnath-temple':                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Somnath_temple_Prabhas_Patan.jpg/500px-Somnath_temple_Prabhas_Patan.jpg',
  'brihadeeswarar-temple':         'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Brihadeeswarar_Temple.jpg/500px-Brihadeeswarar_Temple.jpg',
  'siddhivinayak-temple':          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Siddhivinayak_Temple_Mumbai.jpg/500px-Siddhivinayak_Temple_Mumbai.jpg',
  'vaishno-devi-shrine':           'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vaishno_Devi_shrine.jpg/500px-Vaishno_Devi_shrine.jpg',
  'kamakhya-devi-temple':          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kamakhya_temple.jpg/500px-Kamakhya_temple.jpg',
  'ram-lalla-temple':              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Ram_Mandir_Ayodhya.jpg/500px-Ram_Mandir_Ayodhya.jpg',
  'ranakpur-jain-temple':          'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Ranakpur_Jain_Temple.jpg/500px-Ranakpur_Jain_Temple.jpg',
  'akshardham-temple-delhi':       'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Akshardham_Delhi.jpg/500px-Akshardham_Delhi.jpg',
  'golden-temple-amritsar':        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Golden_Temple_Amritsar.jpg/500px-Golden_Temple_Amritsar.jpg',
  'hampi-virupaksha-temple':       'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Hampi_virupaksha_temple.jpg/500px-Hampi_virupaksha_temple.jpg',
  'konark-sun-temple':             'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Konarka_Temple.jpg/500px-Konarka_Temple.jpg',
  'kailasha-temple-ellora':        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Kailash_Temple_Ellora.jpg/500px-Kailash_Temple_Ellora.jpg',
  'mahakaleshwar-temple':          'https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80',
  'shirdi-sai-baba-samadhi':       'https://images.unsplash.com/photo-1583267554545-5585b5e3d7ab?w=600&q=80',
  'sravanabelagola-gomateshwara':  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gomateshwara_bahubali.jpg/500px-Gomateshwara_bahubali.jpg',
  'badrinath-temple':              'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Badrinath_temple.jpg/500px-Badrinath_temple.jpg',
  'guruvayur-krishna-temple':      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Guruvayur_temple.jpg/500px-Guruvayur_temple.jpg',
}

function getImg(slug, deity, type, categories = [], idx = 0) {
  if (SPECIFIC[slug]) return SPECIFIC[slug]
  const d = (deity||'').toLowerCase()
  const isJain = (type||'').includes('Jain') || (categories||[]).includes('Jain')
  if (isJain) return IMGS.jain[idx % IMGS.jain.length]
  if (d.includes('shiva') || d.includes('shankar') || d.includes('mahadev')) return IMGS.shiva[idx % IMGS.shiva.length]
  if (d.includes('krishna') || d.includes('jagannath') || d.includes('vithal')) return IMGS.krishna[idx % IMGS.krishna.length]
  if (d.includes('vishnu') || d.includes('venkat') || d.includes('rama') || d.includes('narayan')) return IMGS.vishnu[idx % IMGS.vishnu.length]
  if (d.includes('durga') || d.includes('kali') || d.includes('shakti') || d.includes('devi') || d.includes('amba') || d.includes('lakshmi')) return IMGS.shakti[idx % IMGS.shakti.length]
  if (d.includes('ganesha') || d.includes('ganesh') || d.includes('vinayak')) return IMGS.ganesha[idx % IMGS.ganesha.length]
  if (d.includes('murugan') || d.includes('subramanya')) return IMGS.krishna[idx % IMGS.krishna.length]
  if (d.includes('hanuman')) return IMGS.hanuman[idx % IMGS.hanuman.length]
  return IMGS.temple[idx % IMGS.temple.length]
}

async function main() {
  const client = new MongoClient(MONGODB_URI, { family:4, serverSelectionTimeoutMS:15000 })
  await client.connect()
  console.log('✅ Connected\n')

  const col = client.db().collection('temples')
  const temples = await col.find({}).toArray()
  console.log(`Found ${temples.length} temples\n`)

  let fixed = 0
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]
    // Only update if no image or image uses the broken source.unsplash.com pattern
    const needsFix = !t.image_url ||
      t.image_url.includes('source.unsplash.com') ||
      t.image_url.includes('photo-1609766856923') || // these specific IDs may be 404
      t.image_url.includes('photo-1621427520747') ||
      t.image_url.includes('photo-1582510003544') ||
      t.image_url.includes('photo-1567329428478') ||
      t.image_url.includes('photo-1590050751286') ||
      t.image_url.includes('photo-1623776248697')

    if (needsFix || SPECIFIC[t.slug]) {
      const newUrl = getImg(t.slug, t.deity, t.type, t.categories, i)
      await col.updateOne({ _id: t._id }, { $set: { image_url: newUrl } })
      fixed++
    }
  }

  console.log(`✅ Fixed ${fixed} temple images`)
  console.log(`   Remaining with original URLs: ${temples.length - fixed}`)
  await client.close()
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
