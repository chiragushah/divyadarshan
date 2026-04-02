import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { GroupYatraPlan } from '@/models/GroupYatraPlan'
import { routeAI, SYSTEM_PROMPTS } from '@/lib/ai/router'
export const dynamic = 'force-dynamic'

// ── GET — list all plans (published for users, all for admin) ─────────────
export async function GET(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  const { searchParams } = new URL(req.url)
  const id     = searchParams.get('id')
  const mine   = searchParams.get('mine') // plans where user joined

  if (id) {
    const plan = await GroupYatraPlan.findById(id).lean()
    return NextResponse.json({ plan })
  }

  let filter: any = { status: 'published' }

  if (mine && session?.user?.email) {
    filter = {
      status: 'published',
      'members.joined_by': session.user.email,
    }
  }

  const plans = await GroupYatraPlan.find(filter).sort({ created_at: -1 }).lean()
  return NextResponse.json({ plans })
}

// ── POST — create or update plan ──────────────────────────────────────────
export async function POST(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const body = await req.json()
  const { action, planId } = body

  // ── Generate AI travel plan for a member/group ──
  if (action === 'generate_plan') {
    const { memberCity, memberName, persons, destination, travelDates, templeInfo } = body
    const prompt = `Create a detailed travel plan for ${memberName} (${persons} person${persons > 1 ? 's' : ''}) travelling from ${memberCity} to ${destination} for a group pilgrimage on ${travelDates}.

Include:
1. Best travel options (train/flight/bus) from ${memberCity} to ${destination} with approximate costs per person
2. Recommended departure time to reach on schedule
3. Estimated total travel cost for ${persons} person${persons > 1 ? 's' : ''}
4. Meeting point suggestion at destination
5. Any specific tips for this route

Temple info: ${templeInfo || destination}

Keep it practical and specific to the route from ${memberCity}.`

    const result = await routeAI('planner', SYSTEM_PROMPTS.planner, prompt, { maxTokens: 1500 })

    // Estimate cost from response (rough extraction)
    const costMatch = result.content.match(/₹[\d,]+/)
    const estimatedCost = costMatch
      ? parseInt(costMatch[0].replace(/[₹,]/g, '')) * persons
      : 5000 * persons

    return NextResponse.json({
      plan: result.content,
      estimated_cost: estimatedCost,
      provider: result.provider,
    })
  }

  // ── Generate combined group itinerary ──
  if (action === 'generate_combined') {
    const { members, destination, travelDates, templeInfo } = body
    const memberSummary = members.map((m: any) =>
      `- ${m.name} from ${m.city} (${m.persons} persons)`
    ).join('\n')

    const prompt = `Create a combined group yatra itinerary for a group travelling to ${destination} on ${travelDates}.

Group members travelling from different cities:
${memberSummary}

Total group size: ${members.reduce((s: number, m: any) => s + m.persons, 0)} persons

Please provide:
1. Suggested meeting point at ${destination}
2. Day-wise group itinerary at the destination (temple visits, darshan timings, aarti, etc.)
3. Recommended group accommodation options
4. Group meal suggestions (prasad, local vegetarian food)
5. Group activity tips
6. Important group travel dos and don'ts

Temple: ${templeInfo || destination}`

    const result = await routeAI('planner', SYSTEM_PROMPTS.planner, prompt, { maxTokens: 2000 })
    return NextResponse.json({ itinerary: result.content, provider: result.provider })
  }

  // ── Create new plan ──
  if (!planId) {
    const plan = await GroupYatraPlan.create({
      ...body,
      created_by: session.user.email,
      status: 'draft',
    })
    return NextResponse.json({ plan })
  }

  // ── Update existing plan ──
  const plan = await GroupYatraPlan.findByIdAndUpdate(planId, body, { new: true })
  return NextResponse.json({ plan })
}

// ── PATCH — publish plan / join group ──────────────────────────────────────
export async function PATCH(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const body = await req.json()
  const { action, planId, memberIndex } = body

  if (action === 'publish') {
    const plan = await GroupYatraPlan.findByIdAndUpdate(
      planId,
      { status: 'published' },
      { new: true }
    )
    return NextResponse.json({ plan })
  }

  if (action === 'join') {
    const plan = await GroupYatraPlan.findById(planId)
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })

    const member = plan.members[memberIndex]
    if (!member) return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    if (member.is_assigned) return NextResponse.json({ error: 'This is a private group' }, { status: 403 })
    if (member.joined_by?.includes(session.user.email!))
      return NextResponse.json({ error: 'Already joined' }, { status: 400 })

    member.joined_by = [...(member.joined_by || []), session.user.email!]
    await plan.save()
    return NextResponse.json({ success: true })
  }

  if (action === 'leave') {
    const plan = await GroupYatraPlan.findById(planId)
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })

    const member = plan.members[memberIndex]
    if (member) {
      member.joined_by = (member.joined_by || []).filter(e => e !== session.user.email!)
      await plan.save()
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

// ── DELETE — delete a plan ────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  await GroupYatraPlan.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
