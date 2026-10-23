import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { StreamRequest } from '@/models/Live'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') || ''
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
  await connectDB()
  const count = await StreamRequest.countDocuments({ temple_slug: slug })
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  const mine = email ? !!(await StreamRequest.exists({ temple_slug: slug, user_email: email })) : false
  return NextResponse.json({ count, mine })
}

// Toggles the signed-in user's request for this temple.
export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  if (!email) return NextResponse.json({ error: 'Please sign in' }, { status: 401 })
  const { slug } = await req.json().catch(() => ({}))
  const clean = String(slug || '').slice(0, 120)
  if (!clean) return NextResponse.json({ error: 'slug required' }, { status: 400 })
  await connectDB()
  const had = await StreamRequest.findOneAndDelete({ temple_slug: clean, user_email: email })
  if (!had) await StreamRequest.create({ temple_slug: clean, user_email: email })
  const count = await StreamRequest.countDocuments({ temple_slug: clean })
  return NextResponse.json({ count, mine: !had })
}
