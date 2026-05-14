'use client'
import { useEffect, useRef, useState } from 'react'

export default function SplashScreen() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [visible, setVisible] = useState(true)
  const [muted, setMuted] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('splash_done')) {
      setVisible(false)
      const audio = audioRef.current
      if (audio) { audio.volume = 0.4; audio.muted = false; audio.play().catch(()=>{}) }
    }
  }, [])

  const enter = () => {
    const audio = audioRef.current
    if (audio) { audio.volume = 0.4; audio.muted = false; audio.play().catch(()=>{}) }
    setExiting(true)
    setTimeout(() => { setVisible(false); sessionStorage.setItem('splash_done','1') }, 900)
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

      {!visible && (
        <button onClick={toggleMute} title={muted ? 'Unmute' : 'Mute'} style={{
          position:'fixed',bottom:24,right:24,zIndex:999,
          width:48,height:48,borderRadius:'50%',
          background:muted?'rgba(255,255,255,0.95)':'linear-gradient(135deg,#8B1A1A,#C0570A)',
          border:muted?'1.5px solid #F0EDE8':'none',
          cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
          boxShadow:'0 4px 16px rgba(0,0,0,0.15)',transition:'all .3s',
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

      {visible && (
        <div onClick={enter} style={{
          position:'fixed',inset:0,zIndex:9999,cursor:'pointer',
          background:'#FFFFFF',
          display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
          padding:'40px 24px',textAlign:'center',
          opacity:exiting?0:1,transition:exiting?'opacity .9s ease':'none',
        }}>

          {/* Top saffron border */}
          <div style={{position:'absolute',top:0,left:0,right:0,height:4,background:'linear-gradient(90deg,#C0570A,#FFD700,#8B1A1A,#FFD700,#C0570A)'}} />

          {/* Om */}
          <div style={{fontSize:28,color:'#C0570A',marginBottom:20,letterSpacing:12,animation:'glow 3s ease-in-out infinite'}}>
            ॐ ॐ ॐ
          </div>

          {/* Logo */}
          <img src="/dd-logo.png" alt="DivyaDarshanam" style={{
            height:120,width:'auto',objectFit:'contain',marginBottom:20,
            animation:'float 4s ease-in-out infinite',
            filter:'drop-shadow(0 4px 16px rgba(192,87,10,0.2))',
          }} />

          {/* Brand name */}
          <h1 style={{
            fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:'clamp(2rem,5vw,3rem)',
            fontWeight:700,color:'#8B1A1A',
            marginBottom:6,lineHeight:1.2,
          }}>
            DivyaDarshanam
          </h1>

          {/* Tagline Hindi */}
          <p style={{fontSize:'clamp(.9rem,2vw,1.1rem)',color:'#C0570A',marginBottom:6,fontWeight:600}}>
            सनातन संस्कृति — अनंत आस्था
          </p>

          {/* Tagline English */}
          <p style={{fontSize:14,color:'#A89B8C',marginBottom:32,letterSpacing:'.08em',textTransform:'uppercase',fontWeight:600}}>
            India&apos;s Complete Temple &amp; Pilgrimage Companion
          </p>

          {/* Divider */}
          <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:32,width:'100%',maxWidth:400}}>
            <div style={{flex:1,height:1,background:'linear-gradient(to right,transparent,#FFD4B8)'}} />
            <span style={{color:'#C0570A',fontSize:18}}>🛕</span>
            <div style={{flex:1,height:1,background:'linear-gradient(to left,transparent,#FFD4B8)'}} />
          </div>

          {/* Sayings */}
          <div style={{maxWidth:480,marginBottom:40}}>
            <p style={{
              fontFamily:"'Playfair Display',Georgia,serif",
              fontSize:'clamp(1rem,2.5vw,1.3rem)',
              fontStyle:'italic',color:'#3D2B1F',
              lineHeight:1.8,marginBottom:12,
            }}>
              &ldquo;When your Sankalp is pure and your heart is true,<br />
              the universe conspires to make it happen.&rdquo;
            </p>
            <p style={{fontSize:13,color:'#C0570A',fontWeight:600,letterSpacing:'.06em'}}>
              संकल्प लो • श्रद्धा से चलो • दर्शन पाओ
            </p>
          </div>

          {/* 4 pillars */}
          <div style={{display:'flex',gap:24,marginBottom:40,flexWrap:'wrap',justifyContent:'center'}}>
            {[
              {icon:'🛕',label:'422 Temples'},
              {icon:'📺',label:'Live Darshan'},
              {icon:'🤖',label:'AI Planner'},
              {icon:'🙏',label:'Sankalp'},
            ].map(p => (
              <div key={p.label} style={{textAlign:'center'}}>
                <div style={{fontSize:24,marginBottom:4}}>{p.icon}</div>
                <div style={{fontSize:11,fontWeight:700,color:'#8B1A1A',letterSpacing:'.08em',textTransform:'uppercase'}}>{p.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{
            background:'linear-gradient(135deg,#8B1A1A,#C0570A)',
            borderRadius:100,
            padding:'16px 48px',
            fontSize:16,fontWeight:800,color:'white',
            boxShadow:'0 8px 32px rgba(139,26,26,0.25)',
            animation:'pulse 2s ease-in-out infinite',
            display:'flex',alignItems:'center',gap:10,marginBottom:16,
          }}>
            🙏 Begin My Sacred Journey
          </div>

          <p style={{fontSize:13,color:'#A89B8C',display:'flex',alignItems:'center',gap:6}}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
            Sacred music will play &bull; Click anywhere to enter
          </p>

          {/* Bottom saffron border */}
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:4,background:'linear-gradient(90deg,#C0570A,#FFD700,#8B1A1A,#FFD700,#C0570A)'}} />

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
            @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
            @keyframes glow{0%,100%{opacity:.6}50%{opacity:1}}
            @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
          `}</style>
        </div>
      )}
    </>
  )
}
