import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { routeAI, SYSTEM_PROMPTS } from '@/lib/ai/router'
import connectDB from '@/lib/mongodb/connect'
import { YatraPlan } from '@/models'
import type { PlannerInput } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const input: PlannerInput = await req.json()
    if (!input.from || !input.to || !input.days) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const userMessage = `
Plan a ${input.days}-day pilgrimage for ${input.pilgrims || 1} pilgrim(s).
FROM: ${input.from}
DESTINATION: ${input.to}
TRAVEL MODE: ${input.mode || 'Train'}
DEITY FOCUS: ${input.deity || 'Any'}
SPECIAL REQUESTS: ${input.notes || 'None'}

Create a complete day-by-day itinerary with timings, darshan sequences, accommodation, local food, and practical tips. Include estimated costs in INR.`

    const response = await routeAI('planner', SYSTEM_PROMPTS.planner, userMessage, { maxTokens: 3000 })

    // Save to DB if logged in
    const session = await getServerSession(authOptions)
    if (session?.user?.id) {
      await connectDB()
      await YatraPlan.create({
        user_id: session.user.id,
        title: `${input.to} — ${input.days} Days`,
        destination: input.to,
        itinerary: response.content,
        days: input.days,
        pilgrims: input.pilgrims || 1,
        is_public: false,
      })
    }

    return NextResponse.json({ itinerary: response.content, provider: response.provider, model: response.model })
  } catch (error: any) {
    console.error('Planner error:', error)
    return NextResponse.json({ error: 'Failed to generate itinerary. Please try again.' }, { status: 500 })
  }
}
