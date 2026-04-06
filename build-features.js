// build-features.js
const fs = require('fs')

// ── FEATURE 1: Auspicious Date Picker in Plan page ───────────────────────────
let plan = fs.readFileSync('app/(app)/plan/page.tsx', 'utf8')

// Add auspicious_date to form state
plan = plan.replace(
  `deity:    deity,
    notes:    city && state ? \`Temple located in \${city}, \${state}.\` : '',`,
  `deity:    deity,
    auspicious_date: '',
    notes:    city && state ? \`Temple located in \${city}, \${state}.\` : '',`
)

// Add auspicious dates data and picker UI after the notes/deity field
// Find where days/pilgrims inputs end and insert before submit button
const AUSPICIOUS_DATA = `
  // Auspicious dates 2026
  const AUSPICIOUS_DATES = [
    { date: '2026-01-14', label: 'Makar Sankranti', type: 'festival' },
    { date: '2026-01-26', label: 'Basant Panchami', type: 'festival' },
    { date: '2026-02-11', label: 'Mahashivratri', type: 'major' },
    { date: '2026-02-26', label: 'Holi', type: 'festival' },
    { date: '2026-03-13', label: 'Ram Navami', type: 'major' },
    { date: '2026-03-20', label: 'Hanuman Jayanti', type: 'major' },
    { date: '2026-04-06', label: 'Ekadashi (Papamochani)', type: 'ekadashi' },
    { date: '2026-04-13', label: 'Purnima (Chaitra)', type: 'purnima' },
    { date: '2026-04-14', label: 'Baisakhi / Tamil New Year', type: 'festival' },
    { date: '2026-04-21', label: 'Ekadashi (Kamada)', type: 'ekadashi' },
    { date: '2026-04-28', label: 'Amavasya', type: 'amavasya' },
    { date: '2026-05-05', label: 'Ekadashi (Varuthini)', type: 'ekadashi' },
    { date: '2026-05-12', label: 'Purnima (Vaishakha)', type: 'purnima' },
    { date: '2026-05-20', label: 'Ekadashi (Mohini)', type: 'ekadashi' },
    { date: '2026-06-03', label: 'Ekadashi (Apara)', type: 'ekadashi' },
    { date: '2026-06-11', label: 'Purnima (Jyeshtha)', type: 'purnima' },
    { date: '2026-06-18', label: 'Ekadashi (Nirjala) — Most sacred', type: 'ekadashi' },
    { date: '2026-07-10', label: 'Purnima / Guru Purnima', type: 'purnima' },
    { date: '2026-08-03', label: 'Hariyali Teej', type: 'festival' },
    { date: '2026-08-09', label: 'Purnima (Shravana)', type: 'purnima' },
    { date: '2026-08-14', label: 'Janmashtami', type: 'major' },
    { date: '2026-09-17', label: 'Ganesh Chaturthi', type: 'major' },
    { date: '2026-10-01', label: 'Navratri begins', type: 'major' },
    { date: '2026-10-12', label: 'Dussehra', type: 'festival' },
    { date: '2026-10-20', label: 'Kojagiri Purnima', type: 'purnima' },
    { date: '2026-11-01', label: 'Diwali', type: 'major' },
    { date: '2026-11-05', label: 'Chhath Puja', type: 'festival' },
    { date: '2026-12-18', label: 'Purnima (Margashirsha)', type: 'purnima' },
  ]
  const AUSPICIOUS_COLORS: Record<string,string> = {
    major:     '#8B1A1A',
    festival:  '#C0570A',
    ekadashi:  '#166534',
    purnima:   '#1E40AF',
    amavasya:  '#4B5563',
  }
  const upcomingDates = AUSPICIOUS_DATES.filter(d => d.date >= new Date().toISOString().slice(0,10)).slice(0, 12)
`

// Insert after the useState declarations
plan = plan.replace(
  `  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))`,
  `  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))
${AUSPICIOUS_DATA}`
)

