import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const lat    = searchParams.get('lat')
  const lon    = searchParams.get('lon')
  const radius = searchParams.get('radius') || '10'

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat/lon', elements: [] }, { status: 400 })
  }

  const r = parseFloat(radius) * 1000

  // All Indian places of worship â€” Hindu, Jain, Sikh, Buddhist
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="place_of_worship"](around:${r},${lat},${lon});
      way["amenity"="place_of_worship"](around:${r},${lat},${lon});
      node["historic"="temple"](around:${r},${lat},${lon});
      way["historic"="temple"](around:${r},${lat},${lon});
      node["building"="temple"](around:${r},${lat},${lon});
      way["building"="temple"](around:${r},${lat},${lon});
      node["building"="monastery"](around:${r},${lat},${lon});
      way["building"="monastery"](around:${r},${lat},${lon});
    );
    out center tags 200;
  `

  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: `data=${encodeURIComponent(query)}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(28000),
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'Overpass error', elements: [] }, { status: 502 })
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Nearby API error:', err)
    return NextResponse.json({ error: 'Overpass unavailable', elements: [] }, { status: 500 })
  }
}
