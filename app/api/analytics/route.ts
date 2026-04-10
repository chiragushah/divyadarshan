import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import Analytics from '@/models/Analytics'

export const dynamic = 'force-dynamic'

// In-memory rate limiter â€” 1 hit per IP+path per 30s
// Prevents MongoDB connection exhaustion on Vercel serverless
const seen = new Map<string, number>()
const TTL  = 30_000

function rateLimited(ip: string, path: string): boolean {
  const key  = `${ip}:${path}`
  const now  = Date.now()
  const last = seen.get(key)
  if (last && now - last < TTL) return true
  seen.set(key, now)
  if (seen.size > 1000) {
    for (const [k, t] of seen) {
      if (now - t > TTL * 2) seen.delete(k)
    }
  }
  return false
}

export async function POST(req: NextRequest) {
  try {
    const ip   = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const body = await req.json().catch(() => ({}))
    const path = body.path || '/'

    if (rateLimited(ip, path)) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    await connectDB()
    await Analytics.create({
      path,
      referrer:   body.referrer   || '',
      userAgent:  body.userAgent  || '',
      templeSlug: body.templeSlug || null,
      sessionId:  body.sessionId  || null,
      createdAt:  new Date(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Analytics POST error:', err)
    return NextResponse.json({ ok: true })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const days  = parseInt(searchParams.get('days') || '7')
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const [total, byPath] = await Promise.all([
      Analytics.countDocuments({ createdAt: { $gte: since } }),
      Analytics.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: '$path', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 20 },
      ]),
    ])
    return NextResponse.json({ total, byPath, days })
  } catch (err) {
    console.error('Analytics GET error:', err)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
