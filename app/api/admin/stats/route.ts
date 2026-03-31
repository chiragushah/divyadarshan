import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, SearchLog, AIUsageLog, PageViewLog, FinVerseClick, Announcement } from '@/models'
import { User, Temple, Review } from '@/models'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  const s = await AdminSession.findOne({ token, expires_at: { $gt: new Date() } })
  return !!s
}

// AI cost per request (USD approx)
const AI_COST: Record<string, number> = { claude: 0.009, gemini: 0.0002, groq: 0.0001 }
const USD_TO_INR = 83

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  await connectDB()

  const { searchParams } = new URL(req.url)
  const type = searchParams.get('type') || 'overview'
  const days = parseInt(searchParams.get('days') || '30')
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  // ── OVERVIEW ─────────────────────────────────────
  if (type === 'overview') {
    const [
      totalUsers, newUsers,
      totalSearches, totalAI, aiByProvider, aiByFeature, failedAI,
      totalPageViews, avgSession, topPages,
      totalFinVerse, totalReviews, totalTemples,
      recentUsers,
      // Retention: users who logged in 2+ times
      retentionData,
      // Daily new users for chart
      dailyUsers,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: since } }),
      SearchLog.countDocuments({ createdAt: { $gte: since } }),
      AIUsageLog.countDocuments({ createdAt: { $gte: since } }),
      AIUsageLog.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: '$provider', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      AIUsageLog.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: '$feature', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      AIUsageLog.countDocuments({ success: false, createdAt: { $gte: since } }),
      PageViewLog.countDocuments({ createdAt: { $gte: since } }),
      PageViewLog.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: null, avg: { $avg: '$duration_sec' } } }
      ]),
      PageViewLog.aggregate([
        { $match: { createdAt: { $gte: since } } },
        { $group: { _id: '$page', views: { $sum: 1 }, avg_sec: { $avg: '$duration_sec' } } },
        { $sort: { views: -1 } }, { $limit: 10 }
      ]),
      FinVerseClick.countDocuments({ createdAt: { $gte: since } }),
      Review.countDocuments(),
      Temple.countDocuments(),
      User.find().sort({ createdAt: -1 }).limit(10).select('name email provider createdAt').lean(),
      // Retention (users active last 7 days vs last 30 days)
      PageViewLog.distinct('user_email', { createdAt: { $gte: new Date(Date.now() - 7*24*60*60*1000) }, user_email: { $ne: '' } }),
      // Daily new users (last 14 days)
      User.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 14*24*60*60*1000) } } },
        { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
    ])

    // AI cost calculation
    const aiCostINR = aiByProvider.reduce((sum: number, p: any) => {
      return sum + (p.count * (AI_COST[p._id] || 0) * USD_TO_INR)
    }, 0)

    const avgSessionSec = Math.round(avgSession[0]?.avg || 0)

    return NextResponse.json({
      overview: {
        totalUsers, newUsers, totalSearches, totalAI, failedAI,
        totalPageViews, avgSessionSec, totalFinVerse,
        totalReviews, totalTemples,
        aiCostINR: Math.round(aiCostINR * 100) / 100,
        activeUsersLast7d: retentionData.length,
      },
      aiByProvider, aiByFeature, topPages, recentUsers, dailyUsers,
    })
  }

  // ── USERS ─────────────────────────────────────────
  if (type === 'users') {
    const users = await User.find().sort({ createdAt: -1 }).limit(500)
      .select('name email provider createdAt').lean()
    return NextResponse.json({ users })
  }

  // ── USER DETAIL ────────────────────────────────────
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

  // ── SEARCHES ──────────────────────────────────────
  if (type === 'searches') {
    const searches = await SearchLog.find({ createdAt: { $gte: since } })
      .sort({ createdAt: -1 }).limit(300).lean()
    return NextResponse.json({ searches })
  }

  // ── AI USAGE ──────────────────────────────────────
  if (type === 'ai') {
    const ai = await AIUsageLog.find({ createdAt: { $gte: since } })
      .sort({ createdAt: -1 }).limit(300).lean()
    const failed = await AIUsageLog.find({ success: false, createdAt: { $gte: since } })
      .sort({ createdAt: -1 }).limit(50).lean()
    return NextResponse.json({ ai, failed })
  }

  // ── PAGE VIEWS ────────────────────────────────────
  if (type === 'pageviews') {
    const views = await PageViewLog.find({ createdAt: { $gte: since } })
      .sort({ createdAt: -1 }).limit(300).lean()
    const topTemples = await PageViewLog.aggregate([
      { $match: { page: { $regex: '^/temple/' }, createdAt: { $gte: since } } },
      { $group: { _id: '$page', views: { $sum: 1 }, avg_sec: { $avg: '$duration_sec' } } },
      { $sort: { views: -1 } }, { $limit: 20 }
    ])
    return NextResponse.json({ views, topTemples })
  }

  // ── FINVERSE ──────────────────────────────────────
  if (type === 'finverse') {
    const clicks = await FinVerseClick.find({ createdAt: { $gte: since } })
      .sort({ createdAt: -1 }).limit(200).lean()
    const bySrc = await FinVerseClick.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ])
    return NextResponse.json({ clicks, bySrc })
  }

  // ── REVIEWS ───────────────────────────────────────
  if (type === 'reviews') {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(200)
      .populate('temple', 'name slug').lean()
    return NextResponse.json({ reviews })
  }

  return NextResponse.json({ error: 'Unknown type' }, { status: 400 })
}
