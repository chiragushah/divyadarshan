// build-verification.js
const fs = require('fs')

// ── 1. Upgrade MarkVisited with post-visit verification flow ──────────────────
fs.writeFileSync('components/temple/MarkVisited.tsx', `'use client'
import { useState, useEffect } from 'react'
import { CheckCircle, Loader2, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'

const VERIFY_QUESTIONS = [
  { key: 'timing_accurate',    label: 'Were the opening hours accurate?' },
  { key: 'facilities_accurate',label: 'Were the facilities (toilets, parking) as described?' },
  { key: 'wheelchair_accurate',label: 'Was the wheelchair access info correct?' },
  { key: 'directions_accurate',label: 'Were the directions/how-to-reach helpful?' },
]

export default function MarkVisited({ templeSlug, templeName }: { templeSlug: string; templeName: string }) {
  const { data: session } = useSession()
  const [visited, setVisited]       = useState(false)
  const [loading, setLoading]       = useState(false)
  const [showVerify, setShowVerify] = useState(false)
  const [answers, setAnswers]       = useState<Record<string,boolean|null>>({})
  const [verifyDone, setVerifyDone] = useState(false)
  const [rating, setRating]         = useState(0)

  useEffect(() => {
    if (!session?.user) return
    fetch('/api/visits?slug=' + templeSlug)
      .then(r => r.json())
      .then(d => setVisited((d.visits || []).length > 0))
  }, [session, templeSlug])

  const toggle = async () => {
    if (!session?.user || loading) return
    setLoading(true)
    await fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temple_slug: templeSlug, temple_name: templeName, visit_date: new Date().toISOString().split('T')[0] }),
    })
    setVisited(v => !v)
    setLoading(false)
    if (!visited) setShowVerify(true) // Show verification after first mark
  }

  const submitVerification = async () => {
    await fetch('/api/verify-temple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ temple_slug: templeSlug, temple_name: templeName, answers, rating }),
    })
    setVerifyDone(true)
    setTimeout(() => setShowVerify(false), 2000)
  }

  if (!session?.user) return null

  return (
    <>
      <button onClick={toggle} disabled={loading}
        className={"flex items-center gap-1.5 text-xs transition-all px-3 py-1.5 rounded-full border " + (
          visited ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-200 text-gray-500 hover:border-green-300'
        )}>
        {loading ? <Loader2 size={12} className="animate-spin" /> : <CheckCircle size={12} />}
        {visited ? 'Visited ✓' : 'Mark as Visited'}
      </button>

      {showVerify && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
          <div style={{ background:'white', borderRadius:20, padding:28, maxWidth:440, width:'100%', boxShadow:'0 24px 80px rgba(0,0,0,0.2)' }}>
            {verifyDone ? (
              <div style={{ textAlign:'center', padding:'20px 0' }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🙏</div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:'#8B1A1A', marginBottom:8 }}>Thank You!</h3>
                <p style={{ color:'#6B5B4E', fontSize:13 }}>Your verification helps all pilgrims get accurate information. You earned 5 karma points!</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign:'center', marginBottom:20 }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>🛕</div>
                  <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:18, color:'#8B1A1A', marginBottom:4 }}>You visited {templeName}!</h3>
                  <p style={{ color:'#6B5B4E', fontSize:13 }}>Help other pilgrims — were the details accurate? Takes 30 seconds.</p>
                </div>

                {/* Star rating */}
                <div style={{ marginBottom:16, textAlign:'center' }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#A89B8C', marginBottom:8, textTransform:'uppercase', letterSpacing:'.06em' }}>Overall Experience</div>
                  <div style={{ display:'flex', justifyContent:'center', gap:8 }}>
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => setRating(s)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:28, opacity: s <= rating ? 1 : 0.3, transition:'all 0.15s' }}>★</button>
                    ))}
                  </div>
                </div>

                {/* Accuracy questions */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:'#A89B8C', marginBottom:10, textTransform:'uppercase', letterSpacing:'.06em' }}>Was the information accurate?</div>
                  {VERIFY_QUESTIONS.map(q => (
                    <div key={q.key} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #F0EAE4' }}>
                      <span style={{ fontSize:13, color:'#4A3728' }}>{q.label}</span>
                      <div style={{ display:'flex', gap:8 }}>
                        <button onClick={() => setAnswers(a => ({...a,[q.key]:true}))} style={{ padding:'5px 14px', borderRadius:100, border:'1.5px solid', borderColor:answers[q.key]===true?'#166534':'#E8E0D4', background:answers[q.key]===true?'#DCFCE7':'white', color:answers[q.key]===true?'#166534':'#6B5B4E', fontSize:12, fontWeight:600, cursor:'pointer' }}>Yes</button>
                        <button onClick={() => setAnswers(a => ({...a,[q.key]:false}))} style={{ padding:'5px 14px', borderRadius:100, border:'1.5px solid', borderColor:answers[q.key]===false?'#991B1B':'#E8E0D4', background:answers[q.key]===false?'#FEE2E2':'white', color:answers[q.key]===false?'#991B1B':'#6B5B4E', fontSize:12, fontWeight:600, cursor:'pointer' }}>No</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={() => setShowVerify(false)} style={{ flex:1, padding:'10px 0', borderRadius:10, border:'1.5px solid #E8E0D4', background:'white', color:'#6B5B4E', fontWeight:600, fontSize:13, cursor:'pointer' }}>Skip</button>
                  <button onClick={submitVerification} style={{ flex:2, padding:'10px 0', borderRadius:10, border:'none', background:'#8B1A1A', color:'white', fontWeight:700, fontSize:13, cursor:'pointer' }}>Submit Verification 🙏</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
`)
console.log('✅ MarkVisited: post-visit verification added')

