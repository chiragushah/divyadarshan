'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  Loader2, Users, Search, Cpu, Eye, LogOut,
  TrendingUp, Clock, Star, MapPin, AlertTriangle,
  Download, Megaphone, Plus, Pencil, Trash2, X, Check,
  BarChart2, IndianRupee, RefreshCw, ChevronRight
} from 'lucide-react'

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
  { id:'overview',     icon: TrendingUp,   label:'Overview'    },
  { id:'users',        icon: Users,        label:'Users'       },
  { id:'temples',      icon: MapPin,       label:'Temples'     },
  { id:'reviews',      icon: Star,         label:'Reviews'     },
  { id:'searches',     icon: Search,       label:'Searches'    },
  { id:'ai',           icon: Cpu,          label:'AI Usage'    },
  { id:'pageviews',    icon: Eye,          label:'Page Views'  },
  { id:'finverse',     icon: IndianRupee,  label:'FinVerse'    },
  { id:'announcement', icon: Megaphone,    label:'Announce'    },
]

function BarRow({ label, count, max, color }: any) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 20px', borderBottom:'1px solid #1A1A25' }}>
      <span style={{ width:110, fontSize:12, color:'#D0D0E0', flexShrink:0, textTransform:'capitalize', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{label}</span>
      <div style={{ flex:1, background:'#1E1E2E', borderRadius:100, height:8, overflow:'hidden' }}>
        <div style={{ width:`${max > 0 ? (count/max)*100 : 0}%`, height:'100%', borderRadius:100, background:color, transition:'width .5s' }} />
      </div>
      <span style={{ width:36, textAlign:'right', fontSize:12, fontWeight:600, color:'#F0F0F5' }}>{count}</span>
    </div>
  )
}

function Stat({ label, value, sub, icon:Icon, color, accent }: any) {
  return (
    <div style={{ background: accent ? `${color}08` : '#13131A', border:`1px solid ${accent ? color+'30' : '#1E1E2E'}`, borderRadius:12, padding:'18px 20px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
        <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.12em', color:'#7A7A8A' }}>{label}</span>
        <div style={{ width:30, height:30, borderRadius:8, background:`${color}20`, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Icon size={14} color={color} />
        </div>
      </div>
      <div style={{ fontSize:28, fontWeight:700, lineHeight:1, color:'#F0F0F5' }}>{value}</div>
      {sub && <div style={{ fontSize:11, color: accent ? '#34D399' : '#4A4A5A', marginTop:4 }}>{sub}</div>}
    </div>
  )
}

function Modal({ title, onClose, children }: any) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.75)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'#13131A', border:'1px solid #2A2A35', borderRadius:16, width:'100%', maxWidth:660, maxHeight:'88vh', overflow:'hidden', display:'flex', flexDirection:'column' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid #1E1E2E' }}>
          <span style={{ fontWeight:700, fontSize:15 }}>{title}</span>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'#7A7A8A', cursor:'pointer' }}><X size={18}/></button>
        </div>
        <div style={{ overflow:'auto', flex:1 }}>{children}</div>
      </div>
    </div>
  )
}

