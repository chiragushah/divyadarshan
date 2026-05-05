const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

const files = [
  'app/page.tsx',
  'app/globals.css',
]

files.forEach(rel => {
  const full = path.join(P, rel)
  if (!fs.existsSync(full)) return
  let c = fs.readFileSync(full, 'utf8')
  const orig = c
  c = c
    .replace(/#FDFAF6/g, '#FFFFFF')
    .replace(/#FAF7F2/g, '#FFFFFF')
    .replace(/#FBF7F2/g, '#FFFFFF')
    .replace(/ivory-100/g, 'white')
    .replace(/bg-ivory-100/g, 'bg-white')
  if (c !== orig) {
    fs.writeFileSync(full, c, 'utf8')
    console.log('updated:', rel)
  }
})

process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: pure white background on home page"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
