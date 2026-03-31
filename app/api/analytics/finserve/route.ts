import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@/lib/mongodb/connect'
import { FinVerseClick } from '@/models'

export async function POST(req: NextRequest) {
  try {
    const { source, campaign } = await req.json()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    await connectDB()
    await FinVerseClick.create({
      user_id:    token?.sub || 'anonymous',
      user_email: (token?.email as string) || '',
      source, campaign,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
