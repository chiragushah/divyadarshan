import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// ─────────────────────────────────────────────────────────────────────────────
// One-time admin endpoint: add missing marquee Pune & Mumbai temples, fix coarse
// city labels (e.g. "India"/"Maharashtra" → the real city), and report duplicate
// records. Runs read-only (dry-run) by default; mutations require ?apply=1&token=.
// Inserts are non-destructive: a temple whose slug already exists is skipped.
// Images are resolved live from Wikipedia on apply (Vercel can reach the API).
// ─────────────────────────────────────────────────────────────────────────────

const TOKEN = '8e11eb8dc59a58b87f'

const PUNE = { lat: 18.5204, lng: 73.8567 }
const MUMBAI = { lat: 19.0760, lng: 72.8777 }

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371, dLat = (bLat - aLat) * Math.PI / 180, dLng = (bLng - aLng) * Math.PI / 180
  const la1 = aLat * Math.PI / 180, la2 = bLat * Math.PI / 180
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

function esc(s: any): string {
  return String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))
}

// ── New temples (full records, researched) ──────────────────────────────────
type NewTemple = {
  slug: string; name: string; city: string; deity: string; type: string
  description: string; timing: string; best_time: string; dress_code: string
  festivals: string; categories: string[]; lat: number; lng: number
  wiki?: string
  how_to_reach: Record<string, string>
  facilities: Record<string, string>
  nearby_places: string[]
  poojas: { name: string; description: string; is_famous?: boolean; best_for?: string }[]
}

const COMMON = { state: 'Maharashtra', has_live: false, rating_avg: 0, rating_count: 0 }

