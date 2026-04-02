'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Loader2, MapPin, Star, BookOpen, Target, LogOut, Camera, TrendingUp } from 'lucide-react'
import { finverseLink } from '@/lib/utils'

interface VisitedTemple {
  temple_slug: string
  temple_name?: string
  visited_at?: string
  rating?: number
  notes?: string
}

interface Temple {
  slug: string
  name: string
  city: string
  state: string
  deity: string
  image_url?: string
  categories?: string[]
  rating_avg?: number
  type?: string
}

interface SavingsGoal {
  id: string
  yatra_name: string
  target_amount: number
  current_amount: number
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [visits, setVisits]           = useState<VisitedTemple[]>([])
  const [visitedTemples, setVisitedTemples] = useState<Temple[]>([])
  const [recommendations, setRecommendations] = useState<Temple[]>([])
  const [goals, setGoals]             = useState<SavingsGoal[]>([])
  const [loading, setLoading]         = useState(true)
  const [activeTab, setActiveTab]     = useState<'visited'|'recommendations'|'goals'>('visited')

  useEffect(() => {
    if (status === 'authenticated') loadData()
    if (status !== 'loading') setLoading(false)
  }, [status])

  async function loadData() {
    setLoading(true)
    try {
      const [visitsRes, goalsRes] = await Promise.all([
        fetch('/api/visits'),
        fetch('/api/goals'),
      ])
      const visitsData = await visitsRes.json()
      const goalsData  = await goalsRes.json()

      const visitList: VisitedTemple[] = visitsData.visits || []
      setVisits(visitList)
      setGoals(goalsData.data || [])

      // Fetch temple details for visited temples
      if (visitList.length > 0) {
        const slugs = visitList.map((v: VisitedTemple) => v.temple_slug).join(',')
        const templesRes = await fetch('/api/temples?slugs=' + slugs + '&limit=50')
        const templesData = await templesRes.json()
        setVisitedTemples(templesData.temples || [])

        // Build recommendations based on deities/categories of visited temples
        const deities = [...new Set((templesData.temples || []).map((t: Temple) => t.deity))]
        if (deities.length > 0) {
          const recRes = await fetch('/api/temples?deity=' + encodeURIComponent(deities[0]) + '&limit=8&exclude=' + slugs)
          const recData = await recRes.json()
          setRecommendations(recData.temples || [])
        } else {
          // No visits yet — show popular temples
          const recRes = await fetch('/api/temples?limit=8&sort=rating')
          const recData = await recRes.json()
          setRecommendations(recData.temples || [])
        }
      } else {
        // No visits — recommend popular temples
        const recRes = await fetch('/api/temples?limit=8&sort=rating')
        const recData = await recRes.json()
        setRecommendations(recData.temples || [])
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">🙏</div>
        <h1 className="font-serif text-3xl font-medium mb-3">Your Yatra Profile</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          Sign in to track your temple visits, save goals and get personalised recommendations.
        </p>
        <Link href="/auth/signin" className="btn btn-primary">Sign in</Link>
      </div>
    )
  }

  // ── Stats ──────────────────────────────────────────────────────────────
  const statesVisited  = [...new Set(visitedTemples.map(t => t.state))].filter(Boolean)
  const deitiesVisited = [...new Set(visitedTemples.map(t => t.deity))].filter(Boolean)
  const totalSaved     = goals.reduce((s, g) => s + g.current_amount, 0)
  const totalTarget    = goals.reduce((s, g) => s + g.target_amount, 0)
  const savingsPct     = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0

  const user = session?.user
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase() || 'YA'

  const TABS = [
    { id: 'visited',         label: '🛕 Temples Visited', count: visits.length },
    { id: 'recommendations', label: '✨ For You',          count: recommendations.length },
    { id: 'goals',           label: '💰 Savings Goals',   count: goals.length },
  ] as const

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* ── Hero Profile Card ── */}
      <div className="rounded-3xl overflow-hidden mb-6"
        style={{ background: 'linear-gradient(135deg, var(--crim-dk) 0%, #2d0a0a 50%, #1a0505 100%)' }}>

        {/* Cover pattern */}
        <div style={{
          height: 120,
          background: 'repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0px, rgba(255,255,255,.03) 1px, transparent 1px, transparent 20px)',
          borderBottom: '1px solid rgba(255,255,255,.05)',
        }} />

