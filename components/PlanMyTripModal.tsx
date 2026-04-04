'use client'
import { useState } from 'react'
import { Loader2, X, CheckCircle, Phone, Mail, User, MapPin, IndianRupee, FileText } from 'lucide-react'

interface Props {
  form: {
    from: string
    to: string
    days: number
    pilgrims: number
    mode: string
    deity: string
    notes: string
  }
  itinerary: string
  user?: {
    name?: string | null
    email?: string | null
  } | null
  onClose: () => void
}

const BUDGET_OPTIONS = [
  '₹5,000 - ₹10,000 per person',
  '₹10,000 - ₹20,000 per person',
  '₹20,000 - ₹35,000 per person',
  '₹35,000 - ₹50,000 per person',
  '₹50,000+ per person (Premium)',
  'Flexible / Not sure yet',
]

export default function PlanMyTripModal({ form, itinerary, user, onClose }: Props) {
  const [data, setData] = useState({
    name:          user?.name  || '',
    email:         user?.email || '',
    phone:         '',
    city:          form.from   || '',
    from:          form.from   || '',
    to:            form.to     || '',
    days:          form.days   || 3,
    pilgrims:      form.pilgrims || 2,
    mode:          form.mode   || 'Mixed',
    deity:         form.deity  || '',
    budget:        '',
    special_notes: form.notes  || '',
  })
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)
  const [error,    setError]    = useState('')

  const set = (k: string, v: any) => setData(d => ({ ...d, [k]: v }))

  async function handleSubmit() {
    if (!data.name || !data.email || !data.phone) {
      setError('Please fill in your name, email and phone number.')
      return
    }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/yatra/plan-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ai_itinerary: itinerary }),
      })
      const result = await res.json()
      if (result.error) { setError(result.error); return }
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>

      <div className="w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: 'var(--card)', border: '1.5px solid var(--border)', maxHeight: '90vh', overflowY: 'auto' }}>

        {/* Header */}
        <div style={{ background: 'var(--crimson)', padding: '20px 24px' }}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-white">Plan My Trip</h2>
              <p style={{ color: 'rgba(237,224,196,0.85)', fontSize: 13, marginTop: 4 }}>
                Our travel experts will craft a perfect pilgrimage for you
              </p>
            </div>
            <button onClick={onClose} style={{ color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>
              <X size={20} />
            </button>
          </div>

          {/* Trip summary chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { icon: '📍', label: `${data.from} → ${data.to}` },
              { icon: '📅', label: `${data.days} Days` },
              { icon: '👥', label: `${data.pilgrims} Pilgrims` },
              data.deity && { icon: '🛕', label: data.deity },
            ].filter(Boolean).map((chip: any, i) => (
              <span key={i} style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                fontSize: 11,
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                {chip.icon} {chip.label}
              </span>
            ))}
          </div>
        </div>

        {success ? (
          <div className="flex flex-col items-center py-12 px-6 text-center gap-4">
            <CheckCircle size={48} style={{ color: '#16A34A' }} />
            <h3 className="font-serif text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
              Request Received! 🙏
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)', maxWidth: 360 }}>
              Our travel experts will review your pilgrimage request and get back to you within
              <strong> 24 hours</strong> on <strong>{data.phone}</strong> or <strong>{data.email}</strong>.
            </p>
            <div className="card card-p w-full text-left mt-2"
              style={{ background: 'var(--ivory2)', border: '1.5px solid var(--border)' }}>
              <p className="text-xs font-semibold mb-2" style={{ color: 'var(--muted2)' }}>WHAT HAPPENS NEXT</p>
              {[
                '📞 Our expert calls you within 24 hours',
                '🗺️ We create a personalised day-by-day itinerary',
                '🏨 We handle hotel, train & darshan bookings',
                '💰 You pay only after approving the plan',
              ].map((s, i) => (
                <p key={i} className="text-sm py-1.5 border-b last:border-0"
                  style={{ color: 'var(--ink)', borderColor: 'var(--border)' }}>{s}</p>
              ))}
            </div>
            <button onClick={onClose} className="btn btn-primary mt-2">Done</button>
          </div>
        ) : (
          <div className="p-6 space-y-4">

            {/* Value proposition */}
            <div className="rounded-xl p-4 flex gap-3"
              style={{ background: 'linear-gradient(135deg, #FFF5F0, #FFF8F0)', border: '1.5px solid #FFD9B3' }}>
              <span style={{ fontSize: 28, flexShrink: 0 }}>🛕</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                  Expert-planned pilgrimage — end to end
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                  Hotels, darshan slots, trains, local guides — we handle everything so you focus only on devotion.
                </p>
              </div>
            </div>

            {/* Your Details */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted2)' }}>
                Your Details
              </p>
              <div className="space-y-3">
                <div className="relative">
                  <User size={14} className="absolute left-3 top-3.5" style={{ color: 'var(--muted2)' }} />
                  <input className="input pl-9" placeholder="Full name *"
                    value={data.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-3.5" style={{ color: 'var(--muted2)' }} />
                  <input className="input pl-9" placeholder="Email address *" type="email"
                    value={data.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-3.5" style={{ color: 'var(--muted2)' }} />
                  <input className="input pl-9" placeholder="WhatsApp / phone number *" type="tel"
                    value={data.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Trip Details — editable */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--muted2)' }}>
                Trip Details
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">From City</label>
                  <input className="input" value={data.from} onChange={e => set('from', e.target.value)} />
                </div>
                <div>
                  <label className="label">Destination</label>
                  <input className="input" value={data.to} onChange={e => set('to', e.target.value)} />
                </div>
                <div>
                  <label className="label">Duration (Days)</label>
                  <input className="input" type="number" min={1} max={30}
                    value={data.days} onChange={e => set('days', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="label">Pilgrims</label>
                  <input className="input" type="number" min={1} max={50}
                    value={data.pilgrims} onChange={e => set('pilgrims', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="label">Travel Mode</label>
                  <select className="input" value={data.mode} onChange={e => set('mode', e.target.value)}>
                    {['Train', 'Flight', 'Road / Car', 'Bus', 'Mixed'].map(m => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Deity Focus</label>
                  <input className="input" placeholder="e.g. Shiva, Vishnu…"
                    value={data.deity} onChange={e => set('deity', e.target.value)} />
                </div>
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="label">Budget per Person</label>
              <select className="input" value={data.budget} onChange={e => set('budget', e.target.value)}>
                <option value="">Select your budget range…</option>
                {BUDGET_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Special notes */}
            <div>
              <label className="label">Special Requirements (optional)</label>
              <textarea className="input h-20 resize-none"
                placeholder="e.g. elderly pilgrims, wheelchair access, vegetarian only, specific festivals, VIP darshan…"
                value={data.special_notes}
                onChange={e => set('special_notes', e.target.value)} />
            </div>

            {error && (
              <p className="text-xs px-3 py-2 rounded-lg"
                style={{ background: '#FFF0F0', color: 'var(--live)', border: '1px solid #FFCDD2' }}>
                {error}
              </p>
            )}

            <button onClick={handleSubmit} disabled={loading}
              className="btn btn-primary w-full justify-center text-base py-3">
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                : '🛕 Send My Trip Request →'}
            </button>

            <p className="text-xs text-center" style={{ color: 'var(--muted2)' }}>
              No payment now · Our expert contacts you within 24 hours · Pay only after approval
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
