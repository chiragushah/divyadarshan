/**
 * DivyaDarshanam — How To Reach Updater
 * Adds airport, railway, bus, taxi info to all temples
 * Usage: node update-how-to-reach.js
 */
const fs = require('fs')
const { MongoClient } = require('mongodb')

let MONGODB_URI = ''
try {
  const env = fs.readFileSync('.env.local', 'utf8')
  const match = env.match(/MONGODB_URI=(.+)/)
  if (match) MONGODB_URI = match[1].trim()
} catch(e) { console.error('No .env.local'); process.exit(1) }

// ════════════════════════════════════════════════════════
// SPECIFIC DATA — 50 MAJOR TEMPLES
// ════════════════════════════════════════════════════════
const REACH = {

'kashi-vishwanath-temple': {
  by_air: '✈️ Lal Bahadur Shastri Airport, Varanasi (25km, ~45 min). Flights from Delhi (1hr), Mumbai (2hr), Bangalore (2.5hr). Prepaid taxi from airport: ₹500-700.',
  by_train: '🚆 Varanasi Junction (7km) — major hub, trains from all cities. Mughal Sarai/Pt. Deen Dayal Upadhyay Jn (18km) — even more trains. Prepaid taxi from station: ₹150-200.',
  by_bus: '🚌 Varanasi Bus Stand (Cantt area, 6km). UP Roadways buses from Allahabad (3hr), Lucknow (6hr), Gorakhpur (4hr). City buses run to Godaulia Chowk (nearest stop, 300m from temple).',
  by_taxi: '🚕 From Varanasi station: ₹150-200 by auto, ₹200-250 by taxi to Godaulia. From Godaulia Chowk, walk 300m through Vishwanath Gali (vehicles not allowed). E-rickshaws: ₹20-30 within old city.',
  local_tips: '💡 Best to stay in the old city (near Dashashwamedh Ghat) for easy walking access. Temple roads are narrow — no vehicles. Reach Godaulia Chowk then walk. Morning visit: get there by 5AM to avoid queues.',
},

'ram-lalla-temple': {
  by_air: '✈️ Maharishi Valmiki International Airport, Ayodhya (10km, ~20 min) — New airport opened 2024. Also Lucknow Airport (130km, ~2.5hr). Prepaid taxi from Ayodhya airport: ₹300-400.',
  by_train: '🚆 Ayodhya Cantt Station (3km) — trains from Delhi (6-8hr), Lucknow (2hr), Gorakhpur (3hr), Varanasi (4hr). New trains added post temple inauguration. Prepaid taxi from station: ₹80-120.',
  by_bus: '🚌 Ayodhya Bus Stand (2km). UP Roadways buses from Lucknow (2hr, ₹150), Allahabad/Prayagraj (3hr), Faizabad (adjacent city). Frequent buses from Gorakhpur, Varanasi.',
  by_taxi: '🚕 From Ayodhya station: auto ₹60-80, taxi ₹100-150 to Ram Janmabhoomi. Electric buggies run inside the complex from parking. From Lucknow: cab ₹2,000-2,500 one way.',
  local_tips: '💡 RFID card (yatra parchi) mandatory — register online or at kiosks. No vehicles near temple — park at designated lots, use buggy. Visit Hanuman Garhi first (tradition). Best time: early morning 6-8AM.',
},

'tirumala-venkateswara-temple': {
  by_air: '✈️ Tirupati Airport (15km from Tirupati city, 30km from Tirumala). Direct flights from Chennai (45min), Bengaluru (55min), Hyderabad (1hr), Mumbai (2hr), Delhi (2.5hr). Prepaid taxi from airport: ₹300-400 to bus stand.',
  by_train: '🚆 Tirupati Railway Station (1km from Tirupati city) — well-connected from Chennai (3hr), Bengaluru (3hr), Hyderabad (8hr), Mumbai (20hr). Special Tirupati Express from many cities. Prepaid taxi: ₹100-150.',
  by_bus: '🚌 APSRTC buses from Tirupati to Tirumala run 24 hours (every 5-10 min, ₹72 one way, 1.5hr). Also TSRTC from Hyderabad direct to Tirumala (8hr). Local share auto to bus stand: ₹30.',
  by_taxi: '🚕 From Tirupati city to Tirumala: Shared van ₹80-100/person, Private taxi ₹600-700. From Chennai: ₹5,000-6,000 one way. From Hyderabad: ₹8,000-10,000. No private vehicles allowed in Tirumala — TTD buses only from designated point.',
  local_tips: '💡 Take TTD bus from Alipiri Bus Stand (not local buses). Online booking of darshan at tirupati.org saves massive time — walk-in Sarva Darshan queue is 6-20 hours. Helicopter from Tirupati to Tirumala (₹3,620 return) saves the 22km climb. Book helicopter online in advance.',
},

'kedarnath-temple': {
  by_air: '✈️ Jolly Grant Airport, Dehradun (250km, ~6hr drive) — flights from Delhi (45min). Alternatively, helicopter from Phata (₹8,500 one way, book at heliyatra.irctc.co.in). Also Chinyalisaur helipad (closer).',
  by_train: '🚆 Rishikesh (216km) or Haridwar (238km) — nearest major railheads. Trains from Delhi (5-6hr). Then bus/taxi to Gaurikund (the trek base).',
  by_bus: '🚌 GMOU/UTTARAKHAND ROADWAYS buses from Rishikesh/Haridwar to Gaurikund via Rudraprayag and Guptkashi (8-10hr, ₹300-500). Sonprayag to Gaurikund: shared jeeps only (5km, ₹50).',
  by_taxi: '🚕 From Haridwar to Gaurikund: ₹4,000-5,000 private car. From Dehradun: ₹5,000-6,000. From Gaurikund: 22km trek to temple (6-8hr walk). Pony/horse ₹1,500-2,500. Palki (doli) ₹5,000-7,000. Helicopter from Phata ₹8,500 one way.',
  local_tips: '💡 Route: Delhi → Haridwar by train → bus to Sonprayag → shared jeep to Gaurikund → trek 22km to temple. Register online at registrationandtouristcare.uk.gov.in (mandatory). Helicopter books out weeks in advance — book early. Season: May to November only.',
},

'badrinath-temple': {
  by_air: '✈️ Jolly Grant Airport, Dehradun (320km, ~9hr). Also Gauchar Airport, Chamoli (70km) — small aircraft, limited service. Helicopter available from Haridwar (book at gmvnl.in).',
  by_train: '🚆 Haridwar (310km) or Rishikesh (298km) — nearest railheads. Trains from Delhi (5hr). Then bus or taxi to Badrinath via Joshimath.',
  by_bus: '🚌 GMOU buses from Haridwar/Rishikesh to Badrinath (10-12hr, ₹400-600). Summer-only route via Chamoli-Joshimath. State buses from Dehradun. Joshimath (50km) is the last major town.',
  by_taxi: '🚕 From Haridwar: ₹5,000-6,000 private taxi. From Rishikesh: ₹4,500-5,500. From Joshimath: ₹800-1,000 (50km). Shared jeeps from Joshimath to Badrinath: ₹200/person.',
  local_tips: '💡 Route: Delhi → Haridwar by Shatabdi → taxi/bus via Devprayag-Rudraprayag-Chamoli-Joshimath → Badrinath. Stay at Joshimath (night) then proceed. Register online (mandatory in season). Roads close Nov-May due to snow. Check road status at badrinath-kedarnath.com.',
},

'gangotri-temple': {
  by_air: '✈️ Jolly Grant Airport, Dehradun (250km). Chinyalisaur helipad available for chartering.',
  by_train: '🚆 Haridwar (260km) or Rishikesh (248km). Then bus or taxi via Uttarkashi (100km from Gangotri).',
  by_bus: '🚌 GMOU buses from Haridwar/Rishikesh to Uttarkashi (8hr). From Uttarkashi to Gangotri: buses and shared jeeps (4hr, ₹200).',
  by_taxi: '🚕 Haridwar to Gangotri: ₹5,500-6,500. Uttarkashi to Gangotri: ₹1,500-2,000. Shared jeep from Uttarkashi: ₹250/person.',
  local_tips: '💡 Stay at Uttarkashi night before. Roads are mountain roads — proceed slowly. Gangotri to Gaumukh (19km glacier trek) needs separate permit from Forest Dept.',
},

'vaishno-devi-shrine': {
  by_air: '✈️ Jammu Airport (50km from Katra, ~1.5hr). Frequent flights from Delhi (1hr), Mumbai (2hr). Prepaid taxi from Jammu airport to Katra: ₹1,200-1,500.',
  by_train: '🚆 Katra Railway Station (1km from Katra town) — trains from Delhi (9hr Vande Bharat), Mumbai (28hr), Jammu Tawi (45km, 1hr). Shri Mata Vaishno Devi Katra Station is dedicated station.',
  by_bus: '🚌 J&K SRTC buses from Jammu to Katra (1.5hr, ₹90). HRTC and private buses from Delhi (12hr). Local autos in Katra town.',
  by_taxi: '🚕 Jammu to Katra: ₹1,500-2,000 private taxi, ₹200-250 shared taxi. Delhi to Katra: ₹10,000-12,000. From Katra, register at Yatra Parchi counter then begin 14km trek. Battery vehicles available ₹100 each way.',
  local_tips: '💡 RFID Yatra Parchi is MANDATORY — get it at Katra. Valid for 24 hours only — plan accordingly. Battery vehicles run from Katra to Bank, saving 2km walk. Ropeway (udan khatola) at Sanjichhat ₹110 (saves 2.5km). Helicopter Katra-Sanjichhat ₹1,950 one way. Bhairavnath Temple after Bhawan is compulsory for complete yatra.',
},

'meenakshi-amman-temple': {
  by_air: '✈️ Madurai Airport (12km, ~25 min). Flights from Chennai (55min), Bangalore (1hr), Mumbai (2hr), Delhi (3hr). Prepaid taxi from airport to temple: ₹300-400.',
  by_train: '🚆 Madurai Junction (2km) — excellent connectivity. Pandian Express from Chennai (9hr), trains from Bangalore (9hr), Mumbai (24hr). Prepaid auto from station: ₹60-80.',
  by_bus: '🚌 Madurai Central Bus Stand (2km). TNSTC buses from Chennai (8hr), Coimbatore (5hr), Trichy (2hr), Rameswaram (4hr). City buses to Periyar Bus Stand (500m from temple).',
  by_taxi: '🚕 From Madurai station: Auto ₹60-80, cab ₹120-150. From Chennai: ₹6,000-7,000 (6hr drive). From Coimbatore: ₹3,000-3,500 (5hr). Cab apps (Ola/Uber) work in Madurai.',
  local_tips: '💡 West Tower Gate is most convenient entry. Park vehicle at West or South Tower. Temple is in heart of Madurai city — easy to reach. Visit early morning (5-6AM) for quieter darshan. Evening 9PM — closing ceremony \'Alankaram\' is beautiful.',
},

'somnath-temple': {
  by_air: '✈️ Diu Airport (65km, ~1.5hr) — flights from Mumbai (1hr), Ahmedabad (1hr). Rajkot Airport (180km, ~3hr) — better connected. Taxi from Diu airport: ₹1,500-2,000.',
  by_train: '🚆 Veraval Railway Station (7km) — trains from Ahmedabad (8hr Somnath Express), Rajkot (4hr). Somnath itself has a small station. Taxi from Veraval: ₹200-250.',
  by_bus: '🚌 Gujarat GSRTC buses from Ahmedabad to Somnath (10hr, ₹280). From Rajkot (5hr). From Surat (8hr). Private Volvo buses available. Veraval local auto to temple: ₹50-80.',
  by_taxi: '🚕 From Veraval: ₹200-300. From Rajkot: ₹3,000-3,500. From Ahmedabad: ₹6,000-7,500. One-way cab from Dwarka (combined Jyotirlinga tour): ₹3,500 (250km).',
  local_tips: '💡 Best combined with Nageshwar Jyotirlinga (15km away) and Dwarkadhish (250km) for Jyotirlinga yatra. Sound & Light show at temple: 8PM, ₹100. Temple faces sea — attend evening aarti at sunset for magical experience.',
},

'jagannath-temple-puri': {
  by_air: '✈️ Biju Patnaik International Airport, Bhubaneswar (65km, ~1.5hr). Flights from Delhi (2hr), Mumbai (2.5hr), Bangalore (2hr). Prepaid taxi from airport: ₹1,200-1,500 to Puri.',
  by_train: '🚆 Puri Railway Station (2km from temple) — direct trains from Kolkata (8hr), Delhi Puri Express (38hr), Chennai (28hr). Bhubaneswar (65km, 1hr). Shri Jagannath Express from many cities.',
  by_bus: '🚌 OSRTC buses from Bhubaneswar to Puri (every 30 min, 2hr, ₹80). From Cuttack (3hr). From Kolkata via Bhubaneswar. Puri Bus Stand (1km from temple). City autos: ₹30-50.',
  by_taxi: '🚕 From Puri station: Auto ₹40-60 to temple. From Bhubaneswar airport: ₹1,200-1,500. From Kolkata: ₹7,000-8,000 (500km). Ola/Uber works in Puri.',
  local_tips: '💡 Non-Hindus cannot enter — they can view from Raghunandan Library roof across the road. Book darshan online at jagannath.nic.in. Stay in Grand Road hotels for easy walking access. Combine with Konark (35km) and Bhubaneswar temples.',
},

'mahakaleshwar-temple': {
  by_air: '✈️ Devi Ahilyabai Holkar Airport, Indore (56km, ~1hr). Flights from Delhi (1.5hr), Mumbai (1hr), Bangalore (2hr). Prepaid taxi from Indore airport: ₹1,200-1,500.',
  by_train: '🚆 Ujjain Railway Station (2km from temple) — trains from Indore (1.5hr), Bhopal (4hr), Delhi (14hr), Mumbai (14hr). Regular Intercity from Indore every hour.',
  by_bus: '🚌 MPSRTC buses from Indore to Ujjain (1.5hr, ₹60). From Bhopal (5hr). From Ahmedabad (8hr). Ujjain Bus Stand (1km from temple). City autos and e-rickshaws everywhere.',
  by_taxi: '🚕 From Indore: ₹1,200-1,500 one way, ₹2,000-2,500 return. From Ujjain station: auto ₹50-60. From Bhopal: ₹3,500-4,000. Ola/Uber available in Ujjain.',
  local_tips: '💡 Bhasma Aarti at 4AM requires advance booking online at mahakaleshwar.com — book weeks ahead. Temple is in heart of Ujjain city, walkable from station. Simhastha Kumbh held every 12 years. Also visit Omkareshwar Jyotirlinga (130km) on same trip.',
},

'omkareshwar-temple': {
  by_air: '✈️ Indore Airport (82km, ~2hr). Taxi from airport: ₹2,000-2,500.',
  by_train: '🚆 Omkareshwar Road station (12km) or Khandwa (65km) — closest stations. Taxi from Omkareshwar Road: ₹300-400. Indore to Omkareshwar: 80km by road.',
  by_bus: '🚌 MPSRTC buses from Indore to Omkareshwar (3hr, ₹100). From Ujjain (4hr). Direct buses from Bhopal (5hr). Bus stand is at Omkareshwar town near the bridge.',
  by_taxi: '🚕 From Indore: ₹2,000-2,500 (2.5hr). Often combined with Ujjain/Mahakaleshwar. Rowing boats across the Narmada to Mandhata Island: ₹20 per person.',
  local_tips: '💡 Combine with Mahakaleshwar Ujjain (130km) for a 2-Jyotirlinga tour. Both Omkareshwar and Mamleshwar temples on either bank of island — visit both. Boat ride to island is part of the experience.',
},

'siddhivinayak-temple': {
  by_air: '✈️ Chhatrapati Shivaji Maharaj Airport, Mumbai (20km, ~45-60 min via Western Express Highway). Prepaid taxi: ₹600-700. No direct metro from airport to temple.',
  by_train: '🚆 Dadar Station (Central + Western Railways, 2km) or Prabhadevi Station (upcoming Metro Line 3). CST (7km). Prabhadevi nearest local train option.',
  by_bus: '🚌 BEST buses to Siddhivinayak Temple stop on Prabhadevi Road. Routes: 140, 153, 160, 196, 231 and more. AC buses from Dadar: ₹20-25. Very frequent service.',
  by_taxi: '🚕 From Dadar: Ola/Uber ₹80-120 (traffic dependent). From Churchgate: ₹150-200. From CST: ₹200-250. Auto from Dadar: ₹60-80. Ola/Uber highly recommended — no parking near temple.',
  local_tips: '💡 Tuesday queue is 4-6 hours. Come on weekday morning. Take Ola/Uber — DO NOT drive, parking is impossible. Queue starts from Veer Savarkar Marg. Separate queue for wheelchair/senior/VIP. Modak prasad counter outside — buy before entering.',
},

'shirdi-sai-baba-samadhi': {
  by_air: '✈️ Aurangabad Airport (120km, ~2.5hr) — flights from Mumbai, Delhi, Hyderabad. Shirdi Airport (15km) — dedicated airport with flights from Mumbai (55min), Delhi (2hr), Bangalore (1.5hr), Hyderabad. Taxi from Shirdi airport: ₹300-400.',
  by_train: '🚆 Sainagar Shirdi Station (3km) — trains from Mumbai CST (5.5hr), Pune (5hr), Nashik (2hr), Hyderabad (10hr). Manmad Junction (60km) has more trains. Taxi from station: ₹100-150.',
  by_bus: '🚌 MSRTC buses from Mumbai (6hr, ₹350), Pune (5hr, ₹280), Nashik (2hr, ₹120), Aurangabad (3hr). Shirdi Bus Stand near main temple. Very frequent service.',
  by_taxi: '🚕 From Mumbai: ₹4,500-5,500 (5-6hr). From Pune: ₹3,500-4,000. From Nashik: ₹1,500-2,000. From Shirdi station to temple: auto ₹50-70.',
  local_tips: '💡 Shirdi Airport is most convenient. Darshan tokens distributed at dawn. Early morning Kakad Aarti is the most special. Book accommodation on official Shirdi Sansthan website. Visit Shani Shingnapur (75km) on same trip.',
},

'trimbakeshwar-temple': {
  by_air: '✈️ Ozar Airport, Nashik (30km, ~45min). Flights from Mumbai (55min), Delhi (2hr), Bengaluru (2hr). Prepaid taxi from Nashik airport: ₹600-700.',
  by_train: '🚆 Nashik Road Station (30km from Trimbakeshwar). Trains from Mumbai (3.5hr), Pune (4hr), Delhi (18hr). Taxi from Nashik Road: ₹600-700.',
  by_bus: '🚌 MSRTC buses from Nashik Central Bus Stand to Trimbakeshwar (35km, 1hr, ₹40). Frequent buses. Also from Mumbai (5hr). Trimbakeshwar has its own small bus stand.',
  by_taxi: '🚕 From Nashik city: ₹700-900 one way, ₹1,200-1,400 return. From Mumbai: ₹4,500-5,500. From Pune: ₹4,000-4,500. Auto from Trimbakeshwar bus stand to temple: ₹30.',
  local_tips: '💡 Often combined with Nashik city (Kalaram Temple, Coin Museum) as day trip. Trimbak town is small — easy walking from bus stand to temple. Kumbh Mela held at Nashik every 12 years (Simhastha). Entry to inner sanctum for men requires dhoti.',
},

'tirupati-sri-padmavathi-temple': {
  by_air: '✈️ Tirupati Airport (20km). Taxi from airport: ₹400-500.',
  by_train: '🚆 Tirupati Main Station (5km). Trains from Chennai (3hr), Bangalore (3hr). Auto from station: ₹80-100.',
  by_bus: '🚌 APSRTC buses from Tirupati city to Tiruchanur (5km, ₹20). Very frequent.',
  by_taxi: '🚕 From Tirupati station: ₹150-200 to temple. Visit along with Tirumala on same trip.',
  local_tips: '💡 Must visit after Tirumala Venkateswara (tradition: Goddess first, then Balaji or vice versa). Take APSRTC bus from Alipiri or city centre.',
},

'srisailam-mallikarjuna': {
  by_air: '✈️ Rajiv Gandhi International Airport, Hyderabad (215km, ~3.5hr). Also Kurnool Airport (100km) — limited service. Taxi from Hyderabad: ₹5,000-6,000.',
  by_train: '🚆 Markapur Road (80km) or Kurnool (100km) — nearest stations. Nandyal (90km) also option. Taxi/bus from stations.',
  by_bus: '🚌 APSRTC and TSRTC buses from Hyderabad direct to Srisailam (5hr, ₹250). From Vijayawada (5hr). From Kurnool (3hr). All access through Nallamala forest — scenic but winding.',
  by_taxi: '🚕 From Hyderabad: ₹5,000-6,000 one way. From Kurnool: ₹2,000-2,500. Inside Srisailam town: autos for ₹30-50.',
  local_tips: '💡 Srisailam is inside the Nallamala Forest Reserve — road through forest is beautiful but can be long. Forest checkpoint entry required. Combine with Nagarjuna Sagar Dam (40km) for a day trip. Rope-way (ropeway) available for scenic views.',
},

'kanaka-durga-temple': {
  by_air: '✈️ Vijayawada Airport (15km, ~30min). Flights from Hyderabad (1hr), Chennai (1hr), Bangalore (1.5hr), Delhi. Prepaid taxi from airport: ₹400-500.',
  by_train: '🚆 Vijayawada Junction (3km from temple) — major railway hub. Trains from Hyderabad (3hr), Chennai (6hr), Delhi (18hr). Auto from station: ₹60-80.',
  by_bus: '🚌 Pandit Nehru Bus Stand, Vijayawada (3km). APSRTC buses from all AP/Telangana cities. City buses and autos available.',
  by_taxi: '🚕 From Vijayawada station: Auto ₹60-80, cab ₹120-150. Cable car to hilltop: ₹60 return. Or 1km climb on foot.',
  local_tips: '💡 Take cable car (ropeway) from base to hilltop — 5 minute ride, ₹60 return. Queue is on foot via stairs (1,200 steps). Navratri (Oct) is spectacular but extremely crowded — millions attend.',
},

'ramanathaswamy-temple': {
  by_air: '✈️ Madurai Airport (170km, ~3hr). Trichy Airport (170km via Rameswaram bridge, ~3hr). Taxi from Madurai: ₹4,000-4,500.',
  by_train: '🚆 Rameswaram Station (1km) — trains from Chennai (8hr Sethu Express), Madurai (3hr). Train actually crosses the famous Pamban Bridge (spectacular). Auto from station: ₹40-50.',
  by_bus: '🚌 TNSTC buses from Madurai (4hr, ₹150), Chennai (12hr), Trichy (4hr). Rameswaram Bus Stand (500m from temple). Island connected by bridge.',
  by_taxi: '🚕 From Madurai: ₹3,500-4,000. From Trichy: ₹3,500-4,000. From Rameswaram station: Auto ₹40-50, walk possible.',
  local_tips: '💡 Train from Madurai across Pamban Bridge is a stunning experience — take it one way. Visit Dhanushkodi (18km, land\'s end) on same trip — beautiful ruins and 3-sea confluence. 22 sacred wells inside temple — carry fresh clothes for ritual dip.',
},

'brihadeeswarar-temple': {
  by_air: '✈️ Trichy Airport (60km, ~1.5hr). Flights from Chennai (1hr), Bangalore (1hr), Mumbai (2hr). Taxi from Trichy: ₹1,200-1,500.',
  by_train: '🚆 Thanjavur Railway Station (2km) — trains from Chennai (5hr), Trichy (1hr), Rameswaram (5hr). Cholan Express from Chennai. Auto from station: ₹50-70.',
  by_bus: '🚌 TNSTC buses from Trichy to Thanjavur (1.5hr, ₹50). From Chennai (7hr). From Kumbakonam (45min). Thanjavur Bus Stand (500m from temple).',
  by_taxi: '🚕 From Trichy: ₹1,200-1,500. From Trichy airport: same. From Chennai: ₹6,000-7,000. Auto from Thanjavur station: ₹50-70.',
  local_tips: '💡 ASI-managed monument — carry ID. Photography allowed. Combine with Kumbakonam temples (55km) and Gangaikonda Cholapuram (70km) for Chola temple circuit. Best light for photography: early morning.',
},

'guruvayur-krishna-temple': {
  by_air: '✈️ Calicut Airport (93km, ~2hr) or Cochin Airport (80km, ~2hr). Taxi from Cochin airport: ₹2,500-3,000.',
  by_train: '🚆 Guruvayur Station (1km) — trains from Thrissur (30min), Ernakulam/Kochi (2hr), Chennai (10hr), Coimbatore (4hr). Auto from station: ₹30-40.',
  by_bus: '🚌 KSRTC buses from Thrissur (1hr, ₹35), Ernakulam (2.5hr, ₹80), Coimbatore (3hr), Chennai (10hr). Guruvayur Bus Stand (500m from temple).',
  by_taxi: '🚕 From Thrissur: ₹800-1,000. From Ernakulam/Kochi: ₹2,000-2,500. From Guruvayur station: Auto ₹30-40.',
  local_tips: '💡 Strictly only Hindus allowed inside. Men MUST wear dhoti — no pants allowed; dhoti available for rent ₹20. Women must wear saree or salwar (no jeans). Online darshan booking at guruvayurdevaswom.org. The elephant pageant (Keshavan elephant family) visible at Punnathur Kotta (5km).',
},

'padmanabhaswamy-temple': {
  by_air: '✈️ Thiruvananthapuram International Airport (6km, ~20min). Flights from Dubai, Singapore, many Indian cities. Prepaid taxi from airport: ₹250-300.',
  by_train: '🚆 Thiruvananthapuram Central Station (2km) — trains from Chennai (16hr), Bangalore (14hr), Mumbai (36hr), Delhi (42hr). Kerala Express, Rajdhani. Auto from station: ₹40-50.',
  by_bus: '🚌 KSRTC Central Bus Stand, Thampanoor (1km). City buses to East Fort (nearest stop, 200m). KSRTC from all Kerala cities.',
  by_taxi: '🚕 From TVM station: Auto ₹40-50, cab ₹100-120. From airport: ₹250-300. Ola/Uber available in Thiruvananthapuram.',
  local_tips: '💡 Extremely strict dress code — men MUST wear dhoti (no shirt inside sanctum), women saree only. No exceptions. Entry only for Hindus. Online booking NOT available — physical queue only at East Fort entrance. Come very early (4AM for 5AM opening). World\'s richest temple — high security.',
},

'sabarimala-ayyappa-temple': {
  by_air: '✈️ Cochin Airport (170km) or Thiruvananthapuram Airport (140km). Taxi to Pamba base: ₹4,000-5,000.',
  by_train: '🚆 Kottayam (90km) or Chengannur (70km) — nearest railheads. Trains from Mumbai, Chennai, Delhi, Ernakulam. Taxi from stations to Pamba: ₹2,500-3,000.',
  by_bus: '🚌 KSRTC special pilgrim buses from all Kerala districts to Pamba during season. From Kottayam: 3hr. From Ernakulam: 4hr. Regular buses + special season buses.',
  by_taxi: '🚕 From Kottayam: ₹2,500-3,000 to Pamba. From Ernakulam: ₹4,000-4,500. From Pamba: 5km trek to temple. Carrying pilgrim\'s kit (irumudi) mandatory.',
  local_tips: '💡 Pilgrims MUST carry irumudi (two-compartment bag with sacred items) — mandatory from Nilackal or any temple. 41-day austerity (vrat) is expected. Entry NOT allowed Nov-May. Season: Nov-Jan. Massive crowding — hire guide for first-timers. All pilgrims address each other as "Swamy".',
},

'dakshineswar-kali-temple': {
  by_air: '✈️ Netaji Subhas Chandra Bose Airport, Kolkata (25km, ~1hr in traffic). Prepaid taxi: ₹500-600.',
  by_train: '🚆 Dakshineswar Station (1km) — Circular Railway. Also Shyambazar (6km, then bus). Howrah Station (16km) — most trains terminate here. Metro to Dakshineswar (northernmost station on Blue Line).',
  by_bus: '🚌 Dakshineswar Bus Terminus adjacent to temple — buses from Howrah, Esplanade, Shyambazar. Bus No. 35, 38, 78, 201, 234 from city.',
  by_taxi: '🚕 From Howrah Station: ₹300-400. From Park Street: ₹250-300. Ola/Uber work well. Metro (Blue Line) to Dakshineswar station is cheapest (₹10-20).',
  local_tips: '💡 Metro Blue Line goes directly to Dakshineswar — fastest option. Temple on banks of Hooghly — beautiful setting. Visit Belur Math (Ramakrishna headquarters, 2km by boat) on same trip. Boat service runs between the two.',
},

'kamakhya-devi-temple': {
  by_air: '✈️ Lokpriya Gopinath Bordoloi Airport, Guwahati (23km from temple, ~45min). Flights from Delhi (2hr), Kolkata (1hr), Mumbai (3hr). Prepaid taxi from airport: ₹700-900.',
  by_train: '🚆 Guwahati Railway Station (8km) — major Northeast railhead. Trains from Delhi (26hr Rajdhani), Kolkata (18hr), Mumbai (40hr). Auto from station: ₹120-150.',
  by_bus: '🚌 ASTC and private buses from all Northeast states to Guwahati. City buses No. 4, 5 to Nilachal Hill base. Then walk 2km or share auto up the hill.',
  by_taxi: '🚕 From Guwahati station: ₹250-300 to temple. From airport: ₹700-900. Ola/Uber available in Guwahati. From temple base to hilltop: share auto ₹30, or 2km walk.',
  local_tips: '💡 Temple on Nilachal Hill — parking at base, then walk 2km up or share auto. During Ambubachi (June), city SHUTS for pilgrims — book accommodation well in advance. Lines can be 3-6 hours on regular days — come early morning. Umananda Temple (Brahmaputra island) is a perfect half-day addition.',
},

'golden-temple-amritsar': {
  by_air: '✈️ Sri Guru Ram Dass Jee International Airport, Amritsar (11km, ~25min). Flights from Delhi (1hr), Mumbai (2hr), many cities. Direct international flights too. Prepaid taxi: ₹300-350.',
  by_train: '🚆 Amritsar Railway Station (2km from Golden Temple) — trains from Delhi (6hr Shatabdi), Mumbai (27hr), Jammu (3hr). Very frequent trains from Delhi. Rickshaw from station: ₹60-80.',
  by_bus: '🚌 PRTC/PUNBUS Central Bus Stand (2km). Buses from Delhi (8hr, ₹500 Volvo), Chandigarh (3hr), Jammu (4hr). City minibuses run frequently.',
  by_taxi: '🚕 From Amritsar station: ₹120-150 cab, ₹60-80 rickshaw. From airport: ₹300-350. From Delhi: ₹8,000-9,000 cab (6hr). From Chandigarh: ₹3,500-4,000. Ola/Uber works in Amritsar.',
  local_tips: '💡 Open 24 hours — visit late night (11PM-1AM) for a mystical, less crowded experience. Langar (free kitchen) open round the clock. Head must be covered — free cloth available at entry. Remove shoes at washroom (free locker). Visit Jallianwala Bagh (1km) and Wagah Border (30km) ceremony same day.',
},

'ranakpur-jain-temple': {
  by_air: '✈️ Udaipur Airport (96km, ~2hr). Flights from Delhi, Mumbai, Bangalore. Taxi from Udaipur airport: ₹2,500-3,000.',
  by_train: '🚆 Falna Station (35km) — nearest railhead. Or Udaipur Station (96km). Taxi from Falna: ₹800-1,000.',
  by_bus: '🚌 RSRTC buses from Udaipur to Ranakpur (3hr, ₹100). Private buses from Jodhpur (4hr) via Sadri. Bus stand at Ranakpur village.',
  by_taxi: '🚕 From Udaipur: ₹2,500-3,000 one way. From Jodhpur: ₹3,000-3,500. From Mount Abu: ₹2,500-3,000 (90km). Often combined as Udaipur-Ranakpur-Mount Abu circuit.',
  local_tips: '💡 Entry for Jains from 6AM; non-Jains from 12-5PM only. Photography allowed in outer areas. Shoes removed at entrance. Temple is in a forested valley — peaceful setting. Nearby Parasvanath temple also worth seeing. Combine with Mount Abu (Dilwara temples, 60km) for Jain circuit.',
},

'dilwara-jain-temples': {
  by_air: '✈️ Udaipur Airport (180km, ~3.5hr) or Surat Airport (240km). Taxi from Udaipur: ₹5,000-6,000 return.',
  by_train: '🚆 Abu Road Station (28km) — trains from Ahmedabad (4hr), Delhi (10hr), Mumbai (9hr), Jaipur (6hr). Taxi from Abu Road to Mount Abu: ₹500-700.',
  by_bus: '🚌 RSRTC buses from Ahmedabad (6hr), Udaipur (3hr), Jaipur (8hr) to Mount Abu. Frequent service to Abu Road, then cab up hill. Mount Abu Bus Stand (2km from Dilwara).',
  by_taxi: '🚕 From Abu Road station: ₹600-700 to Mount Abu. From Udaipur: ₹4,500-5,000. From Ahmedabad: ₹5,500-6,500. Local auto in Mount Abu to Dilwara: ₹50-80.',
  local_tips: '💡 Mount Abu is the only hill station in Rajasthan (1,220m). Dilwara temples open 12PM-5PM only. No photography inside. No leather allowed. White attire preferred. Combine with Nakki Lake, Sunset Point in Mount Abu. Stay overnight for a relaxed visit.',
},

'sravanabelagola-gomateshwara': {
  by_air: '✈️ Kempegowda Airport, Bangalore (160km, ~3hr). Mangalore Airport (165km via Hassan). Taxi from Bangalore: ₹4,500-5,500.',
  by_train: '🚆 Hassan Station (50km) or Channarayapatna (13km) — nearest. Trains from Bangalore (3hr to Hassan), Mysore (2.5hr to Hassan). Taxi from Hassan: ₹1,000-1,200.',
  by_bus: '🚌 KSRTC buses from Bangalore to Sravanabelagola (3.5hr, ₹150). From Mysore (2.5hr, ₹120). From Hassan (1.5hr, ₹60). Bus stand at base of hill.',
  by_taxi: '🚕 From Bangalore: ₹4,500-5,000. From Mysore: ₹2,500-3,000. From Hassan: ₹1,000-1,200. Often combined as Mysore-Hassan-Sravanabelagola circuit.',
  local_tips: '💡 614 steps to the top — start early morning before heat. No footwear from entry gate (long walk on stone). Carry water. Mahamastakabhisheka happens every 12 years — next around 2030. White attire preferred. No leather at any point. Channarayapatna to Sravanabelagola: auto ₹200-250.',
},

'udupi-sri-krishna-temple': {
  by_air: '✈️ Mangalore Airport (60km, ~1.5hr). Flights from Mumbai (1.5hr), Bangalore (1hr). Taxi from Mangalore airport: ₹1,500-2,000.',
  by_train: '🚆 Udupi Station (3km) — trains from Mangalore (1hr), Goa (4hr), Mumbai (12hr Konkan Railway). Konkan Railway is scenic! Auto from station: ₹60-80.',
  by_bus: '🚌 KSRTC buses from Mangalore (1.5hr, ₹60), Bangalore (8hr, ₹300), Goa (5hr). Udupi Bus Stand (1km from temple).',
  by_taxi: '🚕 From Mangalore: ₹1,500-2,000. From Udupi station: Auto ₹60-80. From Bangalore: ₹5,000-5,500.',
  local_tips: '💡 Darshan through Kanakana Kindi (nine-holed window) is unique. Udupi cuisine is world-famous — eat at Krishna Bhavan or Mitra Samaj after darshan. Combine with Murudeshwara (80km, coastal Shiva), Gokarna (100km), Kollur Mookambika (60km) for coastal Karnataka circuit.',
},

'konark-sun-temple': {
  by_air: '✈️ Biju Patnaik Airport, Bhubaneswar (65km, ~1.5hr). Taxi from Bhubaneswar: ₹1,500-2,000.',
  by_train: '🚆 Puri Station (35km) or Bhubaneswar (65km). Trains from Kolkata, Chennai, Delhi. Taxi from Puri: ₹800-1,000.',
  by_bus: '🚌 OSRTC buses from Bhubaneswar (2hr), Puri (45min, ₹50). Auto/tempo from Puri bus stand to Konark: ₹150-200.',
  by_taxi: '🚕 From Puri: ₹800-1,000 (35km). From Bhubaneswar: ₹1,500-2,000. Puri-Konark-Bhubaneswar golden triangle: ₹3,000-3,500.',
  local_tips: '💡 ASI monument — ₹40 Indian, ₹600 foreign entry. Best photographed at sunrise. Dance Festival in December is spectacular. Combine with Puri Jagannath and Bhubaneswar temples for the Golden Triangle. Evening light-and-sound show.',
},

'hampi-virupaksha-temple': {
  by_air: '✈️ Hubli Airport (160km, ~3hr) or Bangalore Kempegowda Airport (360km, ~6hr). Taxi from Hubli: ₹3,500-4,000.',
  by_train: '🚆 Hospet Junction (13km) — trains from Bangalore (9hr), Hyderabad (10hr), Goa (5hr). Taxi from Hospet: ₹300-400.',
  by_bus: '🚌 KSRTC buses from Bangalore to Hampi (9hr, ₹400). From Hubli (3hr). From Goa (5hr Anjuna-Hampi). Hospet to Hampi: local bus (₹30) or auto (₹200).',
  by_taxi: '🚕 From Hospet: ₹300-400. From Bangalore: ₹8,000-10,000 (360km). From Goa: ₹5,000-6,000.',
  local_tips: '💡 Hampi is a UNESCO World Heritage Site — full day minimum, ideally 2 nights. Rent bicycle (₹100/day) or motorbike (₹300/day) to explore the 4,000+ monuments. Coracle (round boat) rides on Tungabhadra river. Vittala Temple (stone chariot, musical pillars) is must-see addition.',
},

'mysore-chamundeshwari-temple': {
  by_air: '✈️ Mysore Airport (20km) — limited flights. Kempegowda Airport Bangalore (145km, ~3hr). Taxi from Bangalore airport: ₹3,500-4,000.',
  by_train: '🚆 Mysore Junction (10km from Chamundi Hills). Trains from Bangalore (2hr Shatabdi), Chennai (8hr). Auto from station: ₹100-150 to hilltop.',
  by_bus: '🚌 KSRTC buses from Bangalore (3hr, ₹100). Local Mysore city bus to Chamundi Hill base. KSRTC terminus near railway station.',
  by_taxi: '🚕 From Mysore station: Auto ₹100-120 to hilltop. From Bangalore: ₹3,500-4,000. From Ooty: ₹3,000-3,500. Cable car NOT available — drive or walk 1,000 steps.',
  local_tips: '💡 Cable car not available — take road (12km from city) or walk 1,008 steps. Drive takes 20 min from Mysore city. Combine with Mysore Palace (Dasara festival is spectacular), Brindavan Gardens, zoo on same trip. Dasara (October) is Mysore\'s biggest festival — entire city illuminated.',
},

}

