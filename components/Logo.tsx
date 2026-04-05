// DivyaDarshan Logo
interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights: Record<string, number> = { sm: 64, md: 88, lg: 120 }
  const h = heights[size] || 88

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
