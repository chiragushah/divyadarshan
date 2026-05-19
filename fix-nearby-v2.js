const fs = require('fs'), path = require('path')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const clientPath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')

let client = fs.readFileSync(clientPath, 'utf8')

// ── Find the exact start and end of fetchNearby ──────────────
const fnStart = client.indexOf('async function fetchNearby(')
if (fnStart === -1) { console.error('fetchNearby not found'); process.exit(1) }

// Count braces to find the function end
let depth = 0, i = fnStart, fnEnd = -1
while (i < client.length) {
  if (client[i] === '{') depth++
  else if (client[i] === '}') {
    depth--
    if (depth === 0) { fnEnd = i + 1; break }
  }
  i++
}
if (fnEnd === -1) { console.error('Could not find end of fetchNearby'); process.exit(1) }

console.log('Found fetchNearby: chars', fnStart, 'to', fnEnd)
console.log('Current function:\n', client.slice(fnStart, fnEnd))

// ── Replace with clean working version ───────────────────────
const newFn = `async function fetchNearby(lat: number, lon: number, radius: number) {
    setLocLoading(true)
    setLocationError('')
    setNearbyTemples([])
    try {
      const res = await fetch(\`/api/nearby?lat=\${lat}&lon=\${lon}&radius=\${radius}\`)
      const data = await res.json()

      if (data.places && data.places.length > 0) {
        setNearbyTemples(data.places)
      } else {
        // Overpass returned nothing — try DB fallback
        try {
          const fb = await fetch(\`/api/temples?nearby=1&lat=\${lat}&lon=\${lon}&radius=\${radius}\`)
          const fd = await fb.json()
          const dbTemples = fd.temples || fd.data || []
          if (dbTemples.length > 0) {
            setNearbyTemples(dbTemples)
          } else {
            setLocationError('No sacred places found nearby. Try a larger radius.')
          }
        } catch {
          setLocationError('No sacred places found nearby. Try a larger radius.')
        }
      }
    } catch (err: any) {
      console.error('fetchNearby error:', err)
      setLocationError('Could not fetch nearby temples. Please check your connection.')
    } finally {
      setLocLoading(false)
    }
  }`

client = client.slice(0, fnStart) + newFn + client.slice(fnEnd)
fs.writeFileSync(clientPath, client, 'utf8')
console.log('\n✅ fetchNearby replaced cleanly')

// ── Write /api/nearby/route.ts ────────────────────────────────
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
]

const routeContent = `import { NextRequest, NextResponse } from 'next/server'

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
]

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLon/2)**2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 10) / 10
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat    = parseFloat(searchParams.get('lat')    || '0')
  const lon    = parseFloat(searchParams.get('lon')    || '0')
  const radius = parseInt(searchParams.get('radius')   || '10') * 1000

  if (!lat || !lon) {
    return NextResponse.json({ places: [], error: 'Missing coordinates' }, { status: 400 })
  }

  const query = \`[out:json][timeout:20];
(
  node["amenity"="place_of_worship"](around:\${radius},\${lat},\${lon});
  way["amenity"="place_of_worship"](around:\${radius},\${lat},\${lon});
  node["historic"="temple"](around:\${radius},\${lat},\${lon});
  way["historic"="temple"](around:\${radius},\${lat},\${lon});
  node["building"="temple"](around:\${radius},\${lat},\${lon});
  way["building"="temple"](around:\${radius},\${lat},\${lon});
);
out center 40;\`

  for (const endpoint of ENDPOINTS) {
    try {
      const controller = new AbortController()
      const tid = setTimeout(() => controller.abort(), 18000)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query),
        signal: controller.signal,
      })
      clearTimeout(tid)
      if (!res.ok) continue

      const json = await res.json()
      const elements: any[] = json.elements || []

      const places = elements
        .map((el: any) => {
          const tags = el.tags || {}
          const clat = el.type === 'way' ? el.center?.lat : el.lat
          const clon = el.type === 'way' ? el.center?.lon : el.lon
          if (!clat || !clon) return null
          const name = tags.name || tags['name:en'] || tags['name:hi'] || ''
          if (!name) return null
          const religion = (tags.religion || '').toLowerCase()
          let type = 'Temple'
          if (religion === 'hindu')    type = 'Hindu Temple'
          if (religion === 'jain')     type = 'Jain Temple'
          if (religion === 'sikh')     type = 'Gurudwara'
          if (religion === 'buddhist') type = 'Buddhist Temple'
          return {
            _id: String(el.id),
            name,
            type,
            state: tags['addr:state'] || '',
            city:  tags['addr:city']  || tags['addr:suburb'] || '',
            lat: clat, lon: clon,
            distance: haversine(lat, lon, clat, clon),
            isOverpass: true,
            googleMapsUrl: \`https://www.google.com/maps/dir/?api=1&destination=\${clat},\${clon}\`,
          }
        })
        .filter(Boolean)
        .sort((a: any, b: any) => a.distance - b.distance)
        .slice(0, 30)

      return NextResponse.json({ places, source: 'overpass' })
    } catch (_) {
      continue
    }
  }

  return NextResponse.json({ places: [], source: 'none' })
}
`

const routeDir = path.join(P, 'app/api/nearby')
fs.mkdirSync(routeDir, { recursive: true })
fs.writeFileSync(path.join(routeDir, 'route.ts'), routeContent, 'utf8')
console.log('✅ app/api/nearby/route.ts written')

const { execSync } = require('child_process')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: nearby - clean fetchNearby + 4 Overpass mirrors"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\n✅ Pushed! Vercel deploying in ~2 mins.')
