import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { aiRouter } from '@/lib/ai/router'
import connectDB from '@/lib/mongodb/connect'
import { AIUsageLog } from '@/models'

export async function POST(req: NextRequest) {
  const start = Date.now()
  const session = await getServerSession(authOptions)
  const body = await req.json()

  try {
    const result = await aiRouter.plan(body)
    const duration_ms = Date.now() - start

    await connectDB()
    await AIUsageLog.create({
      user_id:     session?.user?.id || 'anonymous',
      user_email:  session?.user?.email || '',
      feature:     'planner',
      provider:    'claude',
      duration_ms,
      destination: body.destination || '',
      success:     true,
    })

    return NextResponse.json(result)
  } catch (err: any) {
    await connectDB()
    await AIUsageLog.create({
      user_id:     session?.user?.id || 'anonymous',
      user_email:  session?.user?.email || '',
      feature:     'planner',
      provider:    'claude',
      duration_ms: Date.now() - start,
      success:     false,
    }).catch(() => {})
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
