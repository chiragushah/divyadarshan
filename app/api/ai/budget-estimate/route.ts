import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
export const dynamic = 'force-dynamic'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  const { destination, origin, transport, days, pilgrims } = await req.json()

  if (!destination) {
    return NextResponse.json({ error: 'Destination required' }, { status: 400 })
  }

  const prompt = `You are a travel cost expert for India pilgrimages in 2025.

Research and estimate CURRENT realistic costs (in INR) for a pilgrimage trip to "${destination}" from "${origin || 'major Indian city'}".

Return ONLY a valid JSON object with NO explanation, NO markdown, NO preamble. Just raw JSON:

{
  "transport": {
    "train": <one-way per person in INR>,
    "flight": <one-way per person in INR>,
    "bus": <one-way per person in INR>,
    "car": <one-way per person in INR>
  },
  "stay": {
    "budget": <per night per room in INR>,
    "midrange": <per night per room in INR>,
    "comfortable": <per night per room in INR>
  },
  "meals": {
    "basic": <per person per day in INR>,
    "moderate": <per person per day in INR>,
    "comfortable": <per person per day in INR>
  },
  "extras": {
    "guide_per_day": <pandit or guide per day in INR>,
    "donations": <typical temple donation per pilgrim in INR>,
    "pooja_samagri": <pooja items per pilgrim in INR>,
    "vip_darshan": <special darshan ticket per pilgrim if applicable, else 0>
  },
  "notes": "<1-2 sentence tip about this specific destination's costs or what to watch out for>",
  "season": "<current season advice: best/avoid/okay>",
  "last_updated": "${new Date().toISOString()}"
}`

  try {
    // Use web_search tool so Claude fetches real current prices
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
      messages: [{ role: 'user', content: prompt }],
    })

    // Extract final text response (after tool use)
    const textBlock = response.content
      .filter((b: any) => b.type === 'text')
      .map((b: any) => b.text)
      .join('')

    // Parse JSON — strip any markdown fences just in case
    const clean = textBlock.replace(/```json|```/g, '').trim()
    const costs = JSON.parse(clean)

    return NextResponse.json({ success: true, costs })

  } catch (err: any) {
    console.error('Budget estimate error:', err)
    // Return fallback base costs so UI doesn't break
    return NextResponse.json({
      success: false,
      error: 'Could not fetch live prices. Using base estimates.',
      costs: getFallback(destination),
    })
  }
}

// Fallback realistic base costs if AI/search fails
function getFallback(destination: string) {
  const d = destination.toLowerCase()

  // Remote/high-altitude destinations cost more
  const isRemote = /kedarnath|badrinath|char dham|hemkund|vaishno|amarnath/.test(d)
  const isMajor  = /tirupati|shirdi|varanasi|puri|mathura|vrindavan/.test(d)

  const mult = isRemote ? 1.6 : isMajor ? 1.3 : 1.0

  return {
    transport: {
      train:  Math.round(2200 * mult),
      flight: Math.round(6500 * mult),
      bus:    Math.round(900  * mult),
      car:    Math.round(3500 * mult),
    },
    stay: {
      budget:      Math.round(750  * mult),
      midrange:    Math.round(2000 * mult),
      comfortable: Math.round(4500 * mult),
    },
    meals: {
      basic:       300,
      moderate:    700,
      comfortable: 1200,
    },
    extras: {
      guide_per_day: 1500,
      donations:     Math.round(1200 * mult),
      pooja_samagri: 800,
      vip_darshan:   isRemote ? 0 : isMajor ? 1500 : 500,
    },
    notes: 'Using base estimates. Enter your destination and click "Get Live Prices" for current rates.',
    season: 'okay',
    last_updated: new Date().toISOString(),
  }
}
