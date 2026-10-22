import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import connectDB from '@/lib/mongodb/connect'
import { PrasadReminder } from '@/models/Prasad'
import { getFestival } from '@/lib/data/festivals'
import { nextOccurrence } from '@/lib/festivalDates'
import { itemsToBasket } from '@/lib/prasad/reminderList'
import { buildShoppingList } from '@/lib/prasad/merge'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const esc = (s: string) => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string))

// Runs once a day (see vercel.json). Vercel sends  Authorization: Bearer <CRON_SECRET>.
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
  }
  const user = process.env.SMTP_USER || process.env.EMAIL_FROM
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD
  if (!user || !pass) return NextResponse.json({ skipped: 'Email (SMTP) is not configured' })

  await connectDB()
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user, pass },
  })

  const reminders = await PrasadReminder.find({ active: true }).lean() as any[]
  let sent = 0, checked = 0
  for (const r of reminders) {
    const f = getFestival(r.festival_slug)
    if (!f) continue
    const occ = nextOccurrence(f)
    if (!occ) continue
    checked++
    const key = occ.date.toISOString().slice(0, 10)
    if (occ.daysAway < 0 || occ.daysAway > r.days_before || r.last_sent_for === key) continue

    const list = buildShoppingList(itemsToBasket(r.items))
    if (!list.length) continue
    const cats = Array.from(new Set(list.map(l => l.category)))
    const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:auto">
      <div style="background:#8B1A1A;color:#fff;padding:22px 26px;border-radius:14px 14px 0 0">
        <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.85">Prasad shopping reminder</div>
        <div style="font-size:22px;font-family:Georgia,serif;margin-top:4px">${esc(f.name)} — ${occ.daysAway === 0 ? 'today' : occ.daysAway === 1 ? 'tomorrow' : `in ${occ.daysAway} days`}</div>
        <div style="opacity:.85;font-size:13px;margin-top:4px">${esc(occ.display)}${occ.approx ? ' (date approximate — confirm locally)' : ''}</div>
      </div>
      <div style="border:1px solid #eee;border-top:0;padding:22px 26px;border-radius:0 0 14px 14px">
        <p style="font-size:14px;color:#444">Here is the combined shopping list for the prasad you planned (${r.items.length} recipe${r.items.length > 1 ? 's' : ''}).</p>
        ${cats.map(c => `<div style="font-weight:700;color:#8B1A1A;margin:14px 0 4px;font-size:13px;text-transform:uppercase">${esc(c)}</div>` +
          list.filter(l => l.category === c).map(l => `<div style="font-size:14px;padding:3px 0;color:#222">• ${esc(l.name)}${l.qty ? ` — <strong>${esc(l.qty)}</strong>` : ''}</div>`).join('')).join('')}
        <p style="margin-top:22px"><a href="https://divyadarshanam.org/festivals/${esc(f.slug)}" style="background:#8B1A1A;color:#fff;text-decoration:none;padding:10px 18px;border-radius:100px;font-size:14px">Open the festival guide &amp; prep plan</a></p>
        <p style="font-size:12px;color:#888;margin-top:20px">You asked for this reminder on divyadarshanam.org. Quantities are a starting point; follow your family’s or temple’s custom.</p>
      </div></div>`
    try {
      await transporter.sendMail({ from: `"DivyaDarshanam" <${user}>`, to: r.user_email, subject: `${f.name}: your prasad shopping list`, html })
      await PrasadReminder.updateOne({ _id: r._id }, { last_sent_for: key })
      sent++
    } catch (e) {
      console.error('prasad reminder email failed', r.user_email, e)
    }
  }
  return NextResponse.json({ checked, sent })
}