        <div className="px-6 pb-6">
          {/* Avatar */}
          <div style={{ marginTop: -40, marginBottom: 16 }}>
            {user?.image ? (
              <img src={user.image} alt={user.name || ''} style={{
                width: 80, height: 80, borderRadius: '50%',
                border: '4px solid rgba(255,255,255,.15)',
                objectFit: 'cover',
              }} />
            ) : (
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--saffron))',
                border: '4px solid rgba(255,255,255,.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700, color: 'white',
                fontFamily: 'var(--font-serif)',
              }}>
                {initials}
              </div>
            )}
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl font-medium text-white mb-0.5">
                {user?.name || 'Yatra Explorer'}
              </h1>
              <p style={{ fontSize: 13, color: 'rgba(237,224,196,.5)' }}>{user?.email}</p>
              {visits.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span style={{ fontSize: 12, color: 'var(--gold-lt)', fontWeight: 600 }}>
                    🏅 {visits.length >= 50 ? 'Yatra Master' : visits.length >= 20 ? 'Seasoned Pilgrim' : visits.length >= 10 ? 'Devoted Pilgrim' : visits.length >= 5 ? 'Temple Seeker' : 'Yatra Beginner'}
                  </span>
                </div>
              )}
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
              style={{ background: 'rgba(255,255,255,.08)', color: 'rgba(237,224,196,.6)', border: '1px solid rgba(255,255,255,.1)' }}>
              <LogOut size={12} /> Sign Out
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mt-5">
            {[
              { label: 'Temples', value: visits.length, icon: '🛕' },
              { label: 'States',  value: statesVisited.length,  icon: '🗺️' },
              { label: 'Deities', value: deitiesVisited.length, icon: '🪔' },
              { label: 'Goals',   value: goals.length,          icon: '💰' },
            ].map(stat => (
              <div key={stat.label} className="text-center rounded-2xl p-3"
                style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)' }}>
                <div style={{ fontSize: 20, marginBottom: 2 }}>{stat.icon}</div>
                <div className="font-serif text-2xl font-medium" style={{ color: 'var(--gold-lt)' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(237,224,196,.4)', textTransform: 'uppercase', letterSpacing: '.07em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Savings progress */}
          {totalTarget > 0 && (
            <div className="mt-4 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)' }}>
              <div className="flex justify-between text-xs mb-2" style={{ color: 'rgba(237,224,196,.6)' }}>
                <span>💰 Total Yatra Savings</span>
                <span>{savingsPct}% of ₹{totalTarget.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.1)' }}>
                <div className="h-full rounded-full" style={{ width: savingsPct + '%', background: 'var(--gold-lt)', transition: 'width .7s ease' }} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── States visited map text ── */}
      {statesVisited.length > 0 && (
        <div className="card card-p mb-6 flex items-center gap-4">
          <MapPin size={20} style={{ color: 'var(--crimson)', flexShrink: 0 }} />
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              States Explored
            </div>
            <div className="flex flex-wrap gap-1.5">
              {statesVisited.map(s => (
                <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(192,87,10,.1)', color: 'var(--saffron)', border: '1px solid rgba(192,87,10,.2)' }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Tabs ── */}
      <div className="flex gap-0 border-b mb-6" style={{ borderColor: 'var(--border)' }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className="px-5 py-3 text-sm whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5"
            style={{
              borderColor: activeTab === tab.id ? 'var(--crimson)' : 'transparent',
              color: activeTab === tab.id ? 'var(--crimson)' : 'var(--muted)',
              fontWeight: activeTab === tab.id ? '600' : '400',
            }}>
            {tab.label}
            {tab.count > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: activeTab === tab.id ? 'rgba(192,87,10,.1)' : 'var(--ivory2)', color: activeTab === tab.id ? 'var(--crimson)' : 'var(--muted2)' }}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin" style={{ color: 'var(--crimson)' }} />
        </div>
      ) : (
        <>
          {/* ── Visited Temples ── */}
          {activeTab === 'visited' && (
            <div>
              {visits.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">🛕</div>
                  <h3 className="font-serif text-2xl font-medium mb-2">No temples visited yet</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                    Mark temples as visited from their detail pages to track your yatra journey.
                  </p>
                  <Link href="/explore" className="btn btn-primary">Explore Temples</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visitedTemples.map(temple => {
                    const visit = visits.find(v => v.temple_slug === temple.slug)
                    return (
                      <Link key={temple.slug} href={'/temple/' + temple.slug}
                        className="card overflow-hidden flex gap-0 hover:-translate-y-0.5 transition-all block">
                        {/* Image */}
                        <div style={{ width: 90, flexShrink: 0, background: 'linear-gradient(135deg, var(--crimson), var(--crim-lt))', position: 'relative' }}>
                          {temple.image_url ? (
                            <img src={temple.image_url} alt={temple.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 28 }}>🛕</div>
                          )}
                          <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(22,163,74,.9)', borderRadius: 20, padding: '2px 6px', fontSize: 9, fontWeight: 700, color: 'white' }}>
                            ✓ Visited
                          </div>
                        </div>
                        {/* Info */}
                        <div className="p-3 flex-1">
                          <h3 className="font-serif text-sm font-medium leading-tight mb-0.5" style={{ color: 'var(--ink)' }}>
                            {temple.name}
                          </h3>
                          <p className="text-xs mb-1.5" style={{ color: 'var(--muted2)' }}>
                            {temple.deity} · {temple.city}, {temple.state}
                          </p>
                          {visit?.visited_at && (
                            <p className="text-xs" style={{ color: 'var(--muted2)' }}>
                              📅 {new Date(visit.visited_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                            </p>
                          )}
                          {temple.rating_avg && temple.rating_avg > 0 ? (
                            <div className="flex items-center gap-1 mt-1">
                              <Star size={10} style={{ color: 'var(--gold)' }} fill="currentColor" />
                              <span className="text-xs" style={{ color: 'var(--muted2)' }}>{temple.rating_avg}</span>
                            </div>
                          ) : null}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}

              {visits.length > 0 && (
                <div className="mt-6 text-center">
                  <Link href="/explore" className="btn btn-secondary">
                    Explore More Temples →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* ── Recommendations ── */}
          {activeTab === 'recommendations' && (
            <div>
              <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
                {visits.length > 0
                  ? 'Based on temples you\'ve visited — you may love these too'
                  : 'Top-rated temples to begin your yatra journey'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recommendations.map(temple => (
                  <Link key={temple.slug} href={'/temple/' + temple.slug}
                    className="card overflow-hidden hover:-translate-y-1 transition-all block">
                    <div className="h-28 relative flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, var(--crimson), var(--crim-lt))' }}>
                      {temple.image_url ? (
                        <img src={temple.image_url} alt={temple.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
                      ) : (
                        <span style={{ fontSize: 32, opacity: .3 }}>🛕</span>
                      )}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.5), transparent)' }} />
                      {temple.rating_avg && temple.rating_avg > 0 ? (
                        <span style={{ position: 'absolute', bottom: 6, right: 6, fontSize: 11, color: '#EDD9A3', fontWeight: 600 }}>
                          ★ {temple.rating_avg}
                        </span>
                      ) : null}
                    </div>
                    <div className="p-3">
                      <h3 className="font-serif text-sm font-medium truncate" style={{ color: 'var(--ink)' }}>
                        {temple.name}
                      </h3>
                      <p className="text-xs truncate" style={{ color: 'var(--muted2)' }}>
                        {temple.city}, {temple.state}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--saffron)' }}>
                        {temple.deity}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card card-p" style={{ background: 'linear-gradient(135deg, var(--crimson), #4a0a0a)', color: 'white' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>🤖</div>
                  <h3 className="font-serif text-lg font-medium mb-1">Plan a New Yatra</h3>
                  <p style={{ fontSize: 12, opacity: .7, marginBottom: 12 }}>
                    Get a personalised AI itinerary for your next pilgrimage
                  </p>
                  <Link href="/plan" className="btn btn-sm"
                    style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>
                    Start Planning →
                  </Link>
                </div>
                <div className="card card-p">
                  <div style={{ fontSize: 24, marginBottom: 8 }}>💰</div>
                  <h3 className="font-serif text-lg font-medium mb-1">Start Saving</h3>
                  <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                    Set a savings goal for your next yatra and track monthly progress
                  </p>
                  <Link href="/yatra/goals" className="btn btn-primary btn-sm">
                    Set Goal →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── Savings Goals ── */}
          {activeTab === 'goals' && (
            <div>
              {goals.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-5xl mb-4">💰</div>
                  <h3 className="font-serif text-2xl font-medium mb-2">No savings goals yet</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                    Set a monthly savings goal for your next pilgrimage.
                  </p>
                  <Link href="/yatra/goals" className="btn btn-primary">Create Goal</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {goals.map(goal => {
                    const pct = Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100))
                    const remaining = goal.target_amount - goal.current_amount
                    return (
                      <div key={goal.id} className="card card-p">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-serif text-lg font-medium">{goal.yatra_name}</h3>
                            <p className="text-xs" style={{ color: 'var(--muted2)' }}>
                              ₹{goal.current_amount.toLocaleString('en-IN')} saved of ₹{goal.target_amount.toLocaleString('en-IN')}
                            </p>
                          </div>
                          {pct >= 100 && <span className="badge-gold text-[10px]">🎉 Ready!</span>}
                        </div>
                        <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: 'var(--ivory3)' }}>
                          <div className="h-full rounded-full transition-all duration-700"
                            style={{ width: pct + '%', background: pct >= 100 ? 'var(--gold)' : 'var(--crimson)' }} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs" style={{ color: 'var(--muted2)' }}>
                            {pct}% · ₹{remaining.toLocaleString('en-IN')} remaining
                          </span>
                          <div className="flex gap-2">
                            <Link href={'/yatra/goals'} className="btn btn-secondary btn-sm">
                              Manage →
                            </Link>
                            <a href={finverseLink({ action: 'savings', goal_name: goal.yatra_name, amount: remaining })}
                              target="_blank" rel="noopener"
                              className="btn btn-gold btn-sm flex items-center gap-1">
                              <TrendingUp size={11} /> FinVerse
                            </a>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="text-center pt-2">
                    <Link href="/yatra/goals" className="btn btn-primary">+ New Goal</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
