interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const h: Record<string, number> = { sm: 60, md: 80, lg: 120 }
  const height = h[size] || 80

  return (
    <div className={className} style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
      <img
        src="/dd-logo.png"
        alt="DivyaDarshanam"
        style={{ height: height, width:'auto', display:'block', objectFit:'contain' }}
      />
    </div>
  )
}
