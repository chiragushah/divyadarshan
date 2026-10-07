// ─────────────────────────────────────────────────────────────────────────────
// Best-Time-to-Visit engine (Tier 1 — rule-based, deterministic).
//
// This never claims a live "wait = N minutes". It produces *typical-pattern*
// guidance from facts we actually know: the deity's weekly peak day, the daily
// darshan rhythm, lunar/eclipse rushes, the temple's open season, and the
// festivals that cause big crowds AT THIS temple (cross-referenced with the
// festival calendar). Everything is labelled as a pattern, not a live reading.
// ─────────────────────────────────────────────────────────────────────────────

import { FESTIVALS } from '@/lib/data/festivals'

export interface BestTimeInput {
  slug?: string
  name?: string
  deity?: string
  type?: string
  timing?: string
  best_time?: string
  festivals?: string[] | string   // the Temple model stores this as a comma-separated string
  open_months?: number[]
  closed_months?: number[]
  seasonal_note?: string
  is_seasonal?: boolean
}

export interface FestivalPeak {
  name: string
  when: string
}

export interface BestTimeResult {
  overall: string
  quietDays: string[]
  busyDays: string[]
  deityNote: string
  dailyBest: string[]
  dailyAvoid: string[]
  templeTiming?: string
  templeBestTime?: string
  lunarNote: string
  seasonalNote?: string
  festivalPeaks: FestivalPeak[]
}

interface DeityProfile {
  match: RegExp
  peakDays: string[]
  quietDays: string[]
  note: string
}

