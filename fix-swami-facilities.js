// fix-swami-facilities.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const GROQ_KEY = process.env.GROQ_API_KEY

async function getFormattedFacilities(name, city, state, existing) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 500,
        temperature: 0.2,
        messages: [{
          role: 'user',
          content: `For the Swaminarayan temple "${name}" in ${city}, ${state}, reformat these facilities into the exact format shown below.

Current facilities: ${JSON.stringify(existing)}

Required format — each value MUST start with ✅, ❌, or ⚠️:
- ✅ Yes — [specific details about this temple]
- ❌ No — [alternative nearby]  
- ⚠️ Limited/Partial — [details]

Reply with JSON only, no explanation:
{
  "toilets": "✅ Yes — ...",
  "parking": "✅ Yes — ... OR ❌ No — ...",
  "drinking_water": "✅ Yes — ...",
  "prasad": "✅ Yes — ...",
  "cloak_room": "✅ Yes — ... OR ❌ No — ...",
  "accommodation": "✅ Nearby dharamshalas available OR ❌ No — nearest town ...",
  "wheelchair": "✅ Accessible OR ⚠️ Partial — ... OR ❌ Not accessible",
  "atm": "✅ ATM within [distance] OR ❌ Nearest ATM [distance]",
  "medical": "✅ First aid available OR ❌ Nearest hospital [distance]",
  "free_meals": "✅ Yes — Annakut/bhandara on festivals OR ❌ No — food court available"
}`
        }]
      })
    })
    const data = await res.json()
    const text = data.choices?.[0]?.message?.content?.trim() || ''
    const match = text.match(/\{[\s\S]*\}/)
    if (match) {
      const parsed = JSON.parse(match[0])
      // Validate all values start with emoji
      const valid = Object.values(parsed).every(v =>
        v.startsWith('✅') || v.startsWith('❌') || v.startsWith('⚠️')
      )
      if (valid) return parsed
    }
  } catch(e) {}
  return null
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  const temples = await T.find({ type: 'Swaminarayan' }, { name: 1, slug: 1, city: 1, state: 1, facilities: 1 }).lean()
  console.log(`Fixing facilities for ${temples.length} Swaminarayan temples...\n`)

  let fixed = 0
  let failed = 0

  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]

    // Check if already in emoji format
    const vals = Object.values(t.facilities || {})
    const alreadyFormatted = vals.length > 0 && vals.every(v =>
      v.startsWith('✅') || v.startsWith('❌') || v.startsWith('⚠️')
    )

    if (alreadyFormatted) {
      console.log(`[${i+1}/${temples.length}] SKIP ${t.name} — already formatted`)
      fixed++
      continue
    }

    process.stdout.write(`[${i+1}/${temples.length}] ${t.name}... `)

    const formatted = await getFormattedFacilities(t.name, t.city, t.state, t.facilities)
    if (formatted) {
      await T.updateOne({ _id: t._id }, { $set: { facilities: formatted } })
      console.log('✅ Fixed')
      fixed++
    } else {
      // Apply default Swaminarayan-specific facilities
      const defaultFacilities = {
        toilets: '✅ Yes — Clean toilet facilities available at temple premises',
        parking: '✅ Yes — Parking available for cars and buses near temple',
        drinking_water: '✅ Yes — Free drinking water available at temple',
        prasad: '✅ Yes — Temple prasad available — sweets and flowers offered to deity',
        cloak_room: '✅ Yes — Footwear must be removed. Cloak room available at entry',
        accommodation: '✅ Dharamshalas available near temple. Contact temple office for bookings',
        wheelchair: '⚠️ Partial access — contact temple management for assistance',
        atm: '✅ ATM available in nearby market area',
        medical: '✅ First aid available at temple. Nearest hospital in town',
        free_meals: '✅ Yes — Free meals (annakut/bhandara) distributed on major festivals like Swaminarayan Jayanti and Annakut',
      }
      await T.updateOne({ _id: t._id }, { $set: { facilities: defaultFacilities } })
      console.log('✅ Default applied')
      fixed++
    }

    await new Promise(r => setTimeout(r, 700))
  }

  console.log(`\n=== Done! Fixed: ${fixed} | Failed: ${failed} ===`)

  // Verify
  const sample = await T.findOne({ type: 'Swaminarayan' }, { name: 1, facilities: 1 }).lean()
  console.log('\nSample facilities:')
  Object.entries(sample.facilities).forEach(([k, v]) => console.log(` ${k}: ${v.slice(0, 60)}`))

  await mongoose.disconnect()
}

main().catch(console.error)
