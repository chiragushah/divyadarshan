import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { routeAI, SYSTEM_PROMPTS } from '@/lib/ai/router'
import connectDB from '@/lib/mongodb/connect'
import { SearchLog, AIUsageLog } from '@/models'
import { Temple } from '@/models'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const start = Date.now()
  const { query } = await req.json()
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  try {
    // First try direct DB search
    await connectDB()
    const temples = await Temple.find({
      $or: [
        { name:  { $regex: query, $options: 'i' } },
        { city:  { $regex: query, $options: 'i' } },
        { state: { $regex: query, $options: 'i' } },
        { deity: { $regex: query, $options: 'i' } },
        { type:  { $regex: query, $options: 'i' } },
      ]
    }).limit(8).select('name city state deity type slug has_live').lean()

    const duration_ms = Date.now() - start

    // Log analytics
    await Promise.all([
      SearchLog.create({ user_id: token?.sub || 'anonymous', user_email: (token?.email as string) || '', query, provider: 'mongodb', duration_ms }).catch(() => {}),
      AIUsageLog.create({ user_id: token?.sub || 'anonymous', user_email: (token?.email as string) || '', feature: 'search', provider: 'groq', duration_ms, success: true }).catch(() => {}),
    ])

    if (temples.length > 0) {
      return NextResponse.json({ results: temples, provider: 'mongodb' })
    }

    // If no DB results, use Groq AI
    const result = await routeAI('search', SYSTEM_PROMPTS.search, query)
    return NextResponse.json({ results: [], aiSuggestion: result.content, provider: result.provider })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
