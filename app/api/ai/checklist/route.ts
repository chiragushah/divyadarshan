import { NextRequest, NextResponse } from 'next/server'
import { routeAI, SYSTEM_PROMPTS } from '@/lib/ai/router'
import type { ChecklistInput } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const input: ChecklistInput = await req.json()

    if (!input.destination) {
      return NextResponse.json({ error: 'Destination is required' }, { status: 400 })
    }

    const userMessage = `
Generate a complete packing checklist for:

DESTINATION: ${input.destination}
TRAVEL MODE: ${input.mode || 'Train'}
DURATION: ${input.days || 3} days
SEASON: ${input.season || 'winter'}
PILGRIM TYPE: ${input.pilgrim_type || 'couple'}
SPECIAL NEEDS: ${input.special_needs || 'none'}

Return a JSON object with this structure:
{
  "categories": [
    {
      "name": "Category Name",
      "items": [
        {
          "name": "Item name",
          "priority": "must" | "recommended",
          "note": "optional short note"
        }
      ]
    }
  ],
  "destination_tips": ["tip1", "tip2", "tip3"],
  "total_items": number
}

Be destination-specific. If Kedarnath → add altitude gear. If Tirupati → add dhoti. If Amarnath → add permits. Return only valid JSON.`

    const response = await routeAI('checklist', SYSTEM_PROMPTS.checklist, userMessage, {
      maxTokens: 2000,
    })

    let checklist = null
    try {
      const clean = response.content.replace(/```json|```/g, '').trim()
      checklist = JSON.parse(clean)
    } catch {
      // Return raw text if JSON parsing fails
      return NextResponse.json({
        raw: response.content,
        provider: response.provider,
      })
    }

    return NextResponse.json({
      checklist,
      provider: response.provider,
      model: response.model,
    })
  } catch (error) {
    console.error('Checklist error:', error)
    return NextResponse.json({ error: 'Failed to generate checklist' }, { status: 500 })
  }
}
