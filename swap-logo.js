const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// Copy new logo to public as dd-logo.png (replace old one)
// User needs to copy dd-logo.jpg to project first
const newLogo = path.join(P, 'public/dd-logo.jpg')
const target  = path.join(P, 'public/dd-logo.png')

if (fs.existsSync(newLogo)) {
  fs.copyFileSync(newLogo, target)
  console.log('OK: dd-logo.png replaced with new logo')
} else {
  console.log('ERROR: dd-logo.jpg not found in public/ folder')
  console.log('Please copy dd-logo.jpg to C:\\Users\\chira\\Downloads\\divyadarshan\\public\\ first')
  process.exit(1)
}

process.chdir(P)
execSync('git add "public/dd-logo.png"', { stdio: 'inherit' })
execSync('git commit -m "feat: new DivyaDarshanam logo - gold infinity diya"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
