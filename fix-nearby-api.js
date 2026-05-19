const fs = require('fs'), path = require('path')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// ── Fix /api/nearby/route.ts ─────────────────────────────────
// Multiple Overpass mirrors + better Indian temple query + timeout
const nearbyRoute = `import { NextRequest, NextResponse } from 'next/server'

// Multiple Overpass endpoints — tried in order until one works
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat    = parseFloat(searchParams.get('lat')    || '0')
  const lon    = parseFloat(searchParams.get('lon')    || '0')
  const radius = parseInt(searchParams.get('radius')   || '10') * 1000 // km → metres

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat/lon' }, { status: 400 })
  }

  // Comprehensive Overpass query for Indian sacred places
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

  // Try each Overpass endpoint until one succeeds
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 18000) // 18s timeout

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: \`data=\${encodeURIComponent(query)}\`,
        signal: controller.signal,
      })
      clearTimeout(timeout)

      if (!res.ok) continue

      const data = await res.json()
      const elements: any[] = data.elements || []

      // Transform Overpass results into our temple card format
      const places = elements
        .filter((el: any) => {
          const tags = el.tags || {}
          // Filter to relevant sacred places
          const religion = tags.religion || ''
          const amenity  = tags.amenity  || ''
          const historic = tags.historic || ''
          const building = tags.building || ''
          if (amenity === 'place_of_worship') return true
          if (historic === 'temple') return true
          if (building === 'temple') return true
          return false
        })
        .map((el: any) => {
          const tags = el.tags || {}
          const clat = el.type === 'way' ? el.center?.lat : el.lat
          const clon = el.type === 'way' ? el.center?.lon : el.lon

          // Determine type for badge coloring
          const religion = (tags.religion || '').toLowerCase()
          let type = 'Temple'
          if (religion === 'hindu')  type = 'Hindu Temple'
          if (religion === 'jain')   type = 'Jain Temple'
          if (religion === 'sikh')   type = 'Gurudwara'
          if (religion === 'buddhist') type = 'Buddhist Temple'
          if (religion === 'christian') type = 'Church'
          if (religion === 'muslim')  type = 'Mosque'

          const name = tags.name || tags['name:en'] || tags['name:hi'] || 'Sacred Place'
          const dist = clat && clon ? haversine(lat, lon, clat, clon) : null

          return {
            _id:      el.id?.toString(),
            name,
            type,
            state:    tags['addr:state'] || tags['addr:city'] || '',
            city:     tags['addr:city']  || tags['addr:suburb'] || '',
            slug:     null, // Overpass results don't have slugs
            lat:      clat,
            lon:      clon,
            distance: dist,
            isOverpass: true,
            googleMapsUrl: clat && clon
              ? \`https://www.google.com/maps/dir/?api=1&destination=\${clat},\${clon}\`
              : null,
          }
        })
        .filter((p: any) => p.lat && p.lon && p.name !== 'Sacred Place')
        .sort((a: any, b: any) => (a.distance || 999) - (b.distance || 999))
        .slice(0, 30)

      return NextResponse.json({ places, source: 'overpass', endpoint })

    } catch (err: any) {
      // This endpoint failed — try next one
      console.warn(\`Overpass endpoint failed: \${endpoint}\`, err.message)
      continue
    }
  }

  // All endpoints failed
  return NextResponse.json(
    { places: [], source: 'none', error: 'All Overpass endpoints unavailable' },
    { status: 200 } // Return 200 so client can show graceful fallback
  )
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 +
            Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) *
            Math.sin(dLon/2)**2
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) * 10) / 10
}
`

// ── Fix ExploreClient fetchNearby to handle the new response ─
const clientPath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')
let client = fs.readFileSync(clientPath, 'utf8')

// Replace the fetchNearby function
const oldFetch = /async function fetchNearby[\s\S]*?^\s*\}/m
const newFetch = `async function fetchNearby(lat: number, lon: number, radius: number) {
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

client = client.replace(oldFetch, newFetch)
fs.writeFileSync(clientPath, client, 'utf8')
console.log('✅ ExploreClient.tsx updated')

// Write the API route
const routeDir = path.join(P, 'app/api/nearby')
fs.mkdirSync(routeDir, { recursive: true })
fs.writeFileSync(path.join(routeDir, 'route.ts'), nearbyRoute, 'utf8')
console.log('✅ app/api/nearby/route.ts written')

// Commit & push
const { execSync } = require('child_process')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: Nearby API - 4 Overpass mirrors + comprehensive temple query + timeout"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\n✅ Deployed! Vercel building in ~2 mins.')