// ── 2. Verify Temple API ──────────────────────────────────────────────────────
fs.mkdirSync('app/api/verify-temple', { recursive: true })
fs.writeFileSync('app/api/verify-temple/route.ts', `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

const VerificationSchema = new mongoose.Schema({
  temple_slug:  String,
  temple_name:  String,
  user_email:   String,
  answers:      Object,
  rating:       Number,
  createdAt:    { type: Date, default: Date.now },
})

const Verification = mongoose.models.Verification || mongoose.model('Verification', VerificationSchema)

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()
  await connectDB()

  await Verification.create({
    temple_slug: body.temple_slug,
    temple_name: body.temple_name,
    user_email:  session?.user?.email || 'anonymous',
    answers:     body.answers,
    rating:      body.rating,
  })

  // If any answer is false, auto-create a report
  const falseAnswers = Object.entries(body.answers || {})
    .filter(([, v]) => v === false)
    .map(([k]) => k.replace('_accurate',''))

  if (falseAnswers.length > 0) {
    const ReportSchema = new mongoose.Schema({ temple_slug: String, temple_name: String, field: String, issue: String, correct_info: String, status: { type: String, default: 'new' }, source: String }, { timestamps: true })
    const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema)
    for (const field of falseAnswers) {
      await Report.create({
        temple_slug: body.temple_slug,
        temple_name: body.temple_name,
        field,
        issue: 'Reported as inaccurate by a pilgrim who visited this temple',
        source: 'post_visit_verification',
      })
    }
  }

  return NextResponse.json({ success: true })
}

export async function GET() {
  await connectDB()
  const VerificationModel = mongoose.models.Verification || mongoose.model('Verification', VerificationSchema)
  const verifications = await VerificationModel.find().sort({ createdAt: -1 }).limit(200).lean()
  return NextResponse.json({ verifications })
}
`)
console.log('✅ app/api/verify-temple/route.ts')

// ── 3. Upgrade Report API to store to MongoDB ─────────────────────────────────
fs.writeFileSync('app/api/report/route.ts', `import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import mongoose from 'mongoose'

export const dynamic = 'force-dynamic'

const ReportSchema = new mongoose.Schema({
  temple_slug:  { type: String, required: true },
  temple_name:  { type: String, default: '' },
  field:        { type: String, required: true },
  issue:        { type: String, required: true },
  correct_info: { type: String, default: '' },
  user_email:   { type: String, default: 'anonymous' },
  status:       { type: String, enum: ['new','reviewed','fixed','dismissed'], default: 'new' },
  source:       { type: String, default: 'report_button' },
}, { timestamps: true })

const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema)

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const body = await req.json()
  await connectDB()
  await Report.create({
    ...body,
    user_email: session?.user?.email || 'anonymous',
  })
  return NextResponse.json({ success: true })
}

export async function GET() {
  await connectDB()
  const reports = await Report.find().sort({ createdAt: -1 }).limit(200).lean()
  return NextResponse.json({ reports })
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json()
  await connectDB()
  await Report.updateOne({ _id: id }, { status })
  return NextResponse.json({ success: true })
}
`)
console.log('✅ app/api/report/route.ts: upgraded with MongoDB storage')

