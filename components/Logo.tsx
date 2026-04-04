// DivyaDarshan Logo — uses the official brand image
interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights = { sm: 48, md: 64, lg: 96 }
  const h = heights[size]

  if (variant === 'mark') {
    return (
      <img
        src="/divyadarshan-logo.png"
        alt="DivyaDarshan"
        style={{ height: h, width: 'auto', objectFit: 'contain' }}
      />
    )
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <img
          src="/divyadarshan-logo.png"
          alt="DivyaDarshan"
          style={{ height: h * 2, width: 'auto', objectFit: 'contain' }}
        />
      </div>
    )
  }

  // Horizontal — default for navbar
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/divyadarshan-logo.png"
        alt="DivyaDarshan"
        style={{ height: h, width: 'auto', objectFit: 'contain' }}
      />
    </div>
  )
}
