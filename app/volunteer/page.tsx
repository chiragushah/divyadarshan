import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Be a Volunteer | DivyaDarshanam' }

const ROLES = [
  { title: 'Temple Data Verifier', desc: 'Visit temples and verify timings, facilities and photos. Help thousands of pilgrims plan accurately.', skills: ['Temple knowledge', 'Photography', 'Attention to detail'] },
  { title: 'Content Translator', desc: 'Translate temple descriptions and guides into regional languages — Hindi, Marathi, Tamil, Telugu and more.', skills: ['Regional language', 'Writing', 'Cultural knowledge'] },
  { title: 'Community Guide', desc: 'Help new pilgrims on the platform, answer questions and share your yatra experiences.', skills: ['Pilgrimage experience', 'Patience', 'Communication'] },
  { title: 'Tech Contributor', desc: 'Help improve the platform with code, design, or testing. Open source contributions welcome.', skills: ['Development', 'Design', 'Testing'] },
]

export default function VolunteerPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#fff;color:#1A0A00}
        .page{max-width:900px;margin:0 auto;padding:64px 24px}
        .back{display:inline-flex;align-items:center;gap:6px;color:#A89B8C;text-decoration:none;font-size:13px;margin-bottom:32px}
        .back:hover{color:#8B1A1A}
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;margin-bottom:48px}
        .card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;transition:all .2s}
        .card:hover{border-color:rgba(192,87,10,0.3);transform:translateY(-2px)}
      `}</style>
      <div className="page">
        <Link href="/" className="back">← Back to Home</Link>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',color:'#C0570A',marginBottom:10}}>Join Us</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,3rem)',fontWeight:700,color:'#1A0A00',marginBottom:16}}>Be a Volunteer</h1>
        <p style={{fontSize:'1.05rem',color:'#6B5B4E',lineHeight:1.8,marginBottom:40,maxWidth:600}}>
          Join our mission to document and preserve India’s sacred heritage. Every contribution — big or small — helps thousands of pilgrims.
        </p>

        <div className="grid">
          {[
            {title:'Temple Data Verifier',desc:'Visit temples and verify timings, facilities and photos.',skills:['Temple knowledge','Photography','Attention to detail']},
            {title:'Content Translator',desc:'Translate temple descriptions into regional languages.',skills:['Regional language','Writing','Cultural knowledge']},
            {title:'Community Guide',desc:'Help new pilgrims on the platform and share your yatra experiences.',skills:['Pilgrimage experience','Patience','Communication']},
            {title:'Tech Contributor',desc:'Help improve the platform with code, design or testing.',skills:['Development','Design','Testing']},
          ].map(r => (
            <div key={r.title} className="card">
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',fontWeight:700,color:'#1A0A00',marginBottom:8}}>{r.title}</h3>
              <p style={{fontSize:13,color:'#6B5B4E',lineHeight:1.7,marginBottom:12}}>{r.desc}</p>
              <div>{r.skills.map(s => <span key={s} style={{display:'inline-block',padding:'3px 10px',borderRadius:100,border:'1px solid #FFD4B8',color:'#C0570A',fontSize:11,fontWeight:600,margin:'2px'}}>{s}</span>)}</div>
            </div>
          ))}
        </div>

        <div style={{background:'linear-gradient(135deg,#8B1A1A,#C0570A)',borderRadius:16,padding:40,textAlign:'center',color:'white'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',marginBottom:12}}>Ready to Contribute?</h3>
          <p style={{opacity:.85,marginBottom:24,fontSize:'1rem',lineHeight:1.7}}>Write to us with your area of interest and we will get back to you within 48 hours.</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'14px 32px',borderRadius:100,background:'#FFD700',color:'#1A0A00',textDecoration:'none',fontWeight:800,fontSize:15}}>
            Apply to Volunteer →
          </Link>
        </div>
      </div>
    </>
  )
}
