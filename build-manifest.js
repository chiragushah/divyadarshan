// build-manifest.js
const fs = require('fs')

// ── 1. Sankalp Model ──────────────────────────────────────────────────────────
fs.writeFileSync('models/Sankalp.ts', `import { Schema, model, models, Document, Types } from 'mongoose'

export interface ISankalp extends Document {
  user_id?: Types.ObjectId
  user_email?: string
  user_name?: string
  intention: string
  deity: string
  category: string
  timeline: string
  temple_slug?: string
  temple_name?: string
  gratitude_yatra: boolean
  privacy: 'private' | 'anonymous' | 'public'
  status: 'active' | 'fulfilled' | 'released'
  fulfilled_note?: string
  fulfilled_at?: Date
  createdAt: Date
}

const SankalpSchema = new Schema<ISankalp>({
  user_id:        { type: Schema.Types.ObjectId, ref: 'User' },
  user_email:     { type: String, default: '' },
  user_name:      { type: String, default: 'Anonymous Pilgrim' },
  intention:      { type: String, required: true },
  deity:          { type: String, required: true },
  category:       { type: String, default: '' },
  timeline:       { type: String, default: '' },
  temple_slug:    { type: String, default: '' },
  temple_name:    { type: String, default: '' },
  gratitude_yatra:{ type: Boolean, default: false },
  privacy:        { type: String, enum: ['private','anonymous','public'], default: 'private' },
  status:         { type: String, enum: ['active','fulfilled','released'], default: 'active' },
  fulfilled_note: { type: String, default: '' },
  fulfilled_at:   { type: Date },
}, { timestamps: true })

export const Sankalp = models.Sankalp || model<ISankalp>('Sankalp', SankalpSchema)
`)
console.log('OK models/Sankalp.ts')

// ── 2. API Route ──────────────────────────────────────────────────────────────
fs.mkdirSync('app/api/sankalp', { recursive: true })
fs.writeFileSync('app/api/sankalp/route.ts', `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { Sankalp } from '@/models/Sankalp'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    if (!body.intention || !body.deity) {
      return NextResponse.json({ error: 'Intention and deity are required' }, { status: 400 })
    }
    await connectDB()
    const sankalp = await Sankalp.create({
      ...body,
      user_id: session?.user?.id,
      user_email: session?.user?.email || '',
      user_name: session?.user?.name || 'Anonymous Pilgrim',
    })
    return NextResponse.json({ success: true, id: sankalp._id })
  } catch(e) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const session = await getServerSession(authOptions)

  if (type === 'mine' && session?.user?.email) {
    const sankalpas = await Sankalp.find({ user_email: session.user.email }).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ sankalpas })
  }

  if (type === 'temple') {
    const slug = searchParams.get('slug')
    const sankalpas = await Sankalp.find({ temple_slug: slug, privacy: { $in: ['anonymous','public'] }, status: 'active' }).sort({ createdAt: -1 }).limit(20).lean()
    return NextResponse.json({ sankalpas: sankalpas.map((s: any) => ({ ...s, user_name: s.privacy === 'anonymous' ? 'A Pilgrim' : s.user_name, user_email: '' })) })
  }

  // Public wall
  const sankalpas = await Sankalp.find({ privacy: { $in: ['anonymous','public'] }, status: 'active' }).sort({ createdAt: -1 }).limit(30).lean()
  return NextResponse.json({ sankalpas: sankalpas.map((s: any) => ({ ...s, user_name: s.privacy === 'anonymous' ? 'A Pilgrim' : s.user_name, user_email: '' })) })
}

export async function PATCH(req: NextRequest) {
  const { id, status, fulfilled_note } = await req.json()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  await connectDB()
  await Sankalp.updateOne(
    { _id: id, user_email: session.user.email },
    { status, fulfilled_note, ...(status === 'fulfilled' ? { fulfilled_at: new Date() } : {}) }
  )
  return NextResponse.json({ success: true })
}
`)
console.log('OK app/api/sankalp/route.ts')

// ── 3. Manifest landing page ──────────────────────────────────────────────────
fs.mkdirSync('app/(app)/manifest', { recursive: true })
fs.writeFileSync('app/(app)/manifest/page.tsx', `import type { Metadata } from 'next'
import ManifestLanding from './ManifestLanding'

export const metadata: Metadata = {
  title: 'Manifest — Sacred Sankalp | DivyaDarshan',
  description: 'Write your sacred intention. Dedicated to your deity. Guided by ancient Sankalp tradition. Deity shlokas, Navagraha mantras and a private intention journal.',
}

export default function Page() {
  return <ManifestLanding />
}
`)
console.log('OK app/(app)/manifest/page.tsx')

