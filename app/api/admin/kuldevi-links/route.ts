import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession } from '@/models'
import { KuldeviLink, KuldeviFlag } from '@/models/Kuldevi'
import { EVIDENCE_TYPES } from '@/lib/kuldeviTrust'

export const dynamic = 'force-dynamic'
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max)

async function admin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  await connectDB()
  return (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }).lean() as Promise<any>
}

export async function GET(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const [links, flags] = await Promise.all([
    KuldeviLink.find({}).sort({ createdAt: -1 }).limit(1000).lean(),
    KuldeviFlag.find({}).sort({ createdAt: -1 }).limit(500).lean(),
  ])
  return NextResponse.json({ links, flags })
}

export async function POST(req: NextRequest) {
  const a = await admin(req)
  if (!a) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  const d = {
    community: clean(b.community, 80), gotra: clean(b.gotra, 60), surnames: clean(b.surnames, 300), deity_name: clean(b.deity_name, 80),
    kuldevi_slug: clean(b.kuldevi_slug, 80), state: clean(b.state, 60), evidence_type: clean(b.evidence_type, 30),
    evidence_source: clean(b.evidence_source, 160), evidence_note: clean(b.evidence_note, 800),
  }
  const errors: Record<string, string> = {}
  if (d.community.length < 3) errors.community = 'Community is required.'
  if (!d.gotra && !d.surnames) errors.gotra = 'Give a gotra, surnames, or both.'
  if (d.deity_name.length < 3) errors.deity_name = 'Deity name is required.'
  if (!EVIDENCE_TYPES.some(e => e.id === d.evidence_type)) errors.evidence_type = 'Choose the kind of evidence.'
  if (d.evidence_source.length < 5) errors.evidence_source = 'Name the source: the trust, the book (title, edition), or the elder (name and role).'
  if (d.evidence_note.length < 30) errors.evidence_note = 'Describe what was confirmed and how (30+ characters).'
  const on = b.verified_on ? new Date(b.verified_on) : null
  if (!on || isNaN(+on) || +on > Date.now() + 86400000) errors.verified_on = 'Give the date of verification (not in the future).'
  if (!b.confirm) errors.confirm = 'Please confirm you checked the source yourself.'
  if (Object.keys(errors).length) return NextResponse.json({ error: 'Please fix the highlighted fields.', errors }, { status: 422 })
  const doc = await KuldeviLink.create({ ...d, verified_on: on, verified_by: a.email || 'admin' })
  return NextResponse.json({ item: doc }, { status: 201 })
}

export async function PATCH(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  if (b.kind === 'flag') {
    if (!b.id || !['open', 'resolved'].includes(b.status)) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    const doc = await KuldeviFlag.findByIdAndUpdate(b.id, { status: b.status, admin_note: clean(b.admin_note, 400) }, { new: true })
    return NextResponse.json({ item: doc })
  }
  const reason = clean(b.withdraw_reason, 400)
  if (!b.id || !['active', 'withdrawn'].includes(b.status)) return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  if (b.status === 'withdrawn' && reason.length < 10) return NextResponse.json({ error: 'Say why it is being withdrawn (10+ characters).' }, { status: 422 })
  const doc = await KuldeviLink.findByIdAndUpdate(b.id, { status: b.status, withdraw_reason: b.status === 'withdrawn' ? reason : '' }, { new: true })
  return NextResponse.json({ item: doc })
}
