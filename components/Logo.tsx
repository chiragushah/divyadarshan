interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const h: Record<string, number> = { sm: 36, md: 48, lg: 68 }
  const tagS: Record<string, string> = { sm: '6.5px', md: '8px', lg: '10px' }
  const height = h[size] || 48

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, gap: 2 }}>
      <img
        src="/dd-logo.png"
        alt="DivyaDarshanam"
        style={{ height: height, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
      {variant !== 'mark' && (
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: tagS[size],
          fontWeight: 700,
          color: '#B8860B',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>Be A Temple Explorer</span>
      )}
    </div>
  )
}
