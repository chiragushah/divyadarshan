// seed-jain-temples.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const { put } = require('@vercel/blob')

const GROQ_KEY = process.env.GROQ_API_KEY
const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN

const JAIN_TEMPLES = [
  // ── Rajasthan ─────────────────────────────────────────────────────────────
  {
    name: 'Muchhal Mahavir Temple',
    slug: 'muchhal-mahavir-temple',
    city: 'Ghanerao', state: 'Rajasthan',
    deity: 'Mahavira', type: 'Jain', categories: ['Jain'],
    lat: 25.4667, lng: 73.6333,
    description: 'Famous Jain temple known for the unique mustachioed idol of Mahavira — the only temple in the world where Mahavira is depicted with a moustache. Located in Ghanerao village near Sadri in Pali district. Part of the Gorwad Panch Tirth pilgrimage circuit. The idol is believed to be self-manifested (swayambhu).',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM',
    best_time: 'October to March',
    dress_code: 'White or light coloured clothes. Remove footwear and leather items.',
    festivals: 'Mahavir Jayanti, Paryushana, Diwali, Kartik Purnima',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Muchhal_Mahavir',
  },
  {
    name: 'Rishabhdeo Temple Dhulev',
    slug: 'rishabhdeo-temple-dhulev',
    city: 'Rishabhdeo', state: 'Rajasthan',
    deity: 'Rishabhanatha (Adinath)', type: 'Jain', categories: ['Jain'],
    lat: 24.0833, lng: 73.6833,
    description: 'One of the most important Jain pilgrimage sites in Rajasthan, dedicated to Adinath (Rishabhanatha) — the first Tirthankara. The black marble idol is believed to be over 1000 years old. Located in Dhulev village in Udaipur district. Thousands of pilgrims visit daily. Also venerated by the Bhil tribal community who call the deity Kalaji.',
    timing: '5:30 AM - 1:00 PM, 3:00 PM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'White clothes preferred. No leather items inside temple.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima, Fairs on Shravan Ekadashi',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Rishabhdeo',
  },
  {
    name: 'Sanghiji Jain Temple Sanganer',
    slug: 'sanghiji-jain-temple-sanganer',
    city: 'Sanganer', state: 'Rajasthan',
    deity: 'Adinath', type: 'Jain', categories: ['Jain'],
    lat: 26.8167, lng: 75.8333,
    description: 'Ancient Jain temple in Sanganer near Jaipur, known for its beautiful architecture and intricate carvings. Sanganer is famous for block printing and handmade paper. The temple complex houses multiple shrines and is an important pilgrimage centre for Jains of Rajasthan.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM',
    best_time: 'October to March',
    dress_code: 'White clothes. Remove footwear and leather items.',
    festivals: 'Mahavir Jayanti, Paryushana, Diwali',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Sanganer',
  },
  {
    name: 'Narlai Jain Temples',
    slug: 'narlai-jain-temples',
    city: 'Narlai', state: 'Rajasthan',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 25.2167, lng: 73.5167,
    description: 'Ancient village of Narlai in Pali district with over 350 temples and shrines. Part of the Gorwad Panch Tirth Jain pilgrimage circuit. The village is dominated by a massive rock and has beautiful Jain temples dating back several centuries. Also known as Elephant Rock due to the giant rock formation resembling an elephant.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM',
    best_time: 'October to March',
    dress_code: 'White clothes. Remove footwear and leather items.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima',
  },
  // ── Gujarat ───────────────────────────────────────────────────────────────
  {
    name: 'Vimal Vasahi Temple Mount Abu',
    slug: 'vimal-vasahi-temple-mount-abu',
    city: 'Mount Abu', state: 'Rajasthan',
    deity: 'Adinath', type: 'Jain', categories: ['Jain'],
    lat: 24.5926, lng: 72.7156,
    description: 'One of the Dilwara Temples on Mount Abu, built in 1031 CE by Vimal Shah. Considered one of the finest examples of Jain architecture. Made entirely of white marble with intricate carvings so detailed they resemble lace. The main idol of Adinath is made of white marble. A UNESCO tentative World Heritage Site.',
    timing: '12:00 PM - 6:00 PM (Non-Jains), 6:00 AM - 6:00 PM (Jains)',
    best_time: 'October to March',
    dress_code: 'White clothes mandatory. No photography inside. Strict dress code enforced.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Dilwara_Temples',
  },
  {
    name: 'Luna Vasahi Temple Mount Abu',
    slug: 'luna-vasahi-temple-mount-abu',
    city: 'Mount Abu', state: 'Rajasthan',
    deity: 'Neminatha', type: 'Jain', categories: ['Jain'],
    lat: 24.5930, lng: 72.7160,
    description: 'The second of the Dilwara Temples, built in 1230 CE by Tejpal and Vastupal — ministers of the Solanki kingdom. Dedicated to Neminatha, the 22nd Tirthankara. Famous for its intricate marble carvings, including a stunning lotus ceiling in the main hall. Considered even finer than Vimal Vasahi.',
    timing: '12:00 PM - 6:00 PM (Non-Jains), 6:00 AM - 6:00 PM (Jains)',
    best_time: 'October to March',
    dress_code: 'White clothes mandatory. No photography inside.',
    festivals: 'Mahavir Jayanti, Paryushana',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Dilwara_Temples',
  },
  {
    name: 'Shatrunjaya Jain Tirth Palitana',
    slug: 'shatrunjaya-jain-tirth-palitana',
    city: 'Palitana', state: 'Gujarat',
    deity: 'Adinath / Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 21.5244, lng: 71.8239,
    description: 'Shatrunjaya hill in Palitana is considered the holiest Jain pilgrimage site. The hill has over 900 temples built over 900 years, making it the world\'s largest temple complex. Pilgrims climb 3,800 steps to reach the summit. Palitana is the only city in the world that has banned the slaughter of animals and sale of meat.',
    timing: '6:00 AM - 6:00 PM (Sunrise to Sunset)',
    best_time: 'October to March (avoid monsoon)',
    dress_code: 'White clothes. No footwear on the hill. Food not allowed on hill.',
    festivals: 'Mahavir Jayanti, Kartik Purnima (major fair), Paryushana',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Shatrunjaya',
  },
  {
    name: 'Gir Somnath Jain Temples',
    slug: 'gir-somnath-jain-temples',
    city: 'Veraval', state: 'Gujarat',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 20.9159, lng: 70.3629,
    description: 'Ancient Jain temples near Veraval and Somnath in Gir Somnath district. The region has significant Jain heritage with temples dating back to medieval times. Important pilgrimage destination for Jains visiting the Saurashtra region.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM',
    best_time: 'October to March',
    dress_code: 'White or light coloured clothes. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima',
  },
  {
    name: 'Modasa Jain Temple',
    slug: 'modasa-jain-temple',
    city: 'Modasa', state: 'Gujarat',
    deity: 'Parshvanatha', type: 'Jain', categories: ['Jain'],
    lat: 23.4667, lng: 73.3000,
    description: 'Important Jain temple in Modasa town of Aravalli district, Gujarat. A significant pilgrimage centre for the Jain community of north Gujarat. Known for its beautiful architecture and the peaceful atmosphere.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM',
    best_time: 'Year-round',
    dress_code: 'White clothes. Remove footwear and leather items.',
    festivals: 'Mahavir Jayanti, Paryushana, Diwali',
  },
  // ── Karnataka ─────────────────────────────────────────────────────────────
  {
    name: 'Chaturmukha Basadi Karkala',
    slug: 'chaturmukha-basadi-karkala',
    city: 'Karkala', state: 'Karnataka',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 13.2167, lng: 74.9833,
    description: 'The Chaturmukha Basadi (four-faced temple) in Karkala is a unique Jain temple with shrines facing all four directions. Located in coastal Karnataka, it is part of the Karkala Jain complex which also includes the 42-feet Gommateshwara statue. An important heritage site of medieval Jain architecture.',
    timing: '6:00 AM - 8:00 PM',
    best_time: 'October to February',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahamastakabhisheka (every 12 years), Mahavir Jayanti',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Karkala',
  },
  {
    name: 'Varanga Jain Temple',
    slug: 'varanga-jain-temple',
    city: 'Varanga', state: 'Karnataka',
    deity: 'Parshvanatha', type: 'Jain', categories: ['Jain'],
    lat: 13.5333, lng: 74.9167,
    description: 'Varanga is an important Jain pilgrimage centre in coastal Karnataka. The Kere Basadi temple here is uniquely located in the middle of a lake and can only be reached by boat. The temple complex has many ancient basadis and is known for its scenic beauty surrounded by water.',
    timing: '6:00 AM - 8:00 PM',
    best_time: 'October to February',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana',
  },
  {
    name: 'Kanakagiri Jain Tirth',
    slug: 'kanakagiri-jain-tirth',
    city: 'Kanakagiri', state: 'Karnataka',
    deity: 'Parshvanatha', type: 'Jain', categories: ['Jain'],
    lat: 15.2167, lng: 75.7833,
    description: 'Kanakagiri (also called Kanakachala) is an important Digambara Jain pilgrimage site in Koppal district, Karnataka. The temple is situated on a hill and houses a 25-feet idol of Parshvanatha. An important Jain tirth of north Karnataka.',
    timing: '6:00 AM - 8:00 PM',
    best_time: 'October to February',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Kanakagiri_Jain_tirth',
  },
  {
    name: 'Aihole Jain Temple Complex',
    slug: 'aihole-jain-temple-complex',
    city: 'Aihole', state: 'Karnataka',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain', 'UNESCO'],
    lat: 16.0167, lng: 75.8833,
    description: 'Aihole in Bagalkot district houses an important Jain temple complex including the Meguti Jain Temple (634 CE) — one of the earliest dated Jain temples in India. The Meguti temple is built in Dravidian style atop a hill. Part of the UNESCO World Heritage tentative list along with other Aihole temples.',
    timing: '6:00 AM - 6:00 PM',
    best_time: 'October to March',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Aihole',
  },
  // ── Madhya Pradesh ────────────────────────────────────────────────────────
  {
    name: 'Siddhachal Caves Gwalior Fort',
    slug: 'siddhachal-caves-gwalior-fort',
    city: 'Gwalior', state: 'Madhya Pradesh',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 26.2297, lng: 78.1739,
    description: 'The Siddhachal Caves inside Gwalior Fort contain dozens of large rock-cut Jain sculptures carved between the 7th and 15th centuries. The caves house massive statues of Tirthankaras — the largest being a 57-feet statue of Adinath. One of the finest examples of Jain rock-cut art in India.',
    timing: '8:00 AM - 5:30 PM',
    best_time: 'October to March',
    dress_code: 'Modest attire. Entry ticket required for Gwalior Fort.',
    festivals: 'Mahavir Jayanti, Paryushana',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Siddhachal_Caves',
  },
  {
    name: 'Khajuraho Jain Temples',
    slug: 'khajuraho-jain-temples',
    city: 'Khajuraho', state: 'Madhya Pradesh',
    deity: 'Parshvanatha / Adinath / Shantinatha', type: 'Jain', categories: ['Jain', 'UNESCO'],
    lat: 24.8520, lng: 79.9356,
    description: 'The Jain temple complex at Khajuraho includes the Parshvanatha temple, Adinatha temple, Shantinatha temple and Ghantai temple. The Parshvanatha temple is the largest of the Jain temples and contains exquisite erotic carvings. Part of the UNESCO World Heritage Site of Khajuraho Group of Monuments.',
    timing: '8:00 AM - 6:00 PM',
    best_time: 'October to March',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana, Khajuraho Dance Festival (Feb-Mar)',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Jain_temples_of_Khajuraho',
  },
  {
    name: 'Deogarh Jain Temples',
    slug: 'deogarh-jain-temples',
    city: 'Deogarh', state: 'Madhya Pradesh',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 24.5333, lng: 78.2500,
    description: 'Deogarh (Devgarh) in Lalitpur district has an impressive group of 31 Jain temples dating from the 8th to 17th centuries. The temples are carved into rock and house numerous Tirthankara images. An important but lesser-known Jain heritage site in Bundelkhand.',
    timing: '7:00 AM - 5:00 PM',
    best_time: 'October to March',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Deogarh,_Lalitpur',
  },
  // ── Tamil Nadu ────────────────────────────────────────────────────────────
  {
    name: 'Kalugumalai Jain Rock-Cut Temples',
    slug: 'kalugumalai-jain-rock-cut-temples',
    city: 'Kalugumalai', state: 'Tamil Nadu',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 9.1500, lng: 77.7000,
    description: 'Kalugumalai (Kazhugumalai) in Thoothukudi district has magnificent Jain rock-cut sculptures dating to the 8th century. The sculptures carved on the granite hill depict Tirthankaras in various postures. Considered one of the finest examples of early Pandya-period Jain art. Also has a famous Murugan temple nearby.',
    timing: '6:00 AM - 6:00 PM',
    best_time: 'October to February',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Kalugumalai',
  },
  {
    name: 'Sittannavasal Cave Temple',
    slug: 'sittannavasal-cave-temple',
    city: 'Sittannavasal', state: 'Tamil Nadu',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 10.4833, lng: 78.7167,
    description: 'Sittannavasal in Pudukkottai district is a Jain cave temple dating to the 2nd century BCE. Famous for its beautiful Jain frescoes painted on the ceiling — considered comparable to Ajanta paintings. The paintings depict lotus pond, fish, geese and Tirthankaras. A protected monument of national importance.',
    timing: '9:00 AM - 5:00 PM',
    best_time: 'October to February',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Sittannavasal',
  },
  // ── Bihar / Jharkhand ─────────────────────────────────────────────────────
  {
    name: 'Rajgir Jain Sites',
    slug: 'rajgir-jain-sites',
    city: 'Rajgir', state: 'Bihar',
    deity: 'Mahavira / Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 25.0167, lng: 85.4167,
    description: 'Rajgir is deeply sacred to Jains as Lord Mahavira spent many years here during his spiritual journey. The Vipulachal hill has ancient Jain temples and the famous Sona Bhandar caves with Jain rock-cut carvings. Maniyar Math and Griddhakuta Hill are also important Jain sites in the area.',
    timing: '6:00 AM - 6:00 PM',
    best_time: 'October to March',
    dress_code: 'Modest attire. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Rajgir',
  },
  {
    name: 'Hastinapur Jain Tirth',
    slug: 'hastinapur-jain-tirth',
    city: 'Hastinapur', state: 'Uttar Pradesh',
    deity: 'Shantinatha / Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 29.1667, lng: 78.0167,
    description: 'Hastinapur is an important Jain pilgrimage site as it is the birthplace of three Tirthankaras — Shantinatha (16th), Kunthunatha (17th) and Aranatha (18th). The Digambar Jain Bada Mandir is the main attraction. The site also has a famous Jain museum and Kailash Parvat — a man-made holy mountain.',
    timing: '5:30 AM - 8:30 PM',
    best_time: 'October to March',
    dress_code: 'White clothes preferred. Remove footwear and leather items.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima (major fair)',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Hastinapur',
  },
  {
    name: 'Ayodhya Jain Temples',
    slug: 'ayodhya-jain-temples',
    city: 'Ayodhya', state: 'Uttar Pradesh',
    deity: 'Rishabhanatha / Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 26.7950, lng: 82.1942,
    description: 'Ayodhya is sacred to Jains as the birthplace of Rishabhanatha (Adinath) — the first Tirthankara, and also birthplace of four other Tirthankaras. The Kanak Bhawan Jain temple and multiple other Jain temples in Ayodhya attract pilgrims from across India. An important Jain tirth alongside its Hindu significance.',
    timing: '5:30 AM - 9:00 PM',
    best_time: 'October to March',
    dress_code: 'White or light coloured clothes. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana, Ram Navami',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Ayodhya',
  },
  // ── Maharashtra ───────────────────────────────────────────────────────────
  {
    name: 'Antri Jain Temple Nagpur',
    slug: 'antri-jain-temple-nagpur',
    city: 'Nagpur', state: 'Maharashtra',
    deity: 'Parshvanatha', type: 'Jain', categories: ['Jain'],
    lat: 21.1458, lng: 79.0882,
    description: 'Important Jain temple in Nagpur serving the large Jain community of Vidarbha. A significant pilgrimage centre for both Digambara and Shvetambara Jains of central India. Known for its beautiful architecture and regular religious activities.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:30 PM',
    best_time: 'Year-round',
    dress_code: 'White clothes. Remove footwear and leather items.',
    festivals: 'Mahavir Jayanti, Paryushana, Diwali',
  },
  {
    name: 'Mangi Tungi Jain Temple',
    slug: 'mangi-tungi-jain-temple',
    city: 'Satana', state: 'Maharashtra',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 20.6833, lng: 74.2167,
    description: 'Mangi Tungi in Nashik district is a sacred Jain pilgrimage site with twin hills. The site has 108 carved Tirthankara idols and a 108-feet statue of Rishabhanatha consecrated in 2016. Pilgrims climb 4500 steps to reach the summit. Known as the Jain equivalent of Palitana in Maharashtra.',
    timing: '6:00 AM - 6:00 PM',
    best_time: 'October to March',
    dress_code: 'White clothes. Remove footwear on the hill.',
    festivals: 'Mahavir Jayanti, Paryushana, Kartik Purnima',
    wikipedia_url: 'https://en.wikipedia.org/wiki/Mangi_Tungi',
  },
  // ── Uttarakhand ───────────────────────────────────────────────────────────
  {
    name: 'Rishikesh Jain Temple',
    slug: 'rishikesh-jain-temple',
    city: 'Rishikesh', state: 'Uttarakhand',
    deity: 'Multiple Tirthankaras', type: 'Jain', categories: ['Jain'],
    lat: 30.0869, lng: 78.2676,
    description: 'Jain temple in Rishikesh serving pilgrims and tourists visiting the holy city. Located near the Ganges, this temple provides a spiritual retreat for Jain pilgrims combining their visit to Rishikesh with Jain worship. Beautiful views of the Himalayas from the temple premises.',
    timing: '6:00 AM - 12:00 PM, 4:00 PM - 8:00 PM',
    best_time: 'October to April',
    dress_code: 'White clothes. Remove footwear.',
    festivals: 'Mahavir Jayanti, Paryushana',
  },
]

