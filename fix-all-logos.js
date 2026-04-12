const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

const files = [
  'app/page.tsx',
  'app/auth/signup/page.tsx',
  'app/admin/dashboard/page.tsx',
]

files.forEach(rel => {
  const full = path.join(P, rel)
  let content = fs.readFileSync(full, 'utf8')
  const orig = content

  // Fix wrong filename - file is divyadarshan-logo.png not divyadarshanam-logo.png
  content = content.replace(/\/divyadarshanam-logo\.png/g, '/divyadarshan-logo.png')

  // Fix dynaimers wrong filename
  content = content.replace(/\/dynaimers-logo\.png/g, '/dynaimers-logo.jpg')

  if (content !== orig) {
    fs.writeFileSync(full, content, 'utf8')
    console.log('  fixed:', rel)
  } else {
    console.log('  skip:', rel)
  }
})

process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: correct logo filenames across all pages"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
