'use client'
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
      <style>{`
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
      `}</style>
      <div className="page">
        <Link href="/" className="back">← Back to Home</Link>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'#C0570A',marginBottom:10}}>Get In Touch</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,color:'#1A0A00',marginBottom:16}}>Contact Us</h1>
        <p style={{fontSize:'1.05rem',color:'#6B5B4E',lineHeight:1.8,marginBottom:40}}>
          Have a question, suggestion or want to partner with us? We would love to hear from you.
          Write to us at <strong style={{color:'#8B1A1A'}}>chirag@dynaimers.com</strong>
        </p>

        {status === 'sent' ? (
          <div style={{background:'#F0FDF4',border:'1.5px solid rgba(34,197,94,0.3)',borderRadius:16,padding:32,textAlign:'center'}}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
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
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>
          </form>
        )}

        <div style={{marginTop:48,display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:12,padding:20}}>
            <p style={{fontWeight:700,color:'#8B1A1A',marginBottom:4}}>📧 Email</p>
            <p style={{fontSize:14,color:'#6B5B4E'}}>chirag@dynaimers.com</p>
          </div>
          <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:12,padding:20}}>
            <p style={{fontWeight:700,color:'#8B1A1A',marginBottom:4}}>📍 Location</p>
            <p style={{fontSize:14,color:'#6B5B4E'}}>Pune, Maharashtra, India</p>
          </div>
        </div>
      </div>
    </>
  )
}
