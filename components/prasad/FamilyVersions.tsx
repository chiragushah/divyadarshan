'use client'
import { useEffect, useRef, useState } from 'react'
import { Home, CheckCircle2, Clock, XCircle, ChevronDown } from 'lucide-react'

interface Version { display_name: string; family: string; community?: string; place?: string; title: string; what_differs: string; ingredient_changes: string; method_changes: string; offering_custom?: string; story?: string; createdAt: string; status?: string; moderator_note?: string }

const EMPTY = { family: '', community: '', place: '', show_name: false, title: '', what_differs: '', ingredient_changes: '', method_changes: '', offering_custom: '', story: '', consent: false }
type F = typeof EMPTY

const RULES: Record<string, { min: number; max: number; label: string }> = {
  family: { min: 3, max: 80, label: 'Family or household' },
  community: { min: 0, max: 80, label: 'Community / tradition' },
  place: { min: 0, max: 80, label: 'Town or village' },
  title: { min: 3, max: 80, label: 'Name of your version' },
  what_differs: { min: 30, max: 600, label: 'What is different' },
  ingredient_changes: { min: 20, max: 1200, label: 'Ingredient changes' },
  method_changes: { min: 20, max: 1500, label: 'Method changes' },
  offering_custom: { min: 0, max: 800, label: 'How you offer it at home' },
  story: { min: 0, max: 1500, label: 'The story behind it' },
}

function validate(f: F): Record<string, string> {
  const e: Record<string, string> = {}
  for (const [k, r] of Object.entries(RULES)) {
    const v = ((f as any)[k] as string).trim()
    if (r.min && v.length < r.min) e[k] = `${r.label}: at least ${r.min} characters (you have ${v.length}).`
    if (v.length > r.max) e[k] = `${r.label}: at most ${r.max} characters.`
    if (v && /(https?:\/\/|www\.|\.com\b|\.in\b|\.org\b)/i.test(v)) e[k] = 'Please remove web links.'
  }
  if (!f.consent) e.consent = 'Please confirm before sending.'
  return e
}

