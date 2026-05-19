const fs = require('fs'), path = require('path'), { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const clientPath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')

let src = fs.readFileSync(clientPath, 'utf8')
const lines = src.split('\n')

// Print lines 75-135 so we can see exactly what's there
console.log('=== Lines 75-135 ===')
lines.slice(74, 135).forEach((l, i) => console.log(`${75+i}| ${l}`))

// ── Find start of the FIRST fetchNearby ──
const fnStart = lines.findIndex(l => l.includes('async function fetchNearby('))
console.log('\nfetchNearby starts at line:', fnStart + 1)

// ── Find the line BEFORE useEffect (that's where the function must end) ──
// useEffect is always right after fetchNearby in this file
const useEffectLine = lines.findIndex((l, i) => i > fnStart && l.trim().startsWith('useEffect('))
console.log('useEffect at line:', useEffectLine + 1)
console.log('Will replace lines', fnStart+1, 'to', useEffectLine, '(exclusive)')

// ── Build clean replacement ──
const newFn = [
  '  async function fetchNearby(lat: number, lon: number, radius: number) {',
  '    setLocLoading(true)',
  '    setLocationError(\'\')',
  '    setNearbyTemples([])',
  '    try {',
  '      const res = await fetch(`/api/nearby?lat=${lat}&lon=${lon}&radius=${radius}`)',
  '      const data = await res.json()',
  '      if (data.places && data.places.length > 0) {',
  '        setNearbyTemples(data.places)',
  '      } else {',
  '        try {',
  '          const fb = await fetch(`/api/temples?nearby=1&lat=${lat}&lon=${lon}&radius=${radius}`)',
  '          const fd = await fb.json()',
  '          const dbT = fd.temples || fd.data || []',
  '          if (dbT.length > 0) {',
  '            setNearbyTemples(dbT)',
  '          } else {',
  "            setLocationError('No sacred places found nearby. Try a larger radius.')",
  '          }',
  '        } catch {',
  "          setLocationError('No sacred places found nearby. Try a larger radius.')",
  '        }',
  '      }',
  '    } catch (err: any) {',
  "      setLocationError('Could not fetch nearby temples. Please check your connection.')",
  '    } finally {',
  '      setLocLoading(false)',
  '    }',
  '  }',
  '',
]

// ── Splice: keep everything before fnStart, insert new fn, keep from useEffectLine ──
const result = [
  ...lines.slice(0, fnStart),
  ...newFn,
  ...lines.slice(useEffectLine),
]

fs.writeFileSync(clientPath, result.join('\n'), 'utf8')
console.log('\n✅ ExploreClient.tsx rewritten cleanly')

// ── Write api/nearby/route.ts using string concat (no template literals) ──
const routeDir = path.join(P, 'app', 'api', 'nearby')
fs.mkdirSync(routeDir, { recursive: true })

const route = [
  "import { NextRequest, NextResponse } from 'next/server'",
  '',
  'const ENDPOINTS = [',
  "  'https://overpass-api.de/api/interpreter',",
  "  'https://overpass.kumi.systems/api/interpreter',",
  "  'https://overpass.openstreetmap.ru/api/interpreter',",
  ']',
  '',
  'function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {',
  '  const R = 6371',
  '  const dLat = (lat2 - lat1) * Math.PI / 180',
  '  const dLon = (lon2 - lon1) * Math.PI / 180',
  '  const a = Math.sin(dLat/2)**2 +',
  '    Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2',
  '  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 10) / 10',
  '}',
  '',
  'export async function GET(req: NextRequest) {',
  '  const { searchParams } = new URL(req.url)',
  "  const lat    = parseFloat(searchParams.get('lat')    || '0')",
  "  const lon    = parseFloat(searchParams.get('lon')    || '0')",
  "  const km     = parseInt(searchParams.get('radius')   || '10')",
  '  const radius = km * 1000',
  '',
  '  if (!lat || !lon) {',
  "    return NextResponse.json({ places: [], error: 'Missing coordinates' }, { status: 400 })",
  '  }',
  '',
  '  const q = [out:json][timeout:20];(',
  '    + node["amenity"="place_of_worship"](around: + radius + , + lat + , + lon + );',
  '    + way["amenity"="place_of_worship"](around: + radius + , + lat + , + lon + );',
  '    + node["historic"="temple"](around: + radius + , + lat + , + lon + );',
  '    + way["historic"="temple"](around: + radius + , + lat + , + lon + );',
  '    + node["building"="temple"](around: + radius + , + lat + , + lon + );',
  '    + way["building"="temple"](around: + radius + , + lat + , + lon + );',
  '  );out center 40;',
].join('\n')

// Write route using a different approach - write raw JS then transpile
const routeContent = `import { NextRequest, NextResponse } from 'next/server'

const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
]

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat    = parseFloat(searchParams.get('lat')    || '0')
  const lon    = parseFloat(searchParams.get('lon')    || '0')
  const km     = parseInt(searchParams.get('radius')   || '10')
  const radius = km * 1000

  if (!lat || !lon) {
    return NextResponse.json({ places: [], error: 'Missing coordinates' }, { status: 400 })
  }

  const around = 'around:' + radius + ',' + lat + ',' + lon
  const query = '[out:json][timeout:20];('
    + 'node["amenity"="place_of_worship"](' + around + ');'
    + 'way["amenity"="place_of_worship"](' + around + ');'
    + 'node["historic"="temple"](' + around + ');'
    + 'way["historic"="temple"](' + around + ');'
    + 'node["building"="temple"](' + around + ');'
    + 'way["building"="temple"](' + around + ');'
    + ');out center 40;'

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

      const places = elements.map((el: any) => {
        const tags = el.tags || {}
        const clat = el.type === 'way' ? el.center?.lat : el.lat
        const clon = el.type === 'way' ? el.center?.lon : el.lon
        if (!clat || !clon) return null
        const name = tags.name || tags['name:en'] || tags['name:hi'] || ''
        if (!name) return null
        const rel = (tags.religion || '').toLowerCase()
        let type = 'Temple'
        if (rel === 'hindu')    type = 'Hindu Temple'
        if (rel === 'jain')     type = 'Jain Temple'
        if (rel === 'sikh')     type = 'Gurudwara'
        if (rel === 'buddhist') type = 'Buddhist Temple'
        return {
          _id: String(el.id), name, type,
          state: tags['addr:state'] || '',
          city: tags['addr:city'] || tags['addr:suburb'] || '',
          lat: clat, lon: clon,
          distance: haversine(lat, lon, clat, clon),
          isOverpass: true,
          googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=' + clat + ',' + clon,
        }
      }).filter(Boolean).sort((a: any, b: any) => a.distance - b.distance).slice(0, 30)

      return NextResponse.json({ places, source: 'overpass' })
    } catch (_) {
      continue
    }
  }

  return NextResponse.json({ places: [], source: 'none' })
}
`

fs.writeFileSync(path.join(routeDir, 'route.ts'), routeContent, 'utf8')
console.log('✅ api/nearby/route.ts written')

// git
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: nearby - definitive fetchNearby rewrite by useEffect boundary"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\n✅ Pushed!')
