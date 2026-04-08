// seed-swaminarayan.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const { put } = require('@vercel/blob')

const GROQ_KEY = process.env.GROQ_API_KEY
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

// All major Swaminarayan temples in India
const SWAMINARAYAN_TEMPLES = [
  // ── 6 Original Mandirs built by Swaminarayan himself ──────────────────────
  {
    name: 'Shri Swaminarayan Mandir Kalupur',
    slug: 'swaminarayan-mandir-kalupur-ahmedabad',
    city: 'Ahmedabad', state: 'Gujarat',
    deity: 'Swaminarayan / Nar Narayan',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 23.0300, lng: 72.5877,
    description: 'The first temple of the Swaminarayan Sampraday, built in 1822 on instructions of Swaminarayan himself. Located in Kalupur area of Ahmedabad. Houses images of Nar Narayan and is headquarters of the NarNarayan Dev Gadi. One of the finest examples of Gujarati temple architecture.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire. Men and women worship separately as per Swaminarayan tradition.',
    festivals: 'Swaminarayan Jayanti, Janmashtami, Annakut, Ram Navami, Diwali',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Swaminarayan_Temple,_Ahmedabad',
    established: '1822',
  },
  {
    name: 'Shri Swaminarayan Mandir Bhuj',
    slug: 'swaminarayan-mandir-bhuj',
    city: 'Bhuj', state: 'Gujarat',
    deity: 'Swaminarayan / Nar Narayan',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 23.2518, lng: 69.6669,
    description: 'The second temple built by Swaminarayan in 1823, located in Bhuj, Kutch. Survived the 2001 Gujarat earthquake. Houses exquisite woodwork and murals depicting Swaminarayan\'s life.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire. Men and women worship separately.',
    festivals: 'Swaminarayan Jayanti, Janmashtami, Annakut, Fuldol',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Swaminarayan_Mandir_Bhuj.jpg/800px-Swaminarayan_Mandir_Bhuj.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Swaminarayan_Mandir,_Bhuj',
    established: '1823',
  },
  {
    name: 'Shri Swaminarayan Mandir Vadtal',
    slug: 'swaminarayan-mandir-vadtal',
    city: 'Vadtal', state: 'Gujarat',
    deity: 'Swaminarayan / Radha Krishna / Lakshmi Narayan',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 22.5200, lng: 72.9700,
    description: 'Built by Swaminarayan in 1824, Vadtal is the headquarters of the Laxmi Narayan Dev Gadi (Vadtal Diocese). The temple is famous for the Harikrushna Maharaj murti personally consecrated by Swaminarayan himself. Set amidst beautiful lakes and gardens.',
    timing: '5:30 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    best_time: 'October to February',
    dress_code: 'Traditional attire mandatory. Dhoti for men, saree for women preferred.',
    festivals: 'Swaminarayan Jayanti, Fuldol (Holi), Annakut, Janmashtami, Sharad Purnima',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Vadtal_mandir.jpg/800px-Vadtal_mandir.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Swaminarayan_Mandir,_Vadtal',
    established: '1824',
  },
  {
    name: 'Shri Swaminarayan Mandir Dholera',
    slug: 'swaminarayan-mandir-dholera',
    city: 'Dholera', state: 'Gujarat',
    deity: 'Swaminarayan / Radha Madan Mohan',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 22.2501, lng: 72.1788,
    description: 'One of the six original temples built by Swaminarayan in 1826. Located in Dholera, this temple houses the deity of Radha Madan Mohan. An important pilgrimage site for the Swaminarayan Sampraday.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire. Men and women worship separately.',
    festivals: 'Swaminarayan Jayanti, Janmashtami, Annakut',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Swaminarayan_Mandir,_Dholera',
    established: '1826',
  },
  {
    name: 'Shri Swaminarayan Mandir Junagadh',
    slug: 'swaminarayan-mandir-junagadh',
    city: 'Junagadh', state: 'Gujarat',
    deity: 'Swaminarayan / Ranchhodrai / Radha Ramandev',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 21.5222, lng: 70.4579,
    description: 'Built by Swaminarayan in 1827 near the sacred Girnar mountain. Houses deities of Ranchhodrai and Radha Ramandev. The temple is located in the spiritually rich city of Junagadh, close to the Girnar Jain temples.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Girnar Parikrama, Janmashtami, Annakut',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Swaminarayan_Mandir,_Junagadh',
    established: '1827',
  },
  {
    name: 'Shri Swaminarayan Mandir Gadhada',
    slug: 'swaminarayan-mandir-gadhada',
    city: 'Gadhada', state: 'Gujarat',
    deity: 'Swaminarayan / Radha Gopinath',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 21.9706, lng: 71.5741,
    description: 'The sixth and final temple built by Swaminarayan himself in 1828. Located in Gadhada, Botad district, this temple is where Swaminarayan spent much of his time and delivered many spiritual discourses compiled in the Vachanamrut scripture. A deeply sacred pilgrimage site.',
    timing: '5:30 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'October to February',
    dress_code: 'Traditional attire. Dhoti preferred for men.',
    festivals: 'Swaminarayan Jayanti, Vachanamrut Jayanti, Janmashtami, Annakut',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Swaminarayan_Mandir,_Gadhada',
    established: '1828',
  },
  // ── BAPS Akshardham Temples ───────────────────────────────────────────────
  {
    name: 'Swaminarayan Akshardham Delhi',
    slug: 'swaminarayan-akshardham-delhi',
    city: 'New Delhi', state: 'Delhi',
    deity: 'Swaminarayan / Akshar Purushottam',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 28.6127, lng: 77.2773,
    description: 'The world\'s largest comprehensive Hindu temple complex as per Guinness World Records. Built by BAPS Swaminarayan Sanstha and inaugurated in 2005. Rising 43m high and spanning 109m long, carved from Rajasthani pink sandstone and Italian marble with 234 pillars, 9 domes and 20,000 murtis. Features Hall of Values with robotics, Yagnapurush Kund, and musical fountain.',
    timing: '9:30 AM - 6:30 PM (Closed Mondays)',
    best_time: 'October to March',
    dress_code: 'Modest traditional attire. No shorts, sleeveless, or tight clothing. No mobile phones inside.',
    festivals: 'Diwali Annakut, Swaminarayan Jayanti, Republic Day celebrations',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Akshardham_%28Delhi%29_in_October_2014.jpg/800px-Akshardham_%28Delhi%29_in_October_2014.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Akshardham_Temple',
    established: '2005',
    has_live: false,
  },
  {
    name: 'BAPS Swaminarayan Akshardham Gandhinagar',
    slug: 'baps-akshardham-gandhinagar',
    city: 'Gandhinagar', state: 'Gujarat',
    deity: 'Swaminarayan / Akshar Purushottam',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 23.2151, lng: 72.6369,
    description: 'The first Akshardham temple built by BAPS, inaugurated in 1992. Spread over 23 acres with a central gold-plated mandir, Sahajanand Van garden, and Trimandir. Features 97 carved pillars, stunning architecture and spiritual exhibitions. Precursor to the famous Delhi Akshardham.',
    timing: '9:30 AM - 7:30 PM (Closed Mondays)',
    best_time: 'October to March',
    dress_code: 'Modest traditional attire. No mobile phones inside mandir.',
    festivals: 'Annakut, Swaminarayan Jayanti, Diwali',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Akshardham_Gandhinagar.jpg/800px-Akshardham_Gandhinagar.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Swaminarayan_Akshardham_(Gandhinagar)',
    established: '1992',
  },
  // ── BAPS Major Mandirs in India ───────────────────────────────────────────
  {
    name: 'BAPS Shri Swaminarayan Mandir Mumbai',
    slug: 'baps-swaminarayan-mandir-mumbai',
    city: 'Mumbai', state: 'Maharashtra',
    deity: 'Swaminarayan / Akshar Purushottam',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 19.1136, lng: 72.8697,
    description: 'BAPS\'s grand mandir in Dadar, Mumbai. A prominent spiritual centre for the large Gujarati community in Mumbai. Regular sabhas, spiritual discourses and festivals throughout the year.',
    timing: '6:00 AM - 12:00 PM, 4:30 PM - 9:00 PM',
    best_time: 'Year-round',
    dress_code: 'Traditional attire. Men and women worship separately.',
    festivals: 'Swaminarayan Jayanti, Diwali Annakut, Janmashtami',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Shri_Swaminarayan_Mandir,_Mumbai',
    established: '1868',
  },
  {
    name: 'Shri Swaminarayan Mandir Mumbai Bhuleshwar',
    slug: 'swaminarayan-mandir-mumbai-bhuleshwar',
    city: 'Mumbai', state: 'Maharashtra',
    deity: 'Swaminarayan / Hari Krishna Maharaj / Ghanshyam',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 18.9646, lng: 72.8308,
    description: 'The historic Swaminarayan temple in Bhuleshwar, Mumbai built in 1868. Features an elaborately carved frontage and houses deities of Hari Krishna Maharaj, Gaulokvihari, Radha, Ghanshyam Maharaj and Lakshminarayan Dev. Dome painted with scenes from Krishnalila supported by 54 pillars.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM',
    best_time: 'Year-round',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Janmashtami, Hindola festival in Shravan, Ram Navami',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Shri_Swaminarayan_Mandir,_Mumbai',
    established: '1868',
  },
  {
    name: 'BAPS Swaminarayan Mandir Surat',
    slug: 'baps-swaminarayan-mandir-surat',
    city: 'Surat', state: 'Gujarat',
    deity: 'Swaminarayan / Akshar Purushottam',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 21.1702, lng: 72.8311,
    description: 'A major BAPS mandir in Surat serving the large Gujarati community. Known for its beautiful architecture, regular spiritual activities and Annakut festival celebrations.',
    timing: '6:00 AM - 12:00 PM, 4:30 PM - 9:00 PM',
    best_time: 'Year-round',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Annakut, Janmashtami, Diwali',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    established: '1907',
  },
  {
    name: 'Shri Swaminarayan Mandir Muli',
    slug: 'swaminarayan-mandir-muli',
    city: 'Muli', state: 'Gujarat',
    deity: 'Swaminarayan / Laxmi Narayan',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 22.6167, lng: 71.2833,
    description: 'One of the nine original temples established under Swaminarayan\'s direction in Surendranagar district. An important heritage temple of the Swaminarayan Sampraday with traditional Gujarati architecture.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Janmashtami, Annakut',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    established: '1830',
  },
  {
    name: 'Shri Swaminarayan Mandir Jetalpur',
    slug: 'swaminarayan-mandir-jetalpur',
    city: 'Jetalpur', state: 'Gujarat',
    deity: 'Swaminarayan',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 22.9500, lng: 72.6167,
    description: 'One of the historic temples established under Swaminarayan\'s direction. Located near Ahmedabad in Jetalpur. An important heritage site for the Swaminarayan Sampraday.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Janmashtami, Annakut',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    established: '1830',
  },
  {
    name: 'Shri Swaminarayan Mandir Dholka',
    slug: 'swaminarayan-mandir-dholka',
    city: 'Dholka', state: 'Gujarat',
    deity: 'Swaminarayan / Laxmi Narayan',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 22.4420, lng: 72.4680,
    description: 'One of the historic temples built under Swaminarayan\'s direction in Ahmedabad district. A beautiful example of traditional Swaminarayan temple architecture.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Janmashtami, Annakut',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    established: '1830',
  },
  {
    name: 'Sarangpur Hanuman Temple BAPS',
    slug: 'baps-sarangpur-hanuman-temple',
    city: 'Sarangpur', state: 'Gujarat',
    deity: 'Hanuman / Kastabhanjan Dev',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 22.1183, lng: 71.9181,
    description: 'Famous BAPS temple known for Kastabhanjan Hanumanji — the demon-destroying Hanuman. Thousands of devotees visit seeking relief from negative energies and mental afflictions. The Hanuman murti here is believed to be especially powerful. A unique Swaminarayan tradition temple where Hanuman is the central deity.',
    timing: '6:00 AM - 12:00 PM, 3:30 PM - 8:30 PM',
    best_time: 'October to March, Hanuman Jayanti',
    dress_code: 'Traditional attire.',
    festivals: 'Hanuman Jayanti, Annakut, Swaminarayan Jayanti, Saturday special darshan',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Sarangpur_Hanuman_temple',
    established: '1905',
  },
  {
    name: 'BAPS Swaminarayan Mandir Gondal',
    slug: 'baps-swaminarayan-mandir-gondal',
    city: 'Gondal', state: 'Gujarat',
    deity: 'Swaminarayan / Akshar Purushottam',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 21.9608, lng: 70.7887,
    description: 'A major BAPS mandir in Gondal, Rajkot district. Known for its beautiful architecture and as a centre of spiritual activity for Saurashtra region.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Annakut, Janmashtami',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    established: '1940',
  },
  {
    name: 'BAPS Swaminarayan Mandir Atladra Vadodara',
    slug: 'baps-swaminarayan-mandir-vadodara',
    city: 'Vadodara', state: 'Gujarat',
    deity: 'Swaminarayan / Akshar Purushottam',
    type: 'Swaminarayan',
    categories: 'Swaminarayan',
    lat: 22.2587, lng: 73.1661,
    description: 'The BAPS Swaminarayan mandir in Atladra, Vadodara — one of the major spiritual centres in Gujarat. Regular sabhas, yoga, and cultural programs throughout the year.',
    timing: '6:00 AM - 12:00 PM, 4:30 PM - 9:00 PM',
    best_time: 'Year-round',
    dress_code: 'Traditional attire.',
    festivals: 'Swaminarayan Jayanti, Annakut, Diwali, Janmashtami',
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Swaminarayan_temple_ahmedabad.jpg/800px-Swaminarayan_temple_ahmedabad.jpg',
    established: '1965',
  },
]

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

