// DivyaDarshanam - Security Hardening v2
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'

const write = (rel, content) => {
  const full = path.join(P, rel)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content, 'utf8')
  console.log('  OK:', rel)
}

// ── 1. lib/security.ts ───────────────────────────────────────
console.log('\n[1/6] Creating lib/security.ts...')

const securityLib = [
  "// Shared security utilities for DivyaDarshanam",
  "",
  "const rateLimitStore = new Map()",
  "",
  "export function rateLimit(ip, action, options) {",
  "  const limit = (options && options.limit) || 10",
  "  const windowMs = (options && options.windowMs) || 60000",
  "  const key = action + ':' + ip",
  "  const now = Date.now()",
  "  const entry = rateLimitStore.get(key)",
  "  if (!entry || now > entry.resetAt) {",
  "    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })",
  "    if (rateLimitStore.size > 1000) {",
  "      for (const [k, v] of rateLimitStore) {",
  "        if (now > v.resetAt) rateLimitStore.delete(k)",
  "      }",
  "    }",
  "    return { allowed: true, remaining: limit - 1, resetIn: windowMs }",
  "  }",
  "  if (entry.count >= limit) {",
  "    return { allowed: false, remaining: 0, resetIn: entry.resetAt - now }",
  "  }",
  "  entry.count++",
  "  return { allowed: true, remaining: limit - entry.count, resetIn: entry.resetAt - now }",
  "}",
  "",
  "export function sanitizeQuery(input) {",
  "  if (typeof input !== 'string') return ''",
  "  return input",
  "    .replace(/[\\$\\{\\}\\(\\)\\[\\]\\|\\*\\+\\?\\.\\^\\\\]/g, '\\\\$&')",
  "    .slice(0, 200)",
  "    .trim()",
  "}",
  "",
  "export function sanitizeText(input, maxLen) {",
  "  if (typeof input !== 'string') return ''",
  "  maxLen = maxLen || 500",
  "  return input",
  "    .replace(/<[^>]*>/g, '')",
  "    .replace(/[<>'`]/g, '')",
  "    .slice(0, maxLen)",
  "    .trim()",
  "}",
  "",
  "export function isValidEmail(email) {",
  "  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email) && email.length <= 254",
  "}",
  "",
  "export function isValidPassword(password) {",
  "  if (password.length < 8)  return { valid: false, reason: 'Password must be at least 8 characters' }",
  "  if (password.length > 128) return { valid: false, reason: 'Password too long' }",
  "  return { valid: true }",
  "}",
  "",
  "export function getIP(req) {",
  "  const forwarded = req.headers.get('x-forwarded-for')",
  "  if (forwarded) return forwarded.split(',')[0].trim()",
  "  return req.headers.get('x-real-ip') || 'unknown'",
  "}",
  "",
  "export function rateLimitResponse(resetIn) {",
  "  const seconds = Math.ceil(resetIn / 1000)",
  "  return new Response(",
  "    JSON.stringify({ error: 'Too many requests. Please wait ' + seconds + ' seconds.' }),",
  "    {",
  "      status: 429,",
  "      headers: { 'Content-Type': 'application/json', 'Retry-After': String(seconds) },",
  "    }",
  "  )",
  "}",
  "",
  "export async function parseBody(req, maxBytes) {",
  "  maxBytes = maxBytes || 50000",
  "  const contentLength = req.headers.get('content-length')",
  "  if (contentLength && parseInt(contentLength) > maxBytes) {",
  "    throw new Error('Request body too large')",
  "  }",
  "  const text = await req.text()",
  "  if (text.length > maxBytes) throw new Error('Request body too large')",
  "  return JSON.parse(text)",
  "}",
].join('\n')

write('lib/security.ts', securityLib)

// ── 2. Hardened register route ────────────────────────────────
console.log('\n[2/6] Hardening register route...')

