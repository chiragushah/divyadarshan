import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@/lib/mongodb/connect'
import { VerifiedVisit } from '@/models'
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    if (!token?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })
    await connectDB()
    const visit = await VerifiedVisit.findOneAndUpdate(
      { user_email: token.email, temple_slug: body.temple_slug },
      { ...body, user_id: token.sub, user_email: token.email },
      { upsert: true, new: true }
    )
    return NextResponse.json({ success: true, visit })
  } catch(err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (!token?.email) return NextResponse.json({ visits: [] })
  await connectDB()
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  const query: any = { user_email: token.email }
  if (slug) query.temple_slug = slug
  const visits = await VerifiedVisit.find(query).lean()
  return NextResponse.json({ visits })
}
