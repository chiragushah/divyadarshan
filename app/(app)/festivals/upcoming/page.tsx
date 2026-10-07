import type { Metadata } from 'next'
import Link from 'next/link'
import { FESTIVALS } from '@/lib/data/festivals'
import { nextOccurrence } from '@/lib/festivalDates'
import AddToCalendar from '@/components/festival/AddToCalendar'
import { CalendarDays, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Upcoming Festivals & Reminders | DivyaDarshanam',
  description: 'See which Hindu festivals and vrats are coming up next, with a countdown — and add a reminder to your calendar in one tap.',
}

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function UpcomingFestivalsPage() {
  const now = new Date()
  const items = FESTIVALS
    .map(f => ({ f, occ: nextOccurrence(f, now) }))
    .filter((x): x is { f: typeof x.f; occ: NonNullable<typeof x.occ> } => x.occ !== null)
    .sort((a, b) => a.occ.daysAway - b.occ.daysAway)
    .slice(0, 40)

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #8B1A1A 0%, #C0570A 100%)', color: 'white', padding: '40px 24px 48px' }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/festivals" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontSize: 13, marginBottom: 14 }}>
            <ArrowLeft size={15} /> All festivals
          </Link>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>
            Upcoming &amp; Reminders
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 600, lineHeight: 1.1, marginBottom: 12, color: 'white' }}>
            What&rsquo;s coming up next
          </h1>
          <p style={{ fontSize: 15.5, maxWidth: 640, lineHeight: 1.7, color: 'rgba(255,255,255,0.92)' }}>
            The next festivals and vrats, in order, with a countdown. Tap &ldquo;Add reminder&rdquo; to drop any one into your
            own calendar — it&rsquo;ll remind you the day before.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(({ f, occ }) => {
            const d = occ.date
            const dateChip = `${d.getDate()} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`
            const countdown = occ.daysAway === 0 ? 'Today'
              : occ.daysAway === 1 ? 'Tomorrow'
                : `in ${occ.daysAway} days`
            return (
              <div key={f.slug} className="card" style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Date block */}
                <div style={{ textAlign: 'center', minWidth: 64, flexShrink: 0 }}>
                  <div style={{ fontSize: 24, fontWeight: 700, lineHeight: 1, color: 'var(--crimson)' }}>{d.getDate()}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted2)' }}>{MONTH_SHORT[d.getMonth()]}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted2)' }}>{d.getFullYear()}</div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <Link href={`/festivals/${f.slug}`} className="font-serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--ink)', textDecoration: 'none' }}>{f.name}</Link>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: occ.daysAway <= 7 ? '#FEE4E2' : 'var(--sandstone)', color: occ.daysAway <= 7 ? '#B42318' : 'var(--muted2)' }}>
                      {countdown}{occ.approx ? ' · approx' : ''}
                    </span>
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--muted2)', marginBottom: 6 }}>
                    {f.deity.split(/[;(]/)[0].trim()} · {dateChip}
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.55, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {f.significance}
                  </p>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', flexShrink: 0 }}>
                  <AddToCalendar
                    title={`${f.name} — DivyaDarshanam`}
                    dateISO={d.toISOString()}
                    description={f.significance.slice(0, 180)}
                    url={`https://divyadarshan-psi.vercel.app/festivals/${f.slug}`}
                    compact
                  />
                  <Link href={`/festivals/${f.slug}`} style={{ fontSize: 12, fontWeight: 600, color: 'var(--crimson)', textDecoration: 'none' }}>Read guide →</Link>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted2)' }}>
          <CalendarDays size={14} />
          <span>Dates follow the Hindu calendar and shift each year; a few are marked &ldquo;approx&rdquo; — confirm locally before travel. Year-round vrats (Satyanarayan, Pradosh) aren&rsquo;t listed here.</span>
        </div>
      </div>
    </div>
  )
}