// ── 4. Add DataConfidenceBadge component ─────────────────────────────────────
fs.writeFileSync('components/temple/DataConfidenceBadge.tsx', `'use client'

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
`)
console.log('✅ components/temple/DataConfidenceBadge.tsx')

// ── 5. Add Reports & Verifications tab to admin ───────────────────────────────
let admin = fs.readFileSync('app/admin/dashboard/page.tsx', 'utf8')

if (!admin.includes("id:'reports'")) {
  // Add tab
  admin = admin.replace(
    "{ id:'recommendations',icon: MapPin,       label:'Temple Recs'     },",
    "{ id:'recommendations',icon: MapPin,       label:'Temple Recs'     },\n  { id:'reports',        icon: AlertTriangle, label:'Reports'         },"
  )

  // Add AlertTriangle import
  admin = admin.replace(
    'FileText, Share2, UserCheck, Bell, Heart',
    'FileText, Share2, UserCheck, Bell, Heart, AlertTriangle'
  )

  // Add reports tab content
  const reportsContent = `
          {tab==='reports' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { label:'Total Reports', value: data?.reports?.length||0, color:C.crimson },
                  { label:'New', value: data?.reports?.filter((r:any)=>r.status==='new').length||0, color:C.amber },
                  { label:'Fixed', value: data?.reports?.filter((r:any)=>r.status==='fixed').length||0, color:C.green },
                  { label:'Verifications', value: data?.verifications?.length||0, color:C.blue },
                ].map((stat:any) => (
                  <div key={stat.label} style={{ background:C.surface, border:\`1.5px solid \${C.border}\`, borderRadius:12, padding:'18px 20px' }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' as const, letterSpacing:'.1em', color:C.muted2, marginBottom:8 }}>{stat.label}</div>
                    <div style={{ fontSize:26, fontWeight:700, color:stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:14 }}>Incorrect Data Reports ({data?.reports?.length||0})</span>
                  <span style={{ fontSize:12, color:C.muted2 }}>From Report buttons + post-visit verification</span>
                </div>
                {data?.reports?.length ? (
                  <table><thead><tr>
                    <th style={S.th}>Temple</th><th style={S.th}>Field</th><th style={S.th}>Issue</th><th style={S.th}>Correct Info</th><th style={S.th}>Source</th><th style={S.th}>Status</th><th style={S.th}>Date</th><th style={S.th}>Action</th>
                  </tr></thead><tbody>
                    {data.reports.map((r:any) => (
                      <tr key={r._id}>
                        <td style={{ ...S.td, fontWeight:600 }}>{r.temple_name}</td>
                        <td style={S.td}><span style={S.badge(C.blue,C.blueBg)}>{r.field}</span></td>
                        <td style={{ ...S.td, maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:12 }}>{r.issue}</td>
                        <td style={{ ...S.td, maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontSize:12, color:C.green }}>{r.correct_info||'—'}</td>
                        <td style={S.td}><span style={S.badge(r.source==='post_visit_verification'?C.saffron:C.muted2, r.source==='post_visit_verification'?C.amberBg:C.surface2)}>{r.source==='post_visit_verification'?'Post-visit':'Manual'}</span></td>
                        <td style={S.td}><span style={S.badge(r.status==='new'?C.amber:r.status==='fixed'?C.green:C.muted2, r.status==='new'?C.amberBg:r.status==='fixed'?C.greenBg:C.surface2)}>{r.status}</span></td>
                        <td style={{ ...S.td, color:C.muted2 }}>{ago(r.createdAt)}</td>
                        <td style={S.td}>
                          <select defaultValue={r.status} onChange={async (e:any) => {
                            await fetch('/api/report',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:r._id,status:e.target.value})})
                            load()
                          }} style={{ fontSize:12, padding:'4px 8px' }}>
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="fixed">Fixed</option>
                            <option value="dismissed">Dismissed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody></table>
                ) : <div style={S.empty}>No reports yet. Reports appear when pilgrims click "Report incorrect information" or flag inaccuracies after visiting.</div>}
              </div>

              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:14 }}>Post-Visit Verifications ({data?.verifications?.length||0})</span>
                  <span style={{ fontSize:12, color:C.muted2 }}>Accuracy feedback from pilgrims who visited</span>
                </div>
                {data?.verifications?.length ? (
                  <table><thead><tr>
                    <th style={S.th}>Temple</th><th style={S.th}>User</th><th style={S.th}>Rating</th><th style={S.th}>Timing OK</th><th style={S.th}>Facilities OK</th><th style={S.th}>Wheelchair OK</th><th style={S.th}>Directions OK</th><th style={S.th}>Date</th>
                  </tr></thead><tbody>
                    {data.verifications.map((v:any) => (
                      <tr key={v._id}>
                        <td style={{ ...S.td, fontWeight:600 }}>{v.temple_name}</td>
                        <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{v.user_email}</td>
                        <td style={S.td}>{'★'.repeat(v.rating||0)}</td>
                        {['timing','facilities','wheelchair','directions'].map(k => (
                          <td key={k} style={S.td}>
                            {v.answers?.[k+'_accurate'] === true ? <span style={{ color:C.green }}>✓ Yes</span> :
                             v.answers?.[k+'_accurate'] === false ? <span style={{ color:C.red }}>✗ No</span> : '—'}
                          </td>
                        ))}
                        <td style={{ ...S.td, color:C.muted2 }}>{ago(v.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody></table>
                ) : <div style={S.empty}>No verifications yet. They appear when pilgrims complete the post-visit accuracy check.</div>}
              </div>
            </div>
          )}
`

  admin = admin.replace(
    "          {/* ── CONTRIBUTIONS ── */}",
    reportsContent + "\n          {/* ── CONTRIBUTIONS ── */}"
  )

  fs.writeFileSync('app/admin/dashboard/page.tsx', admin, 'utf8')
  console.log('✅ Admin: Reports tab added')
}

