'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

interface Row { id: string; name: string; state: string; district: string | null; deity: string | null; deity_source: string | null; completeness: number; slug: string; has_coords: boolean; name_source: string | null }
interface Dup { id: string; name: string; state: string; match: { slug: string; name: string; reason: string } }
interface Exc { id: string; name: string; state: string; reason: string }
interface Batch { _id: string; count: number; at: string }
interface Data { plan: { total: number; fresh: Row[]; duplicates: Dup[]; excluded: Exc[] }; existingCount: number; batches: Batch[] }

const STATES = ['Maharashtra', 'Gujarat', 'Rajasthan']
const INK = '#2A1A0E', SAF = '#C0570A', LINE = '#E8DCCB'
const card: React.CSSProperties = { background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: 18 }

function Bars({ items, color = SAF }: { items: [string, number][]; color?: string }) {
  const max = Math.max(1, ...items.map(i => i[1]))
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      {items.length === 0 && <div style={{ fontSize: 12, color: '#8a7a68' }}>Nothing to show for this filter.</div>}
      {items.map(([k, v]) => (
        <div key={k} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 34px', gap: 8, alignItems: 'center', fontSize: 12 }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={k}>{k}</span>
          <span style={{ background: '#F5EEE3', borderRadius: 100, height: 10 }}><span style={{ display: 'block', width: `${(v / max) * 100}%`, height: 10, background: color, borderRadius: 100 }} /></span>
          <span style={{ textAlign: 'right', fontWeight: 700 }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

export default function TempleImportAdmin() {
  const [data, setData] = useState<Data | null>(null)
  const [err, setErr] = useState('')
  const [slice, setSlice] = useState<string>('All')
  const [deityF, setDeityF] = useState<string>('')
  const [q, setQ] = useState('')
  const [scope, setScope] = useState<string[]>(STATES)
  const [ack, setAck] = useState(false)
  const [word, setWord] = useState('')
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState('')

  const load = useCallback(async () => {
    setErr('')
    const r = await fetch('/api/admin/temple-import')
    if (!r.ok) { setErr(r.status === 401 ? 'Your admin session has expired. Sign in again from /admin.' : 'Could not load the preview.'); return }
    setData(await r.json())
  }, [])
  useEffect(() => { load() }, [load])

  const fresh = useMemo(() => (data?.plan.fresh || []).filter(r => (slice === 'All' || r.state === slice) && (!deityF || (r.deity || 'Not recorded') === deityF) && (!q || r.name.toLowerCase().includes(q.toLowerCase()) || (r.district || '').toLowerCase().includes(q.toLowerCase()))), [data, slice, deityF, q])
  const base = useMemo(() => (data?.plan.fresh || []).filter(r => slice === 'All' || r.state === slice), [data, slice])
  const byDeity = useMemo(() => { const m: Record<string, number> = {}; base.forEach(r => { const k = r.deity || 'Not recorded'; m[k] = (m[k] || 0) + 1 }); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 8) as [string, number][] }, [base])
  const byDistrict = useMemo(() => { const m: Record<string, number> = {}; base.forEach(r => { const k = r.district || 'No district'; m[k] = (m[k] || 0) + 1 }); return Object.entries(m).sort((a, b) => b[1] - a[1]).slice(0, 8) as [string, number][] }, [base])
  const bands = useMemo(() => { const m: Record<string, number> = { '0–49%': 0, '50–66%': 0, '67–83%': 0, '84–100%': 0 }; base.forEach(r => { const c = r.completeness; m[c < 50 ? '0–49%' : c < 67 ? '50–66%' : c < 84 ? '67–83%' : '84–100%']++ }); return Object.entries(m) as [string, number][] }, [base])
  const stateCount = (s: string) => (data?.plan.fresh || []).filter(r => r.state === s).length
  const noDeity = base.filter(r => !r.deity).length, inferred = base.filter(r => r.deity_source === 'Inferred from name').length, noCoords = base.filter(r => !r.has_coords).length

  const validate = () => {
    const e: Record<string, string> = {}
    if (!scope.length) e.scope = 'Choose at least one state.'
    if (!ack) e.ack = 'Please confirm you have read the notes above.'
    if (word.trim() !== 'IMPORT') e.word = 'Type IMPORT exactly (capital letters) to confirm.'
    return e
  }
  const apply = async () => {
    const e = validate(); setErrs(e); setResult('')
    if (Object.keys(e).length) return
    setBusy(true)
    const r = await fetch('/api/admin/temple-import', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ confirm: 'IMPORT', states: scope.length === STATES.length ? [] : scope }) })
    const d = await r.json().catch(() => ({}))
    if (r.ok) { setResult(`Done. ${d.inserted} of ${d.attempted} temples added${d.failed?.length ? ` (${d.failed.length} could not be added)` : ''}. Batch: ${d.batch}`); setAck(false); setWord(''); load() }
    else setResult(d.error || 'The import failed. Nothing was changed.')
    setBusy(false)
  }
  const rollback = async (id: string) => {
    if (!confirm(`Remove all ${data?.batches.find(b => b._id === id)?.count} temples from this import? Temples you have since edited into full listings are kept.`)) return
    const r = await fetch('/api/admin/temple-import?batch=' + encodeURIComponent(id), { method: 'DELETE' })
    const d = await r.json().catch(() => ({}))
    setResult(r.ok ? `Removed ${d.removed} temples from ${id}.` : d.error || 'Could not roll back.')
    load()
  }

  const Tile = ({ label, value, sub, tone }: { label: string; value: number | string; sub?: string; tone?: string }) => (
    <div style={{ ...card, borderTop: `4px solid ${tone || SAF}` }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, color: '#8a7a68', fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 800, color: INK, lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#8a7a68', marginTop: 2 }}>{sub}</div>}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#FBF6EE', color: INK, fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px 60px' }}>
        <Link href="/admin/dashboard" style={{ fontSize: 13, color: SAF, textDecoration: 'none' }}>← Admin dashboard</Link>
        <h1 style={{ fontSize: 26, margin: '8px 0 4px' }}>Open-data temple import</h1>
        <p style={{ fontSize: 14, color: '#6b5a48', margin: '0 0 18px', maxWidth: 760 }}>
          Temples from Wikidata (public domain, CC0) for Maharashtra, Gujarat and Rajasthan. This page only previews. Nothing is added until you confirm at the bottom.
          Added temples appear as <strong>Basic listings</strong>, below your fully written temples, with a notice that details are not yet verified.
        </p>

        {err && <div role="alert" style={{ ...card, borderColor: '#d9534f', color: '#a02622', marginBottom: 16 }}>{err}</div>}
        {!data && !err && <div style={{ ...card }}>Loading the preview…</div>}

        {data && (<>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 12, marginBottom: 16 }}>
            <Tile label="In the file" value={data.plan.total} />
            <Tile label="New to the portal" value={data.plan.fresh.length} tone="#2E7D32" sub="will be added" />
            <Tile label="Already on portal" value={data.plan.duplicates.length} tone="#1565C0" sub="skipped as duplicates" />
            <Tile label="Left out" value={data.plan.excluded.length} tone="#8a7a68" sub="not temples" />
            <Tile label="On portal today" value={data.existingCount} tone={INK} />
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#8a7a68' }}>FILTER</span>
            {['All', ...STATES].map(s => (
              <button key={s} onClick={() => { setSlice(s); setDeityF('') }} aria-pressed={slice === s}
                style={{ padding: '6px 14px', borderRadius: 100, border: `1px solid ${slice === s ? SAF : LINE}`, background: slice === s ? SAF : '#fff', color: slice === s ? '#fff' : INK, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                {s}{s !== 'All' ? ` (${stateCount(s)})` : ''}
              </button>
            ))}
            {deityF && <button onClick={() => setDeityF('')} style={{ padding: '6px 12px', borderRadius: 100, border: `1px solid ${SAF}`, background: '#fff', fontSize: 12, cursor: 'pointer' }}>Deity: {deityF} ✕</button>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12, marginBottom: 16 }}>
            <div style={card}><h3 style={{ margin: '0 0 10px', fontSize: 14 }}>How complete are the records?</h3><Bars items={bands} color="#2E7D32" />
              <p style={{ fontSize: 11, color: '#8a7a68', margin: '10px 0 0' }}>Share of deity, district, coordinates, Wikipedia link, locality and local name that are filled in.</p></div>
            <div style={card}><h3 style={{ margin: '0 0 10px', fontSize: 14 }}>By deity <span style={{ fontWeight: 400, color: '#8a7a68' }}>(click to filter)</span></h3>
              <div style={{ display: 'grid', gap: 6 }}>
                {byDeity.map(([k, v]) => (
                  <button key={k} onClick={() => setDeityF(deityF === k ? '' : k)} style={{ all: 'unset', cursor: 'pointer', display: 'grid', gridTemplateColumns: '120px 1fr 34px', gap: 8, alignItems: 'center', fontSize: 12, opacity: deityF && deityF !== k ? 0.4 : 1 }}>
                    <span>{k}</span><span style={{ background: '#F5EEE3', borderRadius: 100, height: 10 }}><span style={{ display: 'block', width: `${(v / byDeity[0][1]) * 100}%`, height: 10, background: SAF, borderRadius: 100 }} /></span><span style={{ textAlign: 'right', fontWeight: 700 }}>{v}</span>
                  </button>))}
              </div></div>
            <div style={card}><h3 style={{ margin: '0 0 10px', fontSize: 14 }}>Top districts</h3><Bars items={byDistrict} color="#1565C0" /></div>
          </div>

          <div style={{ ...card, marginBottom: 16 }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 15 }}>Things to know before importing</h3>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.7, color: '#4a3a28' }}>
              <li><strong>{noDeity}</strong> temples have no deity recorded and will show “Deity to be confirmed”.</li>
              <li><strong>{inferred}</strong> deities were inferred from the temple name (for example “Hanuman” from “Maruti Mandir”). The temple page says so.</li>
              <li><strong>{noCoords}</strong> have no map coordinates, so they will not appear in “nearby” searches.</li>
              <li>No timings, poojas or travel details exist for these yet. Each page says so plainly and is kept out of search engines and the sitemap until you enrich it.</li>
              <li>Some district names are older (for example Aurangabad). Wikidata may not have caught up with renaming.</li>
            </ul>
          </div>

          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>Temples that would be added ({fresh.length})</h3>
              <input aria-label="Search temples" placeholder="Search name or district" value={q} onChange={e => setQ(e.target.value)} style={{ padding: '6px 12px', border: `1px solid ${LINE}`, borderRadius: 8, fontSize: 13, minWidth: 220 }} />
            </div>
            <div style={{ maxHeight: 360, overflow: 'auto', border: `1px solid ${LINE}`, borderRadius: 8 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
                <thead><tr style={{ position: 'sticky', top: 0, background: '#F5EEE3', textAlign: 'left' }}>{['Temple', 'State', 'District', 'Deity', 'Complete'].map(h => <th key={h} style={{ padding: '8px 10px' }}>{h}</th>)}</tr></thead>
                <tbody>{fresh.slice(0, 300).map(r => (
                  <tr key={r.id} style={{ borderTop: `1px solid ${LINE}` }}>
                    <td style={{ padding: '6px 10px' }}>{r.name}{r.name_source?.startsWith('Transliterated') && <span title={r.name_source} style={{ marginLeft: 6, fontSize: 10, color: '#8a5a00' }}>transliterated</span>}</td>
                    <td style={{ padding: '6px 10px' }}>{r.state}</td><td style={{ padding: '6px 10px' }}>{r.district || '—'}</td>
                    <td style={{ padding: '6px 10px' }}>{r.deity ? <>{r.deity}{r.deity_source === 'Inferred from name' && <span style={{ color: '#8a5a00', fontSize: 10 }}> inferred</span>}</> : '—'}</td>
                    <td style={{ padding: '6px 10px', fontWeight: 700 }}>{r.completeness}%</td>
                  </tr>))}
                  {fresh.length === 0 && <tr><td colSpan={5} style={{ padding: 14, color: '#8a7a68' }}>No temples match this filter.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 12, marginBottom: 16 }}>
            <div style={card}><h3 style={{ margin: '0 0 8px', fontSize: 14 }}>Skipped: already on the portal ({data.plan.duplicates.length})</h3>
              {data.plan.duplicates.length === 0 && <div style={{ fontSize: 12, color: '#8a7a68' }}>No duplicates found.</div>}
              {data.plan.duplicates.map(d => <div key={d.id} style={{ fontSize: 12.5, padding: '5px 0', borderTop: `1px solid ${LINE}` }}><strong>{d.name}</strong> matches <Link href={`/temple/${d.match.slug}`} target="_blank" style={{ color: SAF }}>{d.match.name}</Link><div style={{ color: '#8a7a68' }}>{d.match.reason}</div></div>)}</div>
            <div style={card}><h3 style={{ margin: '0 0 8px', fontSize: 14 }}>Left out ({data.plan.excluded.length})</h3>
              {data.plan.excluded.map(d => <div key={d.id} style={{ fontSize: 12.5, padding: '5px 0', borderTop: `1px solid ${LINE}` }}><strong>{d.name}</strong><div style={{ color: '#8a7a68' }}>{d.reason}</div></div>)}</div>
          </div>

          <form onSubmit={e => { e.preventDefault(); apply() }} noValidate style={{ ...card, borderColor: SAF, marginBottom: 16 }}>
            <h3 style={{ margin: '0 0 4px', fontSize: 16 }}>Add these temples to the portal</h3>
            <p style={{ fontSize: 13, color: '#6b5a48', margin: '0 0 12px' }}>You can undo an import later from the history below.</p>
            <fieldset style={{ border: 0, padding: 0, margin: '0 0 12px' }}>
              <legend style={{ fontSize: 12, fontWeight: 700, color: '#8a7a68', marginBottom: 4 }}>1 · WHICH STATES</legend>
              {STATES.map(s => <label key={s} style={{ marginRight: 16, fontSize: 14 }}><input type="checkbox" checked={scope.includes(s)} onChange={e => setScope(p => e.target.checked ? [...p, s] : p.filter(x => x !== s))} /> {s} ({stateCount(s)})</label>)}
              {errs.scope && <div role="alert" style={{ color: '#a02622', fontSize: 12, marginTop: 4 }}>{errs.scope}</div>}
            </fieldset>
            <div style={{ margin: '0 0 12px' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#8a7a68', marginBottom: 4 }}>2 · CONFIRM</div>
              <label style={{ fontSize: 13 }}><input type="checkbox" checked={ack} onChange={e => setAck(e.target.checked)} /> I understand these are basic listings with no verified timings or rituals, and that some deities are inferred from names.</label>
              {errs.ack && <div role="alert" style={{ color: '#a02622', fontSize: 12, marginTop: 4 }}>{errs.ack}</div>}
            </div>
            <div style={{ margin: '0 0 12px' }}>
              <label htmlFor="imp" style={{ fontSize: 12, fontWeight: 700, color: '#8a7a68', display: 'block', marginBottom: 4 }}>3 · TYPE <code>IMPORT</code> TO CONTINUE</label>
              <input id="imp" value={word} onChange={e => setWord(e.target.value)} autoComplete="off" style={{ padding: '8px 12px', border: `1px solid ${errs.word ? '#d9534f' : LINE}`, borderRadius: 8, fontSize: 14, width: 180 }} />
              {errs.word && <div role="alert" style={{ color: '#a02622', fontSize: 12, marginTop: 4 }}>{errs.word}</div>}
            </div>
            <button type="submit" disabled={busy} style={{ background: SAF, color: '#fff', border: 0, borderRadius: 10, padding: '10px 22px', fontWeight: 700, fontSize: 14, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? 'Adding temples…' : 'Add temples'}</button>
            {result && <div role="status" style={{ marginTop: 12, fontSize: 13, fontWeight: 600 }}>{result}</div>}
          </form>

          <div style={card}>
            <h3 style={{ margin: '0 0 8px', fontSize: 14 }}>Import history</h3>
            {data.batches.length === 0 && <div style={{ fontSize: 12.5, color: '#8a7a68' }}>No imports yet.</div>}
            {data.batches.map(b => (
              <div key={b._id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', padding: '8px 0', borderTop: `1px solid ${LINE}`, fontSize: 13 }}>
                <span><code>{b._id}</code> · {b.count} temples</span>
                <button onClick={() => rollback(b._id)} style={{ border: '1px solid #d9534f', color: '#a02622', background: '#fff', borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 12 }}>Undo this import</button>
              </div>))}
          </div>
        </>)}
      </div>
    </div>
  )
}
