// build-recommend-temple.js
const fs = require('fs')

// ── 1. MongoDB Model ──────────────────────────────────────────────────────────
fs.writeFileSync('models/TempleRecommendation.ts', `import { Schema, model, models, Document } from 'mongoose'

export interface ITempleRecommendation extends Document {
  // Temple details
  name: string
  state: string
  city: string
  deity: string
  type: string
  description: string
  address: string
  timing: string
  best_time: string
  dress_code: string
  festivals: string
  has_live: boolean
  live_url: string
  website: string
  lat: string
  lng: string
  image_url: string
  // Recommender details
  recommender_name: string
  recommender_email: string
  recommender_phone: string
  recommender_note: string
  is_member: boolean
  // Admin fields
  status: 'pending' | 'approved' | 'rejected' | 'added'
  admin_note: string
  createdAt: Date
}

const TempleRecommendationSchema = new Schema<ITempleRecommendation>({
  name:               { type: String, required: true },
  state:              { type: String, required: true },
  city:               { type: String, required: true },
  deity:              { type: String, required: true },
  type:               { type: String, default: '' },
  description:        { type: String, default: '' },
  address:            { type: String, default: '' },
  timing:             { type: String, default: '' },
  best_time:          { type: String, default: '' },
  dress_code:         { type: String, default: '' },
  festivals:          { type: String, default: '' },
  has_live:           { type: Boolean, default: false },
  live_url:           { type: String, default: '' },
  website:            { type: String, default: '' },
  lat:                { type: String, default: '' },
  lng:                { type: String, default: '' },
  image_url:          { type: String, default: '' },
  recommender_name:   { type: String, required: true },
  recommender_email:  { type: String, required: true },
  recommender_phone:  { type: String, default: '' },
  recommender_note:   { type: String, default: '' },
  is_member:          { type: Boolean, default: false },
  status:             { type: String, enum: ['pending','approved','rejected','added'], default: 'pending' },
  admin_note:         { type: String, default: '' },
}, { timestamps: true })

export const TempleRecommendation = models.TempleRecommendation || model<ITempleRecommendation>('TempleRecommendation', TempleRecommendationSchema)
`)
console.log('✅ models/TempleRecommendation.ts')

