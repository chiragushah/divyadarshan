// DivyaDarshan Logo
interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights = { sm: 40, md: 52, lg: 80 }
  const h = heights[size]

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/divyadarshan-logo.png"
        alt="DivyaDarshan"
        style={{ height: h, width: 'auto', objectFit: 'contain', display: 'block' }}
      />
    </div>
  )
}
