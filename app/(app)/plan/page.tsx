'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { finverseLink } from '@/lib/utils'

// ── Itinerary Renderer ─────────────────────────────────────────────────────
function ItineraryRenderer({ text }: { text: string }) {
  const lines = text.split('\n').filter(l => l.trim())

  type Block =
    | { type: 'day';  title: string; items: string[] }
    | { type: 'tips'; items: string[] }
    | { type: 'note'; text: string }

  const blocks: Block[] = []
  let current: Block | null = null

  for (const raw of lines) {
    const line = raw.trim()

    // Day heading — "Day 1:", "Day 1 –", "DAY 1"
    const dayMatch = line.match(/^(day\s*\d+[:\-–—]?\s*.*)$/i)
    if (dayMatch) {
      if (current) blocks.push(current)
      current = { type: 'day', title: line.replace(/^day\s*/i, 'Day '), items: [] }
      continue
    }

    // Tips / Notes section heading
    if (/^(tips?|important|note|reminder|advice|budget|cost|things to (note|know)|travel tip)/i.test(line)) {
      if (current) blocks.push(current)
      current = { type: 'tips', items: [] }
      continue
    }

    // Bullet / list items
    const isBullet = /^[-•*–—]/.test(line)
    if (current && (current.type === 'day' || current.type === 'tips') && isBullet) {
      current.items.push(line.replace(/^[-•*–—]\s*/, ''))
      continue
    }

    // Continuation inside a day block
    if (current?.type === 'day' && !isBullet && line.length > 0) {
      current.items.push(line)
      continue
    }

    // Generic note
    if (line.length > 0) {
      if (current) blocks.push(current)
      current = { type: 'note', text: line }
      blocks.push(current)
      current = null
    }
  }
  if (current) blocks.push(current)

  const DAY_COLORS = [
    { bg: 'rgba(192,87,10,.07)',  border: 'rgba(192,87,10,.25)',  badge: '#C0570A', badgeBg: 'rgba(192,87,10,.12)' },
    { bg: 'rgba(22,101,52,.07)',  border: 'rgba(22,101,52,.25)',  badge: '#166534', badgeBg: 'rgba(22,101,52,.12)' },
    { bg: 'rgba(30,64,175,.07)',  border: 'rgba(30,64,175,.25)',  badge: '#1E40AF', badgeBg: 'rgba(30,64,175,.12)' },
    { bg: 'rgba(109,40,217,.07)', border: 'rgba(109,40,217,.25)', badge: '#6D28D9', badgeBg: 'rgba(109,40,217,.12)' },
    { bg: 'rgba(190,18,60,.07)',  border: 'rgba(190,18,60,.25)',  badge: '#BE123C', badgeBg: 'rgba(190,18,60,.12)' },
  ]

  // Bold inline **text**
  const renderBold = (str: string) => {
    const parts = str.split(/\*\*(.*?)\*\*/g)
    return parts.map((p, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: 'var(--ink)', fontWeight: 700 }}>{p}</strong>
        : <span key={i}>{p}</span>
    )
  }

  // Time tag e.g. "(9:00 AM)" → highlighted
  const renderLine = (line: string) => {
    const withTime = line.replace(/\((\d{1,2}:\d{2}\s*(?:AM|PM))\)/gi,
      '<span class="time-tag">$1</span>')
    return <span dangerouslySetInnerHTML={{ __html:
      withTime.replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--ink);font-weight:700">$1</strong>')
    }} />
  }

  let dayCount = 0

  return (
    <>
      <style>{`
        .time-tag {
          display:inline-block;
          background:rgba(192,87,10,.1);
          color:var(--saffron);
          font-size:10px;
          font-weight:600;
          padding:1px 6px;
          border-radius:4px;
          margin-left:4px;
          vertical-align:middle;
        }
        .day-item {
          display:flex;
          align-items:flex-start;
          gap:10px;
          padding:8px 0;
          border-bottom:1px solid var(--border);
          font-size:13.5px;
          line-height:1.65;
          color:var(--muted);
        }
        .day-item:last-child { border-bottom:none; }
        .day-dot {
          width:6px; height:6px; border-radius:50%;
          margin-top:7px; flex-shrink:0;
        }
        .tip-item {
          display:flex;
          align-items:flex-start;
          gap:10px;
          padding:7px 0;
          font-size:13px;
          color:var(--muted);
          line-height:1.6;
        }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {blocks.map((block, i) => {

          if (block.type === 'day') {
            const c = DAY_COLORS[dayCount % DAY_COLORS.length]
            dayCount++
            return (
              <div key={i} style={{
                background: c.bg,
                border: `1.5px solid ${c.border}`,
                borderRadius: 14,
                overflow: 'hidden',
              }}>
                {/* Day header */}
                <div style={{
                  padding: '10px 16px',
                  borderBottom: `1px solid ${c.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}>
                  <span style={{
                    background: c.badgeBg,
                    color: c.badge,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '.07em',
                    padding: '3px 10px',
                    borderRadius: 6,
                  }}>
                    {block.title}
                  </span>
                </div>
                {/* Day items */}
                {block.items.length > 0 && (
                  <div style={{ padding: '4px 16px 10px' }}>
                    {block.items.map((item, j) => (
                      <div key={j} className="day-item">
                        <span className="day-dot" style={{ background: c.badge }} />
                        <span>{renderLine(item)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          }

          if (block.type === 'tips') {
            return (
              <div key={i} style={{
                background: 'rgba(234,179,8,.07)',
                border: '1.5px solid rgba(234,179,8,.3)',
                borderRadius: 14,
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid rgba(234,179,8,.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <span style={{ fontSize: 16 }}>💡</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '.07em',
                    color: '#92400E',
                  }}>Yatra Tips</span>
                </div>
                <div style={{ padding: '4px 16px 10px' }}>
                  {block.items.map((item, j) => (
                    <div key={j} className="tip-item">
                      <span style={{ fontSize: 14, marginTop: 2 }}>✦</span>
                      <span>{renderBold(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }

          if (block.type === 'note') {
            return (
              <p key={i} style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'var(--muted)',
                padding: '4px 0',
              }}>
                {renderBold(block.text)}
              </p>
            )
          }

          return null
        })}
      </div>
    </>
  )
}

// ── Planner Form ─────────────────────────────────────────────────────────────
function PlannerForm() {
  const searchParams = useSearchParams()

  // Read params passed from temple detail page
  const destination = searchParams.get('destination') || ''
  const deity       = searchParams.get('deity') || ''
  const city        = searchParams.get('city') || ''
  const state       = searchParams.get('state') || ''
  const prefilledFrom = destination || city || state

  const [form, setForm] = useState({
    from:     '',
    to:       destination,
    mode:     'Train',
    days:     3,
    pilgrims: 2,
    deity:    deity,
    notes:    city && state ? `Temple located in ${city}, ${state}.` : '',
  })
  const [result, setResult]   = useState('')
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState('')
  const [error, setError]     = useState('')

  // Re-sync if params change (e.g. navigating from a different temple)
  useEffect(() => {
    setForm(f => ({
      ...f,
      to:    destination || f.to,
      deity: deity || f.deity,
      notes: city && state ? `Temple located in ${city}, ${state}.` : f.notes,
    }))
  }, [destination, deity, city, state])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const generate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.from || !form.to) return
    setLoading(true); setResult(''); setError('')
    try {
      const res = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setResult(data.itinerary)
      setProvider(data.provider)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-title">Powered by Claude AI</div>
        <h1 className="font-serif text-4xl font-medium">AI Yatra Planner</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
          Get a complete day-wise pilgrimage itinerary with routes, stays, darshan timings and insider tips.
        </p>
      </div>

      {/* Pre-filled banner */}
      {prefilledFrom && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm"
          style={{ background: 'rgba(192,87,10,.08)', border: '1.5px solid rgba(192,87,10,.2)', color: 'var(--saffron)' }}>
          <span style={{ fontSize: 18 }}>🛕</span>
          <div>
            <span className="font-semibold">Pre-filled from temple: </span>
            <span>{destination}</span>
            {city && state && <span className="ml-1" style={{ color: 'var(--muted2)', fontSize: 12 }}>({city}, {state})</span>}
          </div>
          <button
            onClick={() => setForm({ from: '', to: '', mode: 'Train', days: 3, pilgrims: 2, deity: '', notes: '' })}
            className="ml-auto text-xs underline"
            style={{ color: 'var(--muted2)' }}>
            Clear
          </button>
        </div>
      )}

      {/* Form */}
      <div className="card card-p mb-6">
        <form onSubmit={generate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="label">Starting City</label>
              <input
                className="input"
                placeholder="e.g. Mumbai, Delhi, Pune…"
                value={form.from}
                onChange={e => set('from', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Destination / Yatra</label>
              <input
                className="input"
                placeholder="e.g. Char Dham, Varanasi, Tirupati…"
                value={form.to}
                onChange={e => set('to', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Travel Mode</label>
              <select className="input" value={form.mode} onChange={e => set('mode', e.target.value)}>
                {['Train', 'Flight', 'Road / Car', 'Bus', 'Mixed'].map(m => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Duration (Days)</label>
              <input
                className="input"
                type="number"
                min={1}
                max={30}
                value={form.days}
                onChange={e => set('days', parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="label">Number of Pilgrims</label>
              <input
                className="input"
                type="number"
                min={1}
                max={20}
                value={form.pilgrims}
                onChange={e => set('pilgrims', parseInt(e.target.value))}
              />
            </div>

            <div>
              <label className="label">Deity Focus (optional)</label>
              <input
                className="input"
                placeholder="e.g. Shiva, Vishnu, Devi…"
                value={form.deity}
                onChange={e => set('deity', e.target.value)}
              />
            </div>

            <div className="md:col-span-2">
              <label className="label">Special Requests (optional)</label>
              <textarea
                className="input h-20 resize-none"
                placeholder="Budget trip, elderly pilgrims, specific festivals, vegetarian only, no trekking…"
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !form.from || !form.to}
            className="btn btn-primary mt-5 w-full md:w-auto">
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Generating Itinerary…</>
              : 'Generate Pilgrimage Plan'}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="card card-p mb-4 text-sm"
          style={{ background: '#FFF0F0', color: 'var(--live)', borderColor: '#FFCDD2' }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="card card-p">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-medium">Your Yatra Plan</h2>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="btn btn-secondary btn-sm">
              📋 Copy
            </button>
          </div>

          <ItineraryRenderer text={result} />

              {/* ── PLAN & BOOK ── */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-serif text-xl font-medium mb-1">Plan & Book Your Trip</h3>
            <p className="text-xs mb-4" style={{ color: 'var(--muted2)' }}>
              From <strong>{form.from}</strong> to <strong>{form.to}</strong> — book everything in one place
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                {
                  icon: '🏨',
                  label: 'Hotels in ' + form.to,
                  sub: 'Google Hotels',
                  url: 'https://www.google.com/travel/hotels/' + encodeURIComponent(form.to + ', India'),
                },
                {
                  icon: '🚅',
                  label: 'Trains from ' + form.from,
                  sub: 'IRCTC',
                  url: 'https://www.irctc.co.in/nget/train-search',
                },
                {
                  icon: '🚌',
                  label: 'Buses to ' + form.to,
                  sub: 'RedBus',
                  url: 'https://www.google.com/search?q=redbus+' + form.from.replace(/ /g,'+') + '+to+' + form.to.replace(/ /g,'+'),
                },
                {
                  icon: '✈️',
                  label: 'Flights to ' + form.to,
                  sub: 'Google Flights',
                  url: 'https://www.google.com/search?q=flights+from+' + form.from.replace(/ /g,'+') + '+to+' + form.to.replace(/ /g,'+'),
                },
              ].map(b => (
                <a key={b.label} href={b.url} target="_blank" rel="noopener" className="book-btn">
                  <span style={{ fontSize: 20 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{b.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted2)' }}>via {b.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bridge cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t"
            style={{ borderColor: 'var(--border)' }}>
            <div className="card card-p" style={{ borderColor: 'var(--border2)' }}>
              <h4 className="font-serif text-lg font-medium mb-1">How much will this cost?</h4>
              <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
                Get a detailed cost breakdown with the Yatra Budget calculator.
              </p>
              <Link
                href={`/plan/budget?destination=${encodeURIComponent(form.to)}&pilgrims=${form.pilgrims}`}
                className="btn btn-secondary btn-sm w-full justify-center">
                Calculate Budget →
              </Link>
            </div>
            <div className="card card-p" style={{ borderColor: 'var(--border2)' }}>
              <h4 className="font-serif text-lg font-medium mb-1">Start saving for this yatra</h4>
              <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
                Set a monthly savings goal and track progress until you're ready to go.
              </p>
              <Link
                href={`/yatra/goals?yatra=${encodeURIComponent(form.to)}`}
                className="btn btn-gold btn-sm w-full justify-center">
                Set Savings Goal →
              </Link>
            </div>
          </div>

          {/* FinVerse CTA */}
          <div className="mt-4 rounded-xl p-4 flex items-center justify-between gap-4"
            style={{ background: 'var(--ivory2)', border: '1px solid var(--border)' }}>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'var(--gold-dk)' }}>Powered by FinVerse</div>
              <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                Open a dedicated Yatra Fund and start saving today
              </p>
            </div>
            <a href={finverseLink({ action: 'savings', goal_name: form.to, utm_content: 'planner' })}
              target="_blank" rel="noopener"
              className="btn btn-gold btn-sm whitespace-nowrap">
              Open Yatra Fund →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

// Wrap in Suspense so useSearchParams works correctly in Next.js 14
export default function PlannerPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-6 py-10 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin" style={{ color: 'var(--crimson)' }} />
      </div>
    }>
      <PlannerForm />
    </Suspense>
  )
}
import ItineraryRenderer from '@/components/ItineraryRenderer'
