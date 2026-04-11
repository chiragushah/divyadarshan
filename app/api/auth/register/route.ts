import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { User } from '@/models'
import bcrypt from 'bcryptjs'
import { rateLimit, sanitizeText, isValidEmail, isValidPassword, getIP, rateLimitResponse } from '@/lib/security'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  // Rate limit: 5 registrations per IP per hour
  const ip = getIP(req as any)
  const rl = rateLimit(ip, 'register', { limit: 5, windowMs: 60 * 60000 })
  if (!rl.allowed) return rateLimitResponse(rl.resetIn)

  try {
    let body: any
    try {
      const text = await req.text()
      if (text.length > 10000) return NextResponse.json({ error: 'Request too large' }, { status: 400 })
      body = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const name     = sanitizeText(body.name || '', 100)
    const email    = (body.email || '').toLowerCase().trim().slice(0, 254)
    const phone    = sanitizeText(body.phone || '', 20)
    const password = body.password || ''

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    const pwCheck = isValidPassword(password)
    if (!pwCheck.valid) {
      return NextResponse.json({ error: pwCheck.reason }, { status: 400 })
    }

    await connectDB()
    const existing = await User.findOne({ email }).select('_id').lean()
    if (existing) {
      await new Promise(r => setTimeout(r, 500))
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 12)
    await User.create({ name, email, phone, password: hashed, provider: 'email' })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}