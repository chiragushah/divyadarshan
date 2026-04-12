interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const iconSize:  Record<string, number> = { sm: 32, md: 40, lg: 56 }
  const titleSize: Record<string, string> = { sm: '14px', md: '18px', lg: '26px' }
  const subSize:   Record<string, string> = { sm: '7px',  md: '8.5px', lg: '11px' }
  const icon = iconSize[size] || 40

  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <img
          src="/divyadarshanam-logo.svg"
          alt="Divya Darshanam"
          style={{ height: icon, width: icon, objectFit: 'contain', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center ${className}`}
      style={{ lineHeight: 1, flexShrink: 0, gap: 10 }}
    >
      {/* Symbol mark */}
      <img
        src="/divyadarshanam-logo.svg"
        alt=""
        style={{ height: icon, width: 'auto', objectFit: 'contain', flexShrink: 0, display: 'block' }}
        onError={(e) => {
          // Fallback to PNG if SVG fails
          (e.target as HTMLImageElement).src = '/divyadarshan-logo.png'
        }}
      />
      {/* Brand name as real text — always crisp */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: titleSize[size],
          fontWeight: 700,
          color: '#8B1A1A',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}>
          Divya Darshanam
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: subSize[size],
          fontWeight: 500,
          color: '#C0570A',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          marginTop: 2,
        }}>
          Be a Temple Explorer
        </span>
      </div>
    </div>
  )
}
