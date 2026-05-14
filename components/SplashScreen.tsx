'use client'
import { useEffect, useRef, useState } from 'react'

export default function SplashScreen() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [visible, setVisible] = useState(true)
  const [muted, setMuted] = useState(false)
  const [exiting, setExiting] = useState(false)

  // Check if already dismissed this session
  useEffect(() => {
    if (sessionStorage.getItem('splash_done')) {
      setVisible(false)
      // Still play music (user already interacted)
      const audio = audioRef.current
      if (audio) {
        audio.volume = 0.4
        audio.muted = false
        audio.play().catch(() => {})
      }
    }
  }, [])

  const enter = () => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.4
      audio.muted = false
      audio.play().catch(() => {})
    }
    setExiting(true)
    setTimeout(() => {
      setVisible(false)
      sessionStorage.setItem('splash_done', '1')
    }, 800)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !muted
    setMuted(!muted)
  }

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />

      {/* Floating mute button - always visible after splash */}
      {!visible && (
        <button onClick={toggleMute} style={{
          position:'fixed', bottom:24, right:24, zIndex:999,
          width:48, height:48, borderRadius:'50%',
          background: muted ? 'rgba(255,255,255,0.95)' : 'linear-gradient(135deg,#8B1A1A,#C0570A)',
          border: muted ? '1.5px solid #F0EDE8' : 'none',
          cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 4px 16px rgba(0,0,0,0.15)',
          transition:'all .3s',
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
      )}

      {/* Splash screen */}
      {visible && (
        <div onClick={enter} style={{
          position:'fixed', inset:0, zIndex:9999,
          cursor:'pointer',
          display:'flex', flexDirection:'column',
          alignItems:'center', justifyContent:'center',
          background:'linear-gradient(160deg,#0D0500 0%,#1A0A00 30%,#2D0808 60%,#1A0500 100%)',
          opacity: exiting ? 0 : 1,
          transition: exiting ? 'opacity .8s ease' : 'none',
        }}>

          {/* Background subtle pattern */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'radial-gradient(ellipse at 20% 50%, rgba(192,87,10,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(139,26,26,0.2) 0%, transparent 50%)',
          }} />

          {/* Om symbol top */}
          <div style={{
            position:'relative', zIndex:2,
            fontSize:32, color:'rgba(255,215,0,0.4)',
            marginBottom:24, letterSpacing:8,
            animation:'glow 3s ease-in-out infinite',
          }}>
            ॐ ॐ ॐ
          </div>

          {/* Logo */}
          <div style={{position:'relative',zIndex:2,marginBottom:32}}>
            <img src="/dd-logo.png" alt="DivyaDarshanam"
              style={{height:120,width:'auto',objectFit:'contain',
                filter:'drop-shadow(0 0 24px rgba(255,215,0,0.4))',
                animation:'float 4s ease-in-out infinite'}} />
          </div>

          {/* Title */}
          <h1 style={{
            position:'relative', zIndex:2,
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:'clamp(2rem,5vw,3.5rem)',
            fontWeight:700, color:'#FFD700',
            textAlign:'center', lineHeight:1.2,
            marginBottom:8,
            textShadow:'0 0 40px rgba(255,215,0,0.5)',
            animation:'glow 3s ease-in-out infinite',
          }}>
            DivyaDarshanam
          </h1>

          {/* Subtitle */}
          <p style={{
            position:'relative', zIndex:2,
            fontSize:'clamp(1rem,2.5vw,1.2rem)',
            color:'rgba(255,255,255,0.7)',
            textAlign:'center', marginBottom:48,
            letterSpacing:'.06em',
          }}>
            सनातन संस्कृति • अनंत आस्था
          </p>

          {/* Click to enter button */}
          <div style={{
            position:'relative', zIndex:2,
            display:'flex', flexDirection:'column',
            alignItems:'center', gap:16,
          }}>
            <div style={{
              background:'linear-gradient(135deg,#C0570A,#FFD700)',
              borderRadius:100,
              padding:'16px 48px',
              fontSize:16, fontWeight:800,
              color:'#1A0A00',
              boxShadow:'0 8px 32px rgba(255,215,0,0.3)',
              animation:'pulse 2s ease-in-out infinite',
              display:'flex', alignItems:'center', gap:10,
            }}>
              🙏 Click anywhere to begin
            </div>
            <p style={{
              fontSize:13, color:'rgba(255,255,255,0.45)',
              display:'flex', alignItems:'center', gap:6,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
              Sacred music will play
            </p>
          </div>

          {/* Bottom divider line */}
          <div style={{
            position:'absolute', bottom:32,
            display:'flex', alignItems:'center', gap:16,
            color:'rgba(255,215,0,0.3)', fontSize:12,
            letterSpacing:'.2em', textTransform:'uppercase',
          }}>
            <div style={{width:60,height:1,background:'rgba(255,215,0,0.2)'}} />
            India’s Complete Temple & Pilgrimage Companion
            <div style={{width:60,height:1,background:'rgba(255,215,0,0.2)'}} />
          </div>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
            @keyframes float {
              0%,100%{transform:translateY(0)}
              50%{transform:translateY(-10px)}
            }
            @keyframes glow {
              0%,100%{text-shadow:0 0 20px rgba(255,215,0,0.3)}
              50%{text-shadow:0 0 40px rgba(255,215,0,0.7),0 0 80px rgba(255,215,0,0.3)}
            }
            @keyframes pulse {
              0%,100%{transform:scale(1);box-shadow:0 8px 32px rgba(255,215,0,0.3)}
              50%{transform:scale(1.03);box-shadow:0 12px 48px rgba(255,215,0,0.5)}
            }
          `}</style>
        </div>
      )}
    </>
  )
}
