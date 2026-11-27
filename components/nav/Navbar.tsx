"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import GoogleTranslate from "@/components/translate/GoogleTranslate";
import GaneshaStrip from "@/components/nav/GaneshaStrip";

type Item = { href: string; label: string; desc: string };
type Group = { label: string; items?: Item[]; href?: string; also?: string[] };

const NAV: Group[] = [
  { label: "Temples", also: ["/temple"], items: [
    { href: "/explore",          label: "Temple directory",    desc: "Search and filter temples across India" },
    { href: "/circuits",         label: "Pilgrimage circuits", desc: "Char Dham, Jyotirlingas and other classic routes" },
    { href: "/circuits/builder", label: "Circuit builder",     desc: "Build a route from any city" },
  ]},
  { label: "Festivals", items: [
    { href: "/festivals",          label: "Festival guides",       desc: "Rituals, customs and temples for each festival" },
    { href: "/festivals/upcoming", label: "Upcoming festivals",    desc: "Dates and calendar reminders" },
    { href: "/plan/calendar",      label: "Month-by-month guide",  desc: "Where to go and when" },
    { href: "/festivals/prasad",   label: "Prasad recipes",        desc: "Regional recipes with scaling and shopping lists" },
  ]},
  { label: "Plan", items: [
    { href: "/plan",           label: "AI yatra planner",   desc: "A day-by-day itinerary for your trip" },
    { href: "/plan/checklist", label: "Packing checklist",  desc: "What to carry for your destination" },
    { href: "/plan/budget",    label: "Budget calculator",  desc: "Estimate costs and savings time" },
    { href: "/packages",       label: "Yatra packages",     desc: "Curated trips and custom requests" },
  ]},
  { label: "Manifest", href: "/manifest", also: ["/manifest"] },
  { label: "Kuldevi",  href: "/kuldevi",  also: ["/kuldevi"] },
  { label: "My Yatra", items: [
    { href: "/yatra/journal", label: "Journal",         desc: "Record the temples you visit" },
    { href: "/yatra/goals",   label: "Savings goals",   desc: "Save towards your next yatra" },
    { href: "/yatra/group",   label: "Group yatras",    desc: "Join a trip with other pilgrims" },
    { href: "/yatra/split",   label: "Group expenses",  desc: "Split costs fairly" },
    { href: "/yatra/manage",  label: "My group yatras", desc: "Manage trips you organise" },
    { href: "/admin-request", label: "Become an organiser", desc: "Apply to create group yatras" },
  ]},
];

const ALL_ITEMS: Item[] = NAV.flatMap((g) => g.items ?? []);

// Longest matching href wins, so /festivals/prasad highlights Prasad recipes, not Festival guides.
function matches(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}
function bestItem(pathname: string): string | null {
  let best: string | null = null;
  for (const it of ALL_ITEMS) {
    if (matches(pathname, it.href) && (!best || it.href.length > best.length)) best = it.href;
  }
  return best;
}
function groupActive(g: Group, pathname: string, best: string | null) {
  if (g.href && matches(pathname, g.href)) return true;
  if (g.also?.some((p) => matches(pathname, p))) return true;
  return !!best && !!g.items?.some((i) => i.href === best);
}

