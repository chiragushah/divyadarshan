'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, Loader2, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'

const VERIFY_QUESTIONS = [
  { key: 'timing_accurate',    label: 'Were the opening hours accurate?' },
  { key: 'facilities_accurate',label: 'Were the facilities (toilets, parking) as described?' },
  { key: 'wheelchair_accurate',label: 'Was the wheelchair access info correct?' },
  { key: 'directions_accurate',label: 'Were the directions/how-to-reach helpful?' },
]

export default function MarkVisited({ templeSlug, templeName }: { templeSlug: string; templeName: string }) {
  const { data: session } = useSession()
  const [visited, setVisited]       = useState(false)
  const [loading, setLoading]       = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [answers, setAnswers]       = useState<Record<string,boolean|null>>({})
  const [verifyDone, setVerifyDone] = useState(false)
  const [rating, setRating]         = useState(0)

  useEffect(() => {
    if (!session?.user) return
    fetch('/api/visits?slug=' + templeSlug)
      .then(r => r.json())
      .then(d => setVisited((d.visits || []).length > 0))
  }, [session, templeSlug])

  const toggle = async () => {
    if (!session?.user || loading) return
    setLoading(true)
    await fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temple_slug: templeSlug, temple_name: templeName, visit_date: new Date().toISOString().split('T')[0] }),
    })
    setVisited(v => !v)
    setLoading(false)
    if (!visited) setShowVerify(true) // Show verification after first mark
  }

  const submitVerification = async () => {
    await fetch('/api/verify-temple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temple_slug: templeSlug, temple_name: templeName, answers, rating }),
    })
    setVerifyDone(true)
    setTimeout(() => setShowVerify(false), 2000)
  }

  if (!session?.user) return null

  return (
    <>
      <button onClick={toggle} disabled={loading}
        className={"flex items-center gap-1.5 text-xs transition-all px-3 py-1.5 rounded-full border " + (
          visited ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'
        )}>
        {loading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
        {visited ? 'Visited ✓' : 'Mark as Visited'}
      </button>

      {showVerify && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div style={{ background:'white', borderRadius:20, padding:28, maxWidth:440, width:'100%', boxShadow:'0 24px 80px rgba(0,0,0,0.2)' }}>
            {verifyDone ? (
              <div style={{ textAlign:'center', padding:'20px 0' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🙏</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#8B1A1A', marginBottom:8 }}>Thank You!</h3>
                <p style={{ color:'#6B5B4E', fontSize:13 }}>Your verification helps all pilgrims get accurate information. You earned 5 karma points!</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign:'center', marginBottom:20 }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>🛕</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:'#8B1A1A', marginBottom:4 }}>You visited {templeName}!</h3>
                  <p style={{ color:'#6B5B4E', fontSize:13 }}>Help other pilgrims — were the details accurate? Takes 30 seconds.</p>
                </div>

                {/* Star rating */}
                <div style={{ marginBottom:16, textAlign:'center' }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#A89B8C', marginBottom:8, textTransform:'uppercase', letterSpacing:'.06em' }}>Overall Experience</div>
                  <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => setRating(s)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:28, opacity: s <= rating ? 1 : 0.3, transition:'all 0.15s' }}>★</button>
                    ))}
                  </div>
                </div>

                {/* Accuracy questions */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#A89B8C', marginBottom:10, textTransform:'uppercase', letterSpacing:'.06em' }}>Was the information accurate?</div>
                  {VERIFY_QUESTIONS.map(q => (
                    <div key={q.key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #F0EAE4' }}>
                      <span style={{ fontSize:13, color:'#4A3728' }}>{q.label}</span>
                      <div style={{ display:'flex', gap:8 }}>
                        <button onClick={() => setAnswers(a => ({...a,[q.key]:true}))} style={{ padding:'5px 14px', borderRadius:100, border:'1.5px solid', borderColor:answers[q.key]===true?'#166534':'#E8E0D4', background:answers[q.key]===true?'#DCFCE7':'white', color:answers[q.key]===true?'#166534':'#6B5B4E', fontSize:12, fontWeight:600, cursor:'pointer' }}>Yes</button>
                        <button onClick={() => setAnswers(a => ({...a,[q.key]:false}))} style={{ padding:'5px 14px', borderRadius:100, border:'1.5px solid', borderColor:answers[q.key]===false?'#991B1B':'#E8E0D4', background:answers[q.key]===false?'#FEE2E2':'white', color:answers[q.key]===false?'#991B1B':'#6B5B4E', fontSize:12, fontWeight:600, cursor:'pointer' }}>No</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={() => setShowVerify(false)} style={{ flex:1, padding:'10px 0', borderRadius:10, border:'1.5px solid #E8E0D4', background:'white', color:'#6B5B4E', fontWeight:600, fontSize:13, cursor:'pointer' }}>Skip</button>
                  <button onClick={submitVerification} style={{ flex:2, padding:'10px 0', borderRadius:10, border:'none', background:'#8B1A1A', color:'white', fontWeight:700, fontSize:13, cursor:'pointer' }}>Submit Verification 🙏</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
