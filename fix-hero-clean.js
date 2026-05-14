const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

let page = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')

// 1. Make hero just the banner image - no overlay text at all
const oldHeroCSS = `.hero{position:relative;min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden}
        .hero-bg{position:absolute;inset:0;background-image:url('/hero-banner.png');background-size:cover;background-position:center top}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.25) 40%,rgba(0,0,0,0.72) 100%)}`

const newHeroCSS = `.hero{width:100%;line-height:0}
        .hero img{width:100%;height:auto;display:block;max-height:92vh;object-fit:cover;object-position:center top}`

page = page.replace(oldHeroCSS, newHeroCSS)

// 2. Replace hero HTML - just the image, no overlay content
const heroStart = page.indexOf('<div className="hero">')
const heroEnd = page.indexOf('</div>', page.indexOf('</div>', page.indexOf('</div>', heroStart) + 1) + 1) + 6

const newHero = `<div className="hero">
        <img src="/hero-banner.png" alt="DivyaDarshanam - Your Journey from Darkness to Divine Light" />
      </div>

      {/* CTA strip below banner */}
      <div style={{background:'#fff',borderBottom:'1px solid #F0EDE8',padding:'32px 24px',textAlign:'center'}}>
        <div style={{marginBottom:16}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:100,padding:'7px 18px',fontSize:12,fontWeight:700,color:'#C0570A',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:20}}>
            <span style={{width:8,height:8,borderRadius:'50%',background:'#22c55e',display:'inline-block',animation:'blink 2s ease infinite'}} />
            46 Temples Streaming Live Now
          </div>
        </div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.4rem,3vw,2rem)',fontWeight:700,color:'#1A0A00',marginBottom:8}}>
          Begin Your Sacred Journey Today
        </h2>
        <p style={{fontSize:'1rem',color:'#6B5B4E',marginBottom:24,maxWidth:540,margin:'0 auto 24px'}}>
          Plan your pilgrimage with AI, watch live darshan, write your Sankalp \u2014 all free, forever.
        </p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <a href="/auth/signup" className="cta-main">Begin Your Yatra \u2014 Free \u2192</a>
          <a href="/manifest" className="cta-gold">\uD83D\uDE4F Write Your Sankalp</a>
          <a href="/explore?tab=darshan" className="cta-white" style={{background:'transparent',color:'#8B1A1A',border:'2px solid #8B1A1A',padding:'15px 28px',borderRadius:100,fontSize:15,fontWeight:600,textDecoration:'none'}}>Watch Live Darshan</a>
        </div>
      </div>`

page = page.slice(0, heroStart) + newHero + page.slice(heroEnd)

// 3. Remove the old badge/hindi/sub CSS that's no longer needed in hero
page = page
  .replace(`.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.3);border-radius:100px;padding:7px 18px;font-size:12px;font-weight:700;color:white;letter-spacing:.08em;margin-bottom:28px;text-transform:uppercase}`, '')
  .replace(`.live-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:blink 2s ease infinite;flex-shrink:0}`, `.live-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:blink 2s ease infinite;display:inline-block}`)
  .replace(`.hero h1{font-family:'Playfair Display',serif;font-size:clamp(2.4rem,6vw,5rem);font-weight:700;line-height:1.1;color:white;margin-bottom:8px;text-shadow:0 2px 20px rgba(0,0,0,0.4)}`, '')
  .replace(`.hero h1 em{font-style:italic;color:#FFD700}`, '')
  .replace(`.hero-hindi{font-size:clamp(1rem,2.5vw,1.4rem);color:rgba(255,255,255,0.85);margin-bottom:8px}`, '')
  .replace(`.hero-sub{font-size:clamp(.9rem,1.8vw,1.1rem);line-height:1.8;color:rgba(255,255,255,0.8);max-width:640px;margin:0 auto 40px}`, '')
  .replace(`.hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}`, `.hero-ctas{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}`)

fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')
console.log('OK: Hero cleaned up')

process.chdir(P)
execSync('git add "app/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: hero banner full image, CTAs moved below"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