const registerRoute = [
  "import { NextRequest, NextResponse } from 'next/server'",
  "import connectDB from '@/lib/mongodb/connect'",
  "import { User } from '@/models'",
  "import bcrypt from 'bcryptjs'",
  "import { rateLimit, sanitizeText, isValidEmail, isValidPassword, getIP, rateLimitResponse } from '@/lib/security'",
  "",
  "export const dynamic = 'force-dynamic'",
  "",
  "export async function POST(req: NextRequest) {",
  "  // Rate limit: 5 registrations per IP per hour",
  "  const ip = getIP(req as any)",
  "  const rl = rateLimit(ip, 'register', { limit: 5, windowMs: 60 * 60000 })",
  "  if (!rl.allowed) return rateLimitResponse(rl.resetIn)",
  "",
  "  try {",
  "    let body: any",
  "    try {",
  "      const text = await req.text()",
  "      if (text.length > 10000) return NextResponse.json({ error: 'Request too large' }, { status: 400 })",
  "      body = JSON.parse(text)",
  "    } catch {",
  "      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })",
  "    }",
  "",
  "    const name     = sanitizeText(body.name || '', 100)",
  "    const email    = (body.email || '').toLowerCase().trim().slice(0, 254)",
  "    const phone    = sanitizeText(body.phone || '', 20)",
  "    const password = body.password || ''",
  "",
  "    if (!name || !email || !password) {",
  "      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })",
  "    }",
  "    if (!isValidEmail(email)) {",
  "      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })",
  "    }",
  "    const pwCheck = isValidPassword(password)",
  "    if (!pwCheck.valid) {",
  "      return NextResponse.json({ error: pwCheck.reason }, { status: 400 })",
  "    }",
  "",
  "    await connectDB()",
  "    const existing = await User.findOne({ email }).select('_id').lean()",
  "    if (existing) {",
  "      await new Promise(r => setTimeout(r, 500))",
  "      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 })",
  "    }",
  "",
  "    const hashed = await bcrypt.hash(password, 12)",
  "    await User.create({ name, email, phone, password: hashed, provider: 'email' })",
  "    return NextResponse.json({ success: true })",
  "  } catch (err) {",
  "    console.error('Register error:', err)",
  "    return NextResponse.json({ error: 'Registration failed. Please try again.' }, { status: 500 })",
  "  }",
  "}",
].join('\n')

write('app/api/auth/register/route.ts', registerRoute)

// ── 3. Sanitize temples search ────────────────────────────────
console.log('\n[3/6] Hardening temples search...')
let templesRoute = fs.readFileSync(path.join(P, 'app/api/temples/route.ts'), 'utf8')
if (!templesRoute.includes('lib/security')) {
  templesRoute = templesRoute.replace(
    "import { Temple } from '@/models'",
    "import { Temple } from '@/models'\nimport { rateLimit, sanitizeQuery, getIP, rateLimitResponse } from '@/lib/security'"
  )
  templesRoute = templesRoute.replace(
    "export async function GET(req: NextRequest) {\n  await connectDB()",
    "export async function GET(req: NextRequest) {\n  const ip = getIP(req as any)\n  const rl = rateLimit(ip, 'temples', { limit: 60, windowMs: 60000 })\n  if (!rl.allowed) return rateLimitResponse(rl.resetIn)\n  await connectDB()"
  )
  templesRoute = templesRoute.replace(
    "  const q        = searchParams.get('q')",
    "  const q        = sanitizeQuery(searchParams.get('q') || '')"
  )
}
write('app/api/temples/route.ts', templesRoute)

// ── 4. Rate limit reviews ─────────────────────────────────────
console.log('\n[4/6] Hardening reviews route...')
let reviewsRoute = fs.readFileSync(path.join(P, 'app/api/reviews/route.ts'), 'utf8')
if (!reviewsRoute.includes('lib/security')) {
  reviewsRoute = "import { rateLimit, getIP, rateLimitResponse } from '@/lib/security'\n" + reviewsRoute
  reviewsRoute = reviewsRoute.replace(
    'export async function POST(req: NextRequest) {',
    "export async function POST(req: NextRequest) {\n  const ip = getIP(req as any)\n  const rl = rateLimit(ip, 'reviews', { limit: 5, windowMs: 3600000 })\n  if (!rl.allowed) return rateLimitResponse(rl.resetIn)"
  )
}
write('app/api/reviews/route.ts', reviewsRoute)

// ── 5. Harden middleware ──────────────────────────────────────
console.log('\n[5/6] Hardening middleware...')

