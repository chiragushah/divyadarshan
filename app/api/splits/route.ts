import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb/connect'
import { GroupSplit } from '@/models'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const splits = await GroupSplit.find({ user_id: session.user.id }).sort({ updatedAt: -1 }).lean()
  return NextResponse.json({ data: splits.map(s => ({ ...s, id: s._id.toString() })) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const body = await req.json()

  if (body.id) {
    // Update existing split
    const split = await GroupSplit.findOneAndUpdate(
      { _id: body.id, user_id: session.user.id },
      { yatra_name: body.yatra_name, members: body.members, expenses: body.expenses },
      { new: true }
    )
    if (!split) return NextResponse.json({ error: 'Split not found' }, { status: 404 })
    return NextResponse.json({ data: { ...split.toObject(), id: split._id.toString() } })
  }

  const split = await GroupSplit.create({
    user_id: session.user.id,
    yatra_name: body.yatra_name,
    members: body.members || [],
    expenses: body.expenses || [],
  })
  return NextResponse.json({ data: { ...split.toObject(), id: split._id.toString() } })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const { id } = await req.json()
  await GroupSplit.findOneAndDelete({ _id: id, user_id: session.user.id })
  return NextResponse.json({ success: true })
}
