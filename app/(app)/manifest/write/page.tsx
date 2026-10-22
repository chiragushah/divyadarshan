'use client'
import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = ['Health & healing', 'Marriage & relationships', 'Career & business', 'Children & family', 'Education & exams', 'Home & property', 'Financial freedom', 'Peace & wellbeing', 'Spiritual growth', 'Gratitude — already fulfilled', 'Other']
const DEITIES = ['Ganesha', 'Lakshmi', 'Durga', 'Shiva', 'Krishna', 'Saraswati', 'Hanuman', 'Parvati', 'Kali', 'Surya', 'Navagraha Shanti', 'Other']
const TIMELINES = ['By this month', 'Within 3 months', 'Within 6 months', 'By end of this year', 'Within 2 years', 'In divine time', 'No specific timeline']
const PRIVACY = [
  { v: 'private', label: 'Private', desc: 'Only you can see it' },
  { v: 'anonymous', label: 'Anonymous', desc: 'Shared without your name' },
  { v: 'public', label: 'Public', desc: 'Shared with your name' },
]
const MIN_INTENTION = 20

type Form = {
  intention: string; deity: string; category: string; timeline: string
  temple_name: string; temple_slug: string; gratitude_yatra: boolean; privacy: 'private' | 'anonymous' | 'public'
}

