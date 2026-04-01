/**
 * Seeds 5 Yatra Packages into MongoDB
 * Usage: node seed-packages.js
 */
const fs = require('fs')
const { MongoClient } = require('mongodb')

let MONGODB_URI = ''
try {
  const env = fs.readFileSync('.env.local', 'utf8')
  const match = env.match(/MONGODB_URI=(.+)/)
  if (match) MONGODB_URI = match[1].trim()
} catch(e) { process.exit(1) }

const PACKAGES = [
  {
    slug: 'char-dham-yatra-12-days',
    title: 'Char Dham Yatra',
    subtitle: 'Sacred journey to all four holy abodes — Yamunotri, Gangotri, Kedarnath and Badrinath',
    circuit: 'Char Dham',
    duration_days: 12,
    price_from: 24999,
    price_to: 45000,
    temples: ['yamunotri-temple','gangotri-temple','kedarnath-temple','badrinath-temple'],
    states: ['Uttarakhand'],
    difficulty: 'Challenging',
    group_size: '4-20 pilgrims',
    is_featured: true,
    best_months: ['May','June','September','October'],
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kedarnath_Temple.jpg/600px-Kedarnath_Temple.jpg',
    highlights: [
      'All four sacred Char Dhams in one pilgrimage',
      'Helicopter option available for Kedarnath',
      'Expert local guides at each temple',
      'All accommodation arranged — from Haridwar to Badrinath',
      'Witness Ganga Aarti at Haridwar on arrival',
      'Trek to Kedarnath (22km) with support',
    ],
    inclusions: [
      'AC sleeper bus from Delhi to Haridwar',
      'All hotel stays (double occupancy)',
      'Daily breakfast and dinner',
      'Local transport between all 4 dhams',
      'Temple guide at each location',
      'Medical kit and oxygen support',
      'Kedarnath trek porter (1 per 2 pilgrims)',
    ],
    exclusions: [
      'Flights to Delhi',
      'Personal expenses and tips',
      'Helicopter to Kedarnath (₹8,500 optional)',
      'Darshan tickets and puja expenses',
      'Travel insurance',
    ],
    itinerary: [
      { day:1, title:'Delhi to Haridwar', description:'Overnight sleeper bus from Delhi. Arrive Haridwar early morning. Check in, freshen up. Evening Ganga Aarti at Har Ki Pauri — one of the most moving sights in India. Dinner and rest.', temples:['Har Ki Pauri, Haridwar'] },
      { day:2, title:'Haridwar to Barkot', description:'Drive 185km to Barkot via Mussoorie and Dharasu. Mountain roads, pine forests. Arrive by evening. This is the base for Yamunotri. Dinner and acclimatisation rest.', temples:[] },
      { day:3, title:'Yamunotri (First Dham)', description:'Early 6AM start. Drive to Janki Chatti then 6km trek to Yamunotri temple. Cook rice in Surya Kund (sacred hot spring). Darshan of Goddess Yamuna. Trek back. Return to Barkot.', temples:['Yamunotri Temple'] },
      { day:4, title:'Barkot to Uttarkashi', description:'Drive to Uttarkashi (96km, 4hr). Visit Vishwanath Temple in Uttarkashi town. Rest and acclimatisation.', temples:['Vishwanath Temple Uttarkashi'] },
      { day:5, title:'Gangotri (Second Dham)', description:'Drive 100km to Gangotri. Darshan at Gangotri temple — source of sacred Ganga. Bathe in Bhagirathi river. Optional walk to Suryakund. Return to Uttarkashi overnight.', temples:['Gangotri Temple'] },
      { day:6, title:'Uttarkashi to Guptkashi', description:'Long drive (220km, 8hr) to Guptkashi via Tehri Dam. Scenic mountain highway. Guptkashi is the base for Kedarnath. Evening Kashi Vishwanath darshan in Guptkashi.', temples:['Ardhnarishwar Temple Guptkashi'] },
      { day:7, title:'Kedarnath Trek Day 1', description:'Drive to Sonprayag, then shared jeep to Gaurikund (trek base). Begin 22km trek to Kedarnath. Stay at base camp. Options: pony (₹1,500), palki (₹5,000) or helicopter (₹8,500 extra).', temples:[] },
      { day:8, title:'Kedarnath (Third Dham)', description:'Early 4AM rise for first darshan at Kedarnath Jyotirlinga. Magnificent sunrise over Himalayan peaks. Shankaracharya samadhi visit. Trek back to Gaurikund. Drive to Guptkashi.', temples:['Kedarnath Temple'] },
      { day:9, title:'Guptkashi to Badrinath', description:'Drive 220km to Badrinath via Joshimath. Stop at Devprayag (Ganga-Alaknanda confluence) and Rudraprayag. Arrive Badrinath by evening. Rest and preparation.', temples:[] },
      { day:10, title:'Badrinath (Fourth Dham)', description:'Early 4:30AM Maha Abhishek puja. Darshan of Lord Badrinarayan. Visit Tapt Kund (hot spring), Brahma Kapal, Mana Village (last village before Tibet). Evening return to Joshimath.', temples:['Badrinath Temple','Mata Murti Temple'] },
      { day:11, title:'Joshimath to Rishikesh', description:'Drive back to Rishikesh (250km). Stop at Devprayag. Arrive by evening. Lakshman Jhula walk, evening aarti at Triveni Ghat. Celebration dinner.', temples:['Triveni Ghat Rishikesh'] },
      { day:12, title:'Rishikesh to Delhi', description:'Morning yoga on banks of Ganga. Visit Ram Jhula temples. AC bus back to Delhi (230km, 6hr). Drop at ISBT Delhi by evening. Yatra complete — Har Har Mahadev!', temples:[] },
    ],
  },

  {
    slug: 'ashtavinayak-yatra-3-days',
    title: 'Ashtavinayak Yatra',
    subtitle: 'Complete circuit of all 8 sacred Ganesha temples in Maharashtra — the most auspicious pilgrimage in the state',
    circuit: 'Ashtavinayak',
    duration_days: 3,
    price_from: 8999,
    price_to: 16000,
    temples: ['siddhivinayak-temple','ashtavinayak-morgaon-temple','ashtavinayak-siddhatek-temple'],
    states: ['Maharashtra'],
    difficulty: 'Easy',
    group_size: '2-30 pilgrims',
    is_featured: true,
    best_months: ['January','February','March','October','November','December'],
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Siddhivinayak_Temple_Mumbai.jpg/600px-Siddhivinayak_Temple_Mumbai.jpg',
    highlights: [
      'All 8 Ashtavinayak shrines completed in sequence',
      'Traditional order — Morgaon first and last',
      'Expert Ganesha guide explains significance of each',
      'All 8 temples within 300km of Pune — manageable circuit',
      'Modak prasad at each temple',
      'Ganesh Chaturthi extension available',
    ],
    inclusions: [
      'AC mini-coach for full circuit',
      'Hotel stay in Pune (2 nights)',
      'Breakfast each morning',
      'Temple guide (English/Marathi)',
      'Modak prasad at each temple',
    ],
    exclusions: [
      'Train/flight to Pune',
      'Lunch and dinner (local food recommended)',
      'Personal puja expenses',
      'Travel insurance',
    ],
    itinerary: [
      { day:1, title:'Pune → Morgaon → Siddhatek → Pali', description:'Start at Morgaon (Mayureshwar — first and most important). Then Siddhatek (only south-facing trunk Ganesha). End at Pali (Ballaleshwar). 3 temples today. Overnight Pune.', temples:['Morgaon Mayureshwar','Siddhatek Siddhivinayak','Pali Ballaleshwar'] },
      { day:2, title:'Mahad → Theur → Lenyadri → Ozar', description:'Varad Vinayak at Mahad on river bank. Chintamani at Theur (Peshwa royal temple). Cave temple at Lenyadri (283 steps). Vighneshwar at Ozar with golden dome. 4 temples. Long day — worth it.', temples:['Mahad Varad Vinayak','Theur Chintamani','Lenyadri Girijatmaj','Ozar Vighneshwar'] },
      { day:3, title:'Ranjangaon → Morgaon (completion)', description:'Mahaganapati at Ranjangaon (10-trunked Ganesha). Return to Morgaon to complete the circuit — tradition says start and end here. Celebration darshan. Return to Pune. Journey ends — Ganpati Bappa Morya!', temples:['Ranjangaon Mahaganapati','Morgaon Completion Darshan'] },
    ],
  },

  {
    slug: 'jyotirlinga-maharashtra-4-days',
    title: '3 Jyotirlingas of Maharashtra',
    subtitle: 'Trimbakeshwar, Bhimashankar and Grishneshwar — the three sacred Shiva Jyotirlingas of Maharashtra in one journey',
    circuit: 'Jyotirlinga',
    duration_days: 4,
    price_from: 12999,
    price_to: 22000,
    temples: ['trimbakeshwar-temple','bhimashankar-temple','grishneshwar-temple'],
    states: ['Maharashtra'],
    difficulty: 'Moderate',
    group_size: '2-20 pilgrims',
    is_featured: false,
    best_months: ['October','November','December','January','February','March'],
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Trimbakeshwar_Shiva_Temple.jpg/600px-Trimbakeshwar_Shiva_Temple.jpg',
    highlights: [
      '3 Jyotirlingas in 4 days',
      'Nashik Kumbh Mela site and Godavari source at Trimbakeshwar',
      'Wildlife sanctuary trek at Bhimashankar',
      'Ellora Caves (UNESCO) adjacent to Grishneshwar',
      'Shirdi Sai Baba add-on available (extra day)',
    ],
    inclusions: [
      'AC transport throughout',
      'Hotel stays (3 nights)',
      'Daily breakfast',
      'Temple guide',
      'Ellora Caves entry fee',
    ],
    exclusions: [
      'Travel to Nashik/Pune',
      'Meals (lunch/dinner)',
      'Personal puja expenses',
      'Shirdi extension (₹4,000 extra)',
    ],
    itinerary: [
      { day:1, title:'Mumbai/Pune to Nashik — Trimbakeshwar', description:'Drive to Nashik. Check in. Afternoon: Trimbakeshwar Jyotirlinga — three-faced black Shivalinga at source of Godavari. 22km from Nashik. Rudrabhishek puja. Kalaram Temple in Nashik evening.', temples:['Trimbakeshwar Temple','Kalaram Temple Nashik'] },
      { day:2, title:'Bhimashankar Jyotirlinga', description:'Early start. Drive 110km to Bhimashankar inside the wildlife sanctuary. Trek through forest (4km) to reach the temple at 3,250 feet. Magnificent Sahyadri views. Sacred Bhima river source. Return to Nashik.', temples:['Bhimashankar Temple'] },
      { day:3, title:'Nashik to Aurangabad — Grishneshwar', description:'Drive 250km to Aurangabad. En route stop at Shirdi (optional). Afternoon: Grishneshwar — last of 12 Jyotirlingas. Men enter bare-chested (dhoti provided). UNESCO Ellora Caves (2km away) in late afternoon.', temples:['Grishneshwar Temple','Ellora Kailash Cave'] },
      { day:4, title:'Aurangabad to Mumbai/Pune', description:'Morning: Daulatabad Fort or Bibi ka Maqbara. Drive back to Mumbai (350km) or Pune (230km). Arrive by evening. Har Har Mahadev — three Jyotirlingas complete!', temples:[] },
    ],
  },

  {
    slug: 'south-india-temples-8-days',
    title: 'South India Temple Circuit',
    subtitle: 'Tamil Nadu and Kerala grand circuit — Meenakshi, Brihadeeswarar, Ramanathaswamy, Tirupati and more',
    circuit: 'South India',
    duration_days: 8,
    price_from: 19999,
    price_to: 38000,
    temples: ['meenakshi-amman-temple','brihadeeswarar-temple','ramanathaswamy-temple','tirumala-venkateswara-temple','guruvayur-krishna-temple'],
    states: ['Tamil Nadu','Andhra Pradesh','Kerala'],
    difficulty: 'Easy',
    group_size: '2-30 pilgrims',
    is_featured: true,
    best_months: ['October','November','December','January','February','March'],
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Meenakshi_Amman_Temple_Madurai.jpg/600px-Meenakshi_Amman_Temple_Madurai.jpg',
    highlights: [
      'UNESCO World Heritage Brihadeeswarar in Thanjavur',
      'Longest temple corridor in the world at Ramanathaswamy',
      'Tirupati darshan with pre-booked special entry',
      'Guruvayur Krishna — most sacred Kerala temple',
      'Meenakshi Amman evening ceremony (alankaram)',
      'Pamban Bridge train journey — India most spectacular rail ride',
    ],
    inclusions: [
      'Train: Chennai-Madurai-Rameswaram-Tirupati (all AC)',
      'All hotel stays (7 nights)',
      'Daily breakfast and dinner',
      'AC car for local sightseeing',
      'Temple guide at each location',
      'Tirupati Special Entry darshan (pre-booked)',
    ],
    exclusions: [
      'Flights to Chennai / from Kochi',
      'Lunch',
      'Personal puja and offering expenses',
    ],
    itinerary: [
      { day:1, title:'Arrive Chennai — Kapaleeshwarar', description:'Arrive Chennai. Check in hotel. Evening: Kapaleeshwarar Temple in Mylapore — 7th century Dravidian. Dinner at Sangeetha restaurant. Overnight Chennai.', temples:['Kapaleeshwarar Temple'] },
      { day:2, title:'Chennai to Kanchipuram — Kanchi Temples', description:'Day trip to Kanchipuram (75km) — city of 1,000 temples. Ekambareswarar (Pancha Bhuta Earth), Kailasanatha (8th century), Kamakshi Amman, Varadharaja Perumal. Return Chennai.', temples:['Ekambareswarar','Kamakshi Amman','Varadharaja Perumal'] },
      { day:3, title:'Chennai to Thanjavur — Brihadeeswarar', description:'Train to Thanjavur (7hr). Afternoon: Brihadeeswarar UNESCO temple — 1,010 year old Chola masterpiece. Shadow disappears at noon. Royal Palace museum. Overnight Thanjavur.', temples:['Brihadeeswarar Temple'] },
      { day:4, title:'Thanjavur to Madurai — Meenakshi', description:'Morning: Kumbakonam temples (30km). Train to Madurai. Evening: Meenakshi Amman — 14 gopurams, 33,000 sculptures. Attend the 9PM Alankaram ceremony — the deity is carried to the sanctum.', temples:['Meenakshi Amman Temple'] },
      { day:5, title:'Madurai to Rameswaram', description:'Drive/train to Rameswaram (170km) via Pamban Bridge — a spectacle over the sea. Ramanathaswamy Jyotirlinga — 22 sacred wells, ritual bath. 1,212m corridor. Overnight Rameswaram.', temples:['Ramanathaswamy Temple'] },
      { day:6, title:'Rameswaram to Tirupati', description:'Early darshan at Ramanathaswamy. Drive/train to Tirupati (300km). Ritual hair tonsure optional. Early check-in at TTD guesthouse. Rest for next day darshan.', temples:[] },
      { day:7, title:'Tirupati Darshan', description:'4AM: Tirupati Venkateswara special entry (pre-booked). The most visited temple on Earth. Famous Tirupati Laddu prasad. Afternoon: Padmavathi Ammavari Temple (5km). Drive to Kochi/Chennai for departure.', temples:['Tirumala Venkateswara','Padmavathi Ammavari'] },
      { day:8, title:'Guruvayur Extension (Optional)', description:'Fly Tirupati to Kochi. Drive 1hr to Guruvayur. Dhoti mandatory for men. Lord Guruvayurappan — most sacred Krishna in Kerala. Afternoon: Thrissur Pooram ground. Evening fly home.', temples:['Guruvayur Temple'] },
    ],
  },

  {
    slug: 'vaishno-devi-amarnath-6-days',
    title: 'Vaishno Devi & Amarnath',
    subtitle: 'Two of India most sacred pilgrimages — Vaishno Devi cave shrine and the miraculous Amarnath ice Shivalinga',
    circuit: 'Jammu & Kashmir',
    duration_days: 6,
    price_from: 22999,
    price_to: 42000,
    temples: ['vaishno-devi-shrine','amarnath-cave-temple'],
    states: ['Jammu & Kashmir'],
    difficulty: 'Challenging',
    group_size: '4-15 pilgrims',
    is_featured: false,
    best_months: ['July','August'],
    image_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Vaishno_Devi_shrine.jpg/600px-Vaishno_Devi_shrine.jpg',
    highlights: [
      'Vaishno Devi cave — 8 million pilgrims annually',
      'Amarnath ice Shivalinga — miraculous natural formation at 3,888m',
      'Helicopter options for both shrines',
      'Vaishnodevi + Bhairavnath complete circuit',
      'Sheshnag Lake camp — pristine Himalayan lake',
      'Season: July-August only when both are accessible',
    ],
    inclusions: [
      'Train Delhi-Jammu (AC 3-tier)',
      'All accommodation (hotel + tents at Amarnath base)',
      'Ponies/porters for Amarnath trek',
      'All meals during Amarnath trek days',
      'RFID registration (Yatra Parchi)',
      'Government-registered guide',
    ],
    exclusions: [
      'Flights (alternative to train)',
      'Helicopter (optional: Katra to Sanjichhat ₹1,950, Pahalgam to Amarnath ₹3,500)',
      'Personal medical insurance (strongly recommended)',
      'Oxygen cylinder (available to rent)',
      'Personal expenses',
    ],
    itinerary: [
      { day:1, title:'Delhi to Katra — Vaishno Devi Base', description:'Overnight train Delhi to Katra (12hr). Arrive morning. Check in hotel. RFID Yatra Parchi registration. Rest and acclimatisation. Evening: explore Katra market.', temples:[] },
      { day:2, title:'Vaishno Devi Trek and Darshan', description:'3AM start. 14km trek: Banganga → Charan Paduka → Ardhkuwari → Sanjichhat → Bhawan (cave shrine). Darshan of three pindis (Maha Kali, Maha Lakshmi, Maha Saraswati). Bhairavnath Temple visit (mandatory for complete yatra). Return to Katra.', temples:['Vaishno Devi','Bhairavnath Temple'] },
      { day:3, title:'Katra to Jammu to Pahalgam', description:'Morning: Raghunath Temple in Jammu. Drive to Pahalgam (280km, 6hr). Pahalgam is the base for Amarnath. Check in. Acclimatisation walk. Obtain Amarnath Yatra permit (mandatory — apply online in advance at shriamarnathjishrine.com).', temples:['Raghunath Temple Jammu'] },
      { day:4, title:'Pahalgam to Sheshnag (14km trek)', description:'Trek Day 1: Pahalgam (2,130m) → Pissu Top → Chandanwadi → Sheshnag base camp (3,590m). Trek through dense pine forest and alpine meadows. Sheshnag Lake — circular lake in the mountains. Tent overnight.', temples:[] },
      { day:5, title:'Sheshnag to Amarnath to Panchtarni', description:'Early 4AM. Trek Sheshnag → Mahagunas Pass (4,890m — highest point) → Panchtarni → Holy Cave Amarnath (3,888m). Darshan of natural ice Shivalinga. Incredibly sacred. Trek back to Panchtarni camp.', temples:['Amarnath Cave Temple'] },
      { day:6, title:'Return Pahalgam — Delhi', description:'Trek back to Pahalgam (14km). Hot meal and rest. Drive Pahalgam to Jammu (4hr). Overnight train Jammu to Delhi. Arrive Delhi next morning. Har Har Mahadev — yatra complete!', temples:[] },
    ],
  },
]

async function main() {
  const client = new MongoClient(MONGODB_URI, { family:4, serverSelectionTimeoutMS:15000 })
  await client.connect()
  console.log('✅ Connected\n')

  const col = client.db().collection('packages')
  let ok = 0

  for (const pkg of PACKAGES) {
    await col.findOneAndUpdate(
      { slug: pkg.slug },
      { $set: { ...pkg, is_active: true, enquiry_count: 0, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    )
    ok++
    console.log(`✅ ${pkg.title} (${pkg.duration_days} days, ₹${pkg.price_from.toLocaleString('en-IN')}+)`)
  }

  console.log(`\n🎉 ${ok} packages seeded!`)
  await client.close()
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
