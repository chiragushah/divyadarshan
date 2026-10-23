'use client'
import { useEffect, useState } from 'react'
import { Radio, ShieldCheck, HelpCircle, Video, Hand, ExternalLink, Clock, Ticket, Search } from 'lucide-react'
import LiveDarshanStatus from './LiveDarshanStatus'
import type { LiveTier } from '@/lib/liveStatus'

interface Props {
  tier: LiveTier
  status?: string            // official | channel | unverified | none
  slug: string
  templeName: string
  liveUrl?: string
  liveSchedule?: { day: string; time: string; label?: string }[]
  timing?: any
  website?: string
  bookingUrl?: string
  verifiedAt?: string | null
  note?: string
}

const card: React.CSSProperties = { borderRadius: 16, padding: '18px 20px', marginBottom: 24 }

function timingText(t: any): string {
  if (!t) return ''
  if (typeof t === 'string') return t
  try { return Object.entries(t).map(([k, v]) => `${k}: ${v}`).join(' · ') } catch { return '' }
}

export default function LiveDarshanSection(p: Props) {
  const timing = timingText(p.timing)

  if (p.tier === 'verified') {
    const when = p.verifiedAt ? new Date(p.verifiedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : ''
    const hasSchedule = !!p.liveSchedule?.length
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, fontWeight: 700, color: '#166534', marginBottom: 8 }}>
          <ShieldCheck size={15} /> {p.status === 'official' ? 'Official live stream' : 'Verified live channel'}{when ? ` · checked ${when}` : ''}
        </div>
        {hasSchedule ? (
          <LiveDarshanStatus liveUrl={p.liveUrl} liveSchedule={p.liveSchedule as any} templeName={p.templeName} timing={p.timing} />
        ) : (
          <div style={{ ...card, background: '#F0FDF4', border: '1.5px solid #86EFAC' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#14532D', display: 'flex', alignItems: 'center', gap: 8 }}><Radio size={18} /> Live darshan is available</div>
                <p style={{ fontSize: 13.5, color: '#166534', margin: '4px 0 0', lineHeight: 1.6 }}>The temple streams its darshan. We do not list stream times we cannot confirm — open the stream to see what is on now.</p>
              </div>
              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Video size={16} /> Watch the stream</a>}
            </div>
            {timing && <p style={{ fontSize: 13, color: '#166534', margin: '10px 0 0' }}><Clock size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> Temple timings: {timing}</p>}
          </div>
        )}
        {p.note && <p style={{ fontSize: 12, color: 'var(--muted)', margin: '-12px 0 20px' }}>{p.note}</p>}
      </div>
    )
  }

  const q = encodeURIComponent(`${p.templeName} live darshan`)

  if (p.tier === 'unverified') {
    return (
      <div style={{ ...card, background: '#FFFBEB', border: '1.5px solid #FCD34D' }}>
        <div style={{ fontWeight: 700, fontSize: 15.5, color: '#92400E', display: 'flex', alignItems: 'center', gap: 8 }}><HelpCircle size={18} /> A live stream may exist — we have not verified it</div>
        <p style={{ fontSize: 13.5, color: '#78350F', margin: '6px 0 12px', lineHeight: 1.65 }}>
          We have seen this temple mentioned as streaming, but we have not confirmed the stream or its timings, so we will not show a “live now” status. Please check the temple’s own announcements before planning around it.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a href={`https://www.youtube.com/results?search_query=${q}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><Search size={15} /> Look on YouTube</a>
          {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}><ExternalLink size={15} /> Temple website</a>}
        </div>
        <RequestVote slug={p.slug} templeName={p.templeName} label="Tell us it streams / help us verify" />
      </div>
    )
  }

  // none
  return (
    <div style={{ ...card, background: 'var(--ivory2)', border: '1.5px solid var(--ivory3)' }}>
      <div style={{ fontWeight: 700, fontSize: 15.5, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 8 }}><Hand size={18} style={{ color: 'var(--crimson)' }} /> No live stream from this temple yet</div>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', margin: '6px 0 12px', lineHeight: 1.65 }}>
        This temple does not broadcast its darshan, as far as we know. Here is what you can do instead.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 10, marginBottom: 14 }}>
        {timing && (
          <div style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 12, padding: 12 }}>
            <div className="section-title" style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={13} /> Darshan timings</div>
            <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.6 }}>{timing}</div>
          </div>
        )}
        {(p.bookingUrl || p.website) && (
          <div style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 12, padding: 12 }}>
            <div className="section-title" style={{ marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}><Ticket size={13} /> From the temple</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13.5 }}>
              {p.bookingUrl && <a href={p.bookingUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--crimson)', fontWeight: 600 }}>Online pooja / seva booking →</a>}
              {p.website && <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--crimson)', fontWeight: 600 }}>Official website →</a>}
            </div>
          </div>
        )}
        <div style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 12, padding: 12 }}>
          <div className="section-title" style={{ marginBottom: 4 }}>Visit in person</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink2)', lineHeight: 1.6 }}>Check “Know before you go” below for dress code, crowds and the best time to visit.</div>
        </div>
      </div>
      <RequestVote slug={p.slug} templeName={p.templeName} label="Ask this temple to stream its darshan" />
    </div>
  )
}

function RequestVote({ slug, templeName, label }: { slug: string; templeName: string; label: string }) {
  const [count, setCount] = useState<number | null>(null)
  const [mine, setMine] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    fetch(`/api/stream-requests?slug=${encodeURIComponent(slug)}`).then(r => (r.headers.get('content-type') || '').includes('json') ? r.json() : null).then(d => { if (d) { setCount(d.count); setMine(!!d.mine) } }).catch(() => {})
  }, [slug])

  const vote = async () => {
    setBusy(true); setErr('')
    try {
      const r = await fetch('/api/stream-requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug }) })
      if ((r.headers.get('content-type') || '').includes('json')) { const d = await r.json(); if (r.ok) { setCount(d.count); setMine(d.mine) } else setErr(d.error || 'Could not save') }
      else setErr('Please sign in first.')
    } catch { setErr('Could not reach the server.') }
    setBusy(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
      <button onClick={vote} disabled={busy} className={mine ? 'btn btn-secondary' : 'btn btn-primary'} aria-pressed={mine} style={{ display: 'inline-flex', gap: 7, alignItems: 'center' }}>
        <Radio size={15} /> {mine ? 'You asked — tap to undo' : label}
      </button>
      <span style={{ fontSize: 13, color: 'var(--muted)' }}>
        {count === null ? '' : count === 0 ? `Be the first to ask ${templeName} to stream.` : `${count} ${count === 1 ? 'devotee has' : 'devotees have'} asked.`}
      </span>
      {err && <span role="alert" style={{ fontSize: 12.5, color: '#b91c1c', fontWeight: 600 }}>{err}</span>}
    </div>
  )
}
