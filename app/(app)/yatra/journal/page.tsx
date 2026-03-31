'use client'
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Loader2, Plus, Trash2, Camera } from 'lucide-react'
import { relativeTime, formatINR } from '@/lib/utils'
import type { JournalEntry } from '@/types'

const FEELINGS = ['Deeply Blessed', 'Peaceful', 'Amazed', 'Moved / Emotional', 'Spiritually Charged', 'Adventurous']

export default function JournalPage() {
  const { data: session, status } = useSession()
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const photoRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    temple_name: '', visit_date: new Date().toISOString().split('T')[0],
    note: '', feeling: 'Peaceful', stars: 5, deity: '', state: '',
  })

  useEffect(() => {
    if (status === 'authenticated') fetchEntries()
    if (status !== 'loading') setLoading(false)
  }, [status])

  const fetchEntries = async () => {
    setLoading(true)
    const res = await fetch('/api/journal')
    const { data } = await res.json()
    setEntries(data || [])
    setLoading(false)
  }

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const save = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.temple_name) return
    setSaving(true)
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, photo_url: photoPreview }),
    })
    const { data } = await res.json()
    if (data) {
      setEntries(prev => [data, ...prev])
      setShowForm(false)
      setForm({ temple_name: '', visit_date: new Date().toISOString().split('T')[0], note: '', feeling: 'Peaceful', stars: 5, deity: '', state: '' })
      setPhotoPreview(null)
    }
    setSaving(false)
  }

  const deleteEntry = async (id: string) => {
    if (!confirm('Delete this journal entry?')) return
    await fetch('/api/journal', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  // Stats
  const uniqueStates = Array.from(new Set(entries.map((e: any) => e.state).filter(Boolean))).length
  const uniqueDeities = Array.from(new Set(entries.map((e: any) => e.deity).filter(Boolean))).length

  if (status === 'unauthenticated') {
    return (
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">📖</div>
        <h1 className="font-serif text-3xl font-medium mb-3">My Journal</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Sign in to start your pilgrimage diary. Log visits, attach photos, and build your lifetime yatra passport.</p>
        <Link href="/auth/signin" className="btn btn-primary">Sign in to start</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="section-title">My Pilgrimage Diary</div>
          <h1 className="font-serif text-4xl font-medium">My Journal</h1>
        </div>
        <button onClick={() => setShowForm(f => !f)} className="btn btn-primary flex items-center gap-2">
          <Plus size={16} /> Log Visit
        </button>
      </div>

      {/* Stats */}
      {entries.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Temples Visited', value: entries.length },
            { label: 'States Covered', value: uniqueStates },
            { label: 'Deities Worshipped', value: uniqueDeities },
          ].map(s => (
            <div key={s.label} className="card card-p text-center">
              <div className="font-serif text-3xl font-medium" style={{ color: 'var(--crimson)' }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--muted2)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Add Entry Form */}
      {showForm && (
        <form onSubmit={save} className="card card-p mb-8">
          <h2 className="font-serif text-2xl font-medium mb-5">Log Temple Visit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Temple Name</label>
              <input className="input" placeholder="e.g. Kashi Vishwanath, Tirupati…" value={form.temple_name} onChange={e => set('temple_name', e.target.value)} required />
            </div>
            <div>
              <label className="label">Visit Date</label>
              <input className="input" type="date" value={form.visit_date} onChange={e => set('visit_date', e.target.value)} />
            </div>
            <div>
              <label className="label">Deity</label>
              <input className="input" placeholder="e.g. Shiva, Vishnu, Durga…" value={form.deity} onChange={e => set('deity', e.target.value)} />
            </div>
            <div>
              <label className="label">State</label>
              <input className="input" placeholder="e.g. Uttar Pradesh, Tamil Nadu…" value={form.state} onChange={e => set('state', e.target.value)} />
            </div>
            <div>
              <label className="label">How did you feel?</label>
              <select className="input" value={form.feeling} onChange={e => set('feeling', e.target.value)}>
                {FEELINGS.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Rating</label>
              <div className="flex gap-1 mt-1">
                {[1,2,3,4,5].map(s => (
                  <button key={s} type="button" onClick={() => set('stars', s)} className="text-2xl transition-transform hover:scale-110">
                    {s <= form.stars ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="label">Your Experience</label>
              <textarea className="input h-24 resize-none" placeholder="What moved you? Any moments of grace? Tips for other pilgrims?"
                value={form.note} onChange={e => set('note', e.target.value)} />
            </div>

            {/* Photo */}
            <div className="md:col-span-2">
              <label className="label">Photo Memory</label>
              <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              {photoPreview ? (
                <div className="relative inline-block">
                  <img src={photoPreview} alt="Preview" className="h-40 rounded-xl object-cover border" style={{ borderColor: 'var(--border)' }} />
                  <button type="button" onClick={() => { setPhotoPreview(null); if (photoRef.current) photoRef.current.value = '' }}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white text-xs flex items-center justify-center">✕</button>
                </div>
              ) : (
                <button type="button" onClick={() => photoRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm border transition-colors"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)', background: 'var(--ivory)' }}>
                  <Camera size={15} /> Attach a photo
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button type="submit" disabled={saving} className="btn btn-primary">
              {saving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : 'Save Entry'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </form>
      )}

      {/* Entries */}
      {loading ? (
        <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="skeleton h-32 rounded-xl" />)}</div>
      ) : entries.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🛕</div>
          <h3 className="font-serif text-2xl font-medium mb-2">Your journey begins here</h3>
          <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>Log your first temple visit and start building your pilgrimage passport.</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary">Log First Visit</button>
        </div>
      ) : (
        <div className="space-y-5">
          {entries.map(entry => (
            <div key={entry.id} className="card overflow-hidden">
              {entry.photo_url && (
                <img src={entry.photo_url} alt={entry.temple_name} className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-xl font-medium">{entry.temple_name}</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted2)' }}>
                      {new Date(entry.visit_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      {entry.state && ` · ${entry.state}`}
                      {entry.deity && ` · ${entry.deity}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="stars text-sm">{'★'.repeat(entry.stars)}</div>
                    <button onClick={() => deleteEntry(entry.id)} className="text-stone-400 hover:text-red-500 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                {entry.note && <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--muted)' }}>{entry.note}</p>}
                <div className="mt-3 flex items-center gap-2">
                  <span className="badge-gold text-[10px]">{entry.feeling}</span>
                  <span className="text-xs" style={{ color: 'var(--muted2)' }}>{relativeTime(entry.created_at)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
