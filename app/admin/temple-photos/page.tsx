'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

interface Need { slug: string; name: string; city: string; state: string; current: string | null; reason: string }
interface Cand { confidence: 'high' | 'check'; distance_km: number | null; title: string; page_url: string; image_url: string; license: string; credit: string; credit_url: string; match: boolean }
interface Log { id: string; at: string; count: number; undone: boolean }

const INK = '#2A1A0E', SAF = '#C0570A', LINE = '#E8DCCB'
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: 16 }
const prox = (u: string) => '/api/image-proxy?url=' + encodeURIComponent(u)

export default function TemplePhotos() {
  const [need, setNeed] = useState<Need[]>([])
  const [total, setTotal] = useState(0)
  const [logs, setLogs] = useState<Log[]>([])
  const [cands, setCands] = useState<Record<string, Cand[]>>({})
  const [pick, setPick] = useState<Record<string, number>>({})
  const [searching, setSearching] = useState(false)
  const [done, setDone] = useState(0)
  const [word, setWord] = useState('')
  const [err, setErr] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/temple-photos')
    if (!r.ok) { setErr(r.status === 401 ? 'Your admin session has expired. Sign in again from /admin.' : 'Could not load.'); return }
    const d = await r.json(); setNeed(d.need); setTotal(d.total); setLogs(d.logs)
  }, [])
  useEffect(() => { load() }, [load])

  const search = async () => {
    setSearching(true); setErr(''); setMsg(''); setDone(0)
    const slugs = need.filter(n => !cands[n.slug]).map(n => n.slug)
    for (let i = 0; i < slugs.length; i += 4) {
      const chunk = slugs.slice(i, i + 4)
      const r = await fetch('/api/admin/temple-photos?find=' + chunk.join(','))
      if (!r.ok) { setErr('Search stopped (' + r.status + '). Press Find photos again to continue.'); break }
      const d = await r.json()
      setCands(c => { const n = { ...c }; for (const x of d.results) n[x.slug] = x.candidates; return n })
      setPick(p => { const n = { ...p }; for (const x of d.results) { const k = x.candidates.findIndex((c: Cand) => c.confidence === 'high'); if (k >= 0) n[x.slug] = k } return n })
      setDone(Math.min(i + 4, slugs.length))
    }
    setSearching(false)
  }
  const chosen = Object.entries(pick).filter(([s, k]) => k >= 0 && cands[s]?.[k])
  const apply = async () => {
    if (!chosen.length) { setErr('Tick at least one photo.'); return }
    if (word.trim() !== 'APPLY') { setErr('Type APPLY exactly (capital letters) to confirm.'); return }
    setBusy(true); setErr('')
    const items = chosen.map(([s, k]) => { const c = cands[s][k]; return { slug: s, image_url: c.image_url, image_credit: c.credit, image_credit_url: c.credit_url } })
    const r = await fetch('/api/admin/temple-photos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ confirm: 'APPLY', items }) })
    const d = await r.json().catch(() => ({}))
    setMsg(r.ok ? `Done. ${d.applied} photos set.` : d.error || 'Could not apply.'); setWord(''); setCands({}); setPick({}); setBusy(false); load()
  }
  const undo = async (id: string) => {
    if (!confirm('Put the previous photos back for this round?')) return
    const r = await fetch('/api/admin/temple-photos?log=' + id, { method: 'DELETE' })
    const d = await r.json().catch(() => ({})); setMsg(r.ok ? `Undone. ${d.restored} temples restored.` : d.error || 'Could not undo.'); load()
  }

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '24px 16px', color: INK, fontFamily: 'system-ui, sans-serif' }}>
      <Link href="/admin/temple-batches" style={{ color: SAF, fontSize: 13 }}>← Temple batches</Link>
      <h1 style={{ fontSize: 24, margin: '8px 0 4px' }}>Temple photos</h1>
      <p style={{ fontSize: 14, color: '#6b5a48', margin: '0 0 14px' }}>
        {need.length} of {total} temples have no photo or only a generic picture of another temple. This finds freely licensed photos (Wikipedia / Wikimedia Commons) and shows the credit that will appear on the page. Check each photo really shows that temple before applying.
      </p>
      {err && <div style={{ ...card, borderColor: '#c0392b', color: '#c0392b', marginBottom: 12 }}>{err}</div>}
      {msg && <div style={{ ...card, borderColor: '#2e7d32', color: '#2e7d32', marginBottom: 12 }}>{msg}</div>}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
        <button onClick={search} disabled={searching || !need.length} style={{ background: SAF, color: '#fff', border: 0, borderRadius: 100, padding: '10px 20px', fontWeight: 700, cursor: 'pointer' }}>
          {searching ? `Searching… ${done}/${need.filter(n => !cands[n.slug]).length + done}` : 'Find photos'}
        </button>
        <span style={{ fontSize: 13, color: '#6b5a48' }}>{chosen.length} selected ({chosen.filter(([s, k]) => cands[s][k].confidence === 'high').length} auto-checked, the rest need your eyes)</span>
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {need.map(n => {
          const cs = cands[n.slug]
          return (
            <div key={n.slug} style={card}>
              <div style={{ fontWeight: 700 }}>{n.name} <span style={{ fontWeight: 400, color: '#8a7a68', fontSize: 13 }}>{n.city}, {n.state}</span></div>
              <div style={{ fontSize: 12, color: '#8a7a68', marginBottom: 8 }}>{n.reason}</div>
              {!cs ? <div style={{ fontSize: 13, color: '#8a7a68' }}>Not searched yet.</div>
                : !cs.length ? <div style={{ fontSize: 13, color: '#8a7a68' }}>No freely licensed photo found on Wikipedia. Leave as is.</div>
                : <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {cs.map((c, k) => (
                      <label key={k} style={{ width: 210, border: `2px solid ${pick[n.slug] === k ? SAF : LINE}`, borderRadius: 10, padding: 8, cursor: 'pointer', fontSize: 12 }}>
                        <img src={prox(c.image_url)} alt={c.title} style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 6 }} />
                        <div style={{ marginTop: 6 }}>
                          <input type="radio" name={n.slug} checked={pick[n.slug] === k} onChange={() => setPick(p => ({ ...p, [n.slug]: k }))} /> <b>{c.title}</b>
                          {c.confidence === 'high' ? <div style={{ color: '#2e7d32' }}>Auto-checked: name matches and the article's map pin is {c.distance_km} km from the temple</div> : <div style={{ color: '#b45309' }}>{c.match ? 'Name matches' : 'Name does not match'}{c.distance_km === null ? ', no map pin to confirm' : `, map pin ${c.distance_km} km away`}. Check carefully</div>}
                          <div style={{ color: '#6b5a48' }}>{c.credit}</div>
                          <a href={c.page_url} target="_blank" rel="noopener noreferrer" style={{ color: SAF }}>Open article</a>
                        </div>
                      </label>
                    ))}
                    <button onClick={() => setPick(p => ({ ...p, [n.slug]: -1 }))} style={{ alignSelf: 'flex-start', background: 'none', border: `1px solid ${LINE}`, borderRadius: 8, padding: '6px 10px', fontSize: 12, cursor: 'pointer' }}>None of these</button>
                  </div>}
            </div>
          )
        })}
      </div>
      <div style={{ ...card, marginTop: 16, position: 'sticky', bottom: 12 }}>
        <label htmlFor="ap" style={{ fontSize: 12, fontWeight: 700, color: '#8a7a68', display: 'block', marginBottom: 4 }}>TYPE <code>APPLY</code> TO SET {chosen.length} PHOTOS</label>
        <input id="ap" value={word} onChange={e => setWord(e.target.value)} style={{ border: `1px solid ${LINE}`, borderRadius: 8, padding: '8px 10px', marginRight: 10 }} />
        <button onClick={apply} disabled={busy || !chosen.length} style={{ background: INK, color: '#fff', border: 0, borderRadius: 100, padding: '9px 20px', fontWeight: 700, cursor: 'pointer' }}>Apply selected photos</button>
      </div>
      {logs.length > 0 && <div style={{ marginTop: 18, fontSize: 13 }}><b>Recent rounds</b>
        {logs.map(l => <div key={l.id} style={{ marginTop: 6 }}>{new Date(l.at).toLocaleString()}: {l.count} photos {l.undone ? '(undone)' : <button onClick={() => undo(l.id)} style={{ marginLeft: 8, border: `1px solid ${LINE}`, borderRadius: 8, background: '#fff', padding: '2px 8px', cursor: 'pointer' }}>Undo</button>}</div>)}
      </div>}
    </div>
  )
}
