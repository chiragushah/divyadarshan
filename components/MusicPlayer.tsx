'use client'
import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(true)
  const [showBanner, setShowBanner] = useState(true)

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

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />

      {/* Big unmute banner - shown on first load */}
      {showBanner && (
        <div style={{
          position:'fixed', bottom:0, left:0, right:0,
          zIndex:1000,
          background:'linear-gradient(135deg,#8B1A1A,#C0570A)',
          padding:'14px 24px',
          display:'flex', alignItems:'center', justifyContent:'center',
          gap:16, flexWrap:'wrap',
          boxShadow:'0 -4px 24px rgba(139,26,26,0.3)',
          animation:'slideUp .4s ease',
        }}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{fontSize:24}}>&#x1F3B5;</span>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:'white'}}>
                Sacred music is playing silently
              </div>
              <div style={{fontSize:12,color:'rgba(255,255,255,0.75)'}}>
                River Prayer &bull; Looping in background
              </div>
            </div>
          </div>
          <button onClick={unmute} style={{
            background:'#FFD700', color:'#1A0A00',
            border:'none', borderRadius:100,
            padding:'12px 28px', fontSize:15, fontWeight:800,
            cursor:'pointer', display:'flex', alignItems:'center', gap:8,
            boxShadow:'0 4px 12px rgba(0,0,0,0.2)',
          }}>
            &#x1F50A; Tap to Hear the Music
          </button>
          <button onClick={() => setShowBanner(false)} style={{
            background:'rgba(255,255,255,0.15)', color:'white',
            border:'1px solid rgba(255,255,255,0.3)', borderRadius:100,
            padding:'10px 20px', fontSize:13, fontWeight:600,
            cursor:'pointer',
          }}>
            Dismiss
          </button>
        </div>
      )}

      {/* Floating mute toggle - always visible */}
      <button onClick={toggleMute} style={{
        position:'fixed', bottom: showBanner ? 80 : 24, right:24,
        zIndex:999,
        width:48, height:48, borderRadius:'50%',
        background: muted
          ? 'rgba(255,255,255,0.95)'
          : 'linear-gradient(135deg,#8B1A1A,#C0570A)',
        border: muted ? '1.5px solid #F0EDE8' : 'none',
        cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 4px 16px rgba(0,0,0,0.15)',
        transition:'all .3s',
        backdropFilter:'blur(8px)',
      }}>
        {muted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        )}
      </button>

      <style>{`
        @keyframes slideUp {
          from{opacity:0;transform:translateY(100%)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>
    </>
  )
}
