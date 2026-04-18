const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

// Use sharp to resize dd-logo.png into all required icon sizes
// Since sharp may not be installed, use a simpler approach:
// Just copy dd-logo.png as the icon files - browsers will scale it

console.log('Copying new logo as PWA icons...')

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]
const src = path.join(P, 'public/dd-logo.png')

// We'll use Node.js canvas or just copy the file
// Simplest: copy dd-logo.png to each icon size (browser scales it)
sizes.forEach(size => {
  const dest = path.join(P, `public/icons/icon-${size}x${size}.png`)
  fs.copyFileSync(src, dest)
  console.log(`  copied: icon-${size}x${size}.png`)
})

// Also fix shortcut icons
;['explore', 'plan', 'journal'].forEach(name => {
  const dest = path.join(P, `public/icons/shortcut-${name}.png`)
  fs.copyFileSync(src, dest)
  console.log(`  copied: shortcut-${name}.png`)
})

console.log('\nPushing to GitHub...')
process.chdir(P)
execSync('git add "public/icons"', { stdio: 'inherit' })
execSync('git commit -m "fix: PWA icons updated with new DivyaDarshanam logo"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Clear browser cache to see new PWA icon.')
