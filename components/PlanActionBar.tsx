'use client'
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


// WhatsApp Share Modal
function WhatsAppModal({ itinerary, form, onClose }: {
  itinerary: string
  form: any
  onClose: () => void
}) {
  const [phone, setPhone] = React.useState('')
  const [countryCode, setCountryCode] = React.useState('91')
  const [mode, setMode] = React.useState<'broadcast' | 'direct'>('broadcast')

  const formatText = () => {
    // Extract day summaries from itinerary
    const lines = itinerary.split('\n').filter(Boolean)
    const days = lines.filter(l => /day\s*\d+/i.test(l)).slice(0, 3)
    const daySummary = days.length > 0
      ? days.map((d, i) => `📍 ${d.replace(/[*#]+/g, '').trim()}`).join('\n')
      : lines.slice(0, 4).map(l => `📍 ${l.replace(/[*#]+/g, '').trim()}`).join('\n')

    return encodeURIComponent(
      `🛕 *My Yatra Plan — ${form.to}*\n\n` +
      `✈️ From: ${form.from} | ${form.days} days | ${form.pilgrims} pilgrims\n` +
      `🚗 Mode: ${form.mode}\n\n` +
      daySummary + '\n\n' +
      `📱 Plan your yatra free at divyadarshan-psi.vercel.app 🙏\n` +
      `_Powered by DivyaDarshan — India's Temple Explorer_`
    )
  }

  const shareToNumber = () => {
    const clean = phone.replace(/[^0-9]/g, '')
    if (!clean || clean.length < 10) {
      alert('Please enter a valid mobile number')
      return
    }
    const url = `https://wa.me/${countryCode}${clean}?text=${formatText()}`
    window.open(url, '_blank')
  }

  const shareBroadcast = () => {
    const url = `https://wa.me/?text=${formatText()}`
    window.open(url, '_blank')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }} onClick={onClose}>
      <div style={{
        background: 'white', borderRadius: 16, padding: 24, maxWidth: 420, width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#1A0A00' }}>Share on WhatsApp</div>
            <div style={{ fontSize: 12, color: '#888' }}>Share your yatra plan instantly</div>
          </div>
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#888' }}>×</button>
        </div>

        {/* Plan preview */}
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 12, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#166534', marginBottom: 4 }}>PREVIEW</div>
          <div style={{ fontSize: 12, color: '#333', lineHeight: 1.6 }}>
            🛕 <strong>My Yatra Plan — {form.to}</strong><br/>
            ✈️ From: {form.from} | {form.days} days | {form.pilgrims} pilgrims<br/>
            📱 divyadarshan-psi.vercel.app 🙏
          </div>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button
            onClick={() => setMode('broadcast')}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: mode === 'broadcast' ? '#25D366' : '#f0f0f0',
              color: mode === 'broadcast' ? 'white' : '#333',
              fontWeight: 600, fontSize: 13
            }}>
            Open WhatsApp
          </button>
          <button
            onClick={() => setMode('direct')}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: mode === 'direct' ? '#25D366' : '#f0f0f0',
              color: mode === 'direct' ? 'white' : '#333',
              fontWeight: 600, fontSize: 13
            }}>
            Send to Number
          </button>
        </div>

        {mode === 'broadcast' ? (
          <button
            onClick={shareBroadcast}
            style={{
              width: '100%', padding: '14px 0', borderRadius: 10, border: 'none',
              background: '#25D366', color: 'white', fontWeight: 700, fontSize: 15,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share on WhatsApp
          </button>
        ) : (
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                style={{ padding: '10px 8px', borderRadius: 8, border: '1.5px solid #ddd', fontSize: 13, background: 'white' }}>
                <option value="91">🇮🇳 +91 India</option>
                <option value="1">🇺🇸 +1 USA</option>
                <option value="44">🇬🇧 +44 UK</option>
                <option value="971">🇦🇪 +971 UAE</option>
                <option value="61">🇦🇺 +61 Australia</option>
                <option value="1">🇨🇦 +1 Canada</option>
                <option value="65">🇸🇬 +65 Singapore</option>
                <option value="60">🇲🇾 +60 Malaysia</option>
                <option value="49">🇩🇪 +49 Germany</option>
                <option value="33">🇫🇷 +33 France</option>
              </select>
              <input
                type="tel"
                placeholder="Mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                style={{
                  flex: 1, padding: '10px 12px', borderRadius: 8,
                  border: '1.5px solid #ddd', fontSize: 13,
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ fontSize: 11, color: '#888', marginBottom: 12 }}>
              💡 Opens WhatsApp with a pre-filled message to this number
            </div>
            <button
              onClick={shareToNumber}
              style={{
                width: '100%', padding: '14px 0', borderRadius: 10, border: 'none',
                background: phone.length >= 10 ? '#25D366' : '#ccc',
                color: 'white', fontWeight: 700, fontSize: 15,
                cursor: phone.length >= 10 ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Send to {countryCode !== '91' ? '+' + countryCode + ' ' : ''}WhatsApp
            </button>
          </div>
        )}

        <p style={{ fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 12 }}>
          Opens WhatsApp app · Free · No API needed
        </p>
      </div>
    </div>
  )
}

export default function PlanActionBar({ itinerary, form }: Props) {
  const [showWA, setShowWA] = React.useState(false)
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
      const res  = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
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
      setShareOk(`Yatra plan shared with ${data.recipient_name || selected.email} successfully! 🙏`)
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
          <button
            onClick={() => setShowWA(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 8, border: 'none',
              background: '#25D366', color: 'white',
              fontWeight: 600, fontSize: 13, cursor: 'pointer'
            }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
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
