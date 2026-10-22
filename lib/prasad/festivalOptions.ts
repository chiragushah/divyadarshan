import { FESTIVALS } from '@/lib/data/festivals'
import { nextOccurrence } from '@/lib/festivalDates'
import { entriesForFestival } from '@/lib/data/prasad'
import type { FestOpt } from '@/components/prasad/ReminderBox'

export function isoOf(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

/** Festivals that have cooked prasad AND a clean calendar date, soonest first. */
export function festivalOptions(): FestOpt[] {
  const out: (FestOpt & { t: number })[] = []
  for (const f of FESTIVALS) {
    if (!entriesForFestival(f.slug)?.entries.some(e => e.kind === 'recipe')) continue
    const occ = nextOccurrence(f)
    if (!occ) continue
    out.push({ slug: f.slug, name: f.name, iso: isoOf(occ.date), display: occ.display, approx: occ.approx, t: occ.date.getTime() })
  }
  return out.sort((a, b) => a.t - b.t).map(({ t, ...rest }) => rest)
}
