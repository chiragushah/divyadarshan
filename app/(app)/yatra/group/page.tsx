'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2, Users, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react'

interface Member {
  name: string
  city: string
  persons: number
  is_assigned: boolean
  travel_plan?: string
  estimated_cost?: number
  joined_by?: string[]
}

interface Plan {
  _id: string
  title: string
  temple_name: string
  destination: string
  travel_dates: string
  description?: string
  mode: 'open' | 'assigned'
  members: Member[]
  total_persons: number
  combined_itinerary?: string
  status: string
}

export default function GroupYatraPage() {
  const { data: session } = useSession()
  const [plans, setPlans]         = useState<Plan[]>([])
  const [loading, setLoading]     = useState(true)
  const [expanded, setExpanded]   = useState<string | null>(null)
  const [joining, setJoining]     = useState<string | null>(null)

  useEffect(() => { loadPlans() }, [])

  async function loadPlans() {
    setLoading(true)
    const res = await fetch('/api/group-yatra')
    const data = await res.json()
    setPlans(data.plans || [])
    setLoading(false)
  }

  async function joinGroup(planId: string, memberIndex: number) {
    if (!session) { alert('Please sign in to join a group'); return }
    setJoining(planId + '-' + memberIndex)
    await fetch('/api/group-yatra', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'join', planId, memberIndex }),
    })
    await loadPlans()
    setJoining(null)
  }

  async function leaveGroup(planId: string, memberIndex: number) {
    setJoining(planId + '-' + memberIndex)
    await fetch('/api/group-yatra', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'leave', planId, memberIndex }),
    })
    await loadPlans()
    setJoining(null)
  }

  function hasJoined(member: Member) {
    return member.joined_by?.includes(session?.user?.email || '') || false
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="section-title">Travel Together</div>
        <h1 className="font-serif text-4xl font-medium">Group Yatra Plans</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>
          Join a group pilgrimage from your city — travel together, save together.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin" style={{ color: 'var(--crimson)' }} />
        </div>
      ) : plans.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="font-serif text-2xl font-medium mb-2">No group plans yet</h3>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>
            Check back soon — group yatra plans will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {plans.map(plan => (
            <div key={plan._id} className="card overflow-hidden">

              {/* Plan header */}
              <div className="p-5 cursor-pointer"
                onClick={() => setExpanded(expanded === plan._id ? null : plan._id)}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-xl font-medium">{plan.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: plan.mode === 'open' ? 'rgba(22,163,74,.1)' : 'rgba(192,87,10,.1)',
                          color: plan.mode === 'open' ? '#166534' : 'var(--saffron)',
                        }}>
                        {plan.mode === 'open' ? '🔓 Open to Join' : '🔒 Assigned Group'}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                      <span><MapPin size={12} className="inline mr-1" />{plan.destination}</span>
                      <span><Calendar size={12} className="inline mr-1" />{plan.travel_dates}</span>
                      <span><Users size={12} className="inline mr-1" />{plan.total_persons} total pilgrims</span>
                    </div>
                    {plan.description && (
                      <p className="text-xs mt-2" style={{ color: 'var(--muted2)' }}>{plan.description}</p>
                    )}
                  </div>
                  {expanded === plan._id
                    ? <ChevronUp size={18} style={{ color: 'var(--muted2)', flexShrink: 0 }} />
                    : <ChevronDown size={18} style={{ color: 'var(--muted2)', flexShrink: 0 }} />}
                </div>
              </div>

              {/* Expanded content */}
              {expanded === plan._id && (
                <div className="border-t" style={{ borderColor: 'var(--border)' }}>

                  {/* Groups from different cities */}
                  <div className="p-5">
                    <h4 className="font-serif text-lg font-medium mb-3">Travel Groups</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {plan.members.map((member, i) => (
                        <div key={i} className="p-4 rounded-xl border"
                          style={{
                            borderColor: hasJoined(member) ? 'rgba(22,163,74,.3)' : 'var(--border)',
                            background: hasJoined(member) ? 'rgba(22,163,74,.04)' : 'var(--ivory)',
                          }}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-medium text-sm" style={{ color: 'var(--ink)' }}>
                                {member.name || member.city + ' Group'}
                              </div>
                              <div className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>
                                📍 From {member.city} · 👥 {member.persons} person{member.persons > 1 ? 's' : ''}
                              </div>
                            </div>
                            {member.estimated_cost && (
                              <div className="text-right">
                                <div className="text-sm font-semibold" style={{ color: 'var(--crimson)' }}>
                                  ₹{member.estimated_cost.toLocaleString('en-IN')}
                                </div>
                                <div className="text-xs" style={{ color: 'var(--muted2)' }}>per group est.</div>
                              </div>
                            )}
                          </div>

                          {member.travel_plan && (
                            <div className="text-xs p-2 rounded-lg mb-2 leading-relaxed"
                              style={{ background: 'white', color: 'var(--muted)', maxHeight: 80, overflowY: 'auto' }}>
                              {member.travel_plan.slice(0, 200)}…
                            </div>
                          )}

                          {/* Join/Leave button for open groups */}
                          {plan.mode === 'open' && !member.is_assigned && (
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs" style={{ color: 'var(--muted2)' }}>
                                {member.joined_by?.length || 0} joined
                              </span>
                              {hasJoined(member) ? (
                                <button
                                  onClick={() => leaveGroup(plan._id, i)}
                                  disabled={joining === plan._id + '-' + i}
                                  className="btn btn-ghost btn-sm text-xs"
                                  style={{ color: '#991B1B' }}>
                                  {joining === plan._id + '-' + i ? '…' : 'Leave Group'}
                                </button>
                              ) : (
                                <button
                                  onClick={() => joinGroup(plan._id, i)}
                                  disabled={joining === plan._id + '-' + i}
                                  className="btn btn-primary btn-sm text-xs">
                                  {joining === plan._id + '-' + i ? '…' : '+ Join This Group'}
                                </button>
                              )}
                            </div>
                          )}

                          {member.is_assigned && (
                            <div className="text-xs mt-2 px-2 py-1 rounded"
                              style={{ background: 'rgba(192,87,10,.08)', color: 'var(--saffron)' }}>
                              🔒 Assigned group — contact organiser to join
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Combined itinerary */}
                  {plan.combined_itinerary && (
                    <div className="px-5 pb-5">
                      <h4 className="font-serif text-lg font-medium mb-3">Group Itinerary at {plan.destination}</h4>
                      <div className="text-sm leading-relaxed p-4 rounded-xl"
                        style={{ background: 'var(--ivory2)', color: 'var(--muted)', whiteSpace: 'pre-wrap' }}>
                        {plan.combined_itinerary}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="px-5 pb-5">
                    <Link href={'/temple/' + plan.temple_name.toLowerCase().replace(/ /g, '-')}
                      className="btn btn-secondary btn-sm">
                      View Temple Page →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
