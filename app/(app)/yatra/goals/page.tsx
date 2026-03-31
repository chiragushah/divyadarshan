'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2, Plus, Trash2, TrendingUp } from 'lucide-react'
import { formatINR, finverseLink } from '@/lib/utils'
import type { SavingsGoal } from '@/types'

export default function GoalsPage() {
  const { data: session, status } = useSession()
  const [goals, setGoals] = useState<SavingsGoal[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [depositGoalId, setDepositGoalId] = useState<string | null>(null)
  const [depositAmount, setDepositAmount] = useState('')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ yatra_name: '', target_amount: '', monthly_target: '', deadline: '' })

  useEffect(() => {
    if (status === 'authenticated') fetchGoals()
    if (status !== 'loading') setLoading(false)
  }, [status])

  const fetchGoals = async () => {
    setLoading(true)
    const res = await fetch('/api/goals')
    const { data } = await res.json()
    setGoals(data || [])
    setLoading(false)
  }

  const createGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const res = await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        yatra_name: form.yatra_name,
        target_amount: parseInt(form.target_amount),
        monthly_target: parseInt(form.monthly_target) || 0,
        deadline: form.deadline || null,
      }),
    })
    const { data } = await res.json()
    if (data) { setGoals(prev => [data, ...prev]); setShowForm(false); setForm({ yatra_name: '', target_amount: '', monthly_target: '', deadline: '' }) }
    setSaving(false)
  }

  const addDeposit = async (goalId: string) => {
    const amt = parseInt(depositAmount)
    if (!amt || amt < 1) return
    const res = await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deposit', goal_id: goalId, amount: amt }),
    })
    if (res.ok) {
      setGoals(prev => prev.map(g => g.id === goalId ? { ...g, current_amount: g.current_amount + amt } : g))
      setDepositGoalId(null)
      setDepositAmount('')
    }
  }

  const deleteGoal = async (id: string) => {
    if (!confirm('Delete this savings goal?')) return
    await fetch('/api/goals', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setGoals(prev => prev.filter(g => g.id !== id))
  }

  const totalSaved = goals.reduce((s, g) => s + g.current_amount, 0)
  const totalTarget = goals.reduce((s, g) => s + g.target_amount, 0)

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">💰</div>
        <h1 className="font-serif text-3xl font-medium mb-3">Yatra Savings Goals</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Sign in to set savings goals for your pilgrimages and track monthly progress.</p>
        <Link href="/auth/signin" className="btn btn-primary">Sign in to start saving</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="section-title">Your Yatra Fund</div>
          <h1 className="font-serif text-4xl font-medium">Savings Goals</h1>
        </div>
        <button onClick={() => setShowForm(f => !f)} className="btn btn-primary flex items-center gap-2">
          <Plus size={16} /> New Goal
        </button>
      </div>

      {/* Summary */}
      {goals.length > 0 && (
        <div className="rounded-2xl p-6 mb-8 text-white" style={{ background: 'linear-gradient(135deg, var(--crim-dk), var(--crimson))' }}>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div><div className="font-serif text-3xl font-medium" style={{ color: 'var(--gold-lt)' }}>{goals.length}</div><div className="text-xs opacity-50">Active Goals</div></div>
            <div><div className="font-serif text-3xl font-medium" style={{ color: 'var(--gold-lt)' }}>{formatINR(totalSaved)}</div><div className="text-xs opacity-50">Total Saved</div></div>
            <div><div className="font-serif text-3xl font-medium" style={{ color: 'var(--gold-lt)' }}>{formatINR(totalTarget - totalSaved)}</div><div className="text-xs opacity-50">Remaining</div></div>
          </div>
          {totalTarget > 0 && (
            <div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,.15)' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (totalSaved / totalTarget) * 100).toFixed(0)}%`, background: 'var(--gold-lt)' }} />
              </div>
              <p className="text-xs mt-2 opacity-50">{((totalSaved / totalTarget) * 100).toFixed(0)}% of total target saved</p>
            </div>
          )}
        </div>
      )}

      {/* Create Goal Form */}
      {showForm && (
        <form onSubmit={createGoal} className="card card-p mb-8">
          <h2 className="font-serif text-2xl font-medium mb-5">Create Savings Goal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="label">Yatra Name</label>
              <input className="input" placeholder="e.g. Char Dham 2026, Vaishno Devi, Tirupati Family Trip…"
                value={form.yatra_name} onChange={e => setForm(f => ({ ...f, yatra_name: e.target.value }))} required />
            </div>
            <div>
              <label className="label">Target Amount (₹)</label>
              <input className="input" type="number" placeholder="e.g. 50000" min="1"
                value={form.target_amount} onChange={e => setForm(f => ({ ...f, target_amount: e.target.value }))} required />
            </div>
            <div>
              <label className="label">Monthly Savings Target (₹)</label>
              <input className="input" type="number" placeholder="e.g. 3200" min="0"
                value={form.monthly_target} onChange={e => setForm(f => ({ ...f, monthly_target: e.target.value }))} />
            </div>
            <div>
              <label className="label">Target Date (optional)</label>
              <input className="input" type="date" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? <><Loader2 size={15} className="animate-spin" /> Creating…</> : 'Create Goal'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {/* Goals List */}
      {loading ? (
        <div className="space-y-4">{[1,2].map(i => <div key={i} className="skeleton h-40 rounded-xl" />)}</div>
      ) : goals.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🏦</div>
          <h3 className="font-serif text-2xl font-medium mb-2">Start your first Yatra Fund</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Set a monthly savings goal for your next pilgrimage and track your progress.</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary">Create Goal</button>
        </div>
      ) : (
        <div className="space-y-5">
          {goals.map(goal => {
            const pct = Math.min(100, Math.round((goal.current_amount / goal.target_amount) * 100))
            const remaining = goal.target_amount - goal.current_amount
            const monthsLeft = goal.monthly_target > 0 ? Math.ceil(remaining / goal.monthly_target) : null

            return (
              <div key={goal.id} className="card card-p">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-xl font-medium">{goal.yatra_name}</h3>
                    {goal.deadline && (
                      <p className="text-xs" style={{ color: 'var(--muted2)' }}>
                        Target: {new Date(goal.deadline).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                        {monthsLeft && ` · ${monthsLeft} months to go`}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {pct >= 100 && <span className="badge-gold text-[10px]">🎉 Ready!</span>}
                    <button onClick={() => deleteGoal(goal.id)} className="text-stone-400 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1.5" style={{ color: 'var(--muted2)' }}>
                    <span>{formatINR(goal.current_amount)} saved</span>
                    <span>{pct}% · {formatINR(goal.target_amount)} total</span>
                  </div>
                  <div className="h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--ivory3)' }}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: pct >= 100 ? 'var(--gold)' : 'var(--crimson)' }} />
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mb-4 text-xs" style={{ color: 'var(--muted2)' }}>
                  <span><strong style={{ color: 'var(--ink)' }}>{formatINR(remaining)}</strong> remaining</span>
                  {goal.monthly_target > 0 && <span><strong style={{ color: 'var(--ink)' }}>{formatINR(goal.monthly_target)}</strong>/month target</span>}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {depositGoalId === goal.id ? (
                    <div className="flex items-center gap-2">
                      <input className="input w-36 text-sm py-1.5" type="number" placeholder="Amount ₹" min="1"
                        value={depositAmount} onChange={e => setDepositAmount(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addDeposit(goal.id)} autoFocus />
                      <button onClick={() => addDeposit(goal.id)} className="btn btn-primary btn-sm">Add</button>
                      <button onClick={() => { setDepositGoalId(null); setDepositAmount('') }} className="btn btn-secondary btn-sm">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setDepositGoalId(goal.id)} className="btn btn-primary btn-sm">
                      + Add Savings
                    </button>
                  )}
                  <a href={finverseLink({ action: 'savings', goal_name: goal.yatra_name, amount: remaining })}
                    target="_blank" rel="noopener" className="btn btn-gold btn-sm flex items-center gap-1.5">
                    <TrendingUp size={12} /> Open in FinVerse
                  </a>
                  {pct >= 100 && (
                    <Link href={`/plan?destination=${encodeURIComponent(goal.yatra_name)}`}
                      className="btn btn-secondary btn-sm">Plan Your Yatra →</Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* FinVerse Banner */}
      <div className="mt-8 rounded-xl p-5 flex items-center justify-between gap-4" style={{ background: 'var(--ivory2)', border: '1px solid var(--border)' }}>
        <div>
          <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--gold-dk)' }}>Powered by FinVerse</div>
          <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>Open a dedicated Yatra Savings Account — earn interest while you save</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>Linked to your DivyaDarshan goals. Track savings in both apps.</p>
        </div>
        <a href={finverseLink({ action: 'savings', utm_content: 'goals_banner' })} target="_blank" rel="noopener" className="btn btn-gold whitespace-nowrap">
          Open Account →
        </a>
      </div>
    </div>
  )
}