async function enrichWithGroq(temple) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 700,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: `For the Jain temple "${temple.name}" in ${temple.city}, ${temple.state}, provide facilities and how to reach.
Reply with JSON only:
{
  "facilities": {
    "toilets": "✅/❌/⚠️ ...",
    "parking": "✅/❌/⚠️ ...",
    "drinking_water": "✅/❌/⚠️ ...",
    "prasad": "✅/❌/⚠️ ...",
    "cloak_room": "✅/❌/⚠️ ...",
    "accommodation": "✅/❌/⚠️ ...",
    "wheelchair": "✅/❌/⚠️ ...",
    "atm": "✅/❌/⚠️ ...",
    "medical": "✅/❌/⚠️ ...",
    "free_meals": "✅/❌/⚠️ ..."
  },
  "how_to_reach": {
    "by_air": "✈️ ...",
    "by_train": "🚆 ...",
    "by_bus": "🚌 ...",
    "by_taxi": "🚕 ...",
    "local_tips": "💡 ..."
  },
  "nearby_places": [
    {"name": "...", "type": "temple/heritage/nature/default", "distance": "..."},
    {"name": "...", "type": "temple/heritage/nature/default", "distance": "..."},
    {"name": "...", "type": "temple/heritage/nature/default", "distance": "..."}
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
      signal: AbortSignal.timeout(20000)
    })
    if (!res.ok) return null
    const buffer = await res.arrayBuffer()
    if (buffer.byteLength < 5000) return null
    const ext = imageUrl.match(/\.(jpg|jpeg|png)/i)?.[1]?.toLowerCase() || 'jpg'
    const blob = await put(`temples/jain-${slug}.${ext}`, Buffer.from(buffer), {
      access: 'public', token: BLOB_TOKEN,
      contentType: ext === 'png' ? 'image/png' : 'image/jpeg',
    })
    return blob.url
  } catch(e) { return null }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  // Get fallback image from existing Jain temple
  const fallbackRef = await T.findOne({ type: 'Jain', blob_image_url: { $exists: true, $ne: '' } }, { blob_image_url: 1 }).lean()
  const fallbackUrl = fallbackRef?.blob_image_url

  console.log(`\nSeeding ${JAIN_TEMPLES.length} new Jain temples...\n`)

  let added = 0, skipped = 0

  for (let i = 0; i < JAIN_TEMPLES.length; i++) {
    const t = JAIN_TEMPLES[i]
    process.stdout.write(`[${i+1}/${JAIN_TEMPLES.length}] ${t.name}... `)

    // Check if exists
    const exists = await T.findOne({ slug: t.slug })
    if (exists) { console.log('SKIP'); skipped++; continue }

    // Get image from Wikipedia
    let blobUrl = null
    if (t.wikipedia_url) {
      const pageTitle = t.wikipedia_url.split('/wiki/')[1]
      const imageUrl = await getImageFromWikipedia(pageTitle)
      if (imageUrl) blobUrl = await downloadAndUpload(imageUrl, t.slug)
    }

    // Enrich with Groq
    const enriched = await enrichWithGroq(t)
    await new Promise(r => setTimeout(r, 700))

    // Build doc
    const doc = {
      ...t,
      blob_image_url: blobUrl || fallbackUrl || '',
      image_url: blobUrl || fallbackUrl || '',
      facilities: enriched?.facilities || {
        toilets: '✅ Yes — Toilet facilities at temple premises',
        parking: '✅ Yes — Parking available near temple',
        drinking_water: '✅ Yes — Free drinking water available',
        prasad: '✅ Yes — Prasad available at temple',
        cloak_room: '✅ Yes — Remove footwear at entry. Cloak room available.',
        accommodation: '✅ Dharamshalas available near temple. Contact temple for bookings.',
        wheelchair: '⚠️ Partial — contact temple management for assistance',
        atm: '✅ ATM available in nearby market',
        medical: '✅ First aid at temple. Nearest hospital in town.',
        free_meals: '✅ Yes — Free meals on Mahavir Jayanti and Paryushana festival',
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
  const jain = await T.countDocuments({ type: 'Jain' })

  console.log('\n=== Done! ===')
  console.log('Added:', added, '| Skipped:', skipped)
  console.log('Total temples:', total)
  console.log('Jain temples:', jain)

  await mongoose.disconnect()
}

main().catch(console.error)
