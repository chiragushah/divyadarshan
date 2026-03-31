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
  const { destination, days, pilgrims, budget, transport, special_requests } = body

  const userMessage = `Plan a ${days}-day pilgrimage to ${destination} for ${pilgrims || 1} pilgrim(s).
Budget: ${budget || 'moderate'} per person.
Transport: ${transport || 'mixed'}.
${special_requests ? `Special requests: ${special_requests}` : ''}
Please provide a detailed day-by-day itinerary.`

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
      destination: destination || '',
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
