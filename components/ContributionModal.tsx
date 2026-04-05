'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { X, Heart, Users, MapPin, Phone, ChevronRight } from 'lucide-react'

const AMOUNTS = [5000, 10000, 25000, 50000, 100000]
const INTERESTS = [
  'Temple data verification & enrichment',
  'Adding new temples to the database',
  'Customer support for pilgrims',
  'Technology & app development',
  'Community outreach & awareness',
  'Old age home collaboration program',
  'All of the above',
]

const BENEFITS = [
  { icon: '🏆', title: 'Temple Explorer Partner', desc: 'Credited on our contributors page permanently' },
  { icon: '🔔', title: 'Early Access', desc: 'First access to all new features before public launch' },
  { icon: '🎖️', title: 'Partner Badge', desc: 'Special Partner badge on your DivyaDarshan profile' },
  { icon: '📞', title: 'Priority Support', desc: 'Direct access to our team for any help you need' },
  { icon: '📊', title: 'Impact Reports', desc: 'Quarterly reports on how your contribution is being used' },
  { icon: '🛕', title: 'Special Programs', desc: 'Exclusive partner-only yatra programs and experiences' },
]

export default function ContributionModal({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession()
  const [step, setStep] = useState<'info' | 'form' | 'success'>('info')
  const [form, setForm] = useState({
    name:       session?.user?.name || '',
    email:      session?.user?.email || '',
    phone:      '',
    city:       '',
    occupation: '',
    amount:     10000,
    customAmt:  '',
    interest:   '',
    message:    '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const finalAmount = form.customAmt ? parseInt(form.customAmt) : form.amount

  const submit = async () => {
    if (!form.name || !form.email || !form.phone) { setError('Name, email and mobile number are required'); return }
    if (finalAmount < 5000) { setError('Minimum contribution is Rs. 5,000'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/contribution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: finalAmount }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setStep('success')
    } catch {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, padding: '16px', overflowY: 'auto'
  }

  const fmtINR = (n: number) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n)

  if (step === 'success') return (
    <div style={overlay} onClick={onClose}>
      <div style={{ background:'white', borderRadius:20, padding:40, maxWidth:480, width:'100%', textAlign:'center' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize:64, marginBottom:16 }}>🙏</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:'#8B1A1A', marginBottom:12 }}>Thank You, {form.name.split(' ')[0]}!</h2>
        <p style={{ color:'#6B5B4E', lineHeight:1.7, marginBottom:8 }}>
          We've received your interest in contributing <strong style={{ color:'#8B1A1A' }}>{fmtINR(finalAmount)}</strong> to DivyaDarshan's mission.
        </p>
        <p style={{ color:'#6B5B4E', lineHeight:1.7, marginBottom:24 }}>
          Our team will reach out to you at <strong>{form.email}</strong> within 24 hours to discuss next steps. A confirmation has been sent to our team.
        </p>
        <div style={{ background:'#FFF0F0', border:'1.5px solid #C0570A', borderRadius:12, padding:16, marginBottom:24 }}>
          <p style={{ fontSize:13, color:'#8B1A1A', fontStyle:'italic' }}>
            "Together, we can make India's sacred temples accessible to every pilgrim across the world."
          </p>
        </div>
        <button onClick={onClose} style={{ background:'#8B1A1A', color:'white', border:'none', borderRadius:10, padding:'12px 32px', fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Continue Exploring
        </button>
      </div>
    </div>
  )

  return (
    <div style={overlay} onClick={onClose}>
      <div style={{ background:'white', borderRadius:20, maxWidth:720, width:'100%', maxHeight:'95vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ background:'linear-gradient(135deg, #8B1A1A, #C0570A)', padding:'24px 28px', position:'relative', flexShrink:0 }}>
          <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'rgba(255,255,255,0.15)', border:'none', color:'white', width:32, height:32, borderRadius:'50%', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}><X size={16}/></button>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.15em', color:'rgba(237,224,196,0.7)', textTransform:'uppercase', marginBottom:6 }}>Partner With Us</div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:'white', margin:'0 0 6px' }}>Support DivyaDarshan's Mission</h2>
          <p style={{ color:'rgba(237,224,196,0.85)', fontSize:13, lineHeight:1.6, margin:0 }}>
            This is not a donation — it is a contribution towards building India's most trusted temple platform for pilgrims.
          </p>
          {/* Steps */}
          <div style={{ display:'flex', gap:8, marginTop:16 }}>
            {['About', 'Your Details'].map((s, i) => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background: step==='info'&&i===0||step==='form'&&i===1 ? 'white' : 'rgba(255,255,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color: step==='info'&&i===0||step==='form'&&i===1 ? '#8B1A1A' : 'white' }}>{i+1}</div>
                <span style={{ fontSize:12, color: step==='info'&&i===0||step==='form'&&i===1 ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: step==='info'&&i===0||step==='form'&&i===1 ? 600 : 400 }}>{s}</span>
                {i===0 && <ChevronRight size={12} color="rgba(255,255,255,0.4)"/>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflowY:'auto', flex:1 }}>
          {step === 'info' && (
            <div style={{ padding:28 }}>
              {/* Noble cause */}
              <div style={{ background:'#FFF8F0', border:'1.5px solid #C0570A', borderRadius:14, padding:20, marginBottom:24 }}>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:'#8B1A1A', marginBottom:12 }}>Where Your Contribution Goes</h3>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[
                    { icon:'🛕', title:'Temple Volunteers', desc:'Hire people to verify, enrich and add new temple data across India' },
                    { icon:'👴', title:'Old Age Home Collaboration', desc:'Partner with seniors to provide warm, knowledgeable pilgrim support' },
                    { icon:'🗺️', title:'More Temples', desc:'Expand our database from 370 to 5,000+ temples across every state' },
                    { icon:'💻', title:'Better Technology', desc:'Faster AI, better images, mobile app and offline access for pilgrims' },
                  ].map(item => (
                    <div key={item.title} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                      <span style={{ fontSize:24, flexShrink:0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:'#1A0A00', marginBottom:2 }}>{item.title}</div>
                        <div style={{ fontSize:12, color:'#6B5B4E', lineHeight:1.5 }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, color:'#1A0A00', marginBottom:12 }}>What You Get in Return</h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:24 }}>
                {BENEFITS.map(b => (
                  <div key={b.title} style={{ background:'#F8F4EE', borderRadius:10, padding:14, border:'1px solid #E8E0D4' }}>
                    <div style={{ fontSize:22, marginBottom:6 }}>{b.icon}</div>
                    <div style={{ fontSize:12, fontWeight:600, color:'#1A0A00', marginBottom:3 }}>{b.title}</div>
                    <div style={{ fontSize:11, color:'#6B5B4E', lineHeight:1.5 }}>{b.desc}</div>
                  </div>
                ))}
              </div>

              {/* Important note */}
              <div style={{ background:'#F0F9FF', border:'1px solid #BAE6FD', borderRadius:10, padding:14, marginBottom:24, fontSize:13, color:'#1E40AF', lineHeight:1.6 }}>
                <strong>Important:</strong> DivyaDarshan is not a trust or NGO. This is a voluntary contribution to support our platform's growth. We believe in transparent, community-funded development. You are partnering with a mission, not making a charitable donation.
              </div>

              <button onClick={() => setStep('form')} style={{ width:'100%', background:'#8B1A1A', color:'white', border:'none', borderRadius:12, padding:'15px 0', fontWeight:700, fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                <Heart size={18}/> I Want to Contribute →
              </button>
            </div>
          )}

          {step === 'form' && (
            <div style={{ padding:28 }}>
              {session?.user && (
                <div style={{ background:'#DCFCE7', border:'1px solid #86EFAC', borderRadius:10, padding:12, marginBottom:20, fontSize:13, color:'#166534' }}>
                  ✓ Logged in as <strong>{session.user.name}</strong> — your details have been pre-filled
                </div>
              )}

              {/* Amount selection */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:'#A89B8C', display:'block', marginBottom:10 }}>Contribution Amount (minimum Rs. 5,000)</label>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:10 }}>
                  {AMOUNTS.map(amt => (
                    <button key={amt} onClick={() => { set('amount', amt); set('customAmt', '') }} style={{
                      padding:'10px 18px', borderRadius:10, border:'2px solid',
                      borderColor: form.amount===amt && !form.customAmt ? '#8B1A1A' : '#E8E0D4',
                      background: form.amount===amt && !form.customAmt ? '#FFF0F0' : 'white',
                      color: form.amount===amt && !form.customAmt ? '#8B1A1A' : '#6B5B4E',
                      fontWeight:700, fontSize:14, cursor:'pointer',
                    }}>
                      {fmtINR(amt)}
                    </button>
                  ))}
                </div>
                <input
                  type="number" min={5000} placeholder="Or enter custom amount (min Rs. 5,000)"
                  value={form.customAmt}
                  onChange={e => { set('customAmt', e.target.value); set('amount', 0) }}
                  style={{ width:'100%', padding:'11px 14px', borderRadius:10, border:`2px solid ${form.customAmt ? '#8B1A1A' : '#E8E0D4'}`, fontSize:14, outline:'none', color:'#1A0A00' }}
                />
                {finalAmount >= 5000 && <div style={{ fontSize:12, color:'#166534', marginTop:6 }}>✓ Amount: {fmtINR(finalAmount)}</div>}
              </div>

              {/* Personal details grid */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
                {[
                  { k:'name',       label:'Full Name *',          ph:'Your full name',             type:'text'  },
                  { k:'email',      label:'Email Address *',      ph:'your@email.com',             type:'email' },
                  { k:'phone',      label:'Mobile Number *',       ph:'+91 98765 43210',            type:'tel'   },
                  { k:'city',       label:'City',                 ph:'e.g. Mumbai, Delhi, Pune',   type:'text'  },
                  { k:'occupation', label:'Occupation',           ph:'e.g. Doctor, Entrepreneur',  type:'text'  },
                ].map(({ k, label, ph, type }) => (
                  <div key={k}>
                    <label style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#A89B8C', display:'block', marginBottom:5 }}>{label}</label>
                    <input type={type} placeholder={ph} value={(form as any)[k]} onChange={e => set(k, e.target.value)}
                      style={{ width:'100%', padding:'10px 14px', borderRadius:10, border:'1.5px solid #E8E0D4', fontSize:14, outline:'none', color:'#1A0A00' }} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#A89B8C', display:'block', marginBottom:5 }}>Area of Interest</label>
                  <select value={form.interest} onChange={e => set('interest', e.target.value)}
                    style={{ width:'100%', padding:'10px 14px', borderRadius:10, border:'1.5px solid #E8E0D4', fontSize:13, outline:'none', color:'#1A0A00', background:'white' }}>
                    <option value="">Select how you want to help…</option>
                    {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#A89B8C', display:'block', marginBottom:5 }}>Why do you want to contribute? (optional)</label>
                <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={3} placeholder="Tell us what inspired you to support DivyaDarshan's mission…"
                  style={{ width:'100%', padding:'10px 14px', borderRadius:10, border:'1.5px solid #E8E0D4', fontSize:13, outline:'none', color:'#1A0A00', resize:'none' }} />
              </div>

              {error && <div style={{ background:'#FEE2E2', border:'1px solid #FECACA', borderRadius:10, padding:12, color:'#991B1B', fontSize:13, marginBottom:16 }}>{error}</div>}

              <div style={{ display:'flex', gap:12 }}>
                <button onClick={() => setStep('info')} style={{ padding:'12px 20px', borderRadius:10, border:'1.5px solid #E8E0D4', background:'white', color:'#6B5B4E', fontWeight:600, fontSize:14, cursor:'pointer' }}>
                  ← Back
                </button>
                <button onClick={submit} disabled={loading} style={{
                  flex:1, background: loading ? '#ccc' : '#8B1A1A', color:'white', border:'none',
                  borderRadius:10, padding:'14px 0', fontWeight:700, fontSize:15, cursor: loading ? 'not-allowed' : 'pointer',
                  display:'flex', alignItems:'center', justifyContent:'center', gap:8
                }}>
                  <Heart size={16}/>
                  {loading ? 'Submitting…' : `Submit — ${fmtINR(finalAmount)}`}
                </button>
              </div>
              <p style={{ textAlign:'center', fontSize:11, color:'#A89B8C', marginTop:12 }}>
                By submitting, our team will contact you within 24 hours. No payment is collected now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
