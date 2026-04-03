'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2, Plus, Trash2, Zap, Send, ChevronDown, ChevronUp, MapPin, Calendar, Users, Star } from 'lucide-react'

interface Destination {
  temple_name: string
  city: string
  state: string
  slug: string
  sequence: number
  nights: number
}

interface TravelGroup {
  name: string
  city: string
  persons: number
  seats: number
  is_assigned: boolean
  travel_plan?: string
  estimated_cost?: number
  generating?: boolean
}

interface Plan {
  _id: string
  title: string
  destinations: Destination[]
  travel_dates: string
  duration_days: number
  description?: string
  mode: 'open' | 'assigned'
  groups: TravelGroup[]
  total_persons: number
  total_seats?: number
  combined_itinerary?: string
  highlights?: string[]
  status: 'draft' | 'published' | 'completed'
  created_at: string
}

const STEPS = ['Plan Details', 'Destinations', 'Travel Groups', 'Review & Publish']

export default function YatraManagePage() {
  const { data: session, status } = useSession()
  const [plans, setPlans]           = useState<Plan[]>([])
  const [view, setView]             = useState<'list' | 'create' | 'detail'>('list')
  const [step, setStep]             = useState(0)
  const [selectedPlan, setSelected] = useState<Plan | null>(null)
  const [saving, setSaving]         = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [genItinerary, setGenItinerary] = useState(false)
  const [loading, setLoading]       = useState(true)

  const [form, setForm] = useState({
    title: '', travel_dates: '', duration_days: 5, description: '',
    what_included: '', mode: 'open' as 'open' | 'assigned',
    highlights: [''] as string[],
  })
  const [destinations, setDestinations] = useState<Destination[]>([
    { temple_name: '', city: '', state: '', slug: '', sequence: 1, nights: 1 }
  ])
  const [groups, setGroups] = useState<TravelGroup[]>([
    { name: '', city: '', persons: 1, seats: 10, is_assigned: false }
  ])

  useEffect(() => { if (status === 'authenticated') loadPlans() }, [status])

  async function loadPlans() {
    setLoading(true)
    const res = await fetch('/api/group-yatra?all=1')
    const d = await res.json()
    setPlans(d.plans || [])
    setLoading(false)
  }

  function resetForm() {
    setForm({ title: '', travel_dates: '', duration_days: 5, description: '', what_included: '', mode: 'open', highlights: [''] })
    setDestinations([{ temple_name: '', city: '', state: '', slug: '', sequence: 1, nights: 1 }])
    setGroups([{ name: '', city: '', persons: 1, seats: 10, is_assigned: false }])
    setStep(0)
  }

  async function generateGroupPlan(i: number) {
    const g = groups[i]
    if (!g.city || destinations.length === 0) return
    setGroups(prev => prev.map((gr, idx) => idx === i ? { ...gr, generating: true } : gr))
    const res = await fetch('/api/group-yatra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate_plan',
        groupCity: g.city,
        groupName: g.name || g.city + ' Group',
        persons: g.persons,
        destinations,
        travelDates: form.travel_dates,
      }),
    })
    const d = await res.json()
    setGroups(prev => prev.map((gr, idx) => idx === i ? { ...gr, travel_plan: d.plan, estimated_cost: d.estimated_cost, generating: false } : gr))
  }

  async function generateAllPlans() {
    for (let i = 0; i < groups.length; i++) {
      if (!groups[i].travel_plan) await generateGroupPlan(i)
    }
  }

  async function generateItinerary(planId: string) {
    setGenItinerary(true)
    const res = await fetch('/api/group-yatra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'generate_itinerary',
        destinations: selectedPlan?.destinations,
        travelDates: selectedPlan?.travel_dates,
        durationDays: selectedPlan?.duration_days,
        title: selectedPlan?.title,
      }),
    })
    const d = await res.json()
    if (selectedPlan) setSelected({ ...selectedPlan, combined_itinerary: d.itinerary })
    // Save to DB
    await fetch('/api/group-yatra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planId, combined_itinerary: d.itinerary }),
    })
    setGenItinerary(false)
  }

  async function savePlan() {
    setSaving(true)
    const res = await fetch('/api/group-yatra', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        destinations,
        groups: groups.map(g => ({ ...g, is_assigned: form.mode === 'assigned' })),
        highlights: form.highlights.filter(h => h.trim()),
      }),
    })
    const d = await res.json()
    setPlans(prev => [d.plan, ...prev])
    setSelected(d.plan)
    setView('detail')
    setSaving(false)
  }

  async function publishPlan(planId: string) {
    setPublishing(true)
    await fetch('/api/group-yatra', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'publish', planId }),
    })
    setPlans(prev => prev.map((p: any) => p._id === planId ? { ...p, status: 'published' } : p))
    if (selectedPlan?._id === planId) setSelected({ ...selectedPlan, status: 'published' } as any)
    setPublishing(false)
  }

  async function deletePlan(planId: string) {
    if (!confirm('Delete this plan?')) return
    await fetch('/api/group-yatra?id=' + planId, { method: 'DELETE' })
    setPlans(prev => prev.filter((p: any) => p._id !== planId))
    if (selectedPlan?._id === planId) { setSelected(null); setView('list') }
  }

  if (status === 'unauthenticated') return (
    <div className="max-w-lg mx-auto px-6 py-20 text-center">
      <h1 className="font-serif text-3xl mb-4">Sign in required</h1>
      <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
    </div>
  )

  const totalPersons = groups.reduce((s, g) => s + g.persons, 0)
  const totalSeats   = form.mode === 'open' ? groups.reduce((s, g) => s + (g.seats || g.persons), 0) : 0
  const totalCost    = groups.reduce((s, g) => s + (g.estimated_cost || 0), 0)
  const firstTemple  = destinations[0]?.temple_name || 'your destination'

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="section-title">Yatra Organiser</div>
          <h1 className="font-serif text-3xl font-medium">Manage Group Yatras</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Create multi-destination group pilgrimages — assigned or open to all pilgrims.
          </p>
        </div>
        {view !== 'create' && (
          <button onClick={() => { resetForm(); setView('create') }} className="btn btn-primary flex items-center gap-2">
            <Plus size={16} /> Create Group Yatra
          </button>
        )}
      </div>

      {/* ── PLANS LIST ── */}
      {view === 'list' && (
        <div>
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={24} className="animate-spin" style={{ color: 'var(--crimson)' }} /></div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20">
              <div style={{ fontSize: 56, marginBottom: 16 }}>🛕</div>
              <h2 className="font-serif text-2xl font-medium mb-3">No group yatras yet</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                Create your first group yatra plan — assign members or open it to all pilgrims.
              </p>
              <button onClick={() => { resetForm(); setView('create') }} className="btn btn-primary">
                Create Your First Yatra
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {plans.map((plan: any) => (
                <div key={plan._id} className="card overflow-hidden">
                  <div className="flex items-start gap-0">
                    {/* Color bar */}
                    <div style={{ width: 6, background: plan.status === 'published' ? '#16A34A' : '#F59E0B', flexShrink: 0 }} />
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="font-serif text-xl font-medium">{plan.title}</h3>
                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                              style={{ background: plan.status === 'published' ? 'var(--pastel-green)' : 'var(--pastel-amber)', color: plan.status === 'published' ? '#166534' : '#92400E', border: plan.status === 'published' ? '1px solid #BBF7D0' : '1px solid #FDE68A' }}>
                              {plan.status === 'published' ? '✅ Published' : '📝 Draft'}
                            </span>
                            <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                              style={{ background: plan.mode === 'open' ? 'var(--pastel-blue)' : 'var(--pastel-red)', color: plan.mode === 'open' ? '#1D4ED8' : 'var(--crimson)', border: plan.mode === 'open' ? '1px solid #BFDBFE' : '1px solid #FFCCCC' }}>
                              {plan.mode === 'open' ? '🔓 Open to Join' : '🔒 Assigned'}
                            </span>
                          </div>

                          {/* Destinations pills */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {(plan.destinations || []).map((d: any, i: number) => (
                              <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
                                style={{ background: 'var(--pastel-amber)', border: '1px solid #FDE68A', color: '#92400E' }}>
                                <span>{i === 0 ? '🛕' : '→'}</span>
                                {d.temple_name}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                            <span className="flex items-center gap-1"><Calendar size={13} />{plan.travel_dates}</span>
                            <span className="flex items-center gap-1"><Users size={13} />{plan.total_persons} pilgrims</span>
                            {plan.mode === 'open' && plan.total_seats && (
                              <span className="flex items-center gap-1"><Star size={13} />{plan.total_seats} total seats</span>
                            )}
                            <span>{plan.duration_days} days</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button onClick={() => { setSelected(plan); setView('detail') }}
                            className="btn btn-secondary btn-sm">View</button>
                          {plan.status === 'draft' && (
                            <button onClick={() => publishPlan(plan._id)} disabled={publishing}
                              className="btn btn-primary btn-sm flex items-center gap-1.5">
                              <Send size={12} /> Publish
                            </button>
                          )}
                          <button onClick={() => deletePlan(plan._id)}
                            className="p-2 rounded-lg transition-colors hover:bg-red-50"
                            style={{ color: '#DC2626' }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── CREATE PLAN ── */}
      {view === 'create' && (
        <div>
          {/* Step indicator */}
          <div className="flex items-center gap-0 mb-8 overflow-x-auto">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center">
                <button onClick={() => i < step || (i === step) ? setStep(i) : null}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: step === i ? 'var(--pastel-red)' : step > i ? 'var(--pastel-green)' : 'transparent',
                    color: step === i ? 'var(--crimson)' : step > i ? '#166534' : 'var(--muted)',
                    border: step === i ? '1.5px solid #FFCCCC' : step > i ? '1.5px solid #BBF7D0' : '1.5px solid transparent',
                  }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: step === i ? 'var(--crimson)' : step > i ? '#16A34A' : 'var(--border)',
                    color: step >= i ? 'white' : 'var(--muted2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700,
                  }}>
                    {step > i ? '✓' : i + 1}
                  </span>
                  {s}
                </button>
                {i < STEPS.length - 1 && (
                  <div style={{ width: 24, height: 1.5, background: step > i ? '#BBF7D0' : 'var(--border)', flexShrink: 0 }} />
                )}
              </div>
            ))}
          </div>

          {/* Step 0 — Plan Details */}
          {step === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="card card-p">
                  <h2 className="font-serif text-xl font-medium mb-5">Plan Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="label">Yatra Title *</label>
                      <input className="input" placeholder="e.g. Char Dham Yatra June 2026, Ashtavinayak Circuit 2026"
                        value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                    </div>
                    <div>
                      <label className="label">Travel Dates *</label>
                      <input className="input" placeholder="e.g. 15-25 June 2026"
                        value={form.travel_dates} onChange={e => setForm(f => ({ ...f, travel_dates: e.target.value }))} />
                    </div>
                    <div>
                      <label className="label">Total Duration (Days) *</label>
                      <input className="input" type="number" min={1} max={60}
                        value={form.duration_days} onChange={e => setForm(f => ({ ...f, duration_days: parseInt(e.target.value) || 1 }))} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Mode *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { val: 'open', icon: '🔓', title: 'Open Yatra', desc: 'Any registered user can browse and join available seats' },
                          { val: 'assigned', icon: '🔒', title: 'Assigned Yatra', desc: 'You assign specific members — plan goes directly to their profile' },
                        ].map(opt => (
                          <button key={opt.val} onClick={() => setForm(f => ({ ...f, mode: opt.val as any }))}
                            className="text-left p-4 rounded-xl border-2 transition-all"
                            style={{
                              borderColor: form.mode === opt.val ? 'var(--crimson)' : 'var(--border)',
                              background: form.mode === opt.val ? 'var(--pastel-red)' : 'var(--white)',
                            }}>
                            <div className="text-2xl mb-2">{opt.icon}</div>
                            <div className="font-semibold text-sm mb-1" style={{ color: form.mode === opt.val ? 'var(--crimson)' : 'var(--ink)' }}>{opt.title}</div>
                            <div className="text-xs" style={{ color: 'var(--muted)' }}>{opt.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Description</label>
                      <textarea className="input h-24 resize-none"
                        placeholder="Describe this yatra — significance, what to expect, who it's for…"
                        value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">What's Included</label>
                      <textarea className="input h-20 resize-none"
                        placeholder="e.g. All temple darshans, group transportation between destinations, accommodation guidance…"
                        value={form.what_included} onChange={e => setForm(f => ({ ...f, what_included: e.target.value }))} />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label">Highlights (up to 5)</label>
                      <div className="space-y-2">
                        {form.highlights.map((h, i) => (
                          <div key={i} className="flex gap-2">
                            <input className="input" placeholder={`e.g. Kedarnath trek at sunrise`}
                              value={h} onChange={e => setForm(f => ({ ...f, highlights: f.highlights.map((x, idx) => idx === i ? e.target.value : x) }))} />
                            {form.highlights.length > 1 && (
                              <button onClick={() => setForm(f => ({ ...f, highlights: f.highlights.filter((_, idx) => idx !== i) }))}
                                className="p-2 text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                            )}
                          </div>
                        ))}
                        {form.highlights.length < 5 && (
                          <button onClick={() => setForm(f => ({ ...f, highlights: [...f.highlights, ''] }))}
                            className="btn btn-ghost btn-sm flex items-center gap-1"><Plus size={13} /> Add highlight</button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card card-p sticky top-4">
                  <h3 className="font-serif text-lg font-medium mb-3">Mode Guide</h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl" style={{ background: 'var(--pastel-blue)', border: '1px solid #BFDBFE' }}>
                      <div className="text-xs font-bold mb-1" style={{ color: '#1D4ED8' }}>🔓 Open Yatra</div>
                      <div className="text-xs" style={{ color: '#1E40AF' }}>Published publicly. Any pilgrim can see it and join a group from their city. You set available seats per group.</div>
                    </div>
                    <div className="p-3 rounded-xl" style={{ background: 'var(--pastel-red)', border: '1px solid #FFCCCC' }}>
                      <div className="text-xs font-bold mb-1" style={{ color: 'var(--crimson)' }}>🔒 Assigned Yatra</div>
                      <div className="text-xs" style={{ color: 'var(--crimson)' }}>Private. You assign specific people by name. Plan appears directly in their profile. No public listing.</div>
                    </div>
                  </div>
                  <button onClick={() => form.title && form.travel_dates ? setStep(1) : null}
                    disabled={!form.title || !form.travel_dates}
                    className="btn btn-primary w-full justify-center mt-4">
                    Next: Add Destinations →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Destinations */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="card card-p">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-serif text-xl font-medium">Temples & Destinations</h2>
                      <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>Add all temples in the order they will be visited</p>
                    </div>
                    <button onClick={() => setDestinations(d => [...d, { temple_name: '', city: '', state: '', slug: '', sequence: d.length + 1, nights: 1 }])}
                      className="btn btn-secondary btn-sm flex items-center gap-1.5">
                      <Plus size={13} /> Add Temple
                    </button>
                  </div>

                  <div className="space-y-4">
                    {destinations.map((dest, i) => (
                      <div key={i} className="p-4 rounded-xl border" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
                        <div className="flex items-center gap-3 mb-3">
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--crimson)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {i + 1}
                          </div>
                          <span className="text-sm font-semibold" style={{ color: 'var(--muted)' }}>
                            {i === 0 ? 'First Stop' : i === destinations.length - 1 ? 'Final Stop' : `Stop ${i + 1}`}
                          </span>
                          {destinations.length > 1 && (
                            <button onClick={() => setDestinations(d => d.filter((_, idx) => idx !== i).map((x, idx) => ({ ...x, sequence: idx + 1 })))}
                              className="ml-auto text-red-400 hover:text-red-600"><Trash2 size={14} /></button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="md:col-span-2">
                            <label className="label">Temple Name *</label>
                            <input className="input" placeholder="e.g. Kedarnath Temple"
                              value={dest.temple_name}
                              onChange={e => setDestinations(d => d.map((x, idx) => idx === i ? { ...x, temple_name: e.target.value } : x))} />
                          </div>
                          <div>
                            <label className="label">City *</label>
                            <input className="input" placeholder="e.g. Kedarnath"
                              value={dest.city}
                              onChange={e => setDestinations(d => d.map((x, idx) => idx === i ? { ...x, city: e.target.value } : x))} />
                          </div>
                          <div>
                            <label className="label">State *</label>
                            <input className="input" placeholder="e.g. Uttarakhand"
                              value={dest.state}
                              onChange={e => setDestinations(d => d.map((x, idx) => idx === i ? { ...x, state: e.target.value } : x))} />
                          </div>
                          <div>
                            <label className="label">Nights Here</label>
                            <input className="input" type="number" min={1} max={10}
                              value={dest.nights}
                              onChange={e => setDestinations(d => d.map((x, idx) => idx === i ? { ...x, nights: parseInt(e.target.value) || 1 } : x))} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="card card-p sticky top-4">
                  <h3 className="font-serif text-lg font-medium mb-3">Route Preview</h3>
                  <div className="space-y-2 mb-4">
                    {destinations.filter(d => d.temple_name).map((d, i) => (
                      <div key={i} className="flex items-start gap-2">
                        {i > 0 && <div style={{ width: 1.5, height: 16, background: 'var(--border)', marginLeft: 9, marginTop: -8 }} />}
                        <div className="flex items-center gap-2">
                          <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--crimson)', color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
                          <div>
                            <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{d.temple_name}</div>
                            <div className="text-xs" style={{ color: 'var(--muted)' }}>{d.city}{d.state ? ', ' + d.state : ''} · {d.nights}n</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {destinations.every(d => !d.temple_name) && (
                      <p className="text-xs" style={{ color: 'var(--muted2)' }}>Add temples to see route preview</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setStep(0)} className="btn btn-ghost btn-sm">← Back</button>
                    <button onClick={() => destinations.every(d => d.temple_name && d.city) ? setStep(2) : null}
                      disabled={!destinations.every(d => d.temple_name && d.city)}
                      className="btn btn-primary btn-sm flex-1 justify-center">
                      Next: Travel Groups →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Travel Groups */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="card card-p">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="font-serif text-xl font-medium">
                        {form.mode === 'assigned' ? 'Assigned Members' : 'Travel Groups by City'}
                      </h2>
                      <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                        {form.mode === 'assigned'
                          ? 'Add specific people — each gets a personalised travel plan in their profile'
                          : 'Define groups from different cities with available seats'}
                      </p>
                    </div>
                    <button onClick={() => setGroups(g => [...g, { name: '', city: '', persons: 1, seats: 10, is_assigned: form.mode === 'assigned' }])}
                      className="btn btn-secondary btn-sm flex items-center gap-1.5">
                      <Plus size={13} /> Add {form.mode === 'assigned' ? 'Member' : 'Group'}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {groups.map((group, i) => (
                      <div key={i} className="p-4 rounded-xl border" style={{ borderColor: group.travel_plan ? '#BBF7D0' : 'var(--border)', background: group.travel_plan ? 'var(--pastel-green)' : 'var(--bg)' }}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div className="md:col-span-2">
                            <label className="label">{form.mode === 'assigned' ? 'Member Name' : 'Group Name'}</label>
                            <input className="input" placeholder={form.mode === 'assigned' ? 'e.g. Chirag Shah' : 'e.g. Mumbai Group'}
                              value={group.name}
                              onChange={e => setGroups(g => g.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))} />
                          </div>
                          <div>
                            <label className="label">Starting City</label>
                            <input className="input" placeholder="e.g. Mumbai"
                              value={group.city}
                              onChange={e => setGroups(g => g.map((x, idx) => idx === i ? { ...x, city: e.target.value } : x))} />
                          </div>
                          <div>
                            <label className="label">Persons</label>
                            <input className="input" type="number" min={1}
                              value={group.persons}
                              onChange={e => setGroups(g => g.map((x, idx) => idx === i ? { ...x, persons: parseInt(e.target.value) || 1 } : x))} />
                          </div>
                          {form.mode === 'open' && (
                            <div>
                              <label className="label">Total Seats</label>
                              <input className="input" type="number" min={1}
                                value={group.seats}
                                onChange={e => setGroups(g => g.map((x, idx) => idx === i ? { ...x, seats: parseInt(e.target.value) || 1 } : x))} />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <button onClick={() => generateGroupPlan(i)}
                            disabled={!group.city || !destinations[0]?.temple_name || group.generating}
                            className="btn btn-secondary btn-sm flex items-center gap-1.5">
                            {group.generating
                              ? <><Loader2 size={12} className="animate-spin" /> Generating…</>
                              : <><Zap size={12} /> Generate Travel Plan</>}
                          </button>
                          {group.estimated_cost && (
                            <span className="text-sm font-semibold" style={{ color: 'var(--crimson)' }}>
                              ₹{group.estimated_cost.toLocaleString('en-IN')} est.
                            </span>
                          )}
                          {groups.length > 1 && (
                            <button onClick={() => setGroups(g => g.filter((_, idx) => idx !== i))}
                              className="ml-auto text-red-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
                          )}
                        </div>

                        {group.travel_plan && (
                          <div className="mt-3 p-3 rounded-lg text-xs leading-relaxed"
                            style={{ background: 'white', color: 'var(--muted)', maxHeight: 100, overflowY: 'auto', border: '1px solid #BBF7D0' }}>
                            {group.travel_plan.slice(0, 300)}…
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    <button onClick={generateAllPlans}
                      disabled={!destinations[0]?.temple_name || groups.every(g => !!g.travel_plan)}
                      className="btn btn-secondary flex items-center gap-2">
                      <Zap size={14} /> Generate All Travel Plans at Once
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="card card-p sticky top-4">
                  <h3 className="font-serif text-lg font-medium mb-4">Summary</h3>
                  <div className="space-y-3 mb-5">
                    {[
                      ['Groups', groups.length],
                      ['Total Pilgrims', totalPersons],
                      ...(form.mode === 'open' ? [['Total Seats', totalSeats]] : []),
                      ...(totalCost > 0 ? [['Est. Travel Cost', '₹' + totalCost.toLocaleString('en-IN')]] : []),
                    ].map(([label, value]: any) => (
                      <div key={label} className="flex justify-between text-sm py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                        <span style={{ color: 'var(--muted)' }}>{label}</span>
                        <span className="font-semibold" style={{ color: label.includes('Cost') ? 'var(--crimson)' : 'var(--ink)' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setStep(1)} className="btn btn-ghost btn-sm">← Back</button>
                    <button onClick={() => setStep(3)} className="btn btn-primary btn-sm flex-1 justify-center">
                      Review & Publish →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 — Review & Publish */}
          {step === 3 && (
            <div className="max-w-3xl">
              <div className="card overflow-hidden mb-6">
                {/* Preview header */}
                <div style={{ background: 'linear-gradient(135deg, var(--crim-dk), #2d0a0a)', padding: '28px 28px 24px', color: 'white' }}>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: form.mode === 'open' ? 'rgba(96,165,250,.2)' : 'rgba(252,165,165,.2)', color: form.mode === 'open' ? '#93C5FD' : '#FCA5A5', border: form.mode === 'open' ? '1px solid rgba(96,165,250,.3)' : '1px solid rgba(252,165,165,.3)' }}>
                      {form.mode === 'open' ? '🔓 Open Yatra' : '🔒 Assigned Yatra'}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, marginBottom: 8 }}>{form.title || 'Your Yatra Title'}</h2>
                  <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'rgba(237,224,196,.6)' }}>
                    <span>📅 {form.travel_dates}</span>
                    <span>⏱ {form.duration_days} days</span>
                    <span>👥 {totalPersons} pilgrims</span>
                    {form.mode === 'open' && <span>🎫 {totalSeats} seats</span>}
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Destinations */}
                  <div>
                    <div className="section-title">Route</div>
                    <div className="flex flex-wrap gap-2">
                      {destinations.filter(d => d.temple_name).map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {i > 0 && <span style={{ color: 'var(--muted2)' }}>→</span>}
                          <span className="text-sm px-3 py-1.5 rounded-lg font-medium"
                            style={{ background: 'var(--pastel-amber)', border: '1px solid #FDE68A', color: '#92400E' }}>
                            🛕 {d.temple_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Groups */}
                  <div>
                    <div className="section-title">Travel Groups ({groups.length})</div>
                    <div className="grid grid-cols-2 gap-2">
                      {groups.filter(g => g.city).map((g, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                          style={{ background: 'var(--bg)', border: '1.5px solid var(--border)' }}>
                          <div>
                            <div className="text-sm font-medium">{g.name || g.city + ' Group'}</div>
                            <div className="text-xs" style={{ color: 'var(--muted)' }}>📍 {g.city} · {g.persons} persons</div>
                          </div>
                          {g.estimated_cost && (
                            <div className="text-sm font-semibold" style={{ color: 'var(--crimson)' }}>
                              ₹{g.estimated_cost.toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  {form.highlights.filter(h => h).length > 0 && (
                    <div>
                      <div className="section-title">Highlights</div>
                      <div className="space-y-1">
                        {form.highlights.filter(h => h).map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink2)' }}>
                            <span style={{ color: 'var(--crimson)' }}>✦</span> {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn btn-ghost">← Back</button>
                <button onClick={savePlan} disabled={saving} className="btn btn-secondary flex items-center gap-2">
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : '💾 Save as Draft'}
                </button>
                <button onClick={async () => { await savePlan() }} disabled={saving}
                  className="btn btn-primary flex items-center gap-2 flex-1 justify-center"
                  style={{ background: '#16A34A', borderColor: '#16A34A' }}>
                  {saving ? <><Loader2 size={14} className="animate-spin" /> Publishing…</> : <><Send size={14} /> Save & Publish</>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── DETAIL VIEW ── */}
      {view === 'detail' && selectedPlan && (
        <div className="space-y-6">
          <div className="card overflow-hidden">
            <div style={{ background: 'linear-gradient(135deg, var(--crim-dk), #2d0a0a)', padding: '28px 28px 24px' }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: selectedPlan.mode === 'open' ? 'rgba(96,165,250,.2)' : 'rgba(252,165,165,.2)', color: selectedPlan.mode === 'open' ? '#93C5FD' : '#FCA5A5' }}>
                      {selectedPlan.mode === 'open' ? '🔓 Open Yatra' : '🔒 Assigned Yatra'}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full font-semibold"
                      style={{ background: (selectedPlan as any).status === 'published' ? 'rgba(74,222,128,.15)' : 'rgba(252,211,77,.15)', color: (selectedPlan as any).status === 'published' ? '#86EFAC' : '#FDE68A' }}>
                      {(selectedPlan as any).status === 'published' ? '✅ Published' : '📝 Draft'}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: 'white', marginBottom: 8 }}>{selectedPlan.title}</h2>
                  <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'rgba(237,224,196,.6)' }}>
                    <span>📅 {selectedPlan.travel_dates}</span>
                    <span>⏱ {selectedPlan.duration_days} days</span>
                    <span>👥 {selectedPlan.total_persons} pilgrims</span>
                    {selectedPlan.mode === 'open' && selectedPlan.total_seats && <span>🎫 {selectedPlan.total_seats} seats</span>}
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {(selectedPlan as any).status === 'draft' ? (
                    <button onClick={() => publishPlan(selectedPlan._id)} disabled={publishing}
                      className="btn btn-sm flex items-center gap-1.5"
                      style={{ background: 'rgba(255,255,255,.15)', color: 'white', border: '1px solid rgba(255,255,255,.2)' }}>
                      {publishing ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                      Publish
                    </button>
                  ) : (
                    <span className="text-xs px-3 py-1.5 rounded-lg"
                      style={{ background: 'rgba(74,222,128,.15)', color: '#86EFAC' }}>
                      Live — visible to all users
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Route */}
            <div className="p-6 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="section-title mb-3">Pilgrimage Route</div>
              <div className="flex flex-wrap gap-3 items-center">
                {(selectedPlan.destinations || []).map((d, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {i > 0 && <div style={{ width: 24, height: 1.5, background: 'var(--border)' }} />}
                    <div className="text-center">
                      <div className="text-sm font-semibold px-3 py-2 rounded-xl"
                        style={{ background: 'var(--pastel-amber)', border: '1px solid #FDE68A', color: '#92400E' }}>
                        🛕 {d.temple_name}
                      </div>
                      <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{d.city} · {d.nights}n</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Travel plans grid */}
          <div>
            <h3 className="font-serif text-xl font-medium mb-4">Travel Plans by Group</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(selectedPlan.groups || []).map((group, i) => (
                <div key={i} className="card card-p">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-serif text-lg font-medium">{group.name || group.city + ' Group'}</h4>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>
                        📍 From {group.city} · 👥 {group.persons} persons
                        {selectedPlan.mode === 'open' && group.seats && ` · 🎫 ${group.seats} seats`}
                      </p>
                    </div>
                    {group.estimated_cost && (
                      <div className="text-right">
                        <div className="font-serif text-lg font-medium" style={{ color: 'var(--crimson)' }}>
                          ₹{group.estimated_cost.toLocaleString('en-IN')}
                        </div>
                        <div className="text-xs" style={{ color: 'var(--muted)' }}>est. travel</div>
                      </div>
                    )}
                  </div>
                  {group.travel_plan ? (
                    <div className="text-xs leading-relaxed p-3 rounded-lg"
                      style={{ background: 'var(--bg)', color: 'var(--muted)', maxHeight: 150, overflowY: 'auto', border: '1px solid var(--border)' }}>
                      {group.travel_plan}
                    </div>
                  ) : (
                    <p className="text-xs" style={{ color: 'var(--muted2)' }}>No travel plan generated yet</p>
                  )}
                  {selectedPlan.mode === 'open' && (
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs" style={{ color: 'var(--muted2)' }}>
                        {group.joined_by?.length || 0} / {group.seats || group.persons} seats filled
                      </span>
                      <div className="h-1.5 rounded-full flex-1 mx-3 overflow-hidden" style={{ background: 'var(--border)' }}>
                        <div className="h-full rounded-full" style={{
                          width: `${Math.min(100, ((group.joined_by?.length || 0) / (group.seats || group.persons)) * 100)}%`,
                          background: 'var(--crimson)',
                        }} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Combined Itinerary */}
          <div className="card card-p">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-xl font-medium">Combined Group Itinerary</h3>
                <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>Day-by-day plan covering all {selectedPlan.destinations?.length} destinations</p>
              </div>
              <button onClick={() => generateItinerary(selectedPlan._id)} disabled={genItinerary}
                className="btn btn-secondary flex items-center gap-2">
                {genItinerary ? <><Loader2 size={14} className="animate-spin" /> Generating…</> : <><Zap size={14} /> {selectedPlan.combined_itinerary ? 'Regenerate' : 'Generate'} Itinerary</>}
              </button>
            </div>
            {selectedPlan.combined_itinerary ? (
              <div className="text-sm leading-relaxed p-4 rounded-xl whitespace-pre-wrap"
                style={{ background: 'var(--bg)', color: 'var(--muted)', border: '1.5px solid var(--border)', maxHeight: 500, overflowY: 'auto' }}>
                {selectedPlan.combined_itinerary}
              </div>
            ) : (
              <div className="text-center py-10" style={{ color: 'var(--muted2)' }}>
                <div className="text-4xl mb-3">🗺️</div>
                <p className="text-sm">Click Generate to create a complete day-by-day itinerary covering all your destinations</p>
              </div>
            )}
          </div>

          <button onClick={() => setView('list')} className="btn btn-ghost">← Back to all plans</button>
        </div>
      )}
    </div>
  )
}
