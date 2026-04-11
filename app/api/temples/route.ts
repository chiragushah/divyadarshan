import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import { rateLimit, sanitizeQuery, getIP, rateLimitResponse } from '@/lib/security'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const ip = getIP(req as any)
  const rl = rateLimit(ip, 'temples', { limit: 60, windowMs: 60000 })
  if (!rl.allowed) return rateLimitResponse(rl.resetIn)
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

  const q        = sanitizeQuery(searchParams.get('q') || '')
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


  // Religion filter
  const religion = searchParams.get('religion')
  if (religion) {
    const religionMap: Record<string, any> = {
      'hindu':       { type: { $nin: ['Jain', 'Jain Temple', 'Buddhist', 'Sikh'] } },
      'shaiva':      { $or: [{ deity: { $regex: 'Shiva|Shankar|Mahadev|Lingam', $options: 'i' } }, { type: { $in: ['Jyotirlinga', 'Panch Kedar', 'Pancha Bhuta'] } }] },
      'vaishnava':   { $or: [{ deity: { $regex: 'Vishnu|Krishna|Rama|Balaji|Narayan|Jagannath', $options: 'i' } }, { type: { $in: ['Divya Desam', 'Char Dham'] } }] },
      'shakta':      { $or: [{ deity: { $regex: 'Durga|Shakti|Devi|Kali|Parvati|Mata|Bhavani|Kamakshi|Meenakshi', $options: 'i' } }, { type: { $in: ['Shakti Peetha'] } }] },
      'ganapatya':   { deity: { $regex: 'Ganesha|Ganapati|Vinayak', $options: 'i' } },
      'saura':       { deity: { $regex: 'Surya|Sun', $options: 'i' } },
      'skanda':      { deity: { $regex: 'Murugan|Kartikeya|Skanda|Subramanya', $options: 'i' } },
      'nath':        { type: 'Nath Sampradaya' },
      'ramakrishna': { type: 'Ramakrishna' },
      'iskcon':      { deity: { $regex: 'Krishna|ISKCON', $options: 'i' } },
      'smarta':      { type: { $in: ['Mixed', 'Folk Deity'] } },
      'jain':        { $or: [{ type: { $in: ['Jain', 'Jain Temple'] } }, { categories: { $regex: 'Jain', $options: 'i' } }] },
      'buddhist':    { $or: [{ type: 'Buddhist' }, { categories: { $regex: 'Buddha', $options: 'i' } }] },
      'sikh':        { type: 'Sikh' },
    }
    if (religionMap[religion]) {
      Object.assign(filter, religionMap[religion])
    }
  }
  const sortObj: Record<string, any> = sort === 'rating' ? { rating_avg: -1 } : { name: 1 }
  const [temples, total] = await Promise.all([
    Temple.find(filter).sort(sortObj).skip((page-1)*limit).limit(limit).lean(),
    Temple.countDocuments(filter),
  ])

  const data = (temples as any[]).map((t: any) => ({ ...t, id: t._id.toString() }))
  return NextResponse.json({ temples: data, total, page })
}
