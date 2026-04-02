require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const GROQ_KEY = process.env.GROQ_API_KEY

async function getPlaces(name, city, state) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GROQ_KEY },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 800,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [{
        role: 'user',
        content: 'Return a JSON object with key "places" containing array of 5 real places near ' + name + ' in ' + city + ', ' + state + ', India. Each place needs: name, type, distance (like "2 km"), description (1 sentence).'
      }],
    }),
  })
  const data = await res.json()
  if (data.error) { console.log('  ERR:', data.error.message); return null }
  const content = data.choices?.[0]?.message?.content
  if (!content) return null
  const obj = JSON.parse(content)
  const arr = obj.places || obj.locations || obj.results || Object.values(obj).find(v => Array.isArray(v))
  if (!Array.isArray(arr) || arr.length === 0) return null
  return arr.map(p => ({
    name: String(p.name||'').trim(),
    type: String(p.type||'heritage').toLowerCase(),
    distance: String(p.distance||'').trim(),
    description: String(p.description||'').trim(),
  })).filter(p => p.name)
}

async function main() {
  console.log('GROQ KEY:', GROQ_KEY ? GROQ_KEY.slice(0,8) + '... (' + GROQ_KEY.length + ' chars)' : 'MISSING!')
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db
  const all = await db.collection('temples').find({}).toArray()
  const force = process.argv.includes('--force')
  const temples = force ? all : all.filter(t => {
    const np = t.nearby_places
    if (!np || np.length === 0) return true
    if (typeof np[0] === 'string') return true
    if (!np[0].distance) return true
    return false
  })
  console.log('Total: ' + all.length + ' | To process: ' + temples.length)
  let ok = 0, fail = 0
  for (const t of temples) {
    try {
      const places = await getPlaces(t.name, t.city, t.state)
      if (places && places.length > 0) {
        await db.collection('temples').updateOne({ _id: t._id }, { $set: { nearby_places: places } })
        ok++
        console.log('OK ' + t.name)
      } else {
        fail++
        console.log('SKIP ' + t.name)
      }
    } catch(e) {
      fail++
      console.log('ERR ' + t.name + ': ' + e.message)
    }
    await new Promise(r => setTimeout(r, 400))
  }
  console.log('Done! Updated: ' + ok + ' | Failed: ' + fail)
  await mongoose.disconnect()
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1) })
