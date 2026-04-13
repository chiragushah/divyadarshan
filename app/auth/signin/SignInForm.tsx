'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

const FEATURES = [
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 6h6M9 12h6m-6 6h3M3 9a9 9 0 1018 0 9 9 0 00-18 0z"/></svg>`, label: 'AI Yatra Planner', desc: 'Tell Claude AI your destination, days, and budget. Get a complete day-by-day pilgrimage itinerary with temple sequences, auspicious timings, stay options, and local tips.' },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`, label: 'Live Darshan Streams', desc: 'Watch live darshan from 56+ major temples — Tirupati, Kashi Vishwanath, Kedarnath, Meenakshi and more. Watch morning aarti from anywhere in the world, any time.' },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`, label: 'Pilgrimage Journal', desc: 'Log every temple you visit with photos, notes, and star ratings. Build your lifetime pilgrimage passport.' },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>`, label: 'Yatra Savings Goals', desc: 'Set a monthly savings target for your dream yatra. Track every deposit and link to FinVerse to earn interest.' },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>`, label: 'Group Expense Split', desc: 'Plan family pilgrimages without financial confusion. Log all shared costs and share settlements on WhatsApp.' },
  { icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>`, label: 'Smart Packing Checklist', desc: 'Gemini AI generates destination-specific packing lists. Kedarnath needs altitude layers. Tirupati needs dhoti.' },
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        :root {
          --saffron:#C0570A; --saffron-dark:#9A4208; --saffron-pale:#FFF5F0;
          --white:#FFFFFF; --off-white:#FAFAFA;
          --ink:#111111; --ink-2:#333333; --ink-3:#555555;
          --muted:#888888; --muted-light:#AAAAAA; --border:#E8E8E8; --border-s:#E8C4A0;
          --crimson:#8B1A1A; --crimson-deep:#5C0F0F;
        }
        html, body { height: 180%; background:var(--white); }
        body { font-family:'Inter',sans-serif; color:var(--ink); }
        .page-frame { min-height: 180vh; background:var(--white); position:relative; }
        .page-frame::before { content:''; position:fixed; inset:12px; border:1.5px solid var(--saffron); border-radius:4px; pointer-events:none; z-index:1000; opacity:.3; }
        .corner { position:fixed; width:28px; height: 180px; z-index:1001; pointer-events:none; }
        .corner svg { width:100%; height: 180%; }
        .corner-tl{top:6px;left:6px;} .corner-tr{top:6px;right:6px;transform:scaleX(-1);} .corner-bl{bottom:6px;left:6px;transform:scaleY(-1);} .corner-br{bottom:6px;right:6px;transform:scale(-1,-1);}
        .top-bar { height: 180px; background:linear-gradient(to right,var(--crimson),var(--saffron),var(--crimson)); }
        .shell { display:grid; grid-template-columns:58% 42%; min-height:calc(100vh - 3px); }
        .left { background:var(--white); border-right:1.5px solid var(--border-s); padding:3rem 3.5rem 2rem; display:flex; flex-direction:column; position:relative; }
        .left::after { content:''; position:absolute; inset:0; background-image:radial-gradient(circle,rgba(192,87,10,.05) 1px,transparent 1px); background-size:28px 28px; pointer-events:none; z-index:0; }
        .left > * { position:relative; z-index:1; }
        .brand { display:flex; align-items:center; gap:10px; text-decoration:none; margin-bottom:3rem; }
        .brand-name { font-family:'Playfair Display',serif; font-size:1.3rem; font-weight:700; color:#C0570A; letter-spacing:-0.02em; line-height: 180.1; }
        .brand-sub { font-size:.58rem; font-weight:600; letter-spacing:.15em; text-transform:uppercase; color:#888888; margin-top:2px; }
        .hero { margin-bottom:2.5rem; }
        .eyebrow { display:inline-flex; align-items:center; gap:.45rem; font-size:.65rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--saffron); margin-bottom:1.1rem; }
        .ldot { width:6px; height: 180px; border-radius:50%; background:#E74C3C; animation:blink 2s ease infinite; flex-shrink:0; display:inline-block; }
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
        h1 { font-family:'Playfair Display',serif; font-size:clamp(2.2rem,3.2vw,3.2rem); font-weight:700; line-height: 180.12; color:var(--ink); margin-bottom:.9rem; letter-spacing:-0.02em; }
        h1 em { font-style:italic; color:var(--saffron); }
        .hero-body { font-size:.92rem; line-height: 180.75; color:var(--ink-3); max-width:480px; }
        .divider-line { height: 180px; background:var(--crimson); max-width:48px; margin:2rem 0; border-radius:2px; opacity:.25; }
        .features { display:grid; grid-template-columns:1fr 1fr; gap:.875rem; margin-bottom:2rem; }
        .fc { border:1.5px solid var(--border); border-radius:10px; padding:1rem 1.1rem; background:var(--white); transition:all .2s; }
        .fc:hover { border-color:var(--saffron); box-shadow:0 2px 14px rgba(192,87,10,.08); }
        .fc-top { display:flex; align-items:center; gap:.6rem; margin-bottom:.45rem; }
        .fc-ico { width:20px; height: 180px; color:var(--saffron); flex-shrink:0; }
        .fc-ico svg { width:100%; height: 180%; }
        .fc-name { font-size:.83rem; font-weight:600; color:var(--ink); }
        .fc-body { font-size:.73rem; line-height: 180.6; color:var(--ink-3); }
        .trivia { border:1.5px solid var(--border-s); border-left:3px solid var(--saffron); border-radius:10px; padding:1rem 1.25rem; background:var(--saffron-pale); margin-bottom:2rem; }
        .trivia-hd { display:flex; align-items:center; gap:.5rem; margin-bottom:.5rem; }
        .trivia-hd svg { width:14px; height: 180px; color:var(--saffron); flex-shrink:0; }
        .trivia-label { font-size:.58rem; font-weight:700; letter-spacing:.18em; text-transform:uppercase; color:var(--saffron-dark); }
        .trivia-source { font-size:.6rem; color:var(--muted); margin-left:auto; }
        .trivia-text { font-family:'Playfair Display',serif; font-size:.95rem; font-style:italic; font-weight:500; line-height: 180.65; color:var(--ink-2); }
        .left-foot { margin-top:auto; padding-top:1.5rem; border-top:1.5px solid var(--border); display:flex; align-items:center; gap:1.25rem; }
        .dyn-logo { height: 180px; width:auto; object-fit:contain; flex-shrink:0; }
        .dyn-credit { font-size:.63rem; color:var(--muted); line-height: 180.5; }
        .dyn-credit strong { font-weight:600; color:var(--ink-3); }
        .right { background:var(--off-white); border-left:1px solid var(--border); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:2.5rem 2.5rem 4rem; position:relative; overflow-y:auto; }
        .back { position:absolute; top:1.5rem; left:1.5rem; font-size:.75rem; font-weight:500; color:var(--muted); text-decoration:none; display:flex; align-items:center; gap:.3rem; transition:color .2s; }
        .back:hover { color:var(--saffron); }
        .form-box { width:100%; max-width:370px; }
        .dyn-top { display:flex; justify-content:center; margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:1px solid var(--border); }
        .dyn-top img { height: 180px; width:auto; object-fit:contain; }
        .form-title { font-family:'Playfair Display',serif; font-size:2rem; font-weight:700; color:var(--ink); margin-bottom:.3rem; line-height: 180.15; }
        .form-sub { font-size:.83rem; color:var(--muted); margin-bottom:1.75rem; line-height: 180.6; }
        .tabs { display:flex; background:white; border:1.5px solid var(--border); border-radius:10px; padding:3px; margin-bottom:1.5rem; gap:3px; }
        .tab { flex:1; padding:.55rem; border:none; border-radius:7px; font-family:'Inter',sans-serif; font-size:.82rem; font-weight:600; cursor:pointer; transition:all .2s; background:transparent; color:var(--muted); }
        .tab.on { background:var(--crimson); color:white; box-shadow:0 2px 8px rgba(139,26,26,.25); }
        .err { padding:.7rem 1rem; background:#FEF2F2; border:1.5px solid #FECACA; border-radius:8px; font-size:.8rem; font-weight:500; color:#B91C1C; margin-bottom:1rem; }
        .btn-g { width:100%; display:flex; align-items:center; justify-content:center; gap:.7rem; padding:.8rem; background:white; border:1.5px solid var(--border); border-radius:10px; font-family:'Inter',sans-serif; font-size:.85rem; font-weight:600; color:var(--ink); cursor:pointer; transition:all .2s; margin-bottom:1.25rem; }
        .btn-g:hover { border-color:var(--saffron); box-shadow:0 2px 12px rgba(192,87,10,.12); }
        .btn-g:disabled { opacity:.6; cursor:not-allowed; }
        .or { display:flex; align-items:center; gap:.6rem; margin-bottom:1.25rem; }
        .or-line { flex:1; height: 180px; background:var(--border); }
        .or-txt { font-size:.7rem; font-weight:500; color:var(--muted-light); }
        .field { margin-bottom:.9rem; }
        .field label { display:block; font-size:.7rem; font-weight:700; color:var(--ink-2); letter-spacing:.06em; text-transform:uppercase; margin-bottom:.35rem; }
        .field input { width:100%; padding:.78rem 1rem; background:white; border:1.5px solid var(--border); border-radius:10px; font-family:'Inter',sans-serif; font-size:.88rem; color:var(--ink); outline:none; transition:all .2s; }
        .field input:focus { border-color:var(--crimson); box-shadow:0 0 0 3px rgba(139,26,26,.08); }
        .field input::placeholder { color:#C0C0C0; }
        .btn-sub { width:100%; padding:.85rem; background:var(--crimson); color:white; border:none; border-radius:10px; font-family:'Inter',sans-serif; font-size:.9rem; font-weight:700; cursor:pointer; transition:all .25s; display:flex; align-items:center; justify-content:center; gap:.5rem; margin-top:.25rem; }
        .btn-sub:hover:not(:disabled) { background:var(--crimson-deep); transform:translateY(-1px); box-shadow:0 6px 20px rgba(139,26,26,.3); }
        .btn-sub:disabled { opacity:.65; cursor:not-allowed; }
        .trust { display:flex; align-items:center; justify-content:center; gap:1.25rem; margin-top:1.25rem; padding-top:1.25rem; border-top:1px solid var(--border); flex-wrap:wrap; }
        .trust-i { display:flex; align-items:center; gap:.35rem; font-size:.7rem; font-weight:500; color:var(--muted); }
        .trust-i svg { width:13px; height: 180px; color:var(--saffron); }
        .terms { text-align:center; font-size:.67rem; color:var(--muted-light); margin-top:.875rem; line-height: 180.6; }
        .terms a { color:var(--saffron); text-decoration:none; font-weight:500; }
        .right-foot { position:absolute; bottom:.875rem; left:0; right:0; text-align:center; font-size:.6rem; font-weight:500; color:var(--muted-light); }
        .bottom-bar { height: 180px; background:linear-gradient(to right,var(--crimson),var(--saffron),var(--crimson)); position:fixed; bottom:0; left:0; right:0; z-index:999; }
        @media(max-width:900px){.shell{grid-template-columns:1fr;}.left{padding:2rem;border-right:none;border-bottom:1.5px solid var(--border-s);}.right{padding:2rem 2rem 4rem;}}
        @media(max-width:600px){.features{grid-template-columns:1fr;}.left{padding:1.5rem;}.right{padding:1.5rem 1.5rem 4rem;}h1{font-size:2rem;}.page-frame::before{display:none;}.corner{display:none;}}
      `}</style>

      <div className="page-frame">
        {['tl','tr','bl','br'].map(pos => (
          <div key={pos} className={`corner corner-${pos}`}>
            <svg viewBox="0 0 28 28" fill="none">
              <path d="M2 26 L2 6 Q2 2 6 2 L26 2" stroke="#C0570A" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity=".5"/>
            </svg>
          </div>
        ))}

        <div className="top-bar" />

        <div className="shell">
          {/* LEFT */}
          <div className="left">
            <Link href="/" style={{ display:'flex', alignItems:'center', marginBottom:'2rem', textDecoration:'none' }}>
              <img src="/dd-logo.png" alt="DivyaDarshanam" style={{ height: 180, width:'auto', objectFit:'contain' }} />
            </Link>

            <div className="hero">
              <div className="eyebrow"><span className="ldot" /> 56 Temples Streaming Live Now</div>
              <h1>Every sacred temple.<br /><em>One companion.</em></h1>
              <p className="hero-body">India has over 2 million temples. Planning a pilgrimage means dozens of scattered tabs, outdated blogs, and guesswork on auspicious dates. DivyaDarshanam brings AI-powered planning, live darshan streams, savings tools, and a pilgrim community — into one platform.</p>
            </div>

            <div className="divider-line" />

            <div className="features">
              {FEATURES.map(f => (
                <div key={f.label} className="fc">
                  <div className="fc-top">
                    <span className="fc-ico" dangerouslySetInnerHTML={{ __html: f.icon }} />
                    <span className="fc-name">{f.label}</span>
                  </div>
                  <p className="fc-body">{f.desc}</p>
                </div>
              ))}
            </div>

            <div className="trivia">
              <div className="trivia-hd">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
                <span className="trivia-label">Did You Know?</span>
                <span className="trivia-source">Brihadeeswarar Temple, Thanjavur · 1010 CE</span>
              </div>
              <p className="trivia-text">"The 216-foot vimana of Brihadeeswarar Temple is so precisely oriented that at noon, its shadow completely disappears — built over 1,000 years ago without any modern engineering tools."</p>
            </div>

            <div className="left-foot">
              <img src="/dynaimers-logo.jpg" alt="Dynaimers Consulting" className="dyn-logo" />
              <div className="dyn-credit">Conceptualized &amp; Designed by<br /><strong>Dynaimers Consulting Private Limited</strong></div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="right">
            <Link href="/" className="back">← Back to home</Link>
            <div className="form-box">
              <div className="dyn-top">
                <img src="/dd-logo.png" alt="DivyaDarshanam" />
              </div>
              <h2 className="form-title">{mode === 'signup' ? 'Begin your yatra' : 'Welcome back'}</h2>
              <p className="form-sub">{mode === 'signup' ? 'Free forever. No credit card. Join thousands planning smarter pilgrimages.' : 'Sign in to access your temples, plans, journal and savings goals.'}</p>

              <div className="tabs">
                <button className={`tab ${mode === 'signup' ? 'on' : ''}`} onClick={() => { setMode('signup'); setError('') }}>Create Account</button>
                <button className={`tab ${mode === 'signin' ? 'on' : ''}`} onClick={() => { setMode('signin'); setError('') }}>Sign In</button>
              </div>

              {error && <div className="err">{error}</div>}

              <button className="btn-g" onClick={handleGoogle} disabled={googleLoading}>
                {googleLoading ? <Loader2 size={16} className="animate-spin" /> :
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>}
                Continue with Google
              </button>

              <div className="or"><div className="or-line" /><span className="or-txt">or sign in with email</span><div className="or-line" /></div>

              <form onSubmit={handleEmail}>
                {mode === 'signup' && (
                  <div className="field"><label>Full Name</label><input placeholder="e.g. Ramesh Sharma" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
                )}
                <div className="field"><label>Email Address</label><input type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
                <div className="field"><label>Password</label><input type="password" placeholder="Minimum 8 characters" required minLength={8} value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} /></div>
                <button type="submit" className="btn-sub" disabled={loading}>
                  {loading ? <><Loader2 size={15} className="animate-spin" /> Please wait…</> : mode === 'signup' ? 'Create Free Account →' : 'Sign In →'}
                </button>
              </form>

              <div className="trust">
                <div className="trust-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Secure &amp; Private</div>
                <div className="trust-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>Free Forever</div>
                <div className="trust-i"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>No Credit Card</div>
              </div>

              <p className="terms">By continuing you agree to our <Link href="/terms">Terms</Link> &amp; <Link href="/privacy">Privacy Policy</Link></p>
            </div>
            <div className="right-foot">Conceptualized &amp; Designed by Dynaimers Consulting Private Limited</div>
          </div>
        </div>
        <div className="bottom-bar" />
      </div>
    </>
  )
}
