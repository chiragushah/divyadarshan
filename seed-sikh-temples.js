// seed-sikh-temples.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const { put } = require('@vercel/blob')

const GROQ_KEY = process.env.GROQ_API_KEY
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

const GURUDWARAS = [
  // ── Panj Takht (5 Holy Seats of Authority) ────────────────────────────────
  {
    name: 'Harmandir Sahib Golden Temple',
    slug: 'harmandir-sahib-golden-temple',
    city: 'Amritsar', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 31.6200, lng: 74.8765,
    description: 'The holiest Gurudwara in Sikhism, also known as Darbar Sahib. Built in the 16th century by Guru Arjan Dev Ji. The golden structure sits in the middle of Amrit Sarovar (Pool of Nectar). Serves 100,000 free meals daily from the world\'s largest community kitchen. Open 24 hours, 365 days. A symbol of universal brotherhood and equality.',
    timing: 'Open 24 hours, 365 days a year',
    best_time: 'October to March. Visit at 4 AM for Amrit Vela kirtan.',
    dress_code: 'Cover head mandatory. Remove footwear. No tobacco or alcohol. Modest clothing.',
    festivals: 'Guru Nanak Jayanti, Baisakhi, Diwali (Bandi Chhor Divas), Hola Mohalla, Gurpurabs',
    langar_timing: '24 hours — Langar served continuously day and night. Serves 50,000-100,000 people daily.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Harmandir_Sahib',
  },
  {
    name: 'Akal Takht Sahib Amritsar',
    slug: 'akal-takht-sahib-amritsar',
    city: 'Amritsar', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 31.6201, lng: 74.8757,
    description: 'The highest seat of temporal authority in Sikhism, located within the Golden Temple complex. Built by Guru Hargobind in 1609. Issues Hukamnamas (edicts) for the Sikh community worldwide. Houses sacred weapons and relics of the Sikh Gurus.',
    timing: '2:30 AM - 10:30 PM',
    best_time: 'October to March',
    dress_code: 'Cover head mandatory. Remove footwear. Respectful attire.',
    festivals: 'All Sikh Gurpurabs, Baisakhi, Diwali',
    langar_timing: '24 hours — Part of Golden Temple langar complex.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Akal_Takht',
  },
  {
    name: 'Takht Sri Kesgarh Sahib Anandpur',
    slug: 'takht-sri-kesgarh-sahib-anandpur',
    city: 'Anandpur Sahib', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 31.2389, lng: 76.5006,
    description: 'One of the five Panj Takht, birthplace of the Khalsa Panth in 1699. Guru Gobind Singh Ji founded the Khalsa here on Baisakhi. Houses sacred weapons of Guru Gobind Singh Ji. Located in Anandpur Sahib where Guru Tegh Bahadur Ji founded the city in 1665.',
    timing: '4:00 AM - 10:00 PM',
    best_time: 'Baisakhi (April), Hola Mohalla (March)',
    dress_code: 'Cover head. Remove footwear. No tobacco or alcohol.',
    festivals: 'Baisakhi (Khalsa Foundation Day), Hola Mohalla, Gurpurabs',
    langar_timing: 'Daily — Langar served morning and evening. 24 hours during festivals.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Takht_Sri_Kesgarh_Sahib',
  },
  {
    name: 'Takht Sri Damdama Sahib Bathinda',
    slug: 'takht-sri-damdama-sahib-bathinda',
    city: 'Talwandi Sabo', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 29.9833, lng: 75.0667,
    description: 'One of the five Panj Takht, known as the Guru Ki Kashi (Varanasi of the Sikhs). Guru Gobind Singh Ji stayed here for 9 months after the battles of Muktsar. He dictated the complete Guru Granth Sahib here. A major center of Sikh learning.',
    timing: '4:00 AM - 10:00 PM',
    best_time: 'October to March',
    dress_code: 'Cover head. Remove footwear. No tobacco or alcohol.',
    festivals: 'Guru Gobind Singh Jayanti, Gurpurabs, Baisakhi',
    langar_timing: 'Daily — Morning and evening langar. Special langar on Gurpurabs.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Takht_Sri_Damdama_Sahib',
  },
  {
    name: 'Takht Sri Hazur Sahib Nanded',
    slug: 'takht-sri-hazur-sahib-nanded',
    city: 'Nanded', state: 'Maharashtra',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 19.1562, lng: 77.3210,
    description: 'One of the five Panj Takht, the site where Guru Gobind Singh Ji left his mortal body in 1708. Also known as Abchal Nagar. The Gurudwara is built on the spot where Guru Gobind Singh Ji was cremated. Houses the sacred weapons of Guru Gobind Singh Ji. Open 24 hours.',
    timing: '3:00 AM - 11:00 PM',
    best_time: 'October to March',
    dress_code: 'Cover head. Remove footwear. Blue attire preferred by Nihang Sikhs.',
    festivals: 'Guru Gobind Singh Ji Jyoti Jot (October), Gurpurabs, Baisakhi',
    langar_timing: 'Daily 24 hours — Continuous langar service. Serves thousands daily.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Takht_Sri_Hazur_Sahib',
  },
  {
    name: 'Takht Sri Patna Sahib',
    slug: 'takht-sri-patna-sahib',
    city: 'Patna', state: 'Bihar',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 25.5951, lng: 85.2019,
    description: 'One of the five Panj Takht, the birthplace of Guru Gobind Singh Ji in 1666. Made of pristine white marble. Houses relics of Guru Gobind Singh Ji including his weapons, shoes and cradle. Illuminated magnificently after sunset. The langar starts at 7:30 PM.',
    timing: '4:00 AM - 10:00 PM',
    best_time: 'October to March',
    dress_code: 'Cover head. Remove footwear. No tobacco or alcohol.',
    festivals: 'Guru Gobind Singh Jayanti (January), Gurpurabs, Baisakhi',
    langar_timing: 'Morning 6:00 AM - 12:00 PM and Evening 7:30 PM - 10:00 PM',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Takhat_Sri_Harimandir_Ji,_Patna_Sahib',
  },
  // ── Major Historic Gurudwaras ─────────────────────────────────────────────
  {
    name: 'Gurudwara Bangla Sahib Delhi',
    slug: 'gurudwara-bangla-sahib-delhi',
    city: 'New Delhi', state: 'Delhi',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 28.6261, lng: 77.2101,
    description: 'One of the most prominent Gurudwaras in Delhi, associated with Guru Har Krishan Ji, the eighth Sikh Guru. Known for its large sacred pool (Sarovar) with healing properties. The white marble architecture with golden dome is iconic. Features a Sikh museum, school and hospital inside the complex.',
    timing: 'Open 24 hours, 365 days',
    best_time: 'Year-round. Early morning Amrit Vela most serene.',
    dress_code: 'Cover head (scarves provided). Remove footwear. No smoking.',
    festivals: 'Guru Har Krishan Jayanti, Guru Nanak Jayanti, Baisakhi, Gurpurabs',
    langar_timing: '9:00 AM - 3:00 PM and 7:00 PM - 10:00 PM. Free for all.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Gurudwara_Bangla_Sahib',
  },
  {
    name: 'Gurudwara Sis Ganj Sahib Delhi',
    slug: 'gurudwara-sis-ganj-sahib-delhi',
    city: 'New Delhi', state: 'Delhi',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 28.6510, lng: 77.2310,
    description: 'Historic Gurudwara in Chandni Chowk marking the site where Guru Tegh Bahadur Ji was martyred in 1675 to protect Hindu religious freedom. One of the nine historical Gurudwaras built by Sardar Baghel Singh in Delhi. Open 24 hours.',
    timing: 'Open 24 hours',
    best_time: 'Year-round',
    dress_code: 'Cover head. Remove footwear. No smoking or alcohol.',
    festivals: 'Guru Tegh Bahadur martyrdom day, Gurpurabs',
    langar_timing: 'Daily — Morning and evening langar.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Gurdwara_Sis_Ganj_Sahib',
  },
  {
    name: 'Gurudwara Rakab Ganj Sahib Delhi',
    slug: 'gurudwara-rakab-ganj-sahib-delhi',
    city: 'New Delhi', state: 'Delhi',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 28.6162, lng: 77.1993,
    description: 'Located near Parliament House, this Gurudwara marks the site where Guru Tegh Bahadur Ji\'s body was cremated after his martyrdom. Built by Sardar Baghel Singh in 1783. One of the nine historic Gurudwaras of Delhi. Visited by many politicians and dignitaries.',
    timing: 'Open 24 hours',
    best_time: 'Year-round',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Guru Tegh Bahadur martyrdom, Gurpurabs, Baisakhi',
    langar_timing: 'Daily — Morning and evening langar.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Gurdwara_Rakab_Ganj_Sahib',
  },
  {
    name: 'Hemkund Sahib',
    slug: 'hemkund-sahib',
    city: 'Chamoli', state: 'Uttarakhand',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 30.6833, lng: 79.6167,
    description: 'A high altitude Gurudwara at 4,329 meters above sea level, surrounded by seven snow-capped peaks and a glacial lake. Guru Gobind Singh Ji meditated here in a previous life. Accessible only between June and October. The piping hot langar at this altitude is a divine experience. Visitors trek 6km from Govindghat.',
    timing: 'June to October only (closed in winter due to snow)',
    best_time: 'July to September',
    dress_code: 'Cover head. Remove footwear. Warm clothing essential.',
    festivals: 'Opening day (June), Closing day (October)',
    langar_timing: 'Daily during season — Hot khichdi and sabzi served to trekkers.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Hemkund_Sahib',
  },
  {
    name: 'Gurudwara Manikaran Sahib',
    slug: 'gurudwara-manikaran-sahib',
    city: 'Manikaran', state: 'Himachal Pradesh',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 32.0333, lng: 77.3500,
    description: 'Sacred Gurudwara in the Parvati Valley, Kullu. Associated with Guru Nanak Dev Ji. Famous for its natural hot springs — the langar rice and dal are cooked in these geothermal hot spring waters. Pilgrimage site for both Sikhs and Hindus. Set amid stunning Himalayan scenery.',
    timing: '5:00 AM - 10:00 PM',
    best_time: 'May to October (avoid monsoon landslides)',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Baisakhi, Guru Nanak Jayanti, Gurpurabs',
    langar_timing: 'Daily — Langar cooked in natural hot springs. Open all day.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Manikaran',
  },
  {
    name: 'Gurudwara Paonta Sahib',
    slug: 'gurudwara-paonta-sahib',
    city: 'Paonta Sahib', state: 'Himachal Pradesh',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 30.4333, lng: 77.6333,
    description: 'Historic Gurudwara on the banks of the Yamuna River where Guru Gobind Singh Ji stayed for over 4 years and wrote many compositions. He trained the Khalsa warriors here. Houses weapons used by Guru Gobind Singh Ji. Beautiful riverside location.',
    timing: '4:00 AM - 10:00 PM',
    best_time: 'October to March',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Hola Mohalla, Gurpurabs, Baisakhi',
    langar_timing: 'Daily — Morning 6 AM - 12 PM, Evening 6 PM - 9 PM.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Gurdwara_Paonta_Sahib',
  },
  {
    name: 'Gurudwara Fatehgarh Sahib',
    slug: 'gurudwara-fatehgarh-sahib',
    city: 'Fatehgarh Sahib', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 30.6487, lng: 76.3905,
    description: 'Sacred Gurudwara marking the site where the two younger sons of Guru Gobind Singh Ji — Sahibzada Zorawar Singh and Sahibzada Fateh Singh — were martyred in 1704. They were bricked alive but refused to convert. A site of immense historical and emotional significance for Sikhs.',
    timing: '4:00 AM - 10:00 PM',
    best_time: 'December (Shaheedi Jor Mela festival)',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Shaheedi Jor Mela (December) — major annual fair',
    langar_timing: 'Daily langar. Massive langar during Shaheedi Jor Mela.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Fatehgarh_Sahib',
  },
  {
    name: 'Gurudwara Anandpur Sahib',
    slug: 'gurudwara-anandpur-sahib',
    city: 'Anandpur Sahib', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 31.2387, lng: 76.5005,
    description: 'The City of Bliss, founded by Guru Tegh Bahadur Ji in 1665. Guru Gobind Singh Ji spent 25 years here and founded the Khalsa Panth in 1699. Multiple historic Gurudwaras dot the city. Famous for the spectacular Hola Mohalla festival with Nihang Sikhs and martial arts.',
    timing: '4:00 AM - 10:00 PM',
    best_time: 'Hola Mohalla (March), Baisakhi (April)',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Hola Mohalla, Baisakhi, Guru Gobind Singh Jayanti',
    langar_timing: 'Daily — Continuous langar. Massive community meals during festivals.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Anandpur_Sahib',
  },
  {
    name: 'Gurudwara Sachkhand Sri Hazur Sahib',
    slug: 'gurudwara-sachkhand-sri-hazur-sahib',
    city: 'Nanded', state: 'Maharashtra',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 19.1601, lng: 77.3215,
    description: 'The Sachkhand complex at Nanded includes multiple Gurudwaras at the site where Guru Gobind Singh Ji breathed his last. Known for the unique tradition of Sukhasans (putting Guru Granth Sahib to rest) ceremony. Sikhs from Maharashtra, Andhra Pradesh and beyond visit here.',
    timing: '3:00 AM - 11:00 PM',
    best_time: 'October to March',
    dress_code: 'Cover head. Remove footwear. Blue/saffron attire of Nihang Sikhs common.',
    festivals: 'Parkash Utsav, Gurpurabs, Baisakhi',
    langar_timing: '24 hours continuous langar.',
  },
  {
    name: 'Gurudwara Darbar Sahib Kartarpur',
    slug: 'gurudwara-darbar-sahib-kartarpur',
    city: 'Dera Baba Nanak', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 31.9194, lng: 74.9977,
    description: 'The historic Gurudwara where Guru Nanak Dev Ji spent the last 18 years of his life farming and teaching. The Kartarpur Corridor connects this to Gurdwara Darbar Sahib in Pakistan. Pilgrims from India can visit Pakistan\'s Kartarpur Sahib visa-free via the corridor. Sacred on both sides of the border.',
    timing: '4:00 AM - 9:00 PM',
    best_time: 'October to March',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Guru Nanak Jayanti (massive gathering), Gurpurabs',
    langar_timing: 'Daily — Morning and evening langar.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Kartarpur_Corridor',
  },
  {
    name: 'Gurudwara Nankana Sahib',
    slug: 'gurudwara-nankana-sahib-india',
    city: 'Amritsar', state: 'Punjab',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 31.6167, lng: 74.8833,
    description: 'The Indian Gurudwara dedicated to the memory of Guru Nanak Dev Ji\'s birthplace (the original is in Pakistan). A major pilgrimage site for Sikhs who cannot visit Pakistan. Hosts large gatherings on Guru Nanak Jayanti.',
    timing: '4:00 AM - 10:00 PM',
    best_time: 'Guru Nanak Jayanti (October-November)',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Guru Nanak Jayanti',
    langar_timing: 'Daily langar. Massive langar during Gurpurabs.',
  },
  {
    name: 'Gurudwara Singh Sabha Bangalore',
    slug: 'gurudwara-singh-sabha-bangalore',
    city: 'Bangalore', state: 'Karnataka',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 12.9808, lng: 77.5990,
    description: 'The largest Gurudwara in Bangalore, located on the banks of Ulsoor Lake. Built in 1943, it serves the large Sikh community of Bangalore and South India. A peaceful oasis with lake views. Regular kirtan and religious activities.',
    timing: '5:00 AM - 9:00 PM',
    best_time: 'Year-round',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Guru Nanak Jayanti, Baisakhi, Gurpurabs',
    langar_timing: 'Sunday langar open to all. Special langar on festivals.',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Gurdwara_Sri_Guru_Singh_Sabha,_Bangalore',
  },
  {
    name: 'Gurudwara Guru Nanak Darbar Mumbai',
    slug: 'gurudwara-guru-nanak-darbar-mumbai',
    city: 'Mumbai', state: 'Maharashtra',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 19.0176, lng: 72.8561,
    description: 'The main Gurudwara serving Mumbai\'s Sikh community. Regular Gurbani kirtan, path and langar. An important community center for Sikhs in Maharashtra. Hosts large gatherings during all major Sikh festivals.',
    timing: '5:00 AM - 9:00 PM',
    best_time: 'Year-round',
    dress_code: 'Cover head. Remove footwear. No smoking.',
    festivals: 'Guru Nanak Jayanti, Baisakhi, Gurpurabs',
    langar_timing: 'Daily langar. Sunday langar open to all communities.',
  },
  {
    name: 'Gurudwara Shri Guru Singh Sabha Pune',
    slug: 'gurudwara-guru-singh-sabha-pune',
    city: 'Pune', state: 'Maharashtra',
    deity: 'Guru Granth Sahib', type: 'Sikh', categories: ['Sikh'],
    lat: 18.5204, lng: 73.8567,
    description: 'The main Gurudwara in Pune serving the growing Sikh community. Regular morning and evening prayers, kirtan and langar. An important spiritual center for Sikhs living in Pune and surrounding areas.',
    timing: '5:00 AM - 9:00 PM',
    best_time: 'Year-round',
    dress_code: 'Cover head. Remove footwear.',
    festivals: 'Guru Nanak Jayanti, Baisakhi, Gurpurabs',
    langar_timing: 'Sunday langar open to all. Daily langar for regular sangat.',
  },
]

