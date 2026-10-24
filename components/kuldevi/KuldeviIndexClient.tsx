'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, ShieldCheck, Users } from 'lucide-react'
import type { KuldeviEntry } from '@/lib/data/kuldevi'

interface Sub { deity_name: string; deity_kind: string; other_names?: string; village: string; taluka?: string; district: string; state: string; how_to_reach: string; community: string; subgroup?: string; surnames?: string; main_seat?: string; customs: string; visit_times?: string; story?: string; source_basis: string; confidence: string; display_name?: string; status?: string; moderator_note?: string }

const CONF: Record<string, string> = { sure: 'Family is very sure', fairly: 'Family is fairly sure', unsure: 'Family is not sure' }
const chip = (bg: string, c: string): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 700, background: bg, color: c, borderRadius: 100, padding: '3px 10px' })

export default function KuldeviIndexClient({ curated }: { curated: KuldeviEntry[] }) {
  const [q, setQ] = useState('')
  const [subs, setSubs] = useState<Sub[]>([])
  const [mine, setMine] = useState<Sub[]>([])
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/kuldevi')
        if (res.ok && (res.headers.get('content-type') || '').includes('json')) { const d = await res.json(); setSubs(d.approved || []); setMine(d.mine || []) }
      } catch { /* ignore */ }
    })()
  }, [])

  const needle = q.trim().toLowerCase()
  const fits = (s: string) => !needle || s.toLowerCase().includes(needle)
  const cur = useMemo(() => curated.filter(k => fits([k.name, k.place, k.district, k.state, k.communities.join(' '), k.summary].join(' '))), [curated, needle]) // eslint-disable-line
  const sub = useMemo(() => subs.filter(s => fits([s.deity_name, s.other_names, s.village, s.district, s.state, s.community, s.subgroup, s.surnames, s.main_seat].join(' '))), [subs, needle]) // eslint-disable-line

  return (
    <div>
      <div style={{ position: 'relative', maxWidth: 520, marginBottom: 20 }}>
        <Search size={16} style={{ position: 'absolute', left: 12, top: 13, color: 'var(--muted2)' }} />
        <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Search by deity, village, community, gotra or surname" style={{ width: '100%', paddingLeft: 36 }} />
      </div>

      <div className="section-title" style={{ marginBottom: 10 }}>Temples and traditions</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, marginBottom: 28 }}>
        {cur.map(k => (
          <Link key={k.slug} href={`/kuldevi/${k.slug}`} className="card card-p" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
              {k.confidence === 'sourced'
                ? <span style={chip('#ecfdf5', '#047857')}><ShieldCheck size={12} /> Sourced</span>
                : <span style={chip('#fff7ed', '#C0570A')}><Users size={12} /> Family-shared · unverified</span>}
              <span style={chip('var(--ivory2)', 'var(--muted)')}>{k.kind}</span>
            </div>
            <h3 className="font-serif" style={{ fontSize: 19, fontWeight: 600, lineHeight: 1.25, marginBottom: 4 }}>{k.name}</h3>
            <div style={{ fontSize: 13, color: 'var(--muted)', display: 'flex', gap: 5, alignItems: 'center', marginBottom: 8 }}><MapPin size={13} /> {k.place}, {k.state}</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--ink2)', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{k.summary}</p>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 8 }}>{k.communities.join(' · ')}</div>
          </Link>
        ))}
        {cur.length === 0 && <p style={{ fontSize: 14, color: 'var(--muted)' }}>No curated entry matches that search.</p>}
      </div>

      <div className="section-title" style={{ marginBottom: 10 }}>Shared by families</div>
      {sub.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {sub.map((s, i) => (
            <div key={i} style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '12px 14px', background: 'var(--ivory2)' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={chip('#fff7ed', '#C0570A')}>Family-shared · {CONF[s.confidence] || 'unverified'}</span>
                <span style={chip('white', 'var(--muted)')}>{s.deity_kind}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{s.deity_name}{s.other_names ? ` (${s.other_names})` : ''}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>{s.village}{s.taluka ? `, ${s.taluka}` : ''}, {s.district}, {s.state} · {s.community}{s.subgroup ? ` (${s.subgroup})` : ''}</div>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ background: 'none', border: 'none', color: 'var(--crimson)', fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: '6px 0' }}>{open === i ? 'Show less' : 'Show details'}</button>
              {open === i && (
                <div style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div><strong>How to reach: </strong>{s.how_to_reach}</div>
                  {s.main_seat && <div><strong>Linked main temple: </strong>{s.main_seat}</div>}
                  {s.surnames && <div><strong>Surnames: </strong>{s.surnames}</div>}
                  <div><strong>Customs: </strong>{s.customs}</div>
                  {s.visit_times && <div><strong>Visits: </strong>{s.visit_times}</div>}
                  {s.story && <div><strong>Story: </strong>{s.story}</div>}
                  <div style={{ color: 'var(--muted)', fontSize: 12.5 }}>{s.display_name || 'Shared by a family'} · basis: {s.source_basis}. Not independently verified.</div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 24 }}>{needle ? 'No family-shared entry matches that search yet.' : 'No family entries have been published yet — add yours.'}</p>
      )}

      {mine.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div className="section-title" style={{ marginBottom: 10 }}>Your submissions</div>
          {mine.map((s, i) => (
            <div key={i} style={{ fontSize: 14, padding: '8px 0', borderBottom: '1px solid var(--ivory3)' }}>
              <strong>{s.deity_name}</strong>, {s.village} —{' '}
              <span style={{ fontWeight: 700, color: s.status === 'approved' ? '#15803d' : s.status === 'rejected' ? '#b91c1c' : '#C0570A' }}>{s.status === 'approved' ? 'Published' : s.status === 'rejected' ? 'Not published' : 'Waiting for review'}</span>
              {s.status === 'rejected' && s.moderator_note && <span style={{ color: '#b91c1c' }}> · {s.moderator_note}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
