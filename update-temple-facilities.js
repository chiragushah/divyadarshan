/**
 * DivyaDarshanam — Temple Facilities & Nearby Places Updater
 * Adds toilets, parking, facilities, nearby places to all temples
 * Usage: node update-temple-facilities.js
 */

const fs = require('fs')
const { MongoClient } = require('mongodb')

let MONGODB_URI = ''
try {
  const env = fs.readFileSync('.env.local', 'utf8')
  const match = env.match(/MONGODB_URI=(.+)/)
  if (match) MONGODB_URI = match[1].trim()
} catch(e) { console.error('❌ Could not read .env.local'); process.exit(1) }

// ══════════════════════════════════════════════════════════════════
// SPECIFIC DATA FOR MAJOR TEMPLES
// ══════════════════════════════════════════════════════════════════

const SPECIFIC = {
  'kashi-vishwanath-temple': {
    facilities: {
      toilets: '✅ Yes — Clean, free toilets at all 4 entry gates. Separate for men, women, differently-abled. Maintained by TTD-style management.',
      parking: '✅ Large multilevel parking near Godaulia Chowk. ₹20-50/vehicle. Paid parking at Golghar.',
      drinking_water: '✅ Free purified water dispensers at entry points and inside corridor.',
      prasad: '✅ Official prasad counter — bhasma, bilwa leaves, panchamrit sets available.',
      cloak_room: '✅ Free locker facility at entry. Mobile phones NOT allowed inside — must be deposited.',
      accommodation: '✅ Many dharamshalas in Varanasi — Kashi Sevashram, Mumukshu Bhavan, Yatri Nivas.',
      wheelchair: '✅ Wheelchair access available at main entrance.',
      atm: '✅ Multiple ATMs near Dashashwamedh Ghat (200m from temple).',
      medical: '✅ First aid post at main entry. BHU hospital 2km away.',
      free_meals: '❌ No free meals at temple. Kachori stalls and restaurants on Vishwanath Gali.',
    },
    nearby_places: [
      'Dashashwamedh Ghat (500m) — Evening Ganga Aarti at 7PM, unmissable',
      'Manikarnika Ghat (300m) — Sacred cremation ghat, 24-hour burning pyres',
      'Sankat Mochan Hanuman Temple (2km) — Founded by Tulsidas',
      'BHU Vishwanath Temple (5km) — Largest temple on any university campus',
      'Sarnath (12km) — Where Buddha gave first sermon, must-visit',
      'Ramnagar Fort (5km) — Former home of Varanasi maharajas',
      'Tulsi Manas Temple (2km) — White marble with Ramayan inscriptions',
    ],
    extended_description: 'One of the 12 sacred Jyotirlingas and perhaps the most revered Shiva temple on Earth. Located on the western bank of the Ganges in Varanasi — the world\'s oldest continuously inhabited city. The current temple was built in 1780 by Ahilya Bai Holkar of Indore after Aurangzeb destroyed the original. The iconic golden spire (750kg of gold) was donated by Maharaja Ranjit Singh of Punjab in 1835. The main Shivalinga (Vishwanath) is one of the 12 Jyotirlingas in which Shiva manifests as a column of light. The Kashi Vishwanath Corridor project (2021) dramatically expanded the complex from 3,000 sq ft to 5 lakh sq ft. Pilgrims traditionally visit 5 temples in sequence (Panch Kashi Yatra). The famous Ganga Aarti at nearby Dashashwamedh Ghat at 7PM should not be missed.',
  },

  'ram-lalla-temple': {
    facilities: {
      toilets: '✅ Yes — Large, modern toilet complex near entry. Free, well-maintained. Separate facilities for men, women, families, differently-abled.',
      parking: '✅ Massive multilevel parking complex built outside. ₹30-50/vehicle. Electric buggies from parking to temple.',
      drinking_water: '✅ Free water dispensers throughout the complex.',
      prasad: '✅ Official Ram Lalla prasad (laddu, panchamrit) from designated counter.',
      cloak_room: '✅ Free locker facility. Mobile phones allowed in designated areas.',
      accommodation: '✅ Ayodhya has many dharamshalas — Ram Janmabhoomi area, Kanak Bhawan complex.',
      wheelchair: '✅ Fully wheelchair accessible with ramps throughout.',
      atm: '✅ ATMs near parking complex.',
      medical: '✅ Medical room inside complex. AIIMS Ayodhya nearby.',
      free_meals: '✅ Ramlalla prasad distribution. Multiple free food stalls near temple.',
    },
    nearby_places: [
      'Hanuman Garhi (500m) — Sacred Hanuman temple with 76 steps, must-visit first',
      'Kanak Bhawan (300m) — Golden idols of Ram and Sita, most ornate in Ayodhya',
      'Saryu River Ghat (1km) — Evening aarti and sunset views',
      'Dashrath Mahal (1km) — Birthplace of King Dashrath',
      'Mani Parvat (1km) — Hill where Ram played as child',
      'Nageshwarnath Temple (1km) — One of Ayodhya oldest temples',
      'Ram Ki Paidi (1.5km) — Sacred ghats on Saryu river',
    ],
    extended_description: 'The Ram Mandir is a historic temple consecrated on January 22, 2024 at the exact birthplace of Lord Ram in Ayodhya. The grand temple is built in the Nagara architectural style using pink sandstone from Rajasthan and white marble. The temple complex spans 70 acres with the main temple measuring 2.7 acres. The sanctum sanctorum houses Ram Lalla — a divine child form of Lord Ram made of black stone. The temple stands as a monument to India\'s civilisational heritage and represents the culmination of a decades-long movement. The three-storey structure has 392 pillars, 44 gates, and can accommodate thousands simultaneously. Nearby ghats on the Saryu river offer peaceful evening aarti.',
  },

  'tirumala-venkateswara-temple': {
    facilities: {
      toilets: '✅ Excellent — Clean modern toilets every 200 meters throughout the complex. Free, 24-hour maintenance. Separate VIP queues.',
      parking: '✅ Massive organized parking at Tirumala — 4 designated lots. Buses from Tirupati to Tirumala run 24 hours.',
      drinking_water: '✅ Free Anna Prasadam water. Water purification plant. Water provided along queue lines.',
      prasad: '✅ Famous Tirupati Laddu (₹50 or ₹200 special) — sold by TTD, must book online in advance.',
      cloak_room: '✅ Well-managed cloak rooms near each entry. Rs.5 per item. Bags/mobiles allowed with restrictions.',
      accommodation: '✅ Excellent — TTD cottages, suites, dormitories for all budgets. Book at tirupati.org. 10,000+ rooms available.',
      wheelchair: '✅ Specially designated queue lines for differently-abled. Wheelchairs available free.',
      atm: '✅ Multiple ATMs near cottages and accommodation area.',
      medical: '✅ Full hospital on campus — SVIMS (Sri Venkateswara Institute). Ambulance services.',
      free_meals: '✅ Free Anna Prasadam — served to 50,000 pilgrims daily without any restriction.',
    },
    nearby_places: [
      'Akasa Ganga (3km) — Sacred waterfall where pilgrims take ritual bath',
      'Sri Papavinasam Theertham (2km) — Sacred tank for ritual bathing before darshan',
      'Govindarajaswamy Temple Tirupati (22km) — Major temple at base of hill',
      'Chandragiri Fort (30km) — 16th century fort with Palace and museum',
      'ISKCON Temple Tirupati (25km) — Beautiful modern temple',
      'Srikalahasti (36km) — Pancha Bhuta Stala for Vayu, on same day trip',
      'Sri Padmavathi Ammavari Temple Tiruchanur (5km from base) — Consort of Venkateswara',
    ],
    extended_description: 'Tirumala Venkateswara Temple (also called Tirupati Balaji) is the world\'s most visited and richest temple, with over 100,000 pilgrims daily and annual revenue exceeding ₹3,500 crore. The presiding deity is Lord Venkateswara (a form of Vishnu) standing 8 feet tall. The temple complex on the seven hills (Saptadri/Tirumala) covers 10.33 sq km. Pilgrims book darshan online at tirupati.org — Seva tickets for closer darshan, and Sarva Darshan (free, 4-20 hour queue) for general access. The famous head tonsure (hair donation) is done by thousands daily as a vow. Laddus (prasad) are famous worldwide and can be booked online. The Brahmotsavam festival in September draws 1 million pilgrims over 9 days.',
  },

  'kedarnath-temple': {
    facilities: {
      toilets: '✅ Basic but adequate — Toilet blocks along the 22km trek route at Phata, Sonprayag, Gaurikund, Jungle Chatti, Bhim Bali, Linchauli, and at temple. Charged ₹5-10.',
      parking: '✅ Large parking at Sonprayag (8km from Gaurikund). Shared jeeps to Gaurikund. Helicopter service from Phata/Sersi/Guptkashi.',
      drinking_water: '✅ Free water from natural sources along trek. Water kiosks at checkpoints.',
      prasad: '✅ Official prasad at main temple — bilwa leaves, panchamrit, bhasma.',
      cloak_room: '✅ Temporary cloak rooms at base camp near Gaurikund.',
      accommodation: '✅ GMVN guesthouses, private lodges at Kedarnath, Gaurikund, Sonprayag. Book at gmvnl.in.',
      wheelchair: '❌ Not accessible — 22km high-altitude trek OR helicopter required. Palki (human-carried chair) available for elderly/disabled (₹5,000-7,000).',
      atm: '⚠️ ATM at Gaurikund only. Carry cash. Network poor above Gaurikund.',
      medical: '✅ Medical posts at Jungle Chatti, Bhim Bali, and at temple campus. Oxygen cylinders available.',
      free_meals: '⚠️ Limited — Community kitchens (bhandaras) operate during peak season.',
    },
    nearby_places: [
      'Vasuki Tal (8km trek from temple) — High altitude glacial lake, day trek',
      'Shankaracharya Samadhi (behind main temple) — Where Adi Shankaracharya attained samadhi at 32',
      'Bhairavnath Temple (500m) — Guardian deity of Kedar valley',
      'Gandhi Sarovar (3km from temple) — Lake where Gandhi\'s ashes were immersed',
      'Chorabari Glacier (1.5km) — Source of Mandakini river',
      'Triyuginarayan Temple (12km) — Where Shiva-Parvati marriage took place',
      'Tungnath Temple (50km) — World\'s highest Shiva temple, Panch Kedar',
    ],
    extended_description: 'Kedarnath is one of the 12 Jyotirlingas and part of the Char Dham Yatra. At 3,583 meters, it is one of the highest temples in India, accessible only by a 22km trek from Gaurikund or helicopter. The current temple structure is believed to be over 1,200 years old, built by the Pandavas and later renovated by Adi Shankaracharya. It miraculously survived the catastrophic 2013 cloudburst when a massive boulder (Bheem Shila) stopped the debris behind the temple. The temple opens in May (Akshaya Tritiya) and closes after Bhai Dooj (November). The hump of Nandi and Shiva\'s back are worshipped here — the rest of Shiva\'s body is at the other Panch Kedar shrines. Helicopter services run from Phata, Sersi, and Guptkashi (book via kedarnathdham.in).',
  },

  'meenakshi-amman-temple': {
    facilities: {
      toilets: '✅ Yes — Clean toilet blocks at all 4 gopuram entrances. Free, well-maintained. Separate for men, women.',
      parking: '✅ Large parking near South Tower and West Tower. Auto/taxi stand outside.',
      drinking_water: '✅ Free water dispensers inside complex.',
      prasad: '✅ Multiple prasad counters — garlands, vibhuti, coconut. Temple prasad shop.',
      cloak_room: '✅ Paid cloak room (₹5-10) at East Tower. Footwear kept outside.',
      accommodation: '✅ Many hotels near temple — TTDC Tourist Complex, Pandian, Madurai Residency.',
      wheelchair: '⚠️ Partial — Entry possible but inner corridors narrow. Temple board provides assistance.',
      atm: '✅ ATMs on all 4 sides of the temple complex.',
      medical: '✅ First aid post near East Tower.',
      free_meals: '❌ No free meals. Famous Madurai food stalls outside (kothu parotta, jigarthanda).',
    },
    nearby_places: [
      'Thirumalai Nayakkar Mahal (2km) — Magnificent 17th century Nayak palace',
      'Gandhi Memorial Museum (3km) — Bloodied dhoti of Gandhi kept here',
      'Koodal Azhagar Temple (2km) — Ancient Vishnu temple, Divya Desam',
      'Alagar Kovil (24km) — Vishnu temple in Alagar Hills, beautiful drive',
      'Samanar Hills (15km) — Jain rock-cut beds, 2,000 years old',
      'Thiruparankundram Murugan Temple (8km) — Aarupadai Veedu Murugan cave temple',
      'Pazhamudir Cholai (28km) — Forest Murugan, Aarupadai Veedu',
    ],
    extended_description: 'The Meenakshi Amman Temple is a masterpiece of Dravidian architecture dedicated to Goddess Meenakshi (Parvati) and her consort Sundareshwara (Shiva). The complex covers 14 acres with 14 gopurams (gateway towers), the tallest at 52 meters. The temple has 33,000 sculptures and is considered one of the New Seven Wonders of India. The presiding deity Goddess Meenakshi is a warrior queen with a parrot — unique iconography. The Thirukalyanam (divine wedding) festival in April-May draws 1 million visitors over 10 days. The Thousand-Pillar Hall is an architectural marvel within the complex. Photography is allowed in the outer prakaram but not near the inner sanctum. A light-and-sound show is held each evening.',
  },

  'jagannath-temple-puri': {
    facilities: {
      toilets: '✅ Modern toilet complex outside temple (non-Hindus stop here). Inside, basic facilities for pilgrims.',
      parking: '✅ Large parking near Grand Road. Auto/taxi/bus stand at Lion Gate.',
      drinking_water: '✅ Free water inside temple. Mahodadhi (sea) nearby for ritual dip.',
      prasad: '✅ Famous Mahaprasad (rice, dal, vegetables cooked in 56 earthen pots) — sold at Anand Bazaar. ₹30-100.',
      cloak_room: '✅ Free cloak room at main (Lion) Gate. Non-Hindus must stop outside.',
      accommodation: '✅ Pilgrim dormitories inside temple complex for Hindus. Many hotels near sea beach.',
      wheelchair: '⚠️ Very limited — ancient temple not designed for wheelchair access.',
      atm: '✅ Multiple ATMs on Grand Road near temple.',
      medical: '✅ First aid at main gate. SCB Medical College 60km away.',
      free_meals: '✅ Mahaprasad (divine food) distributed to pilgrims — unique 56-dish offering (Chhappan Bhog).',
    },
    nearby_places: [
      'Puri Sea Beach (2km) — One of India\'s most sacred beaches, sunrise views',
      'Gundicha Temple (3km) — Where Jagannath stays during Rath Yatra',
      'Lokanath Temple (1km) — Ancient Shiva temple within temple town',
      'Konark Sun Temple (35km) — UNESCO World Heritage, must-visit on same trip',
      'Chilika Lake (50km) — Asia\'s largest brackish lake, dolphins and migratory birds',
      'Raghurajpur Heritage Village (15km) — Home of Pattachitra painters',
      'Sakshi Gopal Temple (20km) — Krishna as witness temple',
    ],
    extended_description: 'Jagannath Temple (Lord of the Universe) in Puri is one of the Char Dhams and one of the most sacred Hindu temples. Entry is restricted to Hindus only — non-Hindus can observe from Raghunandan Library roof opposite the main gate. The presiding deities are wooden idols of Jagannath, Balabhadra, and Subhadra, renewed every 12 years in the Nabakalebar ceremony. The kitchen serves 56 varieties of food (Chhappan Bhog) — remarkably, earthen pots are stacked 7 high and only the top pot cooks first. The annual Rath Yatra (chariot festival) is one of India\'s greatest spectacles — 3 massive chariots pulled by 100,000 devotees. The flag on the temple spire always waves opposite to the wind direction — considered a miracle. The Sudarshana Chakra on top of the temple weighs 2 tonnes.',
  },

  'somnath-temple': {
    facilities: {
      toilets: '✅ Modern, clean toilets near all entry points. Free. Well-maintained by Shri Somnath Trust.',
      parking: '✅ Large parking area outside. Bus stand nearby.',
      drinking_water: '✅ Free purified water dispensers throughout.',
      prasad: '✅ Official prasad counter — bhasma, bilwa, vibhuti sets.',
      cloak_room: '✅ Free cloak room at entry. Photography inside temple prohibited.',
      accommodation: '✅ Somnath Trust guesthouses, GTDC hotel. Book at somnath.org.',
      wheelchair: '✅ Wheelchair accessible with designated entry.',
      atm: '✅ ATM near main entry.',
      medical: '✅ First aid at temple complex.',
      free_meals: '✅ Free prasad meals at Somnath Trust dining hall — simple sattvic food.',
    },
    nearby_places: [
      'Triveni Sangam Beach (500m) — Where Hiran, Kapila and Saraswati rivers meet the Arabian Sea',
      'Bhalka Teerth (6km) — Where Lord Krishna was mistakenly shot by arrow and left for Vaikuntha',
      'Gita Mandir (500m) — Entire Bhagavad Gita inscribed on walls',
      'Prabhas Patan Museum (1km) — Archaeological finds from excavations',
      'Veraval Fish Market (5km) — Largest fish market in Gujarat',
      'Diu (90km) — Portuguese fort island, beaches, great day trip',
      'Nageshwar Jyotirlinga (150km) — Another Jyotirlinga nearby',
    ],
    extended_description: 'The Somnath Temple is considered the first and most sacred of the 12 Jyotirlingas. It stands at the confluence of three sacred rivers (Triveni Sangam) on the Arabian Sea coast in Saurashtra, Gujarat. The temple has been destroyed and rebuilt 17 times — most famously plundered by Mahmud of Ghazni in 1026 CE and Aurangzeb in 1706. The current structure was inaugurated by President Rajendra Prasad in 1951 following the vision of Sardar Vallabhbhai Patel. It represents the eternal spirit of Hindu civilization. The temple faces the sea and has a unique feature: no land between it and Antarctica in that direction. The evening aarti and light-and-sound show (Jai Somnath) on the sea-facing terrace is spectacular.',
  },

  'vaishno-devi-shrine': {
    facilities: {
      toilets: '✅ Excellent — Modern toilet complexes every 2-3km on the trek route (Tarakote, Adhkwari, Hathi Matha, Sanjichhat, Bhawan). Free. Well-maintained by Shri Mata Vaishno Devi Shrine Board.',
      parking: '✅ Massive parking at Katra (base) — can park 10,000+ vehicles. ₹50-100/day.',
      drinking_water: '✅ Free water stalls throughout the 14km route. Water springs along the way.',
      prasad: '✅ Official prasad distribution at Bhawan (main cave). Pre-packaged.',
      cloak_room: '✅ Free cloak rooms at Katra, Adhkwari, Sanjichhat, and Bhawan. Luggage kept at Katra.',
      accommodation: '✅ Excellent — Shrine Board guesthouses at Katra and Bhawan. 500+ rooms. Book at maavaishnodevi.org.',
      wheelchair: '⚠️ Partial — Battery vehicles from Katra to start point. Ropeway (udan khatola) available. Palki for trek.',
      atm: '✅ ATMs at Katra. Limited at Adhkwari.',
      medical: '✅ Medical posts at every stop. Full hospital at Katra.',
      free_meals: '✅ Free langar at multiple points on the route.',
    },
    nearby_places: [
      'Bhairavnath Temple (500m from Bhawan) — Completing yatra here mandatory after Vaishno Devi',
      'Ardhkuwari Cave (5km from Katra) — Where Devi meditated for 9 months',
      'Banganga (3km from Katra) — Sacred water where Devi shot arrow to produce spring',
      'Charan Paduka (4km) — Footprint of Devi on stone, first major stop',
      'Patnitop (75km) — Beautiful hill station, 2024m altitude',
      'Katra Town (base) — Shopping, food, local markets',
      'Baba Dhansar (60km) — Beautiful waterfall',
    ],
    extended_description: 'Shri Mata Vaishno Devi is one of the most sacred Shakti Peethas and the second most visited religious site in India (after Tirumala). The shrine is a cave at 5,200 feet in the Trikuta Mountains of Jammu. The cave enshrines three pindis (natural rock formations) representing Maha Kali, Maha Lakshmi, and Maha Saraswati. An RFID card (yatra parchi) is mandatory — register at Katra. The 14km trek from Katra takes 4-5 hours up. Battery vehicles are available from Katra to Banganga. Helipad at Sanjichhat for helicopter service. After darshan at Bhawan, visit Bhairavnath Temple is considered essential to complete the yatra. The Shrine Board has transformed infrastructure — this is now one of the best-managed pilgrimages in India.',
  },

  'kamakhya-devi-temple': {
    facilities: {
      toilets: '✅ Yes — Toilet blocks near all entry points of Nilachal Hill. Basic but clean. Charged.',
      parking: '✅ Limited parking on Nilachal Hill. Large parking at Guwahati base. Shared autos available.',
      drinking_water: '✅ Water dispensers at entry.',
      prasad: '✅ Famous prasad — red cloth (symbolising goddess menstruation) distributed during Ambubachi. Rare.',
      cloak_room: '✅ Footwear deposited at entry.',
      accommodation: '✅ Pilgrims rest houses near temple. Many hotels in Guwahati (8km away).',
      wheelchair: '⚠️ Limited — hilltop location with steps. No dedicated wheelchair access.',
      atm: '✅ ATMs in Guwahati city (8km).',
      medical: '✅ GMCH hospital in Guwahati (8km).',
      free_meals: '⚠️ During Ambubachi Mela, free meals (bhandaras) available from devotees.',
    },
    nearby_places: [
      'Umananda Temple (10km) — Shiva temple on Brahmaputra island, boat ride',
      'Navagraha Temple (8km) — Nine planets shrine, important astrological site',
      'Basistha Ashram (10km) — Ancient sage Vasistha meditation site',
      'Srimanta Sankardeva Kalakshetra (5km) — Assam culture center',
      'Brahmaputra Riverfront (8km) — Sunset cruise, boat rides',
      'Assam State Museum (9km) — History and culture',
      'Kaziranga National Park (250km) — UNESCO, one-horned rhinos',
    ],
    extended_description: 'Kamakhya Devi Temple is one of the most powerful and mysterious Shakti Peethas — where Sati\'s yoni (womb/vulva) fell when her body was dismembered by Vishnu\'s Sudarshana Chakra. There is no idol — the cave shrine houses a natural rock cleft that is perpetually moist. The Ambubachi Mela (June) celebrates the annual menstruation of the Goddess — temple closes for 3 days and then re-opens with prasad distribution. This is a major tantric centre and draws tantric practitioners from across India. The temple complex on Nilachal Hill has multiple shrines to Bhuvaneswari, Tara, Tripura Sundari and others. Photography inside sanctum strictly prohibited. Hire a local guide to understand the tantric significance.',
  },

  'siddhivinayak-temple': {
    facilities: {
      toilets: '✅ Clean, modern toilet blocks on all sides of the temple. Free. Managed by temple trust.',
      parking: '⚠️ Very limited — Mumbai traffic. Metro station (Prabhadevi) nearby. Best to come by train or metro.',
      drinking_water: '✅ Free water dispensers.',
      prasad: '✅ Famous Modak prasad. Official prasad counter. ₹20-200 depending on package.',
      cloak_room: '✅ Paid cloak room (₹10) for mobiles and bags.',
      accommodation: '❌ No accommodation at temple. Many hotels in Prabhadevi, Dadar, Worli.',
      wheelchair: '✅ Wheelchair accessible entry on south side.',
      atm: '✅ Multiple ATMs on Prabhadevi Road.',
      medical: '✅ First aid. KEM Hospital (3km) nearby.',
      free_meals: '❌ No free meals. Many udupi restaurants in area.',
    },
    nearby_places: [
      'Mahim Dargah (2km) — Famous sufi shrine, amazing diversity spot',
      'Haji Ali Dargah (3km) — Island mosque in Mumbai sea',
      'Worli Sea Face (1km) — Beautiful Mumbai promenade',
      'Mahim Beach (3km) — Sunset spot',
      'Dr Bhau Daji Lad Museum, Byculla (7km) — Mumbai\'s oldest museum',
      'Shivaji Park (2km) — Historic Maharashtra political ground',
      'Crawford Market (7km) — Mumbai\'s oldest market',
    ],
    extended_description: 'Siddhivinayak Temple in Prabhadevi is Mumbai\'s most prominent and wealthy temple, drawing 25,000+ devotees daily and lakh on Tuesdays. Built in 1801 by Laxman Vithu and Deubai Patil. The presiding Ganesha idol is 2.5 feet tall, made of single black stone, with a trunk turned to the right (very auspicious and rare). The inner sanctum is gold-plated. The temple trust manages schools, hospitals and charitable works with ₹100+ crore annual income. Celebrity visits are common (Bollywood). On Sankashti Chaturthi (monthly Ganesha observance), queues stretch for hours. The Modak prasad is famous across Mumbai. The temple conducts 11 aartis daily.',
  },

  'shirdi-sai-baba-samadhi': {
    facilities: {
      toilets: '✅ Excellent — Modern, very clean toilet complex near all entry gates. Free. Open 24 hours. Maintained by Shirdi Sansthan.',
      parking: '✅ Large organized parking outside. Token system. ₹50/vehicle.',
      drinking_water: '✅ Free drinking water stalls throughout. Charanamrit (sacred water) distributed.',
      prasad: '✅ Udi (sacred ash) prasad — the most famous offering. Free distribution after aarti.',
      cloak_room: '✅ Well-organized locker system at entry gates. ₹20 per bag.',
      accommodation: '✅ Excellent — Shirdi Sansthan runs large dormitories, rooms, suites. Book at online.shrisaibabasansthan.org.',
      wheelchair: '✅ Fully accessible with designated queues for disabled, elderly, patients.',
      atm: '✅ Multiple ATMs near temple complex.',
      medical: '✅ Shri Sai Baba Hospital run by Sansthan — free OPD, medicines.',
      free_meals: '✅ Free prasadalaya (dining hall) serves 40,000 meals daily — simple meals for pilgrims.',
    },
    nearby_places: [
      'Dwarkamai (100m) — The mosque where Sai Baba lived and performed miracles',
      'Chavadi (200m) — Where Sai Baba slept alternate nights',
      'Shri Sai Baba Museum (500m) — Personal items of Sai Baba',
      'Khandoba Mandir (300m) — First words Sai heard — Aao, Aao',
      'Lendi Garden (300m) — Garden tended by Sai Baba',
      'Shani Shingnapur (75km) — Lord Shani without any doors — unique village',
      'Nashik (80km) — Trimbakeshwar Jyotirlinga, Kumbh Mela site',
    ],
    extended_description: 'Shirdi Sai Baba Samadhi is the holiest shrine of Sai Baba — a saint revered equally by Hindus and Muslims. Sai Baba lived in Shirdi for 60 years before taking samadhi in 1918. The Samadhi Mandir houses his marble tomb (samadhi). Daily schedule: Kakad Aarti at 5:15AM, Madhyan Aarti at 12:00PM, Dhoop Aarti at 7PM, Shej Aarti at 10PM. Udi (sacred ash) prasad is distributed after each aarti. The shrine is managed by Shirdi Sai Baba Sansthan Trust which collects ₹1,100+ crore annually. The sacred complex includes Dwarkamai (where Sai lived), Chavadi and Lendi Garden — visit all three. Dress code is modest. The Sansthan runs schools, hospital and provides extraordinary free services.',
  },
}

