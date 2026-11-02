import mongoose from 'mongoose'
import { Temple } from '@/models'
import { BATCHES, type BatchItem } from '@/data/batches'

const MIN_DESC = 120
export const isHttps = (u: unknown) => typeof u === 'string' && /^https:\/\/[^\s/]+\.[^\s]+$/.test(u)
const textLen = (t: any) => String(t?.extended_description || t?.description || '').trim().length

export interface Change { field: string; from: string; to: string }
export interface Row { slug: string; name: string; found: boolean; changes: Change[]; skipped: string[]; item: BatchItem }

/** What applying this batch would change. Only empty or too-short fields are filled; nothing already good is overwritten. */
export async function previewBatch(batchId: string): Promise<{ id: string; title: string; rows: Row[] } | null> {
  const b = BATCHES.find(x => x.id === batchId); if (!b) return null
  const docs: any[] = await (Temple as any).find({ slug: { $in: b.items.map(i => i.slug) } }).setOptions({ includeHidden: true }).select('slug name hidden description extended_description official_website city state district timing how_to_reach').lean()
  const rows: Row[] = b.items.map(item => {
    const t = docs.find(d => d.slug === item.slug)
    const r: Row = { slug: item.slug, name: t?.name || item.slug, found: !!t, changes: [], skipped: [], item }
    if (!t) {
      const n = item.new_temple
      if (n && item.description && item.description.trim().length >= MIN_DESC) {
        r.name = n.name
        r.changes.push({ field: 'create', from: '', to: `${n.name}, ${n.city}${n.district ? ' (' + n.district + ' district)' : ''}, ${n.state}. Deity: ${n.deity}. Type: ${n.type}.${isHttps(item.official_website) ? ' Website: ' + item.official_website + '.' : ''}\n\n${item.description.trim()}` })
      } else r.skipped.push('Temple not found on the portal')
      return r
    }
    if (item.description && item.description.trim().length >= MIN_DESC) {
      const was = item.replaces_batch ? BATCHES.find(x => x.id === item.replaces_batch)?.items.find(i => i.slug === item.slug) : undefined
      const untouched = !!was?.description && String(t.description || '').trim() === was.description.trim()
      if (textLen(t) < MIN_DESC) r.changes.push({ field: 'description', from: t.description || '', to: item.description.trim() })
      else if (untouched && item.description.trim() !== String(t.description || '').trim()) r.changes.push({ field: 'description', from: t.description || '', to: item.description.trim() })
      else if (item.replaces_live && String(t.description || '').trim() === item.replaces_live.trim() && item.description.trim() !== String(t.description || '').trim()) r.changes.push({ field: 'description', from: t.description || '', to: item.description.trim() })
      else if (item.replaces_live) r.skipped.push('The live text has been changed since this batch was prepared, so it is kept')
      else if (item.replaces_batch && !untouched) r.skipped.push('The live text has been changed since ' + item.replaces_batch + ', so it is kept')
      else r.skipped.push('Already has a full description, so it is kept')
    } else r.skipped.push('No verified description in this batch')
    if (isHttps(item.official_website)) {
      if (!t.official_website) r.changes.push({ field: 'official_website', from: '', to: item.official_website! })
      else r.skipped.push('Already has an official website, so it is kept')
    } else if (!item.set_fields?.length) r.skipped.push('No verified official website in this batch')
    for (const sf of item.set_fields || []) {
      const cur = (t as any)[sf.field] || null
      if (cur === (sf.from || null) && cur !== sf.to) r.changes.push({ field: 'set:' + sf.field, from: cur || '', to: sf.to })
      else r.skipped.push('Correction to ' + sf.field + ' not applied because the live value is no longer "' + (sf.from || 'empty') + '"')
    }
    if (item.hide) {
      if (!t.hidden) r.changes.push({ field: 'hide:flag', from: 'Visible', to: 'Hidden: ' + item.hide.reason })
      else r.skipped.push('Already hidden')
    }
    const sd = item.set_details
    if (sd) {
      if (typeof sd.timing === 'string' && sd.timing.trim() && sd.timing.trim() !== String((t as any).timing || '').trim()) r.changes.push({ field: 'det:timing', from: String((t as any).timing || ''), to: sd.timing.trim() })
      else if (sd.timing) r.skipped.push('Timing already matches the verified one')
      const cur = (t as any).how_to_reach
      const curEmpty = !cur || (typeof cur === 'object' && !Object.values(cur).some(v => String(v || '').trim()))
      if (sd.how_to_reach && Object.values(sd.how_to_reach).some(v => v)) {
        if (curEmpty) r.changes.push({ field: 'det:how_to_reach', from: '', to: Object.entries(sd.how_to_reach).filter(([, v]) => v).map(([k, v]) => k.replace('by_', 'By ') + ': ' + v).join('\n') })
        else r.skipped.push('Already has travel details, so they are kept')
      }
    }
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
    const mk = r.changes.find(c => c.field === 'create')
    if (mk) {
      const n = r.item.new_temple!
      if (await (Temple as any).exists({ slug: r.slug })) continue
      await (Temple as any).create({
        slug: r.slug, name: n.name, state: n.state, city: n.city, district: n.district || undefined, deity: n.deity, type: n.type,
        description: r.item.description!.trim(), categories: [n.type], has_live: false,
        ...(isHttps(r.item.official_website) ? { official_website: r.item.official_website } : {}),
        ...(typeof n.lat === 'number' && typeof n.lng === 'number' ? { lat: n.lat, lng: n.lng } : {}),
        description_batch: batchId, description_verified_at: new Date(), description_sources: r.item.sources.map(s => s.url),
      })
      log.push({ slug: r.slug, created: true, fields: ['create'] })
      continue
    }
    const set: any = {}
    if (r.changes.some(c => !c.field.startsWith('set:') && !c.field.startsWith('det:') && !c.field.startsWith('hide:'))) { set.description_batch = batchId; set.description_verified_at = new Date() }
    for (const c of r.changes) {
      if (c.field === 'det:timing') { set.timing = c.to; set.timing_source = r.item.set_details?.timing_source || null; set.timing_verified_at = new Date() }
      else if (c.field === 'hide:flag') { set.hidden = true; set.hidden_reason = r.item.hide!.reason }
      else if (c.field === 'det:how_to_reach') set.how_to_reach = r.item.set_details!.how_to_reach
      else set[c.field.startsWith('set:') ? c.field.slice(4) : c.field] = c.to
    }
    if (r.changes.some(c => c.field === 'description')) set.description_sources = r.item.sources.map(s => s.url)
    const prev = await (Temple as any).findOne({ slug: r.slug }).setOptions({ includeHidden: true }).select('name hidden description official_website description_sources description_batch description_verified_at city state district timing how_to_reach timing_source timing_verified_at').lean()
    await (Temple as any).updateOne({ slug: r.slug }, { $set: set })
    log.push({ slug: r.slug, previous: { name: prev?.name ?? null, description: prev?.description ?? null, official_website: prev?.official_website ?? null, description_sources: prev?.description_sources ?? null, city: prev?.city ?? null, state: prev?.state ?? null, district: prev?.district ?? null, timing: prev?.timing ?? null, how_to_reach: prev?.how_to_reach ?? null, timing_source: prev?.timing_source ?? null, timing_verified_at: prev?.timing_verified_at ?? null }, fields: r.changes.map(c => c.field) })
  }
  await col().replaceOne({ _id: batchId as any }, { _id: batchId, applied_at: new Date(), items: log }, { upsert: true })
  return { applied: log.length, skipped: pv.rows.length - log.length }
}

export async function undoBatch(batchId: string) {
  const rec: any = await col().findOne({ _id: batchId as any })
  if (!rec || rec.undone_at) throw new Error('This batch is not currently applied.')
  for (const it of rec.items) {
    if (it.created) { await (Temple as any).deleteOne({ slug: it.slug, description_batch: batchId }); continue }
    const unset: any = it.fields.some((f: string) => !f.startsWith('set:') && !f.startsWith('det:') && !f.startsWith('hide:')) ? { description_batch: '', description_verified_at: '' } : {}
    const set: any = {}
    for (const f of it.fields) {
      if (f === 'description') { set.description = it.previous.description ?? ''; if (it.previous.description_sources) set.description_sources = it.previous.description_sources; else unset.description_sources = '' }
      if (f.startsWith('set:')) { const k = f.slice(4); if (k !== 'official_website') { if (it.previous[k]) set[k] = it.previous[k]; else unset[k] = '' } else if (it.previous.official_website) set.official_website = it.previous.official_website; else unset.official_website = '' }
      if (f === 'det:timing') { if (it.previous.timing) set.timing = it.previous.timing; else unset.timing = ''; unset.timing_source = ''; unset.timing_verified_at = ''; if (it.previous.timing_source) { set.timing_source = it.previous.timing_source; delete unset.timing_source } if (it.previous.timing_verified_at) { set.timing_verified_at = it.previous.timing_verified_at; delete unset.timing_verified_at } }
      if (f === 'hide:flag') { unset.hidden = ''; unset.hidden_reason = '' }
      if (f === 'det:how_to_reach') { if (it.previous.how_to_reach) set.how_to_reach = it.previous.how_to_reach; else unset.how_to_reach = '' }
      if (f === 'official_website') { if (it.previous.official_website) set.official_website = it.previous.official_website; else unset.official_website = '' }
    }
    await (Temple as any).updateOne({ slug: it.slug }, { ...(Object.keys(set).length ? { $set: set } : {}), ...(Object.keys(unset).length ? { $unset: unset } : {}) })
  }
  await col().updateOne({ _id: batchId as any }, { $set: { undone_at: new Date() } })
  return { restored: rec.items.length }
}

export async function batchStatus(): Promise<Record<string, { applied_at: Date; undone_at?: Date; count: number }>> {
  const recs: any[] = await col().find({}).toArray()
  return Object.fromEntries(recs.map(r => [r._id, { applied_at: r.applied_at, undone_at: r.undone_at, count: r.items?.length || 0 }]))
}
