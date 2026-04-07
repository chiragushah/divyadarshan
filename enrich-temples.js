// enrich-temples.js
// Fixes 62 temples missing timing/best_time/dress_code/festivals using Groq AI
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const GROQ_KEY = process.env.GROQ_API_KEY
const BAD_SLUGS = [
  'list-of-shiva-temples-in-india',
  'list-of-buddhist-temples-in-india',
  'gundupillar',
  'mgaikhvana',
  'trilinga-kshetras',
  'ngagyur-nyingma-nunnery',
  'ngagyur-nyingma-nunnery-institute',
  'menjor-multipurpose-research-centre-and-unity-park',
]

async function enrichTemple(name, city, state, deity) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 400,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: `For the Hindu temple "${name}" in ${city}, ${state}, dedicated to ${deity || 'unknown deity'}, provide:
1. timing: Opening hours (e.g. "6:00 AM - 12:00 PM, 4:00 PM - 9:00 PM")
2. best_time: Best months to visit (e.g. "October to March")
3. dress_code: Dress requirements (e.g. "Traditional attire, remove footwear")
4. festivals: Major festivals celebrated (e.g. "Navratri, Diwali, Mahashivratri")

Reply with JSON only, no explanation:
{"timing":"...","best_time":"...","dress_code":"...","festivals":"..."}`
        }]
      })
    })
    const data = await res.json()
    const text = data.choices?.[0]?.message?.content?.trim() || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) return JSON.parse(jsonMatch[0])
  } catch(e) {}
  return null
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  // Step 1: Remove bad records
  console.log('\n=== Step 1: Removing bad temple records ===')
  for (const slug of BAD_SLUGS) {
    const temple = await T.findOne({ slug })
    if (temple) {
      await T.deleteOne({ slug })
      console.log('DELETED:', temple.name)
    }
  }

  // Step 2: Enrich temples missing timing/best_time/dress_code/festivals
  console.log('\n=== Step 2: Enriching 62 temples with missing data ===')
  const temples = await T.find({
    $or: [{ timing: { $exists: false } }, { timing: '' }]
  }, { name: 1, slug: 1, city: 1, state: 1, deity: 1 }).lean()

  console.log('Found', temples.length, 'temples to enrich')

  let updated = 0
  let failed = 0

  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]
    process.stdout.write(`[${i+1}/${temples.length}] ${t.name}... `)

    const enriched = await enrichTemple(t.name, t.city, t.state, t.deity)
    if (enriched) {
      await T.updateOne({ _id: t._id }, {
        $set: {
          timing:     enriched.timing || '',
          best_time:  enriched.best_time || '',
          dress_code: enriched.dress_code || '',
          festivals:  enriched.festivals || '',
        }
      })
      console.log('OK')
      updated++
    } else {
      console.log('SKIP')
      failed++
    }

    // Rate limit — wait 500ms between calls
    await new Promise(r => setTimeout(r, 500))
  }

  console.log('\n=== Done! ===')
  console.log('Updated:', updated)
  console.log('Failed:', failed)

  // Step 3: Check remaining missing coordinates
  const missingCoords = await T.find({
    $or: [{ lat: { $exists: false } }, { lat: 0 }, { lat: null }]
  }, { name: 1, city: 1, state: 1 }).lean()

  console.log('\n=== Temples still missing coordinates:', missingCoords.length, '===')
  missingCoords.forEach(t => console.log(' -', t.name, '|', t.city, t.state))

  await mongoose.disconnect()
}

main().catch(console.error)
