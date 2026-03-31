import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { SavingsGoal } from '@/models'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const goals = await SavingsGoal.find({ user_id: session.user.id })
    .sort({ createdAt: -1 })
    .lean() as any

  return NextResponse.json({ data: goals.map((g: any) => ({ ...g, id: g._id.toString() })) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const body = await req.json()

  if (body.action === 'deposit') {
    // Push deposit into embedded array and increment current_amount atomically
    const goal = await SavingsGoal.findOneAndUpdate(
      { _id: body.goal_id, user_id: session.user.id },
      {
        $inc: { current_amount: body.amount },
        $push: { deposits: { amount: body.amount, note: body.note, deposited_at: new Date() } },
      },
      { new: true }
    )
    if (!goal) return NextResponse.json({ error: 'Goal not found' }, { status: 404 })
    return NextResponse.json({ data: { ...goal.toObject(), id: goal._id.toString() } })
  }

  // Create new goal
  const goal = await SavingsGoal.create({ ...body, user_id: session.user.id })
  return NextResponse.json({ data: { ...goal.toObject(), id: goal._id.toString() } })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const { id } = await req.json()
  await SavingsGoal.findOneAndDelete({ _id: id, user_id: session.user.id })
  return NextResponse.json({ success: true })
}
