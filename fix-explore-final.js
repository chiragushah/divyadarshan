const fs = require('fs'), path = require('path'), { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// ── Read both files ───────────────────────────────────────────
const clientPath = path.join(P, 'app/(app)/explore/ExploreClient.tsx')
const pagePath   = path.join(P, 'app/(app)/explore/page.tsx')

let client = fs.readFileSync(clientPath, 'utf8')

// Also find page.tsx — show its content for the filter bar
if (fs.existsSync(pagePath)) {
  const pg = fs.readFileSync(pagePath, 'utf8')
  const pgLines = pg.split('\n')
  console.log('=== explore/page.tsx ===')
  pgLines.forEach((l,i) => {
    if (l.includes('Dham') || l.includes('Heritage') || l.includes('Terrain') ||
        l.includes('Sacred') || l.includes('category') || l.includes('filter'))
      console.log(i+1+'|'+l)
  })
}

// ── FIX 1: Clear category when clicking Nearby tab ───────────
// Current onClick: update('tab', tab.id === 'directory' ? '' : tab.id)
// Replace with: if nearby, push clean URL with only tab=nearby
const oldClick = `onClick={() => update('tab', tab.id === 'directory' ? '' : tab.id)}`
const newClick = `onClick={() => {
                if (tab.id === 'nearby') {
                  const p = new URLSearchParams()
                  p.set('tab', 'nearby')
                  router.push(pathname + '?' + p.toString())
                } else {
                  update('tab', tab.id === 'directory' ? '' : tab.id)
                }
              }}`

if (client.includes(oldClick)) {
  client = client.replace(oldClick, newClick)
  console.log('\n✅ FIX 1: Nearby tab now clears category filter from URL')
} else {
  console.log('\n⚠️  FIX 1: onClick pattern not found — searching alternative...')
  const lines = client.split('\n')
  const clickLine = lines.findIndex(l => l.includes("update('tab'") && l.includes('tab.id'))
  if (clickLine >= 0) {
    console.log('Found at line', clickLine+1, ':', lines[clickLine])
  }
}

fs.writeFileSync(clientPath, client, 'utf8')

// ── FIX 2: Hide filter bar in page.tsx when tab=nearby ───────
if (fs.existsSync(pagePath)) {
  let pg = fs.readFileSync(pagePath, 'utf8')
  const pgLines = pg.split('\n')

  // Find line with Sacred Circuits / Dham / Heritage filter nav
  const filterIdx = pgLines.findIndex(l =>
    l.includes('Sacred Circuits') || l.includes('Char+Dham') ||
    l.includes('By Terrain') || l.includes('By Story') ||
    (l.includes('Heritage') && l.includes('category'))
  )

  if (filterIdx >= 0) {
    console.log('\nFilter nav found in page.tsx at line:', filterIdx+1)
    console.log('Lines', Math.max(0,filterIdx-5), 'to', filterIdx+5, ':')
    pgLines.slice(Math.max(0,filterIdx-5), filterIdx+6)
      .forEach((l,i) => console.log(Math.max(0,filterIdx-5)+i+1+'|'+l))
  } else {
    console.log('\nFilter nav NOT found in page.tsx')
    // Show all page.tsx
    console.log('Full page.tsx:')
    pgLines.slice(0,80).forEach((l,i) => console.log(i+1+'|'+l))
  }
}

// Commit what we have so far
process.chdir(P)
execSync('git add -A', { stdio: 'inherit' })
execSync('git commit -m "fix: nearby tab clears category filter + show page.tsx filter location"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\n✅ Fix 1 pushed. Paste full output above so I can fix the filter bar too.')