// Add auspicious date UI inside the form grid, before the notes field
const DATE_UI = `            {/* Auspicious Date */}
            <div className="md:col-span-2">
              <label className="label">Travel on an Auspicious Date <span style={{ fontSize:11, color:'var(--muted2)', fontWeight:400 }}>(optional — AI will plan around this date)</span></label>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:8 }}>
                {upcomingDates.map(d => (
                  <button key={d.date} type="button"
                    onClick={() => set('auspicious_date', form.auspicious_date === d.date ? '' : d.date)}
                    style={{
                      padding:'6px 12px', borderRadius:100, fontSize:12, fontWeight:600,
                      border: '1.5px solid',
                      borderColor: form.auspicious_date === d.date ? AUSPICIOUS_COLORS[d.type] : 'var(--border)',
                      background: form.auspicious_date === d.date ? AUSPICIOUS_COLORS[d.type] + '15' : 'white',
                      color: form.auspicious_date === d.date ? AUSPICIOUS_COLORS[d.type] : 'var(--muted)',
                      cursor: 'pointer', transition: 'all 0.15s',
                    }}>
                    {new Date(d.date).toLocaleDateString('en-IN', { day:'numeric', month:'short' })} — {d.label}
                  </button>
                ))}
              </div>
              {form.auspicious_date && (
                <div style={{ fontSize:12, color:'#166534', background:'#DCFCE7', border:'1px solid #86EFAC', borderRadius:8, padding:'8px 12px', marginTop:4 }}>
                  AI will plan your yatra around <strong>{AUSPICIOUS_DATES.find(d => d.date === form.auspicious_date)?.label}</strong> ({new Date(form.auspicious_date).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })})
                </div>
              )}
            </div>`

// Insert before notes field
plan = plan.replace(
  `            <div className="md:col-span-2">
              <label className="label">Special Requests / Notes`,
  DATE_UI + `\n            <div className="md:col-span-2">
              <label className="label">Special Requests / Notes`
)

// Pass auspicious_date in notes to AI
plan = plan.replace(
  `body: JSON.stringify(form),`,
  `body: JSON.stringify({
          ...form,
          notes: [
            form.notes,
            form.auspicious_date ? \`IMPORTANT: The pilgrim wants to travel on or around \${form.auspicious_date} which is \${(AUSPICIOUS_DATES || []).find((d: any) => d.date === form.auspicious_date)?.label || 'an auspicious date'}. Please align the itinerary so they arrive and do main darshan on this sacred day.\` : ''
          ].filter(Boolean).join(' ')
        }),`
)

fs.writeFileSync('app/(app)/plan/page.tsx', plan, 'utf8')
console.log('✅ Auspicious date picker added to plan page')
console.log('   Has auspicious_date:', plan.includes('auspicious_date'))
console.log('   Has AUSPICIOUS_DATES:', plan.includes('AUSPICIOUS_DATES'))

// ── FEATURE 2: Temple Open/Closed Status ─────────────────────────────────────

// 2a. Add seasonal fields to Temple model
let templeModel = fs.readFileSync('models/Temple.ts', 'utf8')
if (!templeModel.includes('open_months')) {
  templeModel = templeModel.replace(
    `  image_url?: string`,
    `  image_url?: string
  open_months?: number[]       // e.g. [5,6,7,8,9,10,11] = May-Nov open
  closed_months?: number[]     // e.g. [11,12,1,2,3,4] = Nov-Apr closed
  seasonal_note?: string       // e.g. "Opens on Akshaya Tritiya, closes on Bhai Dooj"
  is_seasonal?: boolean`
  )
  // Add to schema
  templeModel = templeModel.replace(
    `  image_url:    { type: String,  default: '' },`,
    `  image_url:    { type: String,  default: '' },
  open_months:   { type: [Number], default: [] },
  closed_months: { type: [Number], default: [] },
  seasonal_note: { type: String,  default: '' },
  is_seasonal:   { type: Boolean, default: false },`
  )
  fs.writeFileSync('models/Temple.ts', templeModel, 'utf8')
  console.log('✅ Temple model: seasonal fields added')
} else {
  console.log('⏭️  Temple model already has seasonal fields')
}