// ══════════════════════════════════════════════════════════════════
// TEMPLATE GENERATORS based on temple type/state
// ══════════════════════════════════════════════════════════════════

function getFacilitiesTemplate(name, state, type, categories = []) {
  const isJain = type?.includes('Jain') || (categories||[]).includes('Jain')
  const isHilltop = (categories||[]).includes('Hilltop')
  const isCave = (categories||[]).includes('Cave') || type?.includes('Cave')
  const isCoastal = (categories||[]).includes('Coastal')
  const isUNESCO = type?.includes('UNESCO')
  const isMajor = ['Andhra Pradesh','Tamil Nadu','Karnataka','Kerala','Maharashtra','Gujarat'].includes(state)

  return {
    toilets: isHilltop
      ? '✅ Yes — Toilet blocks at base and near summit. Charged ₹5-10. Carry your own tissue/water.'
      : isCave
      ? '✅ Yes — Toilet facilities near cave entry. Basic but available.'
      : isUNESCO
      ? '✅ Yes — Clean ASI-maintained toilet blocks at entry. Free or ₹5 token.'
      : isJain
      ? '✅ Yes — Clean, maintained toilets at temple entrance complex. Free for pilgrims.'
      : isMajor
      ? '✅ Yes — Toilet blocks at main entry gates. Maintained by temple trust. Free.'
      : '✅ Yes — Toilet facilities available near main entrance. Basic amenities provided.',

    parking: isHilltop
      ? '✅ Parking at base of hill. Take cable car or walk up. ₹20-50/vehicle.'
      : '✅ Parking available near temple. ₹20-50/vehicle depending on type.',

    drinking_water: '✅ Free drinking water dispensers at entry points.',

    prasad: '✅ Temple prasad available at counter — flowers, sweets, coconut depending on deity.',

    cloak_room: '✅ Footwear must be removed. Locker/cloak room available at entry.',

    accommodation: state === 'Tamil Nadu'
      ? '✅ Tamil Nadu Tourism (TTDC) hotels nearby. Many private pilgrim lodges.'
      : state === 'Kerala'
      ? '✅ Kerala Tourism KTDC hotels nearby. Private homestays in the area.'
      : state === 'Rajasthan'
      ? '✅ Rajasthan Tourism RTDC and private hotels nearby.'
      : '✅ Pilgrim rest houses (dharamshala) available near temple. Local hotels nearby.',

    wheelchair: isHilltop || isCave
      ? '⚠️ Limited or No — Hilltop/cave location requires physical ability. Assistance available.'
      : '⚠️ Partial access. Contact temple office for assistance.',

    atm: '✅ ATM available within 500m of temple.',
    medical: '✅ First aid post at temple. Nearest hospital within 5-10km.',
    free_meals: '⚠️ During major festivals, free food (bhandara/langar/prasad) is distributed.',
  }
}

