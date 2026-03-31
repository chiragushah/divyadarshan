'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      setError('Invalid credentials. Access denied.')
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        * { margin:0;padding:0;box-sizing:border-box; }
        body { font-family:'Outfit',sans-serif; background:#0A0A0F; color:#F0F0F5; height:100vh; display:flex; align-items:center; justify-content:center; }
        .card { background:#13131A; border:1px solid #2A2A35; border-radius:16px; padding:2.5rem; width:100%; max-width:380px; }
        .logo { display:flex;align-items:center;gap:.75rem;margin-bottom:2rem;justify-content:center; }
        .logo-icon { width:42px;height:42px;background:linear-gradient(135deg,#C0570A,#9A4208);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px; }
        .logo-title { font-size:1.2rem;font-weight:700; }
        .badge { font-size:.6rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;background:rgba(192,87,10,.15);color:#F0844A;border:1px solid rgba(192,87,10,.3);padding:.2rem .6rem;border-radius:100px;display:block;text-align:center;margin-bottom:2rem; }
        h1 { font-size:1.5rem;font-weight:700;margin-bottom:.25rem; }
        p { font-size:.82rem;color:#7A7A8A;margin-bottom:1.5rem; }
        .field { margin-bottom:1rem; }
        .field label { display:block;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#9A9AAA;margin-bottom:.35rem; }
        .field input { width:100%;padding:.75rem 1rem;background:#1E1E28;border:1.5px solid #2A2A35;border-radius:9px;font-family:'Outfit',sans-serif;font-size:.88rem;color:#F0F0F5;outline:none;transition:border-color .2s; }
        .field input:focus { border-color:#C0570A; }
        .field input::placeholder { color:#4A4A5A; }
        .err { background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;padding:.7rem 1rem;font-size:.8rem;color:#FCA5A5;margin-bottom:1rem; }
        .btn { width:100%;padding:.85rem;background:#C0570A;color:white;border:none;border-radius:9px;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:700;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.5rem;margin-top:.5rem; }
        .btn:hover:not(:disabled) { background:#9A4208;transform:translateY(-1px);box-shadow:0 6px 20px rgba(192,87,10,.35); }
        .btn:disabled { opacity:.6;cursor:not-allowed; }
        .warn { text-align:center;font-size:.68rem;color:#4A4A5A;margin-top:1.25rem; }
      `}</style>
      <div className="card">
        <div className="logo">
          <div className="logo-icon">🛡️</div>
          <span className="logo-title">DivyaDarshan</span>
        </div>
        <span className="badge">Admin Portal · Restricted Access</span>
        <h1>Admin Sign In</h1>
        <p>Authorised personnel only. All access is logged.</p>
        {error && <div className="err">{error}</div>}
        <form onSubmit={submit}>
          <div className="field">
            <label>Admin Email</label>
            <input type="email" placeholder="admin@dynaimers.com" required
              value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} />
          </div>
          <div className="field">
            <label>Password</label>
            <input type="password" placeholder="••••••••••••" required
              value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? <><Loader2 size={15} className="animate-spin" /> Verifying…</> : 'Access Admin Dashboard →'}
          </button>
        </form>
        <p className="warn">🔒 This portal is monitored. Unauthorised access attempts are logged.</p>
      </div>
    </>
  )
}
