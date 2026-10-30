import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession } from '@/models'
import { BATCHES } from '@/data/batches'
import { previewBatch, applyBatch, undoBatch, batchStatus } from '@/lib/templeBatch'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function admin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  await connectDB()
  return (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }).lean() as Promise<any>
}
const bad = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s })

export async function GET(req: NextRequest) {
  if (!(await admin(req))) return bad('Unauthorised', 401)
  const id = new URL(req.url).searchParams.get('batch')
  const status = await batchStatus()
  if (!id) return NextResponse.json({ batches: BATCHES.map(b => ({ id: b.id, title: b.title, count: b.items.length, status: status[b.id] || null })) })
  const preview = await previewBatch(id)
  return preview ? NextResponse.json({ preview, status: status[id] || null }) : bad('Unknown batch', 404)
}

export async function POST(req: NextRequest) {
  if (!(await admin(req))) return bad('Unauthorised', 401)
  const b = await req.json().catch(() => ({}))
  if (b.confirm !== 'APPLY') return bad('Type APPLY to confirm.')
  try { return NextResponse.json({ ok: true, ...(await applyBatch(String(b.batch), Array.isArray(b.slugs) ? b.slugs.map(String) : [])) }) }
  catch (e: any) { return bad(e?.message || 'Could not apply.', 409) }
}

export async function DELETE(req: NextRequest) {
  if (!(await admin(req))) return bad('Unauthorised', 401)
  try { return NextResponse.json({ ok: true, ...(await undoBatch(new URL(req.url).searchParams.get('batch') || '')) }) }
  catch (e: any) { return bad(e?.message || 'Could not undo.', 409) }
}
