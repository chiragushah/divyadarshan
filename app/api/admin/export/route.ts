import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb/connect'
import { AdminSession, User } from '@/models'

async function verifyAdmin(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  await connectDB()
  return !!(await AdminSession.findOne({ token, expires_at: { $gt: new Date() } }))
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  const users = await User.find().sort({ createdAt: -1 }).select('name email provider createdAt').lean()
  const rows = [
    ['#', 'Name', 'Email', 'Sign-up Method', 'Registered Date'],
    ...(users as any[]).map((u: any, i: number) => [
      i + 1, u.name || '', u.email || '', u.provider || 'email',
      new Date(u.createdAt).toLocaleDateString('en-IN'),
    ])
  ]
  const csv = rows.map(r => r.map(String).map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n')
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="divyadarshanam-users-${new Date().toISOString().split('T')[0]}.csv"`,
    }
  })
}
