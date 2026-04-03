import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { AdminRequest } from '@/models/AdminRequest'
export const dynamic = 'force-dynamic'

// GET — list all requests (admin only) or check own status
export async function GET(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const mine = searchParams.get('mine')

  if (mine) {
    const request = await AdminRequest.findOne({ user_email: session.user.email }).lean()
    return NextResponse.json({ request })
  }

  // All requests — for super admin
  const requests = await AdminRequest.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json({ requests })
}

// POST — submit a request
export async function POST(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const body = await req.json()
  const { reason, organisation } = body

  if (!reason?.trim()) return NextResponse.json({ error: 'Reason is required' }, { status: 400 })

  // Check if already submitted
  const existing = await AdminRequest.findOne({ user_email: session.user.email })
  if (existing) {
    return NextResponse.json({ error: 'You have already submitted a request', request: existing }, { status: 400 })
  }

  const request = await AdminRequest.create({
    user_email: session.user.email,
    user_name: session.user.name || '',
    reason,
    organisation,
    status: 'pending',
  })

  return NextResponse.json({ request })
}

// PATCH — approve or reject (admin only)
export async function PATCH(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const { requestId, action } = await req.json()
  if (!['approved', 'rejected'].includes(action)) return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  const request = await AdminRequest.findByIdAndUpdate(requestId, {
    status: action,
    reviewed_by: session.user.email,
    reviewed_at: new Date(),
  }, { new: true })

  return NextResponse.json({ request })
}
