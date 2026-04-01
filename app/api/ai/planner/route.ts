import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { routeAI, SYSTEM_PROMPTS } from '@/lib/ai/router'
import connectDB from '@/lib/mongodb/connect'
import { AIUsageLog } from '@/models'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const start = Date.now()
  const session = await getServerSession(authOptions)
  const body = await req.json()

  // ✅ Fixed: match exact field names sent by the planner form
  const { from, to, mode, days, pilgrims, deity, notes } = body

  const userMessage = `Plan a ${days || 3}-day pilgrimage to ${to} for ${pilgrims || 2} pilgrim(s).
Starting from: ${from}.
Travel mode: ${mode || 'Mixed'}.
${deity ? `Deity focus: ${deity}.` : ''}
${notes ? `Additional context: ${notes}` : ''}

Please provide:
1. A detailed day-by-day itinerary with timings
2. Key temples and darshan spots to visit
3. Recommended accommodation near the temple
4. Local food and prasad tips
5. Important tips and things to know before visiting`

  try {
    const result = await routeAI('planner', SYSTEM_PROMPTS.planner, userMessage, { maxTokens: 3000 })
    const duration_ms = Date.now() - start

    await connectDB()
    await AIUsageLog.create({
      user_id:     session?.user?.id || 'anonymous',
      user_email:  session?.user?.email || '',
      feature:     'planner',
      provider:    result.provider,
      duration_ms,
      destination: to || '',
      success:     true,
    }).catch(() => {})

    return NextResponse.json({ itinerary: result.content, provider: result.provider })

  } catch (err: any) {
    await connectDB()
    await AIUsageLog.create({
      user_id:     session?.user?.id || 'anonymous',
      user_email:  session?.user?.email || '',
      feature:     'planner',
      provider:    'claude',
      duration_ms: Date.now() - start,
      success:     false,
      error_msg:   err.message,
    }).catch(() => {})

    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
