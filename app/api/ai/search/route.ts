import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { aiRouter } from '@/lib/ai/router'
import connectDB from '@/lib/mongodb/connect'
import { SearchLog, AIUsageLog } from '@/models'

export async function POST(req: NextRequest) {
  const start = Date.now()
  const { query } = await req.json()
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  try {
    const result = await aiRouter.search(query)
    const duration_ms = Date.now() - start

    // Log analytics
    await connectDB()
    await Promise.all([
      SearchLog.create({
        user_id:    token?.sub || 'anonymous',
        user_email: (token?.email as string) || '',
        query,
        provider:   'groq',
        duration_ms,
      }),
      AIUsageLog.create({
        user_id:    token?.sub || 'anonymous',
        user_email: (token?.email as string) || '',
        feature:    'search',
        provider:   'groq',
        duration_ms,
        success:    true,
      }),
    ])

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
