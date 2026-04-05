'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function SignUpPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'signup'|'signin'>('signup')
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirm:'' })
  const [loading, setLoading] = useState(false)
  const [gLoading, setGLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const set = (k:string,v:string) => setForm(f=>({...f,[k]:v}))

  const handleSignUp = async (e:React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone || !form.password) { setError('All fields are required'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    if (!/^\d{10}$/.test(form.phone.replace(/\s|\+91/g,''))) { setError('Enter a valid 10-digit mobile number'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ name:form.name, email:form.email, phone:form.phone, password:form.password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed'); setLoading(false); return }
      // Auto sign in
      const result = await signIn('credentials', { email:form.email, password:form.password, redirect:false })
      if (result?.ok) { router.push('/explore') }
      else { setSuccess('Account created! Please sign in.'); setTab('signin') }
    } catch { setError('Something went wrong. Please try again.') }
    setLoading(false)
  }

  const handleSignIn = async (e:React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const result = await signIn('credentials', { email:form.email, password:form.password, redirect:false })
    if (result?.ok) { router.push('/explore') }
    else { setError('Invalid email or password') }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setGLoading(true)
    await signIn('google', { callbackUrl:'/explore' })
  }

  const inp = { width:'100%', padding:'11px 14px', borderRadius:10, border:'1.5px solid #E8E0D4', fontSize:14, outline:'none', color:'#1A0A00', fontFamily:'inherit', marginBottom:12, boxSizing:'border-box' as const }
  const lbl = { fontSize:11, fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'.06em', color:'#A89B8C', display:'block', marginBottom:5 }

  return (
    <div style={{ minHeight:'100vh', background:'#FDFAF6', display:'flex', alignItems:'center', justifyContent:'center', padding:16, fontFamily:"'Inter',sans-serif" }}>
      <div style={{ width:'100%', maxWidth:440 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <img src="/divyadarshan-logo.png" alt="DivyaDarshan" style={{ height:72, objectFit:'contain' }} />
        </div>

        <div style={{ background:'white', borderRadius:20, padding:32, boxShadow:'0 4px 24px rgba(0,0,0,0.07)', border:'1px solid #E8E0D4' }}>

          {/* Tabs */}
          <div style={{ display:'flex', background:'#F8F4EE', borderRadius:12, padding:4, marginBottom:24 }}>
            {(['signup','signin'] as const).map(t => (
              <button key={t} onClick={() => { setTab(t); setError(''); setSuccess('') }} style={{
                flex:1, padding:'10px 0', borderRadius:9, border:'none', cursor:'pointer',
                background: tab===t ? 'white' : 'transparent',
                color: tab===t ? '#8B1A1A' : '#A89B8C',
                fontWeight: tab===t ? 700 : 500, fontSize:14, fontFamily:'inherit',
                boxShadow: tab===t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              }}>
                {t==='signup' ? 'Create Account' : 'Sign In'}
              </button>
            ))}
          </div>

          {success && <div style={{ background:'#DCFCE7', border:'1px solid #86EFAC', borderRadius:10, padding:12, color:'#166534', fontSize:13, marginBottom:16 }}>{success}</div>}
          {error && <div style={{ background:'#FEE2E2', border:'1px solid #FECACA', borderRadius:10, padding:12, color:'#991B1B', fontSize:13, marginBottom:16 }}>{error}</div>}

          {/* Google */}
          <button onClick={handleGoogle} disabled={gLoading} style={{ width:'100%', padding:'12px 0', borderRadius:10, border:'1.5px solid #E8E0D4', background:'white', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:10, fontSize:14, fontWeight:600, color:'#1A0A00', fontFamily:'inherit', marginBottom:20 }}>
            {gLoading ? <Loader2 size={18} className="animate-spin" /> : (
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            )}
            Continue with Google
          </button>

          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:'#E8E0D4' }} />
            <span style={{ fontSize:12, color:'#A89B8C' }}>or with email</span>
            <div style={{ flex:1, height:1, background:'#E8E0D4' }} />
          </div>

          {/* Sign Up Form */}
          {tab === 'signup' && (
            <form onSubmit={handleSignUp}>
              <label style={lbl}>Full Name *</label>
              <input style={inp} placeholder="Your full name" value={form.name} onChange={e => set('name',e.target.value)} required />
              <label style={lbl}>Email Address *</label>
              <input type="email" style={inp} placeholder="your@email.com" value={form.email} onChange={e => set('email',e.target.value)} required />
              <label style={lbl}>Mobile Number *</label>
              <input type="tel" style={inp} placeholder="+91 98765 43210" value={form.phone} onChange={e => set('phone',e.target.value)} required />
              <label style={lbl}>Password *</label>
              <input type="password" style={inp} placeholder="Minimum 6 characters" value={form.password} onChange={e => set('password',e.target.value)} required />
              <label style={lbl}>Confirm Password *</label>
              <input type="password" style={inp} placeholder="Repeat password" value={form.confirm} onChange={e => set('confirm',e.target.value)} required />
              <button type="submit" disabled={loading} style={{ width:'100%', padding:'13px 0', borderRadius:12, border:'none', background:loading?'#ccc':'#8B1A1A', color:'white', fontWeight:700, fontSize:15, cursor:loading?'not-allowed':'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                {loading ? <><Loader2 size={16} className="animate-spin"/>Creating account…</> : 'Create Free Account →'}
              </button>
              <p style={{ textAlign:'center', fontSize:12, color:'#A89B8C', marginTop:14 }}>
                Already have an account? <button type="button" onClick={() => setTab('signin')} style={{ background:'none', border:'none', color:'#8B1A1A', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Sign in</button>
              </p>
            </form>
          )}

          {/* Sign In Form */}
          {tab === 'signin' && (
            <form onSubmit={handleSignIn}>
              <label style={lbl}>Email Address</label>
              <input type="email" style={inp} placeholder="your@email.com" value={form.email} onChange={e => set('email',e.target.value)} required />
              <label style={lbl}>Password</label>
              <input type="password" style={inp} placeholder="Your password" value={form.password} onChange={e => set('password',e.target.value)} required />
              <button type="submit" disabled={loading} style={{ width:'100%', padding:'13px 0', borderRadius:12, border:'none', background:loading?'#ccc':'#8B1A1A', color:'white', fontWeight:700, fontSize:15, cursor:loading?'not-allowed':'pointer', fontFamily:'inherit', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                {loading ? <><Loader2 size={16} className="animate-spin"/>Signing in…</> : 'Sign In →'}
              </button>
              <p style={{ textAlign:'center', fontSize:12, color:'#A89B8C', marginTop:14 }}>
                No account? <button type="button" onClick={() => setTab('signup')} style={{ background:'none', border:'none', color:'#8B1A1A', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Create one free</button>
              </p>
            </form>
          )}
        </div>

        <p style={{ textAlign:'center', fontSize:12, color:'#A89B8C', marginTop:20 }}>
          <Link href="/" style={{ color:'#C0570A', textDecoration:'none' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
