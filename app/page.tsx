import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DivyaDarshan — Every Sacred Temple. One Companion.",
  description: 'Discover 350+ sacred temples across India. AI-powered yatra planning, live darshan, pilgrimage circuits, savings goals.',
}

const FEATURES = [
  { icon: '🗺️', title: 'AI Yatra Planner', desc: 'Tell Claude AI your destination, days and budget. Get a complete day-by-day pilgrimage itinerary with temple sequences, timings, accommodation and insider tips.' },
  { icon: '🔴', title: 'Live Darshan', desc: 'Watch live darshan from 56+ major temples — Tirupati, Kashi Vishwanath, Kedarnath, Vaishno Devi and more, anytime from anywhere.' },
  { icon: '💰', title: 'Yatra Savings Goals', desc: 'Set a monthly savings target for your dream pilgrimage. Track deposits and link to FinVerse to earn interest while your fund grows.' },
  { icon: '📖', title: 'Pilgrimage Journal', desc: 'Log every temple you visit with photos and notes. Build a lifetime pilgrimage passport — a permanent spiritual record of your journey.' },
  { icon: '👥', title: 'Group Expense Split', desc: 'Plan family pilgrimages fairly. Log all shared expenses, calculate settlements, and share on WhatsApp instantly.' },
  { icon: '🎒', title: 'Smart Packing List', desc: 'Gemini AI generates destination-specific packing lists. Kedarnath needs altitude gear. Tirupati needs dhoti. Done automatically.' },
]

