'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const NAV_GROUPS = [
  {
    id: 'explore',
    label: 'Explore',
    items: [
      { label: 'Live Darshan', desc: '56+ live temple streams', href: '/explore?tab=darshan', icon: '▶' },
      { label: 'Temple Directory', desc: '350 temples across India', href: '/explore', icon: '◈' },
      { label: 'Nearby Temples', desc: 'GPS-based discovery', href: '/explore?tab=nearby', icon: '◎' },
      { label: 'Pilgrimage Circuits', desc: '12 curated routes', href: '/circuits', icon: '⊕' },
      { label: 'This Month', desc: 'Best temples right now', href: '/explore?tab=seasonal', icon: '◷' },
    ],
  },
  {
    id: 'plan',
    label: 'Plan',
    items: [
      { label: 'Yatra Packages', desc: 'Curated pilgrimage circuits', href: '/packages', icon: '🛕' },
      { label: 'AI Planner', desc: 'Day-wise yatra itinerary', href: '/plan', icon: '→' },
      { label: 'Yatra Budget', desc: 'Detailed cost estimator', href: '/plan/budget', icon: '₹' },
      { label: 'Packing List', desc: 'Destination-specific', href: '/plan/checklist', icon: '✓' },
      { label: 'Festival Calendar', desc: 'Auspicious dates & events', href: '/plan/calendar', icon: '◈' },
    ],
  },
  {
    id: 'yatra',
    label: 'My Yatra',
    items: [
      { label: 'Savings Goal', desc: 'Monthly savings tracker', href: '/yatra/goals', icon: '◎' },
      { label: 'Group Split', desc: 'Who owes whom', href: '/yatra/split', icon: '÷' },
      { label: 'My Journal', desc: 'Visit log & photo diary', href: '/yatra/journal', icon: '✦' },
      { label: 'Temple Reviews', desc: 'Rate temples you visited', href: '/explore', icon: '★' },
    ],
  },
]

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeGroup, setActiveGroup] = useState<string | null>(null)

  const isGroupActive = (groupId: string) =>
    NAV_GROUPS.find(g => g.id === groupId)?.items.some(i => pathname.startsWith(i.href.split('?')[0]))

  return (
    <header className="sticky top-0 z-50 border-b"
      style={{ background: 'var(--crimson)', borderColor: 'rgba(255,255,255,.08)', boxShadow: '0 2px 8px rgba(18,10,6,.2)' }}>
      <div className="max-w-7xl mx-auto px-4 h-[52px] flex items-stretch">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mr-6 flex-shrink-0">
          <div className="w-7 h-7 rounded flex items-center justify-center text-sm font-serif font-bold"
            style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>🛕</div>
          <div>
            <div className="font-serif text-base font-semibold leading-none" style={{ color: 'var(--ivory)' }}>DivyaDarshan</div>
            <div className="text-[9px] tracking-widest uppercase leading-none mt-0.5" style={{ color: 'rgba(237,224,196,.4)' }}>Temple Explorer</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-stretch flex-1 gap-0">
          {NAV_GROUPS.map(group => (
            <div key={group.id} className="relative flex items-stretch"
              onMouseEnter={() => setActiveGroup(group.id)}
              onMouseLeave={() => setActiveGroup(null)}>
              <button className={cn(
                'flex items-center gap-1.5 px-4 h-full text-sm font-medium border-b-2 transition-all',
                isGroupActive(group.id)
                  ? 'border-b-amber-300 text-amber-300'
                  : 'border-b-transparent hover:text-white',
              )} style={{ color: isGroupActive(group.id) ? '' : 'rgba(255,255,255,.6)' }}>
                {group.label}
                <span className="text-[8px] opacity-60">▾</span>
              </button>

              {/* Dropdown */}
              <div className={cn(
                'absolute top-full left-0 min-w-[220px] py-1.5 rounded-b-xl transition-all duration-150',
                activeGroup === group.id ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1',
              )} style={{
                background: 'var(--white)',
                border: '1px solid var(--border)',
                borderTop: '2px solid var(--crimson)',
                boxShadow: '0 8px 24px rgba(18,10,6,.13)',
              }}>
                {group.items.map(item => (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-ivory-100 transition-colors"
                    onClick={() => setActiveGroup(null)}>
                    <span className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: 'var(--ivory2)', color: 'var(--crimson)' }}>
                      {item.icon}
                    </span>
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{item.label}</div>
                      <div className="text-xs" style={{ color: 'var(--muted2)' }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-2">
          {session ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors"
                style={{ color: 'rgba(255,255,255,.8)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden"
                  style={{ background: 'var(--gold-lt)', color: 'var(--crimson)' }}>
                  {session.user?.image
                    ? <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                    : (session.user?.name?.[0] || 'U')}
                </div>
                <span className="hidden md:block text-sm">{session.user?.name?.split(' ')[0]}</span>
              </button>
              {/* User dropdown */}
              <div className="absolute right-0 top-full pt-1 hidden group-hover:block">
                <div className="py-1 rounded-xl min-w-[160px]" style={{
                  background: 'var(--white)', border: '1px solid var(--border)', boxShadow: '0 8px 24px rgba(18,10,6,.13)',
                }}>
                  <Link href="/yatra" className="block px-4 py-2 text-sm hover:bg-ivory-100" style={{ color: 'var(--ink)' }}>My Yatra</Link>
                  <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-ivory-100" style={{ color: 'var(--ink)' }}>Profile</Link>
                  <hr style={{ borderColor: 'var(--border)' }} />
                  <button onClick={() => signOut()} className="block w-full text-left px-4 py-2 text-sm hover:bg-ivory-100" style={{ color: 'var(--live)' }}>Sign out</button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/auth/signin" className="btn btn-sm px-4 py-1.5 text-xs rounded-lg font-medium"
              style={{ background: 'rgba(237,217,163,.15)', color: '#EDD9A3', border: '1px solid rgba(237,217,163,.25)' }}>
              Sign in
            </Link>
          )}

          {/* Mobile menu button */}
          <button className="md:hidden p-2" style={{ color: 'rgba(255,255,255,.7)' }}
            onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t" style={{ background: 'var(--crim-dk)', borderColor: 'rgba(255,255,255,.08)' }}>
          {NAV_GROUPS.map(group => (
            <div key={group.id}>
              <div className="px-4 py-2 text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(237,224,196,.4)' }}>
                {group.label}
              </div>
              {group.items.map(item => (
                <Link key={item.href} href={item.href}
                  className="flex items-center gap-3 px-6 py-2.5 text-sm"
                  style={{ color: 'rgba(237,224,196,.75)' }}
                  onClick={() => setMobileOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          {!session && (
            <div className="px-4 py-3 border-t" style={{ borderColor: 'rgba(255,255,255,.08)' }}>
              <Link href="/auth/signin" className="btn btn-primary w-full text-center block"
                onClick={() => setMobileOpen(false)}>Sign in</Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
