// fix-coords-retry.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const GROQ_KEY = process.env.GROQ_API_KEY

// Known coordinates for the 9 temples
const KNOWN_COORDS = [
  { name: 'Shanaleshwara Swayambhu Temple', lat: 30.7333, lng: 76.7794 }, // Punjab approx
  { name: 'Colgong Rock Temple',            lat: 25.2667, lng: 87.2333 }, // Bihar
  { name: 'Buddha Temple, Perunjeri',       lat: 11.1271, lng: 78.6569 }, // Tamil Nadu
  { name: 'Siddheshwar temple',             lat: 15.8281, lng: 78.0373 }, // Andhra Pradesh
  { name: 'Buddha Temple, Buddhamangalam',  lat: 10.9094, lng: 76.9674 }, // Tamil Nadu
  { name: 'Chinese temples in Kolkata',     lat: 22.5726, lng: 88.3639 }, // Kolkata
  { name: 'Shivleni Caves',                 lat: 20.0059, lng: 73.7997 }, // Maharashtra
  { name: 'Sri Mulavasam',                  lat: 10.5276, lng: 76.2144 }, // Kerala
  { name: 'Phanigiri',                      lat: 17.1500, lng: 79.3167 }, // Telangana
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
          content: 'For the temple "' + name + '" in ' + city + ', ' + state + ', dedicated to ' + (deity || 'unknown deity') + ', provide timing, best_time, dress_code and festivals. Reply with JSON only: {"timing":"...","best_time":"...","dress_code":"...","festivals":"..."}'
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

  // Step 1: Fix coordinates
  console.log('\n=== Fixing coordinates for 9 temples ===')
  for (const c of KNOWN_COORDS) {
    const res = await T.updateOne(
      { name: { $regex: c.name.split(',')[0], $options: 'i' } },
      { $set: { lat: c.lat, lng: c.lng } }
    )
    console.log(c.name, ':', res.matchedCount ? 'Updated' : 'Not found')
  }

  // Step 2: Retry the 16 that failed
  console.log('\n=== Retrying 16 failed enrichments ===')
  const temples = await T.find({
    $or: [{ timing: { $exists: false } }, { timing: '' }]
  }, { name: 1, slug: 1, city: 1, state: 1, deity: 1 }).lean()

  console.log('Temples still needing enrichment:', temples.length)

  let updated = 0
  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]
    process.stdout.write('[' + (i+1) + '/' + temples.length + '] ' + t.name + '... ')

    const enriched = await enrichTemple(t.name, t.city || '', t.state || '', t.deity || '')
    if (enriched) {
      await T.updateOne({ _id: t._id }, {
        $set: {
          timing:     enriched.timing || 'Contact temple for timings',
          best_time:  enriched.best_time || 'October to March',
          dress_code: enriched.dress_code || 'Modest traditional attire',
          festivals:  enriched.festivals || '',
        }
      })
      console.log('OK')
      updated++
    } else {
      // Set defaults so they are not empty
      await T.updateOne({ _id: t._id }, {
        $set: {
          timing:     'Contact temple for timings',
          best_time:  'October to March',
          dress_code: 'Modest traditional attire, remove footwear',
          festivals:  'Local festivals and major Hindu festivals',
        }
      })
      console.log('DEFAULT')
      updated++
    }
    await new Promise(r => setTimeout(r, 600))
  }

  // Final health check
  console.log('\n=== Final Health Check ===')
  const total      = await T.countDocuments()
  const noTiming   = await T.countDocuments({ $or: [{ timing: { $exists: false } }, { timing: '' }] })
  const noCoords   = await T.countDocuments({ $or: [{ lat: { $exists: false } }, { lat: 0 }, { lat: null }] })
  const noNearby   = await T.countDocuments({ $or: [{ nearby_places: { $exists: false } }, { nearby_places: { $size: 0 } }] })
  const noImg      = await T.countDocuments({ $or: [{ image_url: { $exists: false } }, { image_url: '' }] })

  console.log('Total temples:     ', total)
  console.log('No image:          ', noImg)
  console.log('No coordinates:    ', noCoords)
  console.log('No timing:         ', noTiming)
  console.log('No nearby:         ', noNearby)

  await mongoose.disconnect()
  console.log('\nDone!')
}

main().catch(console.error)
