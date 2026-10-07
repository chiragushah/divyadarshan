'use client'
import { BADGES, getBadge, getNextBadge, getProgress, Badge } from '@/lib/badges'
import { Award, Flame, Footprints, Gem, HandHeart, Landmark, Medal, Mountain, Sparkles, Star, Trophy } from 'lucide-react'

function iconFor(key: string, size = 28) {
  switch (key) {
    case 'trophy':     return <Trophy size={size} />
    case 'medal':      return <Medal size={size} />
    case 'flame':      return <Flame size={size} />
    case 'star':       return <Star size={size} />
    case 'award':      return <Award size={size} />
    case 'sparkles':   return <Sparkles size={size} />
    case 'gem':        return <Gem size={size} />
    case 'footprints': return <Footprints size={size} />
    case 'mountain':   return <Mountain size={size} />
    default:           return <Award size={size} />
  }
}

interface Props {
  contributionAmount: number
  approvedRecs: number
  compact?: boolean
}

export default function BadgeCard({ contributionAmount, approvedRecs, compact = false }: Props) {
  const current = getBadge(contributionAmount, approvedRecs)
  const next = getNextBadge(current)
  const progress = next ? getProgress(contributionAmount, approvedRecs, next) : 100

  const fmtINR = (n: number) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:0 }).format(n)

  if (compact) {
    if (!current) return (
      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:100, background:'#F8F4EE', border:'1px solid #E8E0D4', fontSize:12, color:'#A89B8C' }}>
        <Landmark size={14} /> No badge yet — contribute or recommend temples to earn one
      </div>
    )
    return (
      <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:100, background:current.bg, border:`1.5px solid ${current.border}`, fontSize:13, fontWeight:700, color:current.color }}>
        {current.icon ? iconFor(current.icon, 14) : null} {current.name}
      </div>
    )
  }

  return (
    <div style={{ background:'white', border:'1.5px solid #E8E0D4', borderRadius:16, padding:24 }}>
      <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.1em', color:'#A89B8C', marginBottom:16 }}>Your Partner Badge</div>

      {/* All badges */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:24 }}>
        {BADGES.map(b => {
          const earned = current && (BADGES.indexOf(b) <= BADGES.indexOf(current))
          return (
            <div key={b.id} style={{ textAlign:'center', padding:'14px 8px', borderRadius:12, background: earned ? b.bg : '#F8F4EE', border:`2px solid ${earned ? b.border : '#E8E0D4'}`, transition:'all 0.2s', opacity: earned ? 1 : 0.5 }}>
              <div style={{ marginBottom:6, display:'flex', justifyContent:'center', color: earned ? b.color : '#A89B8C', filter: earned ? 'none' : 'grayscale(100%)' }}>{b.icon ? iconFor(b.icon, 28) : null}</div>
              <div style={{ fontSize:11, fontWeight:700, color: earned ? b.color : '#A89B8C' }}>{b.name}</div>
              <div style={{ fontSize:10, color:'#A89B8C', marginTop:2 }}>{fmtINR(b.minAmount)}</div>
              <div style={{ fontSize:10, color:'#A89B8C' }}>or {b.minRecs} recs</div>
              {earned && <div style={{ fontSize:10, fontWeight:700, color:b.color, marginTop:4 }}>✓ Earned</div>}
            </div>
          )
        })}
      </div>

      {/* Current status */}
      {current ? (
        <div style={{ background:current.bg, border:`1.5px solid ${current.border}`, borderRadius:12, padding:16, marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
            <span style={{ display:'inline-flex', color:current.color }}>{current.icon ? iconFor(current.icon, 30) : null}</span>
            <div>
              <div style={{ fontWeight:700, fontSize:16, color:current.color }}>{current.name}</div>
              <div style={{ fontSize:12, color:'#6B5B4E', display:'inline-flex', alignItems:'center', gap:4 }}>Thank you for supporting DivyaDarshanam's mission <HandHeart size={14} /></div>
            </div>
          </div>
          <div style={{ fontSize:12, fontWeight:600, color:current.color, marginBottom:6 }}>Your perks:</div>
          {current.perks.map(p => (
            <div key={p} style={{ fontSize:12, color:'#6B5B4E', padding:'3px 0', display:'flex', gap:6 }}>
              <span style={{ color:current.color }}>✓</span> {p}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background:'#FFF8F0', border:'1px solid #FFD4B0', borderRadius:12, padding:16, marginBottom:16 }}>
          <div style={{ fontWeight:600, fontSize:14, color:'#C0570A', marginBottom:4 }}>No badge yet</div>
          <div style={{ fontSize:13, color:'#6B5B4E' }}>
            Contribute <strong>Rs.5,000+</strong> or get <strong>3 temples approved</strong> to earn your Bronze badge.
          </div>
        </div>
      )}

      {/* Progress to next */}
      {next && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
            <span style={{ fontSize:12, fontWeight:600, color:'#6B5B4E', display:'inline-flex', alignItems:'center', gap:4 }}>Progress to {next.icon ? iconFor(next.icon, 14) : null} {next.name}</span>
            <span style={{ fontSize:12, fontWeight:700, color:next.color }}>{Math.round(progress)}%</span>
          </div>
          <div style={{ height:8, background:'#F3F4F6', borderRadius:100, overflow:'hidden', marginBottom:8 }}>
            <div style={{ height:'100%', width:`${progress}%`, background:`linear-gradient(90deg, ${next.border}, ${next.color})`, borderRadius:100, transition:'width 1s ease' }} />
          </div>
          <div style={{ fontSize:11, color:'#A89B8C' }}>
            Reach {fmtINR(next.minAmount)} contribution <strong>or</strong> {next.minRecs} approved temple recommendations
          </div>
          <div style={{ fontSize:11, color:'#6B5B4E', marginTop:6 }}>
            You have: {fmtINR(contributionAmount)} contributed · {approvedRecs} temples approved
          </div>
        </div>
      )}

      {!next && current && (
        <div style={{ textAlign:'center', padding:'12px', background:'#EFF6FF', borderRadius:10, fontSize:13, color:'#1E40AF', fontWeight:600 }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6, justifyContent:'center' }}><Gem size={16} /> You have reached our highest tier — Platinum Partner!</span>
        </div>
      )}
    </div>
  )
}
