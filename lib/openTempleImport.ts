// Open-data temple import (Wikidata, CC0).
// Pure functions only: no database access here, so the logic can be tested on its own.
import raw from '@/data/open-temples.json'

export interface OpenTemple {
  id: string; name: string | null; native: string | null; hindi: string | null
  deity: string | null; deity_source: string | null; state: string | null; district: string | null
  locality: string | null; lat: number | null; lng: number | null; style: string | null
  year: string | null; era: string | null; circuits: string | null; heritage: string | null
  part_of: string | null; wikipedia: string | null; wikidata: string | null; name_source: string | null
}
export interface Existing { slug: string; name: string; state: string; lat?: number; lng?: number; wikidata_id?: string; city?: string; district?: string }

export const SOURCE = 'Wikidata'
export const LICENCE = 'CC0 1.0 (public domain dedication)'
export const OPEN_TEMPLES = raw as unknown as OpenTemple[]

// ── Text helpers ────────────────────────────────────────────────────────────
export const slugify = (s: string) =>
  s.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)

const STOP = new Set(['temple', 'mandir', 'mandira', 'shri', 'shree', 'sri', 'sree', 'of', 'the', 'devasthan', 'devasthanam', 'devalaya', 'and', 'at', 'in', 'ji', 'shrine', 'kshetra', 'dham'])
const ALIASES: Record<string, string> = { mahadeva: 'mahadev', mahadeo: 'mahadev', ganpati: 'ganapati', ganesh: 'ganesha', hanumaan: 'hanuman', maruti: 'hanuman', shiv: 'shiva', mata: 'mata', mataji: 'mata', devi: 'devi' }
export function nameTokens(full: string): string[] {
  const n = full.split(',')[0]            // "Bhavnath Temple, Mau": the part after the comma is the village
  return n.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/)
    .filter(Boolean).map(t => ALIASES[t] || t).filter(t => !STOP.has(t))
}
const GENERIC = new Set(['sun', 'surya', 'shiva', 'shiv', 'ganesha', 'hanuman', 'vishnu', 'devi', 'mata', 'ram', 'rama', 'krishna', 'mahadev', 'jain', 'old', 'new', 'main', 'kali', 'durga', 'balaji', 'vitthal', 'datta', 'khandoba', 'temples', 'group', 'swaminarayan', 'jagannath', 'ambe', 'ambaji', 'jalaram'])
const distinctive = (tk: string[]) => tk.length >= 2 || (tk.length === 1 && !GENERIC.has(tk[0]))
const jaccard = (a: string[], b: string[]) => {
  const A = new Set(a), B = new Set(b); if (!A.size || !B.size) return 0
  let i = 0; A.forEach(x => { if (B.has(x)) i++ })
  return i / (A.size + B.size - i)
}
export function km(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371, r = Math.PI / 180, dLat = (bLat - aLat) * r, dLng = (bLng - aLng) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * r) * Math.cos(bLat * r) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)))
}

// A native-script label is shown only when it is in the script people actually use in that state.
const RANGES: Record<string, [number, number]> = { dev: [0x0900, 0x097f], guj: [0x0a80, 0x0aff] }
const INDIC = /[ऀ-෿]/
const hasRange = (s: string, k: 'dev' | 'guj') => [...s].some(c => { const p = c.codePointAt(0)!; return p >= RANGES[k][0] && p <= RANGES[k][1] })
export function nativeFor(state: string, label: string | null): string | null {
  if (!label) return null
  const want: 'dev' | 'guj' = state === 'Gujarat' ? 'guj' : 'dev'
  if (!hasRange(label, want)) return null
  const other = [...label].some(c => { const p = c.codePointAt(0)!; const w = RANGES[want]; return INDIC.test(c) && !(p >= w[0] && p <= w[1]) })
  return other ? null : label
}

// ── Exclusions: things in the file that are not temples to visit ─────────────
const NOT_TEMPLE = /\b(chh?atri|chattri|talim|akhada|vyayam)\b/i
export function exclusionReason(t: OpenTemple): string | null {
  if (!t.name) return 'No name'
  if (NOT_TEMPLE.test(t.name)) return 'Cenotaph or gymnasium, not a temple'
  if (!t.state) return 'No state'
  if (t.lat != null && t.lng != null && !(t.lat >= 6 && t.lat <= 37.5 && t.lng >= 68 && t.lng <= 98)) return 'Coordinates are outside India'
  return null
}

// ── Duplicate detection against what is already on the portal ───────────────
export interface DupMatch { slug: string; name: string; reason: string }
export function findDuplicate(t: OpenTemple, pool: Existing[]): DupMatch | null {
  const tk = nameTokens(t.name || '')
  const key = tk.join(' ')
  for (const e of pool) {
    if (e.wikidata_id && t.wikidata && t.wikidata.endsWith(e.wikidata_id)) return { slug: e.slug, name: e.name, reason: 'Same Wikidata ID' }
    if (e.state && t.state && e.state.toLowerCase() !== t.state.toLowerCase()) continue
    const ek = nameTokens(e.name)
    const same = key && key === ek.join(' ')
    const near = t.lat != null && t.lng != null && e.lat != null && e.lng != null ? km(t.lat, t.lng, e.lat, e.lng) : null
    const sim = jaccard(tk, ek)
    const ts = (t.name || '').split(',')[1]?.trim().toLowerCase(), es = e.name.split(',')[1]?.trim().toLowerCase()
    if (near == null && ts && es && ts !== es) continue          // different villages named after the comma
    // A name of one generic word ("Sun Temple") proves nothing without location evidence.
    if (same && near != null && near <= 1) return { slug: e.slug, name: e.name, reason: `Same name, ${near.toFixed(1)} km apart` }
    if (same && near == null && distinctive(tk)) return { slug: e.slug, name: e.name, reason: 'Same distinctive name in same state' }
    if (near != null && near <= 1.5 && sim >= 0.6) return { slug: e.slug, name: e.name, reason: `Very similar name, ${near.toFixed(1)} km apart` }
  }
  return null
}

