import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Pilgrim Stories | DivyaDarshanam' }

const STORIES = [
  { name: 'Ramesh Kulkarni', loc: 'Pune', title: 'My Char Dham Yatra with AI Planning', quote: 'The AI planner gave me a complete Char Dham itinerary in 2 minutes. It knew which temple opens first in the season. My family had the most organised pilgrimage we have ever done.', deity: 'Vishnu', initial: 'R' },
  { name: 'Sunita Joshi', loc: 'Mumbai', title: 'Sankalp for My Daughter's Marriage', quote: 'I wrote my Sankalp for my daughter's marriage, dedicated it to Parvati Mata, and kept faith. Eight months later she found the perfect match. Jai Mata Di.', deity: 'Parvati', initial: 'S' },
  { name: 'Vikram Mehta', loc: 'Ahmedabad', title: 'Navagraha Shanti Changed My Life', quote: 'The Navagraha shlokas with YouTube links changed my daily morning routine. I now chant correctly with the right pronunciation every single day.', deity: 'Navagraha', initial: 'V' },
]

export default function StoriesPage() {
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

        .story-card{background:#fff;border:1.5px solid #F0EDE8;border-radius:16px;padding:28px;position:relative;overflow:hidden}
        .story-card::before{content:'"';font-family:'Playfair Display',serif;font-size:100px;color:#FFF5F0;position:absolute;top:0;left:16px;line-height:1;pointer-events:none}
        .avatar{width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#8B1A1A,#C0570A);display:flex;align-items:center;justify-content:center;color:white;font-weight:700;font-size:18px;flex-shrink:0}
      `}</style>
      <div className="page">
        <Link href="/" className="back">← Back to Home</Link>
        <div className="label">Community</div>
        <h1>Pilgrim Stories</h1>
        <p className="sub">Real journeys, real faith, real transformation. Stories from pilgrims who planned their sacred yatras with DivyaDarshanam.</p>

        <div style={{display:'flex',flexDirection:'column',gap:20,marginBottom:48}}>
          {STORIES.map(s => (
            <div key={s.name} className="story-card">
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.2rem',fontWeight:700,color:'#8B1A1A',marginBottom:12,position:'relative'}}>{s.title}</h3>
              <p style={{fontSize:15,color:'#3D2B1F',lineHeight:1.8,fontStyle:'italic',marginBottom:20,position:'relative'}}>{s.quote}</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="avatar">{s.initial}</div>
                <div>
                  <p style={{fontWeight:700,color:'#1A0A00',fontSize:14}}>{s.name}</p>
                  <p style={{fontSize:12,color:'#A89B8C'}}>{s.loc} · Devotee of {s.deity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:'#FFF5F0',border:'1.5px solid #FFD4B8',borderRadius:16,padding:28,textAlign:'center'}}>
          <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',color:'#8B1A1A',marginBottom:8}}>Share Your Story</h3>
          <p style={{color:'#6B5B4E',marginBottom:16}}>Have a pilgrimage story to share? Write to us and inspire thousands of pilgrims.</p>
          <Link href="/contact" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'12px 28px',borderRadius:100,background:'#8B1A1A',color:'white',textDecoration:'none',fontWeight:700,fontSize:14}}>
            Share Your Story →
          </Link>
        </div>
      </div>
    </>
  )
}
