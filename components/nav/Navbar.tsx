"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const PAGE_GROUP: Record<string, string> = {
  "/explore": "Explore", "/temple": "Explore", "/circuits": "Explore", "/calendar": "Explore",
  "/plan": "Plan", "/plan/checklist": "Plan", "/plan/budget": "Plan",
  "/yatra/journal": "My Yatra", "/yatra/goals": "My Yatra",
  "/yatra/split": "My Yatra", "/yatra/group": "My Yatra", "/profile": "My Yatra",
  "/admin-request": "My Yatra",
};

const NAV_GROUPS = [
  {
    label: "Explore",
    items: [
      { href: "/explore", label: "Temple Directory", desc: "Browse 350+ sacred temples" },
      { href: "/circuits", label: "Pilgrimage Circuits", desc: "Curated yatra routes" },
      { href: "/calendar", label: "Festival Calendar", desc: "Upcoming festivals & events" },
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
      { href: "/admin-request", label: "Admin Access", desc: "Request admin panel access" },
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
        <div style={{ display: 'flex', alignItems: 'center', height: 64, gap: 8 }}>

          {/* Logo */}
          <Link href="/" style={{ marginRight: 32, textDecoration: 'none', flexShrink: 0 }}>
            <Logo variant="horizontal" size="md" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 2, flex: 1 }}>
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

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}
            style={{ marginLeft: 'auto', padding: 8, borderRadius: 8, border: '1.5px solid #E8E8E8', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {mobileOpen ? <X size={18} color="#333" /> : <Menu size={18} color="#333" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: '#FFFFFF', borderTop: '1.5px solid #E8E8E8', padding: '12px 24px 20px' }}>
          <div style={{ paddingBottom: 16, marginBottom: 8, borderBottom: '1px solid #F0F0F0' }}>
            <Logo variant="horizontal" size="sm" />
          </div>
          {NAV_GROUPS.map((group) => (
            <div key={group.label} style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#AAAAAA', padding: '8px 4px 4px' }}>{group.label}</p>
              {group.items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', padding: '10px 12px', borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: 'none', color: pathname === item.href ? '#8B1A1A' : '#333333', background: pathname === item.href ? '#FFF5F5' : 'transparent', marginBottom: 2 }}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <div style={{ borderTop: '1.5px solid #E8E8E8', paddingTop: 16, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {session
              ? <button onClick={() => signOut()} style={{ width: '100%', padding: '12px', borderRadius: 8, border: '1.5px solid #E8E8E8', background: 'white', cursor: 'pointer', fontSize: 15, color: '#DC2626', fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Sign out</button>
              : <>
                  <Link href="/auth/signin" onClick={() => setMobileOpen(false)} style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 8, border: '1.5px solid #E8E8E8', fontSize: 15, color: '#333333', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
                  <Link href="/auth/signup" onClick={() => setMobileOpen(false)} style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 8, background: '#8B1A1A', fontSize: 15, color: 'white', fontWeight: 600, textDecoration: 'none' }}>Get started</Link>
                </>
            }
          </div>
        </div>
      )}
    </nav>
  );
}