// ── 4. Copy ManifestLanding component ────────────────────────────────────────
fs.copyFileSync('ManifestLanding.tsx', 'app/(app)/manifest/ManifestLanding.tsx')
console.log('OK app/(app)/manifest/ManifestLanding.tsx')

// ── 5. Write Sankalp page ─────────────────────────────────────────────────────
fs.mkdirSync('app/(app)/manifest/write', { recursive: true })
fs.writeFileSync('app/(app)/manifest/write/page.tsx', `'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = ['Health & Healing','Marriage & Relationships','Career & Business','Children & Family','Education & Exams','Home & Property','Financial Freedom','Peace & Wellbeing','Spiritual Growth','Gratitude — Already Fulfilled','Other']
const DEITIES_LIST = ['Ganesha','Lakshmi','Durga','Shiva','Krishna','Saraswati','Hanuman','Parvati','Kali','Surya','Navagraha Shanti','Other']
const TIMELINES = ['By this month','Within 3 months','Within 6 months','By end of this year','Within 2 years','In divine time','No specific timeline']

export default function WriteSankalpPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    intention: '',
    deity: '',
    category: '',
    timeline: '',
    temple_name: '',
    temple_slug: '',
    gratitude_yatra: false,
    privacy: 'private',
  })
  const set = (k: string, v: any) => setForm(f => ({...f, [k]: v}))

  const submit = async () => {
    if (!form.intention || !form.deity) { setError('Please write your intention and choose a deity'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/sankalp', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setSuccess(true)
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  const inp: React.CSSProperties = { width:'100%', padding:'11px 14px', borderRadius:10, border:'1.5px solid #E8E0D4', fontSize:14, outline:'none', color:'#1A0A00', fontFamily:'inherit', marginBottom:12 }
  const lbl: React.CSSProperties = { fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#A89B8C', display:'block', marginBottom:5 }

  if (success) return (
    <div style={{ maxWidth:500, margin:'80px auto', padding:24, textAlign:'center', fontFamily:"'Inter',sans-serif" }}>
      <div style={{ fontSize:72, marginBottom:20 }}>🙏</div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, color:'#8B1A1A', marginBottom:12 }}>Sankalp Accepted</h1>
      <p style={{ color:'#6B5B4E', lineHeight:1.8, marginBottom:8 }}>Your sacred intention has been written. Keep faith, keep acting, keep believing.</p>
      <p style={{ color:'#6B5B4E', lineHeight:1.8, marginBottom:24, fontStyle:'italic' }}>"The universe conspires to help one who has made a sincere Sankalp with pure heart."</p>
      <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
        <Link href="/manifest/my-sankalpas" style={{ background:'#8B1A1A', color:'white', borderRadius:12, padding:'12px 24px', fontWeight:700, textDecoration:'none', fontSize:14 }}>View My Sankalpas</Link>
        <Link href="/plan" style={{ background:'#FFF0F0', color:'#8B1A1A', border:'1.5px solid #8B1A1A', borderRadius:12, padding:'12px 24px', fontWeight:700, textDecoration:'none', fontSize:14 }}>Plan My Gratitude Yatra</Link>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth:600, margin:'0 auto', padding:'40px 20px', fontFamily:"'Inter',sans-serif" }}>
      <Link href="/manifest" style={{ fontSize:13, color:'#C0570A', textDecoration:'none', display:'block', marginBottom:24 }}>← Back to Manifest</Link>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, color:'#8B1A1A', marginBottom:6 }}>Write Your Sankalp</h1>
      <p style={{ color:'#A89B8C', fontSize:14, marginBottom:28 }}>Your intentions are sacred. Private by default. Share only when you choose.</p>

      {error && <div style={{ background:'#FEE2E2', border:'1px solid #FECACA', borderRadius:10, padding:12, color:'#991B1B', fontSize:13, marginBottom:16 }}>{error}</div>}

      <div style={{ background:'white', border:'1.5px solid #E8E0D4', borderRadius:16, padding:28 }}>
        {/* Intention */}
        <div style={{ marginBottom:20 }}>
          <label style={lbl}>Your Sacred Intention *</label>
          <textarea value={form.intention} onChange={e => set('intention', e.target.value)} rows={4}
            placeholder="Be specific and honest. e.g. 'I seek good health for my mother who is suffering from...' or 'I want my business to reach Rs.50 lakh by Diwali 2026...'"
            style={{ ...inp, resize:'none', lineHeight:1.7 }} />
          <p style={{ fontSize:11, color:'#A89B8C', marginTop:-8 }}>Be specific. The universe and you both respond to clarity.</p>
        </div>

        {/* Category */}
        <div style={{ marginBottom:20 }}>
          <label style={lbl}>Category</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {CATEGORIES.map(c => (
              <button key={c} type="button" onClick={() => set('category', c)} style={{
                padding:'7px 14px', borderRadius:100, fontSize:12, fontWeight:600, cursor:'pointer', border:'1.5px solid',
                borderColor: form.category === c ? '#8B1A1A' : '#E8E0D4',
                background: form.category === c ? '#FFF0F0' : 'white',
                color: form.category === c ? '#8B1A1A' : '#6B5B4E',
              }}>{c}</button>
            ))}
          </div>
        </div>

        {/* Deity */}
        <div style={{ marginBottom:20 }}>
          <label style={lbl}>Dedicate to Deity *</label>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {DEITIES_LIST.map(d => (
              <button key={d} type="button" onClick={() => set('deity', d)} style={{
                padding:'7px 14px', borderRadius:100, fontSize:12, fontWeight:600, cursor:'pointer', border:'1.5px solid',
                borderColor: form.deity === d ? '#8B1A1A' : '#E8E0D4',
                background: form.deity === d ? '#FFF0F0' : 'white',
                color: form.deity === d ? '#8B1A1A' : '#6B5B4E',
              }}>{d}</button>
            ))}
          </div>
          <p style={{ fontSize:11, color:'#A89B8C', marginTop:8 }}>Not sure which deity? Visit the <Link href="/manifest" style={{ color:'#C0570A' }}>Deity Guide</Link></p>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom:20 }}>
          <label style={lbl}>Timeline</label>
          <select value={form.timeline} onChange={e => set('timeline', e.target.value)} style={{ ...inp as any, marginBottom:0, cursor:'pointer' }}>
            <option value="">Select a timeline...</option>
            {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Gratitude Yatra */}
        <div style={{ background:'#FFF8F0', border:'1px solid #FFD4B0', borderRadius:12, padding:16, marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
            <input type="checkbox" checked={form.gratitude_yatra} onChange={e => set('gratitude_yatra', e.target.checked)} style={{ width:18, height:18, accentColor:'#8B1A1A', marginTop:2, cursor:'pointer', flexShrink:0 }} />
            <div>
              <div style={{ fontWeight:600, fontSize:14, color:'#8B1A1A', marginBottom:4 }}>I will go on a Gratitude Yatra when this manifests</div>
              <div style={{ fontSize:13, color:'#6B5B4E', lineHeight:1.6 }}>Make a commitment to visit the temple in person when your Sankalp is fulfilled. This transforms a wish into a sacred vow.</div>
            </div>
          </div>
        </div>

        {/* Privacy */}
        <div style={{ marginBottom:24 }}>
          <label style={lbl}>Privacy</label>
          <div style={{ display:'flex', gap:10 }}>
            {[
              { v:'private', label:'🔒 Private', desc:'Only you can see this' },
              { v:'anonymous', label:'👥 Anonymous', desc:'Shown without your name' },
              { v:'public', label:'🌍 Public', desc:'Shown with your name' },
            ].map(p => (
              <button key={p.v} type="button" onClick={() => set('privacy', p.v)} style={{
                flex:1, padding:'10px 8px', borderRadius:10, cursor:'pointer', border:'1.5px solid', textAlign:'center',
                borderColor: form.privacy === p.v ? '#8B1A1A' : '#E8E0D4',
                background: form.privacy === p.v ? '#FFF0F0' : 'white',
              }}>
                <div style={{ fontWeight:700, fontSize:13, color: form.privacy === p.v ? '#8B1A1A' : '#1A0A00' }}>{p.label}</div>
                <div style={{ fontSize:11, color:'#A89B8C', marginTop:2 }}>{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={submit} disabled={loading || !form.intention || !form.deity} style={{
          width:'100%', padding:'15px 0', borderRadius:12, border:'none',
          background: !form.intention || !form.deity ? '#ccc' : 'linear-gradient(135deg,#8B1A1A,#C0570A)',
          color:'white', fontWeight:700, fontSize:16, cursor: !form.intention || !form.deity ? 'not-allowed' : 'pointer', fontFamily:'inherit',
        }}>
          {loading ? 'Submitting...' : '🙏 Submit My Sankalp'}
        </button>
        <p style={{ textAlign:'center', fontSize:11, color:'#A89B8C', marginTop:10 }}>
          By submitting you acknowledge our <Link href="/manifest?tab=disclaimer" style={{ color:'#C0570A' }}>disclaimer</Link>. Your intention is private by default.
        </p>
      </div>
    </div>
  )
}
`)
console.log('OK app/(app)/manifest/write/page.tsx')

