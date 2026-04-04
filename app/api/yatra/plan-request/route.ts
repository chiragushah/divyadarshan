import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { TripPlanRequest } from '@/models/TripPlanRequest'

export const dynamic = 'force-dynamic'

// POST — submit a trip plan request
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()

  const {
    name, email, phone, city,
    from, to, days, pilgrims, mode, deity,
    budget, special_notes, ai_itinerary,
  } = body

  if (!name || !email || !from || !to) {
    return NextResponse.json({ error: 'Name, email, from and to are required' }, { status: 400 })
  }

  await connectDB()

  const request = await TripPlanRequest.create({
    name, email, phone, city,
    from, to, days, pilgrims, mode, deity,
    budget, special_notes, ai_itinerary,
    status: 'new',
  })

  return NextResponse.json({ success: true, request_id: request._id })
}

// GET — admin: list all requests
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Login required' }, { status: 401 })
  }

  await connectDB()
  const requests = await TripPlanRequest.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json({ requests })
}

// PATCH — admin: update status
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Login required' }, { status: 401 })
  }

  const { request_id, status, admin_notes, quoted_price } = await req.json()

  await connectDB()
  const updated = await TripPlanRequest.findByIdAndUpdate(
    request_id,
    { $set: { status, admin_notes, quoted_price } },
    { new: true }
  )

  return NextResponse.json({ request: updated })
}
