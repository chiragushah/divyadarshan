"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo"
import GoogleTranslate from "@/components/translate/GoogleTranslate";

const PAGE_GROUP: Record<string, string> = {
  "/explore": "Explore", "/temple": "Explore", "/circuits": "Explore", "/calendar": "Explore",
  "/plan": "Plan", "/plan/checklist": "Plan", "/plan/budget": "Plan",
  "/yatra/journal": "My Yatra", "/yatra/goals": "My Yatra",
  "/yatra/split": "My Yatra", "/yatra/group": "My Yatra", "/profile": "My Yatra",
  "/admin-request": "My Yatra",
  "/yatra/manage": "My Yatra",
};

const NAV_GROUPS = [
  {
    label: "Explore",
    items: [
      { href: "/explore", label: "Temple Directory", desc: "Browse 350+ sacred temples" },
      { href: "/circuits", label: "Pilgrimage Circuits", desc: "Curated yatra routes" },
      { href: "/plan/calendar", label: "Festival Calendar", desc: "Upcoming festivals & events" },
    ],
  },
  {
    label: "Plan",
    items: [
      { href: "/plan", label: "AI Yatra Planner", desc: "Personalised pilgrimage plan" },
      { href: "/plan/checklist", label: "Packing Checklist", desc: "What to carry for your yatra" },
      { href: "/plan/budget", label: "Budget Calculator", desc: "Estimate your yatra costs" },
    ],
  },
  {
    label: "My Yatra",
    items: [
      { href: "/yatra/journal", label: "My Journal", desc: "Document your yatra memories" },
      { href: "/yatra/goals", label: "Savings Goals", desc: "Save for your next pilgrimage" },
      { href: "/yatra/group", label: "Group Yatras", desc: "Travel together from any city" },
      { href: "/yatra/split", label: "Group Split", desc: "Split travel expenses" },
      { href: "/profile", label: "My Profile", desc: "Visits, recommendations & goals" },
      { href: "/yatra/manage", label: "My Yatra Plans", desc: "Manage your group yatras" },
      { href: "/admin-request", label: "Become Organiser", desc: "Create group yatras for pilgrims" },
    ],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeGroup = PAGE_GROUP[pathname] ??
    Object.entries(PAGE_GROUP).find(([key]) => pathname.startsWith(key))?.[1] ?? null;

  return (
    <nav style={{ background: '#FFFFFF', borderBottom: '1.5px solid #E8E8E8', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 3px rgba(0,0,0,.04)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 96, gap: 8 }}>

          {/* Logo */}
          <Link href="/" style={{ marginRight: 32, textDecoration: 'none', flexShrink: 0 }}>
            <Logo variant="horizontal" size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 2, flex: 1 }}>
            <Link href="/manifest" style={{ display:'flex', alignItems:'center', gap:6, padding:'8px 14px', borderRadius:9, background:'linear-gradient(135deg,rgba(139,26,26,0.08),rgba(192,87,10,0.08))', border:'1px solid rgba(139,26,26,0.15)', color:'var(--crimson)', fontWeight:700, fontSize:13, textDecoration:'none', whiteSpace:'nowrap' as const }}>
              🙏 Manifest
            </Link>
            {NAV_GROUPS.map((group) => (
              <div key={group.label} style={{ position: 'relative' }}
                onMouseEnter={() => setOpenGroup(group.label)}
                onMouseLeave={() => setOpenGroup(null)}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px',
                  borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: activeGroup === group.label ? '#FFF5F5' : 'transparent',
                  color: activeGroup === group.label ? '#8B1A1A' : '#555555',
                  fontWeight: activeGroup === group.label ? 600 : 500,
                  fontSize: 14, fontFamily: "'Inter', sans-serif", transition: 'all 0.15s',
                }}>
                  {group.label}
                  <ChevronDown size={13} style={{ transform: openGroup === group.label ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', opacity: 0.6 }} />
                </button>

                {openGroup === group.label && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, marginTop: 4,
                    width: 240, background: '#FFFFFF', border: '1.5px solid #E8E8E8',
                    borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.1)', padding: '6px', zIndex: 100,
                  }}>
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} style={{
                        display: 'flex', flexDirection: 'column', padding: '10px 12px',
                        borderRadius: 8, textDecoration: 'none',
                        background: pathname === item.href ? '#FFF5F5' : 'transparent', transition: 'background 0.1s',
                      }}
                        onMouseEnter={e => { if (pathname !== item.href) (e.currentTarget as HTMLElement).style.background = '#FAFAFA' }}
                        onMouseLeave={e => { if (pathname !== item.href) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: pathname === item.href ? '#8B1A1A' : '#111111' }}>{item.label}</span>
                        <span style={{ fontSize: 12, color: '#AAAAAA', marginTop: 1 }}>{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            {session ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Link href="/profile" style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                  borderRadius: 100, border: '1.5px solid #E8E8E8', textDecoration: 'none',
                  fontSize: 13, fontWeight: 500, color: '#333333', background: '#FFFFFF',
                }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8B1A1A, #C0570A)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: 'white', overflow: 'hidden',
                  }}>
                    {session.user?.image
                      ? <img src={session.user.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                      : (session.user?.name?.[0] || 'U')}
                  </div>
                  {session.user?.name?.split(' ')[0]}
                </Link>
                <button onClick={() => signOut()} style={{
                  padding: '6px 14px', borderRadius: 8, border: '1.5px solid #E8E8E8',
                  background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#888888',
                  fontFamily: "'Inter', sans-serif", fontWeight: 500,
                }}>Sign out</button>
              </div>
            ) : (
              <>
                <Link href="/auth/signin" style={{ padding: '8px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, color: '#555555', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>Sign in</Link>
                <Link href="/auth/signup" style={{ padding: '8px 18px', borderRadius: 8, fontSize: 14, fontWeight: 600, background: '#8B1A1A', color: 'white', textDecoration: 'none', fontFamily: "'Inter', sans-serif", border: '1.5px solid #8B1A1A' }}>Get started</Link>
              </>
            )}
          </div>

          {/* Google Translate */}
          <div className="hidden md:flex" style={{ alignItems: 'center', marginLeft: 8 }}>
            <GoogleTranslate />
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ marginLeft: 'auto', padding: 8, borderRadius: 8, border: '1.5px solid #E8E8E8', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {mobileOpen ? <X size={18} color="#333" /> : <Menu size={18} color="#333" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: '#FFFFFF', borderTop: '1.5px solid #E8E8E8', padding: '12px 24px 20px', maxHeight: '85vh', overflowY: 'auto' }}>
          <div style={{ paddingBottom: 16, marginBottom: 8, borderBottom: '1px solid #F0F0F0' }}>
            <Logo variant="horizontal" size="sm" />
          </div>

          {/* Manifest — prominent on mobile */}
          <Link href="/manifest" onClick={() => setMobileOpen(false)}
            style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 16px', borderRadius:12, background:'linear-gradient(135deg,rgba(139,26,26,0.08),rgba(192,87,10,0.08))', border:'1.5px solid rgba(139,26,26,0.2)', textDecoration:'none', marginBottom:16 }}>
            <span style={{ fontSize:22 }}>🙏</span>
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:'var(--crimson)' }}>Manifest — Sankalp</div>
              <div style={{ fontSize:11, color:'#A89B8C' }}>Sacred intentions with deity guidance</div>
            </div>
          </Link>

          {/* Nav groups */}
          {NAV_GROUPS.map((group) => (
            <div key={group.label} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#AAAAAA', padding: '8px 4px 4px' }}>{group.label}</p>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px', textDecoration: 'none', borderBottom: '1px solid #F8F8F8' }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: '#1A1A1A' }}>{item.label}</div>
                    {item.desc && <div style={{ fontSize: 12, color: '#AAAAAA', marginTop: 1 }}>{item.desc}</div>}
                  </div>
                </Link>
              ))}
            </div>
          ))}

          {/* Contribute button on mobile */}
          <button
            onClick={() => { setMobileOpen(false); document.querySelector('[data-contribution-btn]')?.click() }}
            style={{ width:'100%', padding:'12px 0', borderRadius:12, border:'none', background:'linear-gradient(135deg,#8B1A1A,#C0570A)', color:'white', fontWeight:700, fontSize:14, cursor:'pointer', marginBottom:12, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            💛 Contribute to DivyaDarshan
          </button>

          {/* Language Selector on mobile */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '.08em', color: '#AAAAAA', marginBottom: 8 }}>🌐 Select Language</div>
            <GoogleTranslate />
          </div>

          {/* PWA Install button on mobile */}
          <div id="mobile-pwa-install" style={{ marginBottom:12 }} />

          {/* Auth section */}
          <div style={{ paddingTop: 16, borderTop: '1px solid #F0F0F0' }}>
            {session?.user ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--crimson)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                    {(session.user.name || session.user.email || 'U')[0].toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#1A1A1A' }}>{session.user.name || 'Pilgrim'}</div>
                    <div style={{ fontSize: 12, color: '#AAAAAA' }}>{session.user.email}</div>
                  </div>
                </div>
                <Link href="/profile" onClick={() => setMobileOpen(false)} style={{ display:'block', padding:'10px 0', fontSize:14, color:'#1A1A1A', textDecoration:'none', borderBottom:'1px solid #F8F8F8' }}>My Profile</Link>
                <Link href="/yatra/journal" onClick={() => setMobileOpen(false)} style={{ display:'block', padding:'10px 0', fontSize:14, color:'#1A1A1A', textDecoration:'none', borderBottom:'1px solid #F8F8F8' }}>My Journal</Link>
                <Link href="/manifest/my-sankalpas" onClick={() => setMobileOpen(false)} style={{ display:'block', padding:'10px 0', fontSize:14, color:'#1A1A1A', textDecoration:'none', borderBottom:'1px solid #F8F8F8' }}>My Sankalpas</Link>
                <button onClick={() => { signOut(); setMobileOpen(false) }}
                  style={{ width:'100%', marginTop:12, padding:'10px 0', borderRadius:10, border:'1.5px solid #E8E8E8', background:'white', color:'#666', fontSize:14, cursor:'pointer', fontFamily:'inherit' }}>
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display:'flex', gap:10 }}>
                <Link href="/auth/signin" onClick={() => setMobileOpen(false)} style={{ flex:1, padding:'11px 0', borderRadius:10, border:'1.5px solid #E8E8E8', background:'white', color:'#1A1A1A', fontSize:14, fontWeight:600, textDecoration:'none', textAlign:'center' }}>Sign In</Link>
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)} style={{ flex:1, padding:'11px 0', borderRadius:10, border:'none', background:'var(--crimson)', color:'white', fontSize:14, fontWeight:700, textDecoration:'none', textAlign:'center' }}>Sign Up Free</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
