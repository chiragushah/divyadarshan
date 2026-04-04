// create-planactionbar.js
// Run: node create-planactionbar.js
const fs = require('fs')

const content = `'use client'
import { useState, useRef, useEffect } from 'react'
import { Loader2, Share2, FileText, FileDown, X, Search, CheckCircle } from 'lucide-react'

interface Props {
  itinerary: string
  form: {
    from: string
    to: string
    days: number
    pilgrims: number
    mode: string
    deity: string
    notes: string
  }
}

export default function PlanActionBar({ itinerary, form }: Props) {
  const [pdfLoading,  setPdfLoading]  = useState(false)
  const [docxLoading, setDocxLoading] = useState(false)
  const [showShare,   setShowShare]   = useState(false)
  const [query,       setQuery]       = useState('')
  const [users,       setUsers]       = useState<{ name: string; email: string }[]>([])
  const [selected,    setSelected]    = useState<{ name: string; email: string } | null>(null)
  const [message,     setMessage]     = useState('')
  const [sharing,     setSharing]     = useState(false)
  const [shareOk,     setShareOk]     = useState('')
  const [shareErr,    setShareErr]    = useState('')
  const [searching,   setSearching]   = useState(false)
  const searchTimer = useRef<any>(null)

  useEffect(() => {
    if (!query || query.length < 2) { setUsers([]); return }
    clearTimeout(searchTimer.current)
    setSearching(true)
    searchTimer.current = setTimeout(async () => {
      const res  = await fetch(\`/api/users/search?q=\${encodeURIComponent(query)}\`)
      const data = await res.json()
      setUsers(data.users || [])
      setSearching(false)
    }, 400)
  }, [query])

  async function handlePDF() {
    setPdfLoading(true)
    try {
      const { downloadPDF } = await import('@/lib/export/planExport')
      await downloadPDF(itinerary, form.from, form.to)
    } catch { alert('PDF generation failed. Please try again.') }
    finally { setPdfLoading(false) }
  }

  async function handleDOCX() {
    setDocxLoading(true)
    try {
      const { downloadDOCX } = await import('@/lib/export/planExport')
      await downloadDOCX(itinerary, form.from, form.to, form.pilgrims, form.days)
    } catch { alert('Word document generation failed. Please try again.') }
    finally { setDocxLoading(false) }
  }

  async function handleShare() {
    if (!selected) return
    setSharing(true); setShareErr(''); setShareOk('')
    try {
      const res  = await fetch('/api/yatra/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: form.from, to: form.to, days: form.days,
          pilgrims: form.pilgrims, mode: form.mode, deity: form.deity,
          itinerary, shared_with_email: selected.email, message,
        }),
      })
      const data = await res.json()
      if (data.error) { setShareErr(data.error); return }
      setShareOk(\`Yatra plan shared with \${data.recipient_name || selected.email} successfully! 🙏\`)
      setSelected(null); setQuery(''); setMessage('')
    } catch { setShareErr('Something went wrong. Please try again.') }
    finally { setSharing(false) }
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
        <span className="text-xs font-semibold mr-1" style={{ color: 'var(--muted)' }}>Export & Share:</span>

        <button onClick={handlePDF} disabled={pdfLoading}
          className="btn btn-secondary btn-sm flex items-center gap-1.5">
          {pdfLoading ? <Loader2 size={13} className="animate-spin" /> : <FileDown size={13} />}
          {pdfLoading ? 'Generating PDF…' : 'Download PDF'}
        </button>

        <button onClick={handleDOCX} disabled={docxLoading}
          className="btn btn-secondary btn-sm flex items-center gap-1.5">
          {docxLoading ? <Loader2 size={13} className="animate-spin" /> : <FileText size={13} />}
          {docxLoading ? 'Generating Word…' : 'Download Word'}
        </button>

        <button onClick={() => { setShowShare(true); setShareOk(''); setShareErr('') }}
          className="btn btn-primary btn-sm flex items-center gap-1.5">
          <Share2 size={13} />
          Share with Pilgrim
        </button>

        <button onClick={() => navigator.clipboard.writeText(itinerary)}
          className="btn btn-ghost btn-sm text-xs" style={{ color: 'var(--muted)' }}>
          📋 Copy Text
        </button>
      </div>

      {showShare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowShare(false) }}>
          <div className="w-full max-w-md rounded-2xl shadow-2xl"
            style={{ background: 'var(--card)', border: '1.5px solid var(--border)' }}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <h3 className="font-serif text-xl font-semibold" style={{ color: 'var(--ink)' }}>Share Yatra Plan</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{form.from} → {form.to} · {form.days} days</p>
              </div>
              <button onClick={() => setShowShare(false)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X size={18} style={{ color: 'var(--muted)' }} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {shareOk ? (
                <div className="flex flex-col items-center py-6 gap-3 text-center">
                  <CheckCircle size={40} style={{ color: '#16A34A' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{shareOk}</p>
                  <button onClick={() => setShowShare(false)} className="btn btn-primary btn-sm">Done</button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="label">Search registered pilgrim</label>
                    <div className="relative">
                      <input className="input pr-8" placeholder="Search by name or email…"
                        value={query} onChange={e => { setQuery(e.target.value); setSelected(null) }} />
                      {searching
                        ? <Loader2 size={14} className="animate-spin absolute right-3 top-3.5" style={{ color: 'var(--muted)' }} />
                        : <Search size={14} className="absolute right-3 top-3.5" style={{ color: 'var(--muted)' }} />}
                    </div>
                    {users.length > 0 && !selected && (
                      <div className="mt-1 rounded-xl overflow-hidden shadow-lg"
                        style={{ border: '1.5px solid var(--border)', background: 'var(--card)' }}>
                        {users.map(u => (
                          <button key={u.email}
                            onClick={() => { setSelected(u); setQuery(u.name || u.email); setUsers([]) }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-left">
                            <div style={{
                              width: 32, height: 32, borderRadius: '50%',
                              background: 'linear-gradient(135deg, var(--crimson), var(--saffron))',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0,
                            }}>
                              {(u.name || u.email)[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{u.name}</p>
                              <p className="text-xs" style={{ color: 'var(--muted)' }}>{u.email}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {query.length >= 2 && users.length === 0 && !searching && !selected && (
                      <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>No registered pilgrims found for "{query}"</p>
                    )}
                    {selected && (
                      <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-xl"
                        style={{ background: 'rgba(192,87,10,0.08)', border: '1px solid rgba(192,87,10,0.2)' }}>
                        <span style={{ fontSize: 14 }}>🙏</span>
                        <div className="flex-1">
                          <p className="text-sm font-semibold" style={{ color: 'var(--saffron)' }}>{selected.name}</p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>{selected.email}</p>
                        </div>
                        <button onClick={() => { setSelected(null); setQuery('') }}
                          className="text-xs" style={{ color: 'var(--muted)' }}>✕</button>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="label">Personal message (optional)</label>
                    <textarea className="input h-20 resize-none"
                      placeholder="e.g. Thought you'd love this Char Dham plan for next year…"
                      value={message} onChange={e => setMessage(e.target.value)} />
                  </div>
                  {shareErr && (
                    <p className="text-xs px-3 py-2 rounded-lg"
                      style={{ background: '#FFF0F0', color: 'var(--live)', border: '1px solid #FFCDD2' }}>
                      {shareErr}
                    </p>
                  )}
                  <button onClick={handleShare} disabled={!selected || sharing}
                    className="btn btn-primary w-full justify-center">
                    {sharing ? <><Loader2 size={14} className="animate-spin" /> Sharing…</> : <><Share2 size={14} /> Share Yatra Plan</>}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
`

fs.writeFileSync('components/PlanActionBar.tsx', content, 'utf8')
console.log('✅ components/PlanActionBar.tsx created successfully!')