// ── 2. API Route ──────────────────────────────────────────────────────────────
fs.mkdirSync('app/api/recommend-temple', { recursive: true })
fs.writeFileSync('app/api/recommend-temple/route.ts', `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { TempleRecommendation } from '@/models/TempleRecommendation'
import nodemailer from 'nodemailer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, state, city, deity, recommender_name, recommender_email } = body

    if (!name || !state || !city || !deity || !recommender_name || !recommender_email) {
      return NextResponse.json({ error: 'Temple name, state, city, deity and your contact details are required' }, { status: 400 })
    }

    await connectDB()
    const session = await getServerSession(authOptions)
    const is_member = !!session?.user?.email

    const rec = await TempleRecommendation.create({ ...body, is_member })

    // Send email notification
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })

      await transporter.sendMail({
        from: \`"DivyaDarshanam" <\${process.env.SMTP_USER}>\`,
        to: 'chirag@dynaimers.com',
        subject: \`New Temple Recommendation - \${name} (\${city}, \${state})\`,
        html: \`
<!DOCTYPE html><html><head><meta charset="utf-8"><style>
  body{font-family:Arial,sans-serif;background:#FDFAF6;margin:0;padding:0;}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);}
  .hdr{background:#8B1A1A;padding:24px 28px;}
  .hdr h1{color:white;font-size:20px;margin:0;font-family:Georgia,serif;}
  .hdr p{color:rgba(237,224,196,0.8);font-size:12px;margin:6px 0 0;}
  .body{padding:24px 28px;}
  .section-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#C0570A;margin:20px 0 10px;border-bottom:2px solid #FFE0C0;padding-bottom:6px;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:8px;}
  .field{background:#F8F4EE;border-radius:8px;padding:10px 12px;}
  .field .lbl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#A89B8C;margin-bottom:3px;}
  .field .val{font-size:13px;color:#1A0A00;font-weight:500;}
  .full{grid-column:1/-1;}
  .footer{background:#F8F4EE;padding:14px 28px;font-size:11px;color:#A89B8C;text-align:center;}
</style></head>
<body><div class="wrap">
  <div class="hdr">
    <h1>New Temple Recommendation</h1>
    <p>A pilgrim has suggested a temple to add to DivyaDarshanam</p>
  </div>
  <div class="body">
    <div class="section-title">Temple Details</div>
    <div class="grid">
      <div class="field"><div class="lbl">Temple Name</div><div class="val">\${name}</div></div>
      <div class="field"><div class="lbl">Deity</div><div class="val">\${deity}</div></div>
      <div class="field"><div class="lbl">City</div><div class="val">\${city}</div></div>
      <div class="field"><div class="lbl">State</div><div class="val">\${state}</div></div>
      \${body.type ? \`<div class="field"><div class="lbl">Type</div><div class="val">\${body.type}</div></div>\` : ''}
      \${body.address ? \`<div class="field full"><div class="lbl">Address</div><div class="val">\${body.address}</div></div>\` : ''}
      \${body.description ? \`<div class="field full"><div class="lbl">Description</div><div class="val">\${body.description}</div></div>\` : ''}
      \${body.timing ? \`<div class="field"><div class="lbl">Timings</div><div class="val">\${body.timing}</div></div>\` : ''}
      \${body.best_time ? \`<div class="field"><div class="lbl">Best Time</div><div class="val">\${body.best_time}</div></div>\` : ''}
      \${body.website ? \`<div class="field"><div class="lbl">Website</div><div class="val">\${body.website}</div></div>\` : ''}
    </div>
    <div class="section-title">Recommended By</div>
    <div class="grid">
      <div class="field"><div class="lbl">Name</div><div class="val">\${recommender_name}</div></div>
      <div class="field"><div class="lbl">Email</div><div class="val">\${recommender_email}</div></div>
      \${body.recommender_phone ? \`<div class="field"><div class="lbl">Phone</div><div class="val">\${body.recommender_phone}</div></div>\` : ''}
      <div class="field"><div class="lbl">Registered Member</div><div class="val">\${is_member ? 'Yes' : 'No'}</div></div>
      \${body.recommender_note ? \`<div class="field full"><div class="lbl">Note</div><div class="val">\${body.recommender_note}</div></div>\` : ''}
    </div>
  </div>
  <div class="footer">DivyaDarshanam · India's Temple Explorer · divyadarshanam.in</div>
</div></body></html>
        \`,
      })
    } catch(emailErr) {
      console.error('Email failed:', emailErr)
    }

    return NextResponse.json({ success: true, id: rec._id })
  } catch(err) {
    console.error('Recommend temple error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET() {
  await connectDB()
  const recs = await TempleRecommendation.find().sort({ createdAt: -1 }).limit(200).lean()
  return NextResponse.json({ recommendations: recs })
}

export async function PATCH(req: NextRequest) {
  const { id, status, admin_note } = await req.json()
  await connectDB()
  await TempleRecommendation.updateOne({ _id: id }, { status, ...(admin_note ? { admin_note } : {}) })

  // If approved, optionally add to temples collection
  if (status === 'added') {
    try {
      const rec = await TempleRecommendation.findById(id).lean() as any
      if (rec) {
        const { Temple } = await import('@/models')
        const slug = rec.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        const exists = await Temple.findOne({ slug })
        if (!exists) {
          await Temple.create({
            name: rec.name, slug, state: rec.state, city: rec.city,
            deity: rec.deity, type: rec.type, description: rec.description,
            address: rec.address, timing: rec.timing, best_time: rec.best_time,
            dress_code: rec.dress_code, festivals: rec.festivals,
            has_live: rec.has_live, live_url: rec.live_url,
            website: rec.website, image_url: rec.image_url,
            lat: parseFloat(rec.lat) || 0, lng: parseFloat(rec.lng) || 0,
            categories: [], rating_avg: 0, rating_count: 0,
          })
        }
      }
    } catch(e) { console.error('Auto-add temple failed:', e) }
  }

  return NextResponse.json({ success: true })
}
`)
console.log('✅ app/api/recommend-temple/route.ts')

