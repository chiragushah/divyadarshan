import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, SearchLog, AIUsageLog, PageViewLog, FinVerseClick } from '@/models'
import mongoose from 'mongoose'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  return !!(await AdminSession.findOne({ token, expires_at: { $gt: new Date() } }))
}

const AI_COST: Record<string, number> = { claude: 0.009, gemini: 0.0002, groq: 0.0001 }
const USD_TO_INR = 83

// Smart user fetcher — tries all possible collections NextAuth might use
async function getUsers(limit = 500, since?: Date) {
  await connectDB()
  const db = mongoose.connection.db
  if (!db) return { users: [], total: 0, newCount: 0 }

  // NextAuth adapter uses 'users' collection
  // Our custom model also uses 'users' collection (mongoose pluralizes 'User' → 'users')
  // So they should be the same collection!
  const query: any = {}
  if (since) query.createdAt = { $gte: since }

  const [users, total, newCount] = await Promise.all([
    db.collection('users').find({}).sort({ createdAt: -1 }).limit(limit).toArray(),
    db.collection('users').countDocuments({}),
    since ? db.collection('users').countDocuments({ createdAt: { $gte: since } }) : Promise.resolve(0),
  ])

  return { users, total, newCount }
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  await connectDB()

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'overview'
  const days = parseInt(searchParams.get('days') || '30')
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  const db = mongoose.connection.db!

  if (type === 'overview') {
    const { users: recentUsers, total: totalUsers, newCount: newUsers } = await getUsers(10, since)

    const [
      totalSearches, totalAI, aiByProvider, aiByFeature, failedAI,
      totalPageViews, avgSession, topPages, totalFinVerse, dailyUsers,
    ] = await Promise.all([
      SearchLog.countDocuments({ createdAt: { $gte: since } }),
      AIUsageLog.countDocuments({ createdAt: { $gte: since } }),
      AIUsageLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$provider', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      AIUsageLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$feature', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      AIUsageLog.countDocuments({ success: false, createdAt: { $gte: since } }),
      PageViewLog.countDocuments({ createdAt: { $gte: since } }),
      PageViewLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: null, avg: { $avg: '$duration_sec' } } }]),
      PageViewLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$page', views: { $sum: 1 }, avg_sec: { $avg: '$duration_sec' } } }, { $sort: { views: -1 } }, { $limit: 10 }]),
      FinVerseClick.countDocuments({ createdAt: { $gte: since } }),
      db.collection('users').aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 14*24*60*60*1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]).toArray().catch(() => []),
    ])

    const aiCostINR = aiByProvider.reduce((sum: number, p: any) => sum + (p.count * (AI_COST[p._id] || 0) * USD_TO_INR), 0)

    return NextResponse.json({
      overview: {
        totalUsers, newUsers, totalSearches, totalAI, failedAI,
        totalPageViews, avgSessionSec: Math.round(avgSession[0]?.avg || 0),
        totalFinVerse, aiCostINR: Math.round(aiCostINR * 100) / 100,
      },
      aiByProvider, aiByFeature, topPages,
      recentUsers: recentUsers.map((u: any) => ({ ...u, _id: u._id?.toString() })),
      dailyUsers,
    })
  }

  if (type === 'users') {
    const { users } = await getUsers(500)
    return NextResponse.json({ users: users.map((u: any) => ({ ...u, _id: u._id?.toString() })) })
  }

  if (type === 'user_detail') {
    const email = searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })
    const [searches, ai, pageviews, finverse] = await Promise.all([
      SearchLog.find({ user_email: email }).sort({ createdAt: -1 }).limit(50).lean(),
      AIUsageLog.find({ user_email: email }).sort({ createdAt: -1 }).limit(50).lean(),
      PageViewLog.find({ user_email: email }).sort({ createdAt: -1 }).limit(50).lean(),
      FinVerseClick.find({ user_email: email }).sort({ createdAt: -1 }).limit(20).lean(),
    ])
    return NextResponse.json({ searches, ai, pageviews, finverse })
  }

  if (type === 'searches') {
    const searches = await SearchLog.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(300).lean()
    return NextResponse.json({ searches })
  }

  if (type === 'ai') {
    const [ai, failed] = await Promise.all([
      AIUsageLog.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(300).lean(),
      AIUsageLog.find({ success: false, createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(50).lean(),
    ])
    return NextResponse.json({ ai, failed })
  }

  if (type === 'pageviews') {
    const [views, topTemples] = await Promise.all([
      PageViewLog.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(300).lean(),
      PageViewLog.aggregate([{ $match: { page: { $regex: '^/temple/' }, createdAt: { $gte: since } } }, { $group: { _id: '$page', views: { $sum: 1 }, avg_sec: { $avg: '$duration_sec' } } }, { $sort: { views: -1 } }, { $limit: 20 }]),
    ])
    return NextResponse.json({ views, topTemples })
  }

  if (type === 'finverse') {
    const [clicks, bySrc] = await Promise.all([
      FinVerseClick.find({ createdAt: { $gte: since } }).sort({ createdAt: -1 }).limit(200).lean(),
      FinVerseClick.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$source', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
    ])
    return NextResponse.json({ clicks, bySrc })
  }

  if (type === 'reviews') {
    const reviews = await db.collection('reviews').find({}).sort({ createdAt: -1 }).limit(200).toArray()
    return NextResponse.json({ reviews: reviews.map((r: any) => ({ ...r, _id: r._id?.toString() })) })
  }

  if (type === 'temples') {
    const temples = await db.collection('temples').find({}).sort({ name: 1 })
      .project({ name:1, state:1, city:1, deity:1, type:1, has_live:1, rating_avg:1, rating_count:1, slug:1 }).toArray()
    return NextResponse.json({ temples: temples.map((t: any) => ({ ...t, _id: t._id?.toString() })) })
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
}
