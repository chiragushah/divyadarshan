import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { Sankalp } from '@/models/Sankalp'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const body = await req.json()
    if (!body.intention || !body.deity) {
      return NextResponse.json({ error: 'Intention and deity are required' }, { status: 400 })
    }
    await connectDB()
    const sankalp = await Sankalp.create({
      ...body,
      user_id: session?.user?.id,
      user_email: session?.user?.email || '',
      user_name: session?.user?.name || 'Anonymous Pilgrim',
    })
    return NextResponse.json({ success: true, id: sankalp._id })
  } catch(e) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type')
  const session = await getServerSession(authOptions)

  if (type === 'mine' && session?.user?.email) {
    const sankalpas = await Sankalp.find({ user_email: session.user.email }).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ sankalpas })
  }

  if (type === 'temple') {
    const slug = searchParams.get('slug')
    const sankalpas = await Sankalp.find({ temple_slug: slug, privacy: { $in: ['anonymous','public'] }, status: 'active' }).sort({ createdAt: -1 }).limit(20).lean()
    return NextResponse.json({ sankalpas: sankalpas.map((s: any) => ({ ...s, user_name: s.privacy === 'anonymous' ? 'A Pilgrim' : s.user_name, user_email: '' })) })
  }

  // Public wall
  const sankalpas = await Sankalp.find({ privacy: { $in: ['anonymous','public'] }, status: 'active' }).sort({ createdAt: -1 }).limit(30).lean()
  return NextResponse.json({ sankalpas: sankalpas.map((s: any) => ({ ...s, user_name: s.privacy === 'anonymous' ? 'A Pilgrim' : s.user_name, user_email: '' })) })
}

export async function PATCH(req: NextRequest) {
  const { id, status, fulfilled_note } = await req.json()
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  await connectDB()
  await Sankalp.updateOne(
    { _id: id, user_email: session.user.email },
    { status, fulfilled_note, ...(status === 'fulfilled' ? { fulfilled_at: new Date() } : {}) }
  )
  return NextResponse.json({ success: true })
}
