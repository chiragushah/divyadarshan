'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { X, Plus } from 'lucide-react'

const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh','Puducherry','Chandigarh']
const TEMPLE_TYPES = ['Shaivite','Vaishnavite','Shakta','Smarta','Jain','Buddhist','Folk / Local Deity','Heritage / Archaeological','Other']
const DEITIES = ['Shiva / Mahadev','Vishnu / Narayan','Krishna','Rama','Durga / Devi','Kali','Ganesha / Ganpati','Hanuman','Lakshmi','Saraswati','Murugan / Kartikeya','Ayyappa','Surya','Jagannath','Multiple Deities','Other']

export default function RecommendTempleModal({ onClose }: { onClose: () => void }) {
  const { data: session } = useSession()
  const [step, setStep] = useState<'temple' | 'contact' | 'success'>('temple')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', state: '', city: '', deity: '', type: '',
    description: '', address: '', timing: '', best_time: '',
    dress_code: '', festivals: '', website: '',
    has_live: false, live_url: '', lat: '', lng: '',
    recommender_name: session?.user?.name || '',
    recommender_email: session?.user?.email || '',
    recommender_phone: '', recommender_note: '',
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
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); setLoading(false); return }
      setStep('success')
    } catch { setError('Something went wrong. Please try again.') }
    setLoading(false)
  }

  const inp: React.CSSProperties = { width:'100%', padding:'10px 14px', borderRadius:10, border:'1.5px solid #E8E0D4', fontSize:14, outline:'none', color:'#1A0A00', background:'white', fontFamily:'inherit' }
  const lbl: React.CSSProperties = { fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'#A89B8C', display:'block', marginBottom:5 }

  if (step === 'success') return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, padding:16 }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:20, padding:40, maxWidth:440, width:'100%', textAlign:'center' }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize:60, marginBottom:16 }}>🛕</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, color:'#8B1A1A', marginBottom:12 }}>Thank You!</h2>
        <p style={{ color:'#6B5B4E', lineHeight:1.7, marginBottom:20 }}>
          We have received your recommendation for <strong style={{ color:'#8B1A1A' }}>{form.name}</strong> in {form.city}, {form.state}.
          Our team will verify the details and add it to DivyaDarshanam if validated.
        </p>
        <button onClick={onClose} style={{ background:'#8B1A1A', color:'white', border:'none', borderRadius:10, padding:'12px 32px', fontWeight:700, fontSize:15, cursor:'pointer' }}>
          Continue Exploring
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:9999, padding:16, overflowY:'auto' }} onClick={onClose}>
      <div style={{ background:'white', borderRadius:20, maxWidth:680, width:'100%', maxHeight:'95vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }} onClick={e => e.stopPropagation()}>

        <div style={{ background:'linear-gradient(135deg,#8B1A1A,#C0570A)', padding:'22px 28px', flexShrink:0, position:'relative' }}>
          <button onClick={onClose} style={{ position:'absolute', top:14, right:14, background:'rgba(255,255,255,0.2)', border:'none', color:'white', width:30, height:30, borderRadius:'50%', cursor:'pointer', fontSize:18, display:'flex', alignItems:'center', justifyContent:'center' }}>×</button>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:32 }}>🛕</span>
            <div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'white', margin:0 }}>Recommend a Temple</h2>
              <p style={{ color:'rgba(237,224,196,0.8)', fontSize:12, margin:'4px 0 0' }}>Help pilgrims discover temples not yet in our directory</p>
            </div>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:14 }}>
            {['Temple Details','Your Info'].map((s,i) => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <div style={{ width:22, height:22, borderRadius:'50%', background:(step==='temple'&&i===0)||(step==='contact'&&i===1)?'white':'rgba(255,255,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:(step==='temple'&&i===0)||(step==='contact'&&i===1)?'#8B1A1A':'white' }}>{i+1}</div>
                <span style={{ fontSize:12, color:(step==='temple'&&i===0)||(step==='contact'&&i===1)?'white':'rgba(255,255,255,0.5)', fontWeight:(step==='temple'&&i===0)||(step==='contact'&&i===1)?600:400 }}>{s}</span>
                {i===0 && <span style={{ color:'rgba(255,255,255,0.4)' }}>›</span>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflowY:'auto', flex:1, padding:28 }}>
          {step === 'temple' && (
            <>
              <div style={{ background:'#FFF8F0', border:'1px solid #FFD4B0', borderRadius:10, padding:'10px 14px', marginBottom:20, fontSize:13, color:'#C0570A' }}>
                Fields marked with <strong>*</strong> are required. More details help us verify faster.
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={lbl}>Temple Name *</label>
                  <input style={inp} placeholder="e.g. Shri Siddhivinayak Temple" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>State *</label>
                  <select style={inp} value={form.state} onChange={e => set('state', e.target.value)}>
                    <option value="">Select state…</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>City / District *</label>
                  <input style={inp} placeholder="e.g. Mumbai" value={form.city} onChange={e => set('city', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Main Deity *</label>
                  <select style={inp} value={form.deity} onChange={e => set('deity', e.target.value)}>
                    <option value="">Select deity…</option>
                    {DEITIES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Temple Type</label>
                  <select style={inp} value={form.type} onChange={e => set('type', e.target.value)}>
                    <option value="">Select type…</option>
                    {TEMPLE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={lbl}>Full Address</label>
                  <input style={inp} placeholder="Street, locality, pin code…" value={form.address} onChange={e => set('address', e.target.value)} />
                </div>
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={lbl}>About This Temple</label>
                  <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="History, significance, what makes it special…" style={{ ...inp, resize:'none' }} />
                </div>
                <div>
                  <label style={lbl}>Darshan Timings</label>
                  <input style={inp} placeholder="e.g. 6 AM – 9 PM" value={form.timing} onChange={e => set('timing', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Best Time to Visit</label>
                  <input style={inp} placeholder="e.g. October to February" value={form.best_time} onChange={e => set('best_time', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Dress Code</label>
                  <input style={inp} placeholder="e.g. Traditional attire" value={form.dress_code} onChange={e => set('dress_code', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Major Festivals</label>
                  <input style={inp} placeholder="e.g. Navratri, Ganesh Chaturthi" value={form.festivals} onChange={e => set('festivals', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Official Website</label>
                  <input style={inp} placeholder="https://…" value={form.website} onChange={e => set('website', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Latitude</label>
                  <input style={inp} placeholder="e.g. 19.0176" value={form.lat} onChange={e => set('lat', e.target.value)} />
                </div>
                <div style={{ gridColumn:'1/-1', display:'flex', alignItems:'center', gap:10, marginTop:4 }}>
                  <input type="checkbox" checked={form.has_live} onChange={e => set('has_live', e.target.checked)} style={{ width:16, height:16, accentColor:'#8B1A1A', cursor:'pointer' }} />
                  <span style={{ fontSize:13 }}>This temple has a live darshan stream</span>
                </div>
                {form.has_live && (
                  <div style={{ gridColumn:'1/-1' }}>
                    <label style={lbl}>Live Stream URL</label>
                    <input style={inp} placeholder="YouTube or website link…" value={form.live_url} onChange={e => set('live_url', e.target.value)} />
                  </div>
                )}
              </div>
              {error && <div style={{ background:'#FEE2E2', border:'1px solid #FECACA', borderRadius:10, padding:12, color:'#991B1B', fontSize:13, marginTop:16 }}>{error}</div>}
              <button onClick={() => { if (validateStep1()) setStep('contact') }} style={{ width:'100%', marginTop:20, background:'#8B1A1A', color:'white', border:'none', borderRadius:12, padding:'14px 0', fontWeight:700, fontSize:15, cursor:'pointer' }}>
                Next — Your Details →
              </button>
            </>
          )}

          {step === 'contact' && (
            <>
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
                  Logged in as <strong>{session.user.name}</strong> — details pre-filled
                </div>
              )}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div>
                  <label style={lbl}>Your Name *</label>
                  <input style={inp} placeholder="Full name" value={form.recommender_name} onChange={e => set('recommender_name', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Email Address *</label>
                  <input type="email" style={inp} placeholder="your@email.com" value={form.recommender_email} onChange={e => set('recommender_email', e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Mobile Number</label>
                  <input type="tel" style={inp} placeholder="+91 98765 43210" value={form.recommender_phone} onChange={e => set('recommender_phone', e.target.value)} />
                </div>
                <div style={{ gridColumn:'1/-1' }}>
                  <label style={lbl}>Why do you recommend this temple?</label>
                  <textarea value={form.recommender_note} onChange={e => set('recommender_note', e.target.value)} rows={3} placeholder="Personal visit, family history, historical importance…" style={{ ...inp, resize:'none' }} />
                </div>
              </div>
              {error && <div style={{ background:'#FEE2E2', border:'1px solid #FECACA', borderRadius:10, padding:12, color:'#991B1B', fontSize:13, marginTop:4 }}>{error}</div>}
              <div style={{ display:'flex', gap:12, marginTop:20 }}>
                <button onClick={() => setStep('temple')} style={{ padding:'12px 20px', borderRadius:10, border:'1.5px solid #E8E0D4', background:'white', color:'#6B5B4E', fontWeight:600, fontSize:14, cursor:'pointer' }}>← Back</button>
                <button onClick={submit} disabled={loading} style={{ flex:1, background:loading?'#ccc':'#8B1A1A', color:'white', border:'none', borderRadius:12, padding:'14px 0', fontWeight:700, fontSize:15, cursor:loading?'not-allowed':'pointer' }}>
                  {loading ? 'Submitting…' : 'Submit Recommendation 🛕'}
                </button>
              </div>
              <p style={{ textAlign:'center', fontSize:11, color:'#A89B8C', marginTop:12 }}>Our team will verify and add the temple if validated. You will be credited.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
