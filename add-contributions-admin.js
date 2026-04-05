// add-contributions-admin.js
const fs = require('fs')

let admin = fs.readFileSync('app/admin/dashboard/page.tsx', 'utf8')

// Add Contributions tab to TABS array
admin = admin.replace(
  "{ id:'group_yatra',  icon: Route,        label:'Group Yatra'     },",
  "{ id:'group_yatra',  icon: Route,        label:'Group Yatra'     },\n  { id:'contributions', icon: Heart,        label:'Contributions'   },"
)

// Add Heart to imports
admin = admin.replace(
  'FileText, Share2, UserCheck, Bell',
  'FileText, Share2, UserCheck, Bell, Heart'
)

// Add Contributions tab content before GROUP YATRA section
const contribTab = `
          {/* ── CONTRIBUTIONS ── */}
          {tab==='contributions' && (
            <div>
              {/* Summary cards */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { label:'Total Expressions', value: data?.contributions?.length || 0, color: C.crimson },
                  { label:'Total Amount', value: 'Rs.' + (data?.contributions?.reduce((s:number,c:any) => s+(c.amount||0), 0)||0).toLocaleString('en-IN'), color: C.saffron },
                  { label:'New (uncontacted)', value: data?.contributions?.filter((c:any) => c.status==='new').length || 0, color: C.amber },
                  { label:'Confirmed', value: data?.contributions?.filter((c:any) => c.status==='confirmed').length || 0, color: C.green },
                ].map(stat => (
                  <div key={stat.label} style={{ background:C.surface, border:\`1.5px solid \${C.border}\`, borderRadius:12, padding:'18px 20px' }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.1em', color:C.muted2, marginBottom:8 }}>{stat.label}</div>
                    <div style={{ fontSize:26, fontWeight:700, color:stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:14 }}>Contribution Interests ({data?.contributions?.length||0})</span>
                  <span style={{ fontSize:12, color:C.muted2 }}>Sorted by latest first</span>
                </div>
                {data?.contributions?.length ? (
                  <table><thead><tr>
                    <th style={S.th}>Name</th>
                    <th style={S.th}>Email</th>
                    <th style={S.th}>Phone</th>
                    <th style={S.th}>City</th>
                    <th style={S.th}>Amount</th>
                    <th style={S.th}>Interest</th>
                    <th style={S.th}>Member</th>
                    <th style={S.th}>Status</th>
                    <th style={S.th}>Received</th>
                    <th style={S.th}>Action</th>
                  </tr></thead><tbody>
                    {data.contributions.map((c:any) => (
                      <tr key={c._id}>
                        <td style={{ ...S.td, fontWeight:600 }}>{c.name}</td>
                        <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{c.email}</td>
                        <td style={{ ...S.td, color:C.muted2, fontSize:12 }}>{c.phone||'—'}</td>
                        <td style={S.td}>{c.city||'—'}</td>
                        <td style={{ ...S.td, fontWeight:700, color:C.saffron }}>Rs.{(c.amount||0).toLocaleString('en-IN')}</td>
                        <td style={{ ...S.td, fontSize:12, maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{c.interest||'—'}</td>
                        <td style={S.td}><span style={S.badge(c.is_member?C.green:C.amber, c.is_member?C.greenBg:C.amberBg)}>{c.is_member?'Member':'Visitor'}</span></td>
                        <td style={S.td}>
                          <span style={S.badge(
                            c.status==='new'?C.blue:c.status==='contacted'?C.amber:c.status==='confirmed'?C.green:C.red,
                            c.status==='new'?C.blueBg:c.status==='contacted'?C.amberBg:c.status==='confirmed'?C.greenBg:C.redBg
                          )}>{c.status}</span>
                        </td>
                        <td style={{ ...S.td, color:C.muted2, fontSize:12 }}>{ago(c.createdAt)}</td>
                        <td style={S.td}>
                          <select defaultValue={c.status}
                            onChange={async e => {
                              await fetch('/api/contribution', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id:c._id, status:e.target.value})})
                              load()
                            }}
                            style={{ fontSize:12, padding:'4px 8px' }}>
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="declined">Declined</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody></table>
                ) : <div style={S.empty}>No contribution interests yet. Share the platform to attract partners!</div>}
              </div>
            </div>
          )}
`

// Insert before GROUP YATRA tab content
admin = admin.replace(
  "          {/* ── GROUP YATRA ── */}",
  contribTab + "\n          {/* ── GROUP YATRA ── */}"
)

fs.writeFileSync('app/admin/dashboard/page.tsx', admin, 'utf8')
console.log('✅ Admin dashboard: Contributions tab added')
console.log('   Has contributions tab:', admin.includes("id:'contributions'"))
console.log('   Has contributions content:', admin.includes('Contribution Interests'))

// Also patch stats API to serve contributions
const statsPath = 'app/api/admin/stats/route.ts'
if (fs.existsSync(statsPath)) {
  let stats = fs.readFileSync(statsPath, 'utf8')
  if (!stats.includes('contributions')) {
    const insertCode = `
  if (type === 'contributions') {
    try {
      const { Contribution } = await import('@/models/Contribution')
      const contributions = await Contribution.find().sort({ createdAt: -1 }).limit(500).lean()
      return NextResponse.json({ contributions })
    } catch(e) { return NextResponse.json({ contributions: [] }) }
  }
`
    const insertPoint = stats.lastIndexOf('\n  return NextResponse.json(')
    if (insertPoint > -1) {
      stats = stats.slice(0, insertPoint) + insertCode + stats.slice(insertPoint)
      fs.writeFileSync(statsPath, stats, 'utf8')
      console.log('✅ Stats API: contributions type added')
    }
  }
}

console.log('\n🎉 All done! Now push:')
console.log('git add .')
console.log('git commit -m "feat: crowdfunding contribution system with admin tab"')
console.log('git push origin main')