export default function WriteSankalpPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [touched, setTouched] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState<Form>({
    intention: '', deity: '', category: '', timeline: '', temple_name: '', temple_slug: '', gratitude_yatra: false, privacy: 'private',
  })
  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm(f => ({ ...f, [k]: v }))

  // Per-step validation — the message says exactly what is missing.
  const stepError = (s: number): string => {
    if (s === 1) {
      if (!form.intention.trim()) return 'Write your intention before continuing.'
      if (form.intention.trim().length < MIN_INTENTION) return `Add a little more detail — at least ${MIN_INTENTION} characters, so your intention is specific.`
    }
    if (s === 2 && !form.deity) return 'Choose the deity you are dedicating this to.'
    return ''
  }
  const next = () => {
    const e = stepError(step)
    setTouched(true)
    if (e) { setError(e); return }
    setError(''); setTouched(false); setStep(s => Math.min(3, s + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const back = () => { setError(''); setTouched(false); setStep(s => Math.max(1, s - 1)) }

  const submit = async () => {
    const e = stepError(1) || stepError(2)
    if (e) { setError(e); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/sankalp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setSuccess(true)
    } catch { setError('Your Sankalp could not be saved. Check your connection and try again.') }
    setLoading(false)
  }

  const css = `
    .sw { --sw-maroon: #2A0A0A; --sw-gold: #9A7535; --sw-gold-lt: #F5E6C8; --sw-line: #E6DCCB;
          max-width: 680px; margin: 0 auto; padding: 28px 20px 72px; font-family: var(--font-sans), 'Outfit', system-ui, sans-serif; color: var(--ink, #111); }
    .sw-back { font-size: 14px; color: var(--crimson, #8B1A1A); text-decoration: none; }
    .sw-back:hover { text-decoration: underline; text-underline-offset: 4px; }
    .sw-h1 { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: clamp(32px, 4.4vw, 42px); line-height: 1.1; margin: 18px 0 6px; color: var(--crimson, #8B1A1A); }
    .sw-sub { margin: 0 0 26px; color: var(--muted, #555); font-size: 15.5px; }

    /* Progress — a real sequence */
    .sw-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 0 0 28px; padding: 0; list-style: none; }
    .sw-steps li { padding: 10px 0 0; border-top: 3px solid var(--sw-line); font-size: 13px; color: var(--muted2, #888); }
    .sw-steps li.is-done { border-top-color: var(--sw-gold); color: var(--muted, #555); }
    .sw-steps li.is-now { border-top-color: var(--crimson, #8B1A1A); color: var(--ink, #111); font-weight: 600; }
    .sw-steps span { display: block; font-size: 11.5px; font-weight: 500; color: var(--muted2, #888); }

    .sw-card { background: #fff; border: 1px solid var(--sw-line); border-radius: 14px; padding: 28px; }
    .sw-q { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-weight: 600; font-size: 26px; line-height: 1.15; margin: 0 0 6px; }
    .sw-help { margin: 0 0 18px; font-size: 14.5px; line-height: 1.6; color: var(--muted, #555); }
    .sw-label { display: block; font-size: 14px; font-weight: 600; margin: 22px 0 8px; }
    .sw-label small { font-weight: 400; color: var(--muted2, #888); }
    .sw-textarea, .sw-input, .sw-select { width: 100%; padding: 13px 14px; border-radius: 10px; border: 1.5px solid var(--sw-line); font: inherit; font-size: 15px; color: var(--ink, #111); background: #fff; outline: none; }
    .sw-textarea { line-height: 1.65; resize: vertical; min-height: 150px; font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-size: 18px; }
    .sw-textarea:focus, .sw-input:focus, .sw-select:focus { border-color: var(--crimson, #8B1A1A); box-shadow: 0 0 0 3px rgba(139,26,26,.12); }
    .sw-textarea.is-invalid { border-color: #B91C1C; }
    .sw-count { display: flex; justify-content: space-between; font-size: 12.5px; color: var(--muted2, #888); margin-top: 6px; }
    .sw-count .ok { color: #15803d; }

    .sw-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .sw-chip { padding: 8px 14px; border-radius: 999px; font: inherit; font-size: 13.5px; font-weight: 500; cursor: pointer; border: 1.5px solid var(--sw-line); background: #fff; color: var(--ink2, #333); }
    .sw-chip:hover { border-color: var(--sw-gold); }
    .sw-chip[aria-pressed="true"] { border-color: var(--crimson, #8B1A1A); background: var(--pastel-red, #FFF5F5); color: var(--crimson, #8B1A1A); font-weight: 600; }
    .sw-chip:focus-visible, .sw-btn:focus-visible, .sw-opt:focus-visible { outline: 3px solid var(--saffron, #C0570A); outline-offset: 3px; }

    .sw-vow { margin-top: 20px; display: flex; gap: 14px; align-items: flex-start; padding: 18px; border-radius: 12px; background: var(--sw-maroon); color: var(--sw-gold-lt); }
    .sw-vow input { width: 20px; height: 20px; margin-top: 2px; accent-color: var(--saffron, #C0570A); cursor: pointer; flex-shrink: 0; }
    .sw-vow strong { display: block; font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-size: 20px; font-weight: 600; margin-bottom: 4px; }
    .sw-vow p { margin: 0; font-size: 14px; line-height: 1.6; color: rgba(255,255,255,.75); }

    .sw-opts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .sw-opt { padding: 12px 10px; border-radius: 10px; cursor: pointer; border: 1.5px solid var(--sw-line); background: #fff; text-align: center; font: inherit; }
    .sw-opt strong { display: block; font-size: 14px; font-weight: 600; }
    .sw-opt span { display: block; font-size: 12px; color: var(--muted2, #888); margin-top: 2px; }
    .sw-opt[aria-pressed="true"] { border-color: var(--crimson, #8B1A1A); background: var(--pastel-red, #FFF5F5); }
    .sw-opt[aria-pressed="true"] strong { color: var(--crimson, #8B1A1A); }

    .sw-review { margin-top: 22px; padding: 18px 20px; border-radius: 12px; border: 1px dashed var(--sw-gold); background: #FFFCF6; }
    .sw-review h3 { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-size: 20px; font-weight: 600; margin: 0 0 10px; }
    .sw-review blockquote { margin: 0 0 12px; padding: 0 0 0 14px; border-left: 3px solid var(--sw-gold); font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-size: 18px; line-height: 1.55; font-style: italic; }
    .sw-review dl { margin: 0; display: grid; grid-template-columns: 110px 1fr; gap: 6px 10px; font-size: 14px; }
    .sw-review dt { color: var(--muted2, #888); } .sw-review dd { margin: 0; }

    .sw-error { margin: 0 0 16px; padding: 12px 14px; border-radius: 10px; background: #FEF2F2; border: 1px solid #FECACA; color: #991B1B; font-size: 14px; }
    .sw-actions { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 26px; }
    .sw-btn { display: inline-flex; align-items: center; justify-content: center; padding: 13px 24px; border-radius: 999px; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; border: 1.5px solid transparent; text-decoration: none; }
    .sw-btn--primary { background: var(--crimson, #8B1A1A); color: #fff; }
    .sw-btn--primary:hover:not(:disabled) { background: var(--crim-dk, #5C0F0F); }
    .sw-btn--primary:disabled { opacity: .45; cursor: not-allowed; }
    .sw-btn--ghost { background: transparent; color: var(--ink2, #333); border-color: var(--sw-line); }
    .sw-btn--ghost:hover { border-color: var(--sw-gold); }
    .sw-fine { text-align: center; font-size: 12.5px; color: var(--muted2, #888); margin: 14px 0 0; }
    .sw-fine a { color: var(--crimson, #8B1A1A); }

    /* Success */
    .sw-done { text-align: center; padding: 56px 28px; border-radius: 18px; background: radial-gradient(120% 90% at 50% 0%, #3D0808 0%, var(--sw-maroon) 60%, #1C0606 100%); color: var(--sw-gold-lt); }
    .sw-done .sw-flame { width: 10px; height: 14px; margin: 0 auto 22px; border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%; background: linear-gradient(180deg, #FFF3C4 0%, #F5C04A 55%, #C0570A 100%); box-shadow: 0 0 10px 3px rgba(245,192,74,.55), 0 0 36px 12px rgba(192,87,10,.35); }
    .sw-done h1 { font-family: var(--font-serif), 'Cormorant Garamond', Georgia, serif; font-weight: 500; font-size: clamp(32px, 4.6vw, 44px); margin: 0 0 10px; }
    .sw-done p { max-width: 460px; margin: 0 auto 10px; font-size: 16px; line-height: 1.65; color: rgba(255,255,255,.78); }
    .sw-done .sw-actions { justify-content: center; margin-top: 26px; }
    .sw-done .sw-btn--primary { background: var(--saffron, #C0570A); }
    .sw-done .sw-btn--ghost { color: var(--sw-gold-lt); border-color: rgba(245,230,200,.45); }

    @media (max-width: 520px) { .sw-card { padding: 22px 18px; } .sw-opts { grid-template-columns: 1fr; } .sw-review dl { grid-template-columns: 1fr; } }
  `

  if (success) return (
    <div className="sw">
      <style>{css}</style>
      <section className="sw-done" aria-live="polite">
        <div className="sw-flame" aria-hidden="true" />
        <h1>Your Sankalp is made.</h1>
        <p>Your intention has been written and kept private. Now keep faith, keep acting, and keep believing.</p>
        <p style={{ fontStyle: 'italic', fontFamily: "var(--font-serif), 'Cormorant Garamond', Georgia, serif", fontSize: 18 }}>“The universe conspires to help one who makes a sincere Sankalp with a pure heart.”</p>
        <div className="sw-actions">
          <Link href="/manifest/my-sankalpas" className="sw-btn sw-btn--primary">See my Sankalpas</Link>
          {form.gratitude_yatra && <Link href="/plan" className="sw-btn sw-btn--ghost">Plan my gratitude yatra</Link>}
        </div>
      </section>
    </div>
  )

  const intentionLen = form.intention.trim().length
  const invalidIntention = touched && step === 1 && intentionLen < MIN_INTENTION

  return (
    <div className="sw">
      <style>{css}</style>
      <Link href="/manifest" className="sw-back">← Back to Manifest</Link>
      <h1 className="sw-h1">Write your Sankalp</h1>
      <p className="sw-sub">Three short steps, the same way a priest helps you make a vow in a temple. Private by default.</p>

      <ol className="sw-steps" aria-label="Progress">
        <li className={step > 1 ? 'is-done' : step === 1 ? 'is-now' : ''}><span>Step 1</span>Your intention</li>
        <li className={step > 2 ? 'is-done' : step === 2 ? 'is-now' : ''}><span>Step 2</span>Dedicate it</li>
        <li className={step === 3 ? 'is-now' : ''}><span>Step 3</span>Make the vow</li>
      </ol>

      {error && <div className="sw-error" role="alert">{error}</div>}

      <div className="sw-card">
        {step === 1 && (
          <>
            <h2 className="sw-q">What do you seek?</h2>
            <p className="sw-help">Be specific and honest. Your deity responds to honesty; you respond to clarity. Write it the way you would say it aloud before the sanctum.</p>
            <label className="sw-label" htmlFor="intention">Your intention</label>
            <textarea id="intention" className={`sw-textarea${invalidIntention ? ' is-invalid' : ''}`} value={form.intention}
              onChange={e => set('intention', e.target.value)} aria-invalid={invalidIntention} aria-describedby="intention-count"
              placeholder="I seek good health for my mother, who has been unwell since… / I want my business to reach ₹50 lakh by Diwali 2026…" />
            <div className="sw-count" id="intention-count">
              <span>{intentionLen < MIN_INTENTION ? `At least ${MIN_INTENTION} characters` : <span className="ok">Specific enough</span>}</span>
              <span>{intentionLen} characters</span>
            </div>

            <label className="sw-label">What is it about? <small>(optional)</small></label>
            <div className="sw-chips" role="group" aria-label="Category">
              {CATEGORIES.map(c => (
                <button key={c} type="button" className="sw-chip" aria-pressed={form.category === c} onClick={() => set('category', form.category === c ? '' : c)}>{c}</button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="sw-q">Who do you dedicate it to?</h2>
            <p className="sw-help">Every intention has a divine energy that governs it. Not sure? <Link href="/manifest#how" style={{ color: 'var(--crimson)' }}>See which deity governs what</Link>.</p>
            <label className="sw-label">Deity</label>
            <div className="sw-chips" role="group" aria-label="Deity">
              {DEITIES.map(d => (
                <button key={d} type="button" className="sw-chip" aria-pressed={form.deity === d} onClick={() => set('deity', d)}>{d}</button>
              ))}
            </div>

            <label className="sw-label" htmlFor="temple">A temple you have in mind <small>(optional)</small></label>
            <input id="temple" className="sw-input" value={form.temple_name} onChange={e => set('temple_name', e.target.value)} placeholder="e.g. Siddhivinayak, Mumbai" />
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="sw-q">Make the vow</h2>
            <p className="sw-help">A timeline keeps you honest. A gratitude yatra turns the wish into a promise.</p>

            <label className="sw-label" htmlFor="timeline">By when? <small>(optional)</small></label>
            <select id="timeline" className="sw-select" value={form.timeline} onChange={e => set('timeline', e.target.value)}>
              <option value="">Choose a timeline</option>
              {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>

            <label className="sw-vow">
              <input type="checkbox" checked={form.gratitude_yatra} onChange={e => set('gratitude_yatra', e.target.checked)} />
              <span>
                <strong>I will go on a gratitude yatra when this comes true.</strong>
                <p>A promise to visit the temple in person and give thanks. This is what makes a Sankalp a vow rather than a wish.</p>
              </span>
            </label>

            <label className="sw-label">Who can see it?</label>
            <div className="sw-opts" role="group" aria-label="Privacy">
              {PRIVACY.map(p => (
                <button key={p.v} type="button" className="sw-opt" aria-pressed={form.privacy === p.v} onClick={() => set('privacy', p.v as Form['privacy'])}>
                  <strong>{p.label}</strong><span>{p.desc}</span>
                </button>
              ))}
            </div>

            <div className="sw-review" aria-label="Review your Sankalp">
              <h3>Your Sankalp</h3>
              <blockquote>“{form.intention.trim()}”</blockquote>
              <dl>
                <dt>Dedicated to</dt><dd>{form.deity}</dd>
                {form.category && <><dt>About</dt><dd>{form.category}</dd></>}
                {form.temple_name && <><dt>Temple</dt><dd>{form.temple_name}</dd></>}
                <dt>Timeline</dt><dd>{form.timeline || 'In divine time'}</dd>
                <dt>Gratitude yatra</dt><dd>{form.gratitude_yatra ? 'Promised' : 'Not yet'}</dd>
                <dt>Visibility</dt><dd>{PRIVACY.find(p => p.v === form.privacy)?.label}</dd>
              </dl>
            </div>
          </>
        )}

        <div className="sw-actions">
          {step > 1 ? <button type="button" className="sw-btn sw-btn--ghost" onClick={back}>Back</button> : <span />}
          {step < 3
            ? <button type="button" className="sw-btn sw-btn--primary" onClick={next}>Continue</button>
            : <button type="button" className="sw-btn sw-btn--primary" onClick={submit} disabled={loading}>{loading ? 'Making your Sankalp…' : 'Make my Sankalp'}</button>}
        </div>
      </div>

      <p className="sw-fine">By making a Sankalp you accept the <Link href="/manifest#disclaimer">notice on what this is and isn't</Link>. Your intention stays private unless you choose otherwise.</p>
    </div>
  )
}
