'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

type Status = 'pending' | 'approved' | 'rejected'
interface Item {
  _id: string; dish: string; variant: string; display_name: string; family: string; community?: string; place?: string
  title: string; what_differs: string; ingredient_changes: string; method_changes: string; offering_custom?: string; story?: string
  status: Status; moderator_note?: string; createdAt: string; user_email: string
}

const COLS: { id: Status; label: string; color: string; hint: string }[] = [
  { id: 'pending', label: 'Waiting for review', color: '#C0570A', hint: 'Drag a card to approve or reject' },
  { id: 'approved', label: 'Approved — public', color: '#15803d', hint: 'Shown on the recipe page' },
  { id: 'rejected', label: 'Rejected', color: '#b91c1c', hint: 'Never shown' },
]

export default function FamilyVersionsAdmin() {
  const [items, setItems] = useState<Item[]>([])
  const [err, setErr] = useState('')
  const [open, setOpen] = useState<string | null>(null)
  const [dragId, setDragId] = useState<string | null>(null)
  const [over, setOver] = useState<Status | null>(null)
  const [note, setNote] = useState<Record<string, string>>({})
  const [q, setQ] = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/admin/family-versions')
    if (!res.ok) { setErr(res.status === 401 ? 'Your admin session has expired — sign in again from /admin.' : 'Could not load.'); return }
    setItems((await res.json()).items || [])
  }, [])
  useEffect(() => { load() }, [load])

  const move = async (id: string, status: Status) => {
    const it = items.find(i => i._id === id)
    if (!it || it.status === status) return
    const prev = items
    setItems(items.map(i => (i._id === id ? { ...i, status } : i)))
    const res = await fetch('/api/admin/family-versions', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status, moderator_note: note[id] ?? it.moderator_note ?? '' }) })
    if (!res.ok) { setItems(prev); setErr('Could not move that card. Please try again.') }
  }
  const remove = async (id: string) => {
    if (!confirm('Delete this submission permanently?')) return
    await fetch('/api/admin/family-versions', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(items.filter(i => i._id !== id))
  }

  const shown = useMemo(() => items.filter(i => !q || `${i.dish} ${i.title} ${i.family} ${i.display_name}`.toLowerCase().includes(q.toLowerCase())), [items, q])

  return (
    <div style={{ padding: 24, maxWidth: 1300, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 6 }}>
        <h1 className="font-serif" style={{ fontSize: 28, fontWeight: 600 }}>Family versions — moderation board</h1>
        <Link href="/admin/dashboard" className="btn btn-secondary">Back to dashboard</Link>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 14 }}>Drag a card between columns, or use the buttons. Only the Approved column is visible to visitors. Check for: medical claims, links, offensive text, and anything that contradicts temple practice.</p>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by dish, family or title" className="input" style={{ maxWidth: 360, marginBottom: 16 }} />
      {err && <p style={{ color: '#b91c1c', fontWeight: 600 }}>{err}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, alignItems: 'start' }}>
        {COLS.map(col => {
          const list = shown.filter(i => i.status === col.id)
          return (
            <div key={col.id}
              onDragOver={e => { e.preventDefault(); setOver(col.id) }}
              onDragLeave={() => setOver(null)}
              onDrop={e => { e.preventDefault(); setOver(null); if (dragId) move(dragId, col.id); setDragId(null) }}
              style={{ background: over === col.id ? `${col.color}14` : 'var(--ivory2)', border: `2px ${over === col.id ? 'dashed' : 'solid'} ${over === col.id ? col.color : 'var(--ivory3)'}`, borderRadius: 14, padding: 12, minHeight: 220 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                <strong style={{ color: col.color, fontSize: 15 }}>{col.label}</strong>
                <span style={{ fontSize: 12, fontWeight: 700, background: col.color, color: 'white', borderRadius: 100, padding: '1px 9px' }}>{list.length}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>{col.hint}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {list.map(i => (
                  <div key={i._id} draggable onDragStart={() => setDragId(i._id)} onDragEnd={() => { setDragId(null); setOver(null) }}
                    style={{ background: 'white', border: '1px solid var(--ivory3)', borderLeft: `4px solid ${col.color}`, borderRadius: 10, padding: 12, cursor: 'grab', opacity: dragId === i._id ? 0.5 : 1 }}>
                    <div style={{ fontSize: 12, color: 'var(--muted)' }}>{i.dish} / {i.variant}</div>
                    <div style={{ fontWeight: 700, fontSize: 15, margin: '2px 0' }}>{i.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink2)' }}>{i.display_name}{i.community ? ` · ${i.community}` : ''}{i.place ? ` · ${i.place}` : ''}</div>
                    <button onClick={() => setOpen(open === i._id ? null : i._id)} style={{ background: 'none', border: 'none', color: 'var(--crimson)', fontWeight: 700, fontSize: 13, cursor: 'pointer', padding: '6px 0' }}>{open === i._id ? 'Hide details' : 'Read details'}</button>
                    {open === i._id && (
                      <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--ink2)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <div><strong>What is different:</strong> {i.what_differs}</div>
                        <div><strong>Ingredients:</strong> {i.ingredient_changes}</div>
                        <div><strong>Method:</strong> {i.method_changes}</div>
                        {i.offering_custom && <div><strong>Offering at home:</strong> {i.offering_custom}</div>}
                        {i.story && <div><strong>Story:</strong> {i.story}</div>}
                        <div style={{ color: 'var(--muted)' }}>Submitted by {i.user_email} on {new Date(i.createdAt).toLocaleDateString('en-IN')}</div>
                        <textarea placeholder="Note for the record (e.g. reason for rejecting)" value={note[i._id] ?? i.moderator_note ?? ''} onChange={e => setNote({ ...note, [i._id]: e.target.value })} rows={2} className="input" style={{ width: '100%' }} />
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      {COLS.filter(c => c.id !== i.status).map(c => (
                        <button key={c.id} onClick={() => move(i._id, c.id)} style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 100, border: `1.5px solid ${c.color}`, color: c.color, background: 'white', cursor: 'pointer' }}>
                          {c.id === 'approved' ? 'Approve' : c.id === 'rejected' ? 'Reject' : 'Back to pending'}
                        </button>
                      ))}
                      <button onClick={() => remove(i._id)} style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 100, border: '1.5px solid #999', color: '#666', background: 'white', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                ))}
                {!list.length && <div style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', padding: 20 }}>Nothing here</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
