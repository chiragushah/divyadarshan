import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)

  const page     = parseInt(searchParams.get('page')     || '1')
  const limit    = parseInt(searchParams.get('limit')    || '48')
  const query    = searchParams.get('q')                 || ''
  const state    = searchParams.get('state')             || ''
  const deity    = searchParams.get('deity')             || ''
  const type     = searchParams.get('type')              || ''
  const category = searchParams.get('category')          || ''
  const live     = searchParams.get('live')              || ''
  const skip     = (page - 1) * limit

  // Build Mongoose filter
  const filter: Record<string, any> = {}

  if (query) {
    // Use MongoDB full-text search if index exists, fallback to regex
    filter.$or = [
      { name:  { $regex: query, $options: 'i' } },
      { city:  { $regex: query, $options: 'i' } },
      { state: { $regex: query, $options: 'i' } },
      { deity: { $regex: query, $options: 'i' } },
    ]
  }
  if (state)    filter.state = state
  if (deity)    filter.deity = { $regex: deity, $options: 'i' }
  if (type)     filter.type  = { $regex: type,  $options: 'i' }
  if (category) filter.categories = category
  if (live === 'true') filter.has_live = true

  const [temples, total] = await Promise.all([
    Temple.find(filter).sort({ name: 1 }).skip(skip).limit(limit).lean(),
    Temple.countDocuments(filter),
  ])

  // Normalise _id → id for frontend compatibility
  const data = temples.map(t => ({ ...t, id: t._id.toString() }))

  return NextResponse.json({ data, total, page, per_page: limit, has_more: total > skip + limit })
}
