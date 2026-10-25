import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, User } from '@/models'
import { isDisposable, looksRandom, looksRandomName, dotTrick, hasMailServer, domainOf, isBigProvider } from '@/lib/emailQuality'

export const dynamic = 'force-dynamic'

async function isAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  return !!(await (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }))
}

type Level = 'junk' | 'suspicious' | 'clean'
interface Row { id: string; name: string; email: string; phone: string; provider: string; createdAt: string; active: boolean; verified: boolean; flags: string[]; level: Level }

// Re-computed on the server for every call, so a delete can never rely on what the browser claims.
async function audit(): Promise<Row[]> {
  const users: any[] = await (User as any).find({}).sort({ createdAt: -1 }).limit(5000).select('name email phone provider createdAt temples_visited yatra_count email_verified').lean()
  const domains = Array.from(new Set(users.map(u => domainOf(String(u.email))).filter(d => d && !isBigProvider('x@' + d)))).slice(0, 400)
  const mx = new Map<string, boolean>()
  for (let i = 0; i < domains.length; i += 25) await Promise.all(domains.slice(i, i + 25).map(async d => { mx.set(d, await hasMailServer(d)) }))

  return users.map(u => {
    const email = String(u.email || ''), phone = String(u.phone || '').replace(/\s|\+91|-/g, '')
    const flags: string[] = []
    if (isDisposable(email)) flags.push('Disposable mailbox')
    if (mx.get(domainOf(email)) === false) flags.push('Domain cannot receive mail')
    if (dotTrick(email)) flags.push('Gmail dot trick (many dots)')
    if (looksRandom(email)) flags.push('Random-looking address')
    if (looksRandomName(String(u.name || ''))) flags.push('Gibberish name')
    if (u.provider !== 'google' && !/^\d{10}$/.test(phone)) flags.push('No valid mobile number')
    if (!u.name || String(u.name).trim().length < 2 || /^[^a-zA-Z]+$/.test(String(u.name))) flags.push('Odd name')
    const hard = flags.includes('Disposable mailbox') || flags.includes('Domain cannot receive mail')
    const gib = flags.includes('Gibberish name'), dots = flags.includes('Gmail dot trick (many dots)')
    const level: Level = hard || dots || (gib && (flags.includes('Random-looking address') || flags.includes('No valid mobile number'))) || (flags.includes('Random-looking address') && flags.includes('No valid mobile number')) ? 'junk' : flags.length ? 'suspicious' : 'clean'
    return { id: String(u._id), name: u.name || '', email, phone: u.phone || '', provider: u.provider || '', createdAt: u.createdAt, active: (u.temples_visited || 0) > 0 || (u.yatra_count || 0) > 0, verified: !!u.email_verified, flags, level }
  })
}

export async function GET(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const rows = await audit()
  if (req.nextUrl.searchParams.get('format') === 'csv') {
    const q = (v: string) => `"${String(v).replace(/"/g, '""')}"`
    const csv = ['name,email,phone,provider,created,level,flags', ...rows.map(r => [r.name, r.email, r.phone, r.provider, r.createdAt, r.level, r.flags.join('; ')].map(q).join(','))].join('\n')
    return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="users-audit.csv"' } })
  }
  return NextResponse.json({ rows })
}

// Delete selected accounts — only ones the server itself rates "junk" AND that have no activity.
export async function DELETE(req: NextRequest) {
  if (!(await isAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const b = await req.json().catch(() => ({}))
  // One account, chosen by the admin by hand: allowed for any account with no activity.
  if (b.single) {
    if (b.confirm !== 'DELETE') return NextResponse.json({ error: 'Confirmation missing.' }, { status: 400 })
    const u: any = await (User as any).findById(String(b.single)).select('temples_visited yatra_count').lean().catch(() => null)
    if (!u) return NextResponse.json({ error: 'Account not found.' }, { status: 404 })
    if ((u.temples_visited || 0) > 0 || (u.yatra_count || 0) > 0) return NextResponse.json({ error: 'This account has yatras or temple visits and cannot be deleted here.' }, { status: 409 })
    const r = await (User as any).deleteOne({ _id: String(b.single) })
    return NextResponse.json({ deleted: r.deletedCount || 0 })
  }
  const ids: string[] = Array.isArray(b.ids) ? b.ids.map(String).slice(0, 500) : []
  if (!ids.length || b.confirm !== 'DELETE') return NextResponse.json({ error: 'Select accounts and type DELETE to confirm.' }, { status: 400 })
  const rows = await audit()
  const ok = new Set(rows.filter(r => r.level === 'junk' && !r.active).map(r => r.id))
  const allowed = ids.filter(i => ok.has(i))
  const res = allowed.length ? await (User as any).deleteMany({ _id: { $in: allowed } }) : { deletedCount: 0 }
  return NextResponse.json({ deleted: res.deletedCount || 0, skipped: ids.length - allowed.length })
}
