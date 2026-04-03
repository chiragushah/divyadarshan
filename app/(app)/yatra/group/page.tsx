'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2, MapPin, Calendar, Users, ChevronDown, ChevronUp } from 'lucide-react'

interface TravelGroup {
  name: string
  city: string
  persons: number
  seats?: number
  is_assigned: boolean
  travel_plan?: string
  estimated_cost?: number
  joined_by?: string[]
}

interface Destination {
  temple_name: string
  city: string
  state: string
  sequence: number
  nights: number
}

interface Plan {
  _id: string
  title: string
  destinations: Destination[]
  travel_dates: string
  duration_days: number
  description?: string
  what_included?: string
  mode: 'open' | 'assigned'
  groups: TravelGroup[]
  total_persons: number
  total_seats?: number
  combined_itinerary?: string
  highlights?: string[]
  organiser_name?: string
}

export default function GroupYatraPage() {
  const { data: session } = useSession()
  const [plans, setPlans]     = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [joining, setJoining] = useState<string | null>(null)
  const [filter, setFilter]   = useState<'all' | 'open' | 'assigned'>('all')

  useEffect(() => { loadPlans() }, [])

  async function loadPlans() {
    setLoading(true)
    const res = await fetch('/api/group-yatra')
    const d = await res.json()
    setPlans(d.plans || [])
    setLoading(false)
  }

  async function joinGroup(planId: string, groupIndex: number) {
    if (!session) { window.location.href = '/auth/signin'; return }
    setJoining(planId + '-' + groupIndex)
    await fetch('/api/group-yatra', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'join', planId, groupIndex }),
    })
    await loadPlans()
    setJoining(null)
  }

  async function leaveGroup(planId: string, groupIndex: number) {
    setJoining(planId + '-' + groupIndex)
    await fetch('/api/group-yatra', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'leave', planId, groupIndex }),
    })
    await loadPlans()
    setJoining(null)
  }

  function hasJoined(group: TravelGroup) {
    return group.joined_by?.includes(session?.user?.email || '') || false
  }

  function seatsLeft(group: TravelGroup) {
    const total = group.seats || group.persons
    const filled = group.joined_by?.length || 0
    return total - filled
  }

  const filtered = plans.filter(p => filter === 'all' || p.mode === filter)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Hero */}
      <div className="text-center mb-10">
        <div className="section-title">Travel Together</div>
        <h1 className="font-serif text-4xl font-medium mb-3">Group Yatra Plans</h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: 'var(--muted)' }}>
          Join a curated pilgrimage from your city. Multi-destination yatras, organised by verified leaders.
        </p>
        {/* Filter tabs */}
        <div className="flex justify-center gap-2 mt-6">
          {[
            { val: 'all', label: 'All Yatras' },
            { val: 'open', label: '🔓 Open to Join' },
            { val: 'assigned', label: '🔒 Organised' },
          ].map(f => (
            <button key={f.val} onClick={() => setFilter(f.val as any)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                background: filter === f.val ? 'var(--crimson)' : 'var(--white)',
                color: filter === f.val ? 'white' : 'var(--muted)',
                border: filter === f.val ? '1.5px solid var(--crimson)' : '1.5px solid var(--border)',
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin" style={{ color: 'var(--crimson)' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛕</div>
          <h3 className="font-serif text-2xl font-medium mb-2">No group yatras yet</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
            Want to organise a group yatra? Request organiser access.
          </p>
          <Link href="/admin-request" className="btn btn-primary">Become an Organiser</Link>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map(plan => {
            const isOpen = expanded === plan._id
            const openGroups = plan.groups.filter(g => !g.is_assigned)
            const totalFilled = openGroups.reduce((s, g) => s + (g.joined_by?.length || 0), 0)
            const totalAvail  = openGroups.reduce((s, g) => s + (g.seats || g.persons), 0)
            const pct = totalAvail > 0 ? Math.round((totalFilled / totalAvail) * 100) : 0

            return (
              <div key={plan._id} className="card overflow-hidden">
                {/* Card header */}
                <div className="p-6 cursor-pointer" onClick={() => setExpanded(isOpen ? null : plan._id)}>
                  <div className="flex items-start gap-5">
                    {/* Left: info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                          style={{
                            background: plan.mode === 'open' ? 'var(--pastel-blue)' : 'var(--pastel-red)',
                            color: plan.mode === 'open' ? '#1D4ED8' : 'var(--crimson)',
                            border: plan.mode === 'open' ? '1px solid #BFDBFE' : '1px solid #FFCCCC',
                          }}>
                          {plan.mode === 'open' ? '🔓 Open to Join' : '🔒 Organised Group'}
                        </span>
                        {plan.mode === 'open' && totalAvail > 0 && (
                          <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                            style={{ background: pct >= 80 ? '#FEF2F2' : 'var(--pastel-green)', color: pct >= 80 ? '#DC2626' : '#166534', border: pct >= 80 ? '1px solid #FECACA' : '1px solid #BBF7D0' }}>
                            {pct >= 80 ? '🔥 Almost full' : `${totalAvail - totalFilled} seats left`}
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-xl font-medium mb-2">{plan.title}</h3>

                      {/* Destination pills */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(plan.destinations || []).map((d, i) => (
                          <span key={i} className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg font-medium"
                            style={{ background: 'var(--pastel-amber)', border: '1px solid #FDE68A', color: '#92400E' }}>
                            {i === 0 ? '🛕' : '→'} {d.temple_name}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                        <span className="flex items-center gap-1"><Calendar size={13} />{plan.travel_dates}</span>
                        <span className="flex items-center gap-1"><Users size={13} />{plan.total_persons} pilgrims</span>
                        <span>⏱ {plan.duration_days} days</span>
                        {plan.organiser_name && <span>👤 {plan.organiser_name}</span>}
                      </div>

                      {/* Seat fill bar for open yatras */}
                      {plan.mode === 'open' && totalAvail > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--muted2)' }}>
                            <span>{totalFilled} joined</span>
                            <span>{totalAvail} total seats</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                            <div className="h-full rounded-full transition-all" style={{ width: pct + '%', background: pct >= 80 ? '#DC2626' : 'var(--crimson)' }} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex-shrink-0 text-right">
                      {isOpen
                        ? <ChevronUp size={18} style={{ color: 'var(--muted2)' }} />
                        : <ChevronDown size={18} style={{ color: 'var(--muted2)' }} />}
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div className="border-t" style={{ borderColor: 'var(--border)' }}>

                    {/* Description */}
                    {plan.description && (
                      <div className="px-6 pt-5">
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{plan.description}</p>
                      </div>
                    )}

                    {/* Highlights */}
                    {(plan.highlights || []).filter(h => h).length > 0 && (
                      <div className="px-6 pt-4">
                        <div className="section-title mb-2">Highlights</div>
                        <div className="grid grid-cols-2 gap-1">
                          {plan.highlights!.filter(h => h).map((h, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink2)' }}>
                              <span style={{ color: 'var(--crimson)', flexShrink: 0 }}>✦</span> {h}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Travel groups */}
                    <div className="p-6">
                      <div className="section-title mb-3">Travel Groups from Different Cities</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {plan.groups.map((group, i) => {
                          const joined = hasJoined(group)
                          const left   = seatsLeft(group)
                          const full   = left <= 0

                          return (
                            <div key={i} className="p-4 rounded-xl border transition-all"
                              style={{
                                borderColor: joined ? '#BBF7D0' : full ? '#FECACA' : 'var(--border)',
                                background: joined ? 'var(--pastel-green)' : full ? '#FFF5F5' : 'var(--bg)',
                              }}>
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="font-semibold text-sm" style={{ color: 'var(--ink)' }}>
                                    {group.name || group.city + ' Group'}
                                  </div>
                                  <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                                    📍 From {group.city} · 👥 {group.persons} persons
                                  </div>
                                </div>
                                {group.estimated_cost && (
                                  <div className="text-right">
                                    <div className="text-sm font-semibold" style={{ color: 'var(--crimson)' }}>
                                      ₹{group.estimated_cost.toLocaleString('en-IN')}
                                    </div>
                                    <div className="text-xs" style={{ color: 'var(--muted2)' }}>travel est.</div>
                                  </div>
                                )}
                              </div>

                              {group.travel_plan && (
                                <div className="text-xs p-2.5 rounded-lg mb-2 leading-relaxed"
                                  style={{ background: 'white', color: 'var(--muted)', maxHeight: 80, overflowY: 'auto', border: '1px solid var(--border)' }}>
                                  {group.travel_plan.slice(0, 200)}…
                                </div>
                              )}

                              {/* Open group seat info + join */}
                              {plan.mode === 'open' && !group.is_assigned && (
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="h-1.5 rounded-full flex-1 overflow-hidden" style={{ background: 'var(--border)' }}>
                                      <div className="h-full rounded-full"
                                        style={{ width: `${Math.min(100, ((group.joined_by?.length || 0) / (group.seats || group.persons)) * 100)}%`, background: full ? '#DC2626' : 'var(--crimson)' }} />
                                    </div>
                                    <span className="text-xs font-medium flex-shrink-0"
                                      style={{ color: full ? '#DC2626' : 'var(--muted2)' }}>
                                      {full ? 'Full' : `${left} left`}
                                    </span>
                                  </div>

                                  {joined ? (
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-semibold" style={{ color: '#166534' }}>✅ You've joined this group</span>
                                      <button onClick={() => leaveGroup(plan._id, i)}
                                        disabled={joining === plan._id + '-' + i}
                                        className="text-xs text-red-500 hover:text-red-700 font-medium">
                                        {joining === plan._id + '-' + i ? '…' : 'Leave'}
                                      </button>
                                    </div>
                                  ) : full ? (
                                    <div className="text-xs text-center py-1" style={{ color: '#DC2626' }}>This group is full</div>
                                  ) : (
                                    <button onClick={() => joinGroup(plan._id, i)}
                                      disabled={joining === plan._id + '-' + i}
                                      className="btn btn-primary btn-sm w-full justify-center">
                                      {joining === plan._id + '-' + i ? <><Loader2 size={12} className="animate-spin" /> Joining…</> : '+ Join This Group'}
                                    </button>
                                  )}
                                </div>
                              )}

                              {group.is_assigned && (
                                <div className="text-xs px-2 py-1 rounded text-center"
                                  style={{ background: 'var(--pastel-red)', color: 'var(--crimson)', border: '1px solid #FFCCCC' }}>
                                  🔒 Assigned group — contact organiser to join
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Combined itinerary */}
                    {plan.combined_itinerary && (
                      <div className="px-6 pb-6">
                        <div className="section-title mb-3">Group Itinerary at {(plan.destinations || [])[0]?.city}</div>
                        <div className="text-sm leading-relaxed p-4 rounded-xl whitespace-pre-wrap"
                          style={{ background: 'var(--bg)', color: 'var(--muted)', border: '1.5px solid var(--border)', maxHeight: 300, overflowY: 'auto' }}>
                          {plan.combined_itinerary}
                        </div>
                      </div>
                    )}

                    {/* What's included */}
                    {plan.what_included && (
                      <div className="px-6 pb-6">
                        <div className="p-4 rounded-xl" style={{ background: 'var(--pastel-green)', border: '1.5px solid #BBF7D0' }}>
                          <div className="text-xs font-bold mb-1" style={{ color: '#166534' }}>✅ What's Included</div>
                          <p className="text-sm" style={{ color: '#166534' }}>{plan.what_included}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* CTA for organisers */}
      <div className="mt-12 card card-p text-center"
        style={{ background: 'linear-gradient(135deg, var(--crim-dk), #2d0a0a)', border: 'none' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🛕</div>
        <h3 className="font-serif text-2xl font-medium mb-2 text-white">Want to organise a group yatra?</h3>
        <p className="text-sm mb-6" style={{ color: 'rgba(237,224,196,.6)' }}>
          Create multi-destination pilgrimages, assign members or open them to all pilgrims.
        </p>
        <Link href="/admin-request" className="btn btn-sm"
          style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>
          Become a Yatra Organiser →
        </Link>
      </div>
    </div>
  )
}
