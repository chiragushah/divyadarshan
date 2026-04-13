const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// ── 1. Fix SVG color from black to gold ──────────────────────
console.log('[1/2] Fixing SVG color to gold...')
const svgPath = path.join(P, 'public/divyadarshanam-logo.svg')
let svg = fs.readFileSync(svgPath, 'utf8')

// Change black fill to gold gradient color
svg = svg.replace(/fill="#000000"/g, 'fill="#B8860B"')
svg = svg.replace(/fill="black"/g, 'fill="#B8860B"')

// Also add a linearGradient for rich gold effect
const gradientDef = `<defs>
  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
    <stop offset="50%" style="stop-color:#C9960C;stop-opacity:1" />
    <stop offset="100%" style="stop-color:#8B6914;stop-opacity:1" />
  </linearGradient>
</defs>`

// Insert defs after opening svg tag
svg = svg.replace(/<g transform=/, gradientDef + '\n<g transform=')

// Apply gradient to the main group
svg = svg.replace(/fill="#B8860B" stroke="none">/, 'fill="url(#goldGrad)" stroke="none">')

fs.writeFileSync(svgPath, svg, 'utf8')
console.log('  OK: SVG is now gold')

// ── 2. Logo.tsx - show SVG + tagline below ────────────────────
console.log('[2/2] Updating Logo.tsx with tagline...')
fs.writeFileSync(path.join(P, 'components/Logo.tsx'), `interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ variant = 'horizontal', size = 'md', className = '' }: LogoProps) {
  const heights: Record<string, number> = { sm: 28, md: 36, lg: 52 }
  const tagSize: Record<string, string> = { sm: '6px', md: '7.5px', lg: '10px' }
  const h = heights[size] || 36

  if (variant === 'mark') {
    return (
      <div className={className} style={{ lineHeight: 0 }}>
        <img
          src="/divyadarshanam-logo.svg"
          alt="DivyaDarshanam"
          style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
        />
      </div>
    )
  }

  return (
    <div className={\`flex flex-col items-center \${className}\`} style={{ flexShrink: 0, lineHeight: 1 }}>
      <img
        src="/divyadarshanam-logo.svg"
        alt="DivyaDarshanam"
        style={{ height: h, width: 'auto', display: 'block', objectFit: 'contain' }}
      />
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: tagSize[size],
        fontWeight: 600,
        color: '#C9960C',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        marginTop: 3,
      }}>
        Be The Temple Explorer
      </span>
    </div>
  )
}
`, 'utf8')
console.log('  OK: Logo.tsx updated')

// ── Push ──────────────────────────────────────────────────────
process.chdir(P)
execSync('git add "public/divyadarshanam-logo.svg" "components/Logo.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: gold SVG logo + Be The Temple Explorer tagline"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
