const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

console.log('Fixing admin middleware...')
let c = fs.readFileSync(path.join(P, 'middleware.ts'), 'utf8')

// Remove the NextAuth check from admin routes - admin has its own token system
c = c.replace(
  `    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken) return NextResponse.redirect(new URL('/admin', request.url))
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    if (!token) return NextResponse.redirect(new URL('/auth/signin', request.url))
    return NextResponse.next()`,
  `    const adminToken = request.cookies.get('admin_token')?.value
    if (!adminToken) return NextResponse.redirect(new URL('/admin', request.url))
    return NextResponse.next()`
)

fs.writeFileSync(path.join(P, 'middleware.ts'), c, 'utf8')
console.log('OK: middleware fixed')

process.chdir(P)
execSync('git add middleware.ts', { stdio: 'inherit' })
execSync('git commit -m "fix: admin auth - remove NextAuth requirement for admin routes"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('Done! Vercel deploying in ~2 mins.')
