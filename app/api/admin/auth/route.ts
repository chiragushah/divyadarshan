import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession } from '@/models'

const ADMIN_EMAIL    = 'chirag@dynaimers.com'
const ADMIN_PASSWORD = 'dynaimers@2028'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  await connectDB()

  const token = randomBytes(32).toString('hex')
  const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24h

  await AdminSession.create({
    token,
    email,
    expires_at,
    ip: req.headers.get('x-forwarded-for') || 'unknown',
  })

  const res = NextResponse.json({ success: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expires_at,
    path: '/',
  })
  return res
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (token) {
    await connectDB()
    await AdminSession.deleteOne({ token })
  }
  const res = NextResponse.json({ success: true })
  res.cookies.delete('admin_token')
  return res
}
