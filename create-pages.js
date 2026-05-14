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

// ── Shared layout style ───────────────────────────────────────
const baseStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:#fff;color:#1A0A00}
  .page{max-width:900px;margin:0 auto;padding:64px 24px}
  .back{display:inline-flex;align-items:center;gap:6px;color:#A89B8C;text-decoration:none;font-size:13px;margin-bottom:32px}
  .back:hover{color:#8B1A1A}
  .label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C0570A;margin-bottom:10px}
  h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#1A0A00;margin-bottom:16px;line-height:1.2}
  .sub{font-size:1.05rem;color:#6B5B4E;line-height:1.8;margin-bottom:40px;max-width:600px}
  .card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;margin-bottom:20px}
  .card:hover{border-color:rgba(192,87,10,0.3);box-shadow:0 4px 20px rgba(192,87,10,.06)}
  .card h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#1A0A00;margin-bottom:8px}
  .card p{font-size:14px;color:#6B5B4E;line-height:1.7}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
  .chip{display:inline-block;padding:5px 14px;border-radius:100px;border:1.5px solid #C0570A;color:#8B1A1A;font-size:12px;font-weight:600;margin:4px}
`

// ── 1. About Us ───────────────────────────────────────────────
console.log('[1/5] Creating /about...')
write('app/about/page.tsx', `import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About Us | DivyaDarshanam' }

export default function AboutPage() {
  return (
    <>
      <style>{\`${baseStyle}\`}</style>
      <div className="page">
        <Link href="/" className="back">\u2190 Back to Home</Link>
        <div className="label">Our Story</div>
        <h1>About DivyaDarshanam</h1>
        <p className="sub">DivyaDarshanam is India\u2019s most complete temple discovery and pilgrimage planning platform \u2014 built by pilgrims, for pilgrims.</p>

        <div className="grid">
          <div className="card">
            <h3>\uD83C\uDFDB\uFE0F Our Mission</h3>
            <p>To make every sacred temple in India accessible, discoverable and plannable for every pilgrim \u2014 regardless of language, age or tech ability.</p>
          </div>
          <div className="card">
            <h3>\uD83D\uDC41\uFE0F Our Vision</h3>
            <p>A world where every Indian can plan, experience and share their spiritual journey with ease \u2014 digitally connected to their roots.</p>
          </div>
          <div className="card">
            <h3>\uD83D\uDE4F Our Values</h3>
            <p>Authentic, accurate, free forever. We serve pilgrims \u2014 not advertisers. Every feature is built around what a real pilgrim needs.</p>
          </div>
          <div className="card">
            <h3>\uD83D\uDED5 What We Built</h3>
            <p>422+ verified temples, AI yatra planner, live darshan streams, Navagraha shanti guide, pilgrimage journal, group yatra tools and savings goals.</p>
          </div>
          <div className="card">
            <h3>\uD83C\uDDF3\uD83C\uDDF3 Made in India</h3>
            <p>Conceived, designed and built in Pune by Dynaimers Consulting \u2014 a team passionate about Indian culture, technology and spirituality.</p>
          </div>
          <div className="card">
            <h3>\u2665\uFE0F Free Forever</h3>
            <p>DivyaDarshanam will always be free for pilgrims. We believe access to sacred knowledge is a right, not a privilege.</p>
          </div>
        </div>

        <div style={{marginTop:48,padding:'32px',background:'linear-gradient(135deg,#FFF5F0,#FDFAF6)',borderRadius:16,border:'1.5px solid #FFD4B8',textAlign:'center'}}>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'1.4rem',fontWeight:700,color:'#8B1A1A',marginBottom:8}}>\u0938\u0928\u093e\u0924\u0928 \u0938\u0902\u0938\u094d\u0915\u0943\u0924\u093f, \u0905\u0928\u0902\u0924 \u0906\u0938\u094d\u0925\u093e</p>
          <p style={{color:'#C0570A',fontWeight:600}}>Sanatan Sanskriti, Anant Aastha</p>
        </div>
      </div>
    </>
  )
}
`)

// ── 2. Team ───────────────────────────────────────────────────
console.log('[2/5] Creating /team...')
write('app/team/page.tsx', `import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Our Team | DivyaDarshanam' }

const TEAM = [
  { name: 'Chirag Shah', role: 'Founder & CEO', desc: 'Visionary behind DivyaDarshanam. Passionate about Indian culture, spirituality and technology.', loc: 'Pune, Maharashtra', initial: 'C' },
  { name: 'Dynaimers Team', role: 'Technology & Design', desc: 'Full-stack development, UI/UX design and platform architecture powering DivyaDarshanam.', loc: 'Pune, Maharashtra', initial: 'D' },
]

export default function TeamPage() {
  return (
    <>
      <style>{\`${baseStyle}
        .team-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;display:flex;align-items:flex-start;gap:20px}
        .avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#8B1A1A,#C0570A);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:22px;flex-shrink:0}
      \`}</style>
      <div className="page">
        <Link href="/" className="back">\u2190 Back to Home</Link>
        <div className="label">The People</div>
        <h1>Our Team</h1>
        <p className="sub">Meet the passionate team behind DivyaDarshanam \u2014 building the digital companion every pilgrim deserves.</p>

        <div style={{display:'flex',flexDirection:'column',gap:16,marginBottom:48}}>
          {TEAM.map(t => (
            <div key={t.name} className="team-card">
              <div className="avatar">{t.initial}</div>
              <div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',fontWeight:700,color:'#1A0A00',marginBottom:4}}>{t.name}</h3>
                <p style={{fontSize:12,fontWeight:700,color:'#C0570A',marginBottom:8,textTransform:'uppercase',letterSpacing:'.08em'}}>{t.role}</p>
                <p style={{fontSize:14,color:'#6B5B4E',lineHeight:1.7,marginBottom:6}}>{t.desc}</p>
                <p style={{fontSize:12,color:'#A89B8C'}}>\uD83D\uDCCD {t.loc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:16,padding:28,textAlign:'center'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',color:'#8B1A1A',marginBottom:8}}>Want to join our mission?</h3>
          <p style={{color:'#6B5B4E',marginBottom:16}}>We are always looking for passionate people who love Indian culture and technology.</p>
          <Link href="/volunteer" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',borderRadius:100,background:'#8B1A1A',color:'white',textDecoration:'none',fontWeight:700,fontSize:14}}>
            Be a Volunteer \u2192
          </Link>
        </div>
      </div>
    </>
  )
}
`)

// ── 3. Stories ────────────────────────────────────────────────
console.log('[3/5] Creating /stories...')
write('app/stories/page.tsx', `import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Pilgrim Stories | DivyaDarshanam' }

const STORIES = [
  { name: 'Ramesh Kulkarni', loc: 'Pune', title: 'My Char Dham Yatra with AI Planning', quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes. It knew which temple opens first in the season. My family had the most organised pilgrimage we have ever done.', deity: 'Vishnu', initial: 'R' },
  { name: 'Sunita Joshi', loc: 'Mumbai', title: 'Sankalp for My Daughter\'s Marriage', quote: 'I wrote my Sankalp for my daughter\'s marriage, dedicated it to Parvati Mata, and kept faith. Eight months later she found the perfect match. Jai Mata Di.', deity: 'Parvati', initial: 'S' },
  { name: 'Vikram Mehta', loc: 'Ahmedabad', title: 'Navagraha Shanti Changed My Life', quote: 'The Navagraha shlokas with YouTube links changed my daily morning routine. I now chant correctly with the right pronunciation every single day.', deity: 'Navagraha', initial: 'V' },
]

export default function StoriesPage() {
  return (
    <>
      <style>{\`${baseStyle}
        .story-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;position:relative;overflow:hidden}
        .story-card::before{content:'"';font-family:'Playfair Display',serif;font-size:100px;color:#FFF5F0;position:absolute;top:0;left:16px;line-height:1;pointer-events:none}
        .avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#8B1A1A,#C0570A);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px;flex-shrink:0}
      \`}</style>
      <div className="page">
        <Link href="/" className="back">\u2190 Back to Home</Link>
        <div className="label">Community</div>
        <h1>Pilgrim Stories</h1>
        <p className="sub">Real journeys, real faith, real transformation. Stories from pilgrims who planned their sacred yatras with DivyaDarshanam.</p>

        <div style={{display:'flex',flexDirection:'column',gap:20,marginBottom:48}}>
          {STORIES.map(s => (
            <div key={s.name} className="story-card">
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',fontWeight:700,color:'#8B1A1A',marginBottom:12,position:'relative'}}>{s.title}</h3>
              <p style={{fontSize:15,color:'#3D2B1F',lineHeight:1.8,fontStyle:'italic',marginBottom:20,position:'relative'}}>{s.quote}</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="avatar">{s.initial}</div>
                <div>
                  <p style={{fontWeight:700,color:'#1A0A00',fontSize:14}}>{s.name}</p>
                  <p style={{fontSize:12,color:'#A89B8C'}}>{s.loc} \u00B7 Devotee of {s.deity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:16,padding:28,textAlign:'center'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',color:'#8B1A1A',marginBottom:8}}>Share Your Story</h3>
          <p style={{color:'#6B5B4E',marginBottom:16}}>Have a pilgrimage story to share? Write to us and inspire thousands of pilgrims.</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',borderRadius:100,background:'#8B1A1A',color:'white',textDecoration:'none',fontWeight:700,fontSize:14}}>
            Share Your Story \u2192
          </Link>
        </div>
      </div>
    </>
  )
}
`)

// ── 4. Contact (with form + email API) ───────────────────────
console.log('[4/5] Creating /contact...')
write('app/contact/page.tsx', `'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#fff;color:#1A0A00}
        .page{max-width:700px;margin:0 auto;padding:64px 24px}
        .back{display:inline-flex;align-items:center;gap:6px;color:#A89B8C;text-decoration:none;font-size:13px;margin-bottom:32px}
        .back:hover{color:#8B1A1A}
        label{display:block;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#6B5B4E;margin-bottom:6px}
        input,textarea{width:100%;padding:12px 16px;border:1.5px solid #F0EDE8;border-radius:10px;font-family:'Inter',sans-serif;font-size:14px;color:#1A0A00;outline:none;transition:border-color .2s;background:#fff}
        input:focus,textarea:focus{border-color:#C0570A}
        textarea{min-height:140px;resize:vertical}
        .btn{width:100%;padding:14px;background:#8B1A1A;color:white;border:none;border-radius:100px;font-family:'Inter',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:all .2s;margin-top:8px}
        .btn:hover{background:#6B1212}
        .btn:disabled{opacity:.6;cursor:not-allowed}
        .field{margin-bottom:20px}
      \`}</style>
      <div className="page">
        <Link href="/" className="back">\u2190 Back to Home</Link>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'#C0570A',marginBottom:10}}>Get In Touch</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,color:'#1A0A00',marginBottom:16}}>Contact Us</h1>
        <p style={{fontSize:'1.05rem',color:'#6B5B4E',lineHeight:1.8,marginBottom:40}}>
          Have a question, suggestion or want to partner with us? We would love to hear from you.
          Write to us at <strong style={{color:'#8B1A1A'}}>chirag@dynaimers.com</strong>
        </p>

        {status === 'sent' ? (
          <div style={{background:'#F0FDF4',border:'1.5px solid rgba(34,197,94,0.3)',borderRadius:16,padding:32,textAlign:'center'}}>
            <div style={{fontSize:40,marginBottom:12}}>\u2705</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.4rem',color:'#166534',marginBottom:8}}>Message Sent!</h3>
            <p style={{color:'#166534'}}>Thank you for reaching out. We will get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div className="field">
                <label>Your Name</label>
                <input required placeholder="Ramesh Kulkarni" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
              </div>
              <div className="field">
                <label>Email Address</label>
                <input required type="email" placeholder="ramesh@example.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
              </div>
            </div>
            <div className="field">
              <label>Subject</label>
              <input required placeholder="How can we help you?" value={form.subject} onChange={e => setForm(f => ({...f, subject: e.target.value}))} />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea required placeholder="Write your message here..." value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
            </div>
            {status === 'error' && (
              <p style={{color:'#DC2626',fontSize:13,marginBottom:12}}>Something went wrong. Please try again or email us directly.</p>
            )}
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending...' : 'Send Message \u2192'}
            </button>
          </form>
        )}

        <div style={{marginTop:48,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:12,padding:20}}>
            <p style={{fontWeight:700,color:'#8B1A1A',marginBottom:4}}>\uD83D\uDCE7 Email</p>
            <p style={{fontSize:14,color:'#6B5B4E'}}>chirag@dynaimers.com</p>
          </div>
          <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:12,padding:20}}>
            <p style={{fontWeight:700,color:'#8B1A1A',marginBottom:4}}>\uD83D\uDCCD Location</p>
            <p style={{fontSize:14,color:'#6B5B4E'}}>Pune, Maharashtra, India</p>
          </div>
        </div>
      </div>
    </>
  )
}
`)

// ── 5. Contact API route ──────────────────────────────────────
console.log('[5/5] Creating /api/contact...')
write('app/api/contact/route.ts', `import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Send via Resend API if available, otherwise log
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: \`Bearer \${RESEND_KEY}\` },
        body: JSON.stringify({
          from: 'DivyaDarshanam <noreply@divyadarshanam.in>',
          to: ['chirag@dynaimers.com'],
          reply_to: email,
          subject: \`[DivyaDarshanam Contact] \${subject}\`,
          html: \`
            <h2>New message from DivyaDarshanam website</h2>
            <p><strong>Name:</strong> \${name}</p>
            <p><strong>Email:</strong> \${email}</p>
            <p><strong>Subject:</strong> \${subject}</p>
            <p><strong>Message:</strong></p>
            <p>\${message.replace(/\\n/g, '<br>')}</p>
          \`,
        }),
      })
    } else {
      // Log to console if no email service configured
      console.log('Contact form submission:', { name, email, subject, message })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
`)

// ── Volunteer page ────────────────────────────────────────────
write('app/volunteer/page.tsx', `import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Be a Volunteer | DivyaDarshanam' }

const ROLES = [
  { title: 'Temple Data Verifier', desc: 'Visit temples and verify timings, facilities and photos. Help thousands of pilgrims plan accurately.', skills: ['Temple knowledge', 'Photography', 'Attention to detail'] },
  { title: 'Content Translator', desc: 'Translate temple descriptions and guides into regional languages \u2014 Hindi, Marathi, Tamil, Telugu and more.', skills: ['Regional language', 'Writing', 'Cultural knowledge'] },
  { title: 'Community Guide', desc: 'Help new pilgrims on the platform, answer questions and share your yatra experiences.', skills: ['Pilgrimage experience', 'Patience', 'Communication'] },
  { title: 'Tech Contributor', desc: 'Help improve the platform with code, design, or testing. Open source contributions welcome.', skills: ['Development', 'Design', 'Testing'] },
]

export default function VolunteerPage() {
  return (
    <>
      <style>{\`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#fff;color:#1A0A00}
        .page{max-width:900px;margin:0 auto;padding:64px 24px}
        .back{display:inline-flex;align-items:center;gap:6px;color:#A89B8C;text-decoration:none;font-size:13px;margin-bottom:32px}
        .back:hover{color:#8B1A1A}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:48px}
        .card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;transition:all .2s}
        .card:hover{border-color:rgba(192,87,10,0.3);transform:translateY(-2px)}
      \`}</style>
      <div className="page">
        <Link href="/" className="back">\u2190 Back to Home</Link>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'#C0570A',marginBottom:10}}>Join Us</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,color:'#1A0A00',marginBottom:16}}>Be a Volunteer</h1>
        <p style={{fontSize:'1.05rem',color:'#6B5B4E',lineHeight:1.8,marginBottom:40,maxWidth:600}}>
          Join our mission to document and preserve India\u2019s sacred heritage. Every contribution \u2014 big or small \u2014 helps thousands of pilgrims.
        </p>

        <div className="grid">
          {[
            {title:'Temple Data Verifier',desc:'Visit temples and verify timings, facilities and photos.',skills:['Temple knowledge','Photography','Attention to detail']},
            {title:'Content Translator',desc:'Translate temple descriptions into regional languages.',skills:['Regional language','Writing','Cultural knowledge']},
            {title:'Community Guide',desc:'Help new pilgrims on the platform and share your yatra experiences.',skills:['Pilgrimage experience','Patience','Communication']},
            {title:'Tech Contributor',desc:'Help improve the platform with code, design or testing.',skills:['Development','Design','Testing']},
          ].map(r => (
            <div key={r.title} className="card">
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',fontWeight:700,color:'#1A0A00',marginBottom:8}}>{r.title}</h3>
              <p style={{fontSize:13,color:'#6B5B4E',lineHeight:1.7,marginBottom:12}}>{r.desc}</p>
              <div>{r.skills.map(s => <span key={s} style={{display:'inline-block',padding:'3px 10px',borderRadius:100,border:'1px solid #FFD4B8',color:'#C0570A',fontSize:11,fontWeight:600,margin:'2px'}}>{s}</span>)}</div>
            </div>
          ))}
        </div>

        <div style={{background:'linear-gradient(135deg,#8B1A1A,#C0570A)',borderRadius:16,padding:40,textAlign:'center',color:'white'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',marginBottom:12}}>Ready to Contribute?</h3>
          <p style={{opacity:.85,marginBottom:24,fontSize:'1rem',lineHeight:1.7}}>Write to us with your area of interest and we will get back to you within 48 hours.</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'14px 32px',borderRadius:100,background:'#FFD700',color:'#1A0A00',textDecoration:'none',fontWeight:800,fontSize:15}}>
            Apply to Volunteer \u2192
          </Link>
        </div>
      </div>
    </>
  )
}
`)

// ── Fix middleware to allow these new pages ───────────────────
let mw = fs.readFileSync(path.join(P, 'middleware.ts'), 'utf8')
if (!mw.includes("'/about'")) {
  mw = mw.replace(
    "  const PUBLIC = [",
    "  // Allow public pages\n  const PUBLIC_PAGES = ['/about', '/team', '/stories', '/contact', '/volunteer']\n  if (PUBLIC_PAGES.includes(pathname)) return NextResponse.next()\n\n  const PUBLIC = ["
  )
  fs.writeFileSync(path.join(P, 'middleware.ts'), mw, 'utf8')
  console.log('  middleware updated')
}

// Push
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "feat: About, Team, Stories, Contact (with form), Volunteer pages"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