// ── 6. My Sankalpas page ──────────────────────────────────────────────────────
fs.mkdirSync('app/(app)/manifest/my-sankalpas', { recursive: true })
fs.writeFileSync('app/(app)/manifest/my-sankalpas/page.tsx', `'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const STATUS_COLORS: Record<string,string> = { active:'#166534', fulfilled:'#1E40AF', released:'#6B5B4E' }
const STATUS_BG: Record<string,string> = { active:'#DCFCE7', fulfilled:'#DBEAFE', released:'#F8F4EE' }

export default function MySankalpasPage() {
  const { data: session } = useSession()
  const [sankalpas, setSankalpas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [fulfilling, setFulfilling] = useState<string|null>(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    fetch('/api/sankalp?type=mine')
      .then(r => r.json())
      .then(d => { setSankalpas(d.sankalpas || []); setLoading(false) })
  }, [])

  const markFulfilled = async (id: string) => {
    await fetch('/api/sankalp', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, status:'fulfilled', fulfilled_note: note }) })
    setSankalpas(s => s.map(x => x._id === id ? {...x, status:'fulfilled', fulfilled_note: note} : x))
    setFulfilling(null); setNote('')
  }

  if (!session) return (
    <div style={{ maxWidth:500, margin:'80px auto', textAlign:'center', padding:24 }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🙏</div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", color:'#8B1A1A', marginBottom:12 }}>Sign in to view your Sankalpas</h2>
      <Link href="/auth/signin" style={{ background:'#8B1A1A', color:'white', borderRadius:12, padding:'12px 28px', textDecoration:'none', fontWeight:700 }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'40px 20px', fontFamily:"'Inter',sans-serif" }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32 }}>
        <div>
          <Link href="/manifest" style={{ fontSize:13, color:'#C0570A', textDecoration:'none' }}>← Manifest</Link>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:'#8B1A1A', margin:'8px 0 4px' }}>My Sankalpas</h1>
          <p style={{ color:'#A89B8C', fontSize:13 }}>Your sacred intentions and their journey</p>
        </div>
        <Link href="/manifest/write" style={{ background:'#8B1A1A', color:'white', borderRadius:12, padding:'10px 20px', textDecoration:'none', fontWeight:700, fontSize:14 }}>+ New Sankalp</Link>
      </div>

      {loading ? <div style={{ textAlign:'center', padding:48, color:'#A89B8C' }}>Loading your sankalpas...</div> :
       sankalpas.length === 0 ? (
        <div style={{ textAlign:'center', padding:48 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🛕</div>
          <p style={{ color:'#6B5B4E', marginBottom:20 }}>No sankalpas yet. Write your first sacred intention.</p>
          <Link href="/manifest/write" style={{ background:'#8B1A1A', color:'white', borderRadius:12, padding:'12px 28px', textDecoration:'none', fontWeight:700 }}>Write My Sankalp</Link>
        </div>
       ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {sankalpas.map((s: any) => (
            <div key={s._id} style={{ background:'white', border:'1.5px solid #E8E0D4', borderRadius:16, padding:24 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:8, marginBottom:8, flexWrap:'wrap' }}>
                    <span style={{ padding:'3px 10px', borderRadius:100, fontSize:11, fontWeight:700, background: STATUS_BG[s.status], color: STATUS_COLORS[s.status] }}>{s.status}</span>
                    <span style={{ padding:'3px 10px', borderRadius:100, fontSize:11, background:'#FFF0F0', color:'#8B1A1A', fontWeight:600 }}>{s.deity}</span>
                    {s.category && <span style={{ padding:'3px 10px', borderRadius:100, fontSize:11, background:'#F8F4EE', color:'#6B5B4E' }}>{s.category}</span>}
                  </div>
                  <p style={{ fontSize:15, color:'#1A0A00', lineHeight:1.7, margin:'0 0 8px' }}>{s.intention}</p>
                  {s.timeline && <div style={{ fontSize:12, color:'#A89B8C' }}>Timeline: {s.timeline}</div>}
                  {s.gratitude_yatra && <div style={{ fontSize:12, color:'#C0570A', marginTop:4 }}>🛕 Gratitude Yatra pledged</div>}
                  {s.fulfilled_note && <div style={{ fontSize:13, color:'#1E40AF', marginTop:8, fontStyle:'italic' }}>"{s.fulfilled_note}"</div>}
                </div>
                <div style={{ fontSize:11, color:'#A89B8C', flexShrink:0, textAlign:'right' }}>
                  {new Date(s.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                </div>
              </div>

              {s.status === 'active' && (
                fulfilling === s._id ? (
                  <div style={{ marginTop:12, padding:16, background:'#EFF6FF', borderRadius:12 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#1E40AF', marginBottom:8 }}>How did your Sankalp manifest? (optional)</div>
                    <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Share your experience of fulfilment..." style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid #BFDBFE', fontSize:13, resize:'none', marginBottom:10, outline:'none' }} />
                    <div style={{ display:'flex', gap:10 }}>
                      <button onClick={() => markFulfilled(s._id)} style={{ background:'#1E40AF', color:'white', border:'none', borderRadius:8, padding:'8px 20px', fontWeight:700, fontSize:13, cursor:'pointer' }}>Mark Fulfilled</button>
                      <button onClick={() => setFulfilling(null)} style={{ background:'none', border:'1px solid #BFDBFE', borderRadius:8, padding:'8px 16px', fontSize:13, cursor:'pointer', color:'#1E40AF' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display:'flex', gap:10, marginTop:12 }}>
                    <button onClick={() => setFulfilling(s._id)} style={{ background:'#DCFCE7', color:'#166534', border:'1px solid #86EFAC', borderRadius:8, padding:'8px 16px', fontSize:13, fontWeight:600, cursor:'pointer' }}>Manifested</button>
                    {s.gratitude_yatra && <Link href={'/plan?destination=' + (s.temple_name || s.deity)} style={{ background:'#FFF0F0', color:'#8B1A1A', border:'1px solid #FECACA', borderRadius:8, padding:'8px 16px', fontSize:13, fontWeight:600, textDecoration:'none' }}>Plan Gratitude Yatra</Link>}
                  </div>
                )
              )}

              {s.status === 'fulfilled' && s.gratitude_yatra && (
                <Link href={'/plan?destination=' + (s.temple_name || s.deity)} style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:12, background:'#8B1A1A', color:'white', border:'none', borderRadius:8, padding:'10px 18px', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                  🛕 Plan Your Gratitude Yatra Now
                </Link>
              )}
            </div>
          ))}
        </div>
       )}
    </div>
  )
}
`)
console.log('OK app/(app)/manifest/my-sankalpas/page.tsx')

// ── 7. Add to Navbar ──────────────────────────────────────────────────────────
let navbar = fs.readFileSync('components/nav/Navbar.tsx', 'utf8')
if (!navbar.includes('/manifest')) {
  navbar = navbar.replace(
    '{ href: "/recommend-temple", label: "Recommend a Temple"',
    '{ href: "/manifest", label: "Manifest — Sankalp", desc: "Sacred intentions with deity guidance" },\n      { href: "/recommend-temple", label: "Recommend a Temple"'
  )
  fs.writeFileSync('components/nav/Navbar.tsx', navbar, 'utf8')
  console.log('OK Navbar: Manifest link added')
} else {
  console.log('SKIP Navbar already has Manifest')
}

// ── 8. Clean up temp file ─────────────────────────────────────────────────────
if (fs.existsSync('ManifestLanding.tsx')) {
  fs.unlinkSync('ManifestLanding.tsx')
  console.log('OK Cleaned up temp file')
}

console.log('\nAll done! Now push:')
console.log('git add .')
console.log('git commit -m "feat: Manifest Sankalp module with deity guide, navagraha shanti and YouTube links"')
console.log('git push origin main')
