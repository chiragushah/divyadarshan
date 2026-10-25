import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { User } from '@/models'
import bcrypt from 'bcryptjs'
import { issueVerification } from '@/lib/emailVerification'
import { isDisposable, hasMailServer, domainOf, looksRandom, looksRandomName, dotTrick, gmailVariantRegex } from '@/lib/emailQuality'
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

    // Bots fill hidden fields and submit instantly. Pretend success so they learn nothing.
    if (body.website || (typeof body.ts === 'number' && Date.now() - body.ts < 2500)) return NextResponse.json({ success: true })

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }
    if (dotTrick(email) || looksRandomName(name)) return NextResponse.json({ error: 'Please use your usual email address and your real name.' }, { status: 400 })
    if (isDisposable(email)) return NextResponse.json({ error: 'Please use a permanent email address — temporary mailboxes are not accepted.' }, { status: 400 })
    if (looksRandom(email) && !/^\d{10}$/.test(phone.replace(/\s|\+91/g, ''))) return NextResponse.json({ error: 'Please use your real email address and a valid mobile number.' }, { status: 400 })
    if (!(await hasMailServer(domainOf(email)))) return NextResponse.json({ error: 'That email domain cannot receive mail. Please check the spelling.' }, { status: 400 })
    const pwCheck = isValidPassword(password)
    if (!pwCheck.valid) {
      return NextResponse.json({ error: pwCheck.reason }, { status: 400 })
    }

    await connectDB()
    const variant = gmailVariantRegex(email)
    const existing: any = await User.findOne(variant ? { email: variant } : { email }).select('_id email name verification_required email_verified').lean()
    const origin = req.nextUrl.origin
    if (existing) {
      // Someone who signed up but never confirmed: just send the link again (never reveals anything extra).
      if (existing.verification_required && !existing.email_verified) {
        const again = await issueVerification(existing.email, existing.name || name, origin)
        if (again.status === 'cooldown') return NextResponse.json({ success: true, verify: true, email: existing.email, wait: again.wait })
        if (again.status === 'limit') return NextResponse.json({ error: 'Too many confirmation emails today. Please try again tomorrow.' }, { status: 429 })
        if (again.status === 'mail-failed') return NextResponse.json({ error: 'We could not send the confirmation email. Please try again in a few minutes.' }, { status: 503 })
        return NextResponse.json({ success: true, verify: true, email: existing.email })
      }
      await new Promise(r => setTimeout(r, 500))
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await User.create({ name, email, phone, password: hashed, provider: 'email', verification_required: true })
    const sent = await issueVerification(email, name, origin)
    if (sent.status !== 'sent') {
      await User.deleteOne({ _id: user._id })       // never leave an account nobody can activate
      return NextResponse.json({ error: 'We could not send the confirmation email. Please check the address and try again in a few minutes.' }, { status: 503 })
    }
    return NextResponse.json({ success: true, verify: true, email })
  } catch (err) {
    console.error('Register error:', err)
    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })
  }
}