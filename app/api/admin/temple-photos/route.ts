import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Temple } from '@/models'
import { findPhotos, isGeneric } from '@/lib/templePhotos'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

async function admin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return null
  await connectDB()
  return (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }).lean() as Promise<any>
}
const bad = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s })
const col = () => mongoose.connection.db!.collection('temple_photo_log')

// GET: temples that need a photo. GET ?find=slug1,slug2 : candidate photos for those temples (max 4 per call).
export async function GET(req: NextRequest) {
  if (!(await admin(req))) return bad('Unauthorised', 401)
  const find = new URL(req.url).searchParams.get('find')
  if (find) {
    const slugs = find.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4)
    const ts: any[] = await (Temple as any).find({ slug: { $in: slugs } }).select('slug name city state').lean()
    const results = await Promise.all(ts.map(async t => ({ slug: t.slug, candidates: await findPhotos(t.name, t.city, t.state) })))
    return NextResponse.json({ results })
  }
  const all: any[] = await (Temple as any).find({}).select('slug name city state image_url image_credit').sort({ name: 1 }).lean()
  const need = all.filter(t => !t.image_url || isGeneric(t.image_url)).map(t => ({ slug: t.slug, name: t.name, city: t.city, state: t.state, current: t.image_url || null, reason: t.image_url ? 'generic picture of another temple' : 'no photo' }))
  const logs: any[] = await col().find({}).sort({ at: -1 }).limit(5).toArray()
  return NextResponse.json({ total: all.length, need, logs: logs.map(l => ({ id: String(l._id), at: l.at, count: l.items.length, undone: !!l.undone_at })) })
}

// POST: apply chosen photos. DELETE ?log=id : undo one apply.
export async function POST(req: NextRequest) {
  if (!(await admin(req))) return bad('Unauthorised', 401)
  const b = await req.json().catch(() => ({}))
  if (b.confirm !== 'APPLY') return bad('Type APPLY to confirm.')
  const items: any[] = Array.isArray(b.items) ? b.items : []
  const log: any[] = []
  for (const it of items) {
    const url = String(it.image_url || '')
    if (!/^https:\/\/upload\.wikimedia\.org\//.test(url) || !it.image_credit) continue
    const prev: any = await (Temple as any).findOne({ slug: String(it.slug) }).select('image_url image_credit image_credit_url').lean()
    if (!prev) continue
    await (Temple as any).updateOne({ slug: String(it.slug) }, { $set: { image_url: url, image_credit: String(it.image_credit).slice(0, 160), image_credit_url: String(it.image_credit_url || '') } })
    log.push({ slug: String(it.slug), prev: { image_url: prev.image_url ?? null, image_credit: prev.image_credit ?? null, image_credit_url: prev.image_credit_url ?? null } })
  }
  if (log.length) await col().insertOne({ at: new Date(), items: log })
  return NextResponse.json({ ok: true, applied: log.length })
}

export async function DELETE(req: NextRequest) {
  if (!(await admin(req))) return bad('Unauthorised', 401)
  const id = new URL(req.url).searchParams.get('log') || ''
  const rec: any = await col().findOne({ _id: new mongoose.Types.ObjectId(id) } as any)
  if (!rec || rec.undone_at) return bad('Nothing to undo.', 409)
  for (const it of rec.items) {
    const set: any = {}, unset: any = {}
    for (const k of ['image_url', 'image_credit', 'image_credit_url']) { if (it.prev[k]) set[k] = it.prev[k]; else unset[k] = '' }
    await (Temple as any).updateOne({ slug: it.slug }, { ...(Object.keys(set).length ? { $set: set } : {}), ...(Object.keys(unset).length ? { $unset: unset } : {}) })
  }
  await col().updateOne({ _id: rec._id }, { $set: { undone_at: new Date() } })
  return NextResponse.json({ ok: true, restored: rec.items.length })
}
