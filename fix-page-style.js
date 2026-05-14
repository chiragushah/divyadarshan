const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

let page = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')

// Check if 'use client' is there
console.log('Starts with use client:', page.startsWith("'use client'"))
console.log('First 30 chars:', JSON.stringify(page.slice(0, 30)))

// The issue - .live-dot CSS was removed from style tag but still used in JSX
// Add it back into the style block
page = page.replace(
  `.footer hr{border:none;border-top:1px solid #F0EDE8;margin:24px 0}`,
  `.footer hr{border:none;border-top:1px solid #F0EDE8;margin:24px 0}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .live-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:blink 2s ease infinite;display:inline-block}`
)

fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')
console.log('Fixed')

process.chdir(P)
execSync('git add "app/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: restore live-dot CSS in style block"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done!')
