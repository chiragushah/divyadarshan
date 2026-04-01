'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function CustomPackagePage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', city:'', pilgrims:'2', travel_date:'', budget:'', temples:'', message:'' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, type: 'custom', package_title: 'Custom Yatra Request' }),
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  if (submitted) return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-4">🙏</div>
      <h2 className="font-serif text-3xl font-medium mb-3">Request Received!</h2>
      <p className="mb-6" style={{ color:'var(--muted)' }}>Our yatra expert will call you within 24 hours on your WhatsApp number.</p>
      <Link href="/packages" className="btn btn-primary">View All Packages</Link>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="section-label">Personalised Pilgrimage</div>
        <h1 className="font-serif text-4xl font-medium mb-3">Custom Yatra Request</h1>
        <p style={{ color:'var(--muted)' }}>Tell us what you have in mind — temples, dates, group size and budget. We design the perfect itinerary.</p>
      </div>
      <form onSubmit={submit} className="card card-p space-y-4">
        {[
          { key:'name',  label:'Full Name',      type:'text',  req:true  },
          { key:'email', label:'Email',           type:'email', req:true  },
          { key:'phone', label:'WhatsApp Number', type:'tel',   req:true  },
          { key:'city',  label:'Your City',       type:'text',  req:false },
        ].map(f => (
          <div key={f.key}>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color:'var(--muted2)' }}>{f.label}{f.req && ' *'}</label>
            <input type={f.type} required={f.req} placeholder={f.label}
              value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
              className="input w-full" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color:'var(--muted2)' }}>Pilgrims</label>
            <select value={form.pilgrims} onChange={e => setForm(p => ({ ...p, pilgrims: e.target.value }))} className="input w-full">
              {[1,2,3,4,5,6,8,10,15,20,25,30].map(n => <option key={n} value={n}>{n} {n===1?'pilgrim':'pilgrims'}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color:'var(--muted2)' }}>Budget/Person</label>
            <select value={form.budget} onChange={e => setForm(p => ({ ...p, budget: e.target.value }))} className="input w-full">
              <option value="">Select budget</option>
              <option>Under ₹10,000</option>
              <option>₹10,000 - ₹25,000</option>
              <option>₹25,000 - ₹50,000</option>
              <option>₹50,000 - ₹1,00,000</option>
              <option>Above ₹1,00,000</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color:'var(--muted2)' }}>Temples / Circuit You Want *</label>
          <textarea rows={3} required placeholder="e.g. 4 Jyotirlingas in Maharashtra, or Vaishno Devi + Amarnath, or full South India circuit"
            value={form.temples} onChange={e => setForm(p => ({ ...p, temples: e.target.value }))}
            className="input w-full resize-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color:'var(--muted2)' }}>Additional Requirements</label>
          <textarea rows={3} placeholder="Accessibility needs, dietary preferences, accommodation type, travel style..."
            value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
            className="input w-full resize-none" />
        </div>
        <button type="submit" disabled={submitting} className="btn btn-primary w-full justify-center">
          {submitting ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : '🙏 Request Custom Yatra'}
        </button>
        <p className="text-center text-xs" style={{ color:'var(--muted2)' }}>We respond within 24 hours via WhatsApp & Email</p>
      </form>
    </div>
  )
}