const NEW_TEMPLES: NewTemple[] = [
  // ───────── PUNE ─────────
  {
    slug: 'dagdusheth-halwai-ganpati', name: 'Shreemant Dagdusheth Halwai Ganpati Temple', city: 'Pune',
    deity: 'Ganesha', type: 'Ganesha',
    description: "Pune's most famous and most visited Ganesh temple, in the old-city Budhwar Peth. Founded in the 1890s by the sweet-maker Dagdusheth Halwai after he lost his son to plague, its gold-adorned idol draws enormous crowds, and the temple's Ganeshotsav is among the grandest in Maharashtra.",
    timing: '5:00 AM – 11:00 PM', best_time: 'Ganesh Chaturthi (Aug–Sep); Angaraki & Sankashti Chaturthi',
    dress_code: 'Modest traditional attire preferred', festivals: 'Ganesh Chaturthi, Sankashti Chaturthi, Angaraki Chaturthi',
    categories: ['Ganesha'], lat: 18.5164, lng: 73.8561, wiki: 'Dagadusheth_Halwai_Ganapati_Temple',
    how_to_reach: { air: 'Pune Airport ~10 km', rail: 'Pune Junction ~2 km', road: 'Central Budhwar Peth, walkable from Shaniwar Wada', nearest: 'Pune Junction railway station' },
    facilities: { darshan: 'Free darshan, managed queue', parking: 'Paid parking nearby', prasad: 'Modak & laddoo prasad', footwear: 'Footwear stand outside' },
    nearby_places: ['Shaniwar Wada', 'Kasba Ganpati', 'Tulshibaug', 'Lal Mahal'],
    poojas: [
      { name: 'Atharvashirsha Abhishek', description: 'Group recitation of the Ganapati Atharvashirsha with abhishek of the idol.', is_famous: true, best_for: 'removing obstacles' },
      { name: 'Sankashti Sankalp Pooja', description: 'Special sankalp performed on Sankashti Chaturthi for wish-fulfilment.', best_for: 'success' },
    ],
  },
  {
    slug: 'chaturshringi-temple-pune', name: 'Shree Chaturshringi Temple', city: 'Pune',
    deity: 'Durga', type: 'Shakti',
    description: 'A hillside Goddess temple on Senapati Bapat Road, reached by a long flight of steps, dedicated to Chaturshringi (a form of Durga, also called Ambareshwari) revered as a guardian deity of Pune. Built during the reign of Shivaji, it is a major Navratri destination when a large fair fills the foothills.',
    timing: '6:00 AM – 9:00 PM', best_time: 'Navratri (Sep–Oct); Fridays & Tuesdays',
    dress_code: 'Modest attire', festivals: 'Navratri, Dussehra',
    categories: ['Shakti', 'Hilltop'], lat: 18.5390, lng: 73.8282, wiki: 'Chaturshringi_Temple',
    how_to_reach: { air: 'Pune Airport ~12 km', rail: 'Shivajinagar ~3 km', road: 'Senapati Bapat Road, near Pune University', nearest: 'Shivajinagar railway station' },
    facilities: { steps: '~100 steps to the shrine', parking: 'Available at the base', prasad: 'Prasad counter', footwear: 'Stand at base' },
    nearby_places: ['Savitribai Phule Pune University', 'Fergusson College', 'Agriculture College'],
    poojas: [
      { name: 'Navratri Ghat Sthapana', description: 'Nine-day Devi worship through Navratri with daily rituals.', is_famous: true, best_for: 'strength & protection' },
      { name: 'Kumkum Archana', description: 'Archana offered to the Goddess with kumkum.', best_for: 'wellbeing' },
    ],
  },
  {
    slug: 'parvati-hill-pune', name: 'Parvati Hill Temple (Devdeveshwar)', city: 'Pune',
    deity: 'Shiva', type: 'Shiva',
    description: 'A hilltop Peshwa-era temple complex atop Parvati Hill in south Pune, built around 1749 under Peshwa Balaji Baji Rao. The main Devdeveshwar shrine is dedicated to Shiva and Parvati, with Vishnu and Ganesha shrines alongside, and the climb of about 100 steps rewards visitors with sweeping views over the city.',
    timing: '5:00 AM – 8:00 PM', best_time: 'Mahashivratri; Shravan Mondays; early morning for views',
    dress_code: 'Modest attire', festivals: 'Mahashivratri, Shravan Somvar',
    categories: ['Shiva', 'Hilltop'], lat: 18.5018, lng: 73.8507, wiki: 'Parvati_Hill',
    how_to_reach: { air: 'Pune Airport ~12 km', rail: 'Pune Junction ~5 km', road: 'Parvati, off Sinhagad Road', nearest: 'Swargate bus stand ~2 km' },
    facilities: { steps: '~103 steps', museum: 'Peshwa museum on site', parking: 'At the base', views: 'Panoramic city viewpoint' },
    nearby_places: ['Sarasbaug Ganpati', 'Peshwe Energy Park', 'Saras Baug'],
    poojas: [
      { name: 'Rudrabhishek', description: 'Abhishek of the Shivalinga with sacred Rudra chanting.', is_famous: true, best_for: 'health & peace' },
    ],
  },
  {
    slug: 'pataleshwar-cave-temple-pune', name: 'Pataleshwar Cave Temple', city: 'Pune',
    deity: 'Shiva', type: 'Cave',
    description: "An 8th-century rock-cut cave temple carved from a single basalt rock in Shivajinagar, dedicated to Shiva and dating to the Rashtrakuta period. Pune's oldest temple, it is known for its circular Nandi mandapa and pillared hall, and is a protected monument in the heart of the city.",
    timing: '8:00 AM – 5:30 PM', best_time: 'Mahashivratri; weekday mornings',
    dress_code: 'Modest attire', festivals: 'Mahashivratri, Shravan Somvar',
    categories: ['Shiva', 'Cave', 'Heritage'], lat: 18.5304, lng: 73.8453, wiki: 'Pataleshwar',
    how_to_reach: { air: 'Pune Airport ~9 km', rail: 'Shivajinagar ~1.5 km', road: 'Jangli Maharaj Road, Shivajinagar', nearest: 'Shivajinagar railway station' },
    facilities: { entry: 'Free; ASI-protected monument', parking: 'On-street', photography: 'Allowed outside the sanctum' },
    nearby_places: ['Jangli Maharaj Temple', 'FC Road', 'Sambhaji Park'],
    poojas: [
      { name: 'Shiva Abhishek', description: 'Abhishek of the rock-cut cave Shivalinga.', best_for: 'peace' },
    ],
  },
  {
    slug: 'omkareshwar-mandir-pune', name: 'Omkareshwar Temple, Pune', city: 'Pune',
    deity: 'Shiva', type: 'Shiva',
    description: 'A Peshwa-era Shiva temple on the bank of the Mutha river in Shaniwar Peth, built in the 1730s. Known for its blend of Maratha and Mughal-influenced architecture and its riverside ghats, it is a tranquil old-city shrine, especially active during Shravan and Mahashivratri.',
    timing: '5:30 AM – 9:00 PM', best_time: 'Shravan Mondays; Mahashivratri',
    dress_code: 'Modest attire', festivals: 'Mahashivratri, Shravan Somvar, Tripurari Pournima',
    categories: ['Shiva', 'Heritage'], lat: 18.5167, lng: 73.8505,
    how_to_reach: { air: 'Pune Airport ~10 km', rail: 'Pune Junction ~3 km', road: 'Shaniwar Peth, by the Mutha river', nearest: 'Pune Junction ~3 km' },
    facilities: { ghats: 'Riverside ghats', parking: 'On-street', prasad: 'Bel-patra & prasad' },
    nearby_places: ['Shaniwar Wada', 'Z Bridge', 'Omkareshwar Ghat'],
    poojas: [
      { name: 'Rudrabhishek', description: 'Traditional Shiva abhishek with bel leaves and chanting.', best_for: 'health' },
    ],
  },
  {
    slug: 'tulshibaug-ram-mandir-pune', name: 'Tulshibaug Ram Mandir', city: 'Pune',
    deity: 'Rama', type: 'Vaishnava',
    description: "An 18th-century Ram temple in Pune's old-city Tulshibaug precinct, built between 1763 and 1795 during the Peshwa era. Famous for its tall, ornate shikhara and the bustling market that surrounds it, the temple enshrines Rama along with shrines to Ganpati and Shankar.",
    timing: '6:00 AM – 9:00 PM', best_time: 'Ram Navami (Mar–Apr)',
    dress_code: 'Modest attire', festivals: 'Ram Navami, Hanuman Jayanti',
    categories: ['Rama', 'Heritage'], lat: 18.5118, lng: 73.8558, wiki: 'Tulshibaug',
    how_to_reach: { air: 'Pune Airport ~10 km', rail: 'Pune Junction ~2.5 km', road: 'Tulshibaug, Budhwar Peth old city', nearest: 'Pune Junction ~2.5 km' },
    facilities: { market: 'Famous shopping bazaar around temple', parking: 'Limited; use nearby lots', footwear: 'Stand outside' },
    nearby_places: ['Dagdusheth Ganpati', 'Kasba Ganpati', 'Belbag Temple'],
    poojas: [
      { name: 'Ram Navami Utsav', description: "Celebration of Rama's birth with kirtan and abhishek.", is_famous: true, best_for: 'devotion' },
    ],
  },
  {
    slug: 'belbag-temple-pune', name: 'Belbag Temple (Lakshmi-Narayan)', city: 'Pune',
    deity: 'Vishnu', type: 'Vaishnava',
    description: 'A late-18th-century temple in Budhwar Peth built by the statesman Nana Phadnavis, dedicated to Vishnu as Lakshmi-Narayan. An elegant old-city shrine set around a courtyard, it is one of Pune’s notable Peshwa-era Vishnu temples.',
    timing: '6:00 AM – 9:00 PM', best_time: 'Vaikuntha Ekadashi; Ekadashi days',
    dress_code: 'Modest attire', festivals: 'Vaikuntha Ekadashi, Gokulashtami',
    categories: ['Vishnu', 'Heritage'], lat: 18.5172, lng: 73.8567,
    how_to_reach: { air: 'Pune Airport ~10 km', rail: 'Pune Junction ~2.5 km', road: 'Budhwar Peth, old city', nearest: 'Pune Junction ~2.5 km' },
    facilities: { parking: 'Limited street parking', footwear: 'Stand outside', prasad: 'Prasad counter' },
    nearby_places: ['Tulshibaug Ram Mandir', 'Dagdusheth Ganpati', 'Kasba Ganpati'],
    poojas: [
      { name: 'Vishnu Sahasranama', description: 'Recitation of the thousand names of Vishnu with archana.', best_for: 'prosperity' },
    ],
  },
  {
    slug: 'khunya-murlidhar-pune', name: 'Khunya Murlidhar Temple', city: 'Pune',
    deity: 'Krishna', type: 'Vaishnava',
    description: 'A historic Krishna (Murlidhar) and Radha temple in Sadashiv Peth, consecrated in 1797. Its unusual name recalls a violent episode from its founding; today it is a cherished neighbourhood shrine known for its old Peshwa-era idols of the flute-playing Krishna.',
    timing: '6:00 AM – 9:30 PM', best_time: 'Janmashtami (Aug–Sep)',
    dress_code: 'Modest attire', festivals: 'Janmashtami, Gokulashtami',
    categories: ['Krishna', 'Heritage'], lat: 18.5110, lng: 73.8490,
    how_to_reach: { air: 'Pune Airport ~11 km', rail: 'Pune Junction ~3.5 km', road: 'Sadashiv Peth, old city', nearest: 'Pune Junction ~3.5 km' },
    facilities: { parking: 'On-street', footwear: 'Stand outside' },
    nearby_places: ['Sarasbaug', 'Vishrambaug Wada', 'Shanipar'],
    poojas: [
      { name: 'Janmashtami Utsav', description: "Midnight celebration of Krishna's birth with kirtan.", is_famous: true, best_for: 'devotion' },
    ],
  },
  {
    slug: 'dulya-maruti-pune', name: 'Dulya Maruti Temple', city: 'Pune',
    deity: 'Hanuman', type: 'Hanuman',
    description: "An old Hanuman (Maruti) temple in Pune's old-city peths, counted among the historic 'Maruti' shrines long regarded as guardian deities of the city. It is especially busy on Tuesdays and Saturdays and during Hanuman Jayanti.",
    timing: '5:30 AM – 10:00 PM', best_time: 'Hanuman Jayanti; Tuesdays & Saturdays',
    dress_code: 'Modest attire', festivals: 'Hanuman Jayanti',
    categories: ['Hanuman', 'Heritage'], lat: 18.5130, lng: 73.8590,
    how_to_reach: { air: 'Pune Airport ~9 km', rail: 'Pune Junction ~2 km', road: 'Ganesh Peth, old city', nearest: 'Pune Junction ~2 km' },
    facilities: { parking: 'On-street', footwear: 'Stand outside' },
    nearby_places: ['Dagdusheth Ganpati', 'Kasba Ganpati', 'Mandai'],
    poojas: [
      { name: 'Hanuman Chalisa Path', description: 'Recitation of the Hanuman Chalisa with sindoor offering.', best_for: 'courage & protection' },
    ],
  },
  {
    slug: 'red-jogeshwari-temple-pune', name: 'Shree Jogeshwari Temple (Red Jogeshwari)', city: 'Pune',
    deity: 'Durga', type: 'Shakti',
    description: 'A revered temple of Goddess Jogeshwari in Budhwar Peth, regarded as a gramadevata (presiding deity) of old Pune. The ancient idol and its daily worship make it an important Shakti shrine in the heart of the city, thronged during Navratri.',
    timing: '5:30 AM – 10:00 PM', best_time: 'Navratri; Fridays & Tuesdays',
    dress_code: 'Modest attire', festivals: 'Navratri, Dussehra',
    categories: ['Shakti', 'Heritage'], lat: 18.5175, lng: 73.8560,
    how_to_reach: { air: 'Pune Airport ~10 km', rail: 'Pune Junction ~2 km', road: 'Budhwar Peth, old city', nearest: 'Pune Junction ~2 km' },
    facilities: { parking: 'On-street', footwear: 'Stand outside', prasad: 'Prasad counter' },
    nearby_places: ['Dagdusheth Ganpati', 'Tulshibaug', 'Mandai'],
    poojas: [
      { name: 'Navratri Archana', description: 'Daily archana to the Goddess through the nine nights of Navratri.', is_famous: true, best_for: 'protection' },
    ],
  },
  {
    slug: 'morya-gosavi-mangalmurti-chinchwad', name: 'Shri Morya Gosavi Mangalmurti Temple, Chinchwad', city: 'Pune',
    deity: 'Ganesha', type: 'Ganesha',
    description: 'The principal Ganesha temple of Chinchwad, linked to the 17th-century saint Morya Gosavi, the foremost figure of the Ganapatya tradition. A key pilgrimage for Ganesh devotees, it holds large processions between Chinchwad and the Ashtavinayak shrine at Morgaon.',
    timing: '5:00 AM – 10:00 PM', best_time: 'Ganesh Chaturthi; Sankashti Chaturthi',
    dress_code: 'Modest attire', festivals: 'Ganesh Chaturthi, Sankashti Chaturthi, Morya Gosavi Punyatithi',
    categories: ['Ganesha', 'Heritage'], lat: 18.6298, lng: 73.7997, wiki: 'Morya_Gosavi',
    how_to_reach: { air: 'Pune Airport ~22 km', rail: 'Chinchwad ~2 km', road: 'Chinchwadgaon, PCMC', nearest: 'Chinchwad railway station' },
    facilities: { parking: 'Available', prasad: 'Modak prasad', footwear: 'Stand outside' },
    nearby_places: ['Theur Chintamani', 'Morgaon Mayureshwar', 'Akurdi'],
    poojas: [
      { name: 'Sankashti Abhishek', description: 'Abhishek of the Mangalmurti idol on Sankashti Chaturthi.', is_famous: true, best_for: 'removing obstacles' },
    ],
  },
  // ───────── MUMBAI ─────────
  {
    slug: 'mahalakshmi-temple-mumbai', name: 'Shree Mahalakshmi Temple, Mumbai', city: 'Mumbai',
    deity: 'Lakshmi', type: 'Shakti',
    description: "One of Mumbai's most visited temples, on Bhulabhai Desai Road at Cumballa Hill, built in 1831 by merchant Dhakji Dadaji. It enshrines the Tridevi — Mahakali, Mahalakshmi and Mahasaraswati — overlooking the Arabian Sea, and is thronged during Navratri and on Fridays.",
    timing: '6:00 AM – 10:00 PM', best_time: 'Navratri; Fridays; Diwali Lakshmi Puja',
    dress_code: 'Modest attire', festivals: 'Navratri, Diwali, Lakshmi Puja',
    categories: ['Shakti', 'Coastal'], lat: 18.9774, lng: 72.8065, wiki: 'Mahalakshmi_Temple,_Mumbai',
    how_to_reach: { air: 'CSMI Airport ~20 km', rail: 'Mahalaxmi station ~1.5 km', road: 'Bhulabhai Desai Road, Cumballa Hill', nearest: 'Mahalaxmi local station' },
    facilities: { darshan: 'Managed queue', parking: 'Limited', prasad: 'Flowers & prasad stalls', footwear: 'Stand outside' },
    nearby_places: ['Haji Ali Dargah', 'Babulnath Temple', 'Girgaum Chowpatty'],
    poojas: [
      { name: 'Lakshmi Archana', description: 'Archana to the three goddesses for prosperity and wellbeing.', is_famous: true, best_for: 'wealth' },
      { name: 'Navratri Chandi Path', description: 'Recitation of Devi Mahatmya through Navratri.', best_for: 'protection' },
    ],
  },
  {
    slug: 'mumbadevi-temple-mumbai', name: 'Mumbadevi Temple', city: 'Mumbai',
    deity: 'Durga', type: 'Shakti',
    description: 'The temple of Mumbadevi, the patron goddess of Mumbai after whom the city is named, in the Bhuleshwar – Zaveri Bazaar area. The present temple dates to the late 17th century and remains an active, crowded shrine at the historic heart of the city.',
    timing: '6:00 AM – 9:00 PM', best_time: 'Navratri; Tuesdays & Fridays',
    dress_code: 'Modest attire', festivals: 'Navratri, Mumbadevi Jatra',
    categories: ['Shakti', 'Heritage'], lat: 18.9479, lng: 72.8305, wiki: 'Mumba_Devi_Temple',
    how_to_reach: { air: 'CSMI Airport ~22 km', rail: 'Marine Lines / CSMT ~1.5 km', road: 'Bhuleshwar, near Zaveri Bazaar', nearest: 'Marine Lines station' },
    facilities: { darshan: 'Managed queue', parking: 'Very limited', prasad: 'Flower & prasad stalls', footwear: 'Stand outside' },
    nearby_places: ['Zaveri Bazaar', 'Crawford Market', 'CSMT'],
    poojas: [
      { name: 'Devi Archana', description: 'Archana offered to Mumbadevi for the family’s wellbeing.', is_famous: true, best_for: 'protection' },
    ],
  },
  {
    slug: 'babulnath-temple-mumbai', name: 'Babulnath Temple', city: 'Mumbai',
    deity: 'Shiva', type: 'Shiva',
    description: "One of Mumbai's oldest Shiva temples, set on a small hillock near Girgaum Chowpatty and Malabar Hill. Dedicated to Shiva as 'Lord of the Babul tree', it is reached by a short climb or a lift and is especially busy on Mondays and during Mahashivratri and Shravan.",
    timing: '5:00 AM – 11:00 PM', best_time: 'Mahashivratri; Shravan Mondays',
    dress_code: 'Modest attire', festivals: 'Mahashivratri, Shravan Somvar',
    categories: ['Shiva', 'Hilltop'], lat: 18.9585, lng: 72.8103, wiki: 'Babulnath',
    how_to_reach: { air: 'CSMI Airport ~22 km', rail: 'Charni Road station ~1 km', road: 'Babulnath Road, near Girgaum Chowpatty', nearest: 'Charni Road station' },
    facilities: { lift: 'Lift available for the climb', parking: 'Limited', prasad: 'Bel-patra & prasad', footwear: 'Stand outside' },
    nearby_places: ['Girgaum Chowpatty', 'Mahalakshmi Temple', 'Hanging Gardens'],
    poojas: [
      { name: 'Rudrabhishek', description: 'Abhishek of the Shivalinga with milk, water and bel leaves.', is_famous: true, best_for: 'health & peace' },
    ],
  },
  {
    slug: 'walkeshwar-banganga-mumbai', name: 'Walkeshwar Temple & Banganga Tank', city: 'Mumbai',
    deity: 'Shiva', type: 'Shiva',
    description: 'An ancient Shiva temple on Malabar Hill, first built around 1127 AD and rebuilt in 1715 after Portuguese destruction, beside the sacred Banganga Tank fed by an underground spring. The serene tank, ghats and cluster of shrines form one of the oldest sacred precincts in Mumbai.',
    timing: '6:00 AM – 9:00 PM', best_time: 'Mahashivratri; Banganga Festival (Jan)',
    dress_code: 'Modest attire', festivals: 'Mahashivratri, Banganga Festival',
    categories: ['Shiva', 'Coastal', 'Heritage'], lat: 18.9450, lng: 72.7939, wiki: 'Walkeshwar_Temple',
    how_to_reach: { air: 'CSMI Airport ~24 km', rail: 'Charni Road ~3 km', road: 'Walkeshwar, Malabar Hill', nearest: 'Charni Road station' },
    facilities: { tank: 'Historic Banganga Tank & ghats', parking: 'Limited', footwear: 'Stand outside' },
    nearby_places: ['Hanging Gardens', 'Girgaum Chowpatty', 'Babulnath Temple'],
    poojas: [
      { name: 'Shiva Abhishek', description: 'Abhishek of the Walkeshwar Shivalinga.', best_for: 'peace' },
    ],
  },
  {
    slug: 'iskcon-juhu-mumbai', name: 'ISKCON Sri Sri Radha Rasabihari Temple, Juhu', city: 'Mumbai',
    deity: 'Krishna', type: 'Vaishnava',
    description: 'The landmark ISKCON temple at Hare Krishna Land in Juhu, opened in 1978, enshrining Sri Sri Radha Rasabihari. A major centre of Krishna devotion in Mumbai, it is known for its marble halls, daily kirtans, Janmashtami celebrations and the Govinda’s restaurant.',
    timing: '4:30 AM – 1:00 PM, 4:00 PM – 9:00 PM', best_time: 'Janmashtami (Aug–Sep)',
    dress_code: 'Modest attire', festivals: 'Janmashtami, Radhashtami, Govardhan Puja',
    categories: ['Krishna'], lat: 19.1074, lng: 72.8266, wiki: 'ISKCON_Temple,_Mumbai',
    how_to_reach: { air: 'CSMI Airport ~5 km', rail: 'Vile Parle / Andheri ~3 km', road: 'Hare Krishna Land, Juhu', nearest: 'Vile Parle station' },
    facilities: { restaurant: "Govinda's vegetarian restaurant", parking: 'Available', prasad: 'Prasad counter', footwear: 'Cloakroom' },
    nearby_places: ['Juhu Beach', 'Prithvi Theatre', 'Vile Parle'],
    poojas: [
      { name: 'Sandhya Aarti', description: 'Evening kirtan and aarti before the deities of Radha-Rasabihari.', is_famous: true, best_for: 'devotion' },
    ],
  },
  {
    slug: 'shitaladevi-temple-mahim-mumbai', name: 'Shitaladevi Temple, Mahim', city: 'Mumbai',
    deity: 'Durga', type: 'Shakti',
    description: "A popular Goddess temple in Mahim dedicated to Shitaladevi, long revered by Mumbai's Koli and local communities as a protective mother-goddess. The temple is especially lively during Navratri and its annual fair.",
    timing: '5:30 AM – 10:00 PM', best_time: 'Navratri; Tuesdays & Fridays',
    dress_code: 'Modest attire', festivals: 'Navratri, Shitaladevi Jatra',
    categories: ['Shakti'], lat: 19.0419, lng: 72.8408,
    how_to_reach: { air: 'CSMI Airport ~10 km', rail: 'Mahim Junction ~1 km', road: 'Mahim, near Mahim Church', nearest: 'Mahim Junction station' },
    facilities: { parking: 'Limited', prasad: 'Prasad stalls', footwear: 'Stand outside' },
    nearby_places: ['Mahim Dargah', 'Mahim Beach', 'Shivaji Park'],
    poojas: [
      { name: 'Devi Archana', description: 'Archana offered to Shitaladevi for health and protection.', best_for: 'health' },
    ],
  },
  {
    slug: 'prabhadevi-temple-mumbai', name: 'Shree Prabhadevi Temple', city: 'Mumbai',
    deity: 'Durga', type: 'Shakti',
    description: 'The temple of Prabhavati Devi near Dadar, after which the Prabhadevi neighbourhood is named. Built in 1715, it enshrines a 12th-century idol of the Goddess and is an old, much-loved Shakti shrine between Dadar and Worli.',
    timing: '5:30 AM – 10:00 PM', best_time: 'Navratri; Fridays',
    dress_code: 'Modest attire', festivals: 'Navratri, Dussehra',
    categories: ['Shakti', 'Heritage'], lat: 19.0166, lng: 72.8295, wiki: 'Prabhadevi',
    how_to_reach: { air: 'CSMI Airport ~12 km', rail: 'Dadar / Lower Parel ~2 km', road: 'Prabhadevi, near Dadar', nearest: 'Dadar station' },
    facilities: { parking: 'Limited', prasad: 'Prasad stalls', footwear: 'Stand outside' },
    nearby_places: ['Siddhivinayak Temple', 'Dadar Chowpatty', 'Shivaji Park'],
    poojas: [
      { name: 'Devi Archana', description: 'Archana to Prabhavati Devi for the family’s wellbeing.', best_for: 'protection' },
    ],
  },
  {
    slug: 'jivdani-temple-virar', name: 'Shree Jivdani Mata Temple, Virar', city: 'Mumbai',
    deity: 'Durga', type: 'Shakti',
    description: 'A hilltop Goddess temple above Virar, dedicated to Jivdani Mata, reached by a climb of about 1,375 steps or a funicular. One of the most visited Devi shrines in the Mumbai region, it draws huge crowds during Navratri for its commanding views and powerful goddess.',
    timing: '5:00 AM – 9:00 PM', best_time: 'Navratri (Sep–Oct)',
    dress_code: 'Modest attire; comfortable shoes for the climb', festivals: 'Navratri, Dussehra',
    categories: ['Shakti', 'Hilltop'], lat: 19.4634, lng: 72.8130, wiki: 'Jivdani_Mata',
    how_to_reach: { air: 'CSMI Airport ~60 km', rail: 'Virar station ~4 km', road: 'Jivdani Hill, Virar East', nearest: 'Virar railway station' },
    facilities: { steps: '~1,375 steps', funicular: 'Funicular railway available', parking: 'At the base', prasad: 'Prasad stalls' },
    nearby_places: ['Virar', 'Arnala Fort & Beach', 'Vajreshwari'],
    poojas: [
      { name: 'Navratri Archana', description: 'Daily archana to Jivdani Mata through Navratri.', is_famous: true, best_for: 'strength & protection' },
    ],
  },
]

