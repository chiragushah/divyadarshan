import GoogleTranslate from "@/components/translate/GoogleTranslate"
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DivyaDarshan — India's Complete Temple & Pilgrimage Companion",
  description: 'Discover 402 sacred temples across India. AI yatra planning, Sankalp manifestation, Navagraha shanti, live darshan, community verified data.',
}

const FEATURES = [
  { icon: '🙏', title: 'Manifest — Sacred Sankalp', desc: 'Write your sacred intention, dedicate it to the right deity, and commit to a gratitude yatra when it manifests. Guided by ancient Indian Sankalp tradition.' },
  { icon: '🤖', title: 'AI Yatra Planner', desc: 'Tell our AI your destination, days and budget. Get a complete day-by-day pilgrimage itinerary with temple sequences, timings, accommodation and insider tips.' },
  { icon: '🪐', title: 'Navagraha Shanti Guide', desc: 'Sanskrit shlokas, beej mantras and YouTube pronunciation links for all 9 planets. Know which graha to appease for health, wealth, marriage and career.' },
  { icon: '📺', title: 'Live Darshan', desc: 'Watch live darshan from 46+ major temples — Tirupati, Kashi Vishwanath, Kedarnath, Vaishno Devi and more, anytime from anywhere in the world.' },
  { icon: '🛕', title: '402 Verified Temples', desc: 'Every temple has facilities, wheelchair access, how to reach, nearby places, dress code and timings — verified by pilgrims who actually visited.' },
  { icon: '💰', title: 'Yatra Savings Goals', desc: 'Set a monthly savings target for your dream pilgrimage. Track deposits and link to FinVerse to earn interest while your sacred fund grows.' },
  { icon: '📔', title: 'Pilgrimage Journal', desc: 'Log every temple you visit. Build a lifetime pilgrimage passport — a permanent spiritual record of your sacred journey across India.' },
  { icon: '👥', title: 'Group Yatra Planner', desc: 'Organise family pilgrimages with seat tracking, shared expense splitting and instant WhatsApp sharing. Open or private group yatras.' },
  { icon: '✅', title: 'Community Verification', desc: 'Pilgrims who visit temples verify accuracy of timings and facilities. Your on-ground experience helps thousands of future pilgrims plan better.' },
  { icon: '🧳', title: 'Expert Pilgrimage Planning', desc: 'Want us to plan your yatra end to end? Our travel experts handle hotels, darshan slots, trains and local guides. No payment now — expert contacts you in 24 hrs.' },
  { icon: '🚌', title: 'Pilgrimage Booking — Coming Soon', desc: 'Book complete pilgrimage packages — Char Dham, Jyotirlinga circuits, Ashtavinayak and more. All-inclusive with transport, accommodation and temple guidance.' },
]

