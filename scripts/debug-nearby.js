// Run: node scripts/seed-nearby.js --force
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const GROQ_KEY = process.env.GROQ_API_KEY

async function getPlaces(name, city, state) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_KEY}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 800,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [{
        role: 'user',
        content: `Return a JSON object with key "places" containing array of 5 real places near ${name} in ${city}, ${state}, India. Each place needs: name, type, distance (like "2 km"), description (1 sentence).`
      }],
    }),
  })
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) {
    console.log('  RAW API RESPONSE:', JSON.stringify(data).slice(0, 300))
    return null
  }
  const obj = JSON.parse(content)
  const arr = obj.places || obj.locations || obj.results || Object.values(obj).find(v => Array.isArray(v))
  if (!Array.isArray(arr) || arr.length === 0) {
    console.log('  PARSED OBJ KEYS:', Object.keys(obj))
    return null
  }
  return arr.map(p => ({
    name: String(p.name||'').trim(),
    type: String(p.type||'heritage').toLowerCase(),
    distance: String(p.distance||'').trim(),
    description: String(p.description||'').trim(),
  })).filter(p => p.name)
}

async function main() {
  console.log('GROQ KEY:', GROQ_KEY ? `${GROQ_KEY.slice(0,8)}... (${GROQ_KEY.length} chars)` : 'MISSING!')
  console.log('MONGODB:', MONGODB_URI ? 'Found' : 'MISSING!')

  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db
  const all = await db.collection('temples').find({}).toArray()
  console.log(`Found ${all.length} temples`)

  // Just test first 3 temples
  const temples = all.slice(0, 3)
  console.log('Testing first 3 temples:\n')

  for (const t of temples) {
    console.log(`\n--- ${t.name} (${t.city}, ${t.state}) ---`)
    try {
      const places = await getPlaces(t.name, t.city, t.state)
      if (places) {
        console.log(`SUCCESS: ${places.length} places found`)
        console.log(JSON.stringify(places[0]))
      } else {
        console.log('FAILED: returned null')
      }
    } catch(e) {
      console.log('ERROR:', e.message)
      console.log('STACK:', e.stack?.slice(0, 200))
    }
    await new Promise(r => setTimeout(r, 500))
  }

  await mongoose.disconnect()
}

main().catch(e => { console.error('FATAL:', e.message, e.stack); process.exit(1) })