// ── Live Wikipedia image resolution (runs on Vercel at apply-time) ───────────
const FALLBACK: Record<string, string> = {
  ganesha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Dagdusheth_Halwai_Ganapati_Temple_Pune.jpg/800px-Dagdusheth_Halwai_Ganapati_Temple_Pune.jpg',
  shiva: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kashi_Vishwanath_Temple.jpg/800px-Kashi_Vishwanath_Temple.jpg',
  vishnu: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Ranganathaswamy-Temple-Srirangam-2015-11-14.jpg/800px-Ranganathaswamy-Temple-Srirangam-2015-11-14.jpg',
  krishna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Vrindavan_ISKCON_temple.jpg/800px-Vrindavan_ISKCON_temple.jpg',
  shakti: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Durga_Temple%2C_Varanasi.jpg/800px-Durga_Temple%2C_Varanasi.jpg',
  hanuman: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sankat_Mochan_Hanuman_temple_Varanasi.jpg/800px-Sankat_Mochan_Hanuman_temple_Varanasi.jpg',
}

function fallbackFor(deity: string): string {
  const d = (deity || '').toLowerCase()
  if (d.includes('ganesh')) return FALLBACK.ganesha
  if (d.includes('hanuman') || d.includes('maruti')) return FALLBACK.hanuman
  if (d.includes('krishna')) return FALLBACK.krishna
  if (d.includes('vishnu') || d.includes('rama')) return FALLBACK.vishnu
  if (d.includes('lakshmi') || d.includes('durga') || d.includes('devi') || d.includes('shakti')) return FALLBACK.shakti
  return FALLBACK.shiva
}

