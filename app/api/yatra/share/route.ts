import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { SharedPlan } from '@/models/SharedPlan'
import { User } from '@/models'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })
  const body = await req.json()
  const { from, to, days, pilgrims, mode, deity, itinerary, shared_with_email, message } = body
  if (!itinerary || !shared_with_email) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  await connectDB()
  const recipient = await User.findOne({ email: shared_with_email.toLowerCase() }).lean()
  if (!recipient) return NextResponse.json({ error: 'No registered user found with that email' }, { status: 404 })
  if (shared_with_email.toLowerCase() === session.user.email.toLowerCase())
    return NextResponse.json({ error: 'You cannot share a plan with yourself' }, { status: 400 })
  const plan = await SharedPlan.create({
    from, to, days, pilgrims, mode, deity, itinerary,
    shared_by: session.user.email,
    shared_with: shared_with_email.toLowerCase(),
    message: message || '',
  })
  return NextResponse.json({ success: true, plan_id: plan._id, recipient_name: (recipient as any).name })
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })
  await connectDB()
  const plans = await SharedPlan.find({ shared_with: session.user.email }).sort({ createdAt: -1 }).lean()
  await SharedPlan.updateMany({ shared_with: session.user.email, read: false }, { read: true })
  return NextResponse.json({ plans })
}
