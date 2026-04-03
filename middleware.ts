import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin routes ───────────────────────────────────
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin-request')) {
    if (pathname === '/admin') return NextResponse.next()
    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken) return NextResponse.redirect(new URL('/admin', request.url))
    return NextResponse.next()
  }

  // ── Always public ──────────────────────────────────
  const PUBLIC = ['/auth/', '/api/auth', '/api/analytics', '/api/admin', '/api/health', '/api/announcement']
  if (PUBLIC.some(p => pathname.startsWith(p))) return NextResponse.next()

  // ── Get session token ──────────────────────────────
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // ── Landing page (/) ──────────────────────────────
  // If logged in → send to /explore
  // If not logged in → show landing page
  if (pathname === '/') {
    if (token) return NextResponse.redirect(new URL('/explore', request.url))
    return NextResponse.next()
  }

  // ── All other pages require login ──────────────────
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*|manifest.json|dynaimers-logo.jpg).*)'],
}

