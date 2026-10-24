'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Users, HelpCircle, Flag, Search } from 'lucide-react'
import { TIER_INFO, EVIDENCE_TYPES, CORROBORATION_MIN, type Tier } from '@/lib/kuldeviTrust'

interface V { id: string; deity_name: string; kuldevi_slug: string; community: string; gotra: string; state: string; evidence_type: string; evidence_source: string; evidence_note: string; verified_on: string; matched_on: string[] }
interface R { deity_name: string; village: string; district: string; state: string; community: string; families: number; very_sure: number; tier: Tier; matched_on: string[]; also_verified: boolean }

const badge = (t: Tier) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, fontWeight: 800, color: 'white', background: TIER_INFO[t].color, borderRadius: 100, padding: '3px 10px' }}>{t === 'verified' ? <ShieldCheck size={12} /> : <Users size={12} />} {TIER_INFO[t].label}</span>

export default function KuldeviFinder({ communities }: { communities: string[] }) {
  const [community, setCommunity] = useState('')
  const [gotra, setGotra] = useState('')
  const [surname, setSurname] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [res, setRes] = useState<{ verified: V[]; reported: R[] } | null>(null)
  const [flagFor, setFlagFor] = useState<string | null>(null)
  const [reason, setReason] = useState('')
  const [flagMsg, setFlagMsg] = useState('')

  const find = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (gotra.trim().length < 2 && surname.trim().length < 2) { setErr('Enter a gotra or a surname (at least 2 letters).'); return }
    setErr(''); setBusy(true); setRes(null); setFlagFor(null); setFlagMsg('')
    try {
      const r = await fetch(`/api/kuldevi/find?community=${encodeURIComponent(community)}&gotra=${encodeURIComponent(gotra)}&surname=${encodeURIComponent(surname)}`)
      const d = (r.headers.get('content-type') || '').includes('json') ? await r.json() : { error: 'Please sign in and try again.' }
      if (!r.ok) setErr(d.error || 'Something went wrong.'); else setRes(d)
    } catch { setErr('Could not reach the server. Please try again.') }
    setBusy(false)
  }

  const sendFlag = async (target: 'verified' | 'reported', ref: string, deity: string, comm: string) => {
    setFlagMsg('')
    if (reason.trim().length < 20) { setFlagMsg('Please tell us what is wrong (at least 20 characters).'); return }
    const r = await fetch('/api/kuldevi/flag', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ target, ref, deity_name: deity, community: comm || community, gotra, reason }) })
    const d = (r.headers.get('content-type') || '').includes('json') ? await r.json() : {}
    if (r.status === 201) { setFlagMsg('Thank you — we will check this.'); setFlagFor(null); setReason('') } else setFlagMsg(d.error || 'Could not send.')
  }

  const flagBox = (key: string, target: 'verified' | 'reported', ref: string, deity: string, comm: string) => (
    <div style={{ marginTop: 8 }}>
      {flagFor !== key ? (
        <button onClick={() => { setFlagFor(key); setFlagMsg('') }} style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 12.5, cursor: 'pointer', display: 'inline-flex', gap: 5, alignItems: 'center', padding: 0 }}><Flag size={12} /> Something wrong? Tell us</button>
      ) : (
        <div>
          <textarea className="input" rows={2} value={reason} onChange={e => setReason(e.target.value)} placeholder="What is wrong, and what does your family say? (20+ characters)" style={{ width: '100%' }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <button className="btn btn-primary btn-sm" onClick={() => sendFlag(target, ref, deity, comm)}>Send</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setFlagFor(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )

  const none = res && res.verified.length === 0 && res.reported.length === 0

  return (
    <div style={{ background: 'white', border: '1px solid var(--ivory3)', borderRadius: 16, padding: 20, marginBottom: 28 }}>
      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Find by gotra or surname</h2>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, marginBottom: 14 }}>
        Every answer is labelled by how well it is backed. Nothing is saved to your account. <Link href="/kuldevi/how-we-verify" style={{ color: 'var(--crimson)', fontWeight: 700 }}>How we verify</Link>
      </p>
      <form onSubmit={find} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10, alignItems: 'end' }}>
        <label style={{ fontSize: 12.5, fontWeight: 700 }}>Community
          <input className="input" list="kd-comm" value={community} onChange={e => setCommunity(e.target.value)} placeholder="e.g. Khadayata" style={{ width: '100%', marginTop: 4 }} />
          <datalist id="kd-comm">{communities.map(c => <option key={c} value={c} />)}</datalist>
        </label>
        <label style={{ fontSize: 12.5, fontWeight: 700 }}>Gotra
          <input className="input" value={gotra} onChange={e => setGotra(e.target.value)} placeholder="e.g. Kashyap" style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ fontSize: 12.5, fontWeight: 700 }}>Surname
          <input className="input" value={surname} onChange={e => setSurname(e.target.value)} placeholder="optional" style={{ width: '100%', marginTop: 4 }} />
        </label>
        <button className="btn btn-primary" disabled={busy} style={{ display: 'inline-flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}><Search size={15} /> {busy ? 'Searching…' : 'Find'}</button>
      </form>
      {err && <p role="alert" style={{ color: '#b91c1c', fontWeight: 600, fontSize: 13.5, marginTop: 10 }}>{err}</p>}
      {flagMsg && <p role="status" style={{ color: '#15803d', fontWeight: 600, fontSize: 13.5, marginTop: 10 }}>{flagMsg}</p>}

      {res && res.verified.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div className="section-title" style={{ marginBottom: 8 }}>Verified</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {res.verified.map(v => (
              <div key={v.id} style={{ border: `1.5px solid ${TIER_INFO.verified.color}55`, background: '#15803d0a', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: 16 }}>{v.kuldevi_slug ? <Link href={`/kuldevi/${v.kuldevi_slug}`} style={{ color: 'var(--crimson)' }}>{v.deity_name}</Link> : v.deity_name}</strong>
                  {badge('verified')}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', margin: '3px 0 6px' }}>{v.community}{v.gotra ? ` · ${v.gotra} gotra` : ''}{v.state ? ` · ${v.state}` : ''} · matched on {v.matched_on.join(' and ')}</div>
                <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--ink2)' }}>
                  <strong>Evidence:</strong> {EVIDENCE_TYPES.find(e => e.id === v.evidence_type)?.label} — {v.evidence_source}. {v.evidence_note}
                  <div style={{ color: 'var(--muted)', fontSize: 12.5 }}>Verified on {new Date(v.verified_on).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
                {flagBox('v' + v.id, 'verified', v.id, v.deity_name, v.community)}
              </div>
            ))}
          </div>
        </div>
      )}

      {res && res.reported.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div className="section-title" style={{ marginBottom: 8 }}>Reported by families</div>
          <p style={{ fontSize: 12.5, color: 'var(--muted)', margin: '0 0 8px' }}>Families who share your gotra or surname have reported these. {CORROBORATION_MIN}+ separate families = “corroborated”. These are leads to confirm with your elders, not final answers.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {res.reported.map((r, i) => (
              <div key={i} style={{ border: '1px solid var(--ivory3)', background: 'var(--ivory2)', borderRadius: 12, padding: '12px 14px' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: 16 }}>{r.deity_name}</strong>{badge(r.tier)}
                  {r.also_verified && <span style={{ fontSize: 12, color: '#15803d', fontWeight: 700 }}>also verified above</span>}
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--muted)', margin: '3px 0' }}>{r.village}, {r.district}, {r.state} · {r.community}</div>
                <div style={{ fontSize: 13.5 }}>{r.families} {r.families === 1 ? 'family' : 'different families'} reported this{r.very_sure ? ` (${r.very_sure} very sure)` : ''}</div>
                {flagBox('r' + i, 'reported', r.village, r.deity_name, r.community)}
              </div>
            ))}
          </div>
        </div>
      )}

      {none && (
        <div style={{ marginTop: 18, padding: 16, borderRadius: 12, background: 'var(--ivory2)', border: '1px dashed var(--ivory3)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontWeight: 700, marginBottom: 6 }}><HelpCircle size={17} /> Not enough information yet</div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--ink2)', margin: '0 0 10px' }}>
            We have no verified record or family reports for this gotra or surname. We would rather say so than guess — a wrong kuldevi on something this personal helps no one. Try another spelling, or ask your elders and add what you learn so the next family can find it.
          </p>
          <Link href="/kuldevi/submit" className="btn btn-primary btn-sm">Add your family’s kuldevi</Link>
        </div>
      )}
    </div>
  )
}