// ── 3. Recommend Temple Modal ─────────────────────────────────────────────────
fs.writeFileSync('components/RecommendTempleModal.tsx', `'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { X, MapPin, ChevronDown } from 'lucide-react'

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh']

const TEMPLE_TYPES = ['Shaivite','Vaishnavite','Shakta','Smarta','Jain','Buddhist','Folk / Local Deity','Tribal Temple','Heritage / Archaeological','Other']

const DEITIES = ['Shiva / Mahadev','Vishnu / Narayan','Krishna','Rama','Durga / Devi','Kali','Ganesha / Ganpati','Hanuman','Lakshmi','Saraswati','Murugan / Kartikeya','Ayyappa','Surya','Jagannath','Multiple Deities','Other']

export default function RecommendTempleModal({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession()
  const [step, setStep] = useState<'temple' | 'contact' | 'success'>('temple')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    // Temple info
    name: '', state: '', city: '', deity: '', type: '',
    description: '', address: '', timing: '', best_time: '',
    dress_code: '', festivals: '', website: '',
    has_live: false, live_url: '', lat: '', lng: '',
    // Recommender
    recommender_name: session?.user?.name || '',
    recommender_email: session?.user?.email || '',
    recommender_phone: '',
    recommender_note: '',
  })

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const validateStep1 = () => {
    if (!form.name.trim()) { setError('Temple name is required'); return false }
    if (!form.state) { setError('Please select a state'); return false }
    if (!form.city.trim()) { setError('City is required'); return false }
    if (!form.deity) { setError('Please select the main deity'); return false }
    setError(''); return true
  }

  const submit = async () => {
    if (!form.recommender_name || !form.recommender_email) { setError('Your name and email are required'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/recommend-temple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setStep('success')
    } catch { setError('Something went wrong. Please try again.') }
    setLoading(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: 10,
    border: '1.5px solid #E8E0D4', fontSize: 14, outline: 'none',
    color: '#1A0A00', background: 'white', fontFamily: 'inherit',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '.06em', color: '#A89B8C', display: 'block', marginBottom: 5,
  }
  const selectStyle: React.CSSProperties = { ...inputStyle, cursor: 'pointer' }

  if (step === 'success') return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, padding:16 }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:20, padding:40, maxWidth:440, width:'100%', textAlign:'center', boxShadow:'0 24px 80px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize:64, marginBottom:16 }}>🛕</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:'#8B1A1A', marginBottom:12 }}>Thank You!</h2>
        <p style={{ color:'#6B5B4E', lineHeight:1.7, marginBottom:8 }}>
          We've received your recommendation for <strong style={{ color:'#8B1A1A' }}>{form.name}</strong> in {form.city}, {form.state}.
        </p>
        <p style={{ color:'#6B5B4E', lineHeight:1.7, marginBottom:24 }}>
          Our team will review and verify the details. If approved, it will be added to DivyaDarshanam's directory.
        </p>
        <div style={{ background:'#FFF8F0', border:'1px solid #C0570A', borderRadius:12, padding:14, marginBottom:24 }}>
          <p style={{ fontSize:13, color:'#8B1A1A', fontStyle:'italic' }}>
            "Every temple you help us discover makes pilgrimage easier for thousands of devotees. 🙏"
          </p>
        </div>
        <button onClick={onClose} style={{ background:'#8B1A1A', color:'white', border:'none', borderRadius:10, padding:'12px 32px', fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Continue Exploring
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, padding:16, overflowY:'auto' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:20, maxWidth:680, width:'100%', maxHeight:'95vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background:'linear-gradient(135deg,#8B1A1A,#C0570A)', padding:'22px 28px', flexShrink:0, position:'relative' }}>
          <button onClick={onClose} style={{ position:'absolute', top:14, right:14, background:'rgba(255,255,255,0.15)', border:'none', color:'white', width:30, height:30, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X size={15}/></button>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:40, height:40, background:'rgba(255,255,255,0.15)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>🛕</div>
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'white', margin:0 }}>Recommend a Temple</h2>
              <p style={{ color:'rgba(237,224,196,0.8)', fontSize:12, margin:'4px 0 0' }}>Help us discover sacred temples not yet in our directory</p>
            </div>
          </div>
          {/* Step indicator */}
          <div style={{ display:'flex', gap:6, marginTop:16 }}>
            {['Temple Details', 'Your Info'].map((s, i) => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background: (step==='temple'&&i===0)||(step==='contact'&&i===1) ? 'white' : 'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color: (step==='temple'&&i===0)||(step==='contact'&&i===1) ? '#8B1A1A' : 'white' }}>{i+1}</div>
                <span style={{ fontSize:12, color: (step==='temple'&&i===0)||(step==='contact'&&i===1) ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: (step==='temple'&&i===0)||(step==='contact'&&i===1) ? 600 : 400 }}>{s}</span>
                {i===0 && <span style={{ color:'rgba(255,255,255,0.4)', fontSize:14, margin:'0 2px' }}>›</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflowY:'auto', flex:1, padding:28 }}>

          {step === 'temple' && (<>
            {/* Required fields */}
            <div style={{ background:'#FFF8F0', border:'1px solid #FFD4B0', borderRadius:10, padding:'10px 14px', marginBottom:20, fontSize:13, color:'#C0570A' }}>
              Fields marked with <strong>*</strong> are required. The more details you provide, the faster we can verify and add the temple.
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {/* Temple Name */}
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelStyle}>Temple Name *</label>
                <input style={inputStyle} placeholder="e.g. Shri Siddhivinayak Temple" value={form.name} onChange={e => set('name', e.target.value)} />
              </div>

              {/* State */}
              <div>
                <label style={labelStyle}>State *</label>
                <select style={selectStyle} value={form.state} onChange={e => set('state', e.target.value)}>
                  <option value="">Select state…</option>
                  {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* City */}
              <div>
                <label style={labelStyle}>City / District *</label>
                <input style={inputStyle} placeholder="e.g. Mumbai" value={form.city} onChange={e => set('city', e.target.value)} />
              </div>

              {/* Deity */}
              <div>
                <label style={labelStyle}>Main Deity *</label>
                <select style={selectStyle} value={form.deity} onChange={e => set('deity', e.target.value)}>
                  <option value="">Select deity…</option>
                  {DEITIES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Type */}
              <div>
                <label style={labelStyle}>Temple Type</label>
                <select style={selectStyle} value={form.type} onChange={e => set('type', e.target.value)}>
                  <option value="">Select type…</option>
                  {TEMPLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Address */}
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelStyle}>Full Address</label>
                <input style={inputStyle} placeholder="Street, locality, pin code…" value={form.address} onChange={e => set('address', e.target.value)} />
              </div>

              {/* Description */}
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelStyle}>About This Temple</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="History, significance, what makes this temple special…"
                  style={{ ...inputStyle, resize:'none' }} />
              </div>

              {/* Timings */}
              <div>
                <label style={labelStyle}>Darshan Timings</label>
                <input style={inputStyle} placeholder="e.g. 6 AM – 12 PM, 4 PM – 9 PM" value={form.timing} onChange={e => set('timing', e.target.value)} />
              </div>

              {/* Best time */}
              <div>
                <label style={labelStyle}>Best Time to Visit</label>
                <input style={inputStyle} placeholder="e.g. October to February" value={form.best_time} onChange={e => set('best_time', e.target.value)} />
              </div>

              {/* Dress code */}
              <div>
                <label style={labelStyle}>Dress Code</label>
                <input style={inputStyle} placeholder="e.g. Traditional attire required" value={form.dress_code} onChange={e => set('dress_code', e.target.value)} />
              </div>

              {/* Festivals */}
              <div>
                <label style={labelStyle}>Major Festivals</label>
                <input style={inputStyle} placeholder="e.g. Ganesh Chaturthi, Navratri" value={form.festivals} onChange={e => set('festivals', e.target.value)} />
              </div>

              {/* Website */}
              <div>
                <label style={labelStyle}>Official Website</label>
                <input style={inputStyle} placeholder="https://…" value={form.website} onChange={e => set('website', e.target.value)} />
              </div>

              {/* Coordinates */}
              <div style={{ gridColumn:'1/-1', display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                <div>
                  <label style={labelStyle}>Latitude (optional)</label>
                  <input style={inputStyle} placeholder="e.g. 19.0176" value={form.lat} onChange={e => set('lat', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Longitude (optional)</label>
                  <input style={inputStyle} placeholder="e.g. 72.8562" value={form.lng} onChange={e => set('lng', e.target.value)} />
                </div>
              </div>

              {/* Live darshan */}
              <div style={{ gridColumn:'1/-1', display:'flex', alignItems:'center', gap:10 }}>
                <input type="checkbox" checked={form.has_live} onChange={e => set('has_live', e.target.checked)} style={{ width:16, height:16, accentColor:'#8B1A1A', cursor:'pointer' }} />
                <span style={{ fontSize:13, color:'#1A0A00' }}>This temple has a live darshan stream</span>
              </div>
              {form.has_live && (
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={labelStyle}>Live Stream URL</label>
                  <input style={inputStyle} placeholder="YouTube / website link…" value={form.live_url} onChange={e => set('live_url', e.target.value)} />
                </div>
              )}
            </div>

            {error && <div style={{ background:'#FEE2E2', border:'1px solid #FECACA', borderRadius:10, padding:12, color:'#991B1B', fontSize:13, marginTop:16 }}>{error}</div>}

            <button onClick={() => { if (validateStep1()) setStep('contact') }} style={{
              width:'100%', marginTop:20, background:'#8B1A1A', color:'white', border:'none',
              borderRadius:12, padding:'14px 0', fontWeight:700, fontSize:15, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:8
            }}>
              Next — Your Details →
            </button>
          </>)}

          {step === 'contact' && (<>
            {/* Temple summary */}
            <div style={{ background:'#FFF0F0', border:'1.5px solid #8B1A1A', borderRadius:12, padding:16, marginBottom:24, display:'flex', gap:12, alignItems:'center' }}>
              <span style={{ fontSize:28 }}>🛕</span>
              <div>
                <div style={{ fontWeight:700, fontSize:15, color:'#8B1A1A' }}>{form.name}</div>
                <div style={{ fontSize:13, color:'#6B5B4E' }}>{form.deity} · {form.city}, {form.state}</div>
              </div>
              <button onClick={() => setStep('temple')} style={{ marginLeft:'auto', background:'none', border:'1px solid #E8E0D4', borderRadius:8, padding:'6px 12px', fontSize:12, color:'#6B5B4E', cursor:'pointer' }}>Edit</button>
            </div>

            {session?.user && (
              <div style={{ background:'#DCFCE7', border:'1px solid #86EFAC', borderRadius:10, padding:12, marginBottom:20, fontSize:13, color:'#166534' }}>
                ✓ Logged in as <strong>{session.user.name}</strong> — your details have been pre-filled
              </div>
            )}

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <div>
                <label style={labelStyle}>Your Name *</label>
                <input style={inputStyle} placeholder="Full name" value={form.recommender_name} onChange={e => set('recommender_name', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input type="email" style={inputStyle} placeholder="your@email.com" value={form.recommender_email} onChange={e => set('recommender_email', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Mobile Number</label>
                <input type="tel" style={inputStyle} placeholder="+91 98765 43210" value={form.recommender_phone} onChange={e => set('recommender_phone', e.target.value)} />
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelStyle}>Why do you recommend this temple? (optional)</label>
                <textarea value={form.recommender_note} onChange={e => set('recommender_note', e.target.value)} rows={3}
                  placeholder="Personal visit, family significance, historical importance…"
                  style={{ ...inputStyle, resize:'none' }} />
              </div>
            </div>

            {error && <div style={{ background:'#FEE2E2', border:'1px solid #FECACA', borderRadius:10, padding:12, color:'#991B1B', fontSize:13, marginTop:4 }}>{error}</div>}

            <div style={{ display:'flex', gap:12, marginTop:20 }}>
              <button onClick={() => setStep('temple')} style={{ padding:'12px 20px', borderRadius:10, border:'1.5px solid #E8E0D4', background:'white', color:'#6B5B4E', fontWeight:600, fontSize:14, cursor:'pointer' }}>← Back</button>
              <button onClick={submit} disabled={loading} style={{
                flex:1, background: loading ? '#ccc' : '#8B1A1A', color:'white', border:'none',
                borderRadius:12, padding:'14px 0', fontWeight:700, fontSize:15,
                cursor: loading ? 'not-allowed' : 'pointer',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8
              }}>
                🛕 {loading ? 'Submitting…' : 'Submit Recommendation'}
              </button>
            </div>
            <p style={{ textAlign:'center', fontSize:11, color:'#A89B8C', marginTop:12 }}>
              Our team will verify the details and add the temple if validated. You will be credited.
            </p>
          </>)}
        </div>
      </div>
    </div>
  )
}
`)
console.log('✅ components/RecommendTempleModal.tsx')

