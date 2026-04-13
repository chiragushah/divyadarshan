interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights: Record<string, number> = { sm: 32, md: 42, lg: 60 }
  const h = heights[size] || 42

  // mark = icon only, no text
  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <img
          src="/divyadarshanam-logo.svg"
          alt="Divya Darshanam"
          style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>
    )
  }

  // horizontal / full = full logo with text baked in
  return (
    <div className={`flex items-center ${className}`} style={{ lineHeight: 0, flexShrink: 0 }}>
      <img
        src="/divyadarshanam-logo.svg"
        alt="Divya Darshanam"
        style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
    </div>
  )
}
