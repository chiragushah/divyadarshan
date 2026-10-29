import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { User } from '@/models'
import { EmailVerification } from '@/models/EmailVerification'
import { autoImportOnce } from '@/lib/runOpenImport'

export const dynamic = 'force-dynamic'

// Daily: remove sign-ups that never confirmed their email within 7 days. Vercel sends  Authorization: Bearer <CRON_SECRET>.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  await connectDB()
  const cutoff = new Date(Date.now() - 7 * 24 * 3600_000)
  const stale: any[] = await (User as any).find({ verification_required: true, email_verified: { $exists: false }, createdAt: { $lt: cutoff }, temples_visited: { $in: [0, null] }, yatra_count: { $in: [0, null] } }).select('email').limit(1000).lean()
  const emails = stale.map(u => u.email)
  const del = emails.length ? await (User as any).deleteMany({ email: { $in: emails } }) : { deletedCount: 0 }
  if (emails.length) await EmailVerification.deleteMany({ email: { $in: emails } })
  // One-time: add the open-data temples (Maharashtra, Gujarat, Rajasthan). Does nothing after the first successful run.
  let imported: any = null
  try { imported = await autoImportOnce() } catch (e: any) { imported = { error: String(e?.message || e).slice(0, 200) } }
  return NextResponse.json({ removed: del.deletedCount || 0, imported })
}
