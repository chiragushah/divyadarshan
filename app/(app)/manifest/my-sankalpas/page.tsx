'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const STATUS_COLORS: Record<string,string> = { active:'#166534', fulfilled:'#1E40AF', released:'#6B5B4E' }
const STATUS_BG: Record<string,string> = { active:'#DCFCE7', fulfilled:'#DBEAFE', released:'#F8F4EE' }

export default function MySankalpasPage() {
  const { data: session } = useSession()
  const [sankalpas, setSankalpas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [fulfilling, setFulfilling] = useState<string|null>(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    fetch('/api/sankalp?type=mine')
      .then(r => r.json())
      .then(d => { setSankalpas(d.sankalpas || []); setLoading(false) })
  }, [])

  const markFulfilled = async (id: string) => {
    await fetch('/api/sankalp', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ id, status:'fulfilled', fulfilled_note: note }) })
    setSankalpas(s => s.map(x => x._id === id ? {...x, status:'fulfilled', fulfilled_note: note} : x))
    setFulfilling(null); setNote('')
  }

  if (!session) return (
    <div style={{ maxWidth:500, margin:'80px auto', textAlign:'center', padding:24 }}>
      <div style={{ fontSize:48, marginBottom:16 }}>🙏</div>
      <h2 style={{ fontFamily:"'Playfair Display',serif", color:'#8B1A1A', marginBottom:12 }}>Sign in to view your Sankalpas</h2>
      <Link href="/auth/signin" style={{ background:'#8B1A1A', color:'white', borderRadius:12, padding:'12px 28px', textDecoration:'none', fontWeight:700 }}>Sign In</Link>
    </div>
  )

  return (
    <div style={{ maxWidth:700, margin:'0 auto', padding:'40px 20px', fontFamily:"'Inter',sans-serif" }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:32 }}>
        <div>
          <Link href="/manifest" style={{ fontSize:13, color:'#C0570A', textDecoration:'none' }}>← Manifest</Link>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:'#8B1A1A', margin:'8px 0 4px' }}>My Sankalpas</h1>
          <p style={{ color:'#A89B8C', fontSize:13 }}>Your sacred intentions and their journey</p>
        </div>
        <Link href="/manifest/write" style={{ background:'#8B1A1A', color:'white', borderRadius:12, padding:'10px 20px', textDecoration:'none', fontWeight:700, fontSize:14 }}>+ New Sankalp</Link>
      </div>

      {loading ? <div style={{ textAlign:'center', padding:48, color:'#A89B8C' }}>Loading your sankalpas...</div> :
       sankalpas.length === 0 ? (
        <div style={{ textAlign:'center', padding:48 }}>
          <div style={{ fontSize:48, marginBottom:16 }}>🛕</div>
          <p style={{ color:'#6B5B4E', marginBottom:20 }}>No sankalpas yet. Write your first sacred intention.</p>
          <Link href="/manifest/write" style={{ background:'#8B1A1A', color:'white', borderRadius:12, padding:'12px 28px', textDecoration:'none', fontWeight:700 }}>Write My Sankalp</Link>
        </div>
       ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {sankalpas.map((s: any) => (
            <div key={s._id} style={{ background:'white', border:'1.5px solid #E8E0D4', borderRadius:16, padding:24 }}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:8, marginBottom:8, flexWrap:'wrap' }}>
                    <span style={{ padding:'3px 10px', borderRadius:100, fontSize:11, fontWeight:700, background: STATUS_BG[s.status], color: STATUS_COLORS[s.status] }}>{s.status}</span>
                    <span style={{ padding:'3px 10px', borderRadius:100, fontSize:11, background:'#FFF0F0', color:'#8B1A1A', fontWeight:600 }}>{s.deity}</span>
                    {s.category && <span style={{ padding:'3px 10px', borderRadius:100, fontSize:11, background:'#F8F4EE', color:'#6B5B4E' }}>{s.category}</span>}
                  </div>
                  <p style={{ fontSize:15, color:'#1A0A00', lineHeight:1.7, margin:'0 0 8px' }}>{s.intention}</p>
                  {s.timeline && <div style={{ fontSize:12, color:'#A89B8C' }}>Timeline: {s.timeline}</div>}
                  {s.gratitude_yatra && <div style={{ fontSize:12, color:'#C0570A', marginTop:4 }}>🛕 Gratitude Yatra pledged</div>}
                  {s.fulfilled_note && <div style={{ fontSize:13, color:'#1E40AF', marginTop:8, fontStyle:'italic' }}>"{s.fulfilled_note}"</div>}
                </div>
                <div style={{ fontSize:11, color:'#A89B8C', flexShrink:0, textAlign:'right' }}>
                  {new Date(s.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                </div>
              </div>

              {s.status === 'active' && (
                fulfilling === s._id ? (
                  <div style={{ marginTop:12, padding:16, background:'#EFF6FF', borderRadius:12 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:'#1E40AF', marginBottom:8 }}>How did your Sankalp manifest? (optional)</div>
                    <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="Share your experience of fulfilment..." style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:'1px solid #BFDBFE', fontSize:13, resize:'none', marginBottom:10, outline:'none' }} />
                    <div style={{ display:'flex', gap:10 }}>
                      <button onClick={() => markFulfilled(s._id)} style={{ background:'#1E40AF', color:'white', border:'none', borderRadius:8, padding:'8px 20px', fontWeight:700, fontSize:13, cursor:'pointer' }}>Mark Fulfilled</button>
                      <button onClick={() => setFulfilling(null)} style={{ background:'none', border:'1px solid #BFDBFE', borderRadius:8, padding:'8px 16px', fontSize:13, cursor:'pointer', color:'#1E40AF' }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display:'flex', gap:10, marginTop:12 }}>
                    <button onClick={() => setFulfilling(s._id)} style={{ background:'#DCFCE7', color:'#166534', border:'1px solid #86EFAC', borderRadius:8, padding:'8px 16px', fontSize:13, fontWeight:600, cursor:'pointer' }}>Manifested</button>
                    {s.gratitude_yatra && <Link href={'/plan?destination=' + (s.temple_name || s.deity)} style={{ background:'#FFF0F0', color:'#8B1A1A', border:'1px solid #FECACA', borderRadius:8, padding:'8px 16px', fontSize:13, fontWeight:600, textDecoration:'none' }}>Plan Gratitude Yatra</Link>}
                  </div>
                )
              )}

              {s.status === 'fulfilled' && s.gratitude_yatra && (
                <Link href={'/plan?destination=' + (s.temple_name || s.deity)} style={{ display:'inline-flex', alignItems:'center', gap:6, marginTop:12, background:'#8B1A1A', color:'white', border:'none', borderRadius:8, padding:'10px 18px', fontSize:13, fontWeight:700, textDecoration:'none' }}>
                  🛕 Plan Your Gratitude Yatra Now
                </Link>
              )}
            </div>
          ))}
        </div>
       )}
    </div>
  )
}