// ── 4. Add to Explore page and Navbar ─────────────────────────────────────────
// Add a "Recommend a Temple" button to the explore page header
const explorePath = 'app/(app)/explore/page.tsx'
if (fs.existsSync(explorePath)) {
  let explore = fs.readFileSync(explorePath, 'utf8')
  if (!explore.includes('RecommendTemple')) {
    // Add import
    explore = explore.replace(
      /^(import .+\n)/m,
      "$1import RecommendTempleButton from '@/components/RecommendTempleButton'\n"
    )
    fs.writeFileSync(explorePath, explore, 'utf8')
    console.log('✅ Explore page: RecommendTemple button import added')
  }
}

// ── 5. Create a standalone Recommend Temple Button component ──────────────────
fs.writeFileSync('components/RecommendTempleButton.tsx', `'use client'
import { useState } from 'react'
import RecommendTempleModal from './RecommendTempleModal'
import { Plus } from 'lucide-react'

export default function RecommendTempleButton({ variant = 'button' }: { variant?: 'button' | 'banner' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {variant === 'banner' ? (
        <div style={{
          background: 'linear-gradient(135deg, #FFF8F0, #FFE8D0)',
          border: '1.5px solid #C0570A',
          borderRadius: 14, padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          marginBottom: 20,
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:28 }}>🛕</span>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:'#8B1A1A' }}>Know a temple we're missing?</div>
              <div style={{ fontSize:12, color:'#6B5B4E', marginTop:2 }}>Help pilgrims discover it — recommend it to our team</div>
            </div>
          </div>
          <button onClick={() => setOpen(true)} style={{
            background:'#8B1A1A', color:'white', border:'none', borderRadius:10,
            padding:'10px 18px', fontWeight:700, fontSize:13, cursor:'pointer',
            whiteSpace:'nowrap', flexShrink:0,
            display:'flex', alignItems:'center', gap:6
          }}>
            <Plus size={14}/> Recommend a Temple
          </button>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{
          display:'flex', alignItems:'center', gap:6,
          padding:'9px 16px', borderRadius:9, border:'1.5px solid #C0570A',
          background:'#FFF0F0', color:'#8B1A1A', fontWeight:600, fontSize:13,
          cursor:'pointer', fontFamily:'inherit',
        }}>
          <Plus size={14}/> Recommend a Temple
        </button>
      )}
      {open && <RecommendTempleModal onClose={() => setOpen(false)} />}
    </>
  )
}
`)
console.log('✅ components/RecommendTempleButton.tsx')

