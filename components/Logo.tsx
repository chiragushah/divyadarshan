import Image from 'next/image'

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const iconSize: Record<string, number> = { sm: 28, md: 36, lg: 52 }
  const titleSize: Record<string, string> = { sm: '14px', md: '17px', lg: '24px' }
  const subSize:   Record<string, string> = { sm: '7px',  md: '8px',  lg: '11px' }

  const icon  = iconSize[size]  || 36
  const title = titleSize[size] || '17px'
  const sub   = subSize[size]   || '8px'

  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <Image
          src="/divyadarshanam-logo.svg"
          alt="DivyaDarshanam"
          width={icon * 2}
          height={icon * 2}
          style={{ height: icon, width: icon, objectFit: 'contain' }}
          priority
          unoptimized
        />
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ lineHeight: 1, flexShrink: 0 }}>
      {/* Symbol / mark */}
      <Image
        src="/divyadarshanam-logo.svg"
        alt=""
        width={icon * 4}
        height={icon * 4}
        style={{ height: icon, width: 'auto', objectFit: 'contain', flexShrink: 0 }}
        priority
        unoptimized
      />
      {/* Text — real crisp text, not paths */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: title,
          fontWeight: 700,
          color: '#8B1A1A',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
        }}>
          Divya Darshanam
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: sub,
          fontWeight: 500,
          color: '#C0570A',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          marginTop: 1,
        }}>
          Be a Temple Explorer
        </span>
      </div>
    </div>
  )
}
