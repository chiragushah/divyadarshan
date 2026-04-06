import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)

  // Nearby temples using Haversine distance
  const nearby = searchParams.get('nearby')
  if (nearby === '1') {
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lon = parseFloat(searchParams.get('lon') || '0')
    const radius = parseFloat(searchParams.get('radius') || '50')

    if (lat && lon) {
      const allTemples = await Temple.find({ lat: { $exists: true, $ne: 0 }, lng: { $exists: true, $ne: 0 } })
        .select('name slug city state deity type image_url lat lng has_live rating_avg categories')
        .lean()

      const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) ** 2
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      }

      const results = (allTemples as any[])
        .map(t => ({ ...t, distance: haversine(lat, lon, t.lat, t.lng) }))
        .filter(t => t.distance <= radius)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 30)

      return NextResponse.json({ temples: results })
    }
  }

  const q        = searchParams.get('q')
  const state    = searchParams.get('state')
  const deity    = searchParams.get('deity')
  const category = searchParams.get('category')
  const live     = searchParams.get('live')
  const slugs    = searchParams.get('slugs')
  const exclude  = searchParams.get('exclude')
  const sort     = searchParams.get('sort')
  const limit    = parseInt(searchParams.get('limit') || '20')
  const page     = parseInt(searchParams.get('page') || '1')

  const filter: Record<string, any> = {}
  if (slugs) {
    filter.slug = { $in: slugs.split(',') }
  } else {
    if (q) filter.$or = [
      { name:  { $regex: q, $options: 'i' } },
      { city:  { $regex: q, $options: 'i' } },
      { state: { $regex: q, $options: 'i' } },
      { deity: { $regex: q, $options: 'i' } },
    ]
    if (state)    filter.state      = state
    if (deity)    filter.deity      = { $regex: deity, $options: 'i' }
    if (category) filter.categories = category
    if (live === 'true') filter.has_live = true
    if (exclude)  filter.slug = { $nin: exclude.split(',') }
  }

  const sortObj: Record<string, any> = sort === 'rating' ? { rating_avg: -1 } : { name: 1 }
  const [temples, total] = await Promise.all([
    Temple.find(filter).sort(sortObj).skip((page-1)*limit).limit(limit).lean(),
    Temple.countDocuments(filter),
  ])

  const data = (temples as any[]).map((t: any) => ({ ...t, id: t._id.toString() }))
  return NextResponse.json({ temples: data, total, page })
}
