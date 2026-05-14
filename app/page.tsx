'use client'
import Link from 'next/link'

const TEMPLE_CARDS = [
  { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Kedarnath_Temple.jpg/800px-Kedarnath_Temple.jpg', title: 'Kedarnath Temple', desc: 'One of the holiest Shiva shrines in the Himalayas. Plan your trek with AI-guided itineraries.', link: '/temple/kedarnath-temple' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Tirumala_temple_view.jpg/800px-Tirumala_temple_view.jpg', title: 'Tirumala Tirupati', desc: 'Most visited temple on Earth. Check live darshan slots and crowd levels.', link: '/temple/tirumala-venkateswara-temple' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Varanasi_at_dusk.jpg/800px-Varanasi_at_dusk.jpg', title: 'Kashi Vishwanath', desc: 'The eternal city of Lord Shiva. Experience live darshan from the sacred Jyotirlinga.', link: '/temple/kashi-vishwanath-temple' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Vaishno_Devi_Temple.jpg/800px-Vaishno_Devi_Temple.jpg', title: 'Vaishno Devi', desc: 'Plan your trek to the holy shrine of Maa Vaishno Devi with route guides and stay options.', link: '/temple/vaishno-devi-shrine' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Shirdi_Sai_Baba_Temple.jpg/800px-Shirdi_Sai_Baba_Temple.jpg', title: 'Shirdi Sai Baba', desc: 'Watch live darshan from Shirdi Sai Baba Samadhi Mandir and plan your pilgrimage.', link: '/temple/shirdi-sai-baba-samadhi' },
  { img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Somnath_temple_Prabhas_Patan.jpg/800px-Somnath_temple_Prabhas_Patan.jpg', title: 'Somnath Temple', desc: 'First Jyotirlinga of Lord Shiva. Watch the famous sunset aarti live from Saurashtra.', link: '/temple/somnath-temple' },
]

const FEATURES = [
  { n: '01', title: 'AI Yatra Planner', desc: 'Tell our AI your destination, days and budget. Get a complete day-by-day pilgrimage itinerary.' },
  { n: '02', title: 'Live Darshan Streams', desc: 'Watch live darshan from 46+ major temples anytime from anywhere in the world.' },
  { n: '03', title: 'Navagraha Shanti Guide', desc: 'Sanskrit shlokas and beej mantras for all 9 planets with YouTube pronunciation links.' },
  { n: '04', title: 'Pilgrimage Journal', desc: 'Log every temple you visit. Build a lifetime pilgrimage passport of your sacred journey.' },
  { n: '05', title: 'Group Yatra Planner', desc: 'Organise family pilgrimages with seat tracking and shared expense splitting.' },
  { n: '06', title: 'Yatra Savings Goals', desc: 'Set a monthly savings target for your dream pilgrimage and track every deposit.' },
]

const TESTIMONIALS = [
  { quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes.', name: 'Ramesh Kulkarni', loc: 'Pune', i: 'R' },
  { quote: 'The Manifest feature is unlike anything I have seen. Jai Mata Di.', name: 'Sunita Joshi', loc: 'Mumbai', i: 'S' },
  { quote: 'Navagraha shlokas with YouTube links changed my daily morning routine.', name: 'Vikram Mehta', loc: 'Ahmedabad', i: 'V' },
]

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html,body{background:#fff;color:#1A0A00;font-family:'Inter',sans-serif}
        .nav{background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #F0EDE8;position:sticky;top:0;z-index:100;box-shadow:0 1px 16px rgba(0,0,0,0.06)}
        .nav-inner{max-width:1200px;margin:0 auto;padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:80px}
        .nav-logo img{height:70px;width:auto;object-fit:contain;display:block}
        .nav-links{display:flex;align-items:center;gap:4px}
        .nav-links a{padding:8px 16px;border-radius:8px;font-size:14px;font-weight:500;color:#555;text-decoration:none;transition:all .15s}
        .nav-links a:hover{color:#8B1A1A;background:#FFF5F5}
        .nav-cta{background:#8B1A1A!important;color:#fff!important;border-radius:100px!important;padding:9px 22px!important;font-weight:700!important}
        .nav-cta:hover{background:#6B1212!important}
        @media(max-width:640px){.nav-links a:not(.nav-cta){display:none}.nav-logo img{height:56px}}
        .hero{position:relative;min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden}
        .hero-bg{position:absolute;inset:0;background-image:url('/hero-banner.png');background-size:cover;background-position:center top}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.25) 40%,rgba(0,0,0,0.72) 100%)}
        .hero-content{position:relative;z-index:2;padding:40px 24px 80px;max-width:900px;margin:0 auto}
        .hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.3);border-radius:100px;padding:7px 18px;font-size:12px;font-weight:700;color:white;letter-spacing:.08em;margin-bottom:28px;text-transform:uppercase}
        .live-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:blink 2s ease infinite;flex-shrink:0}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,6vw,5rem);font-weight:700;line-height:1.1;color:white;margin-bottom:8px;text-shadow:0 2px 20px rgba(0,0,0,0.4)}
        .hero h1 em{font-style:italic;color:#FFD700}
        .hero-hindi{font-size:clamp(1rem,2.5vw,1.4rem);color:rgba(255,255,255,0.85);margin-bottom:8px}
        .hero-sub{font-size:clamp(.9rem,1.8vw,1.1rem);line-height:1.8;color:rgba(255,255,255,0.8);max-width:640px;margin:0 auto 40px}
        .hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .cta-main{background:#8B1A1A;color:#fff;padding:15px 32px;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;transition:all .2s}
        .cta-main:hover{background:#6B1212;transform:translateY(-2px)}
        .cta-gold{background:rgba(255,215,0,0.15);backdrop-filter:blur(8px);color:#FFD700;padding:15px 28px;border-radius:100px;font-size:15px;font-weight:700;text-decoration:none;border:2px solid rgba(255,215,0,0.5);transition:all .2s}
        .cta-gold:hover{background:rgba(255,215,0,0.25)}
        .cta-white{background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);color:white;padding:15px 28px;border-radius:100px;font-size:15px;font-weight:600;text-decoration:none;border:2px solid rgba(255,255,255,0.4);transition:all .2s}
        .cta-white:hover{background:rgba(255,255,255,0.25)}
        .stats{background:#8B1A1A}
        .stats-inner{max-width:900px;margin:0 auto;padding:32px 24px;display:grid;grid-template-columns:repeat(4,1fr);text-align:center}
        .stat-n{font-family:'Playfair Display',serif;font-size:2.4rem;font-weight:700;color:#FFD700}
        .stat-l{font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-top:4px}
        @media(max-width:480px){.stats-inner{grid-template-columns:repeat(2,1fr);gap:20px}}
        .section-label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C0570A;margin-bottom:12px}
        .section-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:#1A0A00;margin-bottom:14px;line-height:1.2}
        .temples{max-width:1200px;margin:0 auto;padding:64px 24px}
        .temple-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
        @media(max-width:900px){.temple-grid{grid-template-columns:repeat(2,1fr)}}
        @media(max-width:560px){.temple-grid{grid-template-columns:1fr}}
        .temple-card{border-radius:16px;overflow:hidden;border:1.5px solid #F0EDE8;transition:all .2s;text-decoration:none;display:block;background:#fff}
        .temple-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,0.1);border-color:rgba(192,87,10,0.3)}
        .temple-img{height:200px;background-size:cover;background-position:center;position:relative}
        .temple-img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 60%)}
        .temple-card-body{padding:16px}
        .temple-card-title{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:#1A0A00;margin-bottom:6px}
        .temple-card-desc{font-size:13px;line-height:1.6;color:#6B5B4E}
        .temple-card-link{display:inline-flex;align-items:center;gap:4px;margin-top:10px;font-size:12px;font-weight:700;color:#8B1A1A}
        .sankalp{background:linear-gradient(135deg,#1A0A00,#3D0808,#5C1A00);padding:72px 24px;text-align:center;position:relative;overflow:hidden}
        .sankalp::before{content:'';position:absolute;inset:0;background:url('/hero-banner.png') center/cover;opacity:0.08}
        .sankalp-inner{position:relative;z-index:2;max-width:700px;margin:0 auto}
        .sankalp h2{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3rem);color:#FFD700;margin-bottom:12px;line-height:1.2}
        .sankalp p{font-size:1.05rem;color:rgba(255,255,255,0.8);line-height:1.8;margin-bottom:32px}
        .sankalp-cta{display:inline-flex;align-items:center;gap:8px;background:#FFD700;color:#1A0A00;padding:16px 36px;border-radius:100px;font-size:16px;font-weight:800;text-decoration:none;transition:all .2s}
        .sankalp-cta:hover{background:#FFC200;transform:translateY(-2px)}
        .features-strip{background:#FDFAF6;padding:64px 24px}
        .feat-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;max-width:1100px;margin-left:auto;margin-right:auto}
        @media(max-width:768px){.feat-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:480px){.feat-grid{grid-template-columns:1fr}}
        .feat-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;transition:all .2s}
        .feat-card:hover{border-color:rgba(192,87,10,0.2);box-shadow:0 4px 20px rgba(192,87,10,.08);transform:translateY(-2px)}
        .feat-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;color:#F0EDE8;margin-bottom:8px}
        .feat-title{font-family:'Playfair Display',serif;font-size:1.05rem;font-weight:700;color:#1A0A00;margin-bottom:8px}
        .feat-desc{font-size:13px;line-height:1.75;color:#6B5B4E}
        .testi{background:#fff;border-top:1px solid #F0EDE8;padding:72px 24px}
        .t-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;max-width:1060px;margin-left:auto;margin-right:auto;text-align:left}
        @media(max-width:768px){.t-grid{grid-template-columns:1fr}}
        .t-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;position:relative}
        .t-stars{color:#FFD700;font-size:13px;margin-bottom:12px;letter-spacing:2px}
        .t-quote{font-size:14px;line-height:1.8;color:#3D2B1F;margin-bottom:18px;font-style:italic}
        .t-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#8B1A1A,#C0570A);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:16px;margin-right:12px;flex-shrink:0}
        .t-name{font-size:13px;font-weight:700;color:#8B1A1A}
        .t-loc{font-size:11px;color:#A89B8C;margin-top:2px}
        .cta-final{text-align:center;padding:80px 24px;background:linear-gradient(180deg,#fff 0%,#FFF5F0 100%)}
        .footer{background:#1A0A00;color:rgba(255,255,255,0.6);padding:48px 24px;text-align:center}
        .footer p{font-size:13px;line-height:1.8}
        .footer a{color:rgba(255,255,255,0.5);text-decoration:none;margin:0 10px;font-size:13px}
        .footer a:hover{color:#FFD700}
        .footer hr{border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0}
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <a href="/" className="nav-logo"><img src="/dd-logo.png" alt="DivyaDarshanam" /></a>
          <div className="nav-links">
            <a href="/explore">Explore Temples</a>
            <a href="/plan">Plan Yatra</a>
            <a href="/manifest">Manifest</a>
            <a href="/auth/signin">Sign In</a>
            <a href="/auth/signup" className="nav-cta">Start Free →</a>
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge"><span className="live-dot" /> 46 Temples Streaming Live Now</div>
          <h1>Every Sacred Temple.<br /><em>One Divine Companion.</em></h1>
          <div className="hero-hindi">सनातन संस्कृति, अनंत आस्था — एक यात्रा, अनेक अनुभव</div>
          <p className="hero-sub">India has over 2 million temples. Plan your pilgrimage with AI, watch live darshan, write your Sankalp — all free, forever.</p>
          <div className="hero-ctas">
            <a href="/auth/signup" className="cta-main">Begin Your Yatra — Free →</a>
            <a href="/manifest" className="cta-gold">🙏 Write Your Sankalp</a>
            <a href="/explore?tab=darshan" className="cta-white">Watch Live Darshan</a>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stats-inner">
          {[{n:'422',l:'Sacred Temples'},{n:'46',l:'Live Streams'},{n:'18',l:'States Covered'},{n:'₹0',l:'Free Forever'}].map(s => (
            <div key={s.l}><div className="stat-n">{s.n}</div><div className="stat-l">{s.l}</div></div>
          ))}
        </div>
      </div>

      <div style={{textAlign:'center',padding:'64px 24px 0'}}>
        <div className="section-label">Explore Sacred India</div>
        <h2 className="section-title">Pilgrimage Destinations</h2>
        <p style={{fontSize:'1rem',color:'#6B5B4E',maxWidth:500,margin:'0 auto'}}>From the Himalayas to Kanyakumari — discover India’s most sacred temples</p>
      </div>
      <div className="temples">
        <div className="temple-grid">
          {TEMPLE_CARDS.map(f => (
            <a key={f.title} href={f.link} className="temple-card">
              <div className="temple-img" style={{backgroundImage:`url('${f.img}')`}}>
                <div className="temple-img-overlay" />
              </div>
              <div className="temple-card-body">
                <div className="temple-card-title">{f.title}</div>
                <p className="temple-card-desc">{f.desc}</p>
                <div className="temple-card-link">Explore →</div>
              </div>
            </a>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:40}}>
          <a href="/explore" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 32px',borderRadius:100,border:'2px solid #8B1A1A',color:'#8B1A1A',textDecoration:'none',fontWeight:700,fontSize:15}}>
            View All 422 Temples →
          </a>
        </div>
      </div>

      <div className="sankalp">
        <div className="sankalp-inner">
          <div style={{fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'rgba(255,215,0,0.6)',marginBottom:12}}>Sacred Intention</div>
          <h2>Write Your Sankalp.<br />Trust the Divine.</h2>
          <p>In Indian tradition, a Sankalp is a sacred vow made to a deity. Write your deepest wish, dedicate it to the right god, and commit to a gratitude yatra when it manifests.</p>
          <a href="/manifest" className="sankalp-cta">🙏 Write Your Sankalp Now</a>
        </div>
      </div>

      <div className="features-strip">
        <div style={{textAlign:'center',marginBottom:8,maxWidth:1100,margin:'0 auto 8px'}}>
          <div className="section-label">Everything You Need</div>
          <h2 className="section-title">Built for Pilgrims, Not Tourists</h2>
        </div>
        <div className="feat-grid">
          {FEATURES.map(f => (
            <div key={f.n} className="feat-card">
              <div className="feat-num">{f.n}</div>
              <div className="feat-title">{f.title}</div>
              <p className="feat-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="testi">
        <div style={{textAlign:'center'}}>
          <div className="section-label">Pilgrim Stories</div>
          <h2 className="section-title">Stories From Fellow Pilgrims</h2>
        </div>
        <div className="t-grid">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="t-card">
              <div className="t-stars">★★★★★</div>
              <p className="t-quote">{t.quote}</p>
              <div style={{display:'flex',alignItems:'center'}}>
                <div className="t-avatar">{t.i}</div>
                <div><div className="t-name">{t.name}</div><div className="t-loc">{t.loc}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-final">
        <div className="section-label">Join Thousands of Pilgrims</div>
        <h2 className="section-title">Begin Your Sacred Journey Today</h2>
        <p style={{fontSize:'1rem',color:'#6B5B4E',marginBottom:32,maxWidth:480,margin:'0 auto 32px'}}>Free forever. No credit card. No ads. Write your Sankalp, plan your yatra — all in one place.</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/auth/signup" style={{background:'#8B1A1A',color:'white',padding:'15px 32px',borderRadius:100,fontSize:15,fontWeight:700,textDecoration:'none'}}>Create Free Account →</a>
          <a href="/explore" style={{padding:'15px 28px',borderRadius:100,border:'2px solid #8B1A1A',color:'#8B1A1A',fontSize:15,fontWeight:600,textDecoration:'none'}}>Explore Temples</a>
        </div>
      </div>

      <footer className="footer">
        <img src="/dd-logo.png" alt="DivyaDarshanam" style={{height:60,width:'auto',margin:'0 auto 16px',display:'block',filter:'brightness(0) invert(1)',opacity:0.8}} />
        <p style={{fontWeight:600,color:'rgba(255,255,255,0.8)',fontSize:16,marginBottom:4}}>DivyaDarshanam</p>
        <p>© 2026 DivyaDarshanam · Built with 🙏 for pilgrims across India</p>
        <hr />
        <p style={{fontSize:12,marginBottom:10,letterSpacing:'.06em',textTransform:'uppercase',fontWeight:600}}>Conceptualized & Developed by</p>
        <img src="/dynaimers-logo.jpg" alt="Dynaimers Consulting" style={{height:32,width:'auto',margin:'0 auto 16px',display:'block'}} />
        <p><a href="/explore">Explore</a><a href="/manifest">Manifest</a><a href="/plan">Plan Yatra</a><a href="/auth/signin">Sign In</a></p>
      </footer>
    </>
  )
}
