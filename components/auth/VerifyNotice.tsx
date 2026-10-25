'use client'
import { useEffect, useState } from 'react'
import { MailCheck, Loader2 } from 'lucide-react'

const INBOX: Record<string, { name: string; url: string }> = {
  'gmail.com': { name: 'Gmail', url: 'https://mail.google.com' },
  'googlemail.com': { name: 'Gmail', url: 'https://mail.google.com' },
  'outlook.com': { name: 'Outlook', url: 'https://outlook.live.com/mail' },
  'hotmail.com': { name: 'Outlook', url: 'https://outlook.live.com/mail' },
  'live.com': { name: 'Outlook', url: 'https://outlook.live.com/mail' },
  'yahoo.com': { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' },
  'yahoo.in': { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' },
  'yahoo.co.in': { name: 'Yahoo Mail', url: 'https://mail.yahoo.com' },
  'rediffmail.com': { name: 'Rediffmail', url: 'https://mail.rediff.com' },
}

/** "Check your inbox" screen shown after sign-up, and when an unconfirmed account tries to sign in. */
export default function VerifyNotice({ email, initialWait = 60, onBack }: { email: string; initialWait?: number; onBack: () => void }) {
  const [wait, setWait] = useState(initialWait)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)
  useEffect(() => { if (wait <= 0) return; const t = setTimeout(() => setWait(w => w - 1), 1000); return () => clearTimeout(t) }, [wait])
  const inbox = INBOX[(email.split('@')[1] || '').toLowerCase()]

  const resend = async () => {
    setBusy(true); setMsg(null)
    try {
      const r = await fetch('/api/auth/resend', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) })
      const d = await r.json().catch(() => ({}))
      if (r.ok) { setMsg({ ok: true, text: 'A new email is on its way. Please check your inbox and spam folder.' }); setWait(60) }
      else if (r.status === 429 && d.wait) { setWait(d.wait); setMsg({ ok: false, text: `Please wait ${d.wait} seconds before asking again.` }) }
      else setMsg({ ok: false, text: d.error || 'Could not send the email. Please try again shortly.' })
    } catch { setMsg({ ok: false, text: 'Network problem. Please try again.' }) }
    setBusy(false)
  }

  return (
    <div role="status" style={{ textAlign: 'center', padding: '8px 4px' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#FFF5F0', border: '2px solid #E8C4A0', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><MailCheck size={30} color="#C0570A" /></div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 700, color: '#111', marginBottom: 8 }}>Check your inbox</h2>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: '#555', marginBottom: 4 }}>We sent a confirmation link to</p>
      <p style={{ fontSize: 15, fontWeight: 700, color: '#8B1A1A', wordBreak: 'break-all', marginBottom: 14 }}>{email}</p>
      <ol style={{ textAlign: 'left', fontSize: 13.5, lineHeight: 1.8, color: '#444', background: '#FAFAFA', border: '1px solid #E8E8E8', borderRadius: 12, padding: '12px 14px 12px 32px', margin: '0 0 14px' }}>
        <li>Open the email from <strong>DivyaDarshanam</strong></li>
        <li>Tap <strong>Confirm my email</strong></li>
        <li>Come back here and sign in</li>
      </ol>
      {inbox && <a href={inbox.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', background: '#8B1A1A', color: 'white', fontWeight: 700, fontSize: 14, padding: '11px 16px', borderRadius: 10, textDecoration: 'none', marginBottom: 10 }}>Open {inbox.name}</a>}
      <p style={{ fontSize: 12.5, color: '#888', lineHeight: 1.6, marginBottom: 12 }}>Not there after a minute? Look in <strong>Spam</strong> or <strong>Promotions</strong>. The link works for 24 hours.</p>
      <button onClick={resend} disabled={busy || wait > 0} style={{ width: '100%', padding: '11px 16px', borderRadius: 10, border: '1.5px solid #E8C4A0', background: 'white', color: wait > 0 ? '#aaa' : '#9A4208', fontWeight: 700, fontSize: 14, cursor: busy || wait > 0 ? 'default' : 'pointer', display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        {busy ? <><Loader2 size={15} className="animate-spin" /> Sending…</> : wait > 0 ? `Resend email in ${wait}s` : 'Resend confirmation email'}
      </button>
      {msg && <p role={msg.ok ? 'status' : 'alert'} style={{ fontSize: 13, fontWeight: 600, marginTop: 10, color: msg.ok ? '#15803d' : '#b91c1c' }}>{msg.text}</p>}
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#888', fontSize: 12.5, marginTop: 14, cursor: 'pointer', textDecoration: 'underline' }}>Wrong email? Go back</button>
    </div>
  )
}
