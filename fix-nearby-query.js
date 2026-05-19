const fs = require('fs'), path = require('path'), { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

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

function buildQuery(radius: number, lat: number, lon: number) {
  const ar = 'around:' + radius + ',' + lat + ',' + lon
  // Comprehensive Indian sacred place tags used on OpenStreetMap
  return '[out:json][timeout:25];('
    // Standard place of worship — Hindu, Jain, Sikh, Buddhist
    + 'node["amenity"="place_of_worship"](' + ar + ');'
    + 'way["amenity"="place_of_worship"](' + ar + ');'
    // Temple by religion
    + 'node["amenity"="place_of_worship"]["religion"="hindu"](' + ar + ');'
    + 'way["amenity"="place_of_worship"]["religion"="hindu"](' + ar + ');'
    + 'node["amenity"="place_of_worship"]["religion"="jain"](' + ar + ');'
    + 'way["amenity"="place_of_worship"]["religion"="jain"](' + ar + ');'
    + 'node["amenity"="place_of_worship"]["religion"="sikh"](' + ar + ');'
    + 'way["amenity"="place_of_worship"]["religion"="sikh"](' + ar + ');'
    + 'node["amenity"="place_of_worship"]["religion"="buddhist"](' + ar + ');'
    + 'way["amenity"="place_of_worship"]["religion"="buddhist"](' + ar + ');'
    // Historic temple tag
    + 'node["historic"="temple"](' + ar + ');'
    + 'way["historic"="temple"](' + ar + ');'
    // Building tagged as temple
    + 'node["building"="temple"](' + ar + ');'
    + 'way["building"="temple"](' + ar + ');'
    // Indian-specific tags
    + 'node["amenity"="temple"](' + ar + ');'
    + 'way["amenity"="temple"](' + ar + ');'
    + 'node["building"="mandir"](' + ar + ');'
    + 'way["building"="mandir"](' + ar + ');'
    + 'node["amenity"="mandir"](' + ar + ');'
    + 'way["amenity"="mandir"](' + ar + ');'
    + 'node["building"="shrine"](' + ar + ');'
    + 'way["building"="shrine"](' + ar + ');'
    + 'node["historic"="shrine"](' + ar + ');'
    + 'way["historic"="shrine"](' + ar + ');'
    // Gurudwara
    + 'node["amenity"="place_of_worship"]["denomination"="sikh"](' + ar + ');'
    + 'way["amenity"="place_of_worship"]["denomination"="sikh"](' + ar + ');'
    + ');out center 150;'   // Increased from 40 to 150 results
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

  const query = buildQuery(radius, lat, lon)

  for (const endpoint of ENDPOINTS) {
    try {
      const controller = new AbortController()
      const tid = setTimeout(() => controller.abort(), 22000)
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

      // Deduplicate by name + approximate position
      const seen = new Set<string>()

      const places = elements.map((el: any) => {
        const tags = el.tags || {}
        const clat = el.type === 'way' ? el.center?.lat : el.lat
        const clon = el.type === 'way' ? el.center?.lon : el.lon
        if (!clat || !clon) return null

        // Accept unnamed places too — use type as fallback name
        const rawName = tags.name || tags['name:en'] || tags['name:hi'] || tags['name:mr'] || ''
        if (!rawName) return null  // skip truly unnamed nodes

        // Dedup: same name within ~50m
        const key = rawName.toLowerCase().trim() + '|' + Math.round(clat * 1000) + '|' + Math.round(clon * 1000)
        if (seen.has(key)) return null
        seen.add(key)

        const rel = (tags.religion || '').toLowerCase()
        const denom = (tags.denomination || '').toLowerCase()
        let type = 'Temple'
        if (rel === 'hindu')     type = 'Hindu Temple'
        if (rel === 'jain')      type = 'Jain Temple'
        if (rel === 'sikh' || denom === 'sikh') type = 'Gurudwara'
        if (rel === 'buddhist')  type = 'Buddhist Temple'
        if (rel === 'christian') type = 'Church'
        if (rel === 'muslim')    type = 'Mosque'
        if (tags.amenity === 'mandir' || tags.building === 'mandir') type = 'Mandir'

        const dist = haversine(lat, lon, clat, clon)

        return {
          _id: String(el.id),
          name: rawName,
          type,
          state: tags['addr:state'] || '',
          city:  tags['addr:city'] || tags['addr:suburb'] || tags['addr:village'] || '',
          lat: clat,
          lon: clon,
          distance: dist,
          isOverpass: true,
          openingHours: tags['opening_hours'] || '',
          googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=' + clat + ',' + clon,
          osmUrl: 'https://www.openstreetmap.org/' + el.type + '/' + el.id,
        }
      })
        .filter(Boolean)
        .sort((a: any, b: any) => a.distance - b.distance)
        .slice(0, 60)  // Show up to 60 results

      return NextResponse.json({
        places,
        source: 'overpass',
        total: elements.length,
        returned: places.length,
      })

    } catch (err: any) {
      console.warn('Overpass failed:', endpoint, err.message)
      continue
    }
  }

  return NextResponse.json({ places: [], source: 'none', error: 'All endpoints unavailable' })
}
`

const routeDir = path.join(P, 'app', 'api', 'nearby')
fs.mkdirSync(routeDir, { recursive: true })
fs.writeFileSync(path.join(routeDir, 'route.ts'), routeContent, 'utf8')
console.log('✅ api/nearby/route.ts updated — comprehensive query')

process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: nearby API - comprehensive Indian temple tags, 150 results, dedup"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\n✅ Deployed! Test in ~2 mins.')
