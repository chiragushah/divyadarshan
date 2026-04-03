import Link from 'next/link'
import Logo from '@/components/Logo'

export default function Footer() {
  return (
    <footer style={{
      background: '#FFFFFF',
      borderTop: '1.5px solid #E8E8E8',
      padding: '48px 24px 32px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>

          {/* Brand column */}
          <div>
            <Logo variant="horizontal" size="md" />
            <p style={{
              marginTop: 16, fontSize: 14, color: '#888888', lineHeight: 1.7, maxWidth: 280,
              fontFamily: "'Inter', sans-serif",
            }}>
              India's most complete temple discovery platform. Explore 356+ sacred temples, plan pilgrimages and track your yatra journey.
            </p>
            {/* Tagline */}
            <p style={{ marginTop: 12, fontSize: 12, color: '#C0570A', fontFamily: "'Inter', sans-serif", letterSpacing: '0.05em' }}>
              🙏 Jai Shree Ram
            </p>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#AAAAAA', marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
              Explore
            </p>
            {[
              { href: '/explore', label: 'Temple Directory' },
              { href: '/circuits', label: 'Pilgrimage Circuits' },
              { href: '/calendar', label: 'Festival Calendar' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', fontSize: 14, color: '#555555', textDecoration: 'none', marginBottom: 10, fontFamily: "'Inter', sans-serif", transition: 'color 0.15s' }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Plan */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#AAAAAA', marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
              Plan
            </p>
            {[
              { href: '/plan', label: 'AI Yatra Planner' },
              { href: '/plan/budget', label: 'Budget Calculator' },
              { href: '/plan/checklist', label: 'Packing Checklist' },
              { href: '/yatra/group', label: 'Group Yatras' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', fontSize: 14, color: '#555555', textDecoration: 'none', marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* My Yatra */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#AAAAAA', marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
              My Yatra
            </p>
            {[
              { href: '/profile', label: 'My Profile' },
              { href: '/yatra/goals', label: 'Savings Goals' },
              { href: '/yatra/journal', label: 'My Journal' },
              { href: '/yatra/split', label: 'Group Split' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'block', fontSize: 14, color: '#555555', textDecoration: 'none', marginBottom: 10, fontFamily: "'Inter', sans-serif" }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo variant="mark" size="sm" />
            <p style={{ fontSize: 13, color: '#AAAAAA', fontFamily: "'Inter', sans-serif" }}>
              © {new Date().getFullYear()} DivyaDarshan. Built with 🙏 by Dynaimers Consulting.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy', 'Terms', 'Contact'].map(l => (
              <Link key={l} href="#" style={{ fontSize: 13, color: '#AAAAAA', textDecoration: 'none', fontFamily: "'Inter', sans-serif" }}>{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