// ── 6. Patch admin dashboard to add Recommendations tab ───────────────────────
let admin = fs.readFileSync('app/admin/dashboard/page.tsx', 'utf8')

if (!admin.includes('recommendations')) {
  // Add tab
  admin = admin.replace(
    "{ id:'contributions', icon: Heart,        label:'Contributions'   },",
    "{ id:'contributions', icon: Heart,        label:'Contributions'   },\n  { id:'recommendations',icon: MapPin,       label:'Temple Recs'     },"
  )

  // Add tab content before closing
  const recsContent = `
          {/* ── TEMPLE RECOMMENDATIONS ── */}
          {tab==='recommendations' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { label:'Total', value: data?.recommendations?.length||0, color:C.blue },
                  { label:'Pending', value: data?.recommendations?.filter((r:any)=>r.status==='pending').length||0, color:C.amber },
                  { label:'Approved', value: data?.recommendations?.filter((r:any)=>r.status==='approved').length||0, color:C.green },
                  { label:'Added to DB', value: data?.recommendations?.filter((r:any)=>r.status==='added').length||0, color:C.crimson },
                ].map(stat => (
                  <div key={stat.label} style={{ background:C.surface, border:\`1.5px solid \${C.border}\`, borderRadius:12, padding:'18px 20px' }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.1em', color:C.muted2, marginBottom:8 }}>{stat.label}</div>
                    <div style={{ fontSize:26, fontWeight:700, color:stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:14 }}>Recommended Temples ({data?.recommendations?.length||0})</span>
                  <span style={{ fontSize:12, color:C.muted2 }}>Review and approve or add to database</span>
                </div>
                {data?.recommendations?.length ? (
                  <table><thead><tr>
                    <th style={S.th}>Temple</th>
                    <th style={S.th}>Deity</th>
                    <th style={S.th}>Location</th>
                    <th style={S.th}>Recommended By</th>
                    <th style={S.th}>Member</th>
                    <th style={S.th}>Status</th>
                    <th style={S.th}>Date</th>
                    <th style={S.th}>Action</th>
                  </tr></thead><tbody>
                    {data.recommendations.map((r:any) => (
                      <tr key={r._id}>
                        <td style={{ ...S.td, fontWeight:600 }}>{r.name}</td>
                        <td style={S.td}>{r.deity}</td>
                        <td style={{ ...S.td, color:C.muted }}>{r.city}, {r.state}</td>
                        <td style={{ ...S.td, fontSize:12 }}>
                          <div style={{ fontWeight:500 }}>{r.recommender_name}</div>
                          <div style={{ color:C.muted2 }}>{r.recommender_email}</div>
                        </td>
                        <td style={S.td}><span style={S.badge(r.is_member?C.green:C.amber, r.is_member?C.greenBg:C.amberBg)}>{r.is_member?'Member':'Visitor'}</span></td>
                        <td style={S.td}><span style={S.badge(
                          r.status==='pending'?C.amber:r.status==='approved'?C.blue:r.status==='added'?C.green:C.red,
                          r.status==='pending'?C.amberBg:r.status==='approved'?C.blueBg:r.status==='added'?C.greenBg:C.redBg
                        )}>{r.status}</span></td>
                        <td style={{ ...S.td, color:C.muted2 }}>{ago(r.createdAt)}</td>
                        <td style={S.td}>
                          <select defaultValue={r.status}
                            onChange={async e => {
                              await fetch('/api/recommend-temple', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:r._id, status:e.target.value})})
                              load()
                            }}
                            style={{ fontSize:12, padding:'5px 8px' }}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="added">Added to DB</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody></table>
                ) : <div style={S.empty}>No temple recommendations yet. They appear when users submit via the Recommend a Temple form.</div>}
              </div>
            </div>
          )}
`

  admin = admin.replace(
    "          {/* ── CONTRIBUTIONS ── */}",
    recsContent + "\n          {/* ── CONTRIBUTIONS ── */}"
  )

  fs.writeFileSync('app/admin/dashboard/page.tsx', admin, 'utf8')
  console.log('✅ Admin dashboard: Temple Recommendations tab added')
}

