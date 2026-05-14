const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// Copy the pre-written homepage file
const src = path.join(__dirname, 'homepage.tsx')
const dest = path.join(P, 'app/page.tsx')
fs.copyFileSync(src, dest)
console.log('OK: page.tsx replaced')

process.chdir(P)
execSync('git add "app/page.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: clean homepage - banner + no template literal issues"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
