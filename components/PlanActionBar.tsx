'use client'
import { useState } from 'react'
import { downloadPlanAsPDF, downloadPlanAsWord } from '@/lib/export/planExport'

interface PlanActionBarProps {
  itinerary: string
  form: {
    from: string
    to: string
    days: number
    pilgrims: number
    mode: string
    deity?: string
    notes?: string
  }
}

function WAModal({ itinerary, form, onClose }: { itinerary: string; form: PlanActionBarProps['form']; onClose: () => void }) {
  const [phone, setPhone] = useState('')
  const [cc, setCc] = useState('91')
  const [tab, setTab] = useState<'open'|'direct'>('open')

  const makeText = () => {
    const lines = itinerary.split('\n').filter(Boolean)
    const days = lines.filter(l => /day\s*\d+/i.test(l)).slice(0, 3)
    const preview = (days.length ? days : lines.slice(1, 4))
      .map(l => '- ' + l.replace(/[*#►▸•]+/g, '').trim()).join('\n')
    return encodeURIComponent(
      '🛕 *My Yatra Plan — ' + form.to + '*\n\n' +
      '✈️ From: ' + form.from + ' | ' + form.days + ' days | ' + form.pilgrims + ' pilgrim' + (form.pilgrims > 1 ? 's' : '') + '\n' +
      '🚗 ' + form.mode + (form.deity ? ' | ' + form.deity : '') + '\n\n' +
      preview + '\n\n' +
      '📱 Plan free at divyadarshan-psi.vercel.app 🙏'
    )
  }

  const openWA = () => window.open('https://wa.me/?text=' + makeText(), '_blank')
  const sendToNum = () => {
    const n = phone.replace(/\D/g, '')
    if (n.length < 10) return alert('Enter a valid 10-digit number')
    window.open('https://wa.me/' + cc + n + '?text=' + makeText(), '_blank')
  }

  const overlay: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 9999, padding: '0 16px'
  }
  const modal: React.CSSProperties = {
    background: 'white', borderRadius: 20, padding: 28,
    maxWidth: 420, width: '100%', boxShadow: '0 24px 80px rgba(0,0,0,0.3)'
  }

  return (
    <div style={overlay} onClick={onClose}>
      <div style={modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>Share on WhatsApp</div>
            <div style={{ fontSize: 12, color: '#888' }}>Free · No API · Opens WhatsApp directly</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#aaa' }}>×</button>
        </div>

        {/* Preview */}
        <div style={{ background: '#f0fdf4', border: '1.5px solid #86efac', borderRadius: 12, padding: 14, marginBottom: 20, fontSize: 13, lineHeight: 1.7 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#166534', marginBottom: 6, letterSpacing: '0.08em' }}>PREVIEW</div>
          🛕 <strong>My Yatra Plan — {form.to}</strong><br />
          ✈️ {form.from} → {form.to} | {form.days}d | {form.pilgrims} pilgrim{form.pilgrims > 1 ? 's' : ''}<br />
          📱 divyadarshan-psi.vercel.app 🙏
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#f5f5f5', borderRadius: 10, padding: 4, marginBottom: 20 }}>
          {(['open', 'direct'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '9px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: tab === t ? 'white' : 'transparent',
              color: tab === t ? '#1A0A00' : '#888',
              fontWeight: tab === t ? 600 : 500, fontSize: 13,
              boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
            }}>
              {t === 'open' ? '📲 Open WhatsApp' : '📞 Send to Number'}
            </button>
          ))}
        </div>

        {tab === 'open' ? (
          <>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 14, textAlign: 'center' }}>Opens WhatsApp so you can choose who to send it to</p>
            <button onClick={openWA} style={{ width: '100%', padding: '15px 0', borderRadius: 12, border: 'none', background: '#25D366', color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Open WhatsApp
            </button>
          </>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <select value={cc} onChange={e => setCc(e.target.value)} style={{ padding: '11px 8px', borderRadius: 10, border: '1.5px solid #e0e0e0', fontSize: 13, background: 'white' }}>
                <option value="91">🇮🇳 +91</option>
                <option value="1">🇺🇸 +1</option>
                <option value="44">🇬🇧 +44</option>
                <option value="971">🇦🇪 +971</option>
                <option value="61">🇦🇺 +61</option>
                <option value="65">🇸🇬 +65</option>
                <option value="60">🇲🇾 +60</option>
                <option value="49">🇩🇪 +49</option>
              </select>
              <input
                type="tel" placeholder="10-digit mobile number"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                style={{ flex: 1, padding: '11px 14px', borderRadius: 10, border: '1.5px solid ' + (phone.length === 10 ? '#25D366' : '#e0e0e0'), fontSize: 14, outline: 'none' }}
              />
            </div>
            {phone.length > 0 && phone.length < 10 && <p style={{ fontSize: 11, color: '#E65100', marginBottom: 8 }}>Enter all 10 digits ({10 - phone.length} remaining)</p>}
            {phone.length === 10 && <p style={{ fontSize: 11, color: '#166534', marginBottom: 8 }}>✓ Will send to +{cc} {phone}</p>}
            <button onClick={sendToNum} disabled={phone.length !== 10} style={{
              width: '100%', padding: '15px 0', borderRadius: 12, border: 'none',
              background: phone.length === 10 ? '#25D366' : '#e0e0e0',
              color: phone.length === 10 ? 'white' : '#aaa',
              fontWeight: 700, fontSize: 15, cursor: phone.length === 10 ? 'pointer' : 'not-allowed',
            }}>
              Send to +{cc} WhatsApp
            </button>
          </>
        )}
        <p style={{ fontSize: 11, color: '#bbb', textAlign: 'center', marginTop: 14 }}>Free · No WhatsApp Business API needed</p>
      </div>
    </div>
  )
}

export default function PlanActionBar({ itinerary, form }: PlanActionBarProps) {
  const [showWA, setShowWA] = useState(false)
  const [loadingPDF, setLoadingPDF] = useState(false)
  const [loadingWord, setLoadingWord] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [shareEmail, setShareEmail] = useState('')
  const [shareMsg, setShareMsg] = useState('')
  const [shareStatus, setShareStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [shareResult, setShareResult] = useState('')

  const handlePDF = async () => {
    setLoadingPDF(true)
    try { await downloadPlanAsPDF(itinerary, form) } catch(e) { console.error('PDF error:', e) }
    setLoadingPDF(false)
  }

  const handleWord = async () => {
    setLoadingWord(true)
    try { await downloadPlanAsWord(itinerary, form) } catch(e) { console.error('Word error:', e) }
    setLoadingWord(false)
  }

  const handleShare = async () => {
    if (!shareEmail) return
    setShareStatus('loading')
    try {
      const res = await fetch('/api/yatra/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, itinerary, shared_with_email: shareEmail, message: shareMsg })
      })
      const data = await res.json()
      if (data.success) { setShareStatus('success'); setShareResult('Plan shared with ' + data.recipient_name + '!') }
      else { setShareStatus('error'); setShareResult(data.error || 'Failed to share') }
    } catch { setShareStatus('error'); setShareResult('Something went wrong') }
  }

  const btn = (bg: string, color = 'white', disabled = false): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '9px 16px', borderRadius: 9, border: 'none',
    background: disabled ? '#ccc' : bg, color: disabled ? '#999' : color,
    fontWeight: 600, fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
    whiteSpace: 'nowrap', transition: 'opacity 0.15s',
  })

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', padding: '16px 0', borderTop: '1.5px solid var(--border)', borderBottom: '1.5px solid var(--border)' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted2)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Export & Share:</span>

        <button onClick={handlePDF} disabled={loadingPDF} style={btn('var(--crimson)', 'white', loadingPDF)}>
          📄 {loadingPDF ? 'Generating…' : 'Download PDF'}
        </button>

        <button onClick={handleWord} disabled={loadingWord} style={btn('#1B5E20', 'white', loadingWord)}>
          📝 {loadingWord ? 'Generating…' : 'Download Word'}
        </button>

        <button onClick={() => setShowWA(true)} style={btn('#25D366')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </button>

        <button onClick={() => setShowShare(!showShare)} style={btn('var(--ivory2)', 'var(--ink)')}>
          👤 Share with Pilgrim
        </button>
      </div>

      {showShare && (
        <div style={{ padding: 16, background: 'var(--ivory2)', borderRadius: 12, marginTop: 12, border: '1.5px solid var(--border)' }}>
          <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Share with a registered pilgrim</h4>
          <input placeholder="Their email address" value={shareEmail} onChange={e => setShareEmail(e.target.value)}
            style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, marginBottom: 8 }} />
          <textarea placeholder="Optional message…" value={shareMsg} onChange={e => setShareMsg(e.target.value)}
            rows={2} style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1.5px solid var(--border)', fontSize: 13, resize: 'none', marginBottom: 8 }} />
          <button onClick={handleShare} disabled={shareStatus === 'loading' || !shareEmail} style={btn('var(--crimson)', 'white', shareStatus === 'loading' || !shareEmail)}>
            {shareStatus === 'loading' ? 'Sharing…' : 'Send Plan'}
          </button>
          {shareStatus === 'success' && <p style={{ color: 'green', fontSize: 13, marginTop: 8 }}>✅ {shareResult}</p>}
          {shareStatus === 'error' && <p style={{ color: 'red', fontSize: 13, marginTop: 8 }}>❌ {shareResult}</p>}
        </div>
      )}

      {showWA && <WAModal itinerary={itinerary} form={form} onClose={() => setShowWA(false)} />}
    </div>
  )
}