// ── Building a portal record ────────────────────────────────────────────────
function deityType(d: string | null): { deity: string; type: string; categories: string[] } {
  if (!d) return { deity: 'To be confirmed', type: 'Temple', categories: [] }
  const x = d.toLowerCase()
  const type = /devi|durga|mata|shakti|kali|ambika|amba|bhavani|chamunda|karni/.test(x) ? 'Shakti'
    : /shiva|shankar|mahadev|jyotirlinga|linga/.test(x) ? 'Shiva'
    : /vishnu|krishna|rama|balaji|narayan|jagannath|vitthal|vithoba|gopinath|vamana/.test(x) ? 'Vishnu'
    : /ganesh|ganapati|vinayak/.test(x) ? 'Ganesha'
    : /hanuman|maruti/.test(x) ? 'Hanuman'
    : /surya|sun/.test(x) ? 'Surya' : 'Temple'
  return { deity: d, type, categories: type === 'Temple' ? [] : [type] }
}

export function describe(t: OpenTemple): string {
  const place = [t.locality, t.district, t.state].filter(Boolean).join(', ')
  const parts = [`${t.name} is a temple in ${place}.`]
  if (t.part_of) parts.push(`It is part of ${t.part_of}.`)
  if (t.heritage) parts.push(`Heritage status: ${t.heritage}.`)
  if (t.year || t.era) {
    const when = t.year && t.era ? `about ${t.year} CE (${t.era})` : t.year ? `about ${t.year} CE` : t.era
    parts.push(`Recorded construction date: ${when}.`)
  }
  if (t.circuits) parts.push(`Pilgrimage circuit: ${t.circuits}.`)
  if (t.style) parts.push(`Architectural style: ${t.style}.`)
  return parts.join(' ')
}

export function completeness(t: OpenTemple) {
  const have = [t.deity, t.district, t.lat != null, t.wikipedia, t.locality, t.native || t.hindi].filter(Boolean).length
  return Math.round((have / 6) * 100)
}

export function buildRecord(t: OpenTemple, slug: string, batch: string) {
  const dt = deityType(t.deity)
  const city = t.locality || t.district || t.state || ''
  return {
    slug, name: t.name!, state: t.state!, city, district: t.district || undefined,
    deity: dt.deity, type: dt.type, categories: dt.categories, description: describe(t),
    lat: t.lat ?? undefined, lng: t.lng ?? undefined,
    native_name: nativeFor(t.state!, t.native) || undefined, name_hindi: hindiFor(t.hindi) || undefined,
    deity_source: t.deity ? (t.deity_source || 'Wikidata') : undefined,
    heritage_status: t.heritage || undefined, part_of: t.part_of || undefined,
    wikipedia_url: t.wikipedia || undefined, wikidata_id: (t.wikidata || '').split('/').pop() || undefined,
    name_source: t.name_source || undefined,
    is_basic: true, data_source: SOURCE, source_url: t.wikidata || undefined, licence: LICENCE, import_batch: batch,
    has_live: false, rating_avg: 0, rating_count: 0,
  }
}
const hindiFor = (s: string | null) => (s && hasRange(s, 'dev') ? s : null)

// ── The whole plan (no writes) ──────────────────────────────────────────────
export interface PlanRow { id: string; name: string; state: string; district: string | null; deity: string | null; deity_source: string | null; completeness: number; slug: string; has_coords: boolean; name_source: string | null }
export interface Plan {
  total: number
  fresh: PlanRow[]
  duplicates: { id: string; name: string; state: string; match: DupMatch }[]
  excluded: { id: string; name: string; state: string; reason: string }[]
}

export function makePlan(existing: Existing[], source: OpenTemple[] = OPEN_TEMPLES): Plan {
  const plan: Plan = { total: source.length, fresh: [], duplicates: [], excluded: [] }
  const takenSlugs = new Set(existing.map(e => e.slug))
  const pool: Existing[] = [...existing]
  for (const t of source) {
    const why = exclusionReason(t)
    if (why) { plan.excluded.push({ id: t.id, name: t.name || '(no name)', state: t.state || '', reason: why }); continue }
    const dup = findDuplicate(t, pool)
    if (dup) { plan.duplicates.push({ id: t.id, name: t.name!, state: t.state!, match: dup }); continue }
    let slug = slugify(`${t.name}-${t.district || t.state}`)
    if (takenSlugs.has(slug)) slug = slugify(`${t.name}-${(t.wikidata || t.id).split('/').pop()}`)
    takenSlugs.add(slug)
    pool.push({ slug, name: t.name!, state: t.state!, lat: t.lat ?? undefined, lng: t.lng ?? undefined, wikidata_id: (t.wikidata || '').split('/').pop() })
    plan.fresh.push({ id: t.id, name: t.name!, state: t.state!, district: t.district, deity: t.deity, deity_source: t.deity_source, completeness: completeness(t), slug, has_coords: t.lat != null, name_source: t.name_source })
  }
  return plan
}