// ── 6. Patch admin stats API for reports ─────────────────────────────────────
const statsPath = 'app/api/admin/stats/route.ts'
if (fs.existsSync(statsPath)) {
  let stats = fs.readFileSync(statsPath, 'utf8')
  if (!stats.includes("type === 'reports'")) {
    const code = `
  if (type === 'reports') {
    try {
      const mongoose = (await import('mongoose')).default
      const ReportSchema = new mongoose.Schema({ temple_slug:String, temple_name:String, field:String, issue:String, correct_info:String, user_email:String, status:{type:String,default:'new'}, source:String }, { timestamps:true, strict:false })
      const Report = mongoose.models.Report || mongoose.model('Report', ReportSchema)
      const VerificationSchema = new mongoose.Schema({ temple_slug:String, temple_name:String, user_email:String, answers:Object, rating:Number, createdAt:Date }, { strict:false })
      const Verification = mongoose.models.Verification || mongoose.model('Verification', VerificationSchema)
      const [reports, verifications] = await Promise.all([
        Report.find().sort({ createdAt: -1 }).limit(200).lean(),
        Verification.find().sort({ createdAt: -1 }).limit(100).lean(),
      ])
      return NextResponse.json({ reports, verifications })
    } catch(e) { return NextResponse.json({ reports: [], verifications: [] }) }
  }
`
    const idx = stats.lastIndexOf('\n  return NextResponse.json(')
    if (idx > -1) {
      stats = stats.slice(0, idx) + code + stats.slice(idx)
      fs.writeFileSync(statsPath, stats, 'utf8')
      console.log('✅ Stats API: reports type added')
    }
  }
}

// ── 7. Add DataConfidenceBadge to temple page ─────────────────────────────────
let templePage = fs.readFileSync('app/(public)/temple/[slug]/page.tsx', 'utf8')
if (!templePage.includes('DataConfidenceBadge')) {
  templePage = templePage.replace(
    "import TempleStatusBadge from '@/components/temple/TempleStatusBadge'",
    "import TempleStatusBadge from '@/components/temple/TempleStatusBadge'\nimport DataConfidenceBadge from '@/components/temple/DataConfidenceBadge'"
  )
  // Add badge near MarkVisited
  templePage = templePage.replace(
    '<MarkVisited templeSlug={t.slug} templeName={t.name} />',
    '<MarkVisited templeSlug={t.slug} templeName={t.name} />\n              <DataConfidenceBadge />'
  )
  fs.writeFileSync('app/(public)/temple/[slug]/page.tsx', templePage, 'utf8')
  console.log('✅ Temple page: DataConfidenceBadge added')
}

console.log('\nAll done! Now run:')
console.log('git add .')
console.log('git commit -m "feat: data verification system - post-visit flow, reports, AI badge, admin tab"')
console.log('git push origin main')
