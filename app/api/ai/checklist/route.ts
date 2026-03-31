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
  const { destination, days, mode, season, pilgrim_type, special_needs } = body

  const userMessage = `Generate a packing checklist for:
Destination: ${destination}
Duration: ${days} days
Travel mode: ${mode || 'mixed'}
Season: ${season || 'Winter (Oct-Mar)'}
Pilgrim type: ${pilgrim_type || 'Couple'}
${special_needs ? `Special needs: ${special_needs}` : ''}

Return as JSON with this exact structure:
{
  "categories": [
    {
      "name": "Category Name",
      "items": [
        { "name": "Item name", "priority": "must" | "recommended", "note": "optional tip" }
      ]
    }
  ],
  "destination_tips": ["tip1", "tip2", "tip3"]
}`

  try {
    const result = await routeAI('checklist', SYSTEM_PROMPTS.checklist, userMessage, { maxTokens: 2000 })
    const duration_ms = Date.now() - start

    // Parse JSON response
    let checklist
    try {
      const clean = result.content.replace(/```json|```/g, '').trim()
      checklist = JSON.parse(clean)
    } catch {
      checklist = { categories: [], destination_tips: [result.content] }
    }

    await connectDB()
    await AIUsageLog.create({
      user_id:     session?.user?.id || 'anonymous',
      user_email:  session?.user?.email || '',
      feature:     'checklist',
      provider:    result.provider,
      duration_ms,
      destination: destination || '',
      success:     true,
    }).catch(() => {})

    return NextResponse.json({ checklist, provider: result.provider })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