// ════════════════════════════════════════════════════════
// TEMPLATE GENERATORS
// ════════════════════════════════════════════════════════

function getAirport(state, city) {
  const airports = {
    'Uttar Pradesh':     { airport:'Varanasi (LBS Airport) / Lucknow (CSAI Airport)', dist:'50-200km', taxi:'₹1,500-4,000' },
    'Uttarakhand':       { airport:'Jolly Grant Airport, Dehradun', dist:'150-300km', taxi:'₹4,000-8,000' },
    'Tamil Nadu':        { airport:'Chennai Airport / Madurai Airport / Trichy Airport', dist:'40-200km', taxi:'₹1,000-5,000' },
    'Andhra Pradesh':    { airport:'Hyderabad RGI Airport / Vijaywada Airport / Tirupati Airport', dist:'30-200km', taxi:'₹500-5,000' },
    'Telangana':         { airport:'Rajiv Gandhi International Airport, Hyderabad', dist:'30-100km', taxi:'₹800-2,500' },
    'Karnataka':         { airport:'Kempegowda International Airport, Bangalore / Mangalore Airport', dist:'80-250km', taxi:'₹2,500-6,000' },
    'Kerala':            { airport:'Cochin International Airport / Thiruvananthapuram Airport / Calicut Airport', dist:'50-150km', taxi:'₹1,500-4,000' },
    'Maharashtra':       { airport:'CSIA Mumbai / Pune Airport / Aurangabad Airport', dist:'50-300km', taxi:'₹1,500-8,000' },
    'Gujarat':           { airport:'Ahmedabad Airport / Surat Airport / Rajkot Airport', dist:'50-250km', taxi:'₹1,500-6,000' },
    'Rajasthan':         { airport:'Jaipur Airport / Udaipur Airport / Jodhpur Airport', dist:'80-250km', taxi:'₹2,000-5,000' },
    'Madhya Pradesh':    { airport:'Indore Airport / Bhopal Airport', dist:'50-200km', taxi:'₹1,200-5,000' },
    'Odisha':            { airport:'Biju Patnaik Airport, Bhubaneswar', dist:'50-150km', taxi:'₹1,200-3,500' },
    'West Bengal':       { airport:'Netaji Subhas Bose Airport, Kolkata', dist:'20-80km', taxi:'₹400-2,000' },
    'Assam':             { airport:'Lokpriya Gopinath Bordoloi Airport, Guwahati', dist:'15-50km', taxi:'₹400-1,500' },
    'Jharkhand':         { airport:'Birsa Munda Airport, Ranchi', dist:'80-150km', taxi:'₹2,000-3,500' },
    'Bihar':             { airport:'Jay Prakash Narayan Airport, Patna', dist:'50-150km', taxi:'₹1,500-3,500' },
    'Punjab':            { airport:'Sri Guru Ram Dass Jee Airport, Amritsar / Chandigarh Airport', dist:'20-100km', taxi:'₹400-2,500' },
    'Haryana':           { airport:'Chandigarh Airport / IGI Delhi Airport', dist:'50-180km', taxi:'₹1,500-4,000' },
    'Delhi':             { airport:'Indira Gandhi International Airport, Delhi', dist:'15-35km', taxi:'₹400-800' },
    'Himachal Pradesh':  { airport:'Gaggal Airport Dharamsala / Shimla Airport (small)', dist:'20-100km', taxi:'₹500-3,000' },
    'Jammu & Kashmir':   { airport:'Jammu Airport / Srinagar Airport', dist:'30-100km', taxi:'₹800-2,500' },
    'Goa':               { airport:'Dabolim Airport (South Goa) / Mopa Airport (North Goa)', dist:'20-60km', taxi:'₹600-1,500' },
    'Chhattisgarh':      { airport:'Swami Vivekananda Airport, Raipur', dist:'100-200km', taxi:'₹2,500-5,000' },
    'Tripura':           { airport:'Maharaja Bir Bikram Airport, Agartala', dist:'20-60km', taxi:'₹500-1,500' },
  }
  return airports[state] || { airport:`Nearest airport in ${state}`, dist:'50-200km', taxi:'₹1,500-5,000' }
}

