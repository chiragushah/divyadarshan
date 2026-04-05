'use client'
import { useState } from 'react'
import RecommendTempleModal from './RecommendTempleModal'
import { Plus } from 'lucide-react'

export default function RecommendTempleButton({ variant = 'button' }: { variant?: 'button' | 'banner' }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {variant === 'banner' ? (
        <div style={{ background:'linear-gradient(135deg,#FFF8F0,#FFE8D0)', border:'1.5px solid #C0570A', borderRadius:14, padding:'16px 20px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:16, marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ fontSize:28 }}>🛕</span>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:'#8B1A1A' }}>Know a temple we are missing?</div>
              <div style={{ fontSize:12, color:'#6B5B4E', marginTop:2 }}>Help pilgrims discover it — recommend it to our team</div>
            </div>
          </div>
          <button onClick={() => setOpen(true)} style={{ background:'#8B1A1A', color:'white', border:'none', borderRadius:10, padding:'10px 18px', fontWeight:700, fontSize:13, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>
            + Recommend a Temple
          </button>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} style={{ display:'flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:9, border:'1.5px solid #C0570A', background:'#FFF0F0', color:'#8B1A1A', fontWeight:600, fontSize:13, cursor:'pointer', fontFamily:'inherit' }}>
          + Recommend a Temple
        </button>
      )}
      {open && <RecommendTempleModal onClose={() => setOpen(false)} />}
    </>
  )
}
