// fix-signup-translate.js
const fs = require('fs')

let c = fs.readFileSync('app/auth/signup/page.tsx', 'utf8')

// Add import
if (!c.includes('GoogleTranslate')) {
  c = c.replace(
    "import { Loader2 } from 'lucide-react'",
    "import { Loader2 } from 'lucide-react'\nimport GoogleTranslate from '@/components/translate/GoogleTranslate'"
  )
}

// Find the return ( line and the first <div after it
// We'll wrap everything in a fragment properly
const returnIdx = c.indexOf('\n  return (\n')
if (returnIdx === -1) { console.log('ERROR: cannot find return'); process.exit(1) }

// Find the content between return ( and the last )
const contentStart = returnIdx + '\n  return (\n'.length
// Find the matching closing ) - it's the last ')' before the closing }
const lastParen = c.lastIndexOf('\n  )\n}')
if (lastParen === -1) { console.log('ERROR: cannot find closing'); process.exit(1) }

const before = c.slice(0, contentStart)
const content = c.slice(contentStart, lastParen)
const after = c.slice(lastParen)

// Wrap in fragment with GoogleTranslate
const newReturn = before +
  `    <>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}>
        <GoogleTranslate />
      </div>
` +
  content +
  `\n    </>` +
  after

c = newReturn
fs.writeFileSync('app/auth/signup/page.tsx', c, 'utf8')
console.log('✅ Done')
console.log('Has GoogleTranslate:', c.includes('GoogleTranslate'))
console.log('Has fragment:', c.includes('</>'))
// Show lines around return
const idx = c.indexOf('return (')
console.log(c.slice(idx, idx + 200))
