// full-audit.js
const fs = require('fs')

let issues = []
let ok = []

function check(label, condition) {
  if (condition) ok.push('OK  ' + label)
  else issues.push('ERR ' + label)
}

console.log('\n====== DivyaDarshan Full Audit ======\n')

// ── 1. PAGES ──────────────────────────────────────────────────────────────────
console.log('── Pages ──')
const PAGES = [
  ['Home', 'app/page.tsx'],
  ['Sign In', 'app/auth/signin/page.tsx'],
  ['Sign Up', 'app/auth/signup/page.tsx'],
  ['Offline', 'app/offline/page.tsx'],
  ['Admin', 'app/admin/page.tsx'],
  ['Admin Dashboard', 'app/admin/dashboard/page.tsx'],
  ['Explore', 'app/(app)/explore/page.tsx'],
  ['Circuits', 'app/(app)/circuits/page.tsx'],
  ['Plan', 'app/(app)/plan/page.tsx'],
  ['Plan Checklist', 'app/(app)/plan/checklist/page.tsx'],
  ['Plan Budget', 'app/(app)/plan/budget/page.tsx'],
  ['Plan Calendar', 'app/(app)/plan/calendar/page.tsx'],
  ['Yatra', 'app/(app)/yatra/page.tsx'],
  ['Yatra Journal', 'app/(app)/yatra/journal/page.tsx'],
  ['Yatra Goals', 'app/(app)/yatra/goals/page.tsx'],
  ['Yatra Split', 'app/(app)/yatra/split/page.tsx'],
  ['Yatra Group', 'app/(app)/yatra/group/page.tsx'],
  ['Yatra Manage', 'app/(app)/yatra/manage/page.tsx'],
  ['Yatra Reviews', 'app/(app)/yatra/reviews/page.tsx'],
  ['Profile', 'app/(app)/profile/page.tsx'],
  ['Manifest', 'app/(app)/manifest/page.tsx'],
  ['Manifest Write', 'app/(app)/manifest/write/page.tsx'],
  ['Manifest My Sankalpas', 'app/(app)/manifest/my-sankalpas/page.tsx'],
  ['Recommend Temple', 'app/(app)/recommend-temple/page.tsx'],
  ['Admin Request', 'app/(app)/admin-request/page.tsx'],
  ['Packages', 'app/(app)/packages/page.tsx'],
  ['Temple Detail', 'app/(public)/temple/[slug]/page.tsx'],
]
PAGES.forEach(([label, p]) => {
  const e = fs.existsSync(p)
  check('Page: ' + label, e)
  console.log((e ? 'OK  ' : 'ERR ') + label + ' — ' + p)
})

// ── 2. API ROUTES ─────────────────────────────────────────────────────────────
console.log('\n── API Routes ──')
const APIS = [
  ['Temples API', 'app/api/temples/route.ts'],
  ['Sankalp API', 'app/api/sankalp/route.ts'],
  ['Report API', 'app/api/report/route.ts'],
  ['Verify Temple API', 'app/api/verify-temple/route.ts'],
  ['Visits API', 'app/api/visits/route.ts'],
  ['Packages API', 'app/api/packages/route.ts'],
  ['Contribution API', 'app/api/contribution/route.ts'],
  ['Recommend Temple API', 'app/api/recommend-temple/route.ts'],
  ['Admin Stats API', 'app/api/admin/stats/route.ts'],
  ['Image Proxy API', 'app/api/image-proxy/route.ts'],
  ['Planner API', 'app/api/planner/route.ts'],
  ['NextAuth API', 'app/api/auth/[...nextauth]/route.ts'],
  ['User Badge API', 'app/api/user-badge/route.ts'],
]
APIS.forEach(([label, p]) => {
  const e = fs.existsSync(p)
  check('API: ' + label, e)
  console.log((e ? 'OK  ' : 'ERR ') + label + ' — ' + p)
})

// ── 3. COMPONENTS ─────────────────────────────────────────────────────────────
console.log('\n── Components ──')
const COMPS = [
  ['Navbar', 'components/nav/Navbar.tsx'],
  ['ContributionBanner', 'components/ContributionBanner.tsx'],
  ['ContributionModal', 'components/ContributionModal.tsx'],
  ['PWAInstaller', 'components/PWAInstaller.tsx'],
  ['BadgeCard', 'components/BadgeCard.tsx'],
  ['RecommendTempleModal', 'components/RecommendTempleModal.tsx'],
  ['MarkVisited', 'components/temple/MarkVisited.tsx'],
  ['ReportButton', 'components/temple/ReportButton.tsx'],
  ['DataConfidenceBadge', 'components/temple/DataConfidenceBadge.tsx'],
  ['TempleStatusBadge', 'components/temple/TempleStatusBadge.tsx'],
  ['TempleCard', 'components/temple/TempleCard.tsx'],
  ['Logo', 'components/Logo.tsx'],
]
COMPS.forEach(([label, p]) => {
  const e = fs.existsSync(p)
  check('Component: ' + label, e)
  console.log((e ? 'OK  ' : 'ERR ') + label + ' — ' + p)
})

// ── 4. LAYOUTS ────────────────────────────────────────────────────────────────
console.log('\n── Layouts ──')
const appLayout = fs.readFileSync('app/(app)/layout.tsx', 'utf8')
const pubLayout = fs.readFileSync('app/(public)/layout.tsx', 'utf8')
const rootLayout = fs.readFileSync('app/layout.tsx', 'utf8')

