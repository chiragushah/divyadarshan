'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'

const EMPTY = {
  deity_name: '', deity_kind: 'Kuldevi', other_names: '', deity_form: '',
  village: '', taluka: '', district: '', state: '', how_to_reach: '',
  community: '', subgroup: '', surnames: '', main_seat: '',
  customs: '', visit_times: '', story: '',
  source_basis: '', confidence: 'fairly', show_name: false, consent: false,
}
type F = typeof EMPTY

const RULES: Record<string, { min: number; max: number; label: string }> = {
  deity_name: { min: 3, max: 80, label: 'Deity name' },
  other_names: { min: 0, max: 120, label: 'Other spellings or names' },
  deity_form: { min: 0, max: 200, label: 'Form of the deity' },
  village: { min: 2, max: 80, label: 'Village or town' },
  taluka: { min: 0, max: 80, label: 'Taluka' },
  district: { min: 2, max: 80, label: 'District' },
  state: { min: 2, max: 60, label: 'State' },
  how_to_reach: { min: 20, max: 600, label: 'How to reach' },
  community: { min: 3, max: 80, label: 'Community' },
  subgroup: { min: 0, max: 80, label: 'Gotra or sub-group' },
  surnames: { min: 0, max: 160, label: 'Surnames' },
  main_seat: { min: 0, max: 160, label: 'Connected main temple' },
  customs: { min: 30, max: 1500, label: 'Family customs' },
  visit_times: { min: 0, max: 400, label: 'When the family visits' },
  story: { min: 0, max: 1500, label: 'Story or history' },
  source_basis: { min: 3, max: 60, label: 'How you know this' },
}

function validate(f: F) {
  const e: Record<string, string> = {}
  for (const [k, r] of Object.entries(RULES)) {
    const v = ((f as any)[k] as string).trim()
    if (r.min && v.length < r.min) e[k] = `${r.label}: at least ${r.min} characters (you have ${v.length}).`
    if (v.length > r.max) e[k] = `${r.label}: at most ${r.max} characters.`
    if (v && /(https?:\/\/|www\.|@\w+\.\w+)/i.test(v)) e[k] = 'Please remove web links and email addresses.'
  }
  if (!f.consent) e.consent = 'Please confirm before sending.'
  return e
}

const STATES = ['Gujarat', 'Maharashtra', 'Rajasthan', 'Madhya Pradesh', 'Goa', 'Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Odisha', 'Punjab', 'Haryana', 'Himachal Pradesh', 'Uttarakhand', 'Jammu & Kashmir', 'Delhi', 'Assam', 'Chhattisgarh', 'Jharkhand']
const SOURCES = ['Family elders told me', 'I have visited the temple', 'Family records or a community book', 'Temple trust or committee', 'Other']

function Section({ n, title, hint, children }: { n: number; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: '1px solid var(--ivory3)', borderRadius: 12, padding: '14px 18px', marginBottom: 16, background: 'white' }}>
      <legend style={{ padding: '0 8px', fontWeight: 700, fontSize: 15, color: 'var(--crimson)' }}>{n}. {title}</legend>
      {hint && <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 12px', lineHeight: 1.6 }}>{hint}</p>}
      {children}
    </fieldset>
  )
}

