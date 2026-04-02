import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)

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
