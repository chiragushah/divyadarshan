import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { PrasadReminder } from '@/models/Prasad'
import { getFestival } from '@/lib/data/festivals'
import { getRecipe } from '@/lib/data/prasad'

export const dynamic = 'force-dynamic'

async function who() {
  const s = await getServerSession(authOptions)
  const email = s?.user?.email?.toLowerCase()
  if (!email) return null
  return { email, id: (s?.user as any)?.id || '' }
}

export async function GET() {
  const u = await who()
  if (!u) return NextResponse.json({ error: 'Please sign in' }, { status: 401 })
  await connectDB()
  const reminders = await PrasadReminder.find({ user_email: u.email, active: true }).sort({ updatedAt: -1 }).lean()
  return NextResponse.json({ reminders })
}

export async function POST(req: NextRequest) {
  const u = await who()
  if (!u) return NextResponse.json({ error: 'Please sign in' }, { status: 401 })
  const body = await req.json().catch(() => ({}))
  const slug = String(body.festival_slug || '')
  if (!getFestival(slug)) return NextResponse.json({ error: 'Unknown festival' }, { status: 400 })
  const days = Math.round(Number(body.days_before))
  if (!(days >= 0 && days <= 30)) return NextResponse.json({ error: 'Choose 0–30 days before' }, { status: 400 })
  const items = (Array.isArray(body.items) ? body.items : [])
    .map((i: any) => ({ dish: String(i.dish || ''), variant: String(i.variant || ''), servings: Math.min(1000, Math.max(1, Math.round(Number(i.servings) || 5))) }))
    .filter((i: any) => getRecipe(i.dish))
    .slice(0, 12)
  if (!items.length) return NextResponse.json({ error: 'Pick at least one recipe' }, { status: 400 })
  await connectDB()
  const reminder = await PrasadReminder.findOneAndUpdate(
    { user_email: u.email, festival_slug: slug },
    { user_id: u.id, user_email: u.email, festival_slug: slug, items, days_before: days, active: true, last_sent_for: '' },
    { upsert: true, new: true }
  )
  return NextResponse.json({ reminder }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const u = await who()
  if (!u) return NextResponse.json({ error: 'Please sign in' }, { status: 401 })
  const { festival_slug } = await req.json().catch(() => ({}))
  await connectDB()
  await PrasadReminder.deleteOne({ user_email: u.email, festival_slug: String(festival_slug || '') })
  return NextResponse.json({ success: true })
}