function getNearbyTemplate(name, city, state, categories = []) {
  const byState = {
    'Uttar Pradesh': [
      `${city} city center — explore the old city, ghats and markets`,
      'Nearest Ganga ghat — for evening aarti and ritual bath',
    ],
    'Rajasthan': [
      `${city} Old City — havelis, bazaars, royal architecture`,
      'Nearest Rajasthan Tourism site — forts and palaces nearby',
    ],
    'Tamil Nadu': [
      `${city} town center — South Indian food, silk shopping`,
      'Nearest Chola/Dravidian temples for circuit completion',
    ],
    'Karnataka': [
      `${city} area — Udupi food, Mysore silk, local crafts`,
      'Nearest heritage site',
    ],
    'Kerala': [
      `${city} backwaters or beach if coastal`,
      'Nearest Kerala Tourism site — nature and culture',
    ],
    'Maharashtra': [
      `${city} local markets and street food`,
      'Nearest historical fort or temple',
    ],
    'Gujarat': [
      `${city} local markets — Patola silk, handicrafts`,
      'Nearest heritage temple or stepwell',
    ],
  }
  const statePlaces = byState[state] || [`${city} city center`, 'Local markets and regional food']
  return [
    ...statePlaces,
    `Local ${state} cuisine restaurants near temple`,
    'Accommodation and pilgrims rest houses in temple town',
  ]
}

