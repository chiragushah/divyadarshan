import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@/lib/mongodb/connect'
import { FestivalAlert } from '@/models'
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })
    await connectDB()
    await FestivalAlert.findOneAndUpdate(
      { user_email: token.email },
      { ...body, user_id: token.sub, user_email: token.email, active: true },
      { upsert: true, new: true }
    )
    return NextResponse.json({ success: true })
  } catch(err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.email) return NextResponse.json({ alert: null })
  await connectDB()
  const alert = await FestivalAlert.findOne({ user_email: token.email, active: true })
  return NextResponse.json({ alert })
}
