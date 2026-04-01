import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import connectDB from '@/lib/mongodb/connect'
import { Enquiry, Package } from '@/models'
export const dynamic = 'force-dynamic'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    await connectDB()
    const enquiry = await Enquiry.create({
      ...body,
      user_id: token?.sub || '',
      user_email: (token?.email as string) || body.email,
    })
    if (body.package_slug) {
      await Package.updateOne({ slug: body.package_slug }, { $inc: { enquiry_count: 1 } })
    }
    return NextResponse.json({ success: true, id: enquiry._id })
  } catch(err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
