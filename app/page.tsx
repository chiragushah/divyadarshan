import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DivyaDarshan — Every Sacred Temple. One Companion.",
  description: 'Discover 356+ sacred temples across India. AI-powered yatra planning, live darshan, pilgrimage circuits, savings goals.',
}

const FEATURES = [
  { icon: '🤖', title: 'AI Yatra Planner', desc: 'Tell Claude AI your destination, days and budget. Get a complete day-by-day pilgrimage itinerary with temple sequences, timings, accommodation and insider tips.' },
  { icon: '📺', title: 'Live Darshan', desc: 'Watch live darshan from 56+ major temples — Tirupati, Kashi Vishwanath, Kedarnath, Vaishno Devi and more, anytime from anywhere.' },
  { icon: '💰', title: 'Yatra Savings Goals', desc: 'Set a monthly savings target for your dream pilgrimage. Track deposits and link to FinVerse to earn interest while your fund grows.' },
  { icon: '📔', title: 'Pilgrimage Journal', desc: 'Log every temple you visit with photos and notes. Build a lifetime pilgrimage passport — a permanent spiritual record of your journey.' },
  { icon: '🧾', title: 'Group Expense Split', desc: 'Plan family pilgrimages fairly. Log all shared expenses, calculate settlements, and share on WhatsApp instantly.' },
  { icon: '🎒', title: 'Smart Packing List', desc: 'Gemini AI generates destination-specific packing lists. Kedarnath needs altitude gear. Tirupati needs dhoti. Done automatically.' },
]

