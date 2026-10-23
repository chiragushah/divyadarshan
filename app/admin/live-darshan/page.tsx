'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Status = 'none' | 'unverified' | 'channel' | 'official'
interface Row { slug: string; name: string; state: string; city?: string; deity?: string; status: Status; tier: string; live_url: string; live_note: string; verified_at: string | null; website: string; votes: number }

const COLS: { id: Status; label: string; color: string; hint: string }[] = [
  { id: 'none', label: 'No live stream', color: '#6b7280', hint: 'Temple does not stream (as far as we know)' },
  { id: 'unverified', label: 'Reported — not verified', color: '#C0570A', hint: 'Mentioned somewhere; no one has confirmed it' },
  { id: 'channel', label: 'Verified channel', color: '#2563eb', hint: 'Checked: the temple’s own YouTube/Facebook channel' },
  { id: 'official', label: 'Official stream', color: '#15803d', hint: 'Checked: the temple’s own website or app' },
]
const SHOW = 40

export default function LiveDarshanAdmin() {
  const [rows, setRows] = useState<Row[]>([])
  const [err, setErr] = useState('')
  const [q, setQ] = useState('')
  const [state, setState] = useState('')
  const [dragSlug, setDragSlug] = useState<string | null>(null)
  const [over, setOver] = useState<Status | null>(null)
  const [more, setMore] = useState<Record<string, number>>({})
  const [edit, setEdit] = useState<{ row: Row; status: Status } | null>(null)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/live-darshan')
    if (!r.ok) { setErr(r.status === 401 ? 'Your admin session has expired — sign in again from /admin.' : 'Could not load.'); return }
    setRows((await r.json()).items || [])
  }, [])
  useEffect(() => { load() }, [load])

  const states = useMemo(() => Array.from(new Set(rows.map(r => r.state))).sort(), [rows])
  const filtered = useMemo(() => rows.filter(r => (!state || r.state === state) && (!q || `${r.name} ${r.city} ${r.state}`.toLowerCase().includes(q.toLowerCase()))), [rows, q, state])

  const count = (s: Status, list = filtered) => list.filter(r => r.status === s).length
  const total = filtered.length || 1
  const verified = count('channel') + count('official')

  const byState = useMemo(() => {
    const m: Record<string, Record<Status, number>> = {}
    for (const r of rows.filter(x => !q || `${x.name} ${x.city} ${x.state}`.toLowerCase().includes(q.toLowerCase()))) {
      m[r.state] ||= { none: 0, unverified: 0, channel: 0, official: 0 }
      m[r.state][r.status]++
    }
    return Object.entries(m).map(([s, v]) => ({ s, v, n: v.none + v.unverified + v.channel + v.official })).sort((a, b) => b.n - a.n).slice(0, 14)
  }, [rows, q])

  const topAsked = useMemo(() => rows.filter(r => r.votes > 0 && (r.status === 'none' || r.status === 'unverified')).sort((a, b) => b.votes - a.votes).slice(0, 10), [rows])

  const save = async (row: Row, status: Status, extra?: { live_url?: string; live_note?: string }) => {
    const res = await fetch('/api/admin/live-darshan', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ slug: row.slug, status, live_url: extra?.live_url ?? row.live_url, live_note: extra?.live_note ?? row.live_note }) })
    const d = await res.json().catch(() => ({}))
    if (!res.ok) return d.error || 'Could not save.'
    setRows(rs => rs.map(r => (r.slug === row.slug ? { ...r, status, tier: status === 'official' || status === 'channel' ? 'verified' : status, live_url: extra?.live_url ?? r.live_url, live_note: extra?.live_note ?? r.live_note, verified_at: status === 'official' || status === 'channel' ? new Date().toISOString() : null } : r)))
    return ''
  }

  const drop = async (status: Status) => {
    const row = rows.find(r => r.slug === dragSlug)
    setOver(null); setDragSlug(null)
    if (!row || row.status === status) return
    if (status === 'official' || status === 'channel') setEdit({ row, status }) // needs proof
    else { const e = await save(row, status); if (e) setErr(e) }
  }

  const csv = () => {
    const head = ['Temple', 'State', 'Status', 'Stream link', 'Verified on', 'How verified', 'Devotee requests']
    const lines = [head, ...rows.map(r => [r.name, r.state, r.status, r.live_url, r.verified_at ? r.verified_at.slice(0, 10) : '', r.live_note, String(r.votes)])]
      .map(l => l.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([lines], { type: 'text/csv' })); a.download = 'live-darshan-coverage.csv'; a.click()
  }

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 4 }}>
        <h1 className="font-serif" style={{ fontSize: 28, fontWeight: 600 }}>Live darshan — verification board</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={csv}>Download coverage report (CSV)</button>
          <Link href="/admin/dashboard" className="btn btn-secondary">Back to dashboard</Link>
        </div>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 14 }}>
        Only “Verified channel” and “Official stream” show as live to visitors. Drag a temple to a verified column only after you have watched its stream — you will be asked for the link and how you checked it.
      </p>

      {/* tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
        <div className="card card-p"><div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>TEMPLES{state ? ` IN ${state.toUpperCase()}` : ''}</div><div style={{ fontSize: 30, fontWeight: 700 }}>{filtered.length}</div></div>
        <div className="card card-p" style={{ borderTop: '4px solid #15803d' }}><div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>VERIFIED LIVE</div><div style={{ fontSize: 30, fontWeight: 700, color: '#15803d' }}>{verified} <span style={{ fontSize: 14, color: 'var(--muted)' }}>({Math.round((verified / total) * 100)}%)</span></div></div>
        <div className="card card-p" style={{ borderTop: '4px solid #C0570A' }}><div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>REPORTED, UNVERIFIED</div><div style={{ fontSize: 30, fontWeight: 700, color: '#C0570A' }}>{count('unverified')}</div></div>
        <div className="card card-p" style={{ borderTop: '4px solid #6b7280' }}><div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>NO STREAM</div><div style={{ fontSize: 30, fontWeight: 700 }}>{count('none')}</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16, marginBottom: 18 }}>
        <div className="card card-p">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Coverage by state <span style={{ fontWeight: 400, color: 'var(--muted)', fontSize: 12 }}>(click a bar to filter the board)</span></div>
          {byState.map(({ s, v, n }) => (
            <button key={s} onClick={() => setState(state === s ? '' : s)} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', background: state === s ? '#8B1A1A0f' : 'none', border: 'none', cursor: 'pointer', padding: '3px 4px', borderRadius: 6 }}>
              <span style={{ width: 120, textAlign: 'left', fontSize: 12.5, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s}</span>
              <span style={{ flex: 1, display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', background: '#eee' }}>
                {COLS.slice().reverse().map(c => <span key={c.id} title={`${c.label}: ${v[c.id]}`} style={{ width: `${(v[c.id] / n) * 100}%`, background: c.color }} />)}
              </span>
              <span style={{ width: 28, fontSize: 12, color: 'var(--muted)' }}>{n}</span>
            </button>
          ))}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8, fontSize: 11.5, color: 'var(--muted)' }}>
            {COLS.slice().reverse().map(c => <span key={c.id}><span style={{ display: 'inline-block', width: 9, height: 9, background: c.color, borderRadius: 2, marginRight: 4 }} />{c.label}</span>)}
          </div>
        </div>
        <div className="card card-p">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Most-requested temples to stream</div>
          {topAsked.length === 0 && <p style={{ fontSize: 13, color: 'var(--muted)' }}>No devotee requests yet. They appear here as visitors tap “Ask this temple to stream”.</p>}
          {topAsked.map(r => (
            <div key={r.slug} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '5px 0', borderBottom: '1px solid var(--ivory3)', fontSize: 13.5 }}>
              <span>{r.name} <span style={{ color: 'var(--muted)' }}>· {r.state}</span></span><strong>{r.votes}</strong>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search temple, city or state" className="input" style={{ maxWidth: 320 }} />
        <select value={state} onChange={e => setState(e.target.value)} className="input" style={{ maxWidth: 220 }}>
          <option value="">All states</option>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
        {(q || state) && <button className="btn btn-secondary" onClick={() => { setQ(''); setState('') }}>Clear filters</button>}
      </div>
      {err && <p style={{ color: '#b91c1c', fontWeight: 600 }}>{err}</p>}

      {/* kanban */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 14, alignItems: 'start' }}>
        {COLS.map(col => {
          const list = filtered.filter(r => r.status === col.id)
          const n = more[col.id] || SHOW
          return (
            <div key={col.id} onDragOver={e => { e.preventDefault(); setOver(col.id) }} onDragLeave={() => setOver(null)} onDrop={e => { e.preventDefault(); drop(col.id) }}
              style={{ background: over === col.id ? `${col.color}14` : 'var(--ivory2)', border: `2px ${over === col.id ? 'dashed' : 'solid'} ${over === col.id ? col.color : 'var(--ivory3)'}`, borderRadius: 14, padding: 10, minHeight: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ color: col.color, fontSize: 14.5 }}>{col.label}</strong>
                <span style={{ fontSize: 12, fontWeight: 700, background: col.color, color: 'white', borderRadius: 100, padding: '1px 9px' }}>{list.length}</span>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', margin: '2px 0 8px' }}>{col.hint}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 620, overflowY: 'auto' }}>
                {list.slice(0, n).map(r => (
                  <div key={r.slug} draggable onDragStart={() => setDragSlug(r.slug)} onDragEnd={() => { setDragSlug(null); setOver(null) }}
                    style={{ background: 'white', border: '1px solid var(--ivory3)', borderLeft: `4px solid ${col.color}`, borderRadius: 10, padding: '8px 10px', cursor: 'grab', opacity: dragSlug === r.slug ? 0.5 : 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 13.5 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.city ? `${r.city}, ` : ''}{r.state}{r.votes ? ` · ${r.votes} request${r.votes > 1 ? 's' : ''}` : ''}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 5, alignItems: 'center', flexWrap: 'wrap' }}>
                      {r.live_url && <a href={r.live_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--crimson)', fontWeight: 700 }}>Open stream ↗</a>}
                      {r.website && <a href={r.website} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--muted)' }}>Website ↗</a>}
                      <button onClick={() => setEdit({ row: r, status: r.status === 'none' || r.status === 'unverified' ? 'official' : r.status })} style={{ fontSize: 12, background: 'none', border: 'none', color: col.color, fontWeight: 700, cursor: 'pointer', padding: 0 }}>{r.status === 'official' || r.status === 'channel' ? 'Edit' : 'Verify…'}</button>
                    </div>
                    {r.verified_at && <div style={{ fontSize: 11, color: '#166534', marginTop: 3 }}>Verified {new Date(r.verified_at).toLocaleDateString('en-IN')}{r.live_note ? ` — ${r.live_note}` : ''}</div>}
                  </div>
                ))}
                {list.length > n && <button className="btn btn-secondary" onClick={() => setMore({ ...more, [col.id]: n + SHOW })}>Show {Math.min(SHOW, list.length - n)} more</button>}
                {!list.length && <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: 18 }}>Nothing here</div>}
              </div>
            </div>
          )
        })}
      </div>

      {edit && <VerifyDialog row={edit.row} initial={edit.status} onClose={() => setEdit(null)} onSave={async (status, url, note) => { const e = await save(edit.row, status, { live_url: url, live_note: note }); if (!e) setEdit(null); return e }} />}
    </div>
  )
}