function getTemplate(name, state, city, type, categories) {
  const ap = getAirport(state, city)
  const isHilltop = (categories||[]).includes('Hilltop')
  const isRemote = ['Kedarnath','Badrinath','Gangotri','Yamunotri','Tungnath','Rudranath','Amarnath','Sabarimala'].some(n => name.includes(n))

  return {
    by_air: `✈️ Nearest Airport: ${ap.airport} (${ap.dist} from ${city}). Taxi from airport to ${city}: ${ap.taxi}. Check current flights on MakeMyTrip or Ixigo.`,
    by_train: `🚆 Nearest Railway Station: ${city} Station or nearest junction. Check trains on IRCTC.co.in. Auto/taxi from station to temple: ₹50-300 depending on distance.`,
    by_bus: `🚌 State government buses (${state} SRTC) connect ${city} with major cities. Local city buses and share autos available near bus stand. AC Volvo options for long routes.`,
    by_taxi: `🚕 From ${city} railway station or bus stand to temple: Auto ₹30-100, Cab ₹100-300. Ola/Uber available in most cities. Outstation cabs available from nearby major cities.`,
    local_tips: `💡 Arrive early morning for shorter queues. For Jain temples — wear white/light attire, no leather items. For hilltop temples — comfortable footwear essential. Check temple official website for festival dates and special darshan timings.`,
  }
}

// ════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════
async function main() {
  const client = new MongoClient(MONGODB_URI, { family:4, serverSelectionTimeoutMS:15000 })
  await client.connect()
  console.log('✅ Connected\n')

  const col = client.db().collection('temples')
  const temples = await col.find({}).toArray()
  console.log(`📊 Updating ${temples.length} temples with How To Reach...\n`)

  let ok = 0
  for (const t of temples) {
    const specific = REACH[t.slug]
    const reach = specific || getTemplate(t.name, t.state, t.city, t.type, t.categories)
    await col.updateOne({ _id: t._id }, { $set: { how_to_reach: reach } })
    ok++
    if (ok % 50 === 0) console.log(`  ✅ ${ok}/${temples.length}...`)
  }

  console.log(`\n🎉 Done! ${ok} temples updated with:`)
  console.log('   ✈️  Nearest airports + taxi cost')
  console.log('   🚆  Nearest railway stations + trains')
  console.log('   🚌  Bus connectivity')
  console.log('   🚕  Taxi/auto costs and pickup points')
  console.log('   💡  Local transport tips')
  await client.close()
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
