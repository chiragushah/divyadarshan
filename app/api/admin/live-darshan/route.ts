import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Temple } from '@/models'
import { StreamRequest } from '@/models/Live'
import { isRealStreamUrl, liveTier } from '@/lib/liveStatus'

export const dynamic = 'force-dynamic'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  return !!(await AdminSession.findOne({ token, expires_at: { $gt: new Date() } }))
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const temples = await (Temple as any).find().select('slug name state city deity has_live live_url live_status live_verified_at live_note official_website timing').sort({ name: 1 }).lean()
  const reqs = await StreamRequest.aggregate([{ $group: { _id: '$temple_slug', n: { $sum: 1 } } }])
  const votes: Record<string, number> = Object.fromEntries(reqs.map((r: any) => [r._id, r.n]))
  const items = temples.map((t: any) => ({
    slug: t.slug, name: t.name, state: t.state || 'Unknown', city: t.city, deity: t.deity,
    status: t.live_status || (t.has_live ? 'unverified' : 'none'),
    tier: liveTier(t), live_url: t.live_url || '', live_note: t.live_note || '', verified_at: t.live_verified_at || null,
    website: t.official_website || '', votes: votes[t.slug] || 0,
  }))
  return NextResponse.json({ items })
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  const slug = String(b.slug || '')
  const status = String(b.status || '')
  if (!slug || !['official', 'channel', 'unverified', 'none'].includes(status)) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  const url = String(b.live_url || '').trim()
  const note = String(b.live_note || '').trim().slice(0, 400)

  const update: Record<string, any> = { live_status: status, live_note: note }
  if (status === 'official' || status === 'channel') {
    if (!isRealStreamUrl(url)) return NextResponse.json({ error: 'A verified stream needs a real stream link (not a YouTube search page).' }, { status: 422 })
    if (note.length < 10) return NextResponse.json({ error: 'Please note how you verified it (at least 10 characters).' }, { status: 422 })
    Object.assign(update, { has_live: true, live_url: url, live_verified_at: new Date() })
  } else if (status === 'unverified') {
    Object.assign(update, { has_live: true, $unset: { live_verified_at: '' } })
    if (url) update.live_url = url
  } else {
    Object.assign(update, { has_live: false, $unset: { live_verified_at: '' } })
  }
  const { $unset, ...set } = update
  const doc = await (Temple as any).findOneAndUpdate({ slug }, { $set: set, ...($unset ? { $unset } : {}) }, { new: true })
  if (!doc) return NextResponse.json({ error: 'Temple not found' }, { status: 404 })
  return NextResponse.json({ success: true, status })
}
