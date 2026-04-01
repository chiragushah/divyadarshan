import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@/lib/mongodb/connect'
import { DataReport } from '@/models'
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    await connectDB()
    await DataReport.create({
      ...body,
      reporter_id: token?.sub || '',
      reporter_email: (token?.email as string) || '',
    })
    return NextResponse.json({ success: true })
  } catch(err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
