import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authAttempts = new Map()

function checkAuthRateLimit(ip) {
  const now = Date.now()
  const key = 'auth:' + ip
  const entry = authAttempts.get(key)
  if (!entry || now > entry.resetAt) {
    authAttempts.set(key, { count: 1, resetAt: now + 15 * 60000 })
    return true
  }
  if (entry.count >= 20) return false
  entry.count++
  return true
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'

  // Block path traversal attacks
  if (pathname.includes('..') || pathname.includes('%2e%2e')) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Block known scanning tools
  const ua = request.headers.get('user-agent') || ''
  if (/sqlmap|nikto|nmap|masscan|zgrab/i.test(ua)) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Rate limit auth routes
  if (pathname.startsWith('/auth/') || pathname.startsWith('/api/auth/signin')) {
    if (!checkAuthRateLimit(ip)) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many attempts. Please wait 15 minutes.' }),
        { status: 429, headers: { 'Content-Type': 'application/json', 'Retry-After': '900' } }
      )
    }
  }

  // Admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin-request')) {
    if (pathname === '/admin') return NextResponse.next()
    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken) return NextResponse.redirect(new URL('/admin', request.url))
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token) return NextResponse.redirect(new URL('/auth/signin', request.url))
    return NextResponse.next()
  }

  // Always public
  const PUBLIC = ['/auth/', '/api/auth', '/api/analytics', '/api/admin', '/api/health',
    '/api/announcement', '/api/temples', '/api/nearby', '/api/image-proxy', '/api/alerts']
  if (PUBLIC.some(p => pathname.startsWith(p))) return NextResponse.next()

  // Get session token
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // Landing page
  if (pathname === '/') {
    if (token) return NextResponse.redirect(new URL('/explore', request.url))
    return NextResponse.next()
  }

  // All other pages require login
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|manifest.json|sw.js|icons).*)'],
}