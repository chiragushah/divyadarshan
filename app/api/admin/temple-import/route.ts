import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Temple } from '@/models'
import { makePlan } from '@/lib/openTempleImport'
import { runOpenImport, existingTemples, markAutoImportDone } from '@/lib/runOpenImport'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function admin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  await connectDB()
  return (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }).lean() as Promise<any>
}

// GET: preview only. Nothing is written.
export async function GET(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const pool = await existingTemples()
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
  await markAutoImportDone()   // the overnight automatic import must never run after a manual one
  const { batch, inserted, attempted, failed } = await runOpenImport(states)
  return NextResponse.json({ ok: true, batch, inserted, attempted, failed })
}

// DELETE ?batch=...: roll back one import. Only touches unedited basic listings from that batch.
export async function DELETE(req: NextRequest) {
  if (!(await admin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const batch = new URL(req.url).searchParams.get('batch') || ''
  if (!/^open-wikidata-[a-z0-9-]+$/.test(batch)) return NextResponse.json({ error: 'Invalid batch.' }, { status: 400 })
  const r = await (Temple as any).deleteMany({ import_batch: batch, is_basic: true })
  return NextResponse.json({ ok: true, removed: r.deletedCount || 0 })
}