function VerifyDialog({ row, initial, onClose, onSave }: { row: Row; initial: Status; onClose: () => void; onSave: (s: Status, url: string, note: string) => Promise<string> }) {
  const [status, setStatus] = useState<Status>(initial)
  const [url, setUrl] = useState(row.live_url)
  const [note, setNote] = useState(row.live_note)
  const [watched, setWatched] = useState(false)
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [server, setServer] = useState('')
  const [busy, setBusy] = useState(false)
  const needsProof = status === 'official' || status === 'channel'

  const submit = async () => {
    const e: Record<string, string> = {}
    if (needsProof) {
      let ok = false
      try { const u = new URL(url); ok = /^https?:$/.test(u.protocol) && !(u.hostname.includes('youtube.com') && u.pathname.startsWith('/results')) } catch { ok = false }
      if (!ok) e.url = 'Enter the real stream link (https://…). A YouTube search page is not accepted.'
      if (note.trim().length < 10) e.note = 'Say how you checked it, at least 10 characters (e.g. “Watched the 6 pm aarti live on the temple’s channel, 22 Oct”).'
      if (!watched) e.watched = 'Please confirm you watched the stream.'
    }
    setErrs(e)
    if (Object.keys(e).length) return
    setBusy(true); setServer(await onSave(status, url, note)); setBusy(false)
  }

  return (
    <div role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: 'white', borderRadius: 16, padding: 22, width: '100%', maxWidth: 560, maxHeight: '92vh', overflowY: 'auto' }}>
        <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 2 }}>{row.name}</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>{row.state} · set what is true about its live darshan</p>

        <fieldset style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '10px 14px', marginBottom: 12 }}>
          <legend style={{ fontWeight: 700, fontSize: 13.5, padding: '0 6px' }}>1. Status</legend>
          {COLS.map(c => (
            <label key={c.id} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '4px 0', cursor: 'pointer', fontSize: 14 }}>
              <input type="radio" name="st" checked={status === c.id} onChange={() => setStatus(c.id)} style={{ marginTop: 4 }} />
              <span><strong style={{ color: c.color }}>{c.label}</strong><span style={{ display: 'block', fontSize: 12, color: 'var(--muted)' }}>{c.hint}</span></span>
            </label>
          ))}
        </fieldset>

        {needsProof && (
          <fieldset style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '10px 14px', marginBottom: 12 }}>
            <legend style={{ fontWeight: 700, fontSize: 13.5, padding: '0 6px' }}>2. Proof</legend>
            <label style={{ display: 'block', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Stream link <span style={{ color: '#b91c1c' }}>*</span></span>
              <input className="input" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://…" style={{ width: '100%', borderColor: errs.url ? '#b91c1c' : undefined }} />
              {url && <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: 'var(--crimson)' }}>Open it to check ↗</a>}
              {errs.url && <div style={{ color: '#b91c1c', fontSize: 12.5, fontWeight: 600 }}>{errs.url}</div>}
            </label>
            <label style={{ display: 'block', marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>How did you verify it? <span style={{ color: '#b91c1c' }}>*</span></span>
              <textarea className="input" rows={3} value={note} onChange={e => setNote(e.target.value)} style={{ width: '100%', borderColor: errs.note ? '#b91c1c' : undefined }} />
              {errs.note && <div style={{ color: '#b91c1c', fontSize: 12.5, fontWeight: 600 }}>{errs.note}</div>}
            </label>
            <label style={{ display: 'flex', gap: 8, fontSize: 13.5, cursor: 'pointer' }}>
              <input type="checkbox" checked={watched} onChange={e => setWatched(e.target.checked)} style={{ marginTop: 3 }} /> I watched this stream myself and it shows this temple’s darshan.
            </label>
            {errs.watched && <div style={{ color: '#b91c1c', fontSize: 12.5, fontWeight: 600 }}>{errs.watched}</div>}
          </fieldset>
        )}
        {server && <p role="alert" style={{ color: '#b91c1c', fontWeight: 600, fontSize: 13.5 }}>{server}</p>}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" disabled={busy} onClick={submit}>{busy ? 'Saving…' : 'Save'}</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
