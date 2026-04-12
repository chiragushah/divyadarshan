const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'

// File extensions to search
const EXTS = ['.tsx', '.ts', '.js', '.json', '.md', '.txt', '.css']

// Folders to skip
const SKIP = ['node_modules', '.next', '.git', 'public']

let totalFiles = 0
let changedFiles = 0

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (SKIP.includes(entry.name)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      processDir(full)
    } else if (EXTS.some(e => entry.name.endsWith(e))) {
      totalFiles++
      let content = fs.readFileSync(full, 'utf8')
      const original = content

      // Replace all variations - order matters (longer first)
      content = content
        .replace(/DivyaDarshanam — /g, 'DivyaDarshanam — ')
        .replace(/DivyaDarshanam\b/g, 'DivyaDarshanam')
        .replace(/Divya Darshanam\b/g, 'Divya Darshanam')
        .replace(/divyadarshanam(?!-psi)/g, 'divyadarshanamam')  // skip vercel URL

      if (content !== original) {
        fs.writeFileSync(full, content, 'utf8')
        changedFiles++
        console.log('  updated:', full.replace(P + '\\', ''))
      }
    }
  }
}

console.log('Scanning all files...\n')
processDir(P)
console.log(`\nDone: ${changedFiles} files updated out of ${totalFiles} scanned`)

// Also update manifest.json separately (JSON file in public)
const manifestPath = path.join(P, 'public/manifest.json')
if (fs.existsSync(manifestPath)) {
  let manifest = fs.readFileSync(manifestPath, 'utf8')
  const orig = manifest
  manifest = manifest.replace(/DivyaDarshanam/g, 'DivyaDarshanam')
  if (manifest !== orig) {
    fs.writeFileSync(manifestPath, manifest, 'utf8')
    console.log('  updated: public/manifest.json')
  }
}

// Push
console.log('\nPushing to GitHub...')
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "rebrand: DivyaDarshanam -> DivyaDarshanam across entire codebase"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
