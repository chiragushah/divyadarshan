import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, SearchLog, AIUsageLog, PageViewLog, FinVerseClick } from '@/models'
import { User } from '@/models'
import mongoose from 'mongoose'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  const s = await AdminSession.findOne({ token, expires_at: { $gt: new Date() } })
  return !!s
}

const AI_COST: Record<string, number> = { claude: 0.009, gemini: 0.0002, groq: 0.0001 }
const USD_TO_INR = 83

// Get users from both our User model AND NextAuth adapter collection
async function getAllUsers(limit = 500) {
  const db = mongoose.connection.db
  if (!db) return []
  
  try {
    // Try NextAuth users collection first
    const nextAuthUsers = await db.collection('users').find({}).sort({ createdAt: -1 }).limit(limit).toArray()
    if (nextAuthUsers.length > 0) return nextAuthUsers
  } catch {}
  
  // Fall back to our User model
  return await User.find().sort({ createdAt: -1 }).limit(limit).select('name email provider createdAt').lean()
}

async function countAllUsers(since?: Date) {
  const db = mongoose.connection.db
  if (!db) return 0
  
  try {
    const query = since ? { createdAt: { $gte: since } } : {}
    const count = await db.collection('users').countDocuments(query)
    if (count > 0) return count
  } catch {}
  
  const query = since ? { createdAt: { $gte: since } } : {}
  return await User.countDocuments(query)
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  await connectDB()

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'overview'
  const days = parseInt(searchParams.get('days') || '30')
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  if (type === 'overview') {
    const [
      totalUsers, newUsers,
      totalSearches, totalAI, aiByProvider, aiByFeature, failedAI,
      totalPageViews, avgSession, topPages,
      totalFinVerse, dailyUsers,
    ] = await Promise.all([
      countAllUsers(),
      countAllUsers(since),
      SearchLog.countDocuments({ createdAt: { $gte: since } }),
      AIUsageLog.countDocuments({ createdAt: { $gte: since } }),
      AIUsageLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$provider', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      AIUsageLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$feature', count: { $sum: 1 } } }, { $sort: { count: -1 } }]),
      AIUsageLog.countDocuments({ success: false, createdAt: { $gte: since } }),
      PageViewLog.countDocuments({ createdAt: { $gte: since } }),
      PageViewLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: null, avg: { $avg: '$duration_sec' } } }]),
      PageViewLog.aggregate([{ $match: { createdAt: { $gte: since } } }, { $group: { _id: '$page', views: { $sum: 1 }, avg_sec: { $avg: '$duration_sec' } } }, { $sort: { views: -1 } }, { $limit: 10 }]),
      FinVerseClick.countDocuments({ createdAt: { $gte: since } }),
      (async () => {
        const db = mongoose.connection.db
        if (!db) return []
        try {
          return await db.collection('users').aggregate([
            { $match: { createdAt: { $gte: new Date(Date.now() - 14*24*60*60*1000) } } },
            { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
          ]).toArray()
        } catch { return [] }
      })(),
    ])

    const aiCostINR = aiByProvider.reduce((sum: number, p: any) => sum + (p.count * (AI_COST[p._id] || 0) * USD_TO_INR), 0)
    const avgSessionSec = Math.round(avgSession[0]?.avg || 0)
    const recentUsers = await getAllUsers(10)

    return NextResponse.json({
      overview: { totalUsers, newUsers, totalSearches, totalAI, failedAI, totalPageViews, avgSessionSec, totalFinVerse, aiCostINR: Math.round(aiCostINR * 100) / 100 },
      aiByProvider, aiByFeature, topPages, recentUsers, dailyUsers,
    })
  }

  if (type === 'users') {
    const users = await getAllUsers(500)
    return NextResponse.json({ users })
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
    const db = mongoose.connection.db
    const reviews = db ? await db.collection('reviews').find({}).sort({ createdAt: -1 }).limit(200).toArray() : []
    return NextResponse.json({ reviews })
  }

  if (type === 'temples') {
    const db = mongoose.connection.db
    const temples = db ? await db.collection('temples').find({}).sort({ name: 1 }).project({ name:1, state:1, city:1, deity:1, type:1, has_live:1, rating_avg:1, rating_count:1, slug:1 }).toArray() : []
    return NextResponse.json({ temples })
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
}
