import { NextRequest, NextResponse } from 'next/server'

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
