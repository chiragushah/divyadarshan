'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { EVIDENCE_TYPES } from '@/lib/kuldeviTrust'

interface L { _id: string; community: string; gotra?: string; surnames?: string; deity_name: string; kuldevi_slug?: string; state?: string; evidence_type: string; evidence_source: string; evidence_note: string; verified_on: string; status: 'active' | 'withdrawn'; withdraw_reason?: string }
interface Fl { _id: string; target: string; deity_name: string; community?: string; gotra?: string; reason: string; status: 'open' | 'resolved'; admin_note?: string; user_email: string; createdAt: string }

const EMPTY = { community: '', gotra: '', surnames: '', deity_name: '', kuldevi_slug: '', state: '', evidence_type: '', evidence_source: '', evidence_note: '', verified_on: '', confirm: false }
const R: Record<string, [number, string]> = { community: [3, 'Community'], deity_name: [3, 'Deity name'], evidence_source: [5, 'Source (trust, book or elder with role)'], evidence_note: [30, 'What was confirmed, and how'] }

export default function VerifiedAdmin() {
  const [links, setLinks] = useState<L[]>([])
  const [flags, setFlags] = useState<Fl[]>([])
  const [err, setErr] = useState('')
  const [f, setF] = useState(EMPTY)
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [ok, setOk] = useState('')
  const [dragId, setDragId] = useState<string | null>(null)
  const [over, setOver] = useState<string | null>(null)

  const load = useCallback(async () => {
    const r = await fetch('/api/admin/kuldevi-links')
    if (!r.ok) { setErr(r.status === 401 ? 'Your admin session has expired — sign in again from /admin.' : 'Could not load.'); return }
    const d = await r.json(); setLinks(d.links || []); setFlags(d.flags || [])
  }, [])
  useEffect(() => { load() }, [load])

  const check = (x: typeof EMPTY) => {
    const e: Record<string, string> = {}
    for (const [k, [min, label]] of Object.entries(R)) if (((x as any)[k] as string).trim().length < min) e[k] = `${label}: at least ${min} characters.`
    if (!x.gotra.trim() && !x.surnames.trim()) e.gotra = 'Give a gotra, surnames, or both.'
    if (!x.evidence_type) e.evidence_type = 'Choose the kind of evidence.'
    if (!x.verified_on) e.verified_on = 'Date of verification is required.'
    else if (+new Date(x.verified_on) > Date.now() + 86400000) e.verified_on = 'The date cannot be in the future.'
    if (!x.confirm) e.confirm = 'Please confirm you checked the source yourself.'
    return e
  }
  const set = (k: keyof typeof EMPTY, v: any) => setF(p => ({ ...p, [k]: v }))
  const submit = async () => {
    const e = check(f); setErrs(e); setOk('')
    if (Object.keys(e).length) return
    setBusy(true)
    const r = await fetch('/api/admin/kuldevi-links', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
    const d = await r.json().catch(() => ({}))
    if (r.status === 201) { setOk('Saved. It is now shown as Verified in the finder.'); setF(EMPTY); setErrs({}); load() } else { if (d.errors) setErrs(d.errors); setErr(d.error || 'Could not save.') }
    setBusy(false)
  }
  const withdraw = async (id: string, status: 'active' | 'withdrawn') => {
    let reason = ''
    if (status === 'withdrawn') { reason = prompt('Why is this being withdrawn? (10+ characters)') || ''; if (reason.trim().length < 10) return }
    const r = await fetch('/api/admin/kuldevi-links', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status, withdraw_reason: reason }) })
    if (r.ok) load(); else setErr((await r.json().catch(() => ({}))).error || 'Could not update.')
  }
  const moveFlag = async (id: string, status: 'open' | 'resolved') => {
    const it = flags.find(x => x._id === id); if (!it || it.status === status) return
    const prev = flags; setFlags(flags.map(x => x._id === id ? { ...x, status } : x))
    const r = await fetch('/api/admin/kuldevi-links', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'flag', id, status }) })
    if (!r.ok) { setFlags(prev); setErr('Could not move that card.') }
  }

  const stats = useMemo(() => {
    const active = links.filter(l => l.status === 'active')
    const byComm: Record<string, number> = {}
    active.forEach(l => { byComm[l.community] = (byComm[l.community] || 0) + 1 })
    return { active: active.length, withdrawn: links.length - active.length, open: flags.filter(x => x.status === 'open').length, byComm }
  }, [links, flags])
  const maxC = Math.max(1, ...Object.values(stats.byComm))

  const inp = (k: keyof typeof EMPTY, label: string, ph: string, rows?: number, help?: string) => (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <span style={{ fontSize: 13.5, fontWeight: 700 }}>{label}{R[k as string] && <span style={{ color: '#b91c1c' }}> *</span>}</span>
      {rows ? <textarea className="input" rows={rows} value={(f as any)[k]} onChange={e => set(k, e.target.value)} placeholder={ph} style={{ width: '100%', borderColor: errs[k] ? '#b91c1c' : undefined }} />
        : <input className="input" value={(f as any)[k]} onChange={e => set(k, e.target.value)} placeholder={ph} style={{ width: '100%', borderColor: errs[k] ? '#b91c1c' : undefined }} />}
      {help && !errs[k] && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{help}</span>}
      {errs[k] && <span style={{ fontSize: 12.5, color: '#b91c1c', fontWeight: 600 }}>{errs[k]}</span>}
    </label>
  )
  const Fs = ({ n, t, children }: { n: number; t: string; children: React.ReactNode }) => (
    <fieldset style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '14px 18px', marginBottom: 14, background: 'white' }}><legend style={{ padding: '0 8px', fontWeight: 700, color: 'var(--crimson)' }}>{n}. {t}</legend>{children}</fieldset>
  )

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 6 }}>
        <h1 className="font-serif" style={{ fontSize: 28, fontWeight: 600 }}>Verified kuldevi links</h1>
        <div style={{ display: 'flex', gap: 8 }}><Link href="/admin/kuldevi" className="btn btn-secondary">Family submissions</Link><Link href="/admin/dashboard" className="btn btn-secondary">Dashboard</Link></div>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 760, marginBottom: 16 }}>
        A link goes “Verified” only with named evidence. Add one only after you have checked the source yourself — a temple trust, a community body, a published text, or a named elder. Never copy another website’s table.
      </p>
      {err && <p style={{ color: '#b91c1c', fontWeight: 600 }}>{err}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, marginBottom: 20 }}>
        {[['Verified links', stats.active, '#15803d'], ['Withdrawn', stats.withdrawn, '#666'], ['Open reports', stats.open, '#C0570A']].map(([l, n, c]) => (
          <div key={l as string} style={{ background: 'white', border: '1px solid var(--ivory3)', borderTop: `4px solid ${c}`, borderRadius: 12, padding: '12px 14px' }}><div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700 }}>{l}</div><div style={{ fontSize: 28, fontWeight: 700, color: c as string }}>{n}</div></div>
        ))}
        <div style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 12, padding: '12px 14px', gridColumn: 'span 2' }}>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 700, marginBottom: 6 }}>Verified links by community</div>
          {Object.keys(stats.byComm).length === 0 ? <div style={{ fontSize: 13, color: 'var(--muted)' }}>None yet</div> : Object.entries(stats.byComm).map(([c, n]) => (
            <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, marginBottom: 3 }}><span style={{ width: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c}</span><div style={{ flex: 1, background: 'var(--ivory2)', borderRadius: 4 }}><div style={{ width: `${(n / maxC) * 100}%`, background: '#15803d', height: 10, borderRadius: 4 }} /></div><b>{n}</b></div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, alignItems: 'start' }}>
        <div>
          <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Add a verified link</h2>
          <Fs n={1} t="Who it applies to">
            {inp('community', 'Community', 'e.g. Khadayata')}
            {inp('gotra', 'Gotra', 'e.g. Kashyap')}
            {inp('surnames', 'Surnames (comma separated)', 'optional', undefined, 'Only if the source ties these surnames to the deity.')}
          </Fs>
          <Fs n={2} t="The deity">
            {inp('deity_name', 'Deity name', 'e.g. Gunmai Devi')}
            {inp('kuldevi_slug', 'Directory page (slug)', 'optional, e.g. kotyark-dham-umreth')}
            {inp('state', 'State', 'optional')}
          </Fs>
          <Fs n={3} t="The evidence">
            <label style={{ display: 'block', marginBottom: 12 }}><span style={{ fontSize: 13.5, fontWeight: 700 }}>Kind of evidence <span style={{ color: '#b91c1c' }}>*</span></span>
              <select className="input" value={f.evidence_type} onChange={e => set('evidence_type', e.target.value)} style={{ width: '100%', borderColor: errs.evidence_type ? '#b91c1c' : undefined }}>
                <option value="">Choose…</option>{EVIDENCE_TYPES.map(e => <option key={e.id} value={e.id}>{e.label}</option>)}
              </select>{errs.evidence_type && <span style={{ fontSize: 12.5, color: '#b91c1c', fontWeight: 600 }}>{errs.evidence_type}</span>}
            </label>
            {inp('evidence_source', 'Source', 'Trust name, book title and edition, or elder’s name and role')}
            {inp('evidence_note', 'What was confirmed, and how', 'e.g. Temple office confirmed by phone that this gotra’s kuldevi is installed at the Durga Mata shrine.', 4)}
            <label style={{ display: 'block', marginBottom: 12 }}><span style={{ fontSize: 13.5, fontWeight: 700 }}>Date verified <span style={{ color: '#b91c1c' }}>*</span></span>
              <input type="date" className="input" value={f.verified_on} onChange={e => set('verified_on', e.target.value)} style={{ borderColor: errs.verified_on ? '#b91c1c' : undefined }} />
              {errs.verified_on && <span style={{ display: 'block', fontSize: 12.5, color: '#b91c1c', fontWeight: 600 }}>{errs.verified_on}</span>}
            </label>
          </Fs>
          <label style={{ display: 'flex', gap: 8, fontSize: 13.5, marginBottom: 6, cursor: 'pointer' }}><input type="checkbox" checked={f.confirm} onChange={e => set('confirm', e.target.checked)} /> I checked this source myself; it is not copied from another website.</label>
          {errs.confirm && <p style={{ color: '#b91c1c', fontSize: 12.5, fontWeight: 600, margin: '0 0 8px' }}>{errs.confirm}</p>}
          {ok && <p style={{ color: '#15803d', fontWeight: 700 }}>{ok}</p>}
          <button className="btn btn-primary" disabled={busy} onClick={submit}>{busy ? 'Saving…' : 'Save as verified'}</button>
        </div>

        <div>
          <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Verified list</h2>
          {links.length === 0 && <p style={{ color: 'var(--muted)', fontSize: 14 }}>Nothing verified yet. The finder shows only family reports until you add one.</p>}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {links.map(l => (
              <div key={l._id} style={{ background: 'white', border: '1px solid var(--ivory3)', borderLeft: `4px solid ${l.status === 'active' ? '#15803d' : '#999'}`, borderRadius: 10, padding: '10px 12px', opacity: l.status === 'active' ? 1 : 0.65 }}>
                <b>{l.deity_name}</b> <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>· {l.community}{l.gotra ? ` · ${l.gotra}` : ''}{l.surnames ? ` · ${l.surnames}` : ''}</span>
                <div style={{ fontSize: 12.5, color: 'var(--ink2)', marginTop: 3 }}>{EVIDENCE_TYPES.find(e => e.id === l.evidence_type)?.label}: {l.evidence_source} — {new Date(l.verified_on).toLocaleDateString('en-IN')}</div>
                {l.status === 'withdrawn' && <div style={{ fontSize: 12.5, color: '#b91c1c' }}>Withdrawn: {l.withdraw_reason}</div>}
                <button onClick={() => withdraw(l._id, l.status === 'active' ? 'withdrawn' : 'active')} style={{ marginTop: 6, fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 100, border: '1.5px solid #666', background: 'white', cursor: 'pointer' }}>{l.status === 'active' ? 'Withdraw' : 'Restore'}</button>
              </div>
            ))}
          </div>

          <h2 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>Reports from visitors</h2>
          <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 8 }}>Drag a card to Resolved once checked.</p>
          {(['open', 'resolved'] as const).map(col => (
            <div key={col} onDragOver={e => { e.preventDefault(); setOver(col) }} onDragLeave={() => setOver(null)} onDrop={e => { e.preventDefault(); setOver(null); if (dragId) moveFlag(dragId, col); setDragId(null) }}
              style={{ background: over === col ? '#C0570A14' : 'var(--ivory2)', border: `2px ${over === col ? 'dashed' : 'solid'} ${over === col ? '#C0570A' : 'var(--ivory3)'}`, borderRadius: 12, padding: 10, marginBottom: 10, minHeight: 60 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, marginBottom: 6, color: col === 'open' ? '#C0570A' : '#15803d' }}>{col === 'open' ? 'Open' : 'Resolved'} ({flags.filter(x => x.status === col).length})</div>
              {flags.filter(x => x.status === col).map(x => (
                <div key={x._id} draggable onDragStart={() => setDragId(x._id)} onDragEnd={() => { setDragId(null); setOver(null) }} style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 8, padding: '8px 10px', marginBottom: 6, cursor: 'grab', fontSize: 13 }}>
                  <b>{x.deity_name}</b> <span style={{ color: 'var(--muted)' }}>({x.target}{x.community ? ` · ${x.community}` : ''}{x.gotra ? ` · ${x.gotra}` : ''})</span>
                  <div style={{ marginTop: 3 }}>{x.reason}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 11.5, marginTop: 3 }}>{x.user_email} · {new Date(x.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