async function resolveImage(t: NewTemple): Promise<string> {
  if (t.wiki) {
    try {
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 8000)
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(t.wiki)}`, {
        headers: { 'User-Agent': 'DivyaDarshanam/1.0 (https://divyadarshanam.in; contact@divyadarshanam.in)' },
        signal: ctrl.signal,
      })
      clearTimeout(timer)
      if (res.ok) {
        const json: any = await res.json()
        const src: string | undefined = json?.thumbnail?.source || json?.originalimage?.source
        if (src) return src.replace(/\/\d+px-/, '/800px-')
      }
    } catch { /* fall through to fallback */ }
  }
  return fallbackFor(t.deity)
}

// ── Duplicate detection ──────────────────────────────────────────────────────
function normName(s: string): string {
  return String(s || '').toLowerCase()
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(temple|mandir|caves|cave|shri|shree|shreemant|shrimant)\b/g, ' ')
    .replace(/\s+/g, ' ').trim()
}

const COARSE_CITY = new Set(['', 'india', 'maharashtra', 'n/a', 'none', '-'])

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const apply = url.searchParams.get('apply') === '1'
  const token = url.searchParams.get('token') || ''
  const doImages = url.searchParams.get('images') !== '0'
  const doCities = url.searchParams.get('fixcities') !== '0'
  const doDedupe = url.searchParams.get('dedupe') === '1'
  const authed = token === TOKEN

  const log: string[] = []
  const section = (title: string) => log.push(`\n<h2>${esc(title)}</h2>`)
  const line = (s: string) => log.push(`<div class="row">${s}</div>`)

  try {
    await connectDB()
    const all = await Temple.find({}).select('slug name city state deity lat lng image_url poojas description').lean() as any[]
    const bySlug = new Map(all.map(t => [t.slug, t]))

    // 1) NEW TEMPLES ----------------------------------------------------------
    section(`1. Add missing marquee temples (${NEW_TEMPLES.length} prepared)`)
    const toInsert = NEW_TEMPLES.filter(t => !bySlug.has(t.slug))
    const already = NEW_TEMPLES.filter(t => bySlug.has(t.slug))
    for (const t of toInsert) line(`<span class="add">NEW</span> ${esc(t.name)} <span class="sub">${esc(t.city)} · ${esc(t.deity)} · ${t.wiki ? 'Wikipedia image' : 'deity image'}</span>`)
    for (const t of already) line(`<span class="skip">EXISTS</span> ${esc(t.name)} <span class="sub">slug already present — will skip</span>`)

    // 2) CITY LABEL FIXES -----------------------------------------------------
    section('2. Fix coarse city labels (within 40 km of Pune/Mumbai centre)')
    const cityFixes: { slug: string; name: string; from: string; to: string }[] = []
    for (const t of all) {
      const cur = String(t.city || '').toLowerCase().trim()
      if (!COARSE_CITY.has(cur)) continue
      if (typeof t.lat !== 'number' || typeof t.lng !== 'number') continue
      const dP = haversineKm(PUNE.lat, PUNE.lng, t.lat, t.lng)
      const dM = haversineKm(MUMBAI.lat, MUMBAI.lng, t.lat, t.lng)
      let to = ''
      if (dP <= 40 && dP <= dM) to = 'Pune'
      else if (dM <= 40) to = 'Mumbai'
      if (to) cityFixes.push({ slug: t.slug, name: t.name, from: t.city || '(blank)', to })
    }
    if (!cityFixes.length) line('<span class="ok">None found — all nearby temples already have a proper city.</span>')
    for (const f of cityFixes) line(`<span class="fix">FIX</span> ${esc(f.name)} <span class="sub">${esc(f.from)} → <b>${esc(f.to)}</b></span>`)

    // 3) DUPLICATE REPORT -----------------------------------------------------
    section('3. Possible duplicate records')
    const groups = new Map<string, any[]>()
    for (const t of all) {
      const k = normName(t.name)
      if (!k) continue
      if (!groups.has(k)) groups.set(k, [])
      groups.get(k)!.push(t)
    }
    const dups = [...groups.values()].filter(g => g.length > 1)
    const completeness = (t: any) => (t.description && String(t.description).length >= 80 ? 1 : 0) + (t.image_url ? 1 : 0) + (Array.isArray(t.poojas) && t.poojas.length ? 1 : 0) + (typeof t.lat === 'number' ? 1 : 0)
    const toDelete: string[] = []
    if (!dups.length) line('<span class="ok">No duplicate names detected.</span>')
    for (const g of dups) {
      const ranked = [...g].sort((a, b) => completeness(b) - completeness(a))
      const keep = ranked[0]
      line(`<b>${esc(keep.name)}</b> — ${g.length} records:`)
      ranked.forEach((t, i) => {
        const tag = i === 0 ? '<span class="ok">KEEP</span>' : '<span class="del">REMOVE</span>'
        if (i > 0) toDelete.push(t.slug)
        line(`&nbsp;&nbsp;${tag} <span class="sub">${esc(t.slug)} · ${esc(t.city)} · score ${completeness(t)}/4</span>`)
      })
    }

    // ── APPLY ────────────────────────────────────────────────────────────────
    let applied = { inserted: 0, citiesFixed: 0, deleted: 0 }
    if (apply) {
      if (!authed) {
        section('APPLY BLOCKED')
        line('<span class="del">A valid &token= is required to apply changes. Nothing was modified.</span>')
      } else {
        // insert new temples with resolved images
        for (const t of toInsert) {
          const image_url = doImages ? await resolveImage(t) : fallbackFor(t.deity)
          await Temple.create({ ...COMMON, ...t, image_url, live_url: '' })
          applied.inserted++
        }
        // city fixes
        if (doCities) {
          for (const f of cityFixes) {
            await Temple.updateOne({ slug: f.slug }, { $set: { city: f.to, state: 'Maharashtra' } })
            applied.citiesFixed++
          }
        }
        // dedupe (opt-in)
        if (doDedupe) {
          for (const slug of toDelete) {
            await Temple.deleteOne({ slug })
            applied.deleted++
          }
        }
        section('APPLIED')
        line(`<span class="ok">Inserted ${applied.inserted} temples · fixed ${applied.citiesFixed} city labels · removed ${applied.deleted} duplicates.</span>`)
        if (!doDedupe && toDelete.length) line(`<span class="sub">Duplicates were reported but NOT removed. Re-run with &dedupe=1 to remove them.</span>`)
      }
    }

    const mode = apply ? (authed ? 'APPLIED CHANGES' : 'APPLY BLOCKED (no token)') : 'DRY RUN (preview only — nothing changed)'
    const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Temple seed & fix — ${esc(mode)}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:900px;margin:0 auto;padding:24px;color:#1a1a1a}
  h1{font-size:21px;margin:0 0 4px} h2{font-size:16px;margin:22px 0 8px;border-bottom:1px solid #eadfce;padding-bottom:4px}
  .mode{display:inline-block;padding:4px 10px;border-radius:6px;font-size:13px;font-weight:700;margin-bottom:14px}
  .dry{background:#fff7ed;color:#b45309;border:1px solid #fed7aa}
  .live{background:#dcfce7;color:#15803d;border:1px solid #86efac}
  .row{font-size:13px;padding:3px 0;line-height:1.5} .sub{color:#888;font-size:12px}
  .add{background:#dcfce7;color:#15803d;font-weight:700;font-size:11px;padding:1px 6px;border-radius:4px}
  .skip{background:#f1f5f9;color:#64748b;font-weight:700;font-size:11px;padding:1px 6px;border-radius:4px}
  .fix{background:#dbeafe;color:#1d4ed8;font-weight:700;font-size:11px;padding:1px 6px;border-radius:4px}
  .del{background:#fee2e2;color:#b91c1c;font-weight:700;font-size:11px;padding:1px 6px;border-radius:4px}
  .ok{color:#15803d;font-weight:600} .note{color:#777;font-size:12px;margin-top:22px;line-height:1.6;border-top:1px solid #eadfce;padding-top:12px}
  code{background:#f5f0e8;padding:1px 5px;border-radius:4px;font-size:12px}
</style></head><body>
<h1>Temple Seed &amp; Fix</h1>
<div class="mode ${apply && authed ? 'live' : 'dry'}">${esc(mode)}</div>
${log.join('\n')}
<p class="note">
This preview is safe to open — it changes nothing by itself.<br>
• <b>Preview everything:</b> open this page as-is.<br>
• <b>Add temples + fix city labels:</b> add <code>?apply=1&amp;token=…</code> to the URL.<br>
• <b>Also remove duplicates:</b> add <code>&amp;dedupe=1</code> as well.<br>
Inserts skip any temple whose slug already exists, so re-running is safe. Total temples in directory: ${all.length}.
</p>
</body></html>`
    return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } })
  } catch (e: any) {
    return new Response(`Seed failed: ${esc(e?.message || 'unknown error')}`, { status: 500, headers: { 'content-type': 'text/plain' } })
  }
}