const S = {
  shell:   { display:'grid', gridTemplateColumns:'220px 1fr', minHeight:'100vh', background:'#0A0A0F', color:'#F0F0F5', fontFamily:"'Outfit',sans-serif" } as any,
  sidebar: { background:'#0F0F18', borderRight:'1px solid #1E1E2E', padding:'20px 12px', display:'flex', flexDirection:'column' as any, position:'sticky' as any, top:0, height:'100vh' },
  main:    { padding:28, overflowY:'auto' as any },
  secHead: { padding:'14px 20px', borderBottom:'1px solid #1E1E2E', display:'flex', alignItems:'center', justifyContent:'space-between' },
  section: { background:'#13131A', border:'1px solid #1E1E2E', borderRadius:12, overflow:'hidden', marginBottom:20 },
  th:      { padding:'10px 16px', textAlign:'left' as any, fontSize:10, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.1em', color:'#4A4A5A', background:'#0F0F18', borderBottom:'1px solid #1E1E2E' },
  td:      { padding:'11px 16px', fontSize:12, color:'#D0D0E0', borderBottom:'1px solid #1A1A25' },
  input:   { width:'100%', padding:'8px 12px', background:'#1E1E2E', border:'1.5px solid #2A2A35', borderRadius:8, fontFamily:"'Outfit',sans-serif", fontSize:13, color:'#F0F0F5', outline:'none', marginBottom:10 },
  label:   { fontSize:11, fontWeight:600, textTransform:'uppercase' as any, letterSpacing:'.06em', color:'#7A7A8A', marginBottom:4, display:'block' },
  btn:     (c:string) => ({ padding:'8px 16px', background:c, color:'white', border:`1px solid ${c === '#2A2A35' ? '#3A3A45' : 'transparent'}`, borderRadius:8, fontFamily:"'Outfit',sans-serif", fontSize:13, fontWeight:600, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:6 }),
  empty:   { padding:'40px 20px', textAlign:'center' as any, color:'#4A4A5A', fontSize:13 },
  grid2:   { display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 },
  grid3:   { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 },
  topbar:  { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 },
}

export default function AdminDashboard() {
  const router = useRouter()
  const [tab, setTab]   = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [days, setDays] = useState(30)
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<string|null>(null)
  const [selected, setSelected] = useState<any>(null)
  const [tForm, setTForm] = useState<any>({ name:'', state:'', city:'', deity:'', type:'', description:'', timing:'', best_time:'', dress_code:'', festivals:'', has_live:false, live_url:'', lat:'', lng:'' })
  const [annForm, setAnnForm] = useState({ message:'', type:'info' })

  const load = useCallback(async (t=tab, d=days) => {
    setLoading(true)
    const res = await fetch(`/api/admin/stats?type=${t}&days=${d}`)
    if (res.status === 401) { router.push('/admin'); return }
    setData(await res.json())
    setLoading(false)
  }, [tab, days, router])

  useEffect(() => { load(tab, days) }, [tab, days])

  const logout = async () => {
    await fetch('/api/admin/auth', { method:'DELETE' })
    router.push('/admin')
  }

  const deleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return
    await fetch('/api/admin/reviews', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) })
    load()
  }

  const deleteTemple = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This is permanent.`)) return
    await fetch('/api/admin/temples', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) })
    load()
  }

  const saveTemple = async () => {
    const method = selected?._id ? 'PATCH' : 'POST'
    const body   = selected?._id ? { id:selected._id, ...tForm } : tForm
    await fetch('/api/admin/temples', { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    setModal(null)
    load()
  }

  const saveAnn = async () => {
    if (!annForm.message.trim()) return
    await fetch('/api/admin/announcement', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(annForm) })
    alert('Banner published!')
  }

  const clearAnn = async () => {
    await fetch('/api/admin/announcement', { method:'DELETE' })
    alert('Banner cleared.')
  }

  const openUserDetail = async (email: string) => {
    const res = await fetch(`/api/admin/stats?type=user_detail&email=${encodeURIComponent(email)}`)
    setSelected({ ...(await res.json()), email })
    setModal('user_detail')
  }

  const openEditTemple = (t: any) => {
    setSelected(t)
    setTForm({ name:t.name||'', state:t.state||'', city:t.city||'', deity:t.deity||'', type:t.type||'', description:t.description||'', timing:t.timing||'', best_time:t.best_time||'', dress_code:t.dress_code||'', festivals:t.festivals||'', has_live:!!t.has_live, live_url:t.live_url||'', lat:String(t.lat||''), lng:String(t.lng||'') })
    setModal('temple_form')
  }

  const openAddTemple = () => {
    setSelected(null)
    setTForm({ name:'', state:'', city:'', deity:'', type:'', description:'', timing:'', best_time:'', dress_code:'', festivals:'', has_live:false, live_url:'', lat:'', lng:'' })
    setModal('temple_form')
  }

  const o = data?.overview || {}

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:#0A0A0F;color:#F0F0F5;font-family:'Outfit',sans-serif;}
        table{width:100%;border-collapse:collapse;}
        tr:last-child td{border-bottom:none!important;}
        tr:hover td{background:#1A1A25;}
        select{background:#1E1E2E;border:1.5px solid #2A2A35;border-radius:8px;padding:7px 12px;font-family:'Outfit',sans-serif;font-size:12px;color:#F0F0F5;outline:none;cursor:pointer;}
        textarea{width:100%;padding:8px 12px;background:#1E1E2E;border:1.5px solid #2A2A35;border-radius:8px;font-family:'Outfit',sans-serif;font-size:13px;color:#F0F0F5;outline:none;resize:vertical;margin-bottom:10px;}
        input[type=checkbox]{accent-color:#C0570A;width:15px;height:15px;cursor:pointer;}
        ::-webkit-scrollbar{width:4px;height:4px;}
        ::-webkit-scrollbar-track{background:#0A0A0F;}
        ::-webkit-scrollbar-thumb{background:#2A2A35;border-radius:2px;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:768px){
          .shell{grid-template-columns:1fr!important;}
          .sidebar{display:none;position:fixed;inset:0;z-index:200;width:260px;}
          .sidebar.open{display:flex!important;}
          .main{padding:16px!important;}
          .mobile-header{display:flex!important;}
          table{font-size:11px;}
          th,td{padding:8px 10px!important;}
        }
        .mobile-header{
          display:none;
          align-items:center;
          justify-content:space-between;
          padding:12px 16px;
          background:#0F0F18;
          border-bottom:1px solid #1E1E2E;
          margin:-28px -28px 20px;
        }
        .hamburger{background:none;border:none;color:#F0F0F5;cursor:pointer;padding:4px;}
        .overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:199;}
        .overlay.show{display:block;}

      `}</style>

      <div style={S.shell}>

        {/* Mobile overlay */}
        {sidebarOpen && <div className="overlay show" onClick={() => setSidebarOpen(false)} />}

        {/* SIDEBAR */}
        <div style={S.sidebar} className={sidebarOpen ? 'open' : ''}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24, paddingBottom:20, borderBottom:'1px solid #1E1E2E' }}>
            <div style={{ width:34, height:34, background:'linear-gradient(135deg,#C0570A,#9A4208)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>🛡️</div>
            <div>
              <div style={{ fontWeight:700, fontSize:14 }}>Admin Panel</div>
              <div style={{ fontSize:9, color:'#3A3A4A', textTransform:'uppercase' as any, letterSpacing:'.12em' }}>DivyaDarshan</div>
            </div>
          </div>

          <nav style={{ flex:1, display:'flex', flexDirection:'column', gap:3 }}>
            <div style={{ fontSize:9, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase' as any, color:'#3A3A4A', margin:'0 0 6px 12px' }}>Analytics</div>
            {TABS.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:8,
                fontSize:13, fontWeight:500, cursor:'pointer', transition:'all .15s',
                color: tab===n.id ? '#F0844A' : '#7A7A8A',
                background: tab===n.id ? 'rgba(192,87,10,.12)' : 'transparent',
                border: tab===n.id ? '1px solid rgba(192,87,10,.2)' : '1px solid transparent',
                width:'100%', textAlign:'left' as any,
              }}>
                <n.icon size={14} />{n.label}
              </button>
            ))}
          </nav>

          <div style={{ paddingTop:16, borderTop:'1px solid #1E1E2E' }}>
            <div style={{ fontSize:10, color:'#3A3A4A', textAlign:'center' as any, marginBottom:8 }}>chirag@dynaimers.com</div>
            <button onClick={logout} style={{ ...S.btn('#1E1E2E'), width:'100%', justifyContent:'center', color:'#7A7A8A' }}>
              <LogOut size={13} /> Sign Out
            </button>
          </div>
        </div>

        {/* MAIN */}
        <div style={S.main}>
          <div style={S.topbar}>
            <div>
              <h1 style={{ fontSize:20, fontWeight:700 }}>{TABS.find(t=>t.id===tab)?.label}</h1>
              <p style={{ fontSize:12, color:'#4A4A5A', marginTop:2 }}>{new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</p>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <select value={days} onChange={e => setDays(Number(e.target.value))}>
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <button style={S.btn('#1E1E2E')} onClick={() => load(tab,days)}>
                <RefreshCw size={13} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              </button>
            </div>
          </div>

          {loading && !data ? (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:300, gap:12, color:'#4A4A5A' }}>
              <Loader2 size={20} style={{ animation:'spin 1s linear infinite' }} /> Loading…
            </div>
          ) : (<>

            {/* ══ OVERVIEW ══ */}
            {tab === 'overview' && data && (<>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 }}>
                <Stat label="Total Users"     value={fmt(o.totalUsers)}     sub={`+${fmt(o.newUsers)} new (${days}d)`}    icon={Users}       color="#3B82F6" accent />
                <Stat label="AI Requests"     value={fmt(o.totalAI)}        sub={`${fmt(o.failedAI)} failed`}             icon={Cpu}         color="#7C3AED" />
                <Stat label="Searches"        value={fmt(o.totalSearches)}  sub={`last ${days} days`}                     icon={Search}      color="#10B981" />
                <Stat label="Page Views"      value={fmt(o.totalPageViews)} sub={`avg ${fmtT(o.avgSessionSec||0)}`}       icon={Eye}         color="#F59E0B" />
                <Stat label="FinVerse Clicks" value={fmt(o.totalFinVerse)}  sub="conversion events"                       icon={IndianRupee} color="#C0570A" accent />
                <Stat label="Est. AI Cost"    value={`₹${o.aiCostINR||0}`} sub={`last ${days} days`}                     icon={BarChart2}   color="#EC4899" />
              </div>

              <div style={S.grid2}>
                <div style={S.section}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>AI by Provider</span><span style={{ fontSize:11, color:'#4A4A5A' }}>last {days}d</span></div>
                  {data.aiByProvider?.length > 0 ? data.aiByProvider.map((p:any) => (
                    <BarRow key={p._id} label={p._id} count={p.count} max={Math.max(...data.aiByProvider.map((x:any)=>x.count))} color={p._id==='claude'?'#7C3AED':p._id==='gemini'?'#10B981':'#0EA5E9'} />
                  )) : <div style={S.empty}>No AI usage yet</div>}
                </div>
                <div style={S.section}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>AI by Feature</span><span style={{ fontSize:11, color:'#4A4A5A' }}>planner · search · checklist</span></div>
                  {data.aiByFeature?.length > 0 ? data.aiByFeature.map((f:any) => (
                    <BarRow key={f._id} label={f._id} count={f.count} max={Math.max(...data.aiByFeature.map((x:any)=>x.count))} color={f._id==='planner'?'#F59E0B':f._id==='checklist'?'#10B981':'#3B82F6'} />
                  )) : <div style={S.empty}>No AI usage yet</div>}
                </div>
              </div>

              {data.dailyUsers?.length > 0 && (
                <div style={{ ...S.section, marginBottom:20 }}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Daily New Users (Last 14 days)</span></div>
                  <div style={{ display:'flex', alignItems:'flex-end', gap:6, padding:'20px 20px 8px', height:110 }}>
                    {data.dailyUsers.map((d:any) => {
                      const max = Math.max(...data.dailyUsers.map((x:any)=>x.count),1)
                      return (
                        <div key={d._id} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                          <div title={`${d.count} users`} style={{ width:'100%', background:'#C0570A', borderRadius:'3px 3px 0 0', height:`${Math.max((d.count/max)*60, 4)}px`, transition:'height .3s', opacity:.85 }} />
                          <span style={{ fontSize:9, color:'#4A4A5A' }}>{d._id?.slice(5)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Top Pages</span><span style={{ fontSize:11, color:'#4A4A5A' }}>by views</span></div>
                {data.topPages?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>Page</th><th style={S.th}>Views</th><th style={S.th}>Avg Time</th></tr></thead>
                  <tbody>{data.topPages.map((p:any) => (
                    <tr key={p._id}><td style={S.td}>{p._id}</td><td style={S.td}>{fmt(p.views)}</td><td style={S.td}>{fmtT(Math.round(p.avg_sec||0))}</td></tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No page data yet</div>}
              </div>

              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Recent Registrations</span><span style={{ fontSize:11, color:'#4A4A5A' }}>latest 10</span></div>
                {data.recentUsers?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>Name</th><th style={S.th}>Email</th><th style={S.th}>Method</th><th style={S.th}>Joined</th><th style={S.th}></th></tr></thead>
                  <tbody>{data.recentUsers.map((u:any) => (
                    <tr key={u._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{u.name||'—'}</td>
                      <td style={{ ...S.td, color:'#94A3B8' }}>{u.email}</td>
                      <td style={S.td}><span style={{ padding:'2px 8px', borderRadius:100, fontSize:10, fontWeight:700, background:'rgba(255,255,255,.06)', color:'#D0D0E0' }}>{u.provider||'email'}</span></td>
                      <td style={{ ...S.td, color:'#64748B' }}>{ago(u.createdAt)}</td>
                      <td style={S.td}><button onClick={() => openUserDetail(u.email)} style={{ background:'none', border:'none', color:'#7A7A8A', cursor:'pointer', padding:4 }}><ChevronRight size={14}/></button></td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No users yet</div>}
              </div>
            </>)}

            {/* ══ USERS ══ */}
            {tab === 'users' && (
              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:13 }}>All Users ({data?.users?.length||0})</span>
                  <a href="/api/admin/export" style={{ ...S.btn('#C0570A'), textDecoration:'none' }}><Download size={13}/> Export CSV</a>
                </div>
                {data?.users?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>#</th><th style={S.th}>Name</th><th style={S.th}>Email</th><th style={S.th}>Method</th><th style={S.th}>Registered</th><th style={S.th}>Activity</th></tr></thead>
                  <tbody>{data.users.map((u:any, i:number) => (
                    <tr key={u._id}>
                      <td style={{ ...S.td, color:'#4A4A5A' }}>{i+1}</td>
                      <td style={{ ...S.td, fontWeight:600 }}>{u.name||'—'}</td>
                      <td style={{ ...S.td, color:'#94A3B8' }}>{u.email}</td>
                      <td style={S.td}><span style={{ padding:'2px 8px', borderRadius:100, fontSize:10, fontWeight:700, background:'rgba(255,255,255,.06)', color:'#D0D0E0' }}>{u.provider||'email'}</span></td>
                      <td style={{ ...S.td, color:'#64748B' }}>{dateStr(u.createdAt)}</td>
                      <td style={S.td}><button onClick={() => openUserDetail(u.email)} style={{ ...S.btn('#1E1E2E'), fontSize:11, padding:'4px 10px' }}>View <ChevronRight size={11}/></button></td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No users registered yet</div>}
              </div>
            )}

            {/* ══ TEMPLES ══ */}
            {tab === 'temples' && (
              <div style={S.section}>
                <div style={S.secHead}>
                  <span style={{ fontWeight:700, fontSize:13 }}>Temple Directory ({data?.temples?.length||0})</span>
                  <button style={S.btn('#C0570A')} onClick={openAddTemple}><Plus size={13}/> Add Temple</button>
                </div>
                {data?.temples?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>Name</th><th style={S.th}>State</th><th style={S.th}>Deity</th><th style={S.th}>Type</th><th style={S.th}>Live</th><th style={S.th}>Rating</th><th style={S.th}>Actions</th></tr></thead>
                  <tbody>{data.temples.map((t:any) => (
                    <tr key={t._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{t.name}</td>
                      <td style={{ ...S.td, color:'#94A3B8' }}>{t.state}</td>
                      <td style={S.td}>{t.deity}</td>
                      <td style={{ ...S.td, fontSize:11 }}>{t.type}</td>
                      <td style={S.td}>{t.has_live ? <span style={{ color:'#EF4444', fontSize:11 }}>● Live</span> : <span style={{ color:'#4A4A5A', fontSize:11 }}>○</span>}</td>
                      <td style={S.td}>{t.rating_avg > 0 ? `★ ${t.rating_avg}` : '—'}</td>
                      <td style={S.td}>
                        <div style={{ display:'flex', gap:8 }}>
                          <button onClick={() => openEditTemple(t)} style={{ background:'none', border:'none', color:'#7A7A8A', cursor:'pointer' }}><Pencil size={13}/></button>
                          <button onClick={() => deleteTemple(t._id, t.name)} style={{ background:'none', border:'none', color:'#EF4444', cursor:'pointer' }}><Trash2 size={13}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No temples. Add one above.</div>}
              </div>
            )}

            {/* ══ REVIEWS ══ */}
            {tab === 'reviews' && (
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Community Reviews ({data?.reviews?.length||0})</span><span style={{ fontSize:11, color:'#7A7A8A' }}>Delete inappropriate content</span></div>
                {data?.reviews?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>Temple</th><th style={S.th}>User</th><th style={S.th}>Rating</th><th style={S.th}>Review</th><th style={S.th}>Date</th><th style={S.th}>Action</th></tr></thead>
                  <tbody>{data.reviews.map((r:any) => (
                    <tr key={r._id}>
                      <td style={{ ...S.td, fontWeight:600, maxWidth:120 }}>{r.temple?.name||'—'}</td>
                      <td style={{ ...S.td, color:'#94A3B8', fontSize:11 }}>{r.user_name||'Anonymous'}</td>
                      <td style={S.td}>{'★'.repeat(r.rating||0)}</td>
                      <td style={{ ...S.td, maxWidth:260, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{r.comment||'—'}</td>
                      <td style={{ ...S.td, color:'#64748B' }}>{ago(r.createdAt)}</td>
                      <td style={S.td}><button onClick={() => deleteReview(r._id)} style={{ background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.2)', borderRadius:6, padding:'3px 8px', color:'#FCA5A5', fontSize:11, cursor:'pointer' }}>Delete</button></td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No reviews yet</div>}
              </div>
            )}

            {/* ══ SEARCHES ══ */}
            {tab === 'searches' && (
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Search Queries ({data?.searches?.length||0})</span><span style={{ fontSize:11, color:'#4A4A5A' }}>last {days} days</span></div>
                {data?.searches?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>Query</th><th style={S.th}>User</th><th style={S.th}>Provider</th><th style={S.th}>Speed</th><th style={S.th}>When</th></tr></thead>
                  <tbody>{data.searches.map((s:any) => (
                    <tr key={s._id}>
                      <td style={{ ...S.td, fontWeight:600, maxWidth:280, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{s.query}</td>
                      <td style={{ ...S.td, color:'#94A3B8', fontSize:11 }}>{s.user_email||'anon'}</td>
                      <td style={S.td}><span style={{ padding:'2px 8px', borderRadius:100, fontSize:10, fontWeight:700, background:'rgba(14,165,233,.12)', color:'#7DD3FC' }}>{s.provider}</span></td>
                      <td style={{ ...S.td, color:'#64748B' }}>{s.duration_ms}ms</td>
                      <td style={{ ...S.td, color:'#64748B' }}>{ago(s.createdAt)}</td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No searches logged yet</div>}
              </div>
            )}

            {/* ══ AI USAGE ══ */}
            {tab === 'ai' && (<>
              {data?.failed?.length > 0 && (
                <div style={{ ...S.section, borderColor:'rgba(239,68,68,.25)', marginBottom:16 }}>
                  <div style={{ ...S.secHead, background:'rgba(239,68,68,.05)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}><AlertTriangle size={14} color="#EF4444"/><span style={{ fontWeight:700, fontSize:13, color:'#EF4444' }}>Failed Requests ({data.failed.length})</span></div>
                  </div>
                  <table><thead><tr><th style={S.th}>Feature</th><th style={S.th}>Provider</th><th style={S.th}>User</th><th style={S.th}>Error</th><th style={S.th}>When</th></tr></thead>
                  <tbody>{data.failed.map((a:any) => (
                    <tr key={a._id}>
                      <td style={S.td}>{a.feature}</td><td style={S.td}>{a.provider}</td>
                      <td style={{ ...S.td, fontSize:11, color:'#94A3B8' }}>{a.user_email||'anon'}</td>
                      <td style={{ ...S.td, color:'#FCA5A5', fontSize:11 }}>{a.error_msg||'Unknown'}</td>
                      <td style={{ ...S.td, color:'#64748B' }}>{ago(a.createdAt)}</td>
                    </tr>
                  ))}</tbody></table>
                </div>
              )}
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>All AI Usage ({data?.ai?.length||0})</span><span style={{ fontSize:11, color:'#4A4A5A' }}>last {days} days</span></div>
                {data?.ai?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>Feature</th><th style={S.th}>Provider</th><th style={S.th}>User</th><th style={S.th}>Destination</th><th style={S.th}>Speed</th><th style={S.th}>Status</th><th style={S.th}>When</th></tr></thead>
                  <tbody>{data.ai.map((a:any) => (
                    <tr key={a._id}>
                      <td style={S.td}><span style={{ padding:'2px 8px', borderRadius:100, fontSize:10, fontWeight:700, background:'rgba(245,158,11,.12)', color:'#FCD34D' }}>{a.feature}</span></td>
                      <td style={S.td}><span style={{ padding:'2px 8px', borderRadius:100, fontSize:10, fontWeight:700, background:'rgba(124,58,237,.15)', color:'#A78BFA' }}>{a.provider}</span></td>
                      <td style={{ ...S.td, fontSize:11, color:'#94A3B8' }}>{a.user_email||'anon'}</td>
                      <td style={S.td}>{a.destination||'—'}</td>
                      <td style={{ ...S.td, color:'#64748B' }}>{a.duration_ms}ms</td>
                      <td style={S.td}><span style={{ fontSize:11, color: a.success ? '#34D399' : '#F87171' }}>{a.success ? '✓ OK' : '✗ Failed'}</span></td>
                      <td style={{ ...S.td, color:'#64748B' }}>{ago(a.createdAt)}</td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No AI usage yet</div>}
              </div>
            </>)}

            {/* ══ PAGE VIEWS ══ */}
            {tab === 'pageviews' && (<>
              {data?.topTemples?.length > 0 && (
                <div style={{ ...S.section, marginBottom:16 }}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Top Temple Pages</span><span style={{ fontSize:11, color:'#4A4A5A' }}>most visited</span></div>
                  {data.topTemples.map((t:any) => (
                    <BarRow key={t._id} label={t._id.replace('/temple/','')} count={t.views} max={Math.max(...data.topTemples.map((x:any)=>x.views))} color="#C0570A" />
                  ))}
                </div>
              )}
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>All Page Views ({data?.views?.length||0})</span></div>
                {data?.views?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>Page</th><th style={S.th}>User</th><th style={S.th}>Duration</th><th style={S.th}>Device</th><th style={S.th}>When</th></tr></thead>
                  <tbody>{data.views.map((v:any) => (
                    <tr key={v._id}>
                      <td style={{ ...S.td, fontWeight:600 }}>{v.page}</td>
                      <td style={{ ...S.td, fontSize:11, color:'#94A3B8' }}>{v.user_email||'anon'}</td>
                      <td style={S.td}>{fmtT(v.duration_sec||0)}</td>
                      <td style={{ ...S.td, color:'#64748B', textTransform:'capitalize' as any }}>{v.device||'—'}</td>
                      <td style={{ ...S.td, color:'#64748B' }}>{ago(v.createdAt)}</td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No page view data yet</div>}
              </div>
            </>)}

            {/* ══ FINVERSE ══ */}
            {tab === 'finverse' && (<>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:20 }}>
                <Stat label="Total Clicks" value={fmt(o.totalFinVerse)} sub={`last ${days} days`} icon={IndianRupee} color="#C0570A" accent />
                <Stat label="Total Users"  value={fmt(o.totalUsers)}   sub="registered users"    icon={Users}       color="#10B981" />
                <Stat label="Click Rate"   value={o.totalUsers > 0 ? `${Math.round((o.totalFinVerse/o.totalUsers)*100)}%` : '0%'} sub="of users clicked" icon={TrendingUp} color="#7C3AED" />
              </div>
              {data?.bySrc?.length > 0 && (
                <div style={{ ...S.section, marginBottom:16 }}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Clicks by Source</span></div>
                  {data.bySrc.map((s:any) => (
                    <BarRow key={s._id} label={s._id||'unknown'} count={s.count} max={Math.max(...data.bySrc.map((x:any)=>x.count))} color="#C0570A" />
                  ))}
                </div>
              )}
              <div style={S.section}>
                <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Click Log ({data?.clicks?.length||0})</span></div>
                {data?.clicks?.length > 0 ? (
                  <table><thead><tr><th style={S.th}>User</th><th style={S.th}>Source</th><th style={S.th}>Campaign</th><th style={S.th}>When</th></tr></thead>
                  <tbody>{data.clicks.map((c:any) => (
                    <tr key={c._id}>
                      <td style={{ ...S.td, fontSize:11, color:'#94A3B8' }}>{c.user_email||'anon'}</td>
                      <td style={S.td}>{c.source||'—'}</td>
                      <td style={{ ...S.td, color:'#64748B' }}>{c.campaign||'—'}</td>
                      <td style={{ ...S.td, color:'#64748B' }}>{ago(c.createdAt)}</td>
                    </tr>
                  ))}</tbody></table>
                ) : <div style={S.empty}>No FinVerse clicks yet. Clicks are tracked when users tap any FinVerse button.</div>}
              </div>
            </>)}

            {/* ══ ANNOUNCEMENT ══ */}
            {tab === 'announcement' && (
              <div style={S.grid2}>
                <div style={S.section}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Push Banner to All Users</span></div>
                  <div style={{ padding:20 }}>
                    <label style={S.label}>Message</label>
                    <textarea rows={4} placeholder="e.g. Navratri special: 9 Shakti Peetha circuit now live! Plan your yatra now." value={annForm.message} onChange={e => setAnnForm(f => ({...f, message:e.target.value}))} />
                    <label style={S.label}>Banner Type</label>
                    <select value={annForm.type} onChange={e => setAnnForm(f => ({...f, type:e.target.value}))} style={{ marginBottom:16, width:'100%' }}>
                      <option value="info">ℹ️ Info (blue)</option>
                      <option value="success">✅ Success (green)</option>
                      <option value="warning">⚠️ Warning (amber)</option>
                    </select>
                    <div style={{ display:'flex', gap:10 }}>
                      <button style={S.btn('#C0570A')} onClick={saveAnn}><Megaphone size={13}/> Publish</button>
                      <button style={S.btn('#2A2A35')} onClick={clearAnn}><X size={13}/> Clear Banner</button>
                    </div>
                  </div>
                </div>
                <div style={S.section}>
                  <div style={S.secHead}><span style={{ fontWeight:700, fontSize:13 }}>Live Preview</span></div>
                  <div style={{ padding:20 }}>
                    {annForm.message ? (
                      <div style={{ padding:'12px 16px', borderRadius:8, fontSize:13, background: annForm.type==='success' ? 'rgba(16,185,129,.1)' : annForm.type==='warning' ? 'rgba(245,158,11,.1)' : 'rgba(59,130,246,.1)', border:`1px solid ${annForm.type==='success' ? 'rgba(16,185,129,.25)' : annForm.type==='warning' ? 'rgba(245,158,11,.25)' : 'rgba(59,130,246,.25)'}`, color:'#F0F0F5', lineHeight:1.6 }}>
                        {annForm.message}
                      </div>
                    ) : <div style={S.empty}>Type a message to preview</div>}
                    <p style={{ fontSize:11, color:'#4A4A5A', marginTop:16, lineHeight:1.6 }}>
                      This banner appears at the top of every page for all logged-in users. Only one banner can be active at a time.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </>)}
        </div>
      </div>

      {/* ══ USER DETAIL MODAL ══ */}
      {modal === 'user_detail' && selected && (
        <Modal title={`User Activity — ${selected.email}`} onClose={() => setModal(null)}>
          <div style={{ padding:20 }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
              {[['Searches', selected.searches?.length||0], ['AI Requests', selected.ai?.length||0], ['Page Views', selected.pageviews?.length||0], ['FinVerse', selected.finverse?.length||0]].map(([l,v]:any) => (
                <div key={l} style={{ background:'#1E1E2E', borderRadius:8, padding:12, textAlign:'center' as any }}>
                  <div style={{ fontSize:22, fontWeight:700 }}>{v}</div>
                  <div style={{ fontSize:10, color:'#4A4A5A', textTransform:'uppercase' as any, letterSpacing:'.1em', marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
            {selected.searches?.length > 0 && <>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.1em', color:'#4A4A5A', marginBottom:8 }}>Top Searches</div>
              {selected.searches.slice(0,5).map((s:any) => (
                <div key={s._id} style={{ padding:'7px 0', borderBottom:'1px solid #1E1E2E', fontSize:12, display:'flex', justifyContent:'space-between' }}>
                  <span style={{ color:'#D0D0E0' }}>{s.query}</span><span style={{ color:'#4A4A5A' }}>{ago(s.createdAt)}</span>
                </div>
              ))}
            </>}
            {selected.pageviews?.length > 0 && <>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.1em', color:'#4A4A5A', margin:'16px 0 8px' }}>Pages Visited</div>
              {selected.pageviews.slice(0,5).map((v:any) => (
                <div key={v._id} style={{ padding:'7px 0', borderBottom:'1px solid #1E1E2E', fontSize:12, display:'flex', justifyContent:'space-between' }}>
                  <span style={{ color:'#D0D0E0' }}>{v.page}</span><span style={{ color:'#4A4A5A' }}>{fmtT(v.duration_sec||0)} · {ago(v.createdAt)}</span>
                </div>
              ))}
            </>}
            {selected.ai?.length > 0 && <>
              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase' as any, letterSpacing:'.1em', color:'#4A4A5A', margin:'16px 0 8px' }}>AI Usage</div>
              {selected.ai.slice(0,5).map((a:any) => (
                <div key={a._id} style={{ padding:'7px 0', borderBottom:'1px solid #1E1E2E', fontSize:12, display:'flex', justifyContent:'space-between' }}>
                  <span style={{ color:'#D0D0E0' }}>{a.feature} via {a.provider}{a.destination ? ` — ${a.destination}` : ''}</span>
                  <span style={{ color:'#4A4A5A' }}>{ago(a.createdAt)}</span>
                </div>
              ))}
            </>}
          </div>
        </Modal>
      )}

      {/* ══ TEMPLE FORM MODAL ══ */}
      {modal === 'temple_form' && (
        <Modal title={selected?._id ? `Edit — ${selected.name}` : 'Add New Temple'} onClose={() => setModal(null)}>
          <div style={{ padding:20 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px' }}>
              {([
                ['name','Temple Name *','text'], ['state','State *','text'], ['city','City *','text'],
                ['deity','Main Deity *','text'], ['type','Type (e.g. Jyotirlinga)','text'],
                ['timing','Timings','text'], ['best_time','Best Time to Visit','text'],
                ['dress_code','Dress Code','text'], ['festivals','Festivals','text'],
                ['live_url','Live Stream URL','text'], ['lat','Latitude','number'], ['lng','Longitude','number'],
              ] as [string,string,string][]).map(([k,pl,t]) => (
                <div key={k}>
                  <label style={S.label}>{pl}</label>
                  <input type={t} placeholder={pl} style={S.input} value={tForm[k]||''} onChange={e => setTForm((f:any) => ({...f,[k]:e.target.value}))} />
                </div>
              ))}
              <div style={{ gridColumn:'1/-1' }}>
                <label style={S.label}>Description *</label>
                <textarea rows={3} placeholder="Temple description — history, significance, what makes it special" value={tForm.description} onChange={e => setTForm((f:any) => ({...f,description:e.target.value}))} />
              </div>
              <div style={{ gridColumn:'1/-1', display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
                <input type="checkbox" checked={tForm.has_live} onChange={e => setTForm((f:any) => ({...f,has_live:e.target.checked}))} />
                <span style={{ fontSize:13, color:'#D0D0E0' }}>Has Live Darshan Stream</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              <button style={S.btn('#C0570A')} onClick={saveTemple}><Check size={13}/> {selected?._id ? 'Save Changes' : 'Add Temple'}</button>
              <button style={S.btn('#2A2A35')} onClick={() => setModal(null)}><X size={13}/> Cancel</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
