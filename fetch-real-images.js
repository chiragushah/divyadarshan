/**
 * Fetches REAL Wikipedia image URLs for each temple via Wikipedia API
 * then saves them to MongoDB.
 * Usage: node fetch-real-images.js
 */
const fs = require('fs')
const { MongoClient } = require('mongodb')
const https = require('https')

let MONGODB_URI = ''
try {
  const env = fs.readFileSync('.env.local', 'utf8')
  const match = env.match(/MONGODB_URI=(.+)/)
  if (match) MONGODB_URI = match[1].trim()
} catch(e) { process.exit(1) }

// ── Wikipedia article title for each temple slug ──────────────────
const WIKI = {
  'kashi-vishwanath-temple':           'Kashi_Vishwanath_Temple',
  'ram-lalla-temple':                  'Ram_temple,_Ayodhya',
  'hanuman-garhi-temple':              'Hanuman_Garhi',
  'krishna-janmabhoomi-temple':        'Krishna_Janmabhoomi',
  'banke-bihari-temple':               'Banke_Bihari_Temple',
  'prem-mandir':                       'Prem_Mandir',
  'sankat-mochan-hanuman-temple':      'Sankat_Mochan_Hanuman_Temple',
  'kedarnath-temple':                  'Kedarnath_Temple',
  'badrinath-temple':                  'Badrinath_Temple',
  'gangotri-temple':                   'Gangotri_Temple',
  'yamunotri-temple':                  'Yamunotri',
  'tungnath-temple':                   'Tungnath',
  'haridwar-har-ki-pauri':             'Har_ki_Pauri',
  'amarnath-cave-temple':              'Amarnath_temple',
  'vaishno-devi-shrine':               'Vaishno_Devi',
  'jwala-ji-temple':                   'Jwalamukhi_Temple',
  'naina-devi-temple-bilaspur':        'Naina_Devi_Temple,_Bilaspur',
  'chamunda-devi-temple-kangra':       'Chamunda_Devi_Temple,_Kangra',
  'bhimakali-temple-sarahan':          'Bhimakali_Temple',
  'jakhoo-temple-shimla':              'Jakhu_Temple',
  'meenakshi-amman-temple':            'Meenakshi_Amman_Temple',
  'brihadeeswarar-temple':             'Brihadeeswara_Temple,_Thanjavur',
  'arunachaleswarar-temple':           'Arunachaleswarar_Temple',
  'ramanathaswamy-temple':             'Ramanathaswamy_Temple',
  'srirangam-ranganathaswamy-temple':  'Ranganathaswamy_Temple,_Srirangam',
  'chidambaram-nataraja-temple':       'Nataraja_Temple,_Chidambaram',
  'kanchi-kamakshi-temple':            'Kamakshi_Amman_Temple',
  'kapaleeshwarar-temple':             'Kapaleeshwarar_Temple',
  'palani-murugan-temple':             'Palani',
  'tiruchendur-murugan-temple':        'Thiruchendur',
  'kanyakumari-devi-temple':           'Bhagavathy_Amman_Temple,_Kanyakumari',
  'ekambareswarar-temple':             'Ekambareswarar_Temple',
  'tirumala-venkateswara-temple':      'Venkateswara_Temple,_Tirumala',
  'kanaka-durga-temple':               'Kanaka_Durga_Temple',
  'srisailam-mallikarjuna':            'Mallikarjuna_Temple',
  'yadagirigutta-temple':              'Yadadri_Lakshmi_Narasimha_Temple',
  'vemulawada-rajarajeswara-temple':   'Vemulawada_Temple',
  'chamundeshwari-temple':             'Chamundeshwari_Temple',
  'hampi-virupaksha-temple':           'Virupaksha_Temple,_Hampi',
  'vittala-temple-hampi':              'Vittala_Temple',
  'hoysaleswara-temple':               'Hoysaleswara_Temple',
  'murudeshwara-temple':               'Murudeshwara',
  'udupi-sri-krishna-temple':          'Krishna_Matha,_Udupi',
  'kukke-subramanya-temple':           'Kukke_Subrahmanya_Temple',
  'dharmasthala-temple':               'Dharmasthala',
  'gokarna-mahabaleshwar-temple':      'Mahabaleshwar_Temple,_Gokarna',
  'kollur-mookambika-temple':          'Mookambika_Temple',
  'chenna-kesava-temple-belur':        'Chennakeshava_Temple,_Belur',
  'pattadakal-temples':                'Pattadakal',
  'badami-cave-temples':               'Badami_cave_temples',
  'sravanabelagola-gomateshwara':      'Gomateshwara',
  'mudabidri-jain-temples':            'Mudabidri',
  'sringeri-sharada-temple':           'Sringeri_Sharadamba_Temple',
  'guruvayur-krishna-temple':          'Guruvayur_Temple',
  'padmanabhaswamy-temple':            'Padmanabhaswamy_Temple',
  'sabarimala-ayyappa-temple':         'Sabarimala',
  'sree-vadakkunnathan-temple':        'Vadakkunnathan_Temple',
  'attukal-bhagavathy-temple':         'Attukal_Bhagavathy_Temple',
  'trimbakeshwar-temple':              'Trimbakeshwar_Shiva_Temple',
  'bhimashankar-temple':               'Bhimashankar_Temple',
  'grishneshwar-temple':               'Grishneshwar_Temple',
  'siddhivinayak-temple':              'Siddhivinayak_Temple',
  'shirdi-sai-baba-samadhi':           'Shirdi_Sai_Baba',
  'mahalaxmi-temple-kolhapur':         'Mahalakshmi_Temple,_Kolhapur',
  'tulja-bhavani-temple':              'Tuljabhavani_Temple',
  'vithoba-temple-pandharpur':         'Vitthal_Rukmini_Temple',
  'ashtavinayak-morgaon-temple':       'Morgaon',
  'kailasha-temple-ellora':            'Kailasa_temple,_Ellora',
  'elephanta-caves-temple':            'Elephanta_Caves',
  'alandi-dnyaneshwar-temple':         'Sant_Dnyaneshwar',
  'somnath-temple':                    'Somnath_temple',
  'dwarkadhish-temple':                'Dwarkadhish_Temple',
  'ambaji-temple':                     'Ambaji',
  'nageshwar-temple':                  'Nageshvara_Jyotirlinga',
  'palitana-temples':                  'Shatrunjaya',
  'ranakpur-jain-temple':              'Ranakpur_Jain_Temple',
  'sun-temple-modhera':                'Sun_Temple,_Modhera',
  'dilwara-jain-temples':              'Dilwara_Temples',
  'brahma-temple-pushkar':             'Brahma_Temple,_Pushkar',
  'karni-mata-temple':                 'Karni_Mata_Temple',
  'eklingji-temple':                   'Eklingji',
  'nathdwara-temple':                  'Nathdwara',
  'jaisalmer-jain-temples':            'Jain_temples_in_Jaisalmer_Fort',
  'mahakaleshwar-temple':              'Mahakaleshwar_Jyotirlinga',
  'omkareshwar-temple':                'Omkareshwar',
  'khajuraho-temples':                 'Khajuraho_Group_of_Monuments',
  'orchha-ram-raja-temple':            'Ram_Raja_Temple',
  'jagannath-temple-puri':             'Jagannath_Temple,_Puri',
  'konark-sun-temple':                 'Konark_Sun_Temple',
  'lingaraj-temple-bhubaneswar':       'Lingaraja_Temple',
  'mukteshwar-temple-bhubaneswar':     'Mukteshvara_Temple',
  'dakshineswar-kali-temple':          'Dakshineswar_Kali_Temple',
  'kalighat-kali-temple':              'Kalighat_Temple',
  'belur-math-temple':                 'Belur_Math',
  'tarapith-temple':                   'Tara_(Tarapith)',
  'tarkeshwar-shiva-temple':           'Tarakeshwar_Temple',
  'kamakhya-devi-temple':              'Kamakhya_Temple',
  'baidyanath-temple-deoghar':         'Baidyanath_Temple',
  'vishnupad-temple-gaya':             'Vishnupad_Temple',
  'mahabodhi-temple-bodh-gaya':        'Mahabodhi_Temple',
  'golden-temple-amritsar':            'Harmandir_Sahib',
  'durgiana-temple-amritsar':          'Durgiana_Temple',
  'akshardham-temple-delhi':           'Swaminarayan_Akshardham,_Delhi',
  'lal-mandir-delhi':                  'Lal_Mandir',
  'birla-mandir-delhi':                'Lakshmi_Narayan_Temple,_Delhi',
  'mangeshi-temple':                   'Mangeshi_Temple',
  'shanta-durga-temple':               'Shanta_Durga_Temple',
  'somnath-temple':                    'Somnath_temple',
  'sravanabelagola-bahubali-temple':   'Gomateshwara',
  'nakoda-jain-temple':                'Nakoda',
  'tripura-sundari-temple':            'Tripura_Sundari_Temple',
  'shankaracharya-temple-srinagar':    'Shankaracharya_Temple',
  'govind-dev-temple-jaipur':          'Govind_Dev_Ji_Temple',
  'khatu-shyam-temple':                'Khatu_Shyam_Ji',
  'dodda-basavana-gudi':               'Bull_Temple,_Bangalore',
  'iskcon-temple-bangalore':           'ISKCON_Bangalore',
  'nanjangud-srikanteshwara':          'Nanjundeshwara_Temple',
  'bijli-mahadev-temple':              'Bijli_Mahadev',
  'shani-shingnapur-temple':           'Shani_Shingnapur',
  'saptashringi-temple':               'Saptashringi',
  'jejuri-khandoba-temple':            'Jejuri',
  'chilkur-balaji-temple':             'Chilkur_Balaji_Temple',
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'DivyaDarshanBot/1.0' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpsGet(res.headers.location).then(resolve).catch(reject)
      }
      let data = ''
      res.on('data', d => data += d)
      res.on('end', () => resolve(data))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')) })
  })
}

