const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

process.chdir(P)

// Step 1: Get git log to find last good commit
console.log('Finding last good commit...')
const log = execSync('git log --oneline -10', { encoding: 'utf8' })
console.log(log)

// Step 2: Restore SignInForm.tsx from git - undo all our changes to it
console.log('Restoring SignInForm.tsx from git history...')
execSync('git checkout HEAD~5 -- app/auth/signin/SignInForm.tsx', { stdio: 'inherit' })

// Step 3: Apply ONLY the logo filename fix - nothing else
let c = fs.readFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), 'utf8')
c = c
  .replace(/\/divyadarshanam-logo\.png/g, '/dd-logo.png')
  .replace(/\/divyadarshan-logo\.png/g, '/dd-logo.png')
  .replace(/\/divyadarshanam-logo\.svg/g, '/dd-logo.png')
  // Make existing logo bigger
  .replace(/height:72/g, 'height:90')
  .replace(/height: 72/g, 'height: 90')
  .replace(/height:60/g, 'height:90')
  .replace(/height: 60/g, 'height: 90')
fs.writeFileSync(path.join(P, 'app/auth/signin/SignInForm.tsx'), c, 'utf8')
console.log('OK: filename fixed, logo made bigger')

// Step 4: Push
execSync('git add "app/auth/signin/SignInForm.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: restore SignInForm from git history + fix logo filename"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
