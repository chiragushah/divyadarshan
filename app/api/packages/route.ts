import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { Package } from '@/models'
export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const query: any = { is_active: true }
  if (searchParams.get('featured')) query.is_featured = true
  const packages = await Package.find(query).sort({ is_featured: -1, enquiry_count: -1 }).lean()
  return NextResponse.json({ packages })
}
