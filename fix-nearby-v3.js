const fs = require('fs'), path = require('path')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const clientPath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')

let src = fs.readFileSync(clientPath, 'utf8')
const lines = src.split('\n')

console.log('Lines 105-120:')
lines.slice(104, 120).forEach((l, i) => console.log(`${105+i}: ${l}`))

// ── Strategy: find fetchNearby start line, find the REAL end ──
// The real end is found by looking for the pattern that ends the function
// AND removes the orphaned Promise-chain tail

let inFn = false, braceDepth = 0, fnStartLine = -1, fnEndLine = -1

for (let li = 0; li < lines.length; li++) {
  const line = lines[li]

  if (!inFn && line.includes('async function fetchNearby(')) {
    inFn = true
    fnStartLine = li
    braceDepth = 0
  }

  if (inFn) {
    // Count braces — but skip template literal expressions ${...}
    let inStr = false, inTpl = false, tplDepth = 0
    for (let ci = 0; ci < line.length; ci++) {
      const ch = line[ci]
      const prev = ci > 0 ? line[ci-1] : ''

      if (ch === '`' && !inStr) { inTpl = !inTpl; continue }
      if (inTpl && ch === '$' && line[ci+1] === '{') { tplDepth++; ci++; continue }
      if (inTpl && tplDepth > 0 && ch === '}') { tplDepth--; continue }
      if (inTpl && tplDepth > 0) continue

      if (ch === '"' || ch === "'") { inStr = !inStr; continue }
      if (inStr) continue

      if (ch === '{') braceDepth++
      if (ch === '}') {
        braceDepth--
        if (braceDepth === 0) {
          fnEndLine = li
          inFn = false
          break
        }
      }
    }
    if (!inFn) break
  }
}

console.log(`\nfetchNearby: line ${fnStartLine+1} to ${fnEndLine+1}`)
console.log('Lines around end:')
lines.slice(Math.max(0, fnEndLine-2), fnEndLine+8).forEach((l, i) =>
  console.log(`${fnEndLine-1+i}: ${l}`)
)

// ── Now check for orphaned tail after fnEndLine ───────────────
// Look for the orphaned pattern: })  .filter(Boolean) .sort(  setNearbyTemples
let orphanEnd = fnEndLine + 1
const orphanPatterns = ['filter(Boolean)', 'filter(Boolean', '.sort(', 'setNearbyTemples(results)']

// Skip blank lines then check for orphan
let scanLine = fnEndLine + 1
while (scanLine < lines.length && scanLine < fnEndLine + 10) {
  const trimmed = lines[scanLine].trim()
  const isOrphan = orphanPatterns.some(p => trimmed.includes(p)) ||
                   trimmed === '})' || trimmed === '}),' ||
                   trimmed.startsWith('.filter') ||
                   trimmed.startsWith('.sort') ||
                   trimmed.includes('setNearbyTemples(results)')
  if (isOrphan) {
    orphanEnd = scanLine + 1
    console.log(`Orphan line ${scanLine+1}: ${trimmed}`)
    scanLine++
  } else if (trimmed === '' || trimmed === '}' || trimmed === '},') {
    // Could be the closing brace of the OUTER function containing fetchNearby
    // Only skip if we haven't found the function end
    break
  } else {
    break
  }
}

console.log(`\nReplacing lines ${fnStartLine+1}–${orphanEnd} with new fetchNearby`)

// ── Build replacement ─────────────────────────────────────────
const newFn = `  async function fetchNearby(lat: number, lon: number, radius: number) {
    setLocLoading(true)
    setLocationError('')
    setNearbyTemples([])
    try {
      const res = await fetch(\`/api/nearby?lat=\${lat}&lon=\${lon}&radius=\${radius}\`)
      const data = await res.json()
      if (data.places && data.places.length > 0) {
        setNearbyTemples(data.places)
      } else {
        try {
          const fb = await fetch(\`/api/temples?nearby=1&lat=\${lat}&lon=\${lon}&radius=\${radius}\`)
          const fd = await fb.json()
          const dbT = fd.temples || fd.data || []
          if (dbT.length > 0) {
            setNearbyTemples(dbT)
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

const newLines = [
  ...lines.slice(0, fnStartLine),
  ...newFn.split('\n'),
  ...lines.slice(orphanEnd)
]

fs.writeFileSync(clientPath, newLines.join('\n'), 'utf8')
console.log('\n✅ ExploreClient.tsx patched')

// ── Write /api/nearby/route.ts ────────────────────────────────
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
    Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2
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

  const query = '[out:json][timeout:20];(' +
    'node["amenity"="place_of_worship"](around:' + radius + ',' + lat + ',' + lon + ');' +
    'way["amenity"="place_of_worship"](around:' + radius + ',' + lat + ',' + lon + ');' +
    'node["historic"="temple"](around:' + radius + ',' + lat + ',' + lon + ');' +
    'way["historic"="temple"](around:' + radius + ',' + lat + ',' + lon + ');' +
    'node["building"="temple"](around:' + radius + ',' + lat + ',' + lon + ');' +
    'way["building"="temple"](around:' + radius + ',' + lat + ',' + lon + ');' +
    ');out center 40;'

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
          city:  tags['addr:city']  || tags['addr:suburb'] || '',
          lat: clat, lon: clon,
          distance: haversine(lat, lon, clat, clon),
          isOverpass: true,
          googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=' + clat + ',' + clon,
        }
      }).filter(Boolean).sort((a: any, b: any) => a.distance - b.distance).slice(0, 30)

      return NextResponse.json({ places, source: 'overpass' })
    } catch (_) { continue }
  }

  return NextResponse.json({ places: [], source: 'none' })
}
`

const routeDir = path.join(P, 'app', 'api', 'nearby')
fs.mkdirSync(routeDir, { recursive: true })
fs.writeFileSync(path.join(routeDir, 'route.ts'), routeContent, 'utf8')
console.log('✅ api/nearby/route.ts written')

const { execSync } = require('child_process')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: nearby - surgical orphan removal + 4 Overpass mirrors"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\n✅ Pushed! Vercel deploying in ~2 mins.')