const TESTIMONIALS = [
  { quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes. It knew which temple opens first in the season.', name: 'Ramesh Kulkarni', loc: 'Pune' },
  { quote: 'First app that actually understands what a pilgrim needs — not just a tourist. I have visited 23 Jyotirlingas using it.', name: 'Savitri Deshpande', loc: 'Nashik' },
  { quote: 'The group split feature saved our Ashtavinayak family trip. 6 people, 8 days, all expenses settled on WhatsApp.', name: 'Vikram Mehta', loc: 'Ahmedabad' },
]

function TilakLogo() {
  return (
    <a href="/" className="nav-brand" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
      <img src="/divyadarshan-logo.png" alt="DivyaDarshan" style={{ height:88, width:'auto', objectFit:'contain' }} />
    </a>
  )
}

export default function HomePage() {
  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#FDFAF6;color:#1A0A00}
        .pub-nav{background:#fff;border-bottom:1.5px solid #EDE8E0;padding:0 24px;position:sticky;top:0;z-index:50;box-shadow:0 1px 3px rgba(0,0,0,.04)}
        .pub-nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:80px}
        .nav-brand{display:flex;align-items:center;text-decoration:none;gap:10px}
        .nav-links{display:flex;gap:8px;align-items:center}
        .nav-links a{padding:8px 16px;border-radius:8px;font-size:14px;font-weight:500;color:#555;text-decoration:none;transition:all .15s}
        .nav-links a:hover{background:#FFF5F5;color:#8B1A1A}
        .btn-primary{background:#8B1A1A;color:white!important;border-radius:8px;padding:9px 20px;font-weight:600;font-size:14px}
        .btn-primary:hover{background:#6B1212!important}
        .hero{text-align:center;padding:80px 24px 60px;max-width:800px;margin:0 auto}
        .hero-badge{display:inline-flex;align-items:center;gap:6px;background:#FFF5F0;border:1.5px solid #FFD4B8;border-radius:100px;padding:6px 16px;font-size:12px;font-weight:600;color:#C0570A;letter-spacing:.04em;margin-bottom:28px}
        .live-dot{width:7px;height:7px;border-radius:50%;background:#E74C3C;animation:blink 2s ease infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        h1{font-family:'Playfair Display',Georgia,serif;font-size:clamp(2.4rem,5vw,4rem);font-weight:700;line-height:1.1;letter-spacing:-0.02em;color:#1A0A00;margin-bottom:20px}
        h1 em{font-style:italic;color:#C0570A}
        .hero-sub{font-size:1.1rem;line-height:1.75;color:#6B5B4E;max-width:560px;margin:0 auto 36px}
        .hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .cta-main{background:#8B1A1A;color:white;padding:14px 28px;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;transition:all .2s}
        .cta-main:hover{background:#6B1212;transform:translateY(-1px)}
        .cta-sec{background:white;color:#8B1A1A;padding:14px 28px;border-radius:100px;font-size:15px;font-weight:600;text-decoration:none;border:2px solid #8B1A1A;transition:all .2s}
        .cta-sec:hover{background:#FFF5F5}
        .stats{max-width:900px;margin:0 auto;padding:40px 24px;display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-top:1.5px solid #EDE8E0;border-bottom:1.5px solid #EDE8E0;text-align:center}
        .stat-n{font-family:'Playfair Display',serif;font-size:2.2rem;font-weight:700;color:#8B1A1A}
        .stat-l{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#A89B8C;margin-top:4px}
        .section{max-width:1100px;margin:0 auto;padding:64px 24px}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C0570A;margin-bottom:12px}
        .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:#1A0A00;margin-bottom:16px}
        .section-sub{font-size:1rem;line-height:1.75;color:#6B5B4E;max-width:540px}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
        @media(max-width:768px){.features-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:480px){.features-grid{grid-template-columns:1fr}.stats{grid-template-columns:repeat(2,1fr)}}
        .feat-card{background:white;border:1.5px solid #EDE8E0;border-radius:16px;padding:24px;transition:all .2s}
        .feat-card:hover{border-color:#C0570A;box-shadow:0 4px 20px rgba(192,87,10,.1);transform:translateY(-2px)}
        .feat-icon{font-size:28px;margin-bottom:14px}
        .feat-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:600;color:#1A0A00;margin-bottom:8px}
        .feat-desc{font-size:13px;line-height:1.7;color:#6B5B4E}
        .testimonials{background:white;border-top:1.5px solid #EDE8E0;border-bottom:1.5px solid #EDE8E0;padding:64px 24px}
        .t-grid{max-width:1000px;margin:40px auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        @media(max-width:768px){.t-grid{grid-template-columns:1fr}}
        .t-card{background:#FDFAF6;border:1.5px solid #EDE8E0;border-radius:14px;padding:24px}
        .t-quote{font-size:14px;line-height:1.75;color:#3D2B1F;margin-bottom:16px;font-style:italic}
        .t-name{font-size:13px;font-weight:700;color:#8B1A1A}
        .t-loc{font-size:11px;color:#A89B8C;margin-top:2px}
        .cta-section{text-align:center;padding:80px 24px;max-width:600px;margin:0 auto}
        .footer{background:#1A0A00;color:rgba(237,224,196,.6);padding:40px 24px;text-align:center;font-size:13px}
        .footer-logo{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:16px}
        .footer-logo-name{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#EDD9A3}
        .footer-logo-sub{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:rgba(237,224,196,.5)}
      `}</style>

      {/* Navbar */}
      <nav className="pub-nav">
        <div className="pub-nav-inner">
          <TilakLogo />
          <div className="nav-links">
            <Link href="/explore">Explore Temples</Link>
            <Link href="/plan">Plan Yatra</Link>
            <Link href="/auth/signin">Sign In</Link>
            <Link href="/auth/signup" className="btn-primary">Start Free →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">
          <span className="live-dot" />
          56 TEMPLES STREAMING LIVE NOW
        </div>
        <h1>Every sacred temple.<br /><em>One companion.</em></h1>
        <p className="hero-sub">
          India has over 2 million temples. Planning a pilgrimage means dozens of scattered tabs and outdated guides.
          DivyaDarshan brings AI planning, live darshan, savings tools and community into one platform.
        </p>
        <div className="hero-ctas">
          <Link href="/auth/signup" className="cta-main">Begin Your Yatra — Free →</Link>
          <Link href="/explore?tab=darshan" className="cta-sec">Watch Live Darshan</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div><div className="stat-n">356+</div><div className="stat-l">Sacred Temples</div></div>
        <div><div className="stat-n">56</div><div className="stat-l">Live Streams</div></div>
        <div><div className="stat-n">12</div><div className="stat-l">Pilgrimage Circuits</div></div>
        <div><div className="stat-n">₹0</div><div className="stat-l">Free Forever</div></div>
      </div>

      {/* Features */}
      <div className="section">
        <div className="section-label">Everything for your yatra</div>
        <h2 className="section-title">Built for pilgrims,<br />not tourists.</h2>
        <p className="section-sub">Every feature designed around what a pilgrim actually needs — from planning to the sacred moment of darshan.</p>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feat-card">
              <div className="feat-icon">{f.icon}</div>
              <div className="feat-title">{f.title}</div>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <div style={{ maxWidth:1000, margin:'0 auto', textAlign:'center' }}>
          <div className="section-label">Pilgrim Stories</div>
          <h2 className="section-title">Trusted by pilgrims across India</h2>
        </div>
        <div className="t-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="t-card">
              <p className="t-quote">"{t.quote}"</p>
              <div className="t-name">{t.name}</div>
              <div className="t-loc">{t.loc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="section-label">Join 10,000+ pilgrims</div>
        <h2 className="section-title">Begin your yatra today</h2>
        <p className="section-sub" style={{ margin:'16px auto 32px' }}>Free forever. No credit card. Join thousands planning smarter pilgrimages.</p>
        <Link href="/auth/signup" className="cta-main">Create Free Account →</Link>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-logo">
          <img src="/divyadarshan-logo.png" alt="DivyaDarshan" style={{ height:48, width:'auto', objectFit:'contain' }} />
        </div>
        <p>© 2026 DivyaDarshan · Built with 🙏 for pilgrims across India</p>
        <p style={{ marginTop:8 }}>
          <Link href="/explore" style={{ color:'rgba(237,224,196,.5)', textDecoration:'none', margin:'0 12px' }}>Explore</Link>
          <Link href="/plan" style={{ color:'rgba(237,224,196,.5)', textDecoration:'none', margin:'0 12px' }}>Plan</Link>
          <Link href="/auth/signin" style={{ color:'rgba(237,224,196,.5)', textDecoration:'none', margin:'0 12px' }}>Sign In</Link>
        </p>
      </footer>
    </>
  )
}
