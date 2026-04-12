const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// ── 1. Clean the SVG - remove DOCTYPE that browsers reject ────
console.log('[1/2] Cleaning SVG file...')
const svgPath = path.join(P, 'public/divyadarshanam-logo.svg')
let svg = fs.readFileSync(svgPath, 'utf8')

// Remove XML declaration and DOCTYPE - browsers reject SVGs with these in <img> tags
svg = svg
  .replace(/<\?xml[^>]*\?>\n?/g, '')
  .replace(/<!DOCTYPE[^>]*>\n?/g, '')
  .trim()

fs.writeFileSync(svgPath, svg, 'utf8')
console.log('  OK: SVG cleaned')

// ── 2. Logo.tsx - use PNG as fallback with text ───────────────
// Since the SVG has complex paths for all text (including the name),
// we show just the symbol from PNG + render "Divya Darshanam" as HTML text
console.log('[2/2] Writing Logo.tsx...')
fs.writeFileSync(path.join(P, 'components/Logo.tsx'), `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const iconSize:  Record<string, number> = { sm: 32, md: 40, lg: 56 }
  const titleSize: Record<string, string> = { sm: '14px', md: '18px', lg: '26px' }
  const subSize:   Record<string, string> = { sm: '7px',  md: '8.5px', lg: '11px' }
  const icon = iconSize[size] || 40

  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <img
          src="/divyadarshanam-logo.svg"
          alt="Divya Darshanam"
          style={{ height: icon, width: icon, objectFit: 'contain', display: 'block' }}
        />
      </div>
    )
  }

  return (
    <div
      className={\`flex items-center \${className}\`}
      style={{ lineHeight: 1, flexShrink: 0, gap: 10 }}
    >
      {/* Symbol mark */}
      <img
        src="/divyadarshanam-logo.svg"
        alt=""
        style={{ height: icon, width: 'auto', objectFit: 'contain', flexShrink: 0, display: 'block' }}
        onError={(e) => {
          // Fallback to PNG if SVG fails
          (e.target as HTMLImageElement).src = '/divyadarshan-logo.png'
        }}
      />
      {/* Brand name as real text — always crisp */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', 'Georgia', serif",
          fontSize: titleSize[size],
          fontWeight: 700,
          color: '#8B1A1A',
          letterSpacing: '0.02em',
          whiteSpace: 'nowrap',
        }}>
          Divya Darshanam
        </span>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: subSize[size],
          fontWeight: 500,
          color: '#C0570A',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          marginTop: 2,
        }}>
          Be a Temple Explorer
        </span>
      </div>
    </div>
  )
}
`, 'utf8')
console.log('  OK: Logo.tsx written')

// ── Push ──────────────────────────────────────────────────────
process.chdir(P)
execSync('git add "public/divyadarshanam-logo.svg" "components/Logo.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: clean SVG DOCTYPE, logo shows correctly"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
