import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Temple } from '@/models'
import { enrichTemple } from '@/lib/enrichTemple'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function admin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  await connectDB()
  return (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }).lean() as Promise<any>
}
const PENDING = { is_basic: true, enriched_at: { $exists: false } }

// POST: enrich the next 15 basic listings (descriptions + photos from Wikipedia/Wikimedia). Call repeatedly until remaining is 0.
export async function POST(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const batch: any[] = await (Temple as any).find(PENDING).select('slug name wikipedia_url wikidata_id description').limit(15).lean()
  let ok = 0, partial = 0, none = 0, retry = 0
  for (let i = 0; i < batch.length; i += 5) {
    await Promise.all(batch.slice(i, i + 5).map(async t => {
      const patch = await enrichTemple(t)
      if (patch.enrich_status === 'retry') { retry++; return }   // network trouble: leave unprocessed
      await (Temple as any).updateOne({ _id: t._id, enriched_at: { $exists: false } }, { $set: patch })
      if (patch.enrich_status === 'ok') ok++; else if (patch.enrich_status === 'partial') partial++; else none++
    }))
  }
  const remaining = await (Temple as any).countDocuments(PENDING)
  return NextResponse.json({ ok, partial, none, retry, remaining, stalled: batch.length > 0 && retry === batch.length })
}

export async function GET(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const [basic, remaining, withImage, withText] = await Promise.all([
    (Temple as any).countDocuments({ is_basic: true }), (Temple as any).countDocuments(PENDING),
    (Temple as any).countDocuments({ is_basic: true, image_credit: { $exists: true } }),
    (Temple as any).countDocuments({ is_basic: true, description_source: { $exists: true } }),
  ])
  return NextResponse.json({ basic, remaining, withImage, withText })
}
