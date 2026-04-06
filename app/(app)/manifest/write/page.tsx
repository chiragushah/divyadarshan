'use client'
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
