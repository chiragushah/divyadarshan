import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { KuldeviFlag } from '@/models/Kuldevi'

export const dynamic = 'force-dynamic'
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max)

export async function POST(req: NextRequest) {
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  if (!email) return NextResponse.json({ error: 'Please sign in to report a problem.' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  const d = {
    target: ['verified', 'reported', 'page'].includes(b.target) ? b.target : 'reported',
    ref: clean(b.ref, 80), deity_name: clean(b.deity_name, 80), community: clean(b.community, 80), gotra: clean(b.gotra, 60), reason: clean(b.reason, 800),
  }
  if (d.deity_name.length < 2) return NextResponse.json({ error: 'Missing deity.' }, { status: 400 })
  if (d.reason.length < 20) return NextResponse.json({ error: 'Please tell us what is wrong (at least 20 characters).' }, { status: 422 })
  await connectDB()
  if ((await KuldeviFlag.countDocuments({ user_email: email, status: 'open' })) >= 10) return NextResponse.json({ error: 'You have several open reports already. Thank you — we will review them first.' }, { status: 429 })
  await KuldeviFlag.create({ ...d, user_email: email })
  return NextResponse.json({ success: true }, { status: 201 })
}
