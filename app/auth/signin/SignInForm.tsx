'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const FEATURES = [
  { icon: '🗺️', label: 'AI Yatra Planner', desc: 'Day-by-day itineraries powered by Claude AI' },
  { icon: '🔴', label: 'Live Darshan',      desc: '56+ temples streaming live, right now' },
  { icon: '💰', label: 'Savings Goals',     desc: 'Save for your next yatra with FinVerse' },
  { icon: '📖', label: 'Pilgrimage Journal',desc: 'Log every temple — your spiritual passport' },
  { icon: '👥', label: 'Group Split',       desc: 'Fair expense tracking for family yatras' },
  { icon: '🎒', label: 'Smart Checklists',  desc: 'AI packing lists specific to your destination' },
]

const TEMPLES = [
  { name: 'Kashi Vishwanath', location: 'Varanasi', deity: 'Shiva' },
  { name: 'Tirupati Balaji', location: 'Tirupati', deity: 'Vishnu' },
  { name: 'Meenakshi Temple', location: 'Madurai', deity: 'Shakti' },
  { name: 'Kedarnath', location: 'Uttarakhand', deity: 'Shiva' },
  { name: 'Siddhivinayak', location: 'Mumbai', deity: 'Ganesha' },
  { name: 'Vaishno Devi', location: 'Jammu', deity: 'Shakti' },
]

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
          --crimson: #3D0808;
          --crimson-deep: #1A0303;
          --crimson-mid: #5C0F0F;
          --gold: #C9993A;
          --gold-light: #EDD9A3;
          --ivory: #FAF7F2;
          --ivory-warm: #F5EFE4;
          --ink: #1A1008;
          --muted: rgba(237,224,196,.45);
        }

        body {
          font-family: 'Outfit', sans-serif;
          overflow: hidden;
          height: 100vh;
        }

        .auth-shell {
          display: grid;
          grid-template-columns: 1fr 1fr;
          height: 100vh;
          overflow: hidden;
        }

        /* ── LEFT PANEL ─────────────────────────── */
        .left-panel {
          background: linear-gradient(155deg, #1A0303 0%, #2D0505 40%, #3D0808 100%);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          padding: 2.5rem;
        }

        /* Ambient glow */
        .left-panel::before {
          content: '';
          position: absolute;
          top: -20%;
          right: -20%;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,153,58,.09) 0%, transparent 65%);
          pointer-events: none;
        }
        .left-panel::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -10%;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(92,15,15,.5) 0%, transparent 65%);
          pointer-events: none;
        }

        /* Decorative grid pattern */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(201,153,58,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,153,58,.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* Brand */
        .brand {
          display: flex;
          align-items: center;
          gap: .75rem;
          position: relative;
          z-index: 1;
          text-decoration: none;
        }
        .brand-icon {
          width: 40px; height: 40px;
          background: linear-gradient(135deg, var(--gold), #A07828);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 4px 16px rgba(201,153,58,.3);
        }
        .brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--ivory);
          letter-spacing: .01em;
        }

        /* Main copy */
        .left-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
          padding: 1rem 0 1rem;
        }

        .left-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          font-size: .65rem;
          font-weight: 600;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 1.25rem;
        }
        .live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #E74C3C;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .4; }
        }

        .left-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          font-weight: 300;
          line-height: 1.15;
          color: var(--ivory);
          margin-bottom: .75rem;
        }
        .left-headline em {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .left-subhead {
          font-size: .9rem;
          line-height: 1.7;
          color: var(--muted);
          margin-bottom: 2rem;
          max-width: 420px;
        }

        /* Feature list */
        .feature-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: .75rem;
          margin-bottom: 2rem;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: .6rem;
          padding: .7rem .875rem;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 10px;
          transition: all .2s;
        }
        .feature-item:hover {
          background: rgba(201,153,58,.07);
          border-color: rgba(201,153,58,.15);
        }
        .fi-icon {
          font-size: 1.1rem;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .fi-label {
          font-size: .78rem;
          font-weight: 500;
          color: var(--ivory);
          line-height: 1.2;
        }
        .fi-desc {
          font-size: .68rem;
          color: rgba(237,224,196,.35);
          line-height: 1.4;
          margin-top: 1px;
        }

        /* Temple ticker */
        .temple-ticker {
          position: relative;
          z-index: 1;
        }
        .ticker-label {
          font-size: .6rem;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(237,224,196,.25);
          margin-bottom: .6rem;
        }
        .ticker-track {
          display: flex;
          gap: .6rem;
          flex-wrap: wrap;
        }
        .ticker-pill {
          display: flex;
          align-items: center;
          gap: .4rem;
          padding: .3rem .7rem;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 100px;
          font-size: .7rem;
          color: rgba(237,224,196,.5);
          white-space: nowrap;
        }
        .ticker-pill span:first-child {
          color: var(--gold);
          font-size: .65rem;
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

        /* Top right back link */
        .back-link {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          display: flex;
          align-items: center;
          gap: .4rem;
          font-size: .78rem;
          color: #9B8B7E;
          text-decoration: none;
          transition: color .2s;
        }
        .back-link:hover { color: var(--crimson); }

        .form-card {
          width: 100%;
          max-width: 400px;
        }

        .form-headline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 500;
          color: var(--ink);
          margin-bottom: .3rem;
          line-height: 1.2;
        }
        .form-subhead {
          font-size: .85rem;
          color: #9B8B7E;
          margin-bottom: 1.75rem;
          line-height: 1.5;
        }

        /* Mode toggle */
        .mode-toggle {
          display: flex;
          background: #F0EAE0;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 1.5rem;
        }
        .mode-btn {
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
          color: #9B8B7E;
        }
        .mode-btn.active {
          background: white;
          color: var(--ink);
          box-shadow: 0 1px 4px rgba(0,0,0,.1);
        }

        /* Error */
        .error-box {
          padding: .75rem 1rem;
          background: #FFF0F0;
          border: 1px solid #FFCDD2;
          border-radius: 8px;
          font-size: .82rem;
          color: #C62828;
          margin-bottom: 1rem;
        }

        /* Google button */
        .btn-google {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .75rem;
          padding: .8rem;
          background: white;
          border: 1.5px solid #E5DDD5;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: .88rem;
          font-weight: 500;
          color: var(--ink);
          cursor: pointer;
          transition: all .2s;
          margin-bottom: 1.25rem;
        }
        .btn-google:hover {
          border-color: #C9993A;
          box-shadow: 0 2px 12px rgba(201,153,58,.15);
        }
        .btn-google:disabled { opacity: .6; cursor: not-allowed; }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: .75rem;
          margin-bottom: 1.25rem;
        }
        .divider-line {
          flex: 1;
          height: 1px;
          background: #EDE6DC;
        }
        .divider-text {
          font-size: .72rem;
          color: #B8AA9E;
          white-space: nowrap;
        }

        /* Form fields */
        .field {
          margin-bottom: .875rem;
        }
        .field label {
          display: block;
          font-size: .75rem;
          font-weight: 500;
          color: #6B5B4E;
          margin-bottom: .35rem;
          letter-spacing: .02em;
        }
        .field input {
          width: 100%;
          padding: .75rem 1rem;
          background: white;
          border: 1.5px solid #E5DDD5;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: .88rem;
          color: var(--ink);
          outline: none;
          transition: all .2s;
        }
        .field input:focus {
          border-color: var(--crimson);
          box-shadow: 0 0 0 3px rgba(61,8,8,.08);
        }
        .field input::placeholder { color: #C5B9AE; }

        /* Submit */
        .btn-submit {
          width: 100%;
          padding: .85rem;
          background: linear-gradient(135deg, var(--crimson) 0%, #5C0F0F 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: .9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all .2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .5rem;
          margin-top: .25rem;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(61,8,8,.3);
        }
        .btn-submit:disabled { opacity: .7; cursor: not-allowed; }

        /* Trust badges */
        .trust-strip {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid #EDE6DC;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: .35rem;
          font-size: .72rem;
          color: #B8AA9E;
        }
        .trust-icon { font-size: .9rem; }

        /* Terms */
        .terms-text {
          text-align: center;
          font-size: .68rem;
          color: #B8AA9E;
          margin-top: 1rem;
          line-height: 1.6;
        }
        .terms-text a {
          color: var(--crimson);
          text-decoration: none;
        }
        .terms-text a:hover { text-decoration: underline; }

        /* ── RESPONSIVE ─────────────────────────── */
        @media (max-width: 900px) {
          .auth-shell {
            grid-template-columns: 1fr;
            overflow: auto;
            height: auto;
            min-height: 100vh;
          }
          .left-panel {
            padding: 1.75rem;
            min-height: auto;
          }
          .feature-list {
            grid-template-columns: 1fr 1fr;
          }
          body { overflow: auto; }
        }

        @media (max-width: 480px) {
          .feature-list { grid-template-columns: 1fr; }
          .left-panel { padding: 1.5rem; }
          .right-panel { padding: 1.5rem; }
          .left-headline { font-size: 1.75rem; }
        }
      `}</style>

      <div className="auth-shell">

        {/* ── LEFT — Value Proposition ── */}
        <div className="left-panel">
          <div className="grid-overlay" />

          {/* Brand */}
          <Link href="/" className="brand">
            <div className="brand-icon">🛕</div>
            <span className="brand-name">DivyaDarshan</span>
          </Link>

          {/* Main content */}
          <div className="left-content">
            <div className="left-eyebrow">
              <span className="live-dot" />
              India's Temple Explorer
            </div>

            <h1 className="left-headline">
              Every sacred temple.<br />
              <em>One companion.</em>
            </h1>

            <p className="left-subhead">
              350+ temples, AI-powered yatra planning, live darshan streams,
              and a complete pilgrimage toolkit — built for the modern Indian pilgrim.
            </p>

            {/* Features grid */}
            <div className="feature-list">
              {FEATURES.map(f => (
                <div key={f.label} className="feature-item">
                  <span className="fi-icon">{f.icon}</span>
                  <div>
                    <div className="fi-label">{f.label}</div>
                    <div className="fi-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Temple ticker */}
            <div className="temple-ticker">
              <div className="ticker-label">Temples in our directory</div>
              <div className="ticker-track">
                {TEMPLES.map(t => (
                  <div key={t.name} className="ticker-pill">
                    <span>🛕</span>
                    <span>{t.name}</span>
                  </div>
                ))}
                <div className="ticker-pill">
                  <span>+</span>
                  <span>344 more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom stats */}
          <div style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}>
            {[
              { n: '350+', l: 'Temples' },
              { n: '56',   l: 'Live' },
              { n: '12',   l: 'Circuits' },
              { n: '₹0',   l: 'Free' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 500, color: 'var(--gold-light)', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: '.65rem', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(237,224,196,.3)', marginTop: '.2rem' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Auth Form ── */}
        <div className="right-panel">
          <Link href="/" className="back-link">
            ← Back to home
          </Link>

          <div className="form-card">

            {/* Headline */}
            <h2 className="form-headline">
              {mode === 'signup' ? 'Start your yatra' : 'Welcome back'}
            </h2>
            <p className="form-subhead">
              {mode === 'signup'
                ? 'Free forever. No credit card. Join thousands of pilgrims.'
                : 'Sign in to access your temples, plans, and journal.'}
            </p>

            {/* Mode toggle */}
            <div className="mode-toggle">
              <button className={`mode-btn ${mode === 'signup' ? 'active' : ''}`}
                onClick={() => { setMode('signup'); setError('') }}>
                Create Account
              </button>
              <button className={`mode-btn ${mode === 'signin' ? 'active' : ''}`}
                onClick={() => { setMode('signin'); setError('') }}>
                Sign In
              </button>
            </div>

            {/* Error */}
            {error && <div className="error-box">{error}</div>}

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

            {/* Divider */}
            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or continue with email</span>
              <div className="divider-line" />
            </div>

            {/* Email form */}
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
                <input type="email" placeholder="you@example.com" value={form.email} required
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div className="field">
                <label>Password {mode === 'signup' && <span style={{ color: '#B8AA9E', fontWeight: 400 }}>(min 8 characters)</span>}</label>
                <input type="password" placeholder="••••••••" value={form.password} required
                  minLength={8} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              </div>

              <button type="submit" className="btn-submit" disabled={loading}>
                {loading
                  ? <><Loader2 size={15} className="animate-spin" /> Please wait…</>
                  : mode === 'signup' ? 'Create Free Account →' : 'Sign In →'}
              </button>
            </form>

            {/* Trust badges */}
            <div className="trust-strip">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                Secure & Private
              </div>
              <div className="trust-item">
                <span className="trust-icon">✨</span>
                Free Forever
              </div>
              <div className="trust-item">
                <span className="trust-icon">🛕</span>
                350+ Temples
              </div>
            </div>

            <p className="terms-text">
              By continuing you agree to our{' '}
              <Link href="/terms">Terms of Service</Link> and{' '}
              <Link href="/privacy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
