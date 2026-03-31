import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin routes: handled by admin auth, not NextAuth ──
  if (pathname.startsWith('/admin')) {
    // Login page is always accessible
    if (pathname === '/admin') return NextResponse.next()
    // All other /admin/* routes require admin cookie
    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  // ── Public paths — no login required ──────────────────
  const PUBLIC = ['/auth/', '/api/auth', '/api/analytics', '/api/admin', '/api/health']
  if (PUBLIC.some(p => pathname.startsWith(p))) return NextResponse.next()

  // ── Homepage — public ──────────────────────────────────
  if (pathname === '/') return NextResponse.next()

  // ── Everything else requires NextAuth session ──────────
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
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
