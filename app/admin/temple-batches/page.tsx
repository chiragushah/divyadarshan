'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

interface Src { url: string; what_it_supports: string }
interface Change { field: 'description' | 'official_website'; from: string; to: string }
interface Row { slug: string; name: string; found: boolean; changes: Change[]; skipped: string[]; item: { timings_official: string | null; sources: Src[]; notes: string | null } }
interface Status { applied_at: string; undone_at?: string; count: number }
interface BatchSummary { id: string; title: string; count: number; status: Status | null }

const INK = '#2A1A0E', SAF = '#C0570A', LINE = '#E8DCCB'
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: 18 }
const live = (s: Status | null) => !!s && !s.undone_at

export default function TempleBatches() {
  const [batches, setBatches] = useState<BatchSummary[]>([])
  const [open, setOpen] = useState<string>('')
  const [rows, setRows] = useState<Row[]>([])
  const [status, setStatus] = useState<Status | null>(null)
  const [pick, setPick] = useState<Set<string>>(new Set())
  const [word, setWord] = useState('')
  const [err, setErr] = useState('')
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [fe, setFe] = useState<Record<string, string>>({})

  const loadList = useCallback(async () => {
    const r = await fetch('/api/admin/temple-batch')
    if (!r.ok) { setErr(r.status === 401 ? 'Your admin session has expired. Sign in again from /admin.' : 'Could not load batches.'); return }
    setBatches((await r.json()).batches)
  }, [])
  const loadBatch = useCallback(async (id: string) => {
    setOpen(id); setRows([]); setMsg(''); setErr('')
    const r = await fetch('/api/admin/temple-batch?batch=' + encodeURIComponent(id))
    if (!r.ok) { setErr('Could not load this batch.'); return }
    const d = await r.json(); setRows(d.preview.rows); setStatus(d.status)
    setPick(new Set(d.preview.rows.filter((x: Row) => x.changes.length).map((x: Row) => x.slug)))
  }, [])
  useEffect(() => { loadList() }, [loadList])

  const toggle = (s: string) => setPick(p => { const n = new Set(p); n.has(s) ? n.delete(s) : n.add(s); return n })
  const apply = async () => {
    const e: Record<string, string> = {}
    if (!pick.size) e.pick = 'Tick at least one temple.'
    if (word.trim() !== 'APPLY') e.word = 'Type APPLY exactly (capital letters) to confirm.'
    setFe(e); setMsg(''); if (Object.keys(e).length) return
    setBusy(true)
    const r = await fetch('/api/admin/temple-batch', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ batch: open, confirm: 'APPLY', slugs: Array.from(pick) }) })
    const d = await r.json().catch(() => ({}))
    setMsg(r.ok ? `Done. ${d.applied} temples updated.` : d.error || 'Could not apply.'); setWord('')
    setBusy(false); loadList(); loadBatch(open)
  }
  const undo = async () => {
    if (!confirm('Put every temple in this batch back exactly as it was before?')) return
    setBusy(true)
    const r = await fetch('/api/admin/temple-batch?batch=' + encodeURIComponent(open), { method: 'DELETE' })
    const d = await r.json().catch(() => ({}))
    setMsg(r.ok ? `Undone. ${d.restored} temples restored.` : d.error || 'Could not undo.')
    setBusy(false); loadList(); loadBatch(open)
  }
  const host = (u: string) => { try { return new URL(u).hostname.replace(/^www\./, '') } catch { return u } }
  const withChanges = rows.filter(r => r.changes.length)

  return (
    <div style={{ minHeight: '100vh', background: '#FBF6EE', color: INK, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px 60px' }}>
        <Link href="/admin/dashboard" style={{ fontSize: 13, color: SAF, textDecoration: 'none' }}>← Admin dashboard</Link>
        <h1 style={{ fontSize: 26, margin: '8px 0 4px' }}>Temple batches</h1>
        <p style={{ fontSize: 14, color: '#6b5a48', margin: '0 0 18px', maxWidth: 760 }}>
          Each batch is researched from official sources, with every source listed. It only fills fields that are empty or too short and never overwrites a good description. Nothing goes live until you apply it, and you can undo a batch at any time.
        </p>
        {err && <div role="alert" style={{ ...card, borderColor: '#d9534f', color: '#a02622', marginBottom: 14 }}>{err}</div>}

        <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
          {batches.map(b => (
            <button key={b.id} onClick={() => loadBatch(b.id)} style={{ ...card, textAlign: 'left', cursor: 'pointer', borderColor: open === b.id ? SAF : LINE, display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center' }}>
              <span><strong>{b.title}</strong><br /><span style={{ fontSize: 12, color: '#8a7a68' }}>{b.count} temples</span></span>
              <span style={{ fontSize: 12, fontWeight: 700, color: live(b.status) ? '#2E7D32' : '#8a7a68' }}>{live(b.status) ? `Applied (${b.status!.count})` : b.status?.undone_at ? 'Undone' : 'Not applied'}</span>
            </button>))}
          {batches.length === 0 && !err && <div style={card}>No batches yet.</div>}
        </div>

        {open && rows.length === 0 && !err && <div style={card}>Loading…</div>}
        {open && rows.length > 0 && (<>
          <div style={{ ...card, marginBottom: 14, display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 13 }}>
            <span>In batch: <strong>{rows.length}</strong></span><span>Will change: <strong>{withChanges.length}</strong></span>
            <span>Nothing to change: <strong>{rows.length - withChanges.length}</strong></span>
          </div>
          {rows.map(r => (
            <div key={r.slug} style={{ ...card, marginBottom: 12, opacity: r.changes.length ? 1 : 0.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                <label style={{ fontWeight: 700, fontSize: 15 }}>
                  <input type="checkbox" disabled={!r.changes.length || live(status)} checked={pick.has(r.slug)} onChange={() => toggle(r.slug)} /> {r.name}
                </label>
                <Link href={`/temple/${r.slug}`} target="_blank" style={{ fontSize: 12, color: SAF }}>View on site ↗</Link>
              </div>
              {r.changes.map(c => (
                <div key={c.field} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#8a7a68', textTransform: 'uppercase', marginBottom: 4 }}>{c.field === 'description' ? 'Description' : 'Official website'}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 10 }}>
                    <div style={{ background: '#FBEFEF', borderRadius: 8, padding: 10, fontSize: 13, lineHeight: 1.55 }}><div style={{ fontSize: 11, color: '#a02622', fontWeight: 700 }}>NOW</div>{c.from || <em style={{ color: '#8a7a68' }}>empty</em>}</div>
                    <div style={{ background: '#EEF7EE', borderRadius: 8, padding: 10, fontSize: 13, lineHeight: 1.55 }}><div style={{ fontSize: 11, color: '#2E7D32', fontWeight: 700 }}>PROPOSED</div>
                      {c.field === 'official_website' ? <a href={c.to} target="_blank" rel="noopener noreferrer" style={{ color: SAF }}>{c.to}</a> : c.to}</div>
                  </div>
                </div>))}
              {r.skipped.length > 0 && <div style={{ fontSize: 12, color: '#8a7a68' }}>{r.skipped.join(' · ')}</div>}
              {r.item.timings_official && <div style={{ fontSize: 12.5, marginTop: 6 }}><strong>Official timings found (for you to compare, not applied):</strong> {r.item.timings_official}</div>}
              {r.item.sources?.length > 0 && <div style={{ fontSize: 12, marginTop: 6 }}><strong>Sources:</strong> {r.item.sources.map((s, i) => <span key={i}>{i > 0 && ' · '}<a href={s.url} target="_blank" rel="noopener noreferrer" title={s.what_it_supports} style={{ color: SAF }}>{host(s.url)}</a></span>)}</div>}
              {r.item.notes && <div style={{ fontSize: 12, marginTop: 6, color: '#8a5a00' }}><strong>Check:</strong> {r.item.notes}</div>}
            </div>))}

          <div style={{ ...card, borderColor: SAF }}>
            {live(status) ? (<>
              <h3 style={{ margin: '0 0 6px' }}>This batch is live</h3>
              <p style={{ fontSize: 13, color: '#6b5a48', margin: '0 0 10px' }}>Applied on {new Date(status!.applied_at).toLocaleString('en-IN')}. Undo puts the earlier text back exactly.</p>
              <button onClick={undo} disabled={busy} style={{ border: '1px solid #d9534f', color: '#a02622', background: '#fff', borderRadius: 10, padding: '9px 20px', fontWeight: 700, cursor: 'pointer' }}>Undo this batch</button>
            </>) : (
              <form onSubmit={e => { e.preventDefault(); apply() }} noValidate>
                <h3 style={{ margin: '0 0 6px' }}>Apply to the live site</h3>
                <p style={{ fontSize: 13, color: '#6b5a48', margin: '0 0 10px' }}>{pick.size} of {withChanges.length} temples ticked. Read the sources above first.</p>
                {fe.pick && <div role="alert" style={{ color: '#a02622', fontSize: 12, marginBottom: 6 }}>{fe.pick}</div>}
                <label htmlFor="ap" style={{ fontSize: 12, fontWeight: 700, color: '#8a7a68', display: 'block', marginBottom: 4 }}>TYPE <code>APPLY</code> TO CONTINUE</label>
                <input id="ap" value={word} onChange={e => setWord(e.target.value)} autoComplete="off" style={{ padding: '8px 12px', border: `1px solid ${fe.word ? '#d9534f' : LINE}`, borderRadius: 8, fontSize: 14, width: 180, marginRight: 10 }} />
                <button type="submit" disabled={busy} style={{ background: SAF, color: '#fff', border: 0, borderRadius: 10, padding: '10px 22px', fontWeight: 700, cursor: busy ? 'wait' : 'pointer' }}>{busy ? 'Applying…' : 'Apply batch'}</button>
                {fe.word && <div role="alert" style={{ color: '#a02622', fontSize: 12, marginTop: 6 }}>{fe.word}</div>}
              </form>)}
            {msg && <div role="status" style={{ marginTop: 10, fontSize: 13, fontWeight: 600 }}>{msg}</div>}
          </div>
        </>)}
      </div>
    </div>
  )
}