const MONTH_NAMES = ['', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const DEITY_PROFILES: DeityProfile[] = [
  {
    match: /venkateswara|balaji|tirumala|tirupati|srinivasa/,
    peakDays: ['Saturday', 'Sunday'], quietDays: ['Tuesday', 'Wednesday', 'Thursday'],
    note: 'Saturdays are Lord Venkateswara’s day and the busiest; Brahmotsavam and Vaikunta Ekadashi bring the largest crowds of the year.',
  },
  {
    match: /ayyappa|sabarimala|sastha|dharma shasta/,
    peakDays: ['Saturday'], quietDays: ['Tuesday', 'Wednesday'],
    note: 'Open mainly in the Mandala–Makaravilakku season (mid-November to mid-January) and the first day of each Malayalam month; the Makaravilakku day draws the single biggest crowd.',
  },
  {
    match: /shani|saturn|shingnapur/,
    peakDays: ['Saturday'], quietDays: ['Monday', 'Wednesday', 'Thursday'],
    note: 'Saturdays are Lord Shani’s day and overwhelmingly the busiest; Amavasya (new moon) adds to the rush.',
  },
  {
    match: /hanuman|anjaney|bajrang|maruti|sankat ?mochan|balaji hanuman/,
    peakDays: ['Tuesday', 'Saturday'], quietDays: ['Monday', 'Wednesday', 'Thursday'],
    note: 'Tuesdays and Saturdays are Hanuman’s days and by far the busiest; Hanuman Jayanti is the peak.',
  },
  {
    match: /ganesh|ganpati|ganapati|vinayak|vinayaka|siddhivinayak|ashtavinayak|vighnes|vigneshwar/,
    peakDays: ['Tuesday'], quietDays: ['Monday', 'Wednesday', 'Thursday'],
    note: 'Tuesdays (Angaraki Chaturthi) and every Sankashti Chaturthi are busiest; Ganesh Chaturthi is the great peak.',
  },
  {
    match: /murugan|muruga|subramany|subrahmany|kartikey|skanda|palani|tiruchendur|arupadai|velayudha|shanmukha/,
    peakDays: ['Tuesday', 'Friday'], quietDays: ['Monday', 'Wednesday', 'Thursday'],
    note: 'Shashti days are busiest; Thaipusam and Skanda Sashti see the largest crowds.',
  },
  {
    match: /surya|sun temple|konark|arasavalli|suryanar/,
    peakDays: ['Sunday'], quietDays: ['Tuesday', 'Wednesday', 'Thursday'],
    note: 'Sundays are busiest; Ratha Saptami and (in the East) Chhath are the peaks.',
  },
  {
    match: /lakshmi|mahalakshmi|padmavathi|ashtalakshmi|ambabai/,
    peakDays: ['Friday'], quietDays: ['Monday', 'Wednesday', 'Thursday'],
    note: 'Fridays are Goddess Lakshmi’s day; Diwali and Varalakshmi Vratam are the peaks.',
  },
  {
    match: /durga|kali|amman|ambaji|vaishno|shakti|bhavani|chamund|kamakhya|meenakshi|\bdevi\b|\bmata\b|jagadamba|renuka|mariamman|bhadrakali|mookambika|kanaka|saraswati|parvati|gauri/,
    peakDays: ['Friday', 'Tuesday'], quietDays: ['Monday', 'Wednesday', 'Thursday'],
    note: 'Fridays and Tuesdays are busiest; Navratri (both Chaitra and Sharad) brings the year’s largest crowds.',
  },
  {
    match: /krishna|krsn|dwarka|guruvayur|udupi|banke ?bihari|govardhan|nathdwara|srinathji|jagannath|vitthal|vithoba|pandharpur/,
    peakDays: ['Saturday', 'Wednesday'], quietDays: ['Monday', 'Tuesday'],
    note: 'Janmashtami is the single biggest day; Ekadashi and festival days are very busy.',
  },
  {
    match: /narasimha|narsimha|ahobilam|simhachalam|yadagiri/,
    peakDays: ['Saturday'], quietDays: ['Monday', 'Wednesday'],
    note: 'Narasimha Jayanti is the peak; Saturdays are busiest.',
  },
  {
    match: /\bram\b|rama|raghunath|kodandaram|ayodhya/,
    peakDays: ['Saturday'], quietDays: ['Monday', 'Wednesday', 'Thursday'],
    note: 'Ram Navami brings the largest crowds of the year.',
  },
  {
    match: /vishnu|narayan|ranganath|padmanabh|govind|perumal|varadaraja|tirunarayana/,
    peakDays: ['Saturday', 'Thursday'], quietDays: ['Monday', 'Wednesday'],
    note: 'Saturdays and Ekadashi days are busiest; Vaikunta Ekadashi is the peak.',
  },
  {
    match: /shiv|mahadev|shankar|nataraj|jyotirling|lingam|linga|kedar|vishwanath|somnath|mallikarjun|omkar|bhimashankar|trimbak|tryambak|grishnesh|kashi|amarnath|baidyanath|vaidyanath|rameshwar|rameswaram|neelkanth|mahakal|kaal bhairav/,
    peakDays: ['Monday'], quietDays: ['Tuesday', 'Wednesday', 'Thursday'],
    note: 'Mondays — and the two Pradosh evenings each month — are busiest; Maha Shivratri is the single biggest crowd of the year.',
  },
]

const DEFAULT_PROFILE: DeityProfile = {
  peakDays: ['Saturday', 'Sunday'], quietDays: ['Tuesday', 'Wednesday', 'Thursday'],
  match: /.^/,
  note: 'Weekends and public holidays are the busiest; weekday mornings are calmest.',
}

function pickProfile(input: BestTimeInput): DeityProfile {
  const hay = `${input.deity || ''} ${input.name || ''} ${input.type || ''}`.toLowerCase()
  return DEITY_PROFILES.find(p => p.match.test(hay)) || DEFAULT_PROFILE
}

// Festivals that cause big crowds AT THIS temple — matched by temple slug in the
// festival data, and by festival name from the temple's own `festivals` list.
function festivalPeaksFor(input: BestTimeInput): FestivalPeak[] {
  const peaks: FestivalPeak[] = []
  const seen = new Set<string>()
  const add = (name: string, when: string, key: string) => {
    if (seen.has(key)) return
    seen.add(key)
    peaks.push({ name, when })
  }
  const slug = input.slug
  // `festivals` may arrive as a string[] or a single comma/semicolon-separated
  // string (how the Temple model stores it) — normalise to lowercase tokens.
  const rawFest = input.festivals
  const festList: string[] = Array.isArray(rawFest)
    ? rawFest
    : (typeof rawFest === 'string' ? rawFest.split(/[,;|]/) : [])
  const tnames = festList.map(f => String(f).toLowerCase().trim()).filter(Boolean)

  for (const f of FESTIVALS) {
    const linkedBySlug = slug ? f.temples?.some(t => t.slug === slug) : false
    const linkedByName = tnames.some(n =>
      n && (f.name.toLowerCase().includes(n) || n.includes(f.name.toLowerCase())))
    if (!linkedBySlug && !linkedByName) continue
    const raw = f.dates2026 || f.whenText || ''
    // Take the first clause and drop any trailing parenthetical so dates read cleanly.
    let when = raw.split(';')[0]
    when = (when.includes('(') ? when.split('(')[0] : when).trim()
    add(f.name, when, f.slug)
  }
  return peaks.slice(0, 6)
}

function seasonalLine(input: BestTimeInput): string | undefined {
  if (input.seasonal_note) return input.seasonal_note
  if (input.open_months && input.open_months.length && input.open_months.length < 12) {
    const names = input.open_months.map(m => MONTH_NAMES[m]).filter(Boolean)
    return `Open only around ${names.join(', ')} — closed the rest of the year. Plan within the open season.`
  }
  if (input.is_seasonal) return 'This is a seasonal shrine — confirm the current year’s opening and closing dates before you travel.'
  return undefined
}

export function computeBestTime(input: BestTimeInput): BestTimeResult {
  const profile = pickProfile(input)
  const festivalPeaks = festivalPeaksFor(input)
  const seasonalNote = seasonalLine(input)

  const dailyBest = [
    'Right at opening for the morning aarti/darshan — the calmest window of the day.',
    'The evening aarti is atmospheric and usually lighter than midday.',
  ]
  const dailyAvoid = [
    'Late morning to mid-afternoon (≈ 11 am – 2 pm) is the daily peak at popular temples, and the hottest hours in the queue.',
    'Weekends and public/school holidays draw noticeably bigger crowds than weekdays.',
  ]

  const lunarNote =
    'New-moon (Amavasya) and full-moon (Purnima) days, Ekadashi, and solar/lunar eclipse days draw far larger crowds everywhere — avoid these if you want a calm darshan.'

  const quiet = profile.quietDays.join(', ')
  const busy = profile.peakDays.join(' & ')
  const overall =
    `For the calmest darshan, come on a weekday morning right at opening — ${quiet} tend to be quietest. ` +
    `Expect the heaviest crowds on ${busy}, on weekends, and around the festival dates below.`

  return {
    overall,
    quietDays: profile.quietDays,
    busyDays: profile.peakDays,
    deityNote: profile.note,
    dailyBest,
    dailyAvoid,
    templeTiming: input.timing,
    templeBestTime: input.best_time,
    lunarNote,
    seasonalNote,
    festivalPeaks,
  }
}
