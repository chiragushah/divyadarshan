'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Loader2, Users, Search, Cpu, Eye, LogOut,
  TrendingUp, Clock, Star, MapPin, AlertTriangle,
  Download, Megaphone, Plus, Pencil, Trash2, X, Check,
  BarChart2, IndianRupee, RefreshCw, ChevronRight, Route, Zap, Send,
  FileText, Share2, UserCheck, Bell, Heart}
from 'lucide-react'

const fmt  = (n: number) => (n || 0).toLocaleString('en-IN')
const fmtT = (s: number) => s < 60 ? `${s}s` : `${Math.floor(s/60)}m ${s%60}s`
const ago  = (d: string) => {
  const ms = Date.now() - new Date(d).getTime()
  if (ms < 60000) return 'just now'
  if (ms < 3600000) return `${Math.floor(ms/60000)}m ago`
  if (ms < 86400000) return `${Math.floor(ms/3600000)}h ago`
  return `${Math.floor(ms/86400000)}d ago`
}
const dateStr = (d: string) => new Date(d).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })

const TABS = [
  { id:'overview',     icon: TrendingUp,   label:'Overview'        },
  { id:'users',        icon: Users,        label:'Users'           },
  { id:'temples',      icon: MapPin,       label:'Temples'         },
  { id:'plan_requests',icon: FileText,     label:'Plan My Trip'    },
  { id:'shared_plans', icon: Share2,       label:'Shared Plans'    },
  { id:'admin_reqs',   icon: UserCheck,    label:'Organiser Reqs'  },
  { id:'reviews',      icon: Star,         label:'Reviews'         },
  { id:'searches',     icon: Search,       label:'Searches'        },
  { id:'ai',           icon: Cpu,          label:'AI Usage'        },
  { id:'pageviews',    icon: Eye,          label:'Page Views'      },
  { id:'finverse',     icon: IndianRupee,  label:'FinVerse'        },
  { id:'announcement', icon: Megaphone,    label:'Announcement'    },
  { id:'group_yatra',  icon: Route,        label:'Group Yatra'     },
  { id:'contributions', icon: Heart,        label:'Contributions'   },
  { id:'recommendations',icon: MapPin,       label:'Temple Recs'     },
  { id:'reports',        icon: AlertTriangle, label:'Reports'         },
]

// ── Brand colors ──────────────────────────────────────────────────────────────
const C = {
  crimson:   '#8B1A1A',
  saffron:   '#C0570A',
  gold:      '#D4A017',
  ink:       '#1A0A00',
  muted:     '#6B5B4E',
  muted2:    '#A89B8C',
  border:    '#E8E0D4',
  border2:   '#D4C5B0',
  bg:        '#FDFAF6',
  surface:   '#FFFFFF',
  surface2:  '#F8F4EE',
  surface3:  '#F2ECE4',
  green:     '#166534',
  greenBg:   '#DCFCE7',
  red:       '#991B1B',
  redBg:     '#FEE2E2',
  blue:      '#1E40AF',
  blueBg:    '#DBEAFE',
  amber:     '#92400E',
  amberBg:   '#FEF3C7',
}

