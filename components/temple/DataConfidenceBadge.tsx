'use client'

interface Props {
  verifiedCount?: number
  reportCount?: number
  isVerified?: boolean
}

export default function DataConfidenceBadge({ verifiedCount = 0, reportCount = 0, isVerified = false }: Props) {
  if (isVerified) return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:100, background:'#DCFCE7', border:'1px solid #86EFAC', fontSize:12, fontWeight:600, color:'#166534' }}>
      ✓ Community Verified · {verifiedCount} pilgrims confirmed
    </div>
  )

  if (reportCount > 2) return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:100, background:'#FEE2E2', border:'1px solid #FECACA', fontSize:12, fontWeight:600, color:'#991B1B' }}>
      ⚠️ Some details reported as inaccurate · Please verify before visiting
    </div>
  )

  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:100, background:'#FEF3C7', border:'1px solid #FDE68A', fontSize:12, color:'#92400E' }}>
      ℹ️ Details AI-assisted · Help verify by marking as visited
    </div>
  )
}
