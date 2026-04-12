const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

fs.writeFileSync(path.join(P, 'components/Logo.tsx'), `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const iconSize: Record<string, number> = { sm: 28, md: 36, lg: 52 }
  const titleSize: Record<string, string> = { sm: '14px', md: '17px', lg: '24px' }
  const subSize: Record<string, string>   = { sm: '7px',  md: '8px',  lg: '11px' }
  const icon = iconSize[size] || 36

  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <img src="/divyadarshanam-logo.svg" alt="Divya Darshanam"
          style={{ height: icon, width: icon, objectFit: 'contain' }} />
      </div>
    )
  }

  return (
    <div className={\`flex items-center gap-2 \${className}\`} style={{ lineHeight: 1, flexShrink: 0 }}>
      <img src="/divyadarshanam-logo.svg" alt=""
        style={{ height: icon, width: 'auto', objectFit: 'contain', flexShrink: 0 }} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: titleSize[size], fontWeight: 700,
          color: '#8B1A1A', letterSpacing: '0.01em', whiteSpace: 'nowrap',
        }}>Divya Darshanam</span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: subSize[size], fontWeight: 500,
          color: '#C0570A', letterSpacing: '0.12em',
          textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: 1,
        }}>Be a Temple Explorer</span>
      </div>
    </div>
  )
}
`, 'utf8')
console.log('OK: Logo.tsx written')

process.chdir(P)
execSync('git add "components/Logo.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: plain img tag for SVG logo - Divya Darshanam"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
