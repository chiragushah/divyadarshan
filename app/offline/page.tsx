'use client'

export default function OfflinePage() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, background:'#FDFAF6', padding:24, textAlign:'center' }}>
      <div style={{ fontSize:64 }}>🛕</div>
      <h1 style={{ fontSize:28, color:'#8B1A1A', fontFamily:"'Playfair Display',serif" }}>You are offline</h1>
      <p style={{ color:'#6B5B4E', maxWidth:320, lineHeight:1.7 }}>
        No internet connection. Previously visited pages are still available. Connect to continue planning.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{ background:'#8B1A1A', color:'white', border:'none', borderRadius:10, padding:'12px 28px', fontWeight:700, fontSize:14, cursor:'pointer' }}>
        Try Again
      </button>
    </div>
  )
}
