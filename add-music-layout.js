const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

let layout = fs.readFileSync(path.join(P, 'app/layout.tsx'), 'utf8')

// Add import
if (!layout.includes('MusicPlayer')) {
  layout = layout.replace(
    "import './globals.css'",
    "import './globals.css'\nimport MusicPlayer from '@/components/MusicPlayer'"
  )
  // Add before </body>
  layout = layout.replace('</body>', '        <MusicPlayer />\n      </body>')
  fs.writeFileSync(path.join(P, 'app/layout.tsx'), layout, 'utf8')
  console.log('OK: MusicPlayer added to layout')
} else {
  console.log('Already there')
}

process.chdir(P)
execSync('git add app/layout.tsx', { stdio: 'inherit' })
execSync('git commit -m "fix: add MusicPlayer to layout"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done!')
