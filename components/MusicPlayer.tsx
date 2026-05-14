'use client'
import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  // Autoplay muted on mount - always works
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.4
    audio.muted = true
    audio.play().catch(() => {})
  }, [])

  const unmute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = false
    setMuted(false)
    setShowBanner(false)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(!muted)
  }

  if (dismissed) return null

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />

      {/* Unmute banner - shown on first load */}
      {showBanner && (
        <div style={{
          position: 'fixed', bottom: 80, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'linear-gradient(135deg,#8B1A1A,#C0570A)',
          borderRadius: 100,
          padding: '12px 24px',
          display: 'flex', alignItems: 'center', gap: 12,
          boxShadow: '0 8px 32px rgba(139,26,26,0.35)',
          animation: 'slideUp .4s ease',
          whiteSpace: 'nowrap',
        }}>
          <span style={{fontSize:18}}>🎵</span>
          <div>
            <div style={{fontSize:13,fontWeight:700,color:'white'}}>Sacred music is ready</div>
            <div style={{fontSize:11,color:'rgba(255,255,255,0.7)'}}>River Prayer • playing silently</div>
          </div>
          <button onClick={unmute} style={{
            background:'#FFD700', color:'#1A0A00',
            border:'none', borderRadius:100,
            padding:'8px 18px', fontSize:13, fontWeight:800,
            cursor:'pointer', flexShrink:0,
          }}>
            🔊 Unmute
          </button>
          <button onClick={() => { setShowBanner(false); setDismissed(true) }} style={{
            background:'rgba(255,255,255,0.15)', color:'white',
            border:'none', borderRadius:100,
            padding:'8px 14px', fontSize:12, fontWeight:600,
            cursor:'pointer', flexShrink:0,
          }}>
            Dismiss
          </button>
        </div>
      )}

      {/* Floating music toggle button - always visible */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 999,
        display: 'flex', alignItems: 'center', gap: 8,
        background: muted ? 'rgba(255,255,255,0.95)' : 'linear-gradient(135deg,#8B1A1A,#C0570A)',
        backdropFilter: 'blur(12px)',
        border: muted ? '1.5px solid #F0EDE8' : 'none',
        borderRadius: 100,
        padding: '8px 14px 8px 10px',
        boxShadow: muted ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(139,26,26,0.35)',
        cursor: 'pointer',
        transition: 'all .3s',
      }}>
        <button onClick={toggleMute} style={{
          width:36, height:36, borderRadius:'50%',
          background: muted ? '#F5F5F5' : 'rgba(255,255,255,0.2)',
          border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:16, transition:'all .2s', flexShrink:0,
        }}>
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>
        <div onClick={toggleMute} style={{lineHeight:1}}>
          <div style={{fontSize:11,fontWeight:700,color:muted?'#A89B8C':'white'}}>
            {muted ? 'Muted' : 'River Prayer'}
          </div>
          <div style={{fontSize:10,color:muted?'#C0B4A8':'rgba(255,255,255,0.7)',marginTop:2}}>
            {muted ? 'Tap to unmute' : 'Playing • Loop'}
          </div>
        </div>
        {!muted && (
          <div style={{display:'flex',alignItems:'center',gap:2,marginLeft:2}}>
            {[1,2,3].map(i=>(
              <div key={i} style={{width:3,borderRadius:2,background:'rgba(255,255,255,0.8)',animation:'wave 1s ease-in-out infinite',animationDelay:i*0.15+'s',height:i===2?14:8}}/>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes wave{0%,100%{transform:scaleY(1);opacity:.6}50%{transform:scaleY(1.8);opacity:1}}
        @keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
      `}</style>
    </>
  )
}
