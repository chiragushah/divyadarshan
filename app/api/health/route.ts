import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'

export async function GET() {
  try {
    await connectDB()
    const count = await Temple.countDocuments()
    return NextResponse.json({ 
      status: 'ok', 
      temples: count,
      message: count > 0 ? `${count} temples in database` : 'No temples - run seed'
    })
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 })
  }
}
