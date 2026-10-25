'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

interface Row { id: string; name: string; email: string; phone: string; provider: string; createdAt: string; active: boolean; verified: boolean; flags: string[]; level: 'junk' | 'suspicious' | 'clean' }
const COL = { junk: '#b91c1c', suspicious: '#C0570A', clean: '#15803d' }
const LABEL = { junk: 'Likely junk', suspicious: 'Suspicious', clean: 'Looks fine' }

export default function UsersAudit() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState('')
  const [msg, setMsg] = useState('')
  const [lvl, setLvl] = useState<'all' | Row['level']>('junk')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<Set<string>>(new Set())
  const [confirmTxt, setConfirmTxt] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const r = await fetch('/api/admin/users')
    if (!r.ok) { setErr(r.status === 401 ? 'Your admin session has expired — sign in again from /admin.' : 'Could not load users.'); setLoading(false); return }
    setRows((await r.json()).rows || []); setLoading(false)
  }, [])
  useEffect(() => { load() }, [load])

  const count = (l: Row['level']) => rows.filter(r => r.level === l).length
  const shown = useMemo(() => rows.filter(r => (lvl === 'all' || r.level === lvl) && (!q || `${r.name} ${r.email} ${r.phone}`.toLowerCase().includes(q.toLowerCase()))), [rows, lvl, q])
  const deletable = (r: Row) => r.level === 'junk' && !r.active
  const days = useMemo(() => {
    const out: { d: string; n: number; junk: number }[] = []
    for (let i = 13; i >= 0; i--) { const dt = new Date(Date.now() - i * 864e5); out.push({ d: dt.toISOString().slice(5, 10), n: 0, junk: 0 }) }
    rows.forEach(r => { const k = new Date(r.createdAt).toISOString().slice(5, 10); const o = out.find(x => x.d === k); if (o) { o.n++; if (r.level === 'junk') o.junk++ } })
    return out
  }, [rows])
  const maxN = Math.max(1, ...days.map(d => d.n))

  const toggle = (id: string) => setSel(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n })
  const selectAllJunk = () => setSel(new Set(shown.filter(deletable).map(r => r.id)))
  const del = async () => {
    setBusy(true); setMsg(''); setErr('')
    const r = await fetch('/api/admin/users', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ids: Array.from(sel), confirm: confirmTxt }) })
    const d = await r.json().catch(() => ({}))
    if (r.ok) { setMsg(`Deleted ${d.deleted} account(s)${d.skipped ? `; ${d.skipped} skipped because they are not junk or have activity` : ''}.`); setSel(new Set()); setConfirmTxt(''); load() } else setErr(d.error || 'Could not delete.')
    setBusy(false)
  }

  return (
    <div style={{ padding: 24, maxWidth: 1250, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 6 }}>
        <h1 className="font-serif" style={{ fontSize: 28, fontWeight: 600 }}>User accounts — junk check</h1>
        <div style={{ display: 'flex', gap: 8 }}><a href="/api/admin/users?format=csv" className="btn btn-secondary">Download CSV backup</a><Link href="/admin/dashboard" className="btn btn-secondary">Dashboard</Link></div>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 780, marginBottom: 16 }}>
        Accounts are rated by disposable mailboxes, domains that cannot receive mail, random-looking addresses and missing mobile numbers. Download the CSV backup first. Only “Likely junk” accounts with no activity can be deleted, and the server re-checks this itself.
      </p>
      {err && <p style={{ color: '#b91c1c', fontWeight: 600 }}>{err}</p>}
      {msg && <p style={{ color: '#15803d', fontWeight: 700 }}>{msg}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 16 }}>
        {[['All accounts', rows.length, '#444', 'all'], ['Likely junk', count('junk'), COL.junk, 'junk'], ['Suspicious', count('suspicious'), COL.suspicious, 'suspicious'], ['Looks fine', count('clean'), COL.clean, 'clean']].map(([l, n, c, k]) => (
          <button key={l as string} onClick={() => { setLvl(k as any); setSel(new Set()) }} style={{ textAlign: 'left', cursor: 'pointer', background: lvl === k ? `${c}12` : 'white', border: `1.5px solid ${lvl === k ? c : 'var(--ivory3)'}`, borderTop: `4px solid ${c}`, borderRadius: 12, padding: '12px 14px' }}>
            <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>{l}</div><div style={{ fontSize: 28, fontWeight: 700, color: c as string }}>{n}</div>
          </button>
        ))}
      </div>

      <div style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 12, padding: '12px 14px', marginBottom: 16 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--muted)', marginBottom: 8 }}>Sign-ups per day, last 14 days (red = likely junk) — a sudden spike means a bot</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
          {days.map(d => (
            <div key={d.d} title={`${d.d}: ${d.n} sign-ups, ${d.junk} likely junk`} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
              <div style={{ width: '100%', height: `${(d.n / maxN) * 70}px`, background: 'var(--ivory3)', borderRadius: 3, position: 'relative', minHeight: d.n ? 3 : 0 }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: d.n ? `${(d.junk / d.n) * 100}%` : 0, background: COL.junk, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 9.5, color: 'var(--muted)', marginTop: 3 }}>{d.d.slice(3)}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
        <input className="input" value={q} onChange={e => setQ(e.target.value)} placeholder="Search name, email or phone" style={{ maxWidth: 320 }} />
        <button className="btn btn-secondary btn-sm" onClick={selectAllJunk}>Select all deletable shown</button>
        <button className="btn btn-ghost btn-sm" onClick={() => setSel(new Set())}>Clear selection</button>
        <span style={{ fontSize: 13, color: 'var(--muted)' }}>{sel.size} selected</span>
      </div>

      {sel.size > 0 && (
        <div style={{ background: '#b91c1c0d', border: '1.5px solid #b91c1c55', borderRadius: 12, padding: 14, marginBottom: 14 }}>
          <strong style={{ color: '#b91c1c' }}>Delete {sel.size} account(s) permanently?</strong>
          <p style={{ fontSize: 13, margin: '4px 0 8px', color: 'var(--ink2)' }}>This cannot be undone. Have you downloaded the CSV backup? Type DELETE to confirm.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" value={confirmTxt} onChange={e => setConfirmTxt(e.target.value)} placeholder="DELETE" style={{ maxWidth: 160 }} />
            <button className="btn btn-primary" disabled={busy || confirmTxt !== 'DELETE'} onClick={del} style={{ background: '#b91c1c' }}>{busy ? 'Deleting…' : 'Delete selected'}</button>
          </div>
        </div>
      )}

      <div style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 12, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead><tr style={{ background: 'var(--ivory2)', textAlign: 'left' }}>{['', 'Rating', 'Name', 'Email', 'Phone', 'Joined', 'Why flagged'].map(h => <th key={h} style={{ padding: '9px 10px', fontSize: 12 }}>{h}</th>)}</tr></thead>
          <tbody>
            {loading && <tr><td colSpan={7} style={{ padding: 20, color: 'var(--muted)' }}>Checking accounts… this takes a few seconds.</td></tr>}
            {!loading && shown.slice(0, 500).map(r => (
              <tr key={r.id} style={{ borderTop: '1px solid var(--ivory3)' }}>
                <td style={{ padding: '8px 10px' }}><input type="checkbox" disabled={!deletable(r)} checked={sel.has(r.id)} onChange={() => toggle(r.id)} title={deletable(r) ? '' : r.active ? 'Has activity — cannot delete here' : 'Only likely-junk accounts can be deleted here'} /></td>
                <td style={{ padding: '8px 10px' }}><span style={{ color: COL[r.level], fontWeight: 700 }}>{LABEL[r.level]}</span></td>
                <td style={{ padding: '8px 10px' }}>{r.name || '—'}</td>
                <td style={{ padding: '8px 10px', wordBreak: 'break-all' }}>{r.email}</td>
                <td style={{ padding: '8px 10px' }}>{r.phone || '—'}</td>
                <td style={{ padding: '8px 10px', whiteSpace: 'nowrap' }}>{new Date(r.createdAt).toLocaleDateString('en-IN')}</td>
                <td style={{ padding: '8px 10px', color: 'var(--muted)' }}>{r.flags.join(' · ') || '—'}{r.active ? ' · has activity' : ''}</td>
              </tr>
            ))}
            {!loading && shown.length === 0 && <tr><td colSpan={7} style={{ padding: 20, color: 'var(--muted)' }}>Nothing here.</td></tr>}
          </tbody>
        </table>
      </div>
      {shown.length > 500 && <p style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 8 }}>Showing the first 500 of {shown.length}. Delete in batches.</p>}
    </div>
  )
}
