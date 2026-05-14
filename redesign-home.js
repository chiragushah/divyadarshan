const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

const page = `import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "DivyaDarshanam \u2014 India's Complete Temple & Pilgrimage Companion",
  description: 'Discover 422 sacred temples across India. AI yatra planning, Sankalp manifestation, Navagraha shanti, live darshan, community verified data.',
}

const FEATURES = [
  { icon: '\uD83D\uDE4F', title: 'Manifest \u2014 Sacred Sankalp', desc: 'Write your sacred intention, dedicate it to the right deity, and commit to a gratitude yatra when it manifests.' },
  { icon: '\uD83E\uDD16', title: 'AI Yatra Planner', desc: 'Tell our AI your destination, days and budget. Get a complete day-by-day pilgrimage itinerary with temple sequences and timings.' },
  { icon: '\uD83E\uDE90', title: 'Navagraha Shanti Guide', desc: 'Sanskrit shlokas, beej mantras and YouTube pronunciation links for all 9 planets.' },
  { icon: '\uD83D\uDCFA', title: 'Live Darshan', desc: 'Watch live darshan from 46+ major temples \u2014 Tirupati, Kashi Vishwanath, Kedarnath, Vaishno Devi and more.' },
  { icon: '\uD83D\uDED5', title: '422 Verified Temples', desc: 'Every temple has facilities, wheelchair access, how to reach, nearby places, dress code and timings.' },
  { icon: '\uD83D\uDCB0', title: 'Yatra Savings Goals', desc: 'Set a monthly savings target for your dream pilgrimage. Track deposits and link to FinVerse to earn interest.' },
  { icon: '\uD83D\uDCD4', title: 'Pilgrimage Journal', desc: 'Log every temple you visit. Build a lifetime pilgrimage passport \u2014 a permanent spiritual record.' },
  { icon: '\uD83D\uDC65', title: 'Group Yatra Planner', desc: 'Organise family pilgrimages with seat tracking, shared expense splitting and instant WhatsApp sharing.' },
  { icon: '\u2705', title: 'Community Verification', desc: 'Pilgrims who visit temples verify accuracy of timings and facilities for thousands of future pilgrims.' },
]

const TESTIMONIALS = [
  { quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes. It knew which temple opens first in the season.', name: 'Ramesh Kulkarni', loc: 'Pune' },
  { quote: 'The Manifest feature is unlike anything I have seen. I wrote my Sankalp for my daughter\u2019s marriage and kept faith. Jai Mata Di.', name: 'Sunita Joshi', loc: 'Mumbai' },
  { quote: 'The Navagraha shlokas with YouTube links changed my daily morning routine. I now chant correctly every day.', name: 'Vikram Mehta', loc: 'Ahmedabad' },
]

export default function HomePage() {
  return (
    <>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#fff;color:#1A0A00;font-family:'Inter',sans-serif}

        /* NAV */
        .nav{background:#fff;border-bottom:1px solid #F0EDE8;position:sticky;top:0;z-index:100;box-shadow:0 1px 12px rgba(0,0,0,0.06)}
        .nav-inner{max-width:1140px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:88px}
        .nav-logo img{height:80px;width:auto;object-fit:contain;display:block}
        .nav-links{display:flex;align-items:center;gap:6px}
        .nav-links a{padding:8px 16px;border-radius:8px;font-size:14px;font-weight:500;color:#555;text-decoration:none;transition:all .15s}
        .nav-links a:hover{color:#8B1A1A;background:#FFF5F5}
        .nav-cta{background:#8B1A1A!important;color:#fff!important;border-radius:100px!important;padding:9px 22px!important;font-weight:700!important}
        .nav-cta:hover{background:#6B1212!important;transform:translateY(-1px)}
        @media(max-width:640px){.nav-links a:not(.nav-cta){display:none}}

        /* HERO */
        .hero{text-align:center;padding:72px 24px 56px;background:#fff}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:#FFF5F0;border:1.5px solid #FFD4B8;border-radius:100px;padding:7px 18px;font-size:12px;font-weight:700;color:#C0570A;letter-spacing:.06em;margin-bottom:32px;text-transform:uppercase}
        .live-dot{width:8px;height:8px;border-radius:50%;background:#E74C3C;animation:blink 2s ease infinite;flex-shrink:0}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.6rem,5.5vw,4.2rem);font-weight:700;line-height:1.1;letter-spacing:-0.02em;color:#1A0A00;margin-bottom:24px}
        .hero h1 em{font-style:italic;color:#C0570A}
        .hero-sub{font-size:1.1rem;line-height:1.8;color:#6B5B4E;max-width:580px;margin:0 auto 40px}
        .hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .cta-main{background:#8B1A1A;color:#fff;padding:15px 32px;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;transition:all .2s;display:inline-flex;align-items:center;gap:6px}
        .cta-main:hover{background:#6B1212;transform:translateY(-2px);box-shadow:0 8px 24px rgba(139,26,26,0.25)}
        .cta-sec{background:#fff;color:#8B1A1A;padding:15px 28px;border-radius:100px;font-size:15px;font-weight:600;text-decoration:none;border:2px solid #8B1A1A;transition:all .2s}
        .cta-sec:hover{background:#FFF5F5}

        /* STATS */
        .stats{border-top:1px solid #F0EDE8;border-bottom:1px solid #F0EDE8;background:#fff}
        .stats-inner{max-width:900px;margin:0 auto;padding:40px 24px;display:grid;grid-template-columns:repeat(4,1fr);text-align:center}
        .stat-n{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;color:#8B1A1A}
        .stat-l{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#A89B8C;margin-top:6px}
        @media(max-width:480px){.stats-inner{grid-template-columns:repeat(2,1fr);gap:24px 0}}

        /* FEATURES */
        .features{background:#fff;padding:80px 24px}
        .features-inner{max-width:1100px;margin:0 auto}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C0570A;margin-bottom:12px}
        .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.9rem,3vw,2.8rem);font-weight:700;color:#1A0A00;margin-bottom:14px;line-height:1.2}
        .section-sub{font-size:1rem;line-height:1.75;color:#6B5B4E;max-width:520px}
        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
        @media(max-width:768px){.feat-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:480px){.feat-grid{grid-template-columns:1fr}}
        .feat-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;transition:all .2s;cursor:default}
        .feat-card:hover{border-color:#C0570A33;box-shadow:0 4px 24px rgba(192,87,10,.08);transform:translateY(-2px)}
        .feat-icon{font-size:32px;margin-bottom:16px}
        .feat-title{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#1A0A00;margin-bottom:8px}
        .feat-desc{font-size:13px;line-height:1.75;color:#6B5B4E}

        /* BANNER */
        .banner{background:linear-gradient(135deg,#8B1A1A 0%,#5C0F0F 100%);padding:64px 24px}
        .banner-inner{max-width:960px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:40px;flex-wrap:wrap}
        .banner h2{font-family:'Playfair Display',serif;font-size:clamp(1.6rem,3vw,2.4rem);color:#fff;margin-bottom:14px;line-height:1.2}
        .banner p{color:rgba(255,255,255,.82);font-size:15px;line-height:1.7;margin-bottom:24px}
        .banner-chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px}
        .chip{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.2);border-radius:100px;padding:5px 14px;font-size:13px;color:#fff;font-weight:500}
        .banner-box{background:#fff;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
        .banner-box p{font-size:13px;color:#6B5B4E;margin:0}
        .banner-btn{background:#8B1A1A;color:#fff;padding:11px 24px;border-radius:10px;font-weight:700;font-size:14px;text-decoration:none;white-space:nowrap;flex-shrink:0}
        .banner-emoji{font-size:88px;flex-shrink:0}
        @media(max-width:640px){.banner-emoji{display:none}}

        /* TESTIMONIALS */
        .testi{background:#fff;border-top:1px solid #F0EDE8;padding:80px 24px}
        .testi-inner{max-width:1060px;margin:0 auto;text-align:center}
        .t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;text-align:left}
        @media(max-width:768px){.t-grid{grid-template-columns:1fr}}
        .t-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px}
        .t-stars{color:#C0570A;font-size:14px;margin-bottom:12px;letter-spacing:2px}
        .t-quote{font-size:14px;line-height:1.8;color:#3D2B1F;margin-bottom:18px;font-style:italic}
        .t-name{font-size:13px;font-weight:700;color:#8B1A1A}
        .t-loc{font-size:11px;color:#A89B8C;margin-top:2px}

        /* CTA SECTION */
        .cta-sec-wrap{text-align:center;padding:80px 24px;background:#fff}
        .cta-sec-inner{max-width:560px;margin:0 auto}

        /* FOOTER */
        .footer{background:#fff;border-top:1px solid #F0EDE8;padding:40px 24px;text-align:center}
        .footer img{height:44px;width:auto;margin:0 auto 12px;display:block}
        .footer p{font-size:13px;color:#A89B8C;line-height:1.8}
        .footer a{color:#A89B8C;text-decoration:none;margin:0 10px}
        .footer a:hover{color:#8B1A1A}
      \`}</style>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo">
            <img src="/dd-logo.png" alt="DivyaDarshanam" />
          </a>
          <div className="nav-links">
            <a href="/explore">Explore Temples</a>
            <a href="/plan">Plan Yatra</a>
            <a href="/auth/signin">Sign In</a>
            <a href="/auth/signup" className="nav-cta">Start Free \u2192</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-badge">
          <span className="live-dot" />
          46 Temples Streaming Live Now
        </div>
        <h1>Every sacred temple.<br /><em>One divine companion.</em></h1>
        <p className="hero-sub">
          India has over 2 million temples. Planning a pilgrimage means dozens of scattered tabs and outdated guides.
          DivyaDarshanam brings AI yatra planning, sacred Sankalp manifestation, Navagraha shanti, live darshan
          and community verified data into one platform \u2014 free forever.
        </p>
        <div className="hero-ctas">
          <a href="/auth/signup" className="cta-main">Begin Your Yatra \u2014 Free \u2192</a>
          <a href="/manifest" className="cta-sec">\uD83D\uDE4F Write Your Sankalp</a>
          <a href="/explore?tab=darshan" className="cta-sec">Watch Live Darshan</a>
        </div>
      </div>

      {/* STATS */}
      <div className="stats">
        <div className="stats-inner">
          <div><div className="stat-n">422</div><div className="stat-l">Sacred Temples</div></div>
          <div><div className="stat-n">46</div><div className="stat-l">Live Streams</div></div>
          <div><div className="stat-n">9+9</div><div className="stat-l">Deities & Navagraha</div></div>
          <div><div className="stat-n">\u20B90</div><div className="stat-l">Free Forever</div></div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="features">
        <div className="features-inner">
          <div className="section-label">Everything for your spiritual journey</div>
          <h2 className="section-title">Built for pilgrims,<br />not tourists.</h2>
          <p className="section-sub">From writing your Sankalp to planning your yatra to verifying temple data \u2014 every feature designed around what a pilgrim actually needs.</p>
          <div className="feat-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <p className="feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* EXPERT PLANNING BANNER */}
      <div className="banner">
        <div className="banner-inner">
          <div style={{flex:1,minWidth:280}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.12em',color:'rgba(255,255,255,0.6)',marginBottom:10}}>Premium Service</div>
            <h2>Want us to plan your yatra end to end?</h2>
            <p>Our travel experts handle hotels, darshan slots, trains and local guides \u2014 so you focus only on the spiritual journey.</p>
            <div className="banner-chips">
              {['\u2713 Personalised itinerary','\u2713 Hotel & train bookings','\u2713 VIP darshan slots','\u2713 Local guide coordination'].map(f => (
                <span key={f} className="chip">{f}</span>
              ))}
            </div>
            <div className="banner-box">
              <p>No payment now \u00B7 Expert contacts you in 24 hrs \u00B7 Pay only after approval</p>
              <a href="/plan" className="banner-btn">Plan My Trip \u2192</a>
            </div>
          </div>
          <div className="banner-emoji">\uD83D\uDED5</div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="testi">
        <div className="testi-inner">
          <div className="section-label">Pilgrim Stories</div>
          <h2 className="section-title">Stories from fellow pilgrims</h2>
          <div className="t-grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="t-card">
                <div className="t-stars">\u2605\u2605\u2605\u2605\u2605</div>
                <p className="t-quote">"{t.quote}"</p>
                <div className="t-name">{t.name}</div>
                <div className="t-loc">{t.loc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-sec-wrap">
        <div className="cta-sec-inner">
          <div className="section-label">Join thousands of pilgrims</div>
          <h2 className="section-title">Begin your sacred journey today</h2>
          <p style={{fontSize:'1rem',lineHeight:1.75,color:'#6B5B4E',margin:'16px auto 32px'}}>Free forever. No credit card. No ads. Write your Sankalp, plan your yatra, track your pilgrimage \u2014 all in one place.</p>
          <div className="hero-ctas">
            <a href="/auth/signup" className="cta-main">Create Free Account \u2192</a>
            <a href="/manifest" className="cta-sec">\uD83D\uDE4F Write Your Sankalp</a>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p style={{fontSize:12,color:'#A89B8C',marginBottom:12,letterSpacing:'.06em',textTransform:'uppercase',fontWeight:600}}>Conceptualized & Developed by</p>
        <img src="/dynaimers-logo.jpg" alt="Dynaimers Consulting" style={{height:44,width:'auto',margin:'0 auto 12px',display:'block'}} />
        <p style={{fontWeight:600,color:'#4A3728',marginBottom:6}}>Dynaimers Consulting Pvt. Ltd.</p>
        <p>\u00A9 2026 DivyaDarshanam \u00B7 Built with \uD83D\uDE4F for pilgrims across India</p>
        <p style={{marginTop:12}}>
          <a href="/explore">Explore</a>
          <a href="/manifest">Manifest</a>
          <a href="/plan">Plan</a>
          <a href="/auth/signin">Sign In</a>
        </p>
      </footer>
    </>
  )
}
`

fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')
console.log('OK: app/page.tsx rewritten')

process.chdir(P)
execSync('git add "app/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "redesign: clean white home page with prominent logo"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
