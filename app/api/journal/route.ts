import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import connectDB from '@/lib/mongodb/connect'
import { JournalEntry, User } from '@/models'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const entries = await JournalEntry.find({ user_id: session.user.id })
    .sort({ visit_date: -1 })
    .lean()

  return NextResponse.json({ data: entries.map(e => ({ ...e, id: e._id.toString() })) })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const body = await req.json()

  const entry = await JournalEntry.create({ ...body, user_id: session.user.id })

  // Increment temples_visited counter on user profile
  await User.findByIdAndUpdate(session.user.id, { $inc: { temples_visited: 1 } })

  return NextResponse.json({ data: { ...entry.toObject(), id: entry._id.toString() } })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: 'Auth required' }, { status: 401 })

  await connectDB()
  const { id } = await req.json()

  await JournalEntry.findOneAndDelete({ _id: id, user_id: session.user.id })
  await User.findByIdAndUpdate(session.user.id, { $inc: { temples_visited: -1 } })

  return NextResponse.json({ success: true })
}
