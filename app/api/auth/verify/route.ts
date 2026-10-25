import { NextRequest, NextResponse } from 'next/server'
import { consumeVerification } from '@/lib/emailVerification'
import { rateLimit, getIP, rateLimitResponse } from '@/lib/security'

export const dynamic = 'force-dynamic'

// POST (not GET) so mail-scanner link previews can never use up the link.
export async function POST(req: NextRequest) {
  const rl = rateLimit(getIP(req as any), 'verify', { limit: 20, windowMs: 15 * 60000 })
  if (!rl.allowed) return rateLimitResponse(rl.resetIn)
  const b = await req.json().catch(() => ({}))
  const r = await consumeVerification(String(b.token || ''))
  return NextResponse.json(r, { status: r.status === 'invalid' ? 400 : 200 })
}
