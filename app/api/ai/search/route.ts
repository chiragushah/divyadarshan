import { NextRequest, NextResponse } from 'next/server'
import { routeAI, SYSTEM_PROMPTS } from '@/lib/ai/router'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()
    if (!query || query.trim().length < 2) {
      return NextResponse.json({ error: 'Query too short' }, { status: 400 })
    }

    await connectDB()

    // First try MongoDB full-text search
    const dbResults = await Temple.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(6)
      .select('slug name state city deity type has_live rating_avg')
      .lean() as any

    if (dbResults.length >= 3) {
      return NextResponse.json({
        results: dbResults.map((t: any) => ({ ...t, id: t._id.toString() })),
        source: 'database',
      })
    }

    // Fallback: Groq semantic search
    const response = await routeAI(
      'search',
      SYSTEM_PROMPTS.search,
      `Find temples matching: "${query}"\n\nReturn a JSON array of up to 5 temples. Each: { name, state, city, deity, why_match, unique_fact }. JSON only, no markdown.`,
      { maxTokens: 800 }
    )

    let aiResults = []
    try {
      aiResults = JSON.parse(response.content.replace(/```json|```/g, '').trim())
    } catch { aiResults = [] }

    return NextResponse.json({ results: aiResults, source: 'ai', provider: response.provider })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}