const TESTIMONIALS = [
  { quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes. It knew which temple opens first in the season.', name: 'Ramesh Kulkarni', loc: 'Pune' },
  { quote: 'First app that actually understands what a pilgrim needs — not just a tourist. I have visited 23 Jyotirlingas using it.', name: 'Savitri Deshpande', loc: 'Nashik' },
  { quote: 'The group split feature saved our Ashtavinayak family trip. 6 people, 8 days, all expenses settled on WhatsApp.', name: 'Vikram Mehta', loc: 'Ahmedabad' },
]

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Outfit:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        :root{
          --saffron:#C0570A; --saffron-dark:#9A4208; --saffron-pale:#FFF3EB;
          --gold:#B07D10; --gold-light:#D4A520;
          --white:#FFFFFF; --off-white:#FDFAF7; --sandstone:#F5EFE4;
          --ink:#0F0A05; --ink-2:#2A1A0D; --ink-3:#5C3D22;
          --muted:#8B6A4F; --muted-light:#B09078; --border:#E8DDD2;
          --crimson:#6B1010; --crimson-deep:#3D0808;
        }
        body{font-family:'Outfit',sans-serif;color:var(--ink);background:var(--white);}
        .serif{font-family:'Cormorant Garamond',serif;}

        /* Frame */
        .frame::before{content:'';position:fixed;inset:10px;border:1.5px solid var(--saffron);border-radius:3px;pointer-events:none;z-index:1000;opacity:.35;}

        /* Top bar */
        .top-bar{height:3px;background:linear-gradient(to right,var(--saffron-dark),var(--gold-light),var(--saffron-dark));}

        /* Nav */
        nav{padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border);position:sticky;top:0;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);z-index:100;}
        .nav-brand{display:flex;align-items:center;gap:.75rem;text-decoration:none;}
        .nav-icon{width:38px;height:38px;background:linear-gradient(135deg,var(--saffron),var(--crimson));border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:19px;}
        .nav-name{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:var(--ink);}
        .nav-sub{font-size:.58rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--saffron);}
        .nav-links{display:flex;align-items:center;gap:.75rem;}
        .btn-ghost{padding:.5rem 1.1rem;border:1.5px solid var(--border);border-radius:100px;font-family:'Outfit',sans-serif;font-size:.8rem;font-weight:500;color:var(--muted);text-decoration:none;transition:all .2s;}
        .btn-ghost:hover{border-color:var(--saffron);color:var(--saffron);}
        .btn-saffron{padding:.5rem 1.25rem;background:var(--saffron);color:white;border-radius:100px;font-family:'Outfit',sans-serif;font-size:.8rem;font-weight:700;text-decoration:none;transition:all .2s;}
        .btn-saffron:hover{background:var(--saffron-dark);transform:translateY(-1px);box-shadow:0 4px 16px rgba(192,87,10,.3);}

        /* Hero */
        .hero{padding:5rem 1.5rem 4rem;text-align:center;max-width:820px;margin:0 auto;}
        .eyebrow{display:inline-flex;align-items:center;gap:.45rem;font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--saffron);margin-bottom:1.25rem;padding:.3rem .8rem;background:rgba(192,87,10,.07);border-radius:100px;border:1px solid rgba(192,87,10,.18);}
        .ldot{width:6px;height:6px;border-radius:50%;background:#E74C3C;animation:blink 2s ease infinite;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}
        h1{font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,6vw,4.5rem);font-weight:600;line-height:1.1;color:var(--ink);margin-bottom:.75rem;}
        h1 em{font-style:italic;color:var(--saffron);}
        .hero-sub{font-size:1rem;line-height:1.75;color:var(--muted);max-width:560px;margin:0 auto 2.5rem;}
        .hero-btns{display:flex;gap:.875rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
        .btn-primary{padding:.875rem 2rem;background:var(--saffron);color:white;border-radius:100px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:700;text-decoration:none;transition:all .25s;box-shadow:0 4px 20px rgba(192,87,10,.25);}
        .btn-primary:hover{background:var(--saffron-dark);transform:translateY(-2px);box-shadow:0 8px 28px rgba(192,87,10,.35);}
        .btn-outline{padding:.875rem 2rem;background:white;border:1.5px solid var(--border);color:var(--ink-3);border-radius:100px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:500;text-decoration:none;transition:all .25s;}
        .btn-outline:hover{border-color:var(--saffron);color:var(--saffron);}

        /* Stats */
        .stats{display:flex;justify-content:center;gap:3rem;flex-wrap:wrap;padding:1.5rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .stat-num{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:600;color:var(--saffron);line-height:1;}
        .stat-label{font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--muted-light);margin-top:.25rem;}

        /* Section */
        .section{padding:5rem 1.5rem;max-width:1100px;margin:0 auto;}
        .sec-label{font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--saffron);margin-bottom:.75rem;}
        h2{font-family:'Cormorant Garamond',serif;font-size:clamp(1.75rem,4vw,3rem);font-weight:600;color:var(--ink);margin-bottom:.75rem;line-height:1.2;}
        .sec-sub{font-size:.95rem;line-height:1.75;color:var(--muted);max-width:520px;}

        /* Divider */
        .divider{height:1.5px;background:linear-gradient(to right,var(--saffron),transparent);max-width:120px;margin:1.5rem 0;}

        /* Features */
        .features-bg{background:var(--sandstone);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
        .features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:3rem;}
        .fc{background:white;border:1.5px solid var(--border);border-radius:12px;padding:1.5rem;transition:all .2s;}
        .fc:hover{border-color:var(--saffron);box-shadow:0 4px 20px rgba(192,87,10,.1);transform:translateY(-2px);}
        .fc-icon{font-size:1.75rem;margin-bottom:.875rem;}
        .fc-title{font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:600;color:var(--ink);margin-bottom:.5rem;}
        .fc-desc{font-size:.8rem;line-height:1.65;color:var(--muted);}

        /* Steps */
        .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-top:3rem;position:relative;}
        .steps::before{content:'';position:absolute;top:28px;left:12%;right:12%;height:1px;background:linear-gradient(to right,transparent,var(--border),var(--border),transparent);}
        .step{text-align:center;}
        .step-num{width:56px;height:56px;border-radius:50%;background:white;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-family:'Cormorant Garamond',serif;font-size:1.4rem;font-weight:600;color:var(--saffron);position:relative;z-index:1;}
        .step-title{font-size:.9rem;font-weight:700;color:var(--ink);margin-bottom:.3rem;}
        .step-desc{font-size:.75rem;line-height:1.6;color:var(--muted);}

        /* Testimonials */
        .testimonials-bg{background:var(--crimson-deep);padding:5rem 1.5rem;}
        .testimonials-inner{max-width:1100px;margin:0 auto;}
        .tgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-top:2.5rem;}
        .tc{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:1.5rem;}
        .tc-stars{color:var(--gold-light);font-size:.9rem;letter-spacing:2px;margin-bottom:.875rem;}
        .tc-quote{font-family:'Cormorant Garamond',serif;font-size:1rem;font-style:italic;line-height:1.65;color:rgba(237,224,196,.8);margin-bottom:1rem;}
        .tc-name{font-size:.82rem;font-weight:600;color:rgba(237,224,196,.9);}
        .tc-loc{font-size:.72rem;color:rgba(237,224,196,.4);}

        /* FinVerse */
        .fv-card{background:linear-gradient(135deg,var(--crimson-deep),var(--crimson));border-radius:20px;padding:3rem;display:grid;grid-template-columns:1fr auto;align-items:center;gap:2rem;border:1px solid rgba(192,87,10,.2);}
        .fv-label{font-size:.62rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gold-light);margin-bottom:.5rem;}
        .fv-title{font-family:'Cormorant Garamond',serif;font-size:1.9rem;font-weight:600;color:white;margin-bottom:.5rem;}
        .fv-desc{font-size:.85rem;color:rgba(237,224,196,.5);line-height:1.6;}

        /* CTA */
        .cta-section{padding:7rem 1.5rem;text-align:center;background:var(--sandstone);border-top:1px solid var(--border);}
        .cta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,5vw,3.5rem);font-weight:600;color:var(--ink);margin-bottom:.875rem;}
        .cta-title em{font-style:italic;color:var(--saffron);}
        .cta-sub{font-size:.95rem;color:var(--muted);margin-bottom:2.5rem;max-width:400px;margin-left:auto;margin-right:auto;line-height:1.7;}

        /* Footer */
        footer{background:var(--crimson-deep);padding:2rem 1.5rem;display:flex;justify-content:center;align-items:center;gap:2rem;flex-wrap:wrap;border-top:3px solid var(--saffron);}
        footer p{font-size:.72rem;color:rgba(237,224,196,.3);}
        footer a{font-size:.72rem;color:rgba(237,224,196,.35);text-decoration:none;}
        footer a:hover{color:rgba(237,224,196,.7);}

        /* Responsive */
        @media(max-width:768px){
          .features-grid,.tgrid,.steps{grid-template-columns:1fr;}
          .steps::before{display:none;}
          .fv-card{grid-template-columns:1fr;}
          nav{padding:.875rem 1.25rem;}
          .hero{padding:3rem 1rem 2.5rem;}
          .stats{gap:1.5rem;}
          .section{padding:3.5rem 1rem;}
        }
        @media(max-width:480px){
          .hero-btns{flex-direction:column;align-items:center;}
          .nav-links .btn-ghost{display:none;}
        }
      `}</style>

      <div className="frame">
        <div className="top-bar" />

        {/* NAV */}
        <nav>
          <a href="/" className="nav-brand">
            <div className="nav-icon">🛕</div>
            <div>
              <div className="nav-name">DivyaDarshan</div>
              <div className="nav-sub">India's Temple Explorer</div>
            </div>
          </a>
          <div className="nav-links">
            <Link href="/auth/signin" className="btn-ghost">Sign In</Link>
            <Link href="/auth/signin" className="btn-saffron">Start Free →</Link>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ maxWidth:820, margin:'0 auto' }}>
          <div className="hero">
            <div className="eyebrow"><span className="ldot" /> 56 Temples Streaming Live Now</div>
            <h1>Every sacred temple.<br /><em>One companion.</em></h1>
            <p className="hero-sub">India has over 2 million temples. Planning a pilgrimage means dozens of scattered tabs and outdated guides. DivyaDarshan brings AI planning, live darshan, savings tools and community into one platform.</p>
            <div className="hero-btns">
              <Link href="/auth/signin" className="btn-primary">Begin Your Yatra — Free →</Link>
              <Link href="/auth/signin" className="btn-outline">Watch Live Darshan</Link>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div style={{ maxWidth:900, margin:'0 auto', padding:'0 1.5rem 4rem' }}>
          <div className="stats">
            {[['350+','Sacred Temples'],['56','Live Streams'],['12','Pilgrimage Circuits'],['₹0','Free Forever']].map(([n,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <div className="features-bg">
          <div className="section">
            <div className="sec-label">Everything for Your Yatra</div>
            <h2>Built for the modern pilgrim</h2>
            <div className="divider" />
            <div className="features-grid">
              {FEATURES.map(f => (
                <div key={f.title} className="fc">
                  <div className="fc-icon">{f.icon}</div>
                  <div className="fc-title">{f.title}</div>
                  <p className="fc-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="section" style={{ textAlign:'center' }}>
          <div className="sec-label">How It Works</div>
          <h2>From idea to itinerary in minutes</h2>
          <div className="steps">
            {[
              ['01','Create free account','Sign up with Google or email. 30 seconds.'],
              ['02','Find your temple','350+ temples with timings, festivals and live streams.'],
              ['03','Plan with AI','Tell the AI your destination — get a complete itinerary.'],
              ['04','Save & go','Set a savings goal, track progress, and start your yatra.'],
            ].map(([n,t,d]) => (
              <div key={n} className="step">
                <div className="step-num">{n}</div>
                <div className="step-title">{t}</div>
                <p className="step-desc">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="testimonials-bg">
          <div className="testimonials-inner">
            <div className="sec-label" style={{ color:'rgba(237,224,196,.4)' }}>Pilgrim Stories</div>
            <h2 style={{ color:'white' }}>What our community says</h2>
            <div className="tgrid">
              {TESTIMONIALS.map(t => (
                <div key={t.name} className="tc">
                  <div className="tc-stars">★★★★★</div>
                  <p className="tc-quote">"{t.quote}"</p>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-loc">{t.loc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FINVERSE */}
        <div className="section">
          <div className="fv-card">
            <div>
              <div className="fv-label">Powered by FinVerse</div>
              <div className="fv-title">Your yatra deserves a savings fund</div>
              <p className="fv-desc">Save ₹3,200/month and your Char Dham yatra is funded in 8 months. Open a dedicated Yatra Fund on FinVerse, earn interest, and watch your dream become real.</p>
            </div>
            <a href="https://finverse.app" target="_blank" rel="noopener" className="btn-primary" style={{ whiteSpace:'nowrap', flexShrink:0 }}>Open Yatra Fund →</a>
          </div>
        </div>

        {/* CTA */}
        <div className="cta-section">
          <div className="cta-title">Your next yatra<br /><em>starts here.</em></div>
          <p className="cta-sub">Join thousands of pilgrims who plan smarter, save intentionally, and travel with purpose.</p>
          <Link href="/auth/signin" className="btn-primary" style={{ fontSize:'1rem', padding:'1rem 2.5rem' }}>
            Start Free — No Credit Card →
          </Link>
        </div>

        {/* FOOTER */}
        <footer>
          <p>© 2026 DivyaDarshan · Built with devotion for India's pilgrims</p>
          <a href="/auth/signin">Sign In</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <p>A product by Dynaimers Consulting</p>
        </footer>
      </div>
    </>
  )
}