const TESTIMONIALS = [
  { quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes. It knew which temple opens first in the season.', name: 'Ramesh Kulkarni', loc: 'Pune' },
  { quote: 'The Manifest feature is unlike anything I have seen. I wrote my Sankalp for my daughter’s marriage, dedicated it to Parvati Mata, and kept faith. Jai Mata Di.', name: 'Sunita Joshi', loc: 'Mumbai' },
  { quote: 'The Navagraha shlokas with YouTube links changed my daily morning routine. I now chant correctly with the right pronunciation every day.', name: 'Vikram Mehta', loc: 'Ahmedabad' },
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
        .footer{background:white;border-top:1.5px solid #EDE8E0;color:#6B5B4E;padding:40px 24px;text-align:center;font-size:13px}
        .footer-logo{display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:16px}
        .footer-logo-name{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#8B1A1A}
        .footer-logo-sub{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:#A89B8C}
      `}</style>

      {/* Navbar */}
      <div style={{position:"fixed",top:16,right:16,zIndex:50,display:"none"}} className="md:block"><GoogleTranslate /></div>
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
          46 TEMPLES STREAMING LIVE NOW
        </div>
        <h1>Every sacred temple.<br /><em>One divine companion.</em></h1>
        <p className="hero-sub">
          India has over 2 million temples. Planning a pilgrimage means dozens of scattered tabs and outdated guides.
          DivyaDarshan brings AI yatra planning, sacred Sankalp manifestation, Navagraha shanti, live darshan and community verified data into one platform — free forever.
        </p>
        <div className="hero-ctas">
          <Link href="/auth/signup" className="cta-main">Begin Your Yatra — Free →</Link>
          <Link href="/manifest" className="cta-sec">🙏 Write Your Sankalp</Link>
          <Link href="/explore?tab=darshan" className="cta-sec">Watch Live Darshan</Link>
        </div>
      </div>

      {/* Stats */}
      <div className="stats">
        <div><div className="stat-n">402</div><div className="stat-l">Sacred Temples</div></div>
        <div><div className="stat-n">46</div><div className="stat-l">Live Streams</div></div>
        <div><div className="stat-n">9+9</div><div className="stat-l">Deities & Navagraha</div></div>
        <div><div className="stat-n">₹0</div><div className="stat-l">Free Forever</div></div>
      </div>

      {/* Features */}
      <div className="section">
        <div className="section-label">Everything for your spiritual journey</div>
        <h2 className="section-title">Built for pilgrims,<br />not tourists.</h2>
        <p className="section-sub">From writing your Sankalp to planning your yatra to verifying temple data — every feature designed around what a pilgrim actually needs.</p>
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

      {/* Expert Planning Banner */}
      <div style={{ background:'#8B1A1A', padding:'48px 24px', margin:'0' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:'rgba(255,255,255,0.6)', marginBottom:10 }}>Premium Service</div>
            <h2 className="section-title" style={{ color:'white', fontSize:'clamp(22px,3vw,32px)', marginBottom:14 }}>Want us to plan your yatra end to end?</h2>
            <p style={{ color:'rgba(255,255,255,0.82)', fontSize:15, lineHeight:1.7, marginBottom:20 }}>Our travel experts handle hotels, darshan slots, trains and local guides — so you focus only on the spiritual journey.</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:28 }}>
              {['✓ Personalised itinerary','✓ Hotel & train bookings','✓ VIP darshan slots','✓ Local guide coordination'].map(f => (
                <span key={f} style={{ background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.2)', borderRadius:100, padding:'5px 14px', fontSize:13, color:'white', fontWeight:500 }}>{f}</span>
              ))}
            </div>
            <div style={{ background:'white', borderRadius:12, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, flexWrap:'wrap' }}>
              <p style={{ fontSize:13, color:'#6B5B4E', margin:0 }}>No payment now · Expert contacts you in 24 hrs · Pay only after approval</p>
              <a href="/plan" style={{ background:'#8B1A1A', color:'white', padding:'11px 24px', borderRadius:10, fontWeight:700, fontSize:14, textDecoration:'none', whiteSpace:'nowrap', flexShrink:0 }}>Plan My Trip →</a>
            </div>
          </div>
          <div style={{ fontSize:96, flexShrink:0 }}>🛕</div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <div style={{ maxWidth:1000, margin:'0 auto', textAlign:'center' }}>
          <div className="section-label">Pilgrim Stories</div>
          <h2 className="section-title">Stories from fellow pilgrims</h2>
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
        <div className="section-label">Join thousands of pilgrims</div>
        <h2 className="section-title">Begin your sacred journey today</h2>
        <p className="section-sub" style={{ margin:'16px auto 32px' }}>Free forever. No credit card. No ads. Write your Sankalp, plan your yatra, track your pilgrimage — all in one place.</p>
        <div className="hero-ctas">
          <Link href="/auth/signup" className="cta-main">Create Free Account →</Link>
          <Link href="/manifest" className="cta-sec">🙏 Write Your Sankalp</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p style={{ fontSize:12, color:'#A89B8C', marginBottom:8, letterSpacing:'.06em', textTransform:'uppercase', fontWeight:600 }}>Conceptualized and Developed by</p>
        <div className="footer-logo" style={{ marginBottom:8 }}>
          <img src="/dynaimers-logo.png" alt="Dynaimers Consulting" style={{ height:40, width:'auto', objectFit:'contain' }} />
        </div>
        <p style={{ fontWeight:600, color:'#4A3728', marginBottom:4 }}>Dynaimers Consulting Pvt. Ltd.</p>
        <p>© 2026 DivyaDarshan · Built with 🙏 for pilgrims across India</p>
        <p style={{ marginTop:8 }}>
          <Link href="/explore" style={{ color:'#A89B8C', textDecoration:'none', margin:'0 12px' }}>Explore</Link>
          <Link href="/manifest" style={{ color:'#A89B8C', textDecoration:'none', margin:'0 12px' }}>Manifest</Link>
          <Link href="/plan" style={{ color:'#A89B8C', textDecoration:'none', margin:'0 12px' }}>Plan</Link>
          <Link href="/auth/signin" style={{ color:'#A89B8C', textDecoration:'none', margin:'0 12px' }}>Sign In</Link>
        </p>
      </footer>
    </>
  )
}
