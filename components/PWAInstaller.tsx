'use client'
import { useEffect, useState } from 'react'

export default function PWAInstaller() {
  const [prompt, setPrompt] = useState(null)
  const [show, setShow] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true); return
    }
    const handler = function(e) {
      e.preventDefault(); setPrompt(e)
      setTimeout(function() { setShow(true) }, 30000)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return function() { window.removeEventListener('beforeinstallprompt', handler) }
  }, [])

  const install = async function() {
    if (!prompt) return
    prompt.prompt()
    const result = await prompt.userChoice
    if (result.outcome === 'accepted') setInstalled(true)
    setShow(false)
  }

  if (!show || installed) return null

  return (
    <div style={{ position:'fixed', bottom:80, left:16, right:16, zIndex:9990, background:'white', borderRadius:16, padding:'16px 20px', boxShadow:'0 8px 32px rgba(0,0,0,0.15)', border:'1.5px solid #E8E0D4', display:'flex', alignItems:'center', gap:14 }}>
      <img src='/divyadarshan-logo.png' alt='DivyaDarshan' style={{ width:44, height:44, objectFit:'contain', flexShrink:0 }} />
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:700, fontSize:14, color:'#1A0A00' }}>Install DivyaDarshan</div>
        <div style={{ fontSize:12, color:'#6B5B4E', marginTop:2 }}>Add to home screen for quick access to your yatra</div>
      </div>
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={function(){ setShow(false) }} style={{ padding:'8px 12px', borderRadius:8, border:'1px solid #E8E0D4', background:'white', fontSize:12, color:'#6B5B4E', cursor:'pointer' }}>Later</button>
        <button onClick={install} style={{ padding:'8px 16px', borderRadius:8, border:'none', background:'#8B1A1A', color:'white', fontSize:12, fontWeight:700, cursor:'pointer' }}>Install</button>
      </div>
    </div>
  )
}