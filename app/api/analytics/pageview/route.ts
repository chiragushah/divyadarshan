import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@/lib/mongodb/connect'
import { PageViewLog } from '@/models'

export async function POST(req: NextRequest) {
  try {
    const { page, duration_sec, referrer } = await req.json()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    
    await connectDB()
    await PageViewLog.create({
      user_id:    token?.sub || 'anonymous',
      user_email: token?.email || '',
      page:       page || '/',
      duration_sec: Math.min(duration_sec || 0, 3600), // cap at 1 hour
      referrer:   referrer || '',
      device:     req.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
