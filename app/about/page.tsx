import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About Us | DivyaDarshanam' }

export default function AboutPage() {
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
`}</style>
      <div className="page">
        <Link href="/" className="back">← Back to Home</Link>
        <div className="label">Our Story</div>
        <h1>About DivyaDarshanam</h1>
        <p className="sub">DivyaDarshanam is India’s most complete temple discovery and pilgrimage planning platform — built by pilgrims, for pilgrims.</p>

        <div className="grid">
          <div className="card">
            <h3>🏛️ Our Mission</h3>
            <p>To make every sacred temple in India accessible, discoverable and plannable for every pilgrim — regardless of language, age or tech ability.</p>
          </div>
          <div className="card">
            <h3>👁️ Our Vision</h3>
            <p>A world where every Indian can plan, experience and share their spiritual journey with ease — digitally connected to their roots.</p>
          </div>
          <div className="card">
            <h3>🙏 Our Values</h3>
            <p>Authentic, accurate, free forever. We serve pilgrims — not advertisers. Every feature is built around what a real pilgrim needs.</p>
          </div>
          <div className="card">
            <h3>🛕 What We Built</h3>
            <p>422+ verified temples, AI yatra planner, live darshan streams, Navagraha shanti guide, pilgrimage journal, group yatra tools and savings goals.</p>
          </div>
          <div className="card">
            <h3>🇳🇳 Made in India</h3>
            <p>Conceived, designed and built in Pune by Dynaimers Consulting — a team passionate about Indian culture, technology and spirituality.</p>
          </div>
          <div className="card">
            <h3>♥️ Free Forever</h3>
            <p>DivyaDarshanam will always be free for pilgrims. We believe access to sacred knowledge is a right, not a privilege.</p>
          </div>
        </div>

        <div style={{marginTop:48,padding:'32px',background:'linear-gradient(135deg,#FFF5F0,#FDFAF6)',borderRadius:16,border:'1.5px solid #FFD4B8',textAlign:'center'}}>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:'1.4rem',fontWeight:700,color:'#8B1A1A',marginBottom:8}}>सनातन संस्कृति, अनंत आस्था</p>
          <p style={{color:'#C0570A',fontWeight:600}}>Sanatan Sanskriti, Anant Aastha</p>
        </div>
      </div>
    </>
  )
}
