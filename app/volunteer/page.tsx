import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Be a Volunteer | DivyaDarshanam',
}

export default function Page() {
  return (
    <div style={{minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px 24px',textAlign:'center',background:'#fff'}}>
      <div style={{fontSize:56,marginBottom:20}}>🤝</div>
      <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'2.2rem',fontWeight:700,color:'#8B1A1A',marginBottom:12}}>Be a Volunteer</h1>
      <p style={{fontSize:'1.05rem',color:'#6B5B4E',maxWidth:480,lineHeight:1.8,marginBottom:32}}>Join our mission to document and preserve India's sacred heritage. Help verify temple data, translate content and guide fellow pilgrims.</p>
      <div style={{display:'inline-block',padding:'14px 28px',borderRadius:100,border:'2px solid #C0570A',color:'#C0570A',fontWeight:700,fontSize:14}}>
        Coming Soon — We are working on this page
      </div>
      <Link href="/" style={{display:'block',marginTop:24,color:'#A89B8C',fontSize:14,textDecoration:'none'}}>
        ← Back to Home
      </Link>
    </div>
  )
}
