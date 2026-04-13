interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const h: Record<string, number> = { sm: 52, md: 68, lg: 96 }
  const tagS: Record<string, string> = { sm: '7px', md: '9px', lg: '12px' }
  const height = h[size] || 68

  return (
    <div className={className} style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0, gap:3 }}>
      <img
        src="/dd-logo.png"
        alt="DivyaDarshanam"
        width={height * 2}
        height={height * 2}
        style={{ height:height, width:'auto', display:'block', objectFit:'contain' }}
      />
      {variant !== 'mark' && (
        <span style={{
          fontFamily:"'Inter',sans-serif",
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