const middlewareLines = [
  "import { getToken } from 'next-auth/jwt'",
  "import { NextResponse } from 'next/server'",
  "import type { NextRequest } from 'next/server'",
  "",
  "const authAttempts = new Map()",
  "",
  "function checkAuthRateLimit(ip) {",
  "  const now = Date.now()",
  "  const key = 'auth:' + ip",
  "  const entry = authAttempts.get(key)",
  "  if (!entry || now > entry.resetAt) {",
  "    authAttempts.set(key, { count: 1, resetAt: now + 15 * 60000 })",
  "    return true",
  "  }",
  "  if (entry.count >= 20) return false",
  "  entry.count++",
  "  return true",
  "}",
  "",
  "export async function middleware(request: NextRequest) {",
  "  const { pathname } = request.nextUrl",
  "  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'",
  "",
  "  // Block path traversal attacks",
  "  if (pathname.includes('..') || pathname.includes('%2e%2e')) {",
  "    return new NextResponse('Forbidden', { status: 403 })",
  "  }",
  "",
  "  // Block known scanning tools",
  "  const ua = request.headers.get('user-agent') || ''",
  "  if (/sqlmap|nikto|nmap|masscan|zgrab/i.test(ua)) {",
  "    return new NextResponse('Forbidden', { status: 403 })",
  "  }",
  "",
  "  // Rate limit auth routes",
  "  if (pathname.startsWith('/auth/') || pathname.startsWith('/api/auth/signin')) {",
  "    if (!checkAuthRateLimit(ip)) {",
  "      return new NextResponse(",
  "        JSON.stringify({ error: 'Too many attempts. Please wait 15 minutes.' }),",
  "        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '900' } }",
  "      )",
  "    }",
  "  }",
  "",
  "  // Admin routes",
  "  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin-request')) {",
  "    if (pathname === '/admin') return NextResponse.next()",
  "    const adminToken = request.cookies.get('admin_token')?.value",
  "    if (!adminToken) return NextResponse.redirect(new URL('/admin', request.url))",
  "    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })",
  "    if (!token) return NextResponse.redirect(new URL('/auth/signin', request.url))",
  "    return NextResponse.next()",
  "  }",
  "",
  "  // Always public",
  "  const PUBLIC = ['/auth/', '/api/auth', '/api/analytics', '/api/admin', '/api/health',",
  "    '/api/announcement', '/api/temples', '/api/nearby', '/api/image-proxy', '/api/alerts']",
  "  if (PUBLIC.some(p => pathname.startsWith(p))) return NextResponse.next()",
  "",
  "  // Get session token",
  "  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })",
  "",
  "  // Landing page",
  "  if (pathname === '/') {",
  "    if (token) return NextResponse.redirect(new URL('/explore', request.url))",
  "    return NextResponse.next()",
  "  }",
  "",
  "  // All other pages require login",
  "  if (!token) {",
  "    const signInUrl = new URL('/auth/signin', request.url)",
  "    signInUrl.searchParams.set('callbackUrl', pathname)",
  "    return NextResponse.redirect(signInUrl)",
  "  }",
  "",
  "  return NextResponse.next()",
  "}",
  "",
  "export const config = {",
  "  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\\\..*|manifest.json|sw.js|icons).*)'],",
  "}",
].join('\n')

write('middleware.ts', middlewareLines)

// ── 6. Session expiry in auth options ────────────────────────
console.log('\n[6/6] Hardening auth session...')
let authOptions = fs.readFileSync(path.join(P, 'lib/auth/options.ts'), 'utf8')
if (!authOptions.includes('maxAge')) {
  authOptions = authOptions.replace(
    'providers:',
    "session: { strategy: 'jwt' as const, maxAge: 7 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },\n  providers:"
  )
  write('lib/auth/options.ts', authOptions)
} else {
  console.log('  SKIP: auth options already has maxAge')
}

// ── Push ──────────────────────────────────────────────────────
console.log('\nPushing to GitHub...')
process.chdir(P)
execSync('git add "lib/security.ts" "app/api/auth/register/route.ts" "app/api/temples/route.ts" "app/api/reviews/route.ts" "middleware.ts" "lib/auth/options.ts"', { stdio: 'inherit' })
execSync('git commit -m "security: rate limiting, sanitization, admin hardening, middleware protection"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\n============================================')
console.log(' Security hardening complete!')
console.log(' Vercel deploying in ~2 mins')
console.log('============================================')
