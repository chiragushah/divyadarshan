import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, Temple } from '@/models'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

// Admin-only CSV: every temple on the portal and which details are still missing.
export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  await connectDB()
  if (!(await (AdminSession as any).findOne({ token, expires_at: { $gt: new Date() } }).lean())) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const rows: any[] = await (Temple as any).find({}).sort({ state: 1, name: 1 }).lean()
  const has = (v: any) => (Array.isArray(v) ? v.length > 0 : v && typeof v === 'object' ? Object.keys(v).length > 0 : !!(v && String(v).trim()))
  const checks: [string, (t: any) => boolean][] = [
    ['description', t => String(t.extended_description || t.description || '').length >= 120],
    ['timing', t => has(t.timing)], ['poojas', t => has(t.poojas)], ['how_to_reach', t => has(t.how_to_reach)],
    ['facilities', t => has(t.facilities)], ['festivals', t => has(t.festivals)], ['best_time', t => has(t.best_time)],
    ['nearby_places', t => has(t.nearby_places)], ['image', t => has(t.image_url) || has(t.blob_image_url)],
    ['coords', t => typeof t.lat === 'number' && typeof t.lng === 'number'], ['official_website', t => has(t.official_website)],
  ]
  const q = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const head = ['slug', 'name', 'state', 'city', 'deity', 'type', 'basic_listing', 'filled', 'of', 'missing', 'official_website', 'lat', 'lng']
  const out = [head.join(',')]
  for (const t of rows) {
    const miss = checks.filter(([, f]) => !f(t)).map(([k]) => k)
    out.push([t.slug, t.name, t.state, t.city, t.deity, t.type, t.is_basic ? 'yes' : '', checks.length - miss.length, checks.length, miss.join(' | '), t.official_website || '', t.lat ?? '', t.lng ?? ''].map(q).join(','))
  }
  return new NextResponse('﻿' + out.join('\n'), { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="temple-gaps-${new Date().toISOString().slice(0, 10)}.csv"` } })
}