// ── 7. Patch stats API ────────────────────────────────────────────────────────
const statsPath = 'app/api/admin/stats/route.ts'
if (fs.existsSync(statsPath)) {
  let stats = fs.readFileSync(statsPath, 'utf8')
  if (!stats.includes('recommendations')) {
    const insertCode = `
  if (type === 'recommendations') {
    try {
      const { TempleRecommendation } = await import('@/models/TempleRecommendation')
      const recommendations = await TempleRecommendation.find().sort({ createdAt: -1 }).limit(200).lean()
      return NextResponse.json({ recommendations })
    } catch(e) { return NextResponse.json({ recommendations: [] }) }
  }
`
    const insertPoint = stats.lastIndexOf('\n  return NextResponse.json(')
    if (insertPoint > -1) {
      stats = stats.slice(0, insertPoint) + insertCode + stats.slice(insertPoint)
      fs.writeFileSync(statsPath, stats, 'utf8')
      console.log('✅ Stats API: recommendations type added')
    }
  }
}

console.log('\n🎉 All done! Now run:')
console.log('git add .')
console.log('git commit -m "feat: recommend a temple system with admin backend"')
console.log('git push origin main')

import RecommendTempleButton from '@/components/RecommendTempleButton'
<RecommendTempleButton variant="banner" />