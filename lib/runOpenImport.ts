import mongoose from 'mongoose'
import { Temple } from '@/models'
import { OPEN_TEMPLES, makePlan, buildRecord, type Existing } from '@/lib/openTempleImport'

export async function existingTemples(): Promise<Existing[]> {
  const rows = await (Temple as any).find({}).select('slug name state lat lng wikidata_id').lean()
  return rows.map((r: any) => ({ slug: r.slug, name: r.name, state: r.state, lat: r.lat, lng: r.lng, wikidata_id: r.wikidata_id }))
}

// Adds every new, non-duplicate temple. Safe to repeat: temples already imported are recognised and skipped.
export async function runOpenImport(states: string[] = []) {
  const plan = makePlan(await existingTemples())
  const wanted = new Set(plan.fresh.filter(r => !states.length || states.includes(r.state)).map(r => r.id))
  const batch = `open-wikidata-${new Date().toISOString().slice(0, 10)}-${Date.now().toString(36)}`
  const docs = OPEN_TEMPLES.filter(t => wanted.has(t.id)).map(t => buildRecord(t, plan.fresh.find(r => r.id === t.id)!.slug, batch))
  if (!docs.length) return { batch, inserted: 0, attempted: 0, failed: [] as string[] }
  let inserted = 0; const failed: string[] = []
  try {
    const res: any = await (Temple as any).insertMany(docs, { ordered: false })
    inserted = res.length
  } catch (e: any) {
    inserted = e?.insertedDocs?.length ?? e?.result?.insertedCount ?? 0
    for (const we of e?.writeErrors || []) failed.push(String(we?.err?.op?.slug || we?.errmsg || 'unknown').slice(0, 120))
  }
  return { batch, inserted, attempted: docs.length, failed: failed.slice(0, 20) }
}

// One-time automatic import. A marker is written first, so an admin "Undo" is never re-applied overnight.
export async function autoImportOnce() {
  const flags = mongoose.connection.db!.collection('system_flags')
  const done = await flags.findOne({ _id: 'open_import_v1' as any })
  if (done) return { skipped: true }
  await flags.insertOne({ _id: 'open_import_v1' as any, at: new Date() })
  try { return { skipped: false, ...(await runOpenImport()) } }
  catch (e: any) { await flags.deleteOne({ _id: 'open_import_v1' as any }); throw e }   // failed: allow a retry tomorrow
}

export async function markAutoImportDone() {
  await mongoose.connection.db!.collection('system_flags').updateOne({ _id: 'open_import_v1' as any }, { $setOnInsert: { at: new Date(), by: 'admin' } }, { upsert: true })
}