async function enrichWithGroq(temple) {
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
          content: `For the Swaminarayan temple "${temple.name}" in ${temple.city}, ${temple.state}, provide facilities and how to reach info.
Reply with JSON only:
{
  "facilities": {
    "toilets": "...", "parking": "...", "drinking_water": "...", "prasad": "...",
    "cloak_room": "...", "accommodation": "...", "wheelchair": "...",
    "atm": "...", "medical": "...", "free_meals": "..."
  },
  "how_to_reach": {
    "by_air": "...", "by_train": "...", "by_bus": "...", "by_taxi": "...", "local_tips": "..."
  },
  "nearby_places": [
    {"name": "...", "type": "...", "distance": "..."},
    {"name": "...", "type": "...", "distance": "..."},
    {"name": "...", "type": "...", "distance": "..."}
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

async function downloadImage(url, slug) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'DivyaDarshan/1.0 (https://divyadarshan.in)' },
      signal: AbortSignal.timeout(15000)
    })
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    if (buffer.byteLength < 5000) return null
    const blob = await put(`temples/${slug}.jpg`, Buffer.from(buffer), {
      access: 'public', token: BLOB_TOKEN, contentType: 'image/jpeg'
    })
    return blob.url
  } catch(e) { return null }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  console.log(`\nSeeding ${SWAMINARAYAN_TEMPLES.length} Swaminarayan temples...\n`)

  let added = 0, skipped = 0, failed = 0

  for (let i = 0; i < SWAMINARAYAN_TEMPLES.length; i++) {
    const t = SWAMINARAYAN_TEMPLES[i]
    process.stdout.write(`[${i+1}/${SWAMINARAYAN_TEMPLES.length}] ${t.name}... `)

    // Check if already exists
    const exists = await T.findOne({ slug: t.slug })
    if (exists) { console.log('SKIP (exists)'); skipped++; continue }

    // Enrich with Groq
    const enriched = await enrichWithGroq(t)
    await new Promise(r => setTimeout(r, 800))

    // Try to get blob image
    let blobUrl = null
    if (t.image_url) {
      blobUrl = await downloadImage(t.image_url, t.slug)
    }

    // Build temple document
    const doc = {
      ...t,
      blob_image_url: blobUrl || '',
      image_url: blobUrl || t.image_url || '',
      facilities:    enriched?.facilities || {},
      how_to_reach:  enriched?.how_to_reach || {},
      nearby_places: enriched?.nearby_places || [],
      rating_avg: 0,
      rating_count: 0,
      has_live: false,
      is_seasonal: false,
      extended_description: t.description,
    }

    try {
      await T.create(doc)
      console.log(blobUrl ? 'OK ✅' : 'OK (no image)')
      added++
    } catch(e) {
      console.log('FAILED:', e.message)
      failed++
    }
  }

  const total = await T.countDocuments()
  const swami = await T.countDocuments({ type: 'Swaminarayan' })

  console.log('\n=== Done! ===')
  console.log('Added:', added, '| Skipped:', skipped, '| Failed:', failed)
  console.log('Total temples in DB:', total)
  console.log('Swaminarayan temples:', swami)
  await mongoose.disconnect()
}

main().catch(console.error)
