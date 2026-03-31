import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Pages that are public (no login required)
const PUBLIC_PATHS = [
  '/auth/signin',
  '/auth/signup', 
  '/auth/error',
  '/api/auth',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public paths
  if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  // Allow API routes except protected ones
  if (pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Check if user is authenticated
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Not signed in — redirect to sign in
  if (!token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|manifest.json).*)',
  ],
}
