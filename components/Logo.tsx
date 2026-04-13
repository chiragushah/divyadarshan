interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights: Record<string, number> = { sm: 28, md: 36, lg: 52 }
  const tagSize: Record<string, string> = { sm: '6px', md: '7.5px', lg: '10px' }
  const h = heights[size] || 36

  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <img
          src="/divyadarshanam-logo.svg"
          alt="DivyaDarshanam"
          style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center ${className}`} style={{ flexShrink: 0, lineHeight: 1 }}>
      <img
        src="/divyadarshanam-logo.svg"
        alt="DivyaDarshanam"
        style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: tagSize[size],
        fontWeight: 600,
        color: '#C9960C',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        marginTop: 3,
      }}>
        Be The Temple Explorer
      </span>
    </div>
  )
}
