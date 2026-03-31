'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const FEATURES = [
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 6l6 0M9 12h6m-6 6h3m-9-3a9 9 0 1118 0 9 9 0 01-18 0z"/></svg>`,
    label: 'AI Yatra Planner',
    desc: 'Describe your destination and days — Claude AI generates a complete day-by-day itinerary with temple sequences, auspicious timings, accommodation recommendations, and local food suggestions.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`,
    label: 'Live Temple Darshan',
    desc: 'Watch live darshan from 56+ major temples across India — Tirupati, Kashi Vishwanath, Kedarnath, Vaishno Devi and more. Never miss aarti or festival celebrations again.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
    label: 'Pilgrimage Journal',
    desc: 'Log every temple you visit with personal notes, star ratings, and memories. Build a lifetime pilgrimage passport — a record of your entire spiritual journey across India.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`,
    label: 'Yatra Savings Goals',
    desc: 'Set a monthly savings target for your dream pilgrimage. Track every deposit, visualize progress, and link to your FinVerse account to earn interest while you save.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>`,
    label: 'Group Expense Split',
    desc: 'Plan family or group pilgrimages without financial confusion. Log every shared expense, calculate individual settlements, and share a clean summary on WhatsApp in one tap.'
  },
  {
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`,
    label: 'Smart Packing Checklist',
    desc: 'Gemini AI generates destination-specific packing lists. Kedarnath needs altitude gear and trekking boots. Tirupati needs dhoti. Amarnath needs permits. Done automatically.'
  },
]

const TRIVIA = {
  fact: "The Brihadeeswarar Temple in Thanjavur, built by Raja Raja Chola I in 1010 CE, has a shadow that never falls on the ground at noon — the 216-foot vimana is positioned so precisely that at midday, its shadow disappears entirely. It was built over 1,000 years ago without modern engineering tools.",
  temple: "Brihadeeswarar Temple, Thanjavur",
  year: "1010 CE"
}

export default function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/explore'
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl })
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) return
    setLoading(true); setError('')
    const res = await signIn('credentials', {
      email: form.email, password: form.password,
      name: form.name, mode, redirect: false,
    })
    if (res?.error) {
      setError(mode === 'signin' ? 'Invalid email or password.' : 'Could not create account. Email may already be in use.')
      setLoading(false)
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        :root {
          --saffron: #C0570A;
          --saffron-light: #E8772A;
          --saffron-pale: #FFF3EB;
          --gold: #B8860B;
          --gold-light: #D4A82A;
          --gold-pale: #FDF6E3;
          --sandstone: #F5EFE4;
          --sandstone-dark: #EDE5D8;
          --ivory: #FDFAF6;
          --ink: #1C1208;
          --ink-mid: #3D2B1A;
          --muted: #7A6555;
          --muted-light: #A8937F;
          --border: #E8DFD2;
          --crimson: #6B1010;
          --crimson-deep: #3D0808;
        }

        html, body { height: 100%; }

        body {
          font-family: 'Outfit', sans-serif;
          background: var(--ivory);
          color: var(--ink);
        }

        /* ── SHELL ──────────────────────────────── */
        .auth-shell {
          display: grid;
          grid-template-columns: 55% 45%;
          min-height: 100vh;
        }

        /* ── LEFT PANEL ─────────────────────────── */
        .left-panel {
          background: var(--sandstone);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
        }

        /* Subtle warm overlay pattern */
        .left-panel::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(192,87,10,.05) 0%, transparent 70%);
          pointer-events: none;
        }

        /* Top decorative border */
        .top-accent {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(to right, var(--saffron), var(--gold-light), var(--saffron));
        }

        /* Brand */
        .brand {
          display: flex;
          align-items: center;
          gap: .75rem;
          text-decoration: none;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 1;
        }
        .brand-emblem {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, var(--saffron) 0%, var(--crimson) 100%);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 3px 12px rgba(192,87,10,.25);
          font-size: 22px;
        }
        .brand-text { }
        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: .01em;
          line-height: 1.1;
        }
        .brand-tagline {
          font-size: .65rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--muted-light);
        }

        /* Hero copy */
        .left-hero {
          margin-bottom: 2rem;
          position: relative;
          z-index: 1;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          font-size: .65rem;
          font-weight: 600;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--saffron);
          margin-bottom: 1rem;
          padding: .3rem .7rem;
          background: rgba(192,87,10,.08);
          border-radius: 100px;
          border: 1px solid rgba(192,87,10,.15);
        }
        .live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #E74C3C;
          animation: blink 2s ease infinite;
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .hero-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3vw, 2.75rem);
          font-weight: 400;
          line-height: 1.15;
          color: var(--ink);
          margin-bottom: .75rem;
        }
        .hero-headline em {
          font-style: italic;
          color: var(--saffron);
        }
        .hero-subhead {
          font-size: .9rem;
          line-height: 1.75;
          color: var(--muted);
          max-width: 460px;
        }

        /* Feature list */
        .feature-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .75rem;
          margin-bottom: 1.75rem;
          position: relative;
          z-index: 1;
        }
        .feature-card {
          background: white;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1rem;
          transition: all .2s;
        }
        .feature-card:hover {
          border-color: rgba(192,87,10,.25);
          box-shadow: 0 2px 12px rgba(192,87,10,.08);
          transform: translateY(-1px);
        }
        .fc-header {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin-bottom: .4rem;
        }
        .fc-icon {
          width: 28px; height: 28px;
          color: var(--saffron);
          flex-shrink: 0;
        }
        .fc-icon svg { width: 100%; height: 100%; }
        .fc-label {
          font-size: .82rem;
          font-weight: 600;
          color: var(--ink-mid);
          line-height: 1.2;
        }
        .fc-desc {
          font-size: .72rem;
          line-height: 1.55;
          color: var(--muted-light);
          padding-left: .1rem;
        }

        /* Trivia box */
        .trivia-box {
          background: white;
          border: 1px solid var(--border);
          border-left: 3px solid var(--gold-light);
          border-radius: 12px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.75rem;
          position: relative;
          z-index: 1;
        }
        .trivia-header {
          display: flex;
          align-items: center;
          gap: .5rem;
          margin-bottom: .5rem;
        }
        .trivia-icon {
          width: 18px; height: 18px;
          color: var(--gold);
        }
        .trivia-label {
          font-size: .6rem;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--gold);
        }
        .trivia-temple {
          font-size: .68rem;
          color: var(--muted-light);
          margin-left: auto;
        }
        .trivia-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: .95rem;
          font-style: italic;
          line-height: 1.6;
          color: var(--ink-mid);
        }

        /* Footer */
        .left-footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--border);
          padding-top: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .dynaimers-credit {
          font-size: .65rem;
          color: var(--muted-light);
          line-height: 1.5;
        }
        .dynaimers-credit strong {
          display: block;
          color: var(--muted);
          font-weight: 500;
        }
        .dynaimers-logo-wrap {
          height: 28px;
          flex-shrink: 0;
        }
        .dynaimers-logo-wrap img {
          height: 100%;
          width: auto;
          object-fit: contain;
          filter: brightness(.7) sepia(.2);
        }

        /* ── RIGHT PANEL ────────────────────────── */
        .right-panel {
          background: var(--ivory);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          overflow-y: auto;
          position: relative;
        }

        .back-link {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          font-size: .78rem;
          color: var(--muted-light);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: .3rem;
          transition: color .2s;
        }
        .back-link:hover { color: var(--saffron); }

        .form-wrap {
          width: 100%;
          max-width: 380px;
        }

        /* Dynaimers logo on white side */
        .right-dynaimers {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
        }
        .right-dynaimers img {
          height: 32px;
          width: auto;
          object-fit: contain;
        }

        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: .25rem;
          line-height: 1.15;
        }
        .form-sub {
          font-size: .82rem;
          color: var(--muted);
          margin-bottom: 1.75rem;
          line-height: 1.55;
        }

        /* Tab toggle */
        .tab-row {
          display: flex;
          background: var(--sandstone);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 3px;
          margin-bottom: 1.5rem;
          gap: 3px;
        }
        .tab-btn {
          flex: 1;
          padding: .55rem;
          border: none;
          border-radius: 7px;
          font-family: 'Outfit', sans-serif;
          font-size: .82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all .2s;
          background: transparent;
          color: var(--muted);
        }
        .tab-btn.on {
          background: white;
          color: var(--ink);
          box-shadow: 0 1px 4px rgba(0,0,0,.08);
        }

        /* Error */
        .err {
          padding: .7rem 1rem;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          border-radius: 8px;
          font-size: .8rem;
          color: #B91C1C;
          margin-bottom: 1rem;
        }

        /* Google btn */
        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .7rem;
          padding: .8rem;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: .85rem;
          font-weight: 500;
          color: var(--ink);
          cursor: pointer;
          transition: all .2s;
          margin-bottom: 1.25rem;
        }
        .btn-google:hover {
          border-color: var(--saffron);
          box-shadow: 0 2px 12px rgba(192,87,10,.12);
        }
        .btn-google:disabled { opacity:.6; cursor:not-allowed; }

        /* Divider */
        .or-divider {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin-bottom: 1.25rem;
        }
        .or-line { flex:1; height:1px; background: var(--border); }
        .or-text { font-size:.7rem; color: var(--muted-light); white-space:nowrap; }

        /* Fields */
        .field { margin-bottom: .875rem; }
        .field label {
          display: block;
          font-size: .72rem;
          font-weight: 600;
          color: var(--muted);
          letter-spacing: .03em;
          text-transform: uppercase;
          margin-bottom: .35rem;
        }
        .field input {
          width: 100%;
          padding: .75rem 1rem;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: .88rem;
          color: var(--ink);
          outline: none;
          transition: all .2s;
        }
        .field input:focus {
          border-color: var(--saffron);
          box-shadow: 0 0 0 3px rgba(192,87,10,.1);
        }
        .field input::placeholder { color: #C5B9AE; }

        /* Submit */
        .btn-submit {
          width: 100%;
          padding: .85rem;
          background: linear-gradient(135deg, var(--saffron) 0%, var(--crimson) 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: .9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all .25s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          margin-top: .25rem;
          letter-spacing: .01em;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(192,87,10,.35);
        }
        .btn-submit:disabled { opacity:.7; cursor:not-allowed; }

        /* Trust */
        .trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: .35rem;
          font-size: .7rem;
          color: var(--muted-light);
        }
        .trust-item svg { width:14px; height:14px; color: var(--saffron); }

        /* Terms */
        .terms {
          text-align: center;
          font-size: .68rem;
          color: var(--muted-light);
          margin-top: 1rem;
          line-height: 1.6;
        }
        .terms a { color: var(--saffron); text-decoration: none; }
        .terms a:hover { text-decoration: underline; }

        /* Right footer */
        .right-footer {
          position: absolute;
          bottom: 1rem;
          left: 0; right: 0;
          text-align: center;
          font-size: .62rem;
          color: var(--muted-light);
          opacity: .6;
        }

        /* ── RESPONSIVE ─────────────────────────── */
        @media (max-width: 900px) {
          .auth-shell { grid-template-columns: 1fr; min-height: 100vh; }
          .left-panel { padding: 1.75rem; }
          .right-panel { padding: 1.75rem; min-height: 100vh; }
          .right-footer { position: relative; margin-top: 1.5rem; bottom: auto; }
        }
        @media (max-width: 600px) {
          .feature-list { grid-template-columns: 1fr; }
          .left-panel { padding: 1.25rem; }
          .right-panel { padding: 1.25rem; }
        }
      `}</style>

      <div className="auth-shell">

        {/* ─── LEFT PANEL ─────────────────────── */}
        <div className="left-panel">
          <div className="top-accent" />

          {/* Brand */}
          <Link href="/" className="brand">
            <div className="brand-emblem">🛕</div>
            <div className="brand-text">
              <div className="brand-name">DivyaDarshan</div>
              <div className="brand-tagline">India's Temple Explorer</div>
            </div>
          </Link>

          {/* Hero */}
          <div className="left-hero">
            <div className="hero-eyebrow">
              <span className="live-dot" />
              56 Temples Streaming Live
            </div>
            <h1 className="hero-headline">
              Every sacred temple.<br />
              <em>One companion.</em>
            </h1>
            <p className="hero-subhead">
              India has over 2 million temples. Planning a pilgrimage means 
              dozens of scattered tabs, outdated blogs, and guesswork. 
              DivyaDarshan brings AI-powered planning, live darshan, savings tools, 
              and community — into one thoughtfully designed platform.
            </p>
          </div>

          {/* Features */}
          <div className="feature-list">
            {FEATURES.map(f => (
              <div key={f.label} className="feature-card">
                <div className="fc-header">
                  <div className="fc-icon" dangerouslySetInnerHTML={{ __html: f.icon }} />
                  <span className="fc-label">{f.label}</span>
                </div>
                <p className="fc-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Temple Trivia */}
          <div className="trivia-box">
            <div className="trivia-header">
              <svg className="trivia-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/>
              </svg>
              <span className="trivia-label">Temple Trivia</span>
              <span className="trivia-temple">{TRIVIA.temple} · {TRIVIA.year}</span>
            </div>
            <p className="trivia-text">"{TRIVIA.fact}"</p>
          </div>

          {/* Footer */}
          <div className="left-footer">
            <div className="dynaimers-credit">
              Conceptualized &amp; Designed by
              <strong>Dynaimers Consulting Private Limited</strong>
            </div>
            <div className="dynaimers-logo-wrap">
              <img src="/dynaimers-logo.jpg" alt="Dynaimers Consulting" />
            </div>
          </div>
        </div>

        {/* ─── RIGHT PANEL ────────────────────── */}
        <div className="right-panel">
          <Link href="/" className="back-link">← Back</Link>

          <div className="form-wrap">

            {/* Dynaimers logo on white background */}
            <div className="right-dynaimers">
              <img src="/dynaimers-logo.jpg" alt="Dynaimers" />
            </div>

            <h2 className="form-title">
              {mode === 'signup' ? 'Begin your yatra' : 'Welcome back'}
            </h2>
            <p className="form-sub">
              {mode === 'signup'
                ? 'Free forever. No credit card required. Join thousands of pilgrims already planning smarter.'
                : 'Sign in to access your temples, plans, journal and savings goals.'}
            </p>

            {/* Tab */}
            <div className="tab-row">
              <button className={`tab-btn ${mode === 'signup' ? 'on' : ''}`}
                onClick={() => { setMode('signup'); setError('') }}>
                Create Account
              </button>
              <button className={`tab-btn ${mode === 'signin' ? 'on' : ''}`}
                onClick={() => { setMode('signin'); setError('') }}>
                Sign In
              </button>
            </div>

            {error && <div className="err">{error}</div>}

            {/* Google */}
            <button className="btn-google" onClick={handleGoogle} disabled={googleLoading}>
              {googleLoading
                ? <Loader2 size={16} className="animate-spin" />
                : <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>}
              Continue with Google
            </button>

            <div className="or-divider">
              <div className="or-line" /><span className="or-text">or use email</span><div className="or-line" />
            </div>

            <form onSubmit={handleEmail}>
              {mode === 'signup' && (
                <div className="field">
                  <label>Full Name</label>
                  <input placeholder="e.g. Ramesh Sharma" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
              )}
              <div className="field">
                <label>Email Address</label>
                <input type="email" placeholder="you@example.com" required value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="field">
                <label>Password {mode === 'signup' && <span style={{fontWeight:400,textTransform:'none',letterSpacing:0}}> — min 8 characters</span>}</label>
                <input type="password" placeholder="••••••••" required minLength={8} value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              </div>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading
                  ? <><Loader2 size={15} className="animate-spin" /> Please wait…</>
                  : mode === 'signup' ? 'Create Free Account →' : 'Sign In →'}
              </button>
            </form>

            {/* Trust */}
            <div className="trust-row">
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Secure &amp; Private
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                Free Forever
              </div>
              <div className="trust-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                No Credit Card
              </div>
            </div>

            <p className="terms">
              By continuing you agree to our <Link href="/terms">Terms</Link> &amp; <Link href="/privacy">Privacy Policy</Link>
            </p>
          </div>

          <div className="right-footer">
            Conceptualized &amp; Designed by Dynaimers Consulting Private Limited
          </div>
        </div>
      </div>
    </>
  )
}
