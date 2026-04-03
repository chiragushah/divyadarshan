import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { GroupYatraPlan } from '@/models/GroupYatraPlan'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const id   = searchParams.get('id')
  const mine = searchParams.get('mine')
  const all  = searchParams.get('all')

  if (id) {
    const plan = await GroupYatraPlan.findById(id).lean()
    return NextResponse.json({ plan })
  }

  const session = await getServerSession(authOptions)

  if (mine && session?.user?.email) {
    const plans = await GroupYatraPlan.find({
      status: 'published',
      'groups.joined_by': session.user.email,
    }).sort({ created_at: -1 }).lean()
    return NextResponse.json({ plans })
  }

  if (all && session?.user?.email) {
    const plans = await GroupYatraPlan.find({ created_by: session.user.email }).sort({ created_at: -1 }).lean()
    return NextResponse.json({ plans })
  }

  const plans = await GroupYatraPlan.find({ status: 'published' }).sort({ created_at: -1 }).lean()
  return NextResponse.json({ plans })
}

export async function POST(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const body = await req.json()
  const { action } = body

  if (action === 'generate_plan') {
    const { groupCity, groupName, persons, destinations, travelDates } = body
    const destList = destinations.map((d: any, i: number) =>
      `${i + 1}. ${d.temple_name}, ${d.city}, ${d.state} (${d.nights} night${d.nights > 1 ? 's' : ''})`
    ).join('\n')

    const prompt = `Create a practical travel plan for ${groupName} (${persons} person${persons > 1 ? 's' : ''}) travelling from ${groupCity} to join a group yatra.

Destinations to cover in sequence:
${destList}

Travel dates: ${travelDates}

Please provide:
1. Best travel option from ${groupCity} to the first destination (train/flight/bus with approx cost)
2. Departure time recommended
3. Estimated travel cost for ${persons} person${persons > 1 ? 's' : ''} to reach the first destination
4. Any important tips for this specific route

Keep it concise and practical.`

    const Groq = (await import('groq')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
    })
    const plan = completion.choices[0]?.message?.content || ''
    const costMatch = plan.match(/₹[\d,]+/)
    const estimatedCost = costMatch ? parseInt(costMatch[0].replace(/[₹,]/g, '')) * persons : 4000 * persons

    return NextResponse.json({ plan, estimated_cost: estimatedCost })
  }

  if (action === 'generate_itinerary') {
    const { destinations, travelDates, durationDays, title } = body
    const destList = destinations.map((d: any, i: number) =>
      `Day ${d.sequence}+: ${d.temple_name}, ${d.city}, ${d.state} (${d.nights} night${d.nights > 1 ? 's' : ''})`
    ).join('\n')

    const prompt = `Create a detailed ${durationDays}-day group yatra itinerary for "${title}".

Destinations in sequence:
${destList}

Travel dates: ${travelDates}

Create a day-by-day itinerary covering:
- Each destination's key temples and darshan timings
- Morning/evening schedule
- Accommodation recommendations
- Local food and prasad
- Important tips per location
- Meeting point at first destination for all groups

Format as Day 1, Day 2 etc. with clear headings.`

    const Groq = (await import('groq')).default
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2500,
    })
    return NextResponse.json({ itinerary: completion.choices[0]?.message?.content || '' })
  }

  if (!body.planId) {
    const totalPersons = (body.groups || []).reduce((s: number, g: any) => s + g.persons, 0)
    const totalSeats = body.mode === 'open'
      ? (body.groups || []).reduce((s: number, g: any) => s + (g.seats || g.persons), 0)
      : undefined
    const plan = await GroupYatraPlan.create({
      ...body,
      total_persons: totalPersons,
      total_seats: totalSeats,
      created_by: session.user.email,
      organiser_name: session.user.name || '',
      status: 'draft',
    })
    return NextResponse.json({ plan })
  }

  const plan = await GroupYatraPlan.findByIdAndUpdate(body.planId, body, { new: true })
  return NextResponse.json({ plan })
}

export async function PATCH(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })

  const { action, planId, groupIndex } = await req.json()

  if (action === 'publish') {
    const plan = await GroupYatraPlan.findByIdAndUpdate(planId, { status: 'published' }, { new: true })
    return NextResponse.json({ plan })
  }

  if (action === 'join') {
    const plan = await GroupYatraPlan.findById(planId)
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    const group = plan.groups[groupIndex]
    if (!group) return NextResponse.json({ error: 'Group not found' }, { status: 404 })
    if (group.is_assigned) return NextResponse.json({ error: 'This is a private group' }, { status: 403 })
    const seats = group.seats || group.persons
    if ((group.joined_by?.length || 0) >= seats) return NextResponse.json({ error: 'No seats available' }, { status: 400 })
    if (group.joined_by?.includes(session.user.email!)) return NextResponse.json({ error: 'Already joined' }, { status: 400 })
    group.joined_by = [...(group.joined_by || []), session.user.email!]
    await plan.save()
    return NextResponse.json({ success: true })
  }

  if (action === 'leave') {
    const plan = await GroupYatraPlan.findById(planId)
    if (!plan) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    const group = plan.groups[groupIndex]
    if (group) {
      group.joined_by = (group.joined_by || []).filter((e: string) => e !== session.user.email!)
      await plan.save()
    }
    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}

export async function DELETE(req: NextRequest) {
  await connectDB()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  await GroupYatraPlan.findOneAndDelete({ _id: searchParams.get('id'), created_by: session.user.email })
  return NextResponse.json({ success: true })
}