check('App: Navbar', appLayout.includes('Navbar'))
check('App: ContributionBanner', appLayout.includes('ContributionBanner'))
check('App: PWAInstaller', appLayout.includes('PWAInstaller'))
check('Public: Navbar', pubLayout.includes('Navbar'))
check('Public: ContributionBanner', pubLayout.includes('ContributionBanner'))

console.log('App Navbar:', appLayout.includes('Navbar') ? 'OK' : 'ERR')
console.log('App ContributionBanner:', appLayout.includes('ContributionBanner') ? 'OK' : 'ERR')
console.log('App PWAInstaller:', appLayout.includes('PWAInstaller') ? 'OK' : 'ERR')
console.log('Public Navbar:', pubLayout.includes('Navbar') ? 'OK' : 'ERR')
console.log('Public ContributionBanner:', pubLayout.includes('ContributionBanner') ? 'OK' : 'ERR')

// ── 5. NAVBAR LINKS ───────────────────────────────────────────────────────────
console.log('\n── Navbar Links ──')
const navbar = fs.readFileSync('components/nav/Navbar.tsx', 'utf8')
const EXPECTED_NAV_LINKS = [
  '/explore', '/circuits', '/calendar', '/manifest',
  '/plan', '/plan/checklist', '/plan/budget',
  '/yatra/journal', '/yatra/goals', '/yatra/split', '/yatra/group',
  '/profile', '/auth/signin', '/auth/signup',
]
EXPECTED_NAV_LINKS.forEach(href => {
  const present = navbar.includes('"' + href + '"') || navbar.includes("'" + href + "'")
  check('Navbar link: ' + href, present)
  console.log((present ? 'OK  ' : 'ERR ') + href)
})

// Check mobile menu
console.log('\nMobile Menu:')
console.log('Has Manifest card:', navbar.includes('Manifest') ? 'OK' : 'ERR')
console.log('Has Contribute button:', navbar.includes('Contribute to DivyaDarshan') ? 'OK' : 'ERR')
console.log('Has My Sankalpas:', navbar.includes('my-sankalpas') ? 'OK' : 'ERR')
console.log('Has Sign Up:', navbar.includes('signup') ? 'OK' : 'ERR')
console.log('Has Sign Out:', navbar.includes('signOut') ? 'OK' : 'ERR')

// ── 6. HOMEPAGE LINKS ─────────────────────────────────────────────────────────
console.log('\n── Homepage Links ──')
const home = fs.readFileSync('app/page.tsx', 'utf8')
const EXPECTED_HOME_LINKS = [
  '/explore', '/manifest', '/plan', '/auth/signup', '/auth/signin',
]
EXPECTED_HOME_LINKS.forEach(href => {
  const present = home.includes('"' + href + '"') || home.includes("'" + href + "'")
  check('Home link: ' + href, present)
  console.log((present ? 'OK  ' : 'ERR ') + href)
})

// ── 7. ENV VARS ───────────────────────────────────────────────────────────────
console.log('\n── Environment Variables ──')
const env = fs.readFileSync('.env.local', 'utf8')
const ENVS = ['MONGODB_URI', 'NEXTAUTH_SECRET', 'NEXTAUTH_URL', 'GROQ_API_KEY', 'BLOB_READ_WRITE_TOKEN', 'GEMINI_API_KEY', 'ANTHROPIC_API_KEY']
ENVS.forEach(k => {
  const present = env.includes(k + '=') && !env.match(new RegExp(k + '=\\s*\n'))
  check('Env: ' + k, present)
  console.log((present ? 'OK  ' : 'ERR ') + k)
})

// ── 8. PUBLIC FILES ───────────────────────────────────────────────────────────
console.log('\n── Public Files ──')
const PUBLIC = [
  ['Service Worker', 'public/sw.js'],
  ['PWA Manifest', 'public/manifest.json'],
  ['DivyaDarshan Logo', 'public/divyadarshan-logo.png'],
  ['Favicon', 'public/favicon.ico'],
]
PUBLIC.forEach(([label, p]) => {
  const e = fs.existsSync(p)
  check('Public: ' + label, e)
  console.log((e ? 'OK  ' : 'ERR ') + label)
})

// ── 9. MODELS ─────────────────────────────────────────────────────────────────
console.log('\n── Models ──')
const MODELS = [
  ['Sankalp', 'models/Sankalp.ts'],
  ['Models Index', 'models/index.ts'],
]
MODELS.forEach(([label, p]) => {
  const e = fs.existsSync(p)
  check('Model: ' + label, e)
  console.log((e ? 'OK  ' : 'ERR ') + label)
})

// ── 10. MIDDLEWARE ────────────────────────────────────────────────────────────
console.log('\n── Middleware & Config ──')
console.log('middleware.ts:', fs.existsSync('middleware.ts') ? 'OK' : 'ERR')
console.log('vercel.json:', fs.existsSync('vercel.json') ? 'OK' : 'ERR')
console.log('next.config.js/ts:', (fs.existsSync('next.config.js') || fs.existsSync('next.config.ts')) ? 'OK' : 'ERR')

// ── SUMMARY ───────────────────────────────────────────────────────────────────
console.log('\n====== SUMMARY ======')
console.log('OK:', ok.length)
console.log('Issues:', issues.length)
if (issues.length > 0) {
  console.log('\nISSUES TO FIX:')
  issues.forEach(i => console.log(' ', i))
} else {
  console.log('\nAll checks passed!')
}
