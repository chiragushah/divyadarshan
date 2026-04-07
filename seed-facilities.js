// seed-facilities.js
// Enriches 68 temples missing facilities and how_to_reach using Groq AI
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const GROQ_KEY = process.env.GROQ_API_KEY

async function getFacilities(name, city, state, deity) {
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GROQ_KEY },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1200,
        temperature: 0.3,
        messages: [{
          role: 'user',
          content: `For the temple "${name}" in ${city}, ${state} (deity: ${deity || 'Hindu deity'}), provide realistic facilities and travel information.

Reply with JSON only in this exact format:
{
  "facilities": {
    "toilets": "✅ Yes — [details] OR ❌ No — [alternative]",
    "parking": "✅ Yes — [details] OR ❌ Limited — [details]",
    "drinking_water": "✅ Yes — [details] OR ❌ No — [alternative]",
    "prasad": "✅ Yes — [details] OR ❌ No",
    "cloak_room": "✅ Yes — [details] OR ❌ No",
    "accommodation": "✅ [nearby options] OR ❌ No — [nearest town]",
    "wheelchair": "✅ Accessible OR ⚠️ Partial — [details] OR ❌ Not accessible — [reason]",
    "atm": "✅ Yes — [details] OR ❌ Nearest ATM [distance]",
    "medical": "✅ Yes — [details] OR ❌ Nearest [hospital/clinic] [distance]",
    "free_meals": "✅ Yes — [details] OR ❌ No — [nearest food option]"
  },
  "how_to_reach": {
    "by_air": "✈️ [nearest airport, distance, transport options, approximate cost]",
    "by_train": "🚆 [nearest railway station, distance, trains from major cities]",
    "by_bus": "🚌 [bus connectivity, MSRTC/KSRTC/UPSRTC etc, journey time from nearest city]",
    "by_taxi": "🚕 [taxi/auto availability, approximate cost from nearest station]",
    "local_tips": "💡 [best time to visit, parking tips, special access info]"
  }
}`
        }]
      })
    })
    const data = await res.json()
    const text = data.choices?.[0]?.message?.content?.trim() || ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0])
      if (parsed.facilities && parsed.how_to_reach) return parsed
    }
  } catch(e) {
    console.error('  Error:', e.message)
  }
  return null
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  // Get temples missing facilities
  const temples = await T.find({
    $or: [{ facilities: { $exists: false } }, { facilities: {} }]
  }, { name: 1, city: 1, state: 1, deity: 1, slug: 1 }).lean()

  console.log('Temples to enrich:', temples.length)
  console.log('Estimated time:', Math.ceil(temples.length * 0.8), 'seconds\n')

  let updated = 0
  let failed = 0

  for (let i = 0; i < temples.length; i++) {
    const t = temples[i]
    process.stdout.write('[' + (i+1) + '/' + temples.length + '] ' + t.name + '... ')

    const data = await getFacilities(t.name, t.city || '', t.state || '', t.deity || '')

    if (data) {
      await T.updateOne({ _id: t._id }, {
        $set: {
          facilities:   data.facilities,
          how_to_reach: data.how_to_reach,
        }
      })
      console.log('OK')
      updated++
    } else {
      // Set sensible defaults
      await T.updateOne({ _id: t._id }, {
        $set: {
          facilities: {
            toilets:       '⚠️ Basic facilities available at temple premises',
            parking:       '✅ Parking available nearby',
            drinking_water:'✅ Drinking water available at temple',
            prasad:        '✅ Prasad available at temple',
            cloak_room:    '⚠️ Check with temple management',
            accommodation: '✅ Accommodation available in nearby town',
            wheelchair:    '⚠️ Partial accessibility — contact temple for details',
            atm:           '✅ ATM available in nearby market',
            medical:       '✅ Medical facilities in nearby town',
            free_meals:    '❌ No free meals — food available nearby',
          },
          how_to_reach: {
            by_air:    '✈️ Check nearest airport to ' + (t.city || t.state),
            by_train:  '🚆 Nearest railway station to ' + (t.city || t.state),
            by_bus:    '🚌 State transport buses available to ' + (t.city || t.state),
            by_taxi:   '🚕 Taxis and autos available from nearest town',
            local_tips:'💡 Visit during morning or evening darshan hours for best experience',
          }
        }
      })
      console.log('DEFAULT')
      failed++
      updated++
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 700))
  }

  // Also enrich missing how_to_reach separately
  const noHowToReach = await T.find({
    $or: [{ how_to_reach: { $exists: false } }, { how_to_reach: {} }]
  }, { name: 1, city: 1, state: 1, deity: 1 }).lean()

  if (noHowToReach.length > 0) {
    console.log('\nAlso enriching', noHowToReach.length, 'temples missing how_to_reach...')
    for (let i = 0; i < noHowToReach.length; i++) {
      const t = noHowToReach[i]
      process.stdout.write('[' + (i+1) + '/' + noHowToReach.length + '] ' + t.name + '... ')
      const data = await getFacilities(t.name, t.city || '', t.state || '', t.deity || '')
      if (data) {
        await T.updateOne({ _id: t._id }, { $set: { how_to_reach: data.how_to_reach } })
        console.log('OK')
      } else {
        console.log('SKIP')
      }
      await new Promise(r => setTimeout(r, 700))
    }
  }

  // Final summary
  console.log('\n=== Final Summary ===')
  const total        = await T.countDocuments()
  const hasFacilities = await T.countDocuments({ facilities: { $exists: true, $ne: {} } })
  const hasHowToReach = await T.countDocuments({ how_to_reach: { $exists: true, $ne: {} } })
  const hasWheelchair = await T.countDocuments({ 'facilities.wheelchair': { $exists: true } })

  console.log('Total temples:     ', total)
  console.log('Has facilities:    ', hasFacilities, '/', total)
  console.log('Has how_to_reach:  ', hasHowToReach, '/', total)
  console.log('Has wheelchair info:', hasWheelchair, '/', total)
  console.log('\nUpdated:', updated, '| Used defaults:', failed)

  await mongoose.disconnect()
  console.log('Done!')
}

main().catch(console.error)
