import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI!

const TYPE_MAP: Record<string,string> = {
  ghat:'heritage',river:'nature',lake:'nature',beach:'nature',forest:'nature',
  hill:'nature',garden:'nature',park:'nature',university:'heritage',museum:'heritage',
  fort:'heritage',palace:'heritage',cave:'heritage',monument:'heritage',city:'heritage',
  market:'market',bazaar:'market',restaurant:'food',dhaba:'food',
  ashram:'ashram',temple:'temple',shrine:'temple',stupa:'heritage',pilgrimage:'heritage',
}
function normalizeType(raw: string): string {
  const lower = (raw||'').toLowerCase()
  for (const [k,v] of Object.entries(TYPE_MAP)) if (lower.includes(k)) return v
  return 'heritage'
}

async function getPlaces(name: string, city: string, state: string): Promise<any[]|null> {
  const key = process.env.GROQ_API_KEY!
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 800,
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [{
        role: 'user',
        content: `Return a JSON object with key "places" containing array of 5 real places near ${name} in ${city}, ${state}, India. Each place: name, type, distance (e.g. "2 km"), description (1 sentence).`
      }],
    }),
  })
  const data = await res.json()
  const content = data.choices?.[0]?.message?.content
  if (!content) return null
  const obj = JSON.parse(content)
  // Get the array — could be under any key
  const arr = obj.places || obj.locations || obj.results || Object.values(obj).find(v => Array.isArray(v))
  if (!Array.isArray(arr) || arr.length === 0) return null
  return arr.map((p: any) => ({
    name:        String(p.name||'').trim(),
    type:        normalizeType(String(p.type||'')),
    distance:    String(p.distance||'').trim(),
    description: String(p.description||'').trim(),
  })).filter((p:any) => p.name)
}

async function main() {
  console.log('🔌 Connecting...')
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db!
  const all = await db.collection('temples').find({}).toArray()
  const force = process.argv.includes('--force')

  const temples = force ? all : all.filter((t:any) => {
    const np = t.nearby_places
    if (!np || np.length === 0) return true
    if (typeof np[0] === 'string') return true
    if (!np[0].distance) return true
    return false
  })

  console.log(`📋 Total: ${all.length} | To process: ${temples.length}\n`)

  let ok = 0, fail = 0
  for (const t of temples) {
    try {
      const places = await getPlaces(t.name, t.city, t.state)
      if (places && places.length > 0) {
        await db.collection('temples').updateOne({ _id: t._id }, { $set: { nearby_places: places } })
        ok++
        console.log(`✓ ${t.name} (${places.length})`)
      } else {
        fail++
        console.log(`⚠ ${t.name}`)
      }
    } catch(e:any) {
      fail++
      console.log(`✗ ${t.name}: ${e.message}`)
    }
    await new Promise(r => setTimeout(r, 300))
  }

  console.log(`\n✅ Done! Updated: ${ok} | Failed: ${fail}`)
  await mongoose.disconnect()
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
