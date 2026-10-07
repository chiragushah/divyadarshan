// ─────────────────────────────────────────────────────────────────────────────
// Festival date parsing + .ics reminder generation.
//
// The festival data carries human-readable 2026/2027 date strings (e.g.
// "8 November 2026", "19–26 March 2026", "~9 December 2027 (confirm locally)").
// This extracts a reliable single calendar date from them so we can show
// "upcoming" countdowns and generate an "Add to Calendar" reminder (.ics).
// Festivals whose timing is year-round or has no clean date (Satyanarayan,
// Pradosh, Appayya) are simply skipped — we never invent a date.
// ─────────────────────────────────────────────────────────────────────────────

import type { Festival } from '@/lib/data/festivals'

const MONTHS: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
}

// Find the LAST "<day> <Month> <year>" in a string (for ranges like
// "19–26 March 2026" this gives the final, anchor day; for a single date it is
// that date). Returns a Date at local midnight, or null.
function parseDateString(s: string | undefined, year: number): Date | null {
  if (!s) return null
  const re = new RegExp(`(\\d{1,2})\\s+(january|february|march|april|may|june|july|august|september|october|november|december)\\s+${year}`, 'gi')
  let m: RegExpExecArray | null
  let last: Date | null = null
  while ((m = re.exec(s)) !== null) {
    const day = parseInt(m[1], 10)
    const mon = MONTHS[m[2].toLowerCase()]
    if (mon !== undefined && day >= 1 && day <= 31) last = new Date(year, mon, day)
  }
  return last
}

export interface NextOccurrence {
  date: Date
  year: number
  display: string   // the human date text from the data
  approx: boolean   // true if the source text hedged ("~", "confirm locally")
  daysAway: number
}

// The next real occurrence of a festival on/after `from`, preferring the 2026
// date, else rolling to the 2027 date. Null when no clean date exists.
export function nextOccurrence(f: Festival, from: Date = new Date()): NextOccurrence | null {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate())
  const src2026 = f.dates2026
  const src2027 = f.dates2027

  const d2026 = parseDateString(src2026, 2026)
  const d2027 = parseDateString(src2027, 2027)

  let date: Date | null = null
  let year = 0
  let display = ''
  let approx = false

  if (d2026 && d2026 >= today) {
    date = d2026; year = 2026; display = cleanDisplay(src2026!); approx = isApprox(src2026!)
  } else if (d2027 && d2027 >= today) {
    date = d2027; year = 2027; display = cleanDisplay(src2027!); approx = isApprox(src2027!)
  } else if (d2027) {
    // 2026 already passed and no future 2027 parse >= today shouldn't happen,
    // but keep 2027 as the forward-looking value.
    date = d2027; year = 2027; display = cleanDisplay(src2027!); approx = isApprox(src2027!)
  }

  if (!date) return null
  const daysAway = Math.round((date.getTime() - today.getTime()) / 86400000)
  return { date, year, display, approx, daysAway }
}

function isApprox(s: string): boolean {
  return /~|confirm|approx|varies|year-round|any /i.test(s)
}

function cleanDisplay(s: string): string {
  // Keep the first clause, drop trailing parenthetical for a tidy chip.
  let out = s.split(';')[0]
  out = (out.includes('(') ? out.split('(')[0] : out).trim()
  return out.replace(/^~\s*/, '')
}

function fmtICSDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}${m}${day}`
}

// Build an all-day .ics event with a reminder alarm 1 day before at 9am.
export function buildICS(opts: { title: string; date: Date; description?: string; url?: string }): string {
  const start = fmtICSDate(opts.date)
  const end = fmtICSDate(new Date(opts.date.getTime() + 86400000))
  const uid = `${start}-${opts.title.replace(/[^a-z0-9]/gi, '').toLowerCase()}@divyadarshanam`
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  const esc = (t: string) => (t || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//DivyaDarshanam//Festival Reminders//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${esc(opts.title)}`,
    opts.description ? `DESCRIPTION:${esc(opts.description)}${opts.url ? esc('\n' + opts.url) : ''}` : '',
    opts.url ? `URL:${opts.url}` : '',
    'BEGIN:VALARM',
    'TRIGGER:-P1DT0H0M0S',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(opts.title)} is tomorrow`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)
  return lines.join('\r\n')
}
