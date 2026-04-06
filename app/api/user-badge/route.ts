import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import connectDB from '@/lib/mongodb/connect'
import { Contribution } from '@/models/Contribution'
import { TempleRecommendation } from '@/models/TempleRecommendation'
import { getBadge } from '@/lib/badges'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return NextResponse.json({ badge: null, amount: 0, recs: 0 })

  await connectDB()

  const contributions = await Contribution.find({
    email: session.user.email,
    status: 'confirmed'
  }).lean()

  const recs = await TempleRecommendation.find({
    recommender_email: session.user.email,
    status: { $in: ['approved', 'added'] }
  }).lean()

  const totalAmount = contributions.reduce((s: number, c: any) => s + (c.amount || 0), 0)
  const approvedRecs = recs.length
  const badge = getBadge(totalAmount, approvedRecs)

  return NextResponse.json({ badge, amount: totalAmount, recs: approvedRecs })
}
