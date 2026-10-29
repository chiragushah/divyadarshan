import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Temple } from '@/models'
import { OPEN_TEMPLES, makePlan, buildRecord, type Existing } from '@/lib/openTempleImport'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function admin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  await connectDB()
  return (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }).lean() as Promise<any>
}

async function existing(): Promise<Existing[]> {
  const rows = await (Temple as any).find({}).select('slug name state lat lng wikidata_id').lean()
  return rows.map((r: any) => ({ slug: r.slug, name: r.name, state: r.state, lat: r.lat, lng: r.lng, wikidata_id: r.wikidata_id }))
}

// GET: preview only. Nothing is written.
export async function GET(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const pool = await existing()
  const plan = makePlan(pool)
  const batches = await (Temple as any).aggregate([
    { $match: { import_batch: { $exists: true } } },
    { $group: { _id: '$import_batch', count: { $sum: 1 }, at: { $max: '$createdAt' } } },
    { $sort: { at: -1 } },
  ])
  return NextResponse.json({ plan, existingCount: pool.length, batches })
}

// POST: apply. Requires { confirm: "IMPORT" }. Safe to repeat: already-imported temples are skipped.
export async function POST(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  if (b.confirm !== 'IMPORT') return NextResponse.json({ error: 'Type IMPORT to confirm.' }, { status: 400 })
  const states: string[] = Array.isArray(b.states) && b.states.length ? b.states.map(String) : []
  const pool = await existing()
  const plan = makePlan(pool)
  const wanted = new Set(plan.fresh.filter(r => !states.length || states.includes(r.state)).map(r => r.id))
  const batch = `open-wikidata-${new Date().toISOString().slice(0, 10)}-${Date.now().toString(36)}`
  const docs = OPEN_TEMPLES.filter(t => wanted.has(t.id)).map(t => buildRecord(t, plan.fresh.find(r => r.id === t.id)!.slug, batch))

  let inserted = 0; const failed: string[] = []
  try {
    const res: any = await (Temple as any).insertMany(docs, { ordered: false })
    inserted = res.length
  } catch (e: any) {
    // With ordered:false the good rows are still written; count them.
    inserted = e?.insertedDocs?.length ?? e?.result?.insertedCount ?? 0
    for (const we of e?.writeErrors || []) failed.push(String(we?.err?.op?.slug || we?.errmsg || 'unknown').slice(0, 120))
  }
  return NextResponse.json({ ok: true, batch, inserted, attempted: docs.length, failed: failed.slice(0, 20) })
}

// DELETE ?batch=...: roll back one import. Only touches unedited basic listings from that batch.
export async function DELETE(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const batch = new URL(req.url).searchParams.get('batch') || ''
  if (!/^open-wikidata-[a-z0-9-]+$/.test(batch)) return NextResponse.json({ error: 'Invalid batch.' }, { status: 400 })
  const r = await (Temple as any).deleteMany({ import_batch: batch, is_basic: true })
  return NextResponse.json({ ok: true, removed: r.deletedCount || 0 })
}
