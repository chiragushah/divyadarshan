const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'
const write = (rel, content) => {
  const full = path.join(P, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content, 'utf8')
  console.log('  wrote:', rel)
}

// ── 1. Fix footer in homepage ─────────────────────────────────
console.log('[1/7] Updating footer in app/page.tsx...')
let page = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')

// Replace old dark footer CSS + HTML
page = page.replace(
  `.footer{background:#1A0A00;color:rgba(255,255,255,0.6);padding:48px 24px;text-align:center}
        .footer p{font-size:13px;line-height:1.8}
        .footer a{color:rgba(255,255,255,0.5);text-decoration:none;margin:0 10px;font-size:13px}
        .footer a:hover{color:#FFD700}
        .footer hr{border:none;border-top:1px solid rgba(255,255,255,0.08);margin:24px 0}`,
  `.footer{background:#fff;border-top:2px solid #C0570A;padding:48px 24px 32px;text-align:center}
        .footer p{font-size:13px;line-height:1.8;color:#6B5B4E}
        .footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:20px 0}
        .footer-links a{padding:8px 18px;border-radius:100px;border:1.5px solid #C0570A;color:#8B1A1A;text-decoration:none;font-size:13px;font-weight:600;transition:all .15s}
        .footer-links a:hover{background:#C0570A;color:white}
        .footer-nav a{color:#A89B8C;text-decoration:none;margin:0 10px;font-size:13px}
        .footer-nav a:hover{color:#8B1A1A}
        .footer hr{border:none;border-top:1px solid #F0EDE8;margin:24px 0}`
)

// Replace old dark footer HTML
const oldFooter = `      <footer className="footer">
        <img src="/dd-logo.png" alt="DivyaDarshanam" style={{height:60,width:'auto',margin:'0 auto 16px',display:'block',filter:'none'}} />
        <p style={{fontWeight:600,color:'rgba(255,255,255,0.8)',fontSize:16,marginBottom:4}}>DivyaDarshanam</p>
        <p>\\u00A9 2026 DivyaDarshanam \\u00B7 Built with \\uD83D\\uDE4F for pilgrims across India</p>
        <hr />
        <p style={{fontSize:12,marginBottom:10,letterSpacing:'.06em',textTransform:'uppercase',fontWeight:600}}>Conceptualized & Developed by</p>
        <img src="/dynaimers-logo.jpg" alt="Dynaimers Consulting" style={{height:32,width:'auto',margin:'0 auto 16px',display:'block'}} />
        <p><a href="/explore">Explore</a><a href="/manifest">Manifest</a><a href="/plan">Plan Yatra</a><a href="/auth/signin">Sign In</a></p>
      </footer>`

const newFooter = `      <footer className="footer">
        <img src="/dd-logo.png" alt="DivyaDarshanam" style={{height:64,width:'auto',margin:'0 auto 12px',display:'block'}} />
        <p style={{fontWeight:700,color:'#8B1A1A',fontSize:16,marginBottom:4}}>DivyaDarshanam</p>
        <p>\u00A9 2026 DivyaDarshanam \u00B7 Built with \uD83D\uDE4F for pilgrims across India</p>

        {/* Footer links with saffron outline */}
        <div className="footer-links" style={{marginTop:24}}>
          <a href="/about">About Us</a>
          <a href="/team">Our Team</a>
          <a href="/stories">Pilgrim Stories</a>
          <a href="/contact">Contact Us</a>
          <a href="/volunteer">Be a Volunteer</a>
        </div>

        <hr />
        <p style={{fontSize:12,marginBottom:10,letterSpacing:'.06em',textTransform:'uppercase',fontWeight:600,color:'#A89B8C'}}>Conceptualized & Developed by</p>
        <a href="https://dynaimers.com" target="_blank" rel="noopener noreferrer" style={{display:'inline-block',marginBottom:16}}>
          <img src="/dynaimers-logo.jpg" alt="Dynaimers Consulting" style={{height:32,width:'auto',display:'block'}} />
        </a>
        <div className="footer-nav">
          <a href="/explore">Explore</a>
          <a href="/manifest">Manifest</a>
          <a href="/plan">Plan Yatra</a>
          <a href="/auth/signin">Sign In</a>
        </div>
      </footer>`

page = page.replace(oldFooter, newFooter)
fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')
console.log('  OK')

// ── Helper to create a simple placeholder page ────────────────
const makePage = (title, desc, emoji) => `import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${title} | DivyaDarshanam',
}

export default function Page() {
  return (
    <div style={{minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px 24px',textAlign:'center',background:'#fff'}}>
      <div style={{fontSize:56,marginBottom:20}}>${emoji}</div>
      <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'2.2rem',fontWeight:700,color:'#8B1A1A',marginBottom:12}}>${title}</h1>
      <p style={{fontSize:'1.05rem',color:'#6B5B4E',maxWidth:480,lineHeight:1.8,marginBottom:32}}>${desc}</p>
      <div style={{display:'inline-block',padding:'14px 28px',borderRadius:100,border:'2px solid #C0570A',color:'#C0570A',fontWeight:700,fontSize:14}}>
        Coming Soon \u2014 We are working on this page
      </div>
      <Link href="/" style={{display:'block',marginTop:24,color:'#A89B8C',fontSize:14,textDecoration:'none'}}>
        \u2190 Back to Home
      </Link>
    </div>
  )
}
`

// ── 2. About Us page ──────────────────────────────────────────
console.log('[2/7] Creating /about page...')
write('app/about/page.tsx', makePage(
  'About DivyaDarshanam',
  'DivyaDarshanam is India\'s most complete temple discovery and pilgrimage planning platform. We are building the digital companion every pilgrim deserves.',
  '\uD83D\uDED5'
))

// ── 3. Team page ──────────────────────────────────────────────
console.log('[3/7] Creating /team page...')
write('app/team/page.tsx', makePage(
  'Our Team',
  'Meet the passionate team behind DivyaDarshanam \u2014 developers, designers and pilgrims who believe in the power of sacred travel.',
  '\uD83D\uDC65'
))

// ── 4. Stories page ───────────────────────────────────────────
console.log('[4/7] Creating /stories page...')
write('app/stories/page.tsx', makePage(
  'Pilgrim Stories',
  'Real stories from real pilgrims \u2014 journeys of faith, transformation and divine grace shared by the DivyaDarshanam community.',
  '\uD83D\uDCD6'
))

// ── 5. Contact page ───────────────────────────────────────────
console.log('[5/7] Creating /contact page...')
write('app/contact/page.tsx', makePage(
  'Contact Us',
  'Have a question, suggestion or want to partner with us? We would love to hear from you. Reach us at hello@divyadarshanam.in',
  '\u2709\uFE0F'
))

// ── 6. Volunteer page ─────────────────────────────────────────
console.log('[6/7] Creating /volunteer page...')
write('app/volunteer/page.tsx', makePage(
  'Be a Volunteer',
  'Join our mission to document and preserve India\'s sacred heritage. Help verify temple data, translate content and guide fellow pilgrims.',
  '\uD83E\uDD1D'
))

// ── 7. Push ───────────────────────────────────────────────────
console.log('[7/7] Pushing to GitHub...')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "feat: white footer with saffron outline links + 5 new pages"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