export default function FamilyVersions({ dish, variantId, variantTitle, accent }: { dish: string; variantId: string; variantTitle: string; accent: string }) {
  const [approved, setApproved] = useState<Version[]>([])
  const [mine, setMine] = useState<Version[]>([])
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [f, setF] = useState<F>(EMPTY)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [serverErr, setServerErr] = useState('')
  const [expanded, setExpanded] = useState<number | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const load = async () => {
    try {
      const res = await fetch(`/api/family-versions?dish=${encodeURIComponent(dish)}&variant=${encodeURIComponent(variantId)}`)
      const ct = res.headers.get('content-type') || ''
      if (res.ok && ct.includes('json')) { const d = await res.json(); setApproved(d.approved || []); setMine(d.mine || []) }
    } catch { /* ignore */ }
    setLoaded(true)
  }
  useEffect(() => { setLoaded(false); setOpen(false); setDone(false); setF(EMPTY); setTouched({}); setErrs({}); load() }, [dish, variantId]) // eslint-disable-line

  const set = (k: keyof F, v: any) => {
    const next = { ...f, [k]: v }
    setF(next)
    if (touched[k as string]) setErrs(validate(next))
  }
  const blur = (k: string) => { setTouched(t => ({ ...t, [k]: true })); setErrs(validate(f)) }

  const submit = async () => {
    const e = validate(f)
    setErrs(e); setTouched(Object.fromEntries(Object.keys(RULES).concat('consent').map(k => [k, true])))
    if (Object.keys(e).length) { formRef.current?.querySelector('[data-err="1"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return }
    setBusy(true); setServerErr('')
    try {
      const res = await fetch('/api/family-versions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, dish, variant: variantId }) })
      const ct = res.headers.get('content-type') || ''
      const d = ct.includes('json') ? await res.json() : { error: 'Please sign in and try again.' }
      if (res.status === 201) { setDone(true); setOpen(false); setF(EMPTY); setTouched({}); load() }
      else { if (d.errors) setErrs(d.errors); setServerErr(d.error || 'Could not send.') }
    } catch { setServerErr('Could not reach the server. Please try again.') }
    setBusy(false)
  }

  const field = (k: keyof typeof RULES, opts: { rows?: number; ph: string; help?: string }) => {
    const r = RULES[k]
    const v = (f as any)[k] as string
    const bad = touched[k] && errs[k]
    return (
      <label key={k} style={{ display: 'block', marginBottom: 14 }} data-err={bad ? '1' : undefined}>
        <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
          <span>{r.label}{r.min > 0 && <span style={{ color: '#b91c1c' }}> *</span>}</span>
          <span style={{ fontWeight: 500, color: v.length > r.max ? '#b91c1c' : 'var(--muted)', fontSize: 12 }}>{v.length}/{r.max}</span>
        </span>
        {opts.rows ? (
          <textarea className="input" rows={opts.rows} value={v} placeholder={opts.ph} onChange={e => set(k as keyof F, e.target.value)} onBlur={() => blur(k)} style={{ width: '100%', borderColor: bad ? '#b91c1c' : undefined }} />
        ) : (
          <input className="input" value={v} placeholder={opts.ph} onChange={e => set(k as keyof F, e.target.value)} onBlur={() => blur(k)} style={{ width: '100%', borderColor: bad ? '#b91c1c' : undefined }} />
        )}
        {opts.help && !bad && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{opts.help}</span>}
        {bad && <span style={{ fontSize: 12.5, color: '#b91c1c', fontWeight: 600 }}>{errs[k]}</span>}
      </label>
    )
  }

  const statusChip = (s?: string) => {
    const m = s === 'approved' ? { c: '#15803d', I: CheckCircle2, t: 'Published' } : s === 'rejected' ? { c: '#b91c1c', I: XCircle, t: 'Not published' } : { c: '#C0570A', I: Clock, t: 'Waiting for review' }
    return <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center', color: m.c, fontSize: 12, fontWeight: 700 }}><m.I size={13} /> {m.t}</span>
  }

  const card = (v: Version, i: number, own?: boolean) => {
    const id = (own ? 1000 : 0) + i
    return (
      <div key={id} style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '12px 14px', background: 'var(--ivory2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 700, fontSize: 15 }}>{v.title}</div>
          {own && statusChip(v.status)}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 6 }}>{v.display_name}{v.community ? ` · ${v.community}` : ''}{v.place ? ` · ${v.place}` : ''}</div>
        <p style={{ fontSize: 14, color: 'var(--ink2)', lineHeight: 1.65, margin: '0 0 6px' }}>{v.what_differs}</p>
        <button onClick={() => setExpanded(expanded === id ? null : id)} style={{ background: 'none', border: 'none', color: accent, fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: 0, display: 'inline-flex', gap: 4, alignItems: 'center' }}>
          {expanded === id ? 'Show less' : 'Show ingredients & method'} <ChevronDown size={14} style={{ transform: expanded === id ? 'rotate(180deg)' : 'none' }} />
        </button>
        {expanded === id && (
          <div style={{ marginTop: 10, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div><strong>Ingredients: </strong>{v.ingredient_changes}</div>
            <div><strong>Method: </strong>{v.method_changes}</div>
            {v.offering_custom && <div><strong>Offered at home: </strong>{v.offering_custom}</div>}
            {v.story && <div><strong>The story: </strong>{v.story}</div>}
          </div>
        )}
        {own && v.status === 'rejected' && v.moderator_note && <p style={{ fontSize: 12.5, color: '#b91c1c', margin: '8px 0 0' }}>Reviewer’s note: {v.moderator_note}</p>}
      </div>
    )
  }

  return (
    <div style={{ marginTop: 28, paddingTop: 22, borderTop: '1px solid var(--ivory3)' }}>
      <h3 className="font-serif" style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Home size={18} style={{ color: accent }} /> Families’ versions
      </h3>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', lineHeight: 1.65, margin: '0 0 14px' }}>
        Every household has its own way of making {variantTitle}. Share yours — it will appear here after a quick review.
      </p>

      {loaded && approved.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>{approved.map((v, i) => card(v, i))}</div>}
      {loaded && approved.length === 0 && <p style={{ fontSize: 14, color: 'var(--muted)', margin: '0 0 14px' }}>No family versions yet — be the first to add one.</p>}

      {mine.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div className="section-title" style={{ marginBottom: 8 }}>Your submissions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{mine.map((v, i) => card(v, i, true))}</div>
        </div>
      )}

      {done && <p role="status" style={{ color: '#15803d', fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Thank you — your version has been sent for review and will appear here once approved.</p>}

      {!open ? (
        <button className="btn btn-primary" onClick={() => { setOpen(true); setDone(false) }}>Share my family’s version</button>
      ) : (
        <div ref={formRef} style={{ background: `${accent}08`, border: `1px solid ${accent}33`, borderRadius: 14, padding: 16 }}>
          <Section accent={accent} n={1} title="About your family">
            {field('family', { ph: 'e.g. The Iyers of Palakkad', help: 'This is how your family is credited.' })}
            {field('community', { ph: 'e.g. Palakkad Iyer, Gujarati Vaishnav, Konkani GSB' })}
            {field('place', { ph: 'e.g. Pune, or a village name' })}
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5, cursor: 'pointer' }}>
              <input type="checkbox" checked={f.show_name} onChange={e => set('show_name', e.target.checked)} /> Also show my first name
            </label>
          </Section>
          <Section accent={accent} n={2} title="What is different">
            {field('title', { ph: 'e.g. Amma’s jaggery-only modak' })}
            {field('what_differs', { rows: 3, ph: 'In a few sentences: how does your family’s version differ from the one on this page?' })}
            {field('ingredient_changes', { rows: 4, ph: 'Which ingredients are added, left out or swapped, and in what quantity?' })}
            {field('method_changes', { rows: 5, ph: 'Which steps are done differently — timing, heat, technique?' })}
          </Section>
          <Section accent={accent} n={3} title="Offering & memory (optional)">
            {field('offering_custom', { rows: 3, ph: 'How is it offered in your home — which deity, what time, who offers it?' })}
            {field('story', { rows: 4, ph: 'Who taught you this? Is there a story or a rule behind it?' })}
          </Section>
          <Section accent={accent} n={4} title="Before you send">
            <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, cursor: 'pointer', lineHeight: 1.55 }} data-err={touched.consent && errs.consent ? '1' : undefined}>
              <input type="checkbox" checked={f.consent} onChange={e => set('consent', e.target.checked)} onBlur={() => blur('consent')} style={{ marginTop: 3 }} />
              <span>This is my family’s own tradition, written in my own words. I understand it may be edited for clarity, or not published, and can be removed on request.</span>
            </label>
            {touched.consent && errs.consent && <p style={{ color: '#b91c1c', fontSize: 12.5, fontWeight: 600, margin: '6px 0 0' }}>{errs.consent}</p>}
          </Section>
          {serverErr && <p role="alert" style={{ color: '#b91c1c', fontWeight: 600, fontSize: 14 }}>{serverErr}</p>}
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-primary" disabled={busy} onClick={submit}>{busy ? 'Sending…' : 'Send for review'}</button>
            <button className="btn btn-secondary" onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ n, title, children, accent }: { n: number; title: string; children: React.ReactNode; accent: string }) {
  return (
    <fieldset style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '14px 16px', marginBottom: 14, background: 'white' }}>
      <legend style={{ padding: '0 8px', fontWeight: 700, fontSize: 14, color: accent }}>{n}. {title}</legend>
      {children}
    </fieldset>
  )
}
