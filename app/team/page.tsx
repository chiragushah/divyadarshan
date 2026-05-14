import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Our Team | DivyaDarshanam' }

const TEAM = [
  { name: 'Chirag Shah', role: 'Founder & CEO', desc: 'Visionary behind DivyaDarshanam. Passionate about Indian culture, spirituality and technology.', loc: 'Pune, Maharashtra', initial: 'C' },
  { name: 'Dynaimers Team', role: 'Technology & Design', desc: 'Full-stack development, UI/UX design and platform architecture powering DivyaDarshanam.', loc: 'Pune, Maharashtra', initial: 'D' },
]

export default function TeamPage() {
  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Inter',sans-serif;background:#fff;color:#1A0A00}
  .page{max-width:900px;margin:0 auto;padding:64px 24px}
  .back{display:inline-flex;align-items:center;gap:6px;color:#A89B8C;text-decoration:none;font-size:13px;margin-bottom:32px}
  .back:hover{color:#8B1A1A}
  .label{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#C0570A;margin-bottom:10px}
  h1{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;color:#1A0A00;margin-bottom:16px;line-height:1.2}
  .sub{font-size:1.05rem;color:#6B5B4E;line-height:1.8;margin-bottom:40px;max-width:600px}
  .card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;margin-bottom:20px}
  .card:hover{border-color:rgba(192,87,10,0.3);box-shadow:0 4px 20px rgba(192,87,10,.06)}
  .card h3{font-family:'Playfair Display',serif;font-size:1.2rem;font-weight:700;color:#1A0A00;margin-bottom:8px}
  .card p{font-size:14px;color:#6B5B4E;line-height:1.7}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px}
  .chip{display:inline-block;padding:5px 14px;border-radius:100px;border:1.5px solid #C0570A;color:#8B1A1A;font-size:12px;font-weight:600;margin:4px}

        .team-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;display:flex;align-items:flex-start;gap:20px}
        .avatar{width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#8B1A1A,#C0570A);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:22px;flex-shrink:0}
      `}</style>
      <div className="page">
        <Link href="/" className="back">← Back to Home</Link>
        <div className="label">The People</div>
        <h1>Our Team</h1>
        <p className="sub">Meet the passionate team behind DivyaDarshanam — building the digital companion every pilgrim deserves.</p>

        <div style={{display:'flex',flexDirection:'column',gap:16,marginBottom:48}}>
          {TEAM.map(t => (
            <div key={t.name} className="team-card">
              <div className="avatar">{t.initial}</div>
              <div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',fontWeight:700,color:'#1A0A00',marginBottom:4}}>{t.name}</h3>
                <p style={{fontSize:12,fontWeight:700,color:'#C0570A',marginBottom:8,textTransform:'uppercase',letterSpacing:'.08em'}}>{t.role}</p>
                <p style={{fontSize:14,color:'#6B5B4E',lineHeight:1.7,marginBottom:6}}>{t.desc}</p>
                <p style={{fontSize:12,color:'#A89B8C'}}>📍 {t.loc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:16,padding:28,textAlign:'center'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',color:'#8B1A1A',marginBottom:8}}>Want to join our mission?</h3>
          <p style={{color:'#6B5B4E',marginBottom:16}}>We are always looking for passionate people who love Indian culture and technology.</p>
          <Link href="/volunteer" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',borderRadius:100,background:'#8B1A1A',color:'white',textDecoration:'none',fontWeight:700,fontSize:14}}>
            Be a Volunteer →
          </Link>
        </div>
      </div>
    </>
  )
}
