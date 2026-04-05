// DivyaDarshan Logo
interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights: Record<string, number> = { sm: 52, md: 68, lg: 96 }
  const h = heights[size] || 68

  return (
    <div className={`flex items-center ${className}`} style={{ lineHeight: 0 }}>
      <img
        src="/divyadarshan-logo.png"
        alt="DivyaDarshan"
        style={{ height: h, width: 'auto', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}
