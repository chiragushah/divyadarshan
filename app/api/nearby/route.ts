import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'

// Distance in km between two lat/lon points
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
  const lat = parseFloat(searchParams.get('lat') || '0')
  const lon = parseFloat(searchParams.get('lon') || '0')
  const km  = parseInt(searchParams.get('radius') || '150')

  if (!lat || !lon) {
    return NextResponse.json({ places: [], error: 'Missing coordinates' }, { status: 400 })
  }

  try {
    await connectDB()

    const allTemples = await Temple.find({
      lat: { $exists: true, $ne: 0 },
      lng: { $exists: true, $ne: 0 },
    })
      .select('name slug city state deity type image_url blob_image_url lat lng has_live rating_avg categories')
      .lean()

    const places = (allTemples as any[])
      .map((t: any) => {
        const distance = haversine(lat, lon, t.lat, t.lng)
        return {
          _id: String(t._id),
          id: String(t._id),
          slug: t.slug,
          name: t.name,
          type: t.deity || t.type || 'Temple',
          deity: t.deity || '',
          state: t.state || '',
          city: t.city || '',
          address: [t.city, t.state].filter(Boolean).join(', '),
          lat: t.lat,
          lon: t.lng,
          distance,
          blob_image_url: t.blob_image_url || '',
          image_url: t.image_url || '',
          googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=' + t.lat + ',' + t.lng,
        }
      })
      .filter((t: any) => t.distance <= km)
      .sort((a: any, b: any) => a.distance - b.distance)
      .slice(0, 60)

    return NextResponse.json({
      places,
      source: 'divyadarshanam',
      returned: places.length,
    })
  } catch (err: any) {
    return NextResponse.json({ places: [], source: 'none', error: err.message })
  }
}
