'use client'
export const dynamic = 'force-dynamic'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { formatINR, finverseLink } from '@/lib/utils'

// ── Base fallback costs (used before AI fetch) ────────────────────────────
const BASE = {
  transport: { train: 2200, flight: 6500, bus: 900, car: 3500 },
  stay:      { budget: 750, midrange: 2000, comfortable: 4500 },
  meals:     { basic: 300, moderate: 700, comfortable: 1200 },
  extras:    { guide_per_day: 1500, donations: 1200, pooja_samagri: 800, vip_darshan: 500 },
}

const DISTANCE_MULT: Record<string, number> = {
  'Nearby (< 300 km)':     0.6,
  'Regional (300-800 km)': 1.0,
  'Far (800-1500 km)':     1.5,
  'Very far (1500+ km)':   2.2,
}

type CostData = typeof BASE & {
  notes?: string
  season?: string
  last_updated?: string
}

export default function BudgetPage() {
  const [form, setForm] = useState({
    destination:      '',
    origin:           '',
    days:             3,
    pilgrims:         2,
    transport:        'train' as 'train'|'flight'|'bus'|'car',
    distance:         'Regional (300-800 km)',
    stay:             'budget' as 'budget'|'midrange'|'comfortable',
    meals:            'moderate' as 'basic'|'moderate'|'comfortable',
    includeGuide:     false,
    includeDonations: true,
    includePooja:     true,
    includeSpecial:   false,
    returnJourney:    true,
  })
  const [costs, setCosts]         = useState<CostData>(BASE)
  const [fetching, setFetching]   = useState(false)
  const [fetchMsg, setFetchMsg]   = useState('')
  const [isLive, setIsLive]       = useState(false)
  const debounceRef = useRef<any>(null)

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  // ── Fetch live prices from AI ─────────────────────────────────────────
  const fetchLivePrices = async () => {
    if (!form.destination.trim()) {
      setFetchMsg('Please enter a destination first.')
      return
    }
    setFetching(true)
    setFetchMsg('Searching current prices…')
    try {
      const res  = await fetch('/api/ai/budget-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: form.destination,
          origin:      form.origin,
          transport:   form.transport,
          days:        form.days,
          pilgrims:    form.pilgrims,
        }),
      })
      const data = await res.json()
      setCosts(data.costs)
      setIsLive(data.success)
      setFetchMsg(data.success
        ? `✅ Live prices updated for ${form.destination}`
        : `⚠️ ${data.error}`)
    } catch {
      setFetchMsg('⚠️ Could not fetch live prices. Using base estimates.')
    } finally {
      setFetching(false)
    }
  }

  // ── Calculation ───────────────────────────────────────────────────────
  const distMult     = DISTANCE_MULT[form.distance]
  const transportOne = Math.round(costs.transport[form.transport] * distMult * form.pilgrims)
  const transport    = form.returnJourney ? transportOne * 2 : transportOne
  const stayPer      = costs.stay[form.stay]
  const stay         = Math.round(stayPer * form.days * form.pilgrims)
  const meals        = Math.round(costs.meals[form.meals] * form.days * form.pilgrims)
  const guide        = form.includeGuide    ? Math.round(costs.extras.guide_per_day * form.days)   : 0
  const donations    = form.includeDonations? Math.round(costs.extras.donations     * form.pilgrims): 0
  const pooja        = form.includePooja    ? Math.round(costs.extras.pooja_samagri * form.pilgrims): 0
  const special      = form.includeSpecial  ? Math.round(costs.extras.vip_darshan   * form.pilgrims): 0
  const misc         = Math.round((transport + stay + meals + guide + donations + pooja + special) * 0.12)
  const total        = transport + stay + meals + guide + donations + pooja + special + misc
  const perPerson    = Math.round(total / form.pilgrims)

  const BREAKDOWN = [
    { label: `Transport (${form.returnJourney ? 'return' : 'one-way'})`, amount: transport,  icon: '🚅' },
    { label: `Stay (${form.days} nights)`,                                amount: stay,       icon: '🏨' },
    { label: `Meals (${form.days} days)`,                                 amount: meals,      icon: '🍱' },
    { label: 'Guide / Pandit fees',         amount: guide,    icon: '🙏', skip: !form.includeGuide     },
    { label: 'Temple donations',            amount: donations,icon: '🪔', skip: !form.includeDonations },
    { label: 'Pooja samagri & flowers',     amount: pooja,    icon: '🌸', skip: !form.includePooja     },
    { label: 'VIP / Special darshan',       amount: special,  icon: '🎟️', skip: !form.includeSpecial  },
    { label: 'Local travel + misc (12%)',   amount: misc,     icon: '📦' },
  ].filter(i => !i.skip && i.amount > 0)

  const monthsAt5k  = Math.ceil(total / 5000)
  const monthsAt10k = Math.ceil(total / 10000)

  const TRANSPORT_LABELS = { train: 'Train', flight: 'Flight', bus: 'Bus', car: 'Car' }
  const TRANSPORT_ICONS  = { train: '🚅', flight: '✈️', bus: '🚌', car: '🚕' }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="section-title">Plan Your Expenses</div>
      <h1 className="font-serif text-4xl font-medium mb-2">Yatra Budget Calculator</h1>
      <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
        Estimate the complete cost of your pilgrimage — transport, stay, meals, and temple expenses.
      </p>

      {/* Live price engine banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-8"
        style={{ background: isLive ? 'rgba(22,163,74,.08)' : 'rgba(192,87,10,.07)', border: `1.5px solid ${isLive ? 'rgba(22,163,74,.25)' : 'rgba(192,87,10,.2)'}` }}>
        <span style={{ fontSize: 20 }}>{isLive ? '✅' : '⚡'}</span>
        <div className="flex-1">
          <div className="text-xs font-semibold" style={{ color: isLive ? '#166534' : 'var(--saffron)' }}>
            {isLive ? 'Live prices active' : 'Dynamic Cost Engine'}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
            {fetchMsg || 'Enter your destination and click "Get Live Prices" to fetch current 2025 rates via AI + web search.'}
          </div>
          {costs.last_updated && isLive && (
            <div className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>
              Updated: {new Date(costs.last_updated).toLocaleTimeString('en-IN')}
            </div>
          )}
        </div>
        <button
          onClick={fetchLivePrices}
          disabled={fetching}
          className="btn btn-primary btn-sm whitespace-nowrap flex items-center gap-2"
          style={{ opacity: fetching ? .7 : 1 }}>
          {fetching
            ? <><span className="inline-block animate-spin">⟳</span> Fetching…</>
            : '⚡ Get Live Prices'}
        </button>
      </div>

      {/* Season tip */}
      {costs.season && costs.notes && isLive && (
        <div className="px-4 py-3 rounded-xl mb-6 text-sm"
          style={{ background: 'rgba(234,179,8,.07)', border: '1px solid rgba(234,179,8,.2)', color: '#92400E' }}>
          💡 <strong>Destination tip:</strong> {costs.notes}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Form ── */}
        <div className="card card-p space-y-5">

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Destination</label>
              <input className="input" placeholder="e.g. Kedarnath, Tirupati…"
                value={form.destination} onChange={e => set('destination', e.target.value)} />
            </div>
            <div>
              <label className="label">Starting from</label>
              <input className="input" placeholder="e.g. Mumbai, Delhi…"
                value={form.origin} onChange={e => set('origin', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Duration (Days)</label>
              <input className="input" type="number" min={1} max={30} value={form.days}
                onChange={e => set('days', parseInt(e.target.value) || 1)} />
            </div>
            <div>
              <label className="label">Pilgrims</label>
              <input className="input" type="number" min={1} max={20} value={form.pilgrims}
                onChange={e => set('pilgrims', parseInt(e.target.value) || 1)} />
            </div>
          </div>

          <div>
            <label className="label">Distance from your city</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(DISTANCE_MULT).map(d => (
                <button key={d} type="button" onClick={() => set('distance', d)}
                  className="py-2 px-3 rounded-lg text-xs border transition-all text-left"
                  style={{
                    borderColor: form.distance === d ? 'var(--crimson)' : 'var(--border)',
                    background:  form.distance === d ? '#FFF0F0' : 'var(--ivory)',
                    color:       form.distance === d ? 'var(--crimson)' : 'var(--ink)',
                    fontWeight:  form.distance === d ? '600' : '400',
                  }}>{d}</button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">
              Transport Mode
              {isLive && <span className="ml-2 text-xs" style={{ color: '#166534' }}>● Live prices</span>}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['train','flight','bus','car'] as const).map(mode => {
                const adj = Math.round(costs.transport[mode] * distMult)
                return (
                  <button key={mode} type="button" onClick={() => set('transport', mode)}
                    className="py-2 px-3 rounded-lg text-sm border transition-all"
                    style={{
                      borderColor: form.transport === mode ? 'var(--crimson)' : 'var(--border)',
                      background:  form.transport === mode ? '#FFF0F0' : 'var(--ivory)',
                      color:       form.transport === mode ? 'var(--crimson)' : 'var(--ink)',
                      fontWeight:  form.transport === mode ? '600' : '400',
                    }}>
                    {TRANSPORT_ICONS[mode]} {TRANSPORT_LABELS[mode]}
                    <span className="block text-xs opacity-60">≈{formatINR(adj)}/person</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="label">
              Accommodation (per night)
              {isLive && <span className="ml-2 text-xs" style={{ color: '#166534' }}>● Live prices</span>}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'budget',      label: 'Budget',      sub: `≈${formatINR(costs.stay.budget)}/night` },
                { key: 'midrange',    label: 'Mid-range',   sub: `≈${formatINR(costs.stay.midrange)}/night` },
                { key: 'comfortable', label: 'Comfortable', sub: `≈${formatINR(costs.stay.comfortable)}/night` },
              ] as const).map(opt => (
                <button key={opt.key} type="button" onClick={() => set('stay', opt.key)}
                  className="py-2 px-2 rounded-lg text-xs border transition-all"
                  style={{
                    borderColor: form.stay === opt.key ? 'var(--crimson)' : 'var(--border)',
                    background:  form.stay === opt.key ? '#FFF0F0' : 'var(--ivory)',
                    color:       form.stay === opt.key ? 'var(--crimson)' : 'var(--ink)',
                    fontWeight:  form.stay === opt.key ? '600' : '400',
                  }}>
                  {opt.label}
                  <span className="block text-[10px] opacity-60 mt-0.5">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Meals (per person/day)</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'basic',       label: 'Basic',       sub: `≈${formatINR(costs.meals.basic)}/day` },
                { key: 'moderate',    label: 'Moderate',    sub: `≈${formatINR(costs.meals.moderate)}/day` },
                { key: 'comfortable', label: 'Comfortable', sub: `≈${formatINR(costs.meals.comfortable)}/day` },
              ] as const).map(opt => (
                <button key={opt.key} type="button" onClick={() => set('meals', opt.key)}
                  className="py-2 px-2 rounded-lg text-xs border transition-all"
                  style={{
                    borderColor: form.meals === opt.key ? 'var(--crimson)' : 'var(--border)',
                    background:  form.meals === opt.key ? '#FFF0F0' : 'var(--ivory)',
                    color:       form.meals === opt.key ? 'var(--crimson)' : 'var(--ink)',
                    fontWeight:  form.meals === opt.key ? '600' : '400',
                  }}>
                  {opt.label}
                  <span className="block text-[10px] opacity-60 mt-0.5">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <label className="label">Include</label>
            {[
              { key: 'returnJourney',    label: 'Return journey transport' },
              { key: 'includeGuide',     label: `Guide / Pandit (${formatINR(costs.extras.guide_per_day)}/day)` },
              { key: 'includeDonations', label: `Temple donations (${formatINR(costs.extras.donations)}/pilgrim)` },
              { key: 'includePooja',     label: `Pooja samagri & flowers (${formatINR(costs.extras.pooja_samagri)}/pilgrim)` },
              { key: 'includeSpecial',   label: `VIP / Special darshan (${formatINR(costs.extras.vip_darshan)}/pilgrim)` },
            ].map(opt => (
              <label key={opt.key} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={(form as any)[opt.key]}
                  onChange={e => set(opt.key, e.target.checked)}
                  className="w-4 h-4 rounded" style={{ accentColor: 'var(--crimson)' }} />
                <span className="text-sm" style={{ color: 'var(--ink)' }}>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ── Results ── */}
        <div className="space-y-4">
          <div className="rounded-2xl p-6 text-white"
            style={{ background: 'linear-gradient(135deg, var(--crim-dk), var(--crimson))' }}>
            <div className="text-xs font-semibold tracking-widest uppercase mb-1"
              style={{ color: 'rgba(237,224,196,.5)' }}>
              {isLive ? '⚡ Live Estimated Total' : 'Estimated Total'}
            </div>
            <div className="font-serif text-5xl font-medium" style={{ color: 'var(--gold-lt)' }}>
              {formatINR(total)}
            </div>
            <div className="text-sm mt-1" style={{ color: 'rgba(237,224,196,.6)' }}>
              {formatINR(perPerson)} per person · {form.pilgrims} pilgrims · {form.days} days
            </div>
            <div className="mt-3 pt-3 border-t text-xs"
              style={{ borderColor: 'rgba(255,255,255,.1)', color: 'rgba(237,224,196,.4)' }}>
              Includes 12% buffer for local transport, entry fees & contingency
            </div>
          </div>

          <div className="card card-p">
            <div className="section-title mb-3">Cost Breakdown</div>
            <div className="space-y-2.5">
              {BREAKDOWN.map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm">
                    <span className="text-base">{item.icon}</span>
                    <span style={{ color: 'var(--muted)' }}>{item.label}</span>
                  </div>
                  <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>
                    {formatINR(item.amount)}
                  </span>
                </div>
              ))}
              <div className="pt-2.5 border-t flex justify-between font-semibold"
                style={{ borderColor: 'var(--border)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--crimson)' }}>{formatINR(total)}</span>
              </div>
            </div>
          </div>

          <div className="card card-p">
            <div className="section-title mb-3">Savings Plan</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: `Save ${formatINR(5000)}/mo`,  months: monthsAt5k  },
                { label: `Save ${formatINR(10000)}/mo`, months: monthsAt10k },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center"
                  style={{ background: 'var(--ivory2)' }}>
                  <div className="font-serif text-2xl font-medium"
                    style={{ color: 'var(--crimson)' }}>{s.months}</div>
                  <div className="text-xs" style={{ color: 'var(--muted2)' }}>months to go</div>
                  <div className="text-xs font-medium mt-0.5"
                    style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/yatra/goals?yatra=${encodeURIComponent(form.destination || 'My Yatra')}&amount=${total}`}
                className="btn btn-primary btn-sm flex-1 justify-center">
                Set Savings Goal
              </Link>
              <a href={finverseLink({ action: 'savings', amount: total, goal_name: form.destination, utm_content: 'budget_calc' })}
                target="_blank" rel="noopener"
                className="btn btn-gold btn-sm flex-1 justify-center">
                Open in FinVerse
              </a>
            </div>
          </div>

          <Link
            href={`/plan?destination=${encodeURIComponent(form.destination || '')}&days=${form.days}&pilgrims=${form.pilgrims}`}
            className="btn btn-secondary w-full justify-center">
            Generate Full Itinerary with AI →
          </Link>
        </div>
      </div>
    </div>
  )
}
