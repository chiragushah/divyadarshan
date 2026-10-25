'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, XCircle, Clock, Loader2 } from 'lucide-react'
import VerifyNotice from '@/components/auth/VerifyNotice'

type State = { s: 'working' } | { s: 'ok'; email: string } | { s: 'expired'; email: string } | { s: 'invalid' } | { s: 'error' }

function Inner() {
  const token = useSearchParams().get('token') || ''
  const [st, setSt] = useState<State>({ s: 'working' })
  const [asked, setAsked] = useState(false)
  const [email, setEmail] = useState('')
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return; ran.current = true
    if (!token) { setSt({ s: 'invalid' }); return }
    fetch('/api/auth/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
      .then(async r => { const d = await r.json().catch(() => ({})); setSt(d.status === 'verified' ? { s: 'ok', email: d.email } : d.status === 'expired' ? { s: 'expired', email: d.email } : r.status === 400 ? { s: 'invalid' } : { s: 'error' }) })
      .catch(() => setSt({ s: 'error' }))
  }, [token])

  const card = (icon: React.ReactNode, title: string, body: React.ReactNode, actions?: React.ReactNode) => (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, fontWeight: 700, marginBottom: 8, color: '#111' }}>{title}</h1>
      <div style={{ fontSize: 14.5, lineHeight: 1.7, color: '#555', marginBottom: 18 }}>{body}</div>
      {actions}
    </div>
  )
  const btn = { display: 'inline-block', background: '#8B1A1A', color: 'white', fontWeight: 700, fontSize: 15, padding: '12px 28px', borderRadius: 10, textDecoration: 'none', border: 'none', cursor: 'pointer' } as const

  return (
    <div style={{ minHeight: '100vh', background: '#FDFAF6', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'Inter',sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'white', border: '1px solid #E8DCC8', borderTop: '5px solid #8B1A1A', borderRadius: 16, padding: '30px 26px', boxShadow: '0 6px 30px rgba(139,26,26,.07)' }}>
        <div style={{ textAlign: 'center', fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 700, color: '#8B1A1A', marginBottom: 18 }}>DivyaDarshanam</div>
        {st.s === 'working' && card(<Loader2 size={34} className="animate-spin" color="#C0570A" />, 'Confirming your email…', 'One moment please.')}
        {st.s === 'ok' && card(<CheckCircle2 size={44} color="#15803d" />, 'Email confirmed 🙏', <>Your account is now active. Sign in to begin your yatra.</>, <Link href="/auth/signin?verified=1" style={btn}>Sign in</Link>)}
        {st.s === 'expired' && !asked && card(<Clock size={44} color="#C0570A" />, 'This link has expired', <>Confirmation links work for 24 hours. We can send you a fresh one.</>,
          <button style={btn} onClick={async () => { setEmail(st.email); await fetch('/api/auth/resend', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: st.email }) }).catch(() => {}); setAsked(true) }}>Send me a new link</button>)}
        {st.s === 'expired' && asked && <VerifyNotice email={email} initialWait={60} onBack={() => { window.location.href = '/auth/signin' }} />}
        {st.s === 'invalid' && card(<XCircle size={44} color="#b91c1c" />, 'This link is not valid', <>It may have been used already, or copied incompletely. If you have confirmed already, just sign in. Otherwise, sign in and we will send a new link.</>, <Link href="/auth/signin" style={btn}>Go to sign in</Link>)}
        {st.s === 'error' && card(<XCircle size={44} color="#b91c1c" />, 'Something went wrong', <>We could not confirm your email just now. Please try the link again in a minute.</>, <button style={btn} onClick={() => window.location.reload()}>Try again</button>)}
      </div>
    </div>
  )
}

export default function VerifyPage() { return <Suspense><Inner /></Suspense> }
