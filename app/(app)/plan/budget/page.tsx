'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'
import { formatINR, finverseLink } from '@/lib/utils'

const TRANSPORT_COST: Record<string, number> = {
  'Train':   800,
  'Flight':  3500,
  'Bus':     400,
  'Car':     1200,
}

const STAY_COST: Record<string, number> = {
  'Dharamshala / Free': 0,
  'Budget (₹500-800)':  650,
  'Mid-range (₹1500)':  1500,
  'Comfortable (₹3000)':3000,
}

const MEAL_COST: Record<string, number> = {
  'Prasad / Langar only': 0,
  'Basic (₹200/day)':     200,
  'Moderate (₹500/day)':  500,
  'Comfortable (₹800/day)':800,
}

export default function BudgetPage() {
  const [form, setForm] = useState({
    destination: '',
    days: 3,
    pilgrims: 2,
    transport: 'Train',
    stay: 'Budget (₹500-800)',
    meals: 'Moderate (₹500/day)',
    includeGuide: false,
    includeDonations: true,
    includePooja: true,
    returnJourney: true,
  })

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  // Calculate breakdown
  const transportOneway = TRANSPORT_COST[form.transport] * form.pilgrims
  const transport = form.returnJourney ? transportOneway * 2 : transportOneway
  const stay      = STAY_COST[form.stay] * form.days * form.pilgrims
  const meals     = MEAL_COST[form.meals] * form.days * form.pilgrims
  const guide     = form.includeGuide    ? 800 * form.days : 0
  const donations = form.includeDonations? 500 * form.pilgrims : 0
  const pooja     = form.includePooja    ? 300 * form.pilgrims : 0
  const misc      = Math.round((transport + stay + meals) * 0.1) // 10% buffer
  const total     = transport + stay + meals + guide + donations + pooja + misc
  const perPerson = Math.round(total / form.pilgrims)

  const BREAKDOWN = [
    { label: `Transport (${form.returnJourney ? 'return' : 'one way'})`, amount: transport, icon: '🚆' },
    { label: `Stay (${form.days} nights)`,                                amount: stay,      icon: '🏨' },
    { label: `Meals (${form.days} days)`,                                 amount: meals,     icon: '🍽️' },
    { label: 'Guide / Pandit',    amount: guide,     icon: '🙏', skip: !form.includeGuide     },
    { label: 'Temple Donations',  amount: donations, icon: '🪔', skip: !form.includeDonations },
    { label: 'Pooja Samagri',     amount: pooja,     icon: '🌺', skip: !form.includePooja     },
    { label: 'Miscellaneous (10%)',amount: misc,     icon: '📦' },
  ].filter(i => !i.skip && i.amount > 0)

  const monthsAt3k = Math.ceil(total / 3000)
  const monthsAt5k = Math.ceil(total / 5000)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="section-title">Plan Your Expenses</div>
      <h1 className="font-serif text-4xl font-medium mb-2">Yatra Budget Calculator</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--muted)' }}>
        Estimate the complete cost of your pilgrimage — transport, stay, meals, and temple expenses.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="card card-p space-y-5">
          <div>
            <label className="label">Destination</label>
            <input className="input" placeholder="e.g. Char Dham, Vaishno Devi, Tirupati…"
              value={form.destination} onChange={e => set('destination', e.target.value)} />
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
            <label className="label">Transport Mode</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(TRANSPORT_COST).map(mode => (
                <button key={mode} type="button" onClick={() => set('transport', mode)}
                  className="py-2 px-3 rounded-lg text-sm border transition-all"
                  style={{
                    borderColor: form.transport === mode ? 'var(--crimson)' : 'var(--border)',
                    background:  form.transport === mode ? '#FFF0F0' : 'var(--ivory)',
                    color:       form.transport === mode ? 'var(--crimson)' : 'var(--ink)',
                    fontWeight:  form.transport === mode ? '600' : '400',
                  }}>
                  {mode}
                  <span className="block text-xs opacity-60">≈{formatINR(TRANSPORT_COST[mode])}/person</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Accommodation</label>
            <select className="input" value={form.stay} onChange={e => set('stay', e.target.value)}>
              {Object.keys(STAY_COST).map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Meals</label>
            <select className="input" value={form.meals} onChange={e => set('meals', e.target.value)}>
              {Object.keys(MEAL_COST).map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div className="space-y-2.5 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
            <label className="label">Include</label>
            {[
              { key: 'returnJourney',    label: 'Return journey transport' },
              { key: 'includeGuide',     label: 'Local guide / Pandit fees' },
              { key: 'includeDonations', label: 'Temple donations & prasad' },
              { key: 'includePooja',     label: 'Pooja samagri & flowers'  },
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

        {/* Results */}
        <div className="space-y-4">
          {/* Total */}
          <div className="rounded-2xl p-6 text-white"
            style={{ background: 'linear-gradient(135deg, var(--crim-dk), var(--crimson))' }}>
            <div className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(237,224,196,.5)' }}>
              Estimated Total
            </div>
            <div className="font-serif text-5xl font-medium" style={{ color: 'var(--gold-lt)' }}>
              {formatINR(total)}
            </div>
            <div className="text-sm mt-1" style={{ color: 'rgba(237,224,196,.6)' }}>
              {formatINR(perPerson)} per person · {form.pilgrims} pilgrims · {form.days} days
            </div>
          </div>

          {/* Breakdown */}
          <div className="card card-p">
            <div className="section-title mb-3">Cost Breakdown</div>
            <div className="space-y-2.5">
              {BREAKDOWN.map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-sm">
                    <span className="text-base">{item.icon}</span>
                    <span style={{ color: 'var(--muted)' }}>{item.label}</span>
                  </div>
                  <span className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{formatINR(item.amount)}</span>
                </div>
              ))}
              <div className="pt-2.5 border-t flex justify-between font-semibold" style={{ borderColor: 'var(--border)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--crimson)' }}>{formatINR(total)}</span>
              </div>
            </div>
          </div>

          {/* Savings plan */}
          <div className="card card-p">
            <div className="section-title mb-3">Savings Plan</div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: 'Save ₹3,000/mo',  months: monthsAt3k },
                { label: 'Save ₹5,000/mo',  months: monthsAt5k },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center" style={{ background: 'var(--ivory2)' }}>
                  <div className="font-serif text-2xl font-medium" style={{ color: 'var(--crimson)' }}>{s.months}</div>
                  <div className="text-xs" style={{ color: 'var(--muted2)' }}>months to go</div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Link href={`/yatra/goals?yatra=${encodeURIComponent(form.destination || 'My Yatra')}&amount=${total}`}
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

          {/* Plan CTA */}
          <Link href={`/plan?destination=${encodeURIComponent(form.destination || '')}&days=${form.days}&pilgrims=${form.pilgrims}`}
            className="btn btn-secondary w-full justify-center">
            Generate Full Itinerary with AI →
          </Link>
        </div>
      </div>
    </div>
  )
}
