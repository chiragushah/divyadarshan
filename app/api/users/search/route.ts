import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { User } from '@/models'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Login required' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()
  if (!q || q.length < 2) return NextResponse.json({ users: [] })
  await connectDB()
  const users = await User.find({
    email: { $ne: session.user.email },
    $or: [
      { email: { $regex: q, $options: 'i' } },
      { name:  { $regex: q, $options: 'i' } },
    ],
  }).select('name email').limit(8).lean()
  return NextResponse.json({ users })
}
