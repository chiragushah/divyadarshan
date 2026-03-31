import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { Review, Temple } from '@/models'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const templeId = searchParams.get('temple_id')
  const userId   = searchParams.get('user_id')

  const filter: Record<string, any> = {}
  if (templeId) filter.temple_id = templeId
  if (userId)   filter.user_id   = userId

  const reviews = await Review.find(filter)
    .sort({ createdAt: -1 })
    .limit(50)
    .populate('user_id', 'name image')
    .lean() as any

  const data = reviews.map((r: any) => ({
    ...r,
    id: r._id.toString(),
    user: r.user_id,
  }))

  return NextResponse.json({ data })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const { temple_id, rating, body, pilgrim_tips, visit_month } = await req.json()

  if (!temple_id || !rating || !body) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Upsert — one review per user per temple
  const review = await Review.findOneAndUpdate(
    { user_id: session.user.id, temple_id },
    { rating, body, pilgrim_tips, visit_month },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).populate('user_id', 'name image')

  return NextResponse.json({ data: { ...review.toObject(), id: review._id.toString() } })
}

export async function PATCH(req: NextRequest) {
  // Mark review as helpful
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const { review_id } = await req.json()

  const review = await Review.findById(review_id)
  if (!review) return NextResponse.json({ error: 'Review not found' }, { status: 404 })

  const alreadyVoted = review.helpful_by.some(id => id.toString() === session.user!.id)
  if (alreadyVoted) {
    // Undo vote
    review.helpful_by = review.helpful_by.filter(id => id.toString() !== session.user!.id) as any
    review.helpful_count = Math.max(0, review.helpful_count - 1)
  } else {
    review.helpful_by.push(session.user.id as any)
    review.helpful_count += 1
  }
  await review.save()

  return NextResponse.json({ helpful_count: review.helpful_count, voted: !alreadyVoted })
}
