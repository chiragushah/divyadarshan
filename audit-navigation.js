// audit-navigation.js
const fs = require('fs')
const path = require('path')

console.log('\n=== DivyaDarshan Navigation Audit ===\n')

// 1. Check all pages exist
const EXPECTED_PAGES = [
  'app/page.tsx',
  'app/auth/signin/page.tsx',
  'app/auth/signup/page.tsx',
  'app/offline/page.tsx',
  'app/admin/page.tsx',
  'app/admin/dashboard/page.tsx',
  'app/(app)/explore/page.tsx',
  'app/(app)/circuits/page.tsx',
  'app/(app)/plan/page.tsx',
  'app/(app)/plan/checklist/page.tsx',
  'app/(app)/plan/budget/page.tsx',
  'app/(app)/plan/calendar/page.tsx',
  'app/(app)/yatra/page.tsx',
  'app/(app)/yatra/journal/page.tsx',
  'app/(app)/yatra/goals/page.tsx',
  'app/(app)/yatra/split/page.tsx',
  'app/(app)/yatra/group/page.tsx',
  'app/(app)/yatra/manage/page.tsx',
  'app/(app)/yatra/reviews/page.tsx',
  'app/(app)/profile/page.tsx',
  'app/(app)/manifest/page.tsx',
  'app/(app)/manifest/write/page.tsx',
  'app/(app)/manifest/my-sankalpas/page.tsx',
  'app/(app)/recommend-temple/page.tsx',
  'app/(app)/admin-request/page.tsx',
  'app/(app)/packages/page.tsx',
  'app/(public)/temple/[slug]/page.tsx',
]

console.log('── Pages ──')
let missingPages = 0
EXPECTED_PAGES.forEach(p => {
  const exists = fs.existsSync(p)
  if (!exists) { console.log('❌ MISSING:', p); missingPages++ }
  else console.log('✅', p)
})
console.log(`\nPages: ${EXPECTED_PAGES.length - missingPages}/${EXPECTED_PAGES.length} exist\n`)

// 2. Check all API routes exist
const EXPECTED_APIS = [
  'app/api/temples/route.ts',
  'app/api/sankalp/route.ts',
  'app/api/report/route.ts',
  'app/api/verify-temple/route.ts',
  'app/api/visits/route.ts',
  'app/api/packages/route.ts',
  'app/api/contribution/route.ts',
  'app/api/recommend-temple/route.ts',
  'app/api/admin/stats/route.ts',
  'app/api/image-proxy/route.ts',
  'app/api/planner/route.ts',
  'app/api/auth/[...nextauth]/route.ts',
]

console.log('── API Routes ──')
let missingApis = 0
EXPECTED_APIS.forEach(p => {
  const exists = fs.existsSync(p)
  if (!exists) { console.log('❌ MISSING:', p); missingApis++ }
  else console.log('✅', p)
})
console.log(`\nAPIs: ${EXPECTED_APIS.length - missingApis}/${EXPECTED_APIS.length} exist\n`)

// 3. Check navbar links match real pages
const navbar = fs.readFileSync('components/nav/Navbar.tsx', 'utf8')
const navHrefs = [...navbar.matchAll(/href:\s*["']([^"']+)["']/g)].map(m => m[1])
console.log('── Navbar Links ──')
navHrefs.forEach(href => {
  if (href.startsWith('http') || href.startsWith('#')) return
  // Convert href to file path
  const cleanHref = href.split('?')[0]
  const possiblePaths = [
    `app${cleanHref}/page.tsx`,
    `app/(app)${cleanHref}/page.tsx`,
    `app/(public)${cleanHref}/page.tsx`,
  ]
  const exists = possiblePaths.some(p => fs.existsSync(p))
  if (!exists) console.log('⚠️  No page for navbar link:', href)
  else console.log('✅ Navbar:', href)
})

// 4. Check homepage links
const homepage = fs.readFileSync('app/page.tsx', 'utf8')
const homeHrefs = [...homepage.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1])
console.log('\n── Homepage Links ──')
homeHrefs.forEach(href => {
  if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto')) return
  const cleanHref = href.split('?')[0]
  const possiblePaths = [
    `app${cleanHref}/page.tsx`,
    `app/(app)${cleanHref}/page.tsx`,
    `app/(public)${cleanHref}/page.tsx`,
    `app${cleanHref === '/' ? '/page.tsx' : cleanHref + '/page.tsx'}`,
  ]
  const exists = possiblePaths.some(p => fs.existsSync(p))
  if (!exists) console.log('⚠️  No page for home link:', href)
  else console.log('✅ Home:', href)
})

// 5. Check key components exist
const EXPECTED_COMPONENTS = [
  'components/nav/Navbar.tsx',
  'components/ContributionBanner.tsx',
  'components/ContributionModal.tsx',
  'components/PWAInstaller.tsx',
  'components/BadgeCard.tsx',
  'components/RecommendTempleModal.tsx',
  'components/temple/MarkVisited.tsx',
  'components/temple/ReportButton.tsx',
  'components/temple/DataConfidenceBadge.tsx',
  'components/temple/TempleStatusBadge.tsx',
  'components/temple/TempleCard.tsx',
  'components/Logo.tsx',
]

console.log('\n── Key Components ──')
let missingComps = 0
EXPECTED_COMPONENTS.forEach(p => {
  const exists = fs.existsSync(p)
  if (!exists) { console.log('❌ MISSING:', p); missingComps++ }
  else console.log('✅', p)
})

// 6. Check models exist
const EXPECTED_MODELS = [
  'models/Sankalp.ts',
  'models/index.ts',
]
console.log('\n── Models ──')
EXPECTED_MODELS.forEach(p => {
  const exists = fs.existsSync(p)
  if (!exists) console.log('❌ MISSING:', p)
  else console.log('✅', p)
})

// 7. Check env vars in .env.local
console.log('\n── Environment Variables ──')
const env = fs.readFileSync('.env.local', 'utf8')
const REQUIRED_ENVS = [
  'MONGODB_URI',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'GROQ_API_KEY',
  'BLOB_READ_WRITE_TOKEN',
  'GEMINI_API_KEY',
]
REQUIRED_ENVS.forEach(k => {
  const present = env.includes(k + '=') && !env.includes(k + '=\n')
  console.log(present ? '✅' : '❌', k)
})

// 8. Check layouts include key components
console.log('\n── Layouts ──')
const appLayout = fs.readFileSync('app/(app)/layout.tsx', 'utf8')
const pubLayout = fs.readFileSync('app/(public)/layout.tsx', 'utf8')
console.log('App layout has Navbar:', appLayout.includes('Navbar') ? '✅' : '❌')
console.log('App layout has ContributionBanner:', appLayout.includes('ContributionBanner') ? '✅' : '❌')
console.log('Public layout has Navbar:', pubLayout.includes('Navbar') ? '✅' : '❌')
console.log('Public layout has ContributionBanner:', pubLayout.includes('ContributionBanner') ? '✅' : '❌')

// 9. Check middleware exists
console.log('\n── Middleware & Config ──')
console.log('middleware.ts:', fs.existsSync('middleware.ts') ? '✅' : '❌')
console.log('vercel.json:', fs.existsSync('vercel.json') ? '✅' : '❌')
console.log('public/sw.js:', fs.existsSync('public/sw.js') ? '✅' : '❌')
console.log('public/manifest.json:', fs.existsSync('public/manifest.json') ? '✅' : '❌')

console.log('\n=== Audit Complete ===\n')