const S: Record<string,any> = {
  shell:   { display:'grid', gridTemplateColumns:'240px 1fr', minHeight:'100vh', background:C.bg, color:C.ink, fontFamily:"'Inter','Outfit',sans-serif" },
  sidebar: { background:C.surface, borderRight:`1px solid ${C.border}`, padding:'20px 12px', display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', boxShadow:'2px 0 8px rgba(0,0,0,0.04)' },
  main:    { padding:28, overflowY:'auto' },
  section: { background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, overflow:'hidden', marginBottom:20 },
  secHead: { padding:'14px 20px', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', justifyContent:'space-between', background:C.surface2 },
  th:      { padding:'10px 16px', textAlign:'left', fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.08em', color:C.muted2, background:C.surface2, borderBottom:`1px solid ${C.border}` },
  td:      { padding:'12px 16px', fontSize:13, color:C.ink, borderBottom:`1px solid ${C.surface3}` },
  input:   { width:'100%', padding:'9px 12px', background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:8, fontFamily:"inherit", fontSize:13, color:C.ink, outline:'none', marginBottom:10 },
  label:   { fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'.06em', color:C.muted, marginBottom:4, display:'block' },
  btn:     (bg:string, color='white') => ({ padding:'8px 16px', background:bg, color, border:`1px solid ${bg === C.surface ? C.border : 'transparent'}`, borderRadius:8, fontFamily:'inherit', fontSize:13, fontWeight:600, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6, transition:'all 0.15s' }),
  empty:   { padding:'48px 20px', textAlign:'center', color:C.muted2, fontSize:13 },
  topbar:  { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 },
  badge:   (color:string, bg:string) => ({ padding:'3px 10px', borderRadius:100, fontSize:11, fontWeight:700, background:bg, color }),
}

function Stat({ label, value, sub, icon:Icon, color, accent }: any) {
  return (
    <div style={{ background: accent ? `${color}08` : C.surface, border:`1.5px solid ${accent ? color+'40' : C.border}`, borderRadius:12, padding:'18px 20px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
        <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.12em', color:C.muted2 }}>{label}</span>
        <div style={{ width:32, height:32, borderRadius:8, background:`${color}15`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon size={15} color={color} />
        </div>
      </div>
      <div style={{ fontSize:28, fontWeight:700, lineHeight:1, color:C.ink }}>{value}</div>
      {sub && <div style={{ fontSize:11, color: accent ? C.green : C.muted2, marginTop:4 }}>{sub}</div>}
    </div>
  )
}

function Modal({ title, onClose, children }: any) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.4)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:16, width:'100%', maxWidth:700, maxHeight:'90vh', overflow:'hidden', display:'flex', flexDirection:'column', boxShadow:'0 20px 60px rgba(0,0,0,0.15)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:`1px solid ${C.border}`, background:C.surface2 }}>
          <span style={{ fontWeight:700, fontSize:15, color:C.ink }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:C.muted2, cursor:'pointer' }}><X size={18}/></button>
        </div>
        <div style={{ overflow:'auto', flex:1 }}>{children}</div>
      </div>
    </div>
  )
}

interface GYMember { name:string; city:string; persons:number; is_assigned:boolean; travel_plan?:string; estimated_cost?:number; generating?:boolean }
interface GYPlan { _id?:string; title:string; temple_name:string; destination:string; travel_dates:string; description:string; mode:'open'|'assigned'; members:GYMember[]; total_persons:number; combined_itinerary?:string; status:'draft'|'published'|'completed' }

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab]       = useState('overview')
  const [days, setDays]     = useState(30)
  const [data, setData]     = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [modal, setModal]   = useState<string|null>(null)
  const [selected, setSelected] = useState<any>(null)
  const [tForm, setTForm]   = useState<any>({ name:'', state:'', city:'', deity:'', type:'', description:'', timing:'', best_time:'', dress_code:'', festivals:'', has_live:false, live_url:'', lat:'', lng:'' })
  const [annForm, setAnnForm] = useState({ message:'', type:'info' })

  // Group Yatra state
  const [gyPlans, setGyPlans]       = useState<GYPlan[]>([])
  const [gyLoading, setGyLoading]   = useState(false)
  const [gyView, setGyView]         = useState<'list'|'create'|'detail'>('list')
  const [gySelected, setGySelected] = useState<GYPlan|null>(null)
  const [gySaving, setGySaving]     = useState(false)
  const [gyPublishing, setGyPublishing] = useState(false)
  const [gyGenerating, setGyGenerating] = useState(false)
  const [gyForm, setGyForm] = useState({ title:'', temple_name:'', destination:'', travel_dates:'', description:'', mode:'open' as 'open'|'assigned' })
  const [gyMembers, setGyMembers]   = useState<GYMember[]>([{ name:'', city:'', persons:1, is_assigned:false }])

  const load = useCallback(async (t=tab, d=days) => {
    if (t === 'group_yatra') { loadGyPlans(); return }
    setLoading(true)
    const res = await fetch(`/api/admin/stats?type=${t}&days=${d}`)
    if (res.status === 401) { router.push('/admin'); return }
    setData(await res.json())
    setLoading(false)
  }, [tab, days, router])

  useEffect(() => { load(tab, days) }, [tab, days])
  useEffect(() => { if (tab === 'group_yatra') loadGyPlans() }, [tab])

  async function loadGyPlans() {
    setGyLoading(true)
    const res = await fetch('/api/group-yatra')
    const d = await res.json()
    setGyPlans(d.plans || [])
    setGyLoading(false)
  }

  async function generateMemberPlan(i: number) {
    const member = gyMembers[i]
    if (!member.city || !gyForm.destination) return
    setGyMembers(m => m.map((mem,idx) => idx===i ? {...mem,generating:true} : mem))
    const res = await fetch('/api/group-yatra', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ action:'generate_plan', memberCity:member.city, memberName:member.name||member.city+' Group', persons:member.persons, destination:gyForm.destination, travelDates:gyForm.travel_dates, templeInfo:gyForm.temple_name }) })
    const d = await res.json()
    setGyMembers(m => m.map((mem,idx) => idx===i ? {...mem,travel_plan:d.plan,estimated_cost:d.estimated_cost,generating:false} : mem))
  }

  async function saveGyPlan() {
    setGySaving(true)
    const totalPersons = gyMembers.reduce((s,m) => s+m.persons, 0)
    const res = await fetch('/api/group-yatra', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ ...gyForm, members:gyMembers.map(m => ({...m,is_assigned:gyForm.mode==='assigned'})), total_persons:totalPersons }) })
    const d = await res.json()
    setGyPlans(prev => [d.plan,...prev])
    setGySelected(d.plan); setGyView('detail'); setGySaving(false)
  }

  async function publishGyPlan(planId: string) {
    setGyPublishing(true)
    await fetch('/api/group-yatra', { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'publish',planId}) })
    setGyPlans(prev => prev.map((p:any) => p._id===planId ? {...p,status:'published'} : p))
    if (gySelected?._id===planId) setGySelected({...gySelected,status:'published'} as any)
    setGyPublishing(false)
  }

  async function deleteGyPlan(planId: string) {
    if (!confirm('Delete this plan?')) return
    await fetch('/api/group-yatra?id='+planId, { method:'DELETE' })
    setGyPlans(prev => prev.filter((p:any) => p._id!==planId)); setGyView('list')
  }

  async function generateCombined() {
    if (!gySelected) return
    setGyGenerating(true)
    const res = await fetch('/api/group-yatra', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ action:'generate_combined', members:gySelected.members, destination:gySelected.destination, travelDates:gySelected.travel_dates, templeInfo:gySelected.temple_name }) })
    const d = await res.json()
    setGySelected({...gySelected,combined_itinerary:d.itinerary}); setGyGenerating(false)
  }

  const logout = async () => { await fetch('/api/admin/auth',{method:'DELETE'}); router.push('/admin') }
  const deleteReview = async (id:string) => { if(!confirm('Delete?')) return; await fetch('/api/admin/reviews',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}); load() }
  const deleteTemple = async (id:string,name:string) => { if(!confirm(`Delete "${name}"?`)) return; await fetch('/api/admin/temples',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}); load() }
  const saveTemple = async () => { await fetch('/api/admin/temples',{method:selected?._id?'PATCH':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(selected?._id?{id:selected._id,...tForm}:tForm)}); setModal(null); load() }
  const saveAnn = async () => { if(!annForm.message.trim()) return; await fetch('/api/admin/announcement',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(annForm)}); alert('Banner published!') }
  const clearAnn = async () => { await fetch('/api/admin/announcement',{method:'DELETE'}); alert('Banner cleared.') }
  const openUserDetail = async (email:string) => { const res=await fetch(`/api/admin/stats?type=user_detail&email=${encodeURIComponent(email)}`); setSelected({...(await res.json()),email}); setModal('user_detail') }
  const openEditTemple = (t:any) => { setSelected(t); setTForm({name:t.name||'',state:t.state||'',city:t.city||'',deity:t.deity||'',type:t.type||'',description:t.description||'',timing:t.timing||'',best_time:t.best_time||'',dress_code:t.dress_code||'',festivals:t.festivals||'',has_live:!!t.has_live,live_url:t.live_url||'',lat:String(t.lat||''),lng:String(t.lng||'')}); setModal('temple_form') }
  const openAddTemple = () => { setSelected(null); setTForm({name:'',state:'',city:'',deity:'',type:'',description:'',timing:'',best_time:'',dress_code:'',festivals:'',has_live:false,live_url:'',lat:'',lng:''}); setModal('temple_form') }

  const approveAdminReq = async (id:string) => { await fetch('/api/admin-request',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status:'approved'})}); load() }
  const rejectAdminReq  = async (id:string) => { await fetch('/api/admin-request',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status:'rejected'})}); load() }

  const o = data?.overview || {}
  const gyTotalPersons = gyMembers.reduce((s,m) => s+m.persons, 0)
  const gyTotalCost    = gyMembers.reduce((s,m) => s+(m.estimated_cost||0), 0)

  const currentTab = TABS.find(t => t.id===tab)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:${C.bg};color:${C.ink};font-family:'Inter',sans-serif;}
        table{width:100%;border-collapse:collapse;}
        tr:last-child td{border-bottom:none!important;}
        tr:hover td{background:${C.surface2};}
        select{background:${C.surface};border:1.5px solid ${C.border};border-radius:8px;padding:8px 12px;font-family:inherit;font-size:13px;color:${C.ink};outline:none;cursor:pointer;}
        textarea{width:100%;padding:9px 12px;background:${C.surface};border:1.5px solid ${C.border};border-radius:8px;font-family:inherit;font-size:13px;color:${C.ink};outline:none;resize:vertical;margin-bottom:10px;}
        input[type=checkbox]{accent-color:${C.crimson};width:15px;height:15px;cursor:pointer;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${C.surface2};}
        ::-webkit-scrollbar-thumb{background:${C.border2};border-radius:3px;}
        @keyframes spin{to{transform:rotate(360deg)}}
        .nav-btn:hover{background:${C.surface3}!important;}
      `}</style>

      <div style={S.shell}>
        {/* ── SIDEBAR ── */}
        <div style={S.sidebar}>
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24, paddingBottom:20, borderBottom:`1px solid ${C.border}` }}>
            <img src="/divyadarshanam-logo.svg" alt="DivyaDarshanam" style={{ height:44, width:'auto', objectFit:'contain' }} />
          </div>
          <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:'.12em', color:C.muted2, padding:'0 8px 10px' }}>Admin Portal</div>

          <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:2, overflowY:'auto' }}>
            {TABS.map(n => (
              <button key={n.id} className="nav-btn" onClick={() => setTab(n.id)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:8,
                fontSize:13, fontWeight:500, cursor:'pointer', transition:'all .15s',
                color: tab===n.id ? C.crimson : C.muted,
                background: tab===n.id ? '#FFF0F0' : 'transparent',
                border: tab===n.id ? `1px solid ${C.crimson}30` : '1px solid transparent',
                width:'100%', textAlign:'left',
              }}>
                <n.icon size={14} color={tab===n.id ? C.crimson : C.muted2} />
                {n.label}
                {n.id==='group_yatra' && <span style={{ marginLeft:'auto', fontSize:9, padding:'2px 6px', borderRadius:4, background:C.saffron, color:'white' }}>NEW</span>}
                {n.id==='plan_requests' && <span style={{ marginLeft:'auto', fontSize:9, padding:'2px 6px', borderRadius:4, background:C.redBg, color:C.red }}>!</span>}
              </button>
            ))}
          </nav>

          <div style={{ paddingTop:16, borderTop:`1px solid ${C.border}` }}>
            <button onClick={logout} style={{ ...S.btn(C.surface2, C.muted), width:'100%', justifyContent:'center' }}>
              <LogOut size={13}/> Sign Out
            </button>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div style={S.main}>
          {/* Top bar */}
          <div style={S.topbar}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:700, fontFamily:"'Playfair Display',serif", color:C.ink }}>{currentTab?.label}</h1>
              <p style={{ fontSize:12, color:C.muted2, marginTop:2 }}>{new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              {tab!=='group_yatra' && tab!=='announcement' && (
                <select value={days} onChange={e => setDays(Number(e.target.value))}>
                  <option value={7}>Last 7 days</option>
                  <option value={30}>Last 30 days</option>
                  <option value={90}>Last 90 days</option>
                </select>
              )}
              {tab==='group_yatra' && (
                <button style={S.btn(C.crimson)} onClick={() => { setGyView('create'); setGyForm({title:'',temple_name:'',destination:'',travel_dates:'',description:'',mode:'open'}); setGyMembers([{name:'',city:'',persons:1,is_assigned:false}]) }}>
                  <Plus size={13}/> Create Group Plan
                </button>
              )}
              {tab!=='group_yatra' && (
                <button style={S.btn(C.surface, C.muted)} onClick={() => load(tab,days)}>
                  <RefreshCw size={13}/>
                </button>
              )}
            </div>
          </div>

          {loading && !data && tab!=='group_yatra' ? (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:300, gap:12, color:C.muted2 }}>
              <Loader2 size={20} style={{ animation:'spin 1s linear infinite' }}/> Loading…
            </div>
          ) : (<>

          {/* ── OVERVIEW ── */}
          {tab==='overview' && data && (<>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
              <Stat label="Total Users"     value={fmt(o.totalUsers)}     sub={`+${fmt(o.newUsers)} new (${days}d)`}   icon={Users}       color={C.blue}   accent />
              <Stat label="AI Requests"     value={fmt(o.totalAI)}        sub={`${fmt(o.failedAI)} failed`}            icon={Cpu}         color="#7C3AED"        />
              <Stat label="Searches"        value={fmt(o.totalSearches)}  sub={`last ${days} days`}                    icon={Search}      color={C.green}        />
              <Stat label="Page Views"      value={fmt(o.totalPageViews)} sub={`avg ${fmtT(o.avgSessionSec||0)}`}      icon={Eye}         color={C.amber}  accent />
              <Stat label="FinVerse Clicks" value={fmt(o.totalFinVerse)}  sub="conversion events"                       icon={IndianRupee} color={C.saffron}      />
              <Stat label="Est. AI Cost"    value={`Rs.${o.aiCostINR||0}`} sub={`last ${days} days`}                 icon={BarChart2}   color="#EC4899"        />
            </div>
            {data.recentUsers?.length > 0 && (
              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:14, color:C.ink }}>Recent Registrations</span>
                  <span style={{ fontSize:12, color:C.muted2 }}>{data.recentUsers.length} users</span>
                </div>
                <table><thead><tr>
                  <th style={S.th}>Name</th><th style={S.th}>Email</th><th style={S.th}>Method</th><th style={S.th}>Joined</th><th style={S.th}></th>
                </tr></thead><tbody>
                  {data.recentUsers.map((u:any) => (
                    <tr key={u._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{u.name||'—'}</td>
                      <td style={{ ...S.td, color:C.muted }}>{u.email}</td>
                      <td style={S.td}><span style={S.badge(C.blue, C.blueBg)}>{u.provider||'email'}</span></td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(u.createdAt)}</td>
                      <td style={S.td}><button onClick={() => openUserDetail(u.email)} style={{ background:'none', border:'none', color:C.muted2, cursor:'pointer' }}><ChevronRight size={15}/></button></td>
                    </tr>
                  ))}
                </tbody></table>
              </div>
            )}
          </>)}

          {/* ── USERS ── */}
          {tab==='users' && (
            <div style={S.section}>
              <div style={S.secHead}>
                <span style={{ fontWeight:700, fontSize:14 }}>All Users ({data?.users?.length||0})</span>
                <a href="/api/admin/export" style={{ ...S.btn(C.crimson), textDecoration:'none' }}><Download size={13}/> Export CSV</a>
              </div>
              {data?.users?.length ? (
                <table><thead><tr>
                  <th style={S.th}>#</th><th style={S.th}>Name</th><th style={S.th}>Email</th><th style={S.th}>Method</th><th style={S.th}>Registered</th><th style={S.th}></th>
                </tr></thead><tbody>
                  {data.users.map((u:any,i:number) => (
                    <tr key={u._id}>
                      <td style={{ ...S.td, color:C.muted2 }}>{i+1}</td>
                      <td style={{ ...S.td, fontWeight:600 }}>{u.name||'—'}</td>
                      <td style={{ ...S.td, color:C.muted }}>{u.email}</td>
                      <td style={S.td}><span style={S.badge(C.blue, C.blueBg)}>{u.provider||'email'}</span></td>
                      <td style={{ ...S.td, color:C.muted2 }}>{dateStr(u.createdAt)}</td>
                      <td style={S.td}><button onClick={() => openUserDetail(u.email)} style={{ ...S.btn(C.surface2, C.muted), fontSize:12, padding:'5px 12px' }}>View</button></td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No users yet</div>}
            </div>
          )}

          {/* ── TEMPLES ── */}
          {tab==='temples' && (
            <div style={S.section}>
              <div style={S.secHead}>
                <span style={{ fontWeight:700, fontSize:14 }}>Temple Directory ({data?.temples?.length||0})</span>
                <button style={S.btn(C.crimson)} onClick={openAddTemple}><Plus size={13}/> Add Temple</button>
              </div>
              {data?.temples?.length ? (
                <table><thead><tr>
                  <th style={S.th}>Name</th><th style={S.th}>State</th><th style={S.th}>Deity</th><th style={S.th}>Type</th><th style={S.th}>Live</th><th style={S.th}>Rating</th><th style={S.th}>Actions</th>
                </tr></thead><tbody>
                  {data.temples.map((t:any) => (
                    <tr key={t._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{t.name}</td>
                      <td style={{ ...S.td, color:C.muted }}>{t.state}</td>
                      <td style={S.td}>{t.deity}</td>
                      <td style={{ ...S.td, fontSize:12 }}>{t.type}</td>
                      <td style={S.td}>{t.has_live ? <span style={S.badge('#991B1B','#FEE2E2')}>Live</span> : <span style={{ color:C.muted2 }}>—</span>}</td>
                      <td style={S.td}>{t.rating_avg > 0 ? `${t.rating_avg}` : '—'}</td>
                      <td style={S.td}>
                        <div style={{ display:'flex', gap:8 }}>
                          <button onClick={() => openEditTemple(t)} style={{ background:'none', border:'none', color:C.muted2, cursor:'pointer' }}><Pencil size={14}/></button>
                          <button onClick={() => deleteTemple(t._id,t.name)} style={{ background:'none', border:'none', color:C.red, cursor:'pointer' }}><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No temples. Add one above.</div>}
            </div>
          )}

          {/* ── PLAN MY TRIP REQUESTS ── */}
          {tab==='plan_requests' && (
            <div style={S.section}>
              <div style={S.secHead}>
                <span style={{ fontWeight:700, fontSize:14 }}>Plan My Trip Requests ({data?.planRequests?.length||0})</span>
                <span style={{ fontSize:12, color:C.muted2 }}>Premium service enquiries</span>
              </div>
              {data?.planRequests?.length ? (
                <table><thead><tr>
                  <th style={S.th}>User</th><th style={S.th}>Destination</th><th style={S.th}>From</th><th style={S.th}>Days</th><th style={S.th}>Budget</th><th style={S.th}>Status</th><th style={S.th}>Received</th>
                </tr></thead><tbody>
                  {data.planRequests.map((r:any) => (
                    <tr key={r._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{r.user_name||r.user_email||'—'}</td>
                      <td style={{ ...S.td, color:C.crimson, fontWeight:600 }}>{r.to}</td>
                      <td style={{ ...S.td, color:C.muted }}>{r.from}</td>
                      <td style={S.td}>{r.days}d / {r.pilgrims}p</td>
                      <td style={S.td}>{r.budget ? `Rs.${r.budget}` : '—'}</td>
                      <td style={S.td}><span style={S.badge(r.status==='new' ? C.amber : C.green, r.status==='new' ? C.amberBg : C.greenBg)}>{r.status||'new'}</span></td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(r.createdAt)}</td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No Plan My Trip requests yet. They appear here when users click "Plan My Trip" on the planner page.</div>}
            </div>
          )}

          {/* ── SHARED PLANS ── */}
          {tab==='shared_plans' && (
            <div style={S.section}>
              <div style={S.secHead}>
                <span style={{ fontWeight:700, fontSize:14 }}>Shared Plans ({data?.sharedPlans?.length||0})</span>
                <span style={{ fontSize:12, color:C.muted2 }}>Plans shared between pilgrims</span>
              </div>
              {data?.sharedPlans?.length ? (
                <table><thead><tr>
                  <th style={S.th}>Shared By</th><th style={S.th}>Shared With</th><th style={S.th}>Route</th><th style={S.th}>Days</th><th style={S.th}>Read</th><th style={S.th}>Shared</th>
                </tr></thead><tbody>
                  {data.sharedPlans.map((p:any) => (
                    <tr key={p._id}>
                      <td style={{ ...S.td, color:C.muted }}>{p.shared_by}</td>
                      <td style={{ ...S.td, color:C.muted }}>{p.shared_with}</td>
                      <td style={{ ...S.td, fontWeight:600 }}>{p.from} → {p.to}</td>
                      <td style={S.td}>{p.days}d</td>
                      <td style={S.td}><span style={S.badge(p.read ? C.green : C.amber, p.read ? C.greenBg : C.amberBg)}>{p.read ? 'Read' : 'Unread'}</span></td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(p.createdAt)}</td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No plans shared between pilgrims yet.</div>}
            </div>
          )}

          {/* ── ORGANISER REQUESTS ── */}
          {tab==='admin_reqs' && (
            <div style={S.section}>
              <div style={S.secHead}>
                <span style={{ fontWeight:700, fontSize:14 }}>Organiser Requests ({data?.adminRequests?.length||0})</span>
                <span style={{ fontSize:12, color:C.muted2 }}>Users requesting Yatra Organiser role</span>
              </div>
              {data?.adminRequests?.length ? (
                <table><thead><tr>
                  <th style={S.th}>User</th><th style={S.th}>Email</th><th style={S.th}>Experience</th><th style={S.th}>Groups Led</th><th style={S.th}>Status</th><th style={S.th}>Actions</th>
                </tr></thead><tbody>
                  {data.adminRequests.map((r:any) => (
                    <tr key={r._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{r.name||'—'}</td>
                      <td style={{ ...S.td, color:C.muted }}>{r.email}</td>
                      <td style={{ ...S.td, maxWidth:200, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.experience||'—'}</td>
                      <td style={S.td}>{r.groups_led||0}</td>
                      <td style={S.td}><span style={S.badge(r.status==='pending' ? C.amber : r.status==='approved' ? C.green : C.red, r.status==='pending' ? C.amberBg : r.status==='approved' ? C.greenBg : C.redBg)}>{r.status||'pending'}</span></td>
                      <td style={S.td}>
                        {r.status==='pending' && (
                          <div style={{ display:'flex', gap:8 }}>
                            <button onClick={() => approveAdminReq(r._id)} style={{ ...S.btn(C.greenBg, C.green), fontSize:12, padding:'5px 12px' }}><Check size={12}/> Approve</button>
                            <button onClick={() => rejectAdminReq(r._id)} style={{ ...S.btn(C.redBg, C.red), fontSize:12, padding:'5px 12px' }}><X size={12}/> Reject</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No organiser requests yet.</div>}
            </div>
          )}

          {/* ── REVIEWS ── */}
          {tab==='reviews' && (
            <div style={S.section}>
              <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Reviews ({data?.reviews?.length||0})</span></div>
              {data?.reviews?.length ? (
                <table><thead><tr>
                  <th style={S.th}>Temple</th><th style={S.th}>User</th><th style={S.th}>Rating</th><th style={S.th}>Comment</th><th style={S.th}>Date</th><th style={S.th}>Action</th>
                </tr></thead><tbody>
                  {data.reviews.map((r:any) => (
                    <tr key={r._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{r.temple?.name||'—'}</td>
                      <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{r.user_name||'Anonymous'}</td>
                      <td style={S.td}>{'★'.repeat(r.rating||0)}</td>
                      <td style={{ ...S.td, maxWidth:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.comment||'—'}</td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(r.createdAt)}</td>
                      <td style={S.td}><button onClick={() => deleteReview(r._id)} style={{ ...S.btn(C.redBg, C.red), fontSize:12, padding:'5px 10px' }}>Delete</button></td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No reviews yet</div>}
            </div>
          )}

          {/* ── SEARCHES ── */}
          {tab==='searches' && (
            <div style={S.section}>
              <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Search Queries ({data?.searches?.length||0})</span></div>
              {data?.searches?.length ? (
                <table><thead><tr>
                  <th style={S.th}>Query</th><th style={S.th}>User</th><th style={S.th}>Provider</th><th style={S.th}>Speed</th><th style={S.th}>When</th>
                </tr></thead><tbody>
                  {data.searches.map((s:any) => (
                    <tr key={s._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{s.query}</td>
                      <td style={{ ...S.td, color:C.muted, fontSize:12 }}>{s.user_email||'anon'}</td>
                      <td style={S.td}><span style={S.badge(C.blue, C.blueBg)}>{s.provider}</span></td>
                      <td style={{ ...S.td, color:C.muted2 }}>{s.duration_ms}ms</td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(s.createdAt)}</td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No searches yet</div>}
            </div>
          )}

          {/* ── AI USAGE ── */}
          {tab==='ai' && (
            <div style={S.section}>
              <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>AI Usage ({data?.ai?.length||0})</span></div>
              {data?.ai?.length ? (
                <table><thead><tr>
                  <th style={S.th}>Feature</th><th style={S.th}>Provider</th><th style={S.th}>User</th><th style={S.th}>Destination</th><th style={S.th}>Status</th><th style={S.th}>When</th>
                </tr></thead><tbody>
                  {data.ai.map((a:any) => (
                    <tr key={a._id}>
                      <td style={S.td}>{a.feature}</td>
                      <td style={S.td}><span style={S.badge('#5B21B6','#EDE9FE')}>{a.provider}</span></td>
                      <td style={{ ...S.td, fontSize:12, color:C.muted }}>{a.user_email||'anon'}</td>
                      <td style={S.td}>{a.destination||'—'}</td>
                      <td style={S.td}><span style={S.badge(a.success?C.green:C.red, a.success?C.greenBg:C.redBg)}>{a.success?'OK':'Failed'}</span></td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(a.createdAt)}</td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No AI usage yet</div>}
            </div>
          )}

          {/* ── PAGE VIEWS ── */}
          {tab==='pageviews' && (
            <div style={S.section}>
              <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Page Views ({data?.views?.length||0})</span></div>
              {data?.views?.length ? (
                <table><thead><tr>
                  <th style={S.th}>Page</th><th style={S.th}>User</th><th style={S.th}>Duration</th><th style={S.th}>When</th>
                </tr></thead><tbody>
                  {data.views.map((v:any) => (
                    <tr key={v._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{v.page}</td>
                      <td style={{ ...S.td, fontSize:12, color:C.muted }}>{v.user_email||'anon'}</td>
                      <td style={S.td}>{fmtT(v.duration_sec||0)}</td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(v.createdAt)}</td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No page view data yet</div>}
            </div>
          )}

          {/* ── FINVERSE ── */}
          {tab==='finverse' && (
            <div style={S.section}>
              <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>FinVerse Clicks ({data?.clicks?.length||0})</span></div>
              {data?.clicks?.length ? (
                <table><thead><tr>
                  <th style={S.th}>User</th><th style={S.th}>Source</th><th style={S.th}>Campaign</th><th style={S.th}>When</th>
                </tr></thead><tbody>
                  {data.clicks.map((c:any) => (
                    <tr key={c._id}>
                      <td style={{ ...S.td, fontSize:12, color:C.muted }}>{c.user_email||'anon'}</td>
                      <td style={S.td}>{c.source||'—'}</td>
                      <td style={{ ...S.td, color:C.muted2 }}>{c.campaign||'—'}</td>
                      <td style={{ ...S.td, color:C.muted2 }}>{ago(c.createdAt)}</td>
                    </tr>
                  ))}
                </tbody></table>
              ) : <div style={S.empty}>No FinVerse clicks yet</div>}
            </div>
          )}

          {/* ── ANNOUNCEMENT ── */}
          {tab==='announcement' && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Push Banner to All Users</span></div>
                <div style={{ padding:20 }}>
                  <label style={S.label}>Message</label>
                  <textarea rows={4} placeholder="e.g. Navratri special: 9 Shakti Peetha circuit now live!" value={annForm.message} onChange={e => setAnnForm(f => ({...f,message:e.target.value}))} />
                  <label style={S.label}>Type</label>
                  <select value={annForm.type} onChange={e => setAnnForm(f => ({...f,type:e.target.value}))} style={{ marginBottom:16, width:'100%' }}>
                    <option value="info">Info (blue)</option>
                    <option value="success">Success (green)</option>
                    <option value="warning">Warning (amber)</option>
                  </select>
                  <div style={{ display:'flex', gap:10 }}>
                    <button style={S.btn(C.crimson)} onClick={saveAnn}><Megaphone size={13}/> Publish</button>
                    <button style={S.btn(C.surface2, C.muted)} onClick={clearAnn}><X size={13}/> Clear</button>
                  </div>
                </div>
              </div>
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Preview</span></div>
                <div style={{ padding:20 }}>
                  {annForm.message ? (
                    <div style={{ padding:'14px 18px', borderRadius:10, fontSize:13, lineHeight:1.7, background: annForm.type==='success' ? C.greenBg : annForm.type==='warning' ? C.amberBg : C.blueBg, color: annForm.type==='success' ? C.green : annForm.type==='warning' ? C.amber : C.blue, border:`1px solid currentColor` }}>
                      {annForm.message}
                    </div>
                  ) : <div style={S.empty}>Type a message to preview</div>}
                </div>
              </div>
            </div>
          )}



          {tab==='recommendations' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { label:'Total', value: data?.recommendations?.length||0, color:C.blue },
                  { label:'Pending', value: data?.recommendations?.filter((r:any)=>r.status==='pending').length||0, color:C.amber },
                  { label:'Approved', value: data?.recommendations?.filter((r:any)=>r.status==='approved').length||0, color:C.green },
                  { label:'Added to DB', value: data?.recommendations?.filter((r:any)=>r.status==='added').length||0, color:C.crimson },
                ].map((stat:any) => (
                  <div key={stat.label} style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:12, padding:'18px 20px' }}>
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


          {tab==='reports' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:24 }}>
                {[
                  { label:'Total Reports', value: data?.reports?.length||0, color:C.crimson },
                  { label:'New', value: data?.reports?.filter((r:any)=>r.status==='new').length||0, color:C.amber },
                  { label:'Fixed', value: data?.reports?.filter((r:any)=>r.status==='fixed').length||0, color:C.green },
                  { label:'Verifications', value: data?.verifications?.length||0, color:C.blue },
                ].map((stat:any) => (
                  <div key={stat.label} style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:12, padding:'18px 20px' }}>
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
                  <div key={stat.label} style={{ background:C.surface, border:`1.5px solid ${C.border}`, borderRadius:12, padding:'18px 20px' }}>
                    <div style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.1em', color:C.muted2, marginBottom:8 }}>{stat.label}</div>
                    <div style={{ fontSize:26, fontWeight:700, color:stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:14 }}>Contribution Interests ({data?.contributions?.length||0})</span>
                  <span style={{ fontSize:12, color:C.muted2 }}>Donate Wisely campaign — sorted by latest</span>
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

          {/* ── GROUP YATRA ── */}
          {tab==='group_yatra' && (<>
            <div style={{ display:'flex', gap:0, borderBottom:`1px solid ${C.border}`, marginBottom:20 }}>
              {[{id:'list',label:'All Plans'},{id:'create',label:'Create New'},...(gySelected?[{id:'detail',label:(gySelected.title||'').slice(0,20)+'...'}]:[])].map((t:any) => (
                <button key={t.id} onClick={() => setGyView(t.id)} style={{
                  padding:'10px 18px', fontSize:13, cursor:'pointer', border:'none',
                  borderBottom:gyView===t.id?`2px solid ${C.crimson}`:'2px solid transparent',
                  color:gyView===t.id?C.crimson:C.muted2, background:'transparent',
                  fontFamily:'inherit', fontWeight:gyView===t.id?600:400,
                }}>{t.label}</button>
              ))}
            </div>

            {gyView==='list' && (
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Group Yatra Plans ({gyPlans.length})</span></div>
                {gyLoading ? <div style={S.empty}>Loading…</div> : gyPlans.length===0 ? <div style={S.empty}>No plans yet. Create your first group yatra.</div> : (
                  <table><thead><tr>
                    <th style={S.th}>Title</th><th style={S.th}>Destination</th><th style={S.th}>Dates</th><th style={S.th}>Mode</th><th style={S.th}>Groups</th><th style={S.th}>Persons</th><th style={S.th}>Status</th><th style={S.th}>Actions</th>
                  </tr></thead><tbody>
                    {gyPlans.map((plan:any) => (
                      <tr key={plan._id}>
                        <td style={{ ...S.td, fontWeight:600 }}>{plan.title}</td>
                        <td style={{ ...S.td, color:C.muted }}>{plan.destination}</td>
                        <td style={{ ...S.td, color:C.muted2, fontSize:12 }}>{plan.travel_dates}</td>
                        <td style={S.td}><span style={S.badge(plan.mode==='open'?C.green:C.amber, plan.mode==='open'?C.greenBg:C.amberBg)}>{plan.mode==='open'?'Open':'Assigned'}</span></td>
                        <td style={S.td}>{plan.members?.length||0}</td>
                        <td style={S.td}>{plan.total_persons}</td>
                        <td style={S.td}><span style={S.badge(plan.status==='published'?C.green:C.amber, plan.status==='published'?C.greenBg:C.amberBg)}>{plan.status}</span></td>
                        <td style={S.td}>
                          <div style={{ display:'flex', gap:8 }}>
                            <button onClick={() => {setGySelected(plan);setGyView('detail')}} style={{ ...S.btn(C.surface2,C.muted), fontSize:12, padding:'5px 10px' }}>View</button>
                            {plan.status==='draft' && <button onClick={() => publishGyPlan(plan._id)} style={{ ...S.btn(C.crimson), fontSize:12, padding:'5px 10px' }}><Send size={11}/></button>}
                            <button onClick={() => deleteGyPlan(plan._id)} style={{ background:'none', border:'none', color:C.red, cursor:'pointer' }}><Trash2 size={13}/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody></table>
                )}
              </div>
            )}

            {gyView==='create' && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:20 }}>
                <div>
                  <div style={S.section}>
                    <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Plan Details</span></div>
                    <div style={{ padding:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
                      {[['title','Plan Title *','e.g. Kedarnath Group Yatra June 2026'],['temple_name','Temple Name *','e.g. Kedarnath Temple'],['destination','Destination *','e.g. Kedarnath, Uttarakhand'],['travel_dates','Travel Dates *','e.g. 15–20 June 2026']].map(([k,label,ph]) => (
                        <div key={k}><label style={S.label}>{label}</label><input style={S.input} placeholder={ph} value={(gyForm as any)[k]} onChange={e => setGyForm(f => ({...f,[k]:e.target.value}))}/></div>
                      ))}
                      <div><label style={S.label}>Mode</label>
                        <select value={gyForm.mode} onChange={e => setGyForm(f => ({...f,mode:e.target.value as any}))} style={{ ...S.input as any, marginBottom:10 }}>
                          <option value="open">Open — Anyone can join</option>
                          <option value="assigned">Assigned — Specific members</option>
                        </select>
                      </div>
                      <div><label style={S.label}>Description</label><input style={S.input} placeholder="Notes, dress code…" value={gyForm.description} onChange={e => setGyForm(f => ({...f,description:e.target.value}))}/></div>
                    </div>
                  </div>
                  <div style={S.section}>
                    <div style={S.secHead}>
                      <span style={{ fontWeight:700, fontSize:14 }}>{gyForm.mode==='assigned'?'Assigned Members':'Travel Groups'}</span>
                      <button style={S.btn(C.surface2,C.muted)} onClick={() => setGyMembers(m => [...m,{name:'',city:'',persons:1,is_assigned:gyForm.mode==='assigned'}])}><Plus size={13}/> Add</button>
                    </div>
                    <div style={{ padding:16 }}>
                      {gyMembers.map((member,i) => (
                        <div key={i} style={{ background:C.surface2, borderRadius:10, padding:14, marginBottom:10, border:`1px solid ${C.border}` }}>
                          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 100px', gap:10, marginBottom:10 }}>
                            <div><label style={S.label}>Name</label><input style={{ ...S.input, marginBottom:0 }} placeholder="e.g. Chirag Shah" value={member.name} onChange={e => setGyMembers(m => m.map((mem,idx) => idx===i?{...mem,name:e.target.value}:mem))}/></div>
                            <div><label style={S.label}>Starting City</label><input style={{ ...S.input, marginBottom:0 }} placeholder="e.g. Mumbai" value={member.city} onChange={e => setGyMembers(m => m.map((mem,idx) => idx===i?{...mem,city:e.target.value}:mem))}/></div>
                            <div><label style={S.label}>Persons</label><input type="number" min={1} style={{ ...S.input, marginBottom:0 }} value={member.persons} onChange={e => setGyMembers(m => m.map((mem,idx) => idx===i?{...mem,persons:parseInt(e.target.value)||1}:mem))}/></div>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                            <button style={S.btn(C.surface, C.muted)} onClick={() => generateMemberPlan(i)} disabled={!member.city||!gyForm.destination||member.generating}>
                              {member.generating?<><Loader2 size={12} style={{animation:'spin 1s linear infinite'}}/> Generating…</>:<><Zap size={12}/> Generate Plan</>}
                            </button>
                            {member.estimated_cost && <span style={{ fontSize:13, fontWeight:700, color:C.saffron }}>Rs.{member.estimated_cost.toLocaleString('en-IN')}</span>}
                            {gyMembers.length>1 && <button style={{ background:'none', border:'none', color:C.red, cursor:'pointer', marginLeft:'auto' }} onClick={() => setGyMembers(m => m.filter((_,idx) => idx!==i))}><Trash2 size={14}/></button>}
                          </div>
                          {member.travel_plan && <div style={{ marginTop:10, padding:10, background:C.surface, borderRadius:8, fontSize:12, color:C.muted, lineHeight:1.6, maxHeight:80, overflowY:'auto' }}>{member.travel_plan.slice(0,250)}…</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ ...S.section, position:'sticky', top:0, alignSelf:'start' }}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Summary</span></div>
                  <div style={{ padding:16 }}>
                    {[['Groups',gyMembers.length],['Total Persons',gyTotalPersons],...(gyTotalCost>0?[['Est. Cost',`Rs.${gyTotalCost.toLocaleString('en-IN')}`]]:[])] .map(([label,value]:any) => (
                      <div key={label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${C.border}`, fontSize:13 }}>
                        <span style={{ color:C.muted2 }}>{label}</span>
                        <span style={{ fontWeight:700, color:label==='Est. Cost'?C.saffron:C.ink }}>{value}</span>
                      </div>
                    ))}
                    <button style={{ ...S.btn(C.crimson), width:'100%', justifyContent:'center', marginTop:16 }} onClick={saveGyPlan} disabled={!gyForm.title||!gyForm.destination||gySaving}>
                      {gySaving?<><Loader2 size={13} style={{animation:'spin 1s linear infinite'}}/> Saving…</>:'Save as Draft'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {gyView==='detail' && gySelected && (
              <div>
                <div style={{ background:C.surface, border:`1.5px solid ${C.border2}`, borderLeft:`4px solid ${C.crimson}`, borderRadius:12, padding:20, marginBottom:20 }}>
                  <div style={{ display:'flex', alignItems:'start', justifyContent:'space-between' }}>
                    <div>
                      <h2 style={{ fontSize:20, fontWeight:700, fontFamily:"'Playfair Display',serif", marginBottom:6 }}>{gySelected.title}</h2>
                      <div style={{ display:'flex', gap:16, fontSize:12, color:C.muted2 }}>
                        <span>{gySelected.temple_name}</span>
                        <span>{gySelected.travel_dates}</span>
                        <span>{gySelected.total_persons} persons</span>
                        <span style={S.badge(gySelected.mode==='open'?C.green:C.amber, gySelected.mode==='open'?C.greenBg:C.amberBg)}>{gySelected.mode}</span>
                      </div>
                    </div>
                    {(gySelected as any).status==='draft' ? (
                      <button style={S.btn(C.crimson)} onClick={() => publishGyPlan((gySelected as any)._id)} disabled={gyPublishing}>
                        {gyPublishing?<Loader2 size={13} style={{animation:'spin 1s linear infinite'}}/>:<Send size={13}/>}
                        {gyPublishing?'Publishing…':'Publish to All Users'}
                      </button>
                    ) : <span style={S.badge(C.green,C.greenBg)}>Published</span>}
                  </div>
                </div>
                <div style={S.section}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:14 }}>Travel Plans by Group</span></div>
                  <div style={{ padding:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                    {gySelected.members?.map((member,i) => (
                      <div key={i} style={{ background:C.surface2, borderRadius:10, padding:14, border:`1px solid ${C.border}` }}>
                        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                          <div><div style={{ fontWeight:700, fontSize:13 }}>{member.name||member.city+' Group'}</div><div style={{ fontSize:11, color:C.muted2 }}>{member.city} · {member.persons} persons</div></div>
                          {member.estimated_cost && <div style={{ textAlign:'right' }}><div style={{ fontSize:14, fontWeight:700, color:C.saffron }}>Rs.{member.estimated_cost.toLocaleString('en-IN')}</div><div style={{ fontSize:10, color:C.muted2 }}>estimated</div></div>}
                        </div>
                        {member.travel_plan && <div style={{ fontSize:12, color:C.muted, lineHeight:1.6, maxHeight:120, overflowY:'auto', background:C.surface, padding:10, borderRadius:8 }}>{member.travel_plan}</div>}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={S.section}>
                  <div style={S.secHead}>
                    <span style={{ fontWeight:700, fontSize:14 }}>Combined Group Itinerary at {gySelected.destination}</span>
                    <button style={S.btn(C.surface2,C.muted)} onClick={generateCombined} disabled={gyGenerating}>
                      {gyGenerating?<><Loader2 size={12} style={{animation:'spin 1s linear infinite'}}/> Generating…</>:<><Zap size={12}/> Generate</>}
                    </button>
                  </div>
                  <div style={{ padding:20 }}>
                    {gySelected.combined_itinerary ? <div style={{ fontSize:13, color:C.ink, lineHeight:1.8, whiteSpace:'pre-wrap' }}>{gySelected.combined_itinerary}</div> : <div style={S.empty}>Click Generate to create a combined itinerary</div>}
                  </div>
                </div>
              </div>
            )}
          </>)}

          </>)}
        </div>
      </div>

      {/* ── USER DETAIL MODAL ── */}
      {modal==='user_detail' && selected && (
        <Modal title={`User — ${selected.email}`} onClose={() => setModal(null)}>
          <div style={{ padding:20 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
              {[['Searches',selected.searches?.length||0],['AI Requests',selected.ai?.length||0],['Page Views',selected.pageviews?.length||0],['FinVerse',selected.finverse?.length||0]].map(([l,v]:any) => (
                <div key={l} style={{ background:C.surface2, borderRadius:10, padding:14, textAlign:'center', border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:24, fontWeight:700, color:C.ink }}>{v}</div>
                  <div style={{ fontSize:10, color:C.muted2, textTransform:'uppercase', letterSpacing:'.08em', marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* ── TEMPLE FORM MODAL ── */}
      {modal==='temple_form' && (
        <Modal title={selected?._id?`Edit — ${selected.name}`:'Add New Temple'} onClose={() => setModal(null)}>
          <div style={{ padding:20 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
              {([['name','Temple Name *','text'],['state','State *','text'],['city','City *','text'],['deity','Main Deity *','text'],['type','Type','text'],['timing','Timings','text'],['best_time','Best Time','text'],['dress_code','Dress Code','text'],['festivals','Festivals','text'],['live_url','Live Stream URL','text'],['lat','Latitude','number'],['lng','Longitude','number']] as [string,string,string][]).map(([k,pl,t]) => (
                <div key={k}><label style={S.label}>{pl}</label><input type={t} placeholder={pl} style={S.input} value={tForm[k]||''} onChange={e => setTForm((f:any) => ({...f,[k]:e.target.value}))}/></div>
              ))}
              <div style={{ gridColumn:'1/-1' }}><label style={S.label}>Description *</label><textarea rows={3} value={tForm.description} onChange={e => setTForm((f:any) => ({...f,description:e.target.value}))}/></div>
              <div style={{ gridColumn:'1/-1', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <input type="checkbox" checked={tForm.has_live} onChange={e => setTForm((f:any) => ({...f,has_live:e.target.checked}))}/>
                <span style={{ fontSize:13, color:C.ink }}>Has Live Darshan Stream</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button style={S.btn(C.crimson)} onClick={saveTemple}><Check size={13}/> {selected?._id?'Save Changes':'Add Temple'}</button>
              <button style={S.btn(C.surface2,C.muted)} onClick={() => setModal(null)}><X size={13}/> Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