const css = `
.dd-nav a, .dd-nav button { font-family: inherit; }
.dd-top { position: relative; display: inline-flex; align-items: center; gap: 4px; height: 72px; padding: 0 14px; background: none; border: 0; cursor: pointer; font-size: 14px; font-weight: 500; color: #3a3631; text-decoration: none; white-space: nowrap; }
.dd-top::after { content: ""; position: absolute; left: 14px; right: 14px; bottom: 0; height: 2px; background: transparent; }
.dd-top:hover, .dd-top[aria-expanded="true"] { color: #8B1A1A; }
.dd-top[data-active="true"] { color: #8B1A1A; font-weight: 600; }
.dd-top[data-active="true"]::after { background: #8B1A1A; }
.dd-top:focus-visible, .dd-item:focus-visible, .dd-ghost:focus-visible { outline: 2px solid #8B1A1A; outline-offset: -2px; border-radius: 4px; }
.dd-panel { position: absolute; top: 100%; left: 0; min-width: 300px; background: #fff; border: 1px solid #e6e1d9; border-top: 2px solid #8B1A1A; border-radius: 0 0 6px 6px; box-shadow: 0 12px 28px rgba(30,20,10,.10); padding: 6px 0; z-index: 100; }
.dd-panel.right { left: auto; right: 0; min-width: 220px; }
.dd-item { display: block; padding: 9px 18px; text-decoration: none; border-left: 2px solid transparent; }
.dd-item:hover { background: #f8f6f2; }
.dd-item[aria-current="page"] { border-left-color: #8B1A1A; background: #faf7f3; }
.dd-item .t { display: block; font-size: 14px; font-weight: 500; color: #1f1c18; }
.dd-item .d { display: block; font-size: 12.5px; color: #7a7368; margin-top: 1px; line-height: 1.35; }
.dd-item[aria-current="page"] .t { color: #8B1A1A; }
.dd-ghost { background: none; border: 0; cursor: pointer; font-size: 14px; font-weight: 500; color: #3a3631; padding: 8px 12px; text-decoration: none; }
.dd-ghost:hover { color: #8B1A1A; }
.dd-cta { display: inline-block; padding: 8px 16px; border-radius: 4px; background: #8B1A1A; color: #fff; font-size: 14px; font-weight: 600; text-decoration: none; }
.dd-cta:hover { background: #741515; }
.dd-div { width: 1px; height: 22px; background: #e6e1d9; margin: 0 6px; }
.dd-m-head { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 14px 2px; background: none; border: 0; border-bottom: 1px solid #eee9e1; font-size: 15px; font-weight: 600; color: #1f1c18; cursor: pointer; text-align: left; }
.dd-m-link { display: block; padding: 14px 2px; border-bottom: 1px solid #eee9e1; font-size: 15px; font-weight: 600; color: #1f1c18; text-decoration: none; }
.dd-m-sub { display: block; padding: 10px 2px 10px 14px; font-size: 14px; color: #3a3631; text-decoration: none; }
.dd-m-sub[aria-current="page"] { color: #8B1A1A; font-weight: 600; }
@media (prefers-reduced-motion: reduce) { .dd-nav * { transition: none !important; } }
`;

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const best = bestItem(pathname);

  // Close menus on navigation, outside click and Escape.
  useEffect(() => { setOpen(null); setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] || "Account";
  const accountItems: Item[] = [
    { href: "/profile", label: "Profile", desc: "" },
    { href: "/manifest/my-sankalpas", label: "My Sankalpas", desc: "" },
    { href: "/yatra/journal", label: "Journal", desc: "" },
  ];

  return (
    <>
      <GaneshaStrip />
      <nav className="dd-nav" aria-label="Main" style={{ background: "#FFFFFF", borderBottom: "1px solid #e6e1d9", position: "sticky", top: 0, zIndex: 50 }}>
        <style>{css}</style>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", height: 72 }}>

            <Link href="/" aria-label="DivyaDarshanam home" style={{ marginRight: 28, textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }}>
              <Logo variant="horizontal" size="sm" />
            </Link>

            <div ref={barRef} className="hidden md:flex" style={{ alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                {NAV.map((g) => {
                  const active = groupActive(g, pathname, best);
                  if (!g.items) {
                    return (
                      <Link key={g.label} href={g.href!} className="dd-top" data-active={active} aria-current={active ? "page" : undefined}>
                        {g.label}
                      </Link>
                    );
                  }
                  const isOpen = open === g.label;
                  return (
                    <div key={g.label} style={{ position: "relative" }} onMouseEnter={() => setOpen(g.label)} onMouseLeave={() => setOpen(null)}>
                      <button className="dd-top" data-active={active} aria-haspopup="true" aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : g.label)}>
                        {g.label}
                        <ChevronDown size={14} aria-hidden style={{ opacity: .55, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
                      </button>
                      {isOpen && (
                        <div className="dd-panel" role="menu">
                          {g.items.map((it) => (
                            <Link key={it.href} href={it.href} role="menuitem" className="dd-item" aria-current={best === it.href ? "page" : undefined}>
                              <span className="t">{it.label}</span>
                              <span className="d">{it.desc}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: "flex", alignItems: "center", marginLeft: "auto", gap: 4 }}>
                <GoogleTranslate />
                <span className="dd-div" aria-hidden />
                {session ? (
                  <div style={{ position: "relative" }} onMouseEnter={() => setOpen("account")} onMouseLeave={() => setOpen(null)}>
                    <button className="dd-ghost" aria-haspopup="true" aria-expanded={open === "account"} onClick={() => setOpen(open === "account" ? null : "account")}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 72 }}>
                      <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#8B1A1A", color: "#fff", fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        {session.user?.image ? <img src={session.user.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : (session.user?.name?.[0] || "U").toUpperCase()}
                      </span>
                      {firstName}
                      <ChevronDown size={14} aria-hidden style={{ opacity: .55 }} />
                    </button>
                    {open === "account" && (
                      <div className="dd-panel right" role="menu">
                        {accountItems.map((it) => (
                          <Link key={it.href} href={it.href} role="menuitem" className="dd-item" aria-current={pathname === it.href ? "page" : undefined}>
                            <span className="t">{it.label}</span>
                          </Link>
                        ))}
                        <div style={{ borderTop: "1px solid #eee9e1", margin: "6px 0" }} />
                        <button role="menuitem" onClick={() => signOut()} className="dd-item" style={{ width: "100%", textAlign: "left", background: "none", border: 0, borderLeft: "2px solid transparent", cursor: "pointer" }}>
                          <span className="t">Sign out</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/auth/signin" className="dd-ghost">Sign in</Link>
                    <Link href="/auth/signup" className="dd-cta">Create account</Link>
                  </>
                )}
              </div>
            </div>

            <button className="flex md:hidden" aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ marginLeft: "auto", padding: 8, borderRadius: 4, border: "1px solid #e6e1d9", background: "#fff", cursor: "pointer", alignItems: "center" }}>
              {mobileOpen ? <X size={20} color="#333" /> : <Menu size={20} color="#333" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: "#fff", borderTop: "1px solid #e6e1d9", padding: "4px 24px 20px", maxHeight: "calc(100vh - 110px)", overflowY: "auto" }}>
            {NAV.map((g) => {
              if (!g.items) {
                return <Link key={g.label} href={g.href!} className="dd-m-link" onClick={() => setMobileOpen(false)}>{g.label}</Link>;
              }
              const isOpen = mobileGroup === g.label;
              return (
                <div key={g.label}>
                  <button className="dd-m-head" aria-expanded={isOpen} onClick={() => setMobileGroup(isOpen ? null : g.label)}>
                    {g.label}
                    <ChevronDown size={16} aria-hidden style={{ opacity: .6, transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "2px 0 8px", borderBottom: "1px solid #eee9e1" }}>
                      {g.items.map((it) => (
                        <Link key={it.href} href={it.href} className="dd-m-sub" aria-current={best === it.href ? "page" : undefined} onClick={() => setMobileOpen(false)}>{it.label}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div style={{ padding: "16px 0 12px", borderBottom: "1px solid #eee9e1" }}>
              <div style={{ fontSize: 12, color: "#7a7368", marginBottom: 8 }}>Language</div>
              <GoogleTranslate />
            </div>
            <div id="mobile-pwa-install" style={{ marginTop: 12 }} />
            <button onClick={() => { setMobileOpen(false); (document.querySelector("[data-contribution-btn]") as HTMLElement)?.click(); }}
              style={{ width: "100%", margin: "14px 0 0", padding: "11px 0", borderRadius: 4, border: "1px solid #8B1A1A", background: "#fff", color: "#8B1A1A", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
              Contribute to DivyaDarshanam
            </button>

            <div style={{ paddingTop: 16 }}>
              {session?.user ? (
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#1f1c18" }}>{session.user.name || "Pilgrim"}</div>
                  <div style={{ fontSize: 12.5, color: "#7a7368", marginBottom: 6 }}>{session.user.email}</div>
                  {accountItems.map((it) => (
                    <Link key={it.href} href={it.href} className="dd-m-sub" style={{ paddingLeft: 0 }} onClick={() => setMobileOpen(false)}>{it.label}</Link>
                  ))}
                  <button onClick={() => { signOut(); setMobileOpen(false); }}
                    style={{ width: "100%", marginTop: 10, padding: "11px 0", borderRadius: 4, border: "1px solid #d9d3c8", background: "#fff", color: "#3a3631", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>Sign out</button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: 10 }}>
                  <Link href="/auth/signin" onClick={() => setMobileOpen(false)} style={{ flex: 1, padding: "11px 0", borderRadius: 4, border: "1px solid #d9d3c8", color: "#1f1c18", fontSize: 14, fontWeight: 600, textDecoration: "none", textAlign: "center" }}>Sign in</Link>
                  <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="dd-cta" style={{ flex: 1, textAlign: "center", padding: "11px 0" }}>Create account</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