async function getWikiImage(articleTitle) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(articleTitle)}`
    const data = await httpsGet(url)
    const json = JSON.parse(data)
    // Prefer thumbnail (smaller, faster loading)
    const src = json.thumbnail?.source || json.originalimage?.source
    if (src) {
      // Resize to 600px width
      return src.replace(/\/\d+px-/, '/600px-')
    }
  } catch(e) {}
  return null
}

// Category fallback images (verified working Wikimedia Commons direct URLs)
const FALLBACK = {
  jain:    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ranakpur_Jain_Temple_%28India%29.jpg/600px-Ranakpur_Jain_Temple_%28India%29.jpg',
  shiva:   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kashi_Vishwanath_Temple.jpg/600px-Kashi_Vishwanath_Temple.jpg',
  vishnu:  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ranganathaswamy-Temple-Srirangam-2015-11-14.jpg/600px-Ranganathaswamy-Temple-Srirangam-2015-11-14.jpg',
  shakti:  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Durga_Temple%2C_Varanasi.jpg/600px-Durga_Temple%2C_Varanasi.jpg',
  ganesha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Dagdusheth_Halwai_Ganapati_Temple_Pune.jpg/600px-Dagdusheth_Halwai_Ganapati_Temple_Pune.jpg',
  krishna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Vrindavan_ISKCON_temple.jpg/600px-Vrindavan_ISKCON_temple.jpg',
  south:   'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Brihadeeswarar_Temple.jpg/600px-Brihadeeswarar_Temple.jpg',
  north:   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pashupatinath_Temple.jpg/600px-Pashupatinath_Temple.jpg',
  hill:    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kedarnath_Temple.jpg/600px-Kedarnath_Temple.jpg',
  coastal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Shore_Temple.jpg/600px-Shore_Temple.jpg',
  murugan: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Palani_Murugan_Temple.jpg/600px-Palani_Murugan_Temple.jpg',
}

function getFallback(deity, type, state, categories) {
  const d = (deity||'').toLowerCase()
  const cat = categories||[]
  if (cat.includes('Jain') || (type||'').includes('Jain')) return FALLBACK.jain
  if (cat.includes('Hilltop')) return FALLBACK.hill
  if (cat.includes('Coastal')) return FALLBACK.coastal
  if (d.includes('murugan') || d.includes('subramanya')) return FALLBACK.murugan
  if (d.includes('shiva') || d.includes('mahadev') || d.includes('shankar')) return FALLBACK.shiva
  if (d.includes('krishna') || d.includes('jagannath') || d.includes('vithal')) return FALLBACK.krishna
  if (d.includes('vishnu') || d.includes('rama') || d.includes('venkat') || d.includes('narayan')) return FALLBACK.vishnu
  if (d.includes('durga') || d.includes('kali') || d.includes('shakti') || d.includes('devi') || d.includes('lakshmi') || d.includes('amba') || d.includes('bhavani')) return FALLBACK.shakti
  if (d.includes('ganesha') || d.includes('ganesh') || d.includes('vinayak')) return FALLBACK.ganesha
  const southStates = ['Tamil Nadu','Kerala','Andhra Pradesh','Telangana','Karnataka']
  if (southStates.includes(state)) return FALLBACK.south
  return FALLBACK.north
}

async function main() {
  const client = new MongoClient(MONGODB_URI, { family:4, serverSelectionTimeoutMS:15000 })
  await client.connect()
  console.log('✅ Connected\n')

  const col = client.db().collection('temples')
  const temples = await col.find({}).toArray()
  console.log(`📊 ${temples.length} temples to update\n`)
  console.log('🌐 Fetching Wikipedia images (this takes ~3 minutes)...\n')

  let ok = 0, fetched = 0, fallback = 0

  for (const t of temples) {
    const wikiTitle = WIKI[t.slug]
    let imageUrl = null

    if (wikiTitle) {
      imageUrl = await getWikiImage(wikiTitle)
      if (imageUrl) {
        fetched++
      } else {
        // Try with just the temple name
        imageUrl = await getWikiImage(t.name.replace(/ /g, '_'))
        if (imageUrl) fetched++
      }
    }

    if (!imageUrl) {
      imageUrl = getFallback(t.deity, t.type, t.state, t.categories)
      fallback++
    }

    await col.updateOne({ _id: t._id }, { $set: { image_url: imageUrl } })
    ok++

    if (ok % 20 === 0) {
      console.log(`  ✅ ${ok}/${temples.length} — Wikipedia: ${fetched}, Fallback: ${fallback}`)
    }

    // Small delay to be respectful to Wikipedia API
    await new Promise(r => setTimeout(r, 150))
  }

  console.log(`\n🎉 DONE!`)
  console.log(`   Wikipedia images: ${fetched}`)
  console.log(`   Category fallbacks: ${fallback}`)
  console.log(`   Total: ${ok}`)
  await client.close()
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
