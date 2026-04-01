'use client'
import { useState } from 'react'
import { AlertTriangle, X, Check, Loader2 } from 'lucide-react'

const FIELDS = [
  { value: 'timing',      label: '⏰ Opening hours are wrong' },
  { value: 'facilities',  label: '🚻 Facilities info outdated' },
  { value: 'image',       label: '🖼️ Image does not match this temple' },
  { value: 'directions',  label: '🗺️ How to reach info is wrong' },
  { value: 'description', label: '📝 Description has errors' },
  { value: 'website',     label: '🌐 Website / phone is wrong' },
  { value: 'other',       label: '💬 Something else' },
]

export default function ReportButton({ templeSlug, templeName }: { templeSlug: string; templeName: string }) {
  const [open, setOpen] = useState(false)
  const [field, setField] = useState('')
  const [issue, setIssue] = useState('')
  const [correct, setCorrect] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async () => {
    if (!field || !issue) return
    setLoading(true)
    await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temple_slug: templeSlug, temple_name: templeName, field, issue, correct_info: correct }),
    })
    setDone(true)
    setLoading(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs mt-2 hover:opacity-70 transition-opacity"
        style={{ color: 'var(--muted2)' }}>
        <AlertTriangle size={12} /> Report incorrect information
      </button>

      {open && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.5)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ background:'white', borderRadius:16, width:'100%', maxWidth:480, padding:24, position:'relative' }}>
            <button onClick={() => setOpen(false)} style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:'var(--muted2)' }}>
              <X size={18} />
            </button>

            {done ? (
              <div style={{ textAlign:'center', padding:'20px 0' }}>
                <div style={{ fontSize:40, marginBottom:12 }}>🙏</div>
                <h3 style={{ fontFamily:'serif', fontSize:20, marginBottom:8 }}>Thank You!</h3>
                <p style={{ color:'var(--muted)', fontSize:13 }}>Your report helps keep DivyaDarshan accurate for all pilgrims. We will review and update within 48 hours.</p>
                <button onClick={() => setOpen(false)} style={{ marginTop:16, padding:'8px 20px', background:'var(--crimson)', color:'white', border:'none', borderRadius:8, cursor:'pointer', fontSize:13 }}>
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily:'serif', fontSize:20, marginBottom:4 }}>Report Incorrect Info</h3>
                <p style={{ color:'var(--muted)', fontSize:12, marginBottom:16 }}>{templeName}</p>

                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted2)', display:'block', marginBottom:6 }}>What is wrong? *</label>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
                    {FIELDS.map(f => (
                      <button key={f.value} onClick={() => setField(f.value)}
                        style={{ padding:'8px 10px', borderRadius:8, border:`1.5px solid ${field===f.value ? 'var(--crimson)' : 'var(--border)'}`, background: field===f.value ? 'rgba(107,16,16,.06)' : 'white', fontSize:11, textAlign:'left', cursor:'pointer', color: field===f.value ? 'var(--crimson)' : 'var(--ink)', fontWeight: field===f.value ? 600 : 400 }}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom:10 }}>
                  <label style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted2)', display:'block', marginBottom:4 }}>Describe the issue *</label>
                  <textarea rows={2} placeholder="e.g. Temple opens at 6AM not 5AM, or the image shown is of a different temple"
                    value={issue} onChange={e => setIssue(e.target.value)}
                    style={{ width:'100%', padding:'8px 12px', border:'1.5px solid var(--border)', borderRadius:8, fontSize:12, resize:'none', fontFamily:'inherit' }} />
                </div>

                <div style={{ marginBottom:16 }}>
                  <label style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:'var(--muted2)', display:'block', marginBottom:4 }}>Correct information (optional)</label>
                  <textarea rows={2} placeholder="What should it say instead?"
                    value={correct} onChange={e => setCorrect(e.target.value)}
                    style={{ width:'100%', padding:'8px 12px', border:'1.5px solid var(--border)', borderRadius:8, fontSize:12, resize:'none', fontFamily:'inherit' }} />
                </div>

                <button onClick={submit} disabled={!field || !issue || loading}
                  style={{ width:'100%', padding:'10px', background:'var(--crimson)', color:'white', border:'none', borderRadius:8, cursor: !field||!issue ? 'not-allowed' : 'pointer', opacity: !field||!issue ? .5 : 1, display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontSize:13, fontWeight:600 }}>
                  {loading ? <><Loader2 size={13} className="animate-spin" /> Sending...</> : <><Check size={13} /> Submit Report</>}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
