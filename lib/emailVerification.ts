import { createHash, randomBytes } from 'crypto'
import connectDB from '@/lib/mongodb/connect'
import { User } from '@/models'
import { EmailVerification } from '@/models/EmailVerification'
import { sendMail } from '@/lib/mailer'
import { verificationEmail, VERIFY_HOURS } from '@/lib/verificationEmail'

export const COOLDOWN_SECONDS = 60
export const MAX_PER_DAY = 5
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

export type IssueResult =
  | { status: 'sent' }
  | { status: 'cooldown'; wait: number }
  | { status: 'limit' }
  | { status: 'mail-failed' }

/** Create (or replace) the confirmation link for an email and send it. Enforces a 60s cooldown and 5 sends/day. */
export async function issueVerification(email: string, name: string, origin: string): Promise<IssueResult> {
  await connectDB()
  email = email.toLowerCase().trim()
  const now = new Date(), day = now.toISOString().slice(0, 10)
  const cur: any = await EmailVerification.findOne({ email }).lean()
  if (cur) {
    const since = (+now - +new Date(cur.last_sent_at)) / 1000
    if (since < COOLDOWN_SECONDS) return { status: 'cooldown', wait: Math.ceil(COOLDOWN_SECONDS - since) }
    if (cur.sent_day === day && cur.sent_today >= MAX_PER_DAY) return { status: 'limit' }
  }
  const token = randomBytes(32).toString('hex')
  const link = `${origin.replace(/\/$/, '')}/auth/verify?token=${token}`
  const mail = verificationEmail(name, link)
  const sent = await sendMail({ to: email, ...mail })
  if (!sent.ok) return { status: 'mail-failed' }
  await EmailVerification.findOneAndUpdate(
    { email },
    { email, token_hash: sha(token), expires_at: new Date(+now + VERIFY_HOURS * 3600_000), last_sent_at: now, sent_day: day, sent_today: cur && cur.sent_day === day ? cur.sent_today + 1 : 1 },
    { upsert: true, new: true }
  )
  return { status: 'sent' }
}

export type VerifyResult = { status: 'verified'; email: string } | { status: 'expired'; email: string } | { status: 'invalid' }

/** Single-use: a link that worked once will say "invalid" the second time. */
export async function consumeVerification(token: string): Promise<VerifyResult> {
  if (!/^[a-f0-9]{64}$/.test(token || '')) return { status: 'invalid' }
  await connectDB()
  const rec: any = await EmailVerification.findOne({ token_hash: sha(token) }).lean()
  if (!rec) return { status: 'invalid' }
  if (+new Date(rec.expires_at) < Date.now()) return { status: 'expired', email: rec.email }
  await (User as any).updateOne({ email: rec.email }, { $set: { email_verified: new Date(), verification_required: false } })
  await EmailVerification.deleteOne({ _id: rec._id })
  return { status: 'verified', email: rec.email }
}
