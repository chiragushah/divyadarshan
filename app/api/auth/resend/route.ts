import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { User } from '@/models'
import { issueVerification } from '@/lib/emailVerification'
import { rateLimit, getIP, rateLimitResponse, isValidEmail } from '@/lib/security'

export const dynamic = 'force-dynamic'

// Always answers the same way for unknown / already-confirmed addresses, so it cannot be used to discover who has an account.
export async function POST(req: NextRequest) {
  const rl = rateLimit(getIP(req as any), 'resend', { limit: 10, windowMs: 60 * 60000 })
  if (!rl.allowed) return rateLimitResponse(rl.resetIn)
  const b = await req.json().catch(() => ({}))
  const email = String(b.email || '').toLowerCase().trim().slice(0, 254)
  if (!isValidEmail(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 })
  await connectDB()
  const u: any = await (User as any).findOne({ email }).select('name email verification_required email_verified').lean()
  if (!u || !u.verification_required || u.email_verified) return NextResponse.json({ status: 'sent' })
  const r = await issueVerification(u.email, u.name || '', req.nextUrl.origin)
  if (r.status === 'cooldown') return NextResponse.json({ status: 'cooldown', wait: r.wait }, { status: 429 })
  if (r.status === 'limit') return NextResponse.json({ error: 'Too many confirmation emails today. Please try again tomorrow.' }, { status: 429 })
  if (r.status === 'mail-failed') return NextResponse.json({ error: 'We could not send the email. Please try again in a few minutes.' }, { status: 503 })
  return NextResponse.json({ status: 'sent' })
}