async function enrichWithGroq(gurudwara) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 600,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: `For the Sikh Gurudwara "${gurudwara.name}" in ${gurudwara.city}, ${gurudwara.state}, provide facilities and how to reach.
Reply with JSON only:
{
  "facilities": {
    "toilets": "✅/❌/⚠️ ...",
    "parking": "✅/❌/⚠️ ...",
    "drinking_water": "✅/❌/⚠️ ...",
    "prasad": "✅ Yes — Karah Parshad (sweet halwa) distributed free to all visitors",
    "cloak_room": "✅/❌/⚠️ ...",
    "accommodation": "✅/❌/⚠️ ...",
    "wheelchair": "✅/❌/⚠️ ...",
    "atm": "✅/❌/⚠️ ...",
    "medical": "✅/❌/⚠️ ...",
    "free_meals": "✅ Yes — Free langar served to all. ${gurudwara.langar_timing}"
  },
  "how_to_reach": {
    "by_air": "✈️ ...",
    "by_train": "🚆 ...",
    "by_bus": "🚌 ...",
    "by_taxi": "🚕 ...",
    "local_tips": "💡 ..."
  },
  "nearby_places": [
    {"name": "...", "type": "heritage/temple/nature/default", "distance": "..."},
    {"name": "...", "type": "heritage/temple/nature/default", "distance": "..."},
    {"name": "...", "type": "heritage/temple/nature/default", "distance": "..."}
  ]
}`
        }]
      })
    })
    const data = await res.json()
    const text = data.choices?.[0]?.message?.content?.trim() || ''
    const match = text.match(/\{[\s\S]*\}/)
    if (match) return JSON.parse(match[0])
  } catch(e) {}
  return null
}

async function getImageFromWikipedia(pageTitle) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(pageTitle)}`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DivyaDarshan/1.0 (https://divyadarshan.in)' },
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
      headers: { 'User-Agent': 'DivyaDarshan/1.0', 'Referer': 'https://en.wikipedia.org/' },
      signal: AbortSignal.timeout(25000)
    })
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    if (buffer.byteLength < 5000) return null
    const ext = imageUrl.match(/\.(jpg|jpeg|png)/i)?.[1]?.toLowerCase() || 'jpg'
    const blob = await put(`temples/sikh-${slug}.${ext}`, Buffer.from(buffer), {
      access: 'public', token: BLOB_TOKEN,
      contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
    })
    return blob.url
  } catch(e) { return null }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  const fallbackRef = await T.findOne({ type: 'Sikh', blob_image_url: { $exists: true, $ne: '' } }, { blob_image_url: 1 }).lean()
    || await T.findOne({ blob_image_url: { $exists: true, $ne: '' } }, { blob_image_url: 1 }).lean()

  console.log(`\nSeeding ${GURUDWARAS.length} Sikh Gurudwaras...\n`)

  let added = 0, skipped = 0

  for (let i = 0; i < GURUDWARAS.length; i++) {
    const g = GURUDWARAS[i]
    process.stdout.write(`[${i+1}/${GURUDWARAS.length}] ${g.name}... `)

    const exists = await T.findOne({ slug: g.slug })
    if (exists) { console.log('SKIP'); skipped++; continue }

    // Get Wikipedia image
    let blobUrl = null
    if (g.wikipedia_url) {
      const pageTitle = g.wikipedia_url.split('/wiki/')[1]
      const imageUrl = await getImageFromWikipedia(pageTitle)
      if (imageUrl) blobUrl = await downloadAndUpload(imageUrl, g.slug)
    }

    // Enrich with Groq
    const enriched = await enrichWithGroq(g)
    await new Promise(r => setTimeout(r, 700))

    const doc = {
      ...g,
      blob_image_url: blobUrl || fallbackRef?.blob_image_url || '',
      image_url: blobUrl || fallbackRef?.blob_image_url || '',
      facilities: enriched?.facilities || {
        toilets: '✅ Yes — Clean toilet facilities at Gurudwara premises',
        parking: '✅ Yes — Free parking available near Gurudwara',
        drinking_water: '✅ Yes — Free drinking water available 24 hours',
        prasad: '✅ Yes — Karah Parshad (sweet halwa) distributed free to all',
        cloak_room: '✅ Yes — Footwear storage at main entrance',
        accommodation: '✅ Sarai (dharamshalas) available. Contact Gurudwara for bookings.',
        wheelchair: '⚠️ Partial — Ground floor accessible. Contact management for assistance.',
        atm: '✅ ATM available nearby',
        medical: '✅ First aid available. Many large Gurudwaras have free medical clinics.',
        free_meals: `✅ Yes — Free Langar for all. ${g.langar_timing}`,
      },
      how_to_reach: enriched?.how_to_reach || {},
      nearby_places: enriched?.nearby_places || [],
      rating_avg: 0, rating_count: 0,
      has_live: false, is_seasonal: false,
    }

    try {
      await T.create(doc)
      console.log(blobUrl ? '✅ With image' : '✅ No image')
      added++
    } catch(e) {
      console.log('FAILED:', e.message)
    }
  }

  const total = await T.countDocuments()
  const sikh = await T.countDocuments({ type: 'Sikh' })

  console.log('\n=== Done! ===')
  console.log('Added:', added, '| Skipped:', skipped)
  console.log('Total temples:', total)
  console.log('Sikh Gurudwaras:', sikh)

  await mongoose.disconnect()
}

main().catch(console.error)
