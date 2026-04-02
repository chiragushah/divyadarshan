/**
 * Run with:  npx ts-node scripts/seed-poojas.ts
 * Or:        npx tsx scripts/seed-poojas.ts
 */

import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI!

// ── Pooja data by deity ───────────────────────────────────────────────────
const POOJA_BY_DEITY: Record<string, any[]> = {
  shiva: [
    {
      name: 'Rudrabhishek',
      description: 'Sacred abhishek of the Shivalinga with panchamrit — milk, curd, honey, ghee and water — while chanting Rudra mantras. The most powerful Shiva ritual.',
      price: '₹1,100 – ₹5,100',
      duration: '1 hour',
      is_famous: true,
      best_for: 'Health, removing obstacles, moksha',
    },
    {
      name: 'Maha Mrityunjaya Jaap',
      description: 'Chanting of the Maha Mrityunjaya mantra 108 or 1008 times for protection from illness and untimely death.',
      price: '₹501 – ₹2,100',
      duration: '45 minutes',
      is_famous: false,
      best_for: 'Health, protection, long life',
    },
    {
      name: 'Bilva Archana',
      description: 'Offering of sacred bilva (bel) leaves to Shivalinga — each leaf representing Brahma, Vishnu and Mahesh. Especially powerful on Mondays.',
      price: '₹101 – ₹501',
      duration: '30 minutes',
      is_famous: false,
      best_for: 'Blessings, spiritual growth',
    },
  ],
  vishnu: [
    {
      name: 'Sahasranamarchana',
      description: 'Recitation of the 1000 names of Lord Vishnu with flower offerings. One of the most auspicious Vaishnava rituals.',
      price: '₹501 – ₹2,100',
      duration: '1 hour',
      is_famous: true,
      best_for: 'Wealth, prosperity, peace',
    },
    {
      name: 'Ekadashi Pooja',
      description: 'Special pooja performed on Ekadashi tithi dedicated to Vishnu. Fasting and special abhishek with tulsi.',
      price: '₹251 – ₹1,100',
      duration: '45 minutes',
      is_famous: false,
      best_for: 'Spiritual merit, liberation',
    },
    {
      name: 'Tulsi Archana',
      description: 'Offering of 108 tulsi leaves to Lord Vishnu — the most beloved offering to Vishnu.',
      price: '₹101 – ₹301',
      duration: '20 minutes',
      is_famous: false,
      best_for: 'Devotion and blessings',
    },
  ],
  krishna: [
    {
      name: 'Panchamrit Abhishek',
      description: 'Bathing the deity with five sacred substances — milk, curd, honey, ghee and sugar — amidst Vedic chanting and bhajans.',
      price: '₹501 – ₹3,100',
      duration: '1 hour',
      is_famous: true,
      best_for: 'Love, devotion, blessings',
    },
    {
      name: 'Janmashtami Pooja',
      description: 'Special midnight pooja on Krishna\'s birthday. Highly auspicious throughout the year as a special pooja.',
      price: '₹251 – ₹1,100',
      duration: '1 hour',
      is_famous: false,
      best_for: 'Devotion, joy, children\'s wellbeing',
    },
    {
      name: 'Madhura Bhog Seva',
      description: 'Offering of 56 food items (Chhappan Bhog) or a smaller sweet offering to Lord Krishna.',
      price: '₹301 – ₹2,100',
      duration: '30 minutes',
      is_famous: false,
      best_for: 'Gratitude, abundance',
    },
  ],
  durga: [
    {
      name: 'Durga Saptashati Path',
      description: 'Recitation of the 700 verses of Durga Saptashati (Devi Mahatmya) — the most powerful Shakti ritual for protection and blessings.',
      price: '₹1,100 – ₹5,100',
      duration: '3 hours',
      is_famous: true,
      best_for: 'Protection, strength, removing negative energy',
    },
    {
      name: 'Kumkumarchana',
      description: 'Offering of kumkum (vermilion) to the Goddess with each of her 108 names. Very powerful for women\'s wellbeing.',
      price: '₹251 – ₹1,100',
      duration: '45 minutes',
      is_famous: false,
      best_for: 'Marriage, women\'s health, fertility',
    },
    {
      name: 'Navratri Vishesh Pooja',
      description: 'Nine-day special pooja during Navratri. Can be performed as a single-day symbolic ritual.',
      price: '₹501 – ₹2,100',
      duration: '1 hour',
      is_famous: false,
      best_for: 'All-round blessings, victory',
    },
  ],
  ganesha: [
    {
      name: 'Modak Naivedyam',
      description: 'Offering of 21 modaks (sweet dumplings) — Ganesha\'s favourite. Done before any new beginning or important endeavour.',
      price: '₹251 – ₹1,100',
      duration: '30 minutes',
      is_famous: true,
      best_for: 'New beginnings, success in ventures, obstacle removal',
    },
    {
      name: 'Ganapati Atharvashirsha Path',
      description: 'Recitation of the sacred Ganapati Atharvashirsha — the Upanishad dedicated to Ganesha.',
      price: '₹501 – ₹1,500',
      duration: '45 minutes',
      is_famous: false,
      best_for: 'Intelligence, education, career',
    },
    {
      name: 'Durva Archana',
      description: 'Offering of 21 or 108 durva grass blades — the most beloved offering to Ganesha.',
      price: '₹101 – ₹301',
      duration: '20 minutes',
      is_famous: false,
      best_for: 'General blessings and wellbeing',
    },
  ],
  rama: [
    {
      name: 'Ramayan Path',
      description: 'Complete or Sundarkanda recitation of the Ramcharitmanas. Brings peace, removes hardship and bestows Rama\'s blessings.',
      price: '₹1,100 – ₹5,100',
      duration: '3 hours',
      is_famous: true,
      best_for: 'Peace, family harmony, protection',
    },
    {
      name: 'Ram Naam Jaap',
      description: 'Chanting of Sri Ram Jai Ram Jai Jai Ram 108, 1008 or 10008 times.',
      price: '₹251 – ₹1,100',
      duration: '1 hour',
      is_famous: false,
      best_for: 'Mental peace, spiritual growth',
    },
  ],
  hanuman: [
    {
      name: 'Hanuman Chalisa Path',
      description: 'Recitation of Hanuman Chalisa 11 or 108 times with sindoor and jasmine oil offering. Most powerful on Tuesdays and Saturdays.',
      price: '₹101 – ₹501',
      duration: '45 minutes',
      is_famous: true,
      best_for: 'Courage, protection, removing fear',
    },
    {
      name: 'Sundarkand Path',
      description: 'Reading of the Sundarkand chapter from Ramayan — a complete prayer to Hanuman.',
      price: '₹501 – ₹2,100',
      duration: '2 hours',
      is_famous: false,
      best_for: 'Overcoming difficulties, family protection',
    },
  ],
  murugan: [
    {
      name: 'Kavadi Pooja',
      description: 'Sacred offering ritual involving carrying a kavadi (decorative arch) as a form of devotion to Lord Murugan.',
      price: '₹501 – ₹2,100',
      duration: '1 hour',
      is_famous: true,
      best_for: 'Vow fulfilment, blessings, healing',
    },
    {
      name: 'Vel Pooja',
      description: 'Worship of Lord Murugan\'s divine weapon, the Vel — symbolising the destruction of ego and ignorance.',
      price: '₹251 – ₹1,100',
      duration: '30 minutes',
      is_famous: false,
      best_for: 'Victory, knowledge, spiritual progress',
    },
  ],
  lakshmi: [
    {
      name: 'Sri Sukta Path',
      description: 'Recitation of the Sri Sukta hymns from the Rigveda with lotus and golden flower offerings to Goddess Lakshmi.',
      price: '₹501 – ₹2,100',
      duration: '1 hour',
      is_famous: true,
      best_for: 'Wealth, business success, abundance',
    },
    {
      name: 'Vaibhav Lakshmi Vrat Pooja',
      description: 'Friday vrat pooja for Goddess Lakshmi with yellow flowers, turmeric and sweet offerings.',
      price: '₹251 – ₹1,100',
      duration: '45 minutes',
      is_famous: false,
      best_for: 'Financial stability, household prosperity',
    },
  ],
  default: [
    {
      name: 'Abhishek Pooja',
      description: 'Sacred bathing ritual of the deity with panchamrit and water while chanting Vedic hymns.',
      price: '₹501 – ₹2,100',
      duration: '45 minutes',
      is_famous: true,
      best_for: 'General blessings and wellbeing',
    },
    {
      name: 'Archana',
      description: 'Offering of flowers with recitation of the deity\'s 108 names.',
      price: '₹51 – ₹251',
      duration: '20 minutes',
      is_famous: false,
      best_for: 'Devotion and daily blessings',
    },
    {
      name: 'Deepa Pooja',
      description: 'Lighting of oil or ghee lamps before the deity with prayers — the most universal form of temple worship.',
      price: '₹51 – ₹501',
      duration: '15 minutes',
      is_famous: false,
      best_for: 'Illumination, removing darkness',
    },
  ],
}

