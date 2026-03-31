'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Plus, Trash2, Share2, Users } from 'lucide-react'
import { formatINR, calculateSettlements } from '@/lib/utils'
import type { GroupSplit, Expense } from '@/types'

export default function SplitPage() {
  const { data: session, status } = useSession()
  const [splits, setSplits] = useState<GroupSplit[]>([])
  const [activeSplit, setActiveSplit] = useState<GroupSplit | null>(null)
  const [loading, setLoading] = useState(true)
  const [showNew, setShowNew] = useState(false)
  const [newName, setNewName] = useState('')
  const [newMember, setNewMember] = useState('')
  const [expForm, setExpForm] = useState({ description: '', amount: '', paid_by: '' })
  const [showSettlement, setShowSettlement] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') fetchSplits()
    if (status !== 'loading') setLoading(false)
  }, [status])

  const fetchSplits = async () => {
    const res = await fetch('/api/splits')
    const { data } = await res.json()
    setSplits(data || [])
    if (data?.[0]) setActiveSplit(data[0])
    setLoading(false)
  }

  const createSplit = async () => {
    if (!newName.trim()) return
    const res = await fetch('/api/splits', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ yatra_name: newName, members: [], expenses: [] }),
    })
    const { data } = await res.json()
    if (data) { setSplits(prev => [data, ...prev]); setActiveSplit(data); setShowNew(false); setNewName('') }
  }

  const updateSplit = async (updated: GroupSplit) => {
    setActiveSplit(updated)
    setSplits(prev => prev.map(s => s.id === updated.id ? updated : s))
    await fetch('/api/splits', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: updated.id, yatra_name: updated.yatra_name, members: updated.members, expenses: updated.expenses }),
    })
  }

  const addMember = () => {
    if (!newMember.trim() || !activeSplit) return
    if (activeSplit.members.includes(newMember.trim())) return
    updateSplit({ ...activeSplit, members: [...activeSplit.members, newMember.trim()] })
    setNewMember('')
  }

  const removeMember = (name: string) => {
    if (!activeSplit) return
    updateSplit({ ...activeSplit, members: activeSplit.members.filter(m => m !== name) })
  }

  const addExpense = () => {
    if (!activeSplit || !expForm.description || !expForm.amount || !expForm.paid_by) return
    const expense: Expense = {
      id: Date.now().toString(), description: expForm.description,
      amount: parseFloat(expForm.amount), paid_by: expForm.paid_by,
      split_type: 'equal', created_at: new Date().toISOString(),
    }
    updateSplit({ ...activeSplit, expenses: [...activeSplit.expenses, expense] })
    setExpForm({ description: '', amount: '', paid_by: expForm.paid_by })
  }

  const removeExpense = (id: string) => {
    if (!activeSplit) return
    updateSplit({ ...activeSplit, expenses: activeSplit.expenses.filter(e => e.id !== id) })
  }

  const shareWhatsApp = () => {
    if (!activeSplit) return
    const total = activeSplit.expenses.reduce((s, e) => s + e.amount, 0)
    const perHead = activeSplit.members.length > 0 ? total / activeSplit.members.length : 0
    const settlements = calculateSettlements(activeSplit.members, activeSplit.expenses)
    let msg = `*Yatra Group Split — ${activeSplit.yatra_name}*\n`
    msg += `_via DivyaDarshan_\n\n`
    msg += `👥 Pilgrims: ${activeSplit.members.join(', ')}\n`
    msg += `💰 Total: ${formatINR(total)} · Per person: ${formatINR(Math.round(perHead))}\n\n`
    msg += `*Expenses:*\n`
    activeSplit.expenses.forEach(e => msg += `• ${e.description}: ${formatINR(e.amount)} (${e.paid_by})\n`)
    if (settlements.length > 0) {
      msg += `\n*Settlements:*\n`
      settlements.forEach(s => msg += `• ${s.from} → ${s.to}: ${formatINR(s.amount)}\n`)
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">👥</div>
        <h1 className="font-serif text-3xl font-medium mb-3">Group Yatra Split</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Sign in to track group expenses and split costs fairly.</p>
        <Link href="/auth/signin" className="btn btn-primary">Sign in</Link>
      </div>
    )
  }

  const settlements = activeSplit ? calculateSettlements(activeSplit.members, activeSplit.expenses) : []
  const total = activeSplit?.expenses.reduce((s, e) => s + e.amount, 0) || 0
  const perHead = activeSplit && activeSplit.members.length > 0 ? total / activeSplit.members.length : 0

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="section-title">Travel Together, Split Fairly</div>
          <h1 className="font-serif text-4xl font-medium">Group Expense Split</h1>
        </div>
        <button onClick={() => setShowNew(true)} className="btn btn-primary flex items-center gap-2">
          <Plus size={16} /> New Yatra
        </button>
      </div>

      {/* New split form */}
      {showNew && (
        <div className="card card-p mb-6">
          <label className="label">Yatra Name</label>
          <div className="flex gap-3">
            <input className="input flex-1" placeholder="e.g. Char Dham 2026, Ashtavinayak with family…"
              value={newName} onChange={e => setNewName(e.target.value)} onKeyDown={e => e.key === 'Enter' && createSplit()} autoFocus />
            <button onClick={createSplit} className="btn btn-primary">Create</button>
            <button onClick={() => setShowNew(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Splits list */}
        <div className="lg:col-span-1">
          <div className="section-title mb-2">Your Yatras</div>
          {splits.length === 0 ? (
            <div className="card card-p text-center text-sm" style={{ color: 'var(--muted2)' }}>
              No group yatras yet.<br />Create one to get started.
            </div>
          ) : (
            <div className="space-y-2">
              {splits.map(s => (
                <button key={s.id} onClick={() => { setActiveSplit(s); setShowSettlement(false) }}
                  className="w-full text-left card card-p transition-all"
                  style={{ borderColor: activeSplit?.id === s.id ? 'var(--crimson)' : 'var(--border)', background: activeSplit?.id === s.id ? '#FFF5F5' : 'var(--white)' }}>
                  <div className="flex items-center gap-2">
                    <Users size={14} style={{ color: 'var(--crimson)' }} />
                    <span className="font-medium text-sm">{s.yatra_name}</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--muted2)' }}>
                    {s.members.length} pilgrims · {s.expenses.length} expenses
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Active split */}
        {activeSplit && (
          <div className="lg:col-span-2 space-y-5">
            <div className="card card-p">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-2xl font-medium">{activeSplit.yatra_name}</h2>
                <button onClick={shareWhatsApp} className="btn btn-secondary btn-sm flex items-center gap-1.5">
                  <Share2 size={13} /> Share on WhatsApp
                </button>
              </div>

              {/* Members */}
              <div className="mb-5">
                <div className="section-title mb-2">Pilgrims</div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {activeSplit.members.map(m => (
                    <div key={m} className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm"
                      style={{ background: 'var(--ivory2)', border: '1px solid var(--border)' }}>
                      {m}
                      <button onClick={() => removeMember(m)} className="text-stone-400 hover:text-red-500 text-xs leading-none">×</button>
                    </div>
                  ))}
                  {activeSplit.members.length === 0 && <span className="text-xs" style={{ color: 'var(--muted2)' }}>No pilgrims added yet</span>}
                </div>
                <div className="flex gap-2">
                  <input className="input flex-1" placeholder="Add pilgrim name…" value={newMember}
                    onChange={e => setNewMember(e.target.value)} onKeyDown={e => e.key === 'Enter' && addMember()} />
                  <button onClick={addMember} className="btn btn-secondary btn-sm">Add</button>
                </div>
              </div>

              {/* Expenses */}
              <div>
                <div className="section-title mb-2">Expenses</div>
                {activeSplit.expenses.length > 0 && (
                  <div className="mb-3 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ borderBottom: '1px solid var(--border)' }}>
                          <th className="text-left py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted2)' }}>Description</th>
                          <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted2)' }}>Amount</th>
                          <th className="text-right py-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--muted2)' }}>Paid By</th>
                          <th className="w-8"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeSplit.expenses.map(exp => (
                          <tr key={exp.id} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td className="py-2.5">{exp.description}</td>
                            <td className="py-2.5 text-right font-medium">{formatINR(exp.amount)}</td>
                            <td className="py-2.5 text-right" style={{ color: 'var(--muted2)' }}>{exp.paid_by}</td>
                            <td className="py-2.5 text-right">
                              <button onClick={() => removeExpense(exp.id)} className="text-stone-400 hover:text-red-500"><Trash2 size={12} /></button>
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="py-2 font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--muted2)' }}>Total</td>
                          <td className="py-2 text-right font-serif font-medium" style={{ color: 'var(--crimson)' }}>{formatINR(total)}</td>
                          <td colSpan={2}></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Add expense row */}
                {activeSplit.members.length >= 2 ? (
                  <div className="flex flex-wrap gap-2">
                    <input className="input flex-1 min-w-[140px]" placeholder="Description" value={expForm.description} onChange={e => setExpForm(f => ({ ...f, description: e.target.value }))} />
                    <input className="input w-28" type="number" placeholder="₹ Amount" min="1" value={expForm.amount} onChange={e => setExpForm(f => ({ ...f, amount: e.target.value }))} />
                    <select className="input w-36" value={expForm.paid_by} onChange={e => setExpForm(f => ({ ...f, paid_by: e.target.value }))}>
                      <option value="">Paid by…</option>
                      {activeSplit.members.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <button onClick={addExpense} className="btn btn-primary btn-sm">Add</button>
                  </div>
                ) : (
                  <p className="text-xs" style={{ color: 'var(--muted2)' }}>Add at least 2 pilgrims to log expenses.</p>
                )}
              </div>
            </div>

            {/* Settlement */}
            {activeSplit.expenses.length > 0 && activeSplit.members.length >= 2 && (
              <div className="card card-p">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-medium">Settlement</h3>
                  <div className="flex gap-2 text-sm" style={{ color: 'var(--muted2)' }}>
                    <span>{formatINR(total)} total · </span>
                    <span>{formatINR(Math.round(perHead))} per person</span>
                  </div>
                </div>

                {settlements.length === 0 ? (
                  <div className="text-center py-4 text-sm" style={{ color: 'var(--muted2)' }}>
                    🎉 All even — no settlements needed!
                  </div>
                ) : (
                  <div className="space-y-2">
                    {settlements.map((s, i) => (
                      <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                        style={{ background: 'var(--ivory2)', border: '1px solid var(--border)' }}>
                        <span className="font-semibold" style={{ color: 'var(--live)' }}>{s.from}</span>
                        <span style={{ color: 'var(--muted2)' }}>pays</span>
                        <span className="font-semibold" style={{ color: '#1B5E20' }}>{s.to}</span>
                        <span className="ml-auto font-serif text-lg font-medium" style={{ color: 'var(--ink)' }}>{formatINR(s.amount)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
