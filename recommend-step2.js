// recommend-step2.js - copies components and patches admin dashboard
const fs = require('fs')
const path = require('path')

// Copy component files (written separately to avoid JSX parse issues)
const filesToCopy = [
  { src: 'RecommendTempleModal.tsx', dst: 'components/RecommendTempleModal.tsx' },
  { src: 'RecommendTempleButton.tsx', dst: 'components/RecommendTempleButton.tsx' },
]

// Check if files exist in current dir (user needs to put them here)
// or copy from a known location
filesToCopy.forEach(({ src, dst }) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dst)
    console.log(`✅ Copied ${src} to ${dst}`)
  } else {
    console.log(`⚠️  ${src} not found — will create inline`)
  }
})

// ── Patch admin dashboard to add Temple Recs tab ─────────────────────────────
let admin = fs.readFileSync('app/admin/dashboard/page.tsx', 'utf8')

if (!admin.includes("id:'recommendations'")) {
  admin = admin.replace(
    "{ id:'contributions', icon: Heart,        label:'Contributions'   },",
    "{ id:'contributions', icon: Heart,        label:'Contributions'   },\n  { id:'recommendations',icon: MapPin,       label:'Temple Recs'     },"
  )

  const recsContent = `
          {tab==='recommendations' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { label:'Total', value: data?.recommendations?.length||0, color:C.blue },
                  { label:'Pending', value: data?.recommendations?.filter((r:any)=>r.status==='pending').length||0, color:C.amber },
                  { label:'Approved', value: data?.recommendations?.filter((r:any)=>r.status==='approved').length||0, color:C.green },
                  { label:'Added to DB', value: data?.recommendations?.filter((r:any)=>r.status==='added').length||0, color:C.crimson },
                ].map((stat:any) => (
                  <div key={stat.label} style={{ background:C.surface, border:\`1.5px solid \${C.border}\`, borderRadius:12, padding:'18px 20px' }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'.1em', color:C.muted2, marginBottom:8 }}>{stat.label}</div>
                    <div style={{ fontSize:26, fontWeight:700, color:stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:14 }}>Temple Recommendations ({data?.recommendations?.length||0})</span>
                </div>
                {data?.recommendations?.length ? (
                  <table><thead><tr>
                    <th style={S.th}>Temple</th><th style={S.th}>Deity</th><th style={S.th}>Location</th>
                    <th style={S.th}>Recommended By</th><th style={S.th}>Status</th><th style={S.th}>Date</th><th style={S.th}>Action</th>
                  </tr></thead><tbody>
                    {data.recommendations.map((r:any) => (
                      <tr key={r._id}>
                        <td style={{ ...S.td, fontWeight:600 }}>{r.name}</td>
                        <td style={S.td}>{r.deity}</td>
                        <td style={{ ...S.td, color:C.muted }}>{r.city}, {r.state}</td>
                        <td style={{ ...S.td, fontSize:12 }}>
                          <div style={{ fontWeight:500 }}>{r.recommender_name}</div>
                          <div style={{ color:C.muted2 }}>{r.recommender_email}</div>
                        </td>
                        <td style={S.td}><span style={S.badge(
                          r.status==='pending'?C.amber:r.status==='approved'?C.blue:r.status==='added'?C.green:C.red,
                          r.status==='pending'?C.amberBg:r.status==='approved'?C.blueBg:r.status==='added'?C.greenBg:C.redBg
                        )}>{r.status}</span></td>
                        <td style={{ ...S.td, color:C.muted2 }}>{ago(r.createdAt)}</td>
                        <td style={S.td}>
                          <select defaultValue={r.status} onChange={async (e:any) => {
                            await fetch('/api/recommend-temple',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:r._id,status:e.target.value})})
                            load()
                          }} style={{ fontSize:12, padding:'5px 8px' }}>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                            <option value="added">Added to DB</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody></table>
                ) : <div style={S.empty}>No recommendations yet.</div>}
              </div>
            </div>
          )}
`

  admin = admin.replace(
    "          {/* ── CONTRIBUTIONS ── */}",
    recsContent + "\n          {/* ── CONTRIBUTIONS ── */}"
  )

  fs.writeFileSync('app/admin/dashboard/page.tsx', admin, 'utf8')
  console.log('✅ Admin dashboard: Temple Recs tab added')
} else {
  console.log('⏭️  Admin already has Temple Recs tab')
}

console.log('\n✅ All done! Now push:')
console.log('git add .')
console.log('git commit -m "feat: recommend a temple system"')
console.log('git push origin main')
