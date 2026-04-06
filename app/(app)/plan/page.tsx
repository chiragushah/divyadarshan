'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { finverseLink } from '@/lib/utils'
import ItineraryRenderer from '@/components/ItineraryRenderer'
import PlanActionBar from '@/components/PlanActionBar'
import PlanMyTripModal from '@/components/PlanMyTripModal'

function PlannerForm() {
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const destination = searchParams.get('destination') || ''
  const deity       = searchParams.get('deity') || ''
  const city        = searchParams.get('city') || ''
  const state       = searchParams.get('state') || ''
  const prefilledFrom = destination || city || state

  const [form, setForm] = useState({
    from:     '',
    to:       destination,
    mode:     'Train',
    days:     3,
    pilgrims: 2,
    deity:    deity,
    auspicious_date: '',
    notes:    city && state ? `Temple located in ${city}, ${state}.` : '',
  })
  const [result,   setResult]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [provider, setProvider] = useState('')
  const [error,    setError]    = useState('')
  const [showPlanModal, setShowPlanModal] = useState(false)

  useEffect(() => {
    setForm(f => ({
      ...f,
      to:    destination || f.to,
      deity: deity || f.deity,
      notes: city && state ? `Temple located in ${city}, ${state}.` : f.notes,
    }))
  }, [destination, deity, city, state])

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  // Auspicious dates 2026
  const AUSPICIOUS_DATES = [
    { date: '2026-01-14', label: 'Makar Sankranti', type: 'festival' },
    { date: '2026-01-26', label: 'Basant Panchami', type: 'festival' },
    { date: '2026-02-11', label: 'Mahashivratri', type: 'major' },
    { date: '2026-02-26', label: 'Holi', type: 'festival' },
    { date: '2026-03-13', label: 'Ram Navami', type: 'major' },
    { date: '2026-03-20', label: 'Hanuman Jayanti', type: 'major' },
    { date: '2026-04-06', label: 'Ekadashi (Papamochani)', type: 'ekadashi' },
    { date: '2026-04-13', label: 'Purnima (Chaitra)', type: 'purnima' },
    { date: '2026-04-14', label: 'Baisakhi / Tamil New Year', type: 'festival' },
    { date: '2026-04-21', label: 'Ekadashi (Kamada)', type: 'ekadashi' },
    { date: '2026-04-28', label: 'Amavasya', type: 'amavasya' },
    { date: '2026-05-05', label: 'Ekadashi (Varuthini)', type: 'ekadashi' },
    { date: '2026-05-12', label: 'Purnima (Vaishakha)', type: 'purnima' },
    { date: '2026-05-20', label: 'Ekadashi (Mohini)', type: 'ekadashi' },
    { date: '2026-06-03', label: 'Ekadashi (Apara)', type: 'ekadashi' },
    { date: '2026-06-11', label: 'Purnima (Jyeshtha)', type: 'purnima' },
    { date: '2026-06-18', label: 'Ekadashi (Nirjala) — Most sacred', type: 'ekadashi' },
    { date: '2026-07-10', label: 'Purnima / Guru Purnima', type: 'purnima' },
    { date: '2026-08-03', label: 'Hariyali Teej', type: 'festival' },
    { date: '2026-08-09', label: 'Purnima (Shravana)', type: 'purnima' },
    { date: '2026-08-14', label: 'Janmashtami', type: 'major' },
    { date: '2026-09-17', label: 'Ganesh Chaturthi', type: 'major' },
    { date: '2026-10-01', label: 'Navratri begins', type: 'major' },
    { date: '2026-10-12', label: 'Dussehra', type: 'festival' },
    { date: '2026-10-20', label: 'Kojagiri Purnima', type: 'purnima' },
    { date: '2026-11-01', label: 'Diwali', type: 'major' },
    { date: '2026-11-05', label: 'Chhath Puja', type: 'festival' },
    { date: '2026-12-18', label: 'Purnima (Margashirsha)', type: 'purnima' },
  ]
  const AUSPICIOUS_COLORS: Record<string,string> = {
    major:     '#8B1A1A',
    festival:  '#C0570A',
    ekadashi:  '#166534',
    purnima:   '#1E40AF',
    amavasya:  '#4B5563',
  }
  const upcomingDates = AUSPICIOUS_DATES.filter(d => d.date >= new Date().toISOString().slice(0,10)).slice(0, 12)


  const generate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.from || !form.to) return
    setLoading(true); setResult(''); setError('')
    try {
      const res = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          notes: [
            form.notes,
            form.auspicious_date ? `IMPORTANT: The pilgrim wants to travel on or around ${form.auspicious_date} which is ${(AUSPICIOUS_DATES || []).find((d: any) => d.date === form.auspicious_date)?.label || 'an auspicious date'}. Please align the itinerary so they arrive and do main darshan on this sacred day.` : ''
          ].filter(Boolean).join(' ')
        }),
      })
      const data = await res.json()
      if (data.error) { setError(data.error); return }
      setResult(data.itinerary)
      setProvider(data.provider)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="section-title">Powered by Claude AI</div>
        <h1 className="font-serif text-4xl font-medium">AI Yatra Planner</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
          Get a complete day-wise pilgrimage itinerary with routes, stays, darshan timings and insider tips.
        </p>
      </div>

      {/* Pre-filled banner */}
      {prefilledFrom && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-5 text-sm"
          style={{ background: 'rgba(192,87,10,.08)', border: '1.5px solid rgba(192,87,10,.2)', color: 'var(--saffron)' }}>
          <span style={{ fontSize: 18 }}>🛕</span>
          <div>
            <span className="font-semibold">Pre-filled from temple: </span>
            <span>{destination}</span>
            {city && state && <span className="ml-1" style={{ color: 'var(--muted2)', fontSize: 12 }}>({city}, {state})</span>}
          </div>
          <button
            onClick={() => setForm({ from: '', to: '', mode: 'Train', days: 3, pilgrims: 2, deity: '', notes: '' })}
            className="ml-auto text-xs underline"
            style={{ color: 'var(--muted2)' }}>
            Clear
          </button>
        </div>
      )}

      {/* Form */}
      <div className="card card-p mb-6">
        <form onSubmit={generate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Starting City</label>
              <input className="input" placeholder="e.g. Mumbai, Delhi, Pune…"
                value={form.from} onChange={e => set('from', e.target.value)} required />
            </div>
            <div>
              <label className="label">Destination / Yatra</label>
              <input className="input" placeholder="e.g. Char Dham, Varanasi, Tirupati…"
                value={form.to} onChange={e => set('to', e.target.value)} required />
            </div>
            <div>
              <label className="label">Travel Mode</label>
              <select className="input" value={form.mode} onChange={e => set('mode', e.target.value)}>
                {['Train', 'Flight', 'Road / Car', 'Bus', 'Mixed'].map(m => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Duration (Days)</label>
              <input className="input" type="number" min={1} max={30}
                value={form.days} onChange={e => set('days', parseInt(e.target.value))} />
            </div>
            <div>
              <label className="label">Number of Pilgrims</label>
              <input className="input" type="number" min={1} max={20}
                value={form.pilgrims} onChange={e => set('pilgrims', parseInt(e.target.value))} />
            </div>
            <div>
              <label className="label">Deity Focus (optional)</label>
              <input className="input" placeholder="e.g. Shiva, Vishnu, Devi…"
                value={form.deity} onChange={e => set('deity', e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className="label">Special Requests (optional)</label>
              <textarea className="input h-20 resize-none"
                placeholder="Budget trip, elderly pilgrims, specific festivals, vegetarian only, no trekking…"
                value={form.notes} onChange={e => set('notes', e.target.value)} />
            </div>
          </div>
          <button type="submit" disabled={loading || !form.from || !form.to}
            className="btn btn-primary mt-5 w-full md:w-auto">
            {loading
              ? <><Loader2 size={16} className="animate-spin" /> Generating Itinerary…</>
              : 'Generate Pilgrimage Plan'}
          </button>
        </form>
      </div>

      {/* Error */}
      {error && (
        <div className="card card-p mb-4 text-sm"
          style={{ background: '#FFF0F0', color: 'var(--live)', borderColor: '#FFCDD2' }}>
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="card card-p">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-medium">Your Yatra Plan</h2>
          </div>

          <ItineraryRenderer text={result} />
          <PlanActionBar itinerary={result} form={form} />

          {/* Plan My Trip — Premium CTA */}
          <div className="mt-6 rounded-2xl overflow-hidden" style={{ border: '2px solid var(--crimson)' }}>
            <div style={{ background: 'var(--crimson)', padding: '16px 20px' }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1"
                    style={{ color: 'rgba(237,224,196,0.7)' }}>Premium Service</div>
                  <h3 className="font-serif text-xl font-semibold text-white">Want us to plan this trip for you?</h3>
                  <p className="text-sm mt-1" style={{ color: 'rgba(237,224,196,0.8)' }}>
                    Our travel experts handle hotels, darshan slots, trains and local guides — end to end.
                  </p>
                </div>
                <span style={{ fontSize: 36, flexShrink: 0 }}>🛕</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['✓ Personalised itinerary', '✓ Hotel & train bookings', '✓ VIP darshan slots', '✓ Local guide coordination'].map(f => (
                  <span key={f} style={{
                    background: 'rgba(255,255,255,0.12)', color: 'white', fontSize: 11, fontWeight: 600,
                    padding: '3px 10px', borderRadius: 20, border: '1px solid rgba(255,255,255,0.2)',
                  }}>{f}</span>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--ivory2)', padding: '14px 20px' }}
              className="flex items-center justify-between gap-4">
              <p className="text-xs" style={{ color: 'var(--muted)' }}>
                No payment now · Expert contacts you in 24 hrs · Pay only after approval
              </p>
              <button onClick={() => setShowPlanModal(true)}
                className="btn btn-primary whitespace-nowrap" style={{ flexShrink: 0 }}>
                Plan My Trip →
              </button>
            </div>
          </div>

          {/* PLAN & BOOK */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
            <h3 className="font-serif text-xl font-medium mb-1">Plan & Book Your Trip</h3>
            <p className="text-xs mb-4" style={{ color: 'var(--muted2)' }}>
              From <strong>{form.from}</strong> to <strong>{form.to}</strong> — book everything in one place
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { icon: '🏨', label: 'Hotels in ' + form.to, sub: 'Google Hotels',
                  url: 'https://www.google.com/travel/hotels/' + encodeURIComponent(form.to + ', India') },
                { icon: '🚂', label: 'Trains from ' + form.from, sub: 'IRCTC',
                  url: 'https://www.irctc.co.in/nget/train-search' },
                { icon: '🚌', label: 'Buses to ' + form.to, sub: 'RedBus',
                  url: 'https://www.google.com/search?q=redbus+' + form.from.replace(/ /g,'+') + '+to+' + form.to.replace(/ /g,'+') },
                { icon: '✈️', label: 'Flights to ' + form.to, sub: 'Google Flights',
                  url: 'https://www.google.com/search?q=flights+from+' + form.from.replace(/ /g,'+') + '+to+' + form.to.replace(/ /g,'+') },
              ].map(b => (
                <a key={b.label} href={b.url} target="_blank" rel="noopener" className="book-btn">
                  <span style={{ fontSize: 20 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink)' }}>{b.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted2)' }}>via {b.sub}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Bridge cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t"
            style={{ borderColor: 'var(--border)' }}>
            <div className="card card-p" style={{ borderColor: 'var(--border2)' }}>
              <h4 className="font-serif text-lg font-medium mb-1">How much will this cost?</h4>
              <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
                Get a detailed cost breakdown with the Yatra Budget calculator.
              </p>
              <Link href={`/plan/budget?destination=${encodeURIComponent(form.to)}&pilgrims=${form.pilgrims}`}
                className="btn btn-secondary btn-sm w-full justify-center">
                Calculate Budget →
              </Link>
            </div>
            <div className="card card-p" style={{ borderColor: 'var(--border2)' }}>
              <h4 className="font-serif text-lg font-medium mb-1">Start saving for this yatra</h4>
              <p className="text-xs mb-3" style={{ color: 'var(--muted)' }}>
                Set a monthly savings goal and track progress until you're ready to go.
              </p>
              <Link href={`/yatra/goals?yatra=${encodeURIComponent(form.to)}`}
                className="btn btn-gold btn-sm w-full justify-center">
                Set Savings Goal →
              </Link>
            </div>
          </div>

          {/* FinVerse CTA */}
          <div className="mt-4 rounded-xl p-4 flex items-center justify-between gap-4"
            style={{ background: 'var(--ivory2)', border: '1px solid var(--border)' }}>
            <div>
              <div className="text-xs font-semibold" style={{ color: 'var(--gold-dk)' }}>Powered by FinVerse</div>
              <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>
                Open a dedicated Yatra Fund and start saving today
              </p>
            </div>
            <a href={finverseLink({ action: 'savings', goal_name: form.to, utm_content: 'planner' })}
              target="_blank" rel="noopener" className="btn btn-gold btn-sm whitespace-nowrap">
              Open Yatra Fund →
            </a>
          </div>
        </div>
      )}
    </div>

    {showPlanModal && (
      <PlanMyTripModal
        form={form}
        itinerary={result}
        user={session?.user}
        onClose={() => setShowPlanModal(false)}
      />
    )}
    </>
  )
}

export default function PlannerPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto px-6 py-10 flex items-center justify-center">
        <Loader2 size={24} className="animate-spin" style={{ color: 'var(--crimson)' }} />
      </div>
    }>
      <PlannerForm />
    </Suspense>
  )
}