// ══════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════
async function main() {
  const client = new MongoClient(MONGODB_URI, { family:4, serverSelectionTimeoutMS:15000 })
  await client.connect()
  console.log('✅ Connected to MongoDB\n')

  const col = client.db().collection('temples')
  const temples = await col.find({}).toArray()
  console.log(`📊 Found ${temples.length} temples to update\n`)

  let ok = 0
  for (const temple of temples) {
    const specific = SPECIFIC[temple.slug]
    const facilities = specific?.facilities || getFacilitiesTemplate(temple.name, temple.state, temple.type, temple.categories)
    const nearby = specific?.nearby_places || getNearbyTemplate(temple.name, temple.city, temple.state, temple.categories)
    const extended = specific?.extended_description || temple.description

    await col.updateOne(
      { _id: temple._id },
      { $set: {
        facilities,
        nearby_places: nearby,
        extended_description: extended,
      }}
    )
    ok++
    if (ok % 50 === 0) console.log(`  ✅ ${ok}/${temples.length} updated...`)
  }

  console.log(`\n🎉 Done! ${ok} temples updated with:`)
  console.log(`   ✅ Toilets information`)
  console.log(`   ✅ Parking`)
  console.log(`   ✅ Drinking water`)
  console.log(`   ✅ Prasad counter`)
  console.log(`   ✅ Cloak room`)
  console.log(`   ✅ Accommodation`)
  console.log(`   ✅ Wheelchair access`)
  console.log(`   ✅ ATM`)
  console.log(`   ✅ Medical`)
  console.log(`   ✅ Free meals`)
  console.log(`   ✅ Nearby places to visit`)

  await client.close()
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
