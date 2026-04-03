// DivyaDarshan Logo — tilak mark + wordmark
// Usage: <Logo /> | <Logo variant="mark" /> | <Logo variant="horizontal" size="sm" />

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const SIZES = {
  sm:  { mark: 24, text: 15, sub: 7,  gap: 8  },
  md:  { mark: 32, text: 20, sub: 9,  gap: 10 },
  lg:  { mark: 48, text: 28, sub: 11, gap: 14 },
}

// The tilak mark — pure SVG, no emoji
function TilakMark({ size = 32 }: { size?: number }) {
  const s = size / 32 // scale factor
  const w = size
  const h = size * 1.3

  return (
    <svg width={w} height={h} viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left stroke */}
      <path
        d="M 11 38 C 9.5 28 9 20 10 10 C 11 4 12 1.5 12.5 0"
        stroke="#8B1A1A" strokeWidth="2.8" strokeLinecap="round"
      />
      {/* Right stroke */}
      <path
        d="M 21 38 C 22.5 28 23 20 22 10 C 21 4 20 1.5 19.5 0"
        stroke="#8B1A1A" strokeWidth="2.8" strokeLinecap="round"
      />
      {/* Dot — bindu */}
      <circle cx="16" cy="-2" r="4.5" fill="#C0570A" opacity="0.12"/>
      <circle cx="16" cy="-2" r="3.2" fill="#C0570A"/>
      <circle cx="16" cy="-2" r="1.4" fill="#FFF0E8"/>
    </svg>
  )
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const s = SIZES[size]

  // Mark only — for favicon, app icon etc
  if (variant === 'mark') {
    return <TilakMark size={s.mark} />
  }

  // Full — stacked mark above wordmark
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <TilakMark size={s.mark * 2} />
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: s.text * 1.8,
            fontWeight: 700,
            color: '#C0570A',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            DivyaDarshan
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: s.sub,
            color: '#888888',
            letterSpacing: '0.2em',
            marginTop: 6,
            textTransform: 'uppercase' as const,
          }}>
            India's Temple Explorer
          </div>
        </div>
      </div>
    )
  }

  // Horizontal — mark left, text right (default, for navbar)
  return (
    <div className={`flex items-center ${className}`} style={{ gap: s.gap }}>
      <TilakMark size={s.mark} />
      <div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: s.text,
          fontWeight: 700,
          color: '#C0570A',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
        }}>
          DivyaDarshan
        </div>
        {size !== 'sm' && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: s.sub,
            color: '#888888',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            marginTop: 2,
          }}>
            Temple Explorer
          </div>
        )}
      </div>
    </div>
  )
}