// 2b. Create TempleStatusBadge component
fs.writeFileSync('components/temple/TempleStatusBadge.tsx',
`'use client'

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface Props {
  open_months?: number[]
  closed_months?: number[]
  seasonal_note?: string
  is_seasonal?: boolean
  size?: 'sm' | 'md'
}

export default function TempleStatusBadge({ open_months, closed_months, seasonal_note, is_seasonal, size = 'md' }: Props) {
  if (!is_seasonal && !open_months?.length && !closed_months?.length) return null

  const now = new Date()
  const currentMonth = now.getMonth() + 1 // 1-12

  let isOpen = true
  let statusText = 'Open Year Round'
  let statusColor = '#166534'
  let statusBg = '#DCFCE7'
  let statusBorder = '#86EFAC'

  if (open_months && open_months.length > 0) {
    isOpen = open_months.includes(currentMonth)
    if (isOpen) {
      // Find when it closes
      const futureClosedMonths = closed_months?.filter(m => m > currentMonth) || []
      const closesIn = futureClosedMonths.length > 0 ? MONTH_NAMES[futureClosedMonths[0] - 1] : null
      statusText = closesIn ? \`Open · Closes \${closesIn}\` : 'Currently Open'
      statusColor = '#166534'
      statusBg = '#DCFCE7'
      statusBorder = '#86EFAC'
    } else {
      // Find when it opens next
      const futureOpenMonths = open_months.filter(m => m > currentMonth)
      const opensIn = futureOpenMonths.length > 0 ? MONTH_NAMES[futureOpenMonths[0] - 1] : MONTH_NAMES[open_months[0] - 1]
      statusText = \`Closed · Opens \${opensIn}\`
      statusColor = '#991B1B'
      statusBg = '#FEE2E2'
      statusBorder = '#FECACA'
    }
  }

  const openMonthNames = open_months?.map(m => MONTH_NAMES[m-1]).join(', ')

  return (
    <div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: size === 'sm' ? '4px 10px' : '6px 14px',
        borderRadius: 100, background: statusBg,
        border: \`1.5px solid \${statusBorder}\`,
        fontSize: size === 'sm' ? 12 : 13, fontWeight: 700, color: statusColor,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: statusColor, display: 'inline-block', flexShrink: 0 }} />
        {statusText}
      </div>
      {openMonthNames && (
        <div style={{ fontSize: 11, color: '#6B5B4E', marginTop: 4 }}>
          Open: {openMonthNames}
        </div>
      )}
      {seasonal_note && (
        <div style={{ fontSize: 11, color: '#6B5B4E', marginTop: 2, fontStyle: 'italic' }}>
          {seasonal_note}
        </div>
      )}
    </div>
  )
}
`)
console.log('✅ components/temple/TempleStatusBadge.tsx created')

// 2c. Add seasonal data for well-known seasonal temples via a seed patch
fs.writeFileSync('scripts/patch-seasonal-temples.js',
`// patch-seasonal-temples.js
// Run: node scripts/patch-seasonal-temples.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const SEASONAL_TEMPLES = [
  { slug: 'kedarnath-temple',         open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens on Akshaya Tritiya (Apr/May), closes on Bhai Dooj (Oct/Nov)', is_seasonal: true },
  { slug: 'badrinath-temple',         open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens Apr/May, closes Nov for winter', is_seasonal: true },
  { slug: 'gangotri-temple',          open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens Akshaya Tritiya, closes Diwali', is_seasonal: true },
  { slug: 'yamunotri-temple',         open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens Akshaya Tritiya, closes Diwali', is_seasonal: true },
  { slug: 'hemkund-sahib',            open_months: [6,7,8,9],          closed_months: [10,11,12,1,2,3,4,5], seasonal_note: 'Open June to October only due to snowfall', is_seasonal: true },
  { slug: 'tungnath-temple',          open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Highest Shiva temple, closed in winter', is_seasonal: true },
  { slug: 'maa-vaishno-devi-temple',  open_months: [1,2,3,4,5,6,7,8,9,10,11,12], closed_months: [], seasonal_note: 'Open year round, best Oct-Mar', is_seasonal: false },
]

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const Temple = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))
  for (const t of SEASONAL_TEMPLES) {
    const res = await Temple.updateOne(
      { slug: t.slug },
      { open_months: t.open_months, closed_months: t.closed_months, seasonal_note: t.seasonal_note, is_seasonal: t.is_seasonal }
    )
    console.log(t.slug, ':', res.matchedCount ? 'updated' : 'not found')
  }
  await mongoose.disconnect()
  console.log('Done!')
}
main().catch(console.error)
`)
console.log('✅ scripts/patch-seasonal-temples.js created')

// 2d. Add TempleStatusBadge to temple detail page
const templePage = fs.readFileSync('app/(public)/temple/[slug]/page.tsx', 'utf8')
if (!templePage.includes('TempleStatusBadge')) {
  let updated = templePage.replace(
    `import ReviewsSection from '@/components/temple/ReviewsSection'`,
    `import ReviewsSection from '@/components/temple/ReviewsSection'
import TempleStatusBadge from '@/components/temple/TempleStatusBadge'`
  )
  // Add badge near the temple name/heading - find deity/type display area
  updated = updated.replace(
    `{temple.type && <span`,
    `<TempleStatusBadge
              open_months={temple.open_months}
              closed_months={temple.closed_months}
              seasonal_note={temple.seasonal_note}
              is_seasonal={temple.is_seasonal}
            />
            {temple.type && <span`
  )
  fs.writeFileSync('app/(public)/temple/[slug]/page.tsx', updated, 'utf8')
  console.log('✅ Temple page: TempleStatusBadge added')
} else {
  console.log('⏭️  Temple page already has TempleStatusBadge')
}

console.log('\n🎉 All done! Now run:')
console.log('git add .')
console.log('git commit -m "feat: auspicious date picker + temple seasonal status"')
console.log('git push origin main')
console.log('\nThen seed seasonal data:')
console.log('node scripts/patch-seasonal-temples.js')