function getPoojas(deity: string): any[] {
  const d = (deity || '').toLowerCase()
  if (d.includes('shiva') || d.includes('shankar') || d.includes('mahadev') || d.includes('jyotirlinga')) return POOJA_BY_DEITY.shiva
  if (d.includes('vishnu') || d.includes('venkat') || d.includes('balaji') || d.includes('narayan') || d.includes('vithoba')) return POOJA_BY_DEITY.vishnu
  if (d.includes('krishna') || d.includes('jagannath') || d.includes('vithal')) return POOJA_BY_DEITY.krishna
  if (d.includes('durga') || d.includes('kali') || d.includes('shakti') || d.includes('devi') || d.includes('amba') || d.includes('chamunda')) return POOJA_BY_DEITY.durga
  if (d.includes('ganesha') || d.includes('ganesh') || d.includes('vinayak') || d.includes('ganapati')) return POOJA_BY_DEITY.ganesha
  if (d.includes('hanuman')) return POOJA_BY_DEITY.hanuman
  if (d.includes('rama') || d.includes('ram')) return POOJA_BY_DEITY.rama
  if (d.includes('murugan') || d.includes('subramanya') || d.includes('kartikey')) return POOJA_BY_DEITY.murugan
  if (d.includes('lakshmi')) return POOJA_BY_DEITY.lakshmi
  return POOJA_BY_DEITY.default
}

async function main() {
  console.log('🔌 Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connected\n')

  const db = mongoose.connection.db!
  const temples = await db.collection('temples').find({}).toArray()
  console.log(`📋 Found ${temples.length} temples\n`)

  let updated = 0
  for (const temple of temples) {
    const poojas = getPoojas(temple.deity || '')
    await db.collection('temples').updateOne(
      { _id: temple._id },
      { $set: { poojas } }
    )
    updated++
    if (updated % 50 === 0) console.log(`   ✓ Updated ${updated}/${temples.length}...`)
  }

  console.log(`\n✅ Done! Added pooja data to ${updated} temples.`)
  console.log('🛕 Poojas are now visible on all temple detail pages.')
  await mongoose.disconnect()
}

main().catch(err => {
  console.error('❌ Error:', err.message)
  process.exit(1)
})
