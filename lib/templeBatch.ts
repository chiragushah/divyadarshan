import mongoose from 'mongoose'
import { Temple } from '@/models'
import { BATCHES, type BatchItem } from '@/data/batches'

const MIN_DESC = 120
export const isHttps = (u: unknown) => typeof u === 'string' && /^https:\/\/[^\s/]+\.[^\s]+$/.test(u)
const textLen = (t: any) => String(t?.extended_description || t?.description || '').trim().length

export interface Change { field: 'description' | 'official_website'; from: string; to: string }
export interface Row { slug: string; name: string; found: boolean; changes: Change[]; skipped: string[]; item: BatchItem }

/** What applying this batch would change. Only empty or too-short fields are filled; nothing already good is overwritten. */
export async function previewBatch(batchId: string): Promise<{ id: string; title: string; rows: Row[] } | null> {
  const b = BATCHES.find(x => x.id === batchId); if (!b) return null
  const docs: any[] = await (Temple as any).find({ slug: { $in: b.items.map(i => i.slug) } }).select('slug name description extended_description official_website').lean()
  const rows: Row[] = b.items.map(item => {
    const t = docs.find(d => d.slug === item.slug)
    const r: Row = { slug: item.slug, name: t?.name || item.slug, found: !!t, changes: [], skipped: [], item }
    if (!t) { r.skipped.push('Temple not found on the portal'); return r }
    if (item.description && item.description.trim().length >= MIN_DESC) {
      const was = item.replaces_batch ? BATCHES.find(x => x.id === item.replaces_batch)?.items.find(i => i.slug === item.slug) : undefined
      const untouched = !!was?.description && String(t.description || '').trim() === was.description.trim()
      if (textLen(t) < MIN_DESC) r.changes.push({ field: 'description', from: t.description || '', to: item.description.trim() })
      else if (untouched && item.description.trim() !== String(t.description || '').trim()) r.changes.push({ field: 'description', from: t.description || '', to: item.description.trim() })
      else if (item.replaces_batch && !untouched) r.skipped.push('The live text has been changed since ' + item.replaces_batch + ', so it is kept')
      else r.skipped.push('Already has a full description, so it is kept')
    } else r.skipped.push('No verified description in this batch')
    if (isHttps(item.official_website)) {
      if (!t.official_website) r.changes.push({ field: 'official_website', from: '', to: item.official_website! })
      else r.skipped.push('Already has an official website, so it is kept')
    } else r.skipped.push('No verified official website in this batch')
    return r
  })
  return { id: b.id, title: b.title, rows }
}

const col = () => mongoose.connection.db!.collection('temple_batches')

export async function applyBatch(batchId: string, slugs: string[]) {
  const pv = await previewBatch(batchId); if (!pv) throw new Error('Unknown batch')
  const existing = await col().findOne({ _id: batchId as any })
  if (existing && !existing.undone_at) throw new Error('This batch is already applied. Undo it first to apply again.')
  const chosen = pv.rows.filter(r => r.changes.length && (!slugs.length || slugs.includes(r.slug)))
  const log: any[] = []
  for (const r of chosen) {
    const set: any = { description_batch: batchId, description_verified_at: new Date() }
    for (const c of r.changes) set[c.field] = c.to
    if (r.changes.some(c => c.field === 'description')) set.description_sources = r.item.sources.map(s => s.url)
    const prev = await (Temple as any).findOne({ slug: r.slug }).select('description official_website description_sources description_batch description_verified_at').lean()
    await (Temple as any).updateOne({ slug: r.slug }, { $set: set })
    log.push({ slug: r.slug, previous: { description: prev?.description ?? null, official_website: prev?.official_website ?? null, description_sources: prev?.description_sources ?? null }, fields: r.changes.map(c => c.field) })
  }
  await col().replaceOne({ _id: batchId as any }, { _id: batchId, applied_at: new Date(), items: log }, { upsert: true })
  return { applied: log.length, skipped: pv.rows.length - log.length }
}

export async function undoBatch(batchId: string) {
  const rec: any = await col().findOne({ _id: batchId as any })
  if (!rec || rec.undone_at) throw new Error('This batch is not currently applied.')
  for (const it of rec.items) {
    const unset: any = { description_batch: '', description_verified_at: '' }
    const set: any = {}
    for (const f of it.fields) {
      if (f === 'description') { set.description = it.previous.description ?? ''; if (it.previous.description_sources) set.description_sources = it.previous.description_sources; else unset.description_sources = '' }
      if (f === 'official_website') { if (it.previous.official_website) set.official_website = it.previous.official_website; else unset.official_website = '' }
    }
    await (Temple as any).updateOne({ slug: it.slug }, { ...(Object.keys(set).length ? { $set: set } : {}), $unset: unset })
  }
  await col().updateOne({ _id: batchId as any }, { $set: { undone_at: new Date() } })
  return { restored: rec.items.length }
}

export async function batchStatus(): Promise<Record<string, { applied_at: Date; undone_at?: Date; count: number }>> {
  const recs: any[] = await col().find({}).toArray()
  return Object.fromEntries(recs.map(r => [r._id, { applied_at: r.applied_at, undone_at: r.undone_at, count: r.items?.length || 0 }]))
}
