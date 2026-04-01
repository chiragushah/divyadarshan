'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2, MapPin, Clock, Users, ChevronRight, Check, X, Phone, Mail } from 'lucide-react'

export default function PackageDetailPage() {
  const { slug } = useParams()
  const [pkg, setPkg] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name:'', email:'', phone:'', city:'', pilgrims:'2', travel_date:'', budget:'', message:'' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeDay, setActiveDay] = useState(0)

  useEffect(() => {
    fetch('/api/packages').then(r => r.json()).then(d => {
      const found = d.packages?.find((p: any) => p.slug === slug)
      setPkg(found || null)
      setLoading(false)
    })
  }, [slug])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, type: 'package', package_slug: pkg.slug, package_title: pkg.title }),
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  if (loading) return <div className="flex items-center justify-center h-96 gap-3" style={{ color: 'var(--muted)' }}><Loader2 size={20} className="animate-spin" /></div>
  if (!pkg) return <div className="text-center py-20"><h2 className="font-serif text-2xl">Package not found</h2><Link href="/packages" className="btn btn-primary mt-4">View all packages</Link></div>

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex items-center gap-1.5" style={{ color: 'var(--muted2)' }}>
        <Link href="/packages">Packages</Link> / <span style={{ color: 'var(--ink)' }}>{pkg.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2">
          {/* Hero */}
          <div className="rounded-2xl overflow-hidden h-72 mb-6 relative" style={{ background: 'var(--crimson)' }}>
            {pkg.image_url && <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              {pkg.is_featured && <span className="text-xs font-bold px-2 py-0.5 rounded mb-2 inline-block" style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>⭐ Featured Package</span>}
              <h1 className="font-serif text-3xl font-medium text-white">{pkg.title}</h1>
              <p className="text-sm mt-1" style={{ color: 'rgba(237,224,196,.8)' }}>{pkg.subtitle}</p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { icon: Clock, label: 'Duration', val: `${pkg.duration_days} days` },
              { icon: MapPin, label: 'States', val: pkg.states?.join(', ') },
              { icon: Users, label: 'Group', val: pkg.group_size },
              { icon: ChevronRight, label: 'Difficulty', val: pkg.difficulty },
            ].map(s => (
              <div key={s.label} className="card card-p text-center py-3">
                <s.icon size={16} className="mx-auto mb-1" style={{ color: 'var(--crimson)' }} />
                <div className="text-xs font-semibold" style={{ color: 'var(--muted2)' }}>{s.label}</div>
                <div className="text-sm font-medium mt-0.5">{s.val}</div>
              </div>
            ))}
          </div>

          {/* Highlights */}
          {pkg.highlights?.length > 0 && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-medium mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.highlights.map((h: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">🛕</span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary */}
          {pkg.itinerary?.length > 0 && (
            <div className="mb-8">
              <h2 className="font-serif text-2xl font-medium mb-4">Day-by-Day Itinerary</h2>
              <div className="flex gap-2 flex-wrap mb-4">
                {pkg.itinerary.map((_: any, i: number) => (
                  <button key={i} onClick={() => setActiveDay(i)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
                    style={activeDay === i
                      ? { background: 'var(--crimson)', color: 'white' }
                      : { background: 'var(--sandstone)', color: 'var(--muted)' }
                    }>
                    Day {i + 1}
                  </button>
                ))}
              </div>
              <div className="card card-p">
                <div className="font-serif text-lg font-medium mb-2">{pkg.itinerary[activeDay]?.title}</div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{pkg.itinerary[activeDay]?.description}</p>
                {pkg.itinerary[activeDay]?.temples?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {pkg.itinerary[activeDay].temples.map((t: string) => (
                      <span key={t} className="text-xs px-2 py-1 rounded" style={{ background: 'var(--saffron-pale)', color: 'var(--saffron)' }}>🛕 {t}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Inclusions / Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {pkg.inclusions?.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-medium mb-3">✅ Inclusions</h3>
                <ul className="space-y-2">
                  {pkg.inclusions.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                      <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#16a34a' }} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {pkg.exclusions?.length > 0 && (
              <div>
                <h3 className="font-serif text-lg font-medium mb-3">❌ Exclusions</h3>
                <ul className="space-y-2">
                  {pkg.exclusions.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                      <X size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#dc2626' }} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right — Enquiry Form */}
        <div>
          <div className="card card-p sticky top-6">
            <div className="font-serif text-2xl font-medium mb-1">₹{pkg.price_from?.toLocaleString('en-IN')}<span className="text-sm font-sans font-normal" style={{ color: 'var(--muted2)' }}> /person onwards</span></div>
            {pkg.price_to && <p className="text-xs mb-4" style={{ color: 'var(--muted2)' }}>Up to ₹{pkg.price_to.toLocaleString('en-IN')} for premium</p>}

            {submitted ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-3">🙏</div>
                <h3 className="font-serif text-xl font-medium mb-2">Enquiry Received!</h3>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>We will call you within 24 hours. Check your email for confirmation.</p>
                <div className="mt-4 p-3 rounded-lg text-sm" style={{ background: 'var(--sandstone)', color: 'var(--muted)' }}>
                  📞 For urgent queries: <strong>+91 98765 43210</strong>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-3">
                <h3 className="font-serif text-lg font-medium">Enquire Now</h3>
                {[
                  { key:'name', label:'Full Name', type:'text', required:true },
                  { key:'email', label:'Email', type:'email', required:true },
                  { key:'phone', label:'WhatsApp Number', type:'tel', required:true },
                  { key:'city', label:'Your City', type:'text', required:false },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--muted2)' }}>{f.label}{f.required && ' *'}</label>
                    <input type={f.type} required={f.required} placeholder={f.label}
                      value={(form as any)[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      className="input w-full" />
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--muted2)' }}>Pilgrims</label>
                    <select value={form.pilgrims} onChange={e => setForm(p => ({ ...p, pilgrims: e.target.value }))} className="input w-full">
                      {[1,2,3,4,5,6,8,10,15,20].map(n => <option key={n} value={n}>{n} {n===1?'pilgrim':'pilgrims'}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--muted2)' }}>Travel Month</label>
                    <select value={form.travel_date} onChange={e => setForm(p => ({ ...p, travel_date: e.target.value }))} className="input w-full">
                      <option value="">Select month</option>
                      {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m}>{m} 2025</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--muted2)' }}>Message (optional)</label>
                  <textarea rows={2} placeholder="Any special requirements, accessibility needs, etc."
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="input w-full resize-none" />
                </div>
                <button type="submit" disabled={submitting}
                  className="btn btn-primary w-full justify-center">
                  {submitting ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : '🙏 Send Enquiry'}
                </button>
                <p className="text-center text-xs" style={{ color: 'var(--muted2)' }}>
                  We respond within 24 hours via WhatsApp & Email
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