export default function KuldeviSubmitForm() {
  const [f, setF] = useState<F>(EMPTY)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [errs, setErrs] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [serverErr, setServerErr] = useState('')
  const ref = useRef<HTMLDivElement>(null)

  const set = (k: keyof F, v: any) => { const n = { ...f, [k]: v }; setF(n); if (touched[k as string]) setErrs(validate(n)) }
  const blur = (k: string) => { setTouched(t => ({ ...t, [k]: true })); setErrs(validate(f)) }

  const submit = async () => {
    const e = validate(f)
    setErrs(e); setTouched(Object.fromEntries(Object.keys(RULES).concat('consent').map(k => [k, true])))
    if (Object.keys(e).length) { ref.current?.querySelector('[data-err="1"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return }
    setBusy(true); setServerErr('')
    try {
      const res = await fetch('/api/kuldevi', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const ct = res.headers.get('content-type') || ''
      const d = ct.includes('json') ? await res.json() : { error: 'Please sign in and try again.' }
      if (res.status === 201) { setDone(true); setF(EMPTY); setTouched({}); window.scrollTo({ top: 0, behavior: 'smooth' }) }
      else { if (d.errors) setErrs(d.errors); setServerErr(d.error || 'Could not send.') }
    } catch { setServerErr('Could not reach the server. Please try again.') }
    setBusy(false)
  }

  const field = (k: keyof typeof RULES, opts: { rows?: number; ph: string; help?: string; list?: string[] }) => {
    const r = RULES[k]; const v = (f as any)[k] as string; const bad = touched[k] && errs[k]
    const common = { value: v, placeholder: opts.ph, onChange: (e: any) => set(k as keyof F, e.target.value), onBlur: () => blur(k), style: { width: '100%', borderColor: bad ? '#b91c1c' : undefined } as React.CSSProperties }
    return (
      <label key={k} style={{ display: 'block', marginBottom: 14 }} data-err={bad ? '1' : undefined}>
        <span style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>
          <span>{r.label}{r.min > 0 && <span style={{ color: '#b91c1c' }}> *</span>}</span>
          <span style={{ fontWeight: 500, color: v.length > r.max ? '#b91c1c' : 'var(--muted)', fontSize: 12 }}>{v.length}/{r.max}</span>
        </span>
        {opts.rows ? <textarea className="input" rows={opts.rows} {...common} />
          : <input className="input" list={opts.list ? `dl-${k}` : undefined} {...common} />}
        {opts.list && <datalist id={`dl-${k}`}>{opts.list.map(o => <option key={o} value={o} />)}</datalist>}
        {opts.help && !bad && <span style={{ fontSize: 12, color: 'var(--muted)' }}>{opts.help}</span>}
        {bad && <span style={{ fontSize: 12.5, color: '#b91c1c', fontWeight: 600 }}>{errs[k]}</span>}
      </label>
    )
  }

  if (done) return (
    <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 14, padding: 22 }} role="status">
      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 600, color: '#15803d', marginBottom: 6 }}>Thank you — your family’s kuldevi has been sent</h2>
      <p style={{ fontSize: 14.5, lineHeight: 1.7, color: 'var(--ink2)', margin: '0 0 14px' }}>It will appear in the directory after a quick review. We may mark it “family-shared” until it is confirmed by a second source.</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => setDone(false)}>Add another</button>
        <Link href="/kuldevi" className="btn btn-secondary">Back to the directory</Link>
      </div>
    </div>
  )

  return (
    <div ref={ref}>
      <Section n={1} title="The deity" hint="Write the name the way your family says it. If you know other spellings, add them so others can find the page.">
        {field('deity_name', { ph: 'e.g. Gunmai Devi' })}
        <label style={{ display: 'block', marginBottom: 14 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>Kuldevi or kuldevta?</span>
          <select className="input" value={f.deity_kind} onChange={e => set('deity_kind', e.target.value)}>
            <option>Kuldevi</option><option>Kuldevta</option><option>Both</option>
          </select>
        </label>
        {field('other_names', { ph: 'e.g. Gunmata, Gunai', help: 'Other spellings or what the village calls her.' })}
        {field('deity_form', { ph: 'e.g. stone idol, swayambhu, tree shrine', help: 'Optional.' })}
      </Section>

      <Section n={2} title="Where is the temple?" hint="Many kuldevi temples are in small villages that are not on maps, so the nearest town and landmark are very helpful.">
        {field('village', { ph: 'e.g. Maudi' })}
        {field('taluka', { ph: 'Optional' })}
        {field('district', { ph: 'e.g. Anand' })}
        {field('state', { ph: 'Start typing', list: STATES })}
        {field('how_to_reach', { rows: 3, ph: 'Nearest town and railway station, the road, and a landmark that helps people find it.' })}
      </Section>

      <Section n={3} title="Your community" hint="This is not saved on your account. It is only shown beside this temple so that other families of the same tradition can find it.">
        {field('community', { ph: 'e.g. Khadayata' })}
        {field('subgroup', { ph: 'e.g. Daudan, or the gotra', help: 'Optional. As your family names it.' })}
        {field('surnames', { ph: 'e.g. Shah, Mehta', help: 'Optional. Surnames in the family that worship here.' })}
        {field('main_seat', { ph: 'e.g. Kotyark Dham, Umreth', help: 'Optional. A larger common temple your community is linked to.' })}
      </Section>

      <Section n={4} title="Traditions">
        {field('customs', { rows: 5, ph: 'What does the family do here: first haircut, wedding offerings, special offerings, rules to follow?' })}
        {field('visit_times', { rows: 2, ph: 'e.g. every Navratri, or after a wedding. Optional.' })}
        {field('story', { rows: 4, ph: 'Any story or history the elders tell about this deity. Optional.' })}
      </Section>

      <Section n={5} title="How sure are you?" hint="This does not stop your entry being published. It decides how we label it until a second family or a document confirms it.">
        <label style={{ display: 'block', marginBottom: 14 }} data-err={touched.source_basis && errs.source_basis ? '1' : undefined}>
          <span style={{ fontSize: 13.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>How do you know this? <span style={{ color: '#b91c1c' }}>*</span></span>
          <select className="input" style={{ width: '100%', borderColor: touched.source_basis && errs.source_basis ? '#b91c1c' : undefined }} value={f.source_basis} onChange={e => set('source_basis', e.target.value)} onBlur={() => blur('source_basis')}>
            <option value="">Choose one</option>
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </select>
          {touched.source_basis && errs.source_basis && <span style={{ fontSize: 12.5, color: '#b91c1c', fontWeight: 600 }}>{errs.source_basis}</span>}
        </label>
        <label style={{ display: 'block', marginBottom: 6 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, display: 'block', marginBottom: 4 }}>How sure are you?</span>
          <select className="input" value={f.confidence} onChange={e => set('confidence', e.target.value)}>
            <option value="sure">Very sure — my family worships here</option>
            <option value="fairly">Fairly sure — told by elders</option>
            <option value="unsure">Not sure — this is what I have heard</option>
          </select>
        </label>
      </Section>

      <Section n={6} title="Before you send">
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13.5, cursor: 'pointer', marginBottom: 10 }}>
          <input type="checkbox" checked={f.show_name} onChange={e => set('show_name', e.target.checked)} /> Show my first name (otherwise it says “Shared by a family”)
        </label>
        <label style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13.5, cursor: 'pointer', lineHeight: 1.55 }} data-err={touched.consent && errs.consent ? '1' : undefined}>
          <input type="checkbox" checked={f.consent} onChange={e => set('consent', e.target.checked)} onBlur={() => blur('consent')} style={{ marginTop: 3 }} />
          <span>This is what my family believes and practises, in my own words. I understand it may be edited for clarity, labelled “family-shared”, or not published, and can be removed on request.</span>
        </label>
        {touched.consent && errs.consent && <p style={{ color: '#b91c1c', fontSize: 12.5, fontWeight: 600, margin: '6px 0 0' }}>{errs.consent}</p>}
      </Section>

      {serverErr && <p role="alert" style={{ color: '#b91c1c', fontWeight: 600, fontSize: 14 }}>{serverErr}</p>}
      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn btn-primary" disabled={busy} onClick={submit}>{busy ? 'Sending…' : 'Send for review'}</button>
        <Link href="/kuldevi" className="btn btn-secondary">Cancel</Link>
      </div>
    </div>
  )
}
