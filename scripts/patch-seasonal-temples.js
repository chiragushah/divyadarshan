// patch-seasonal-temples.js
// Run: node scripts/patch-seasonal-temples.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const SEASONAL_TEMPLES = [
  { slug: 'kedarnath-temple',         open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens on Akshaya Tritiya (Apr/May), closes on Bhai Dooj (Oct/Nov)', is_seasonal: true },
  { slug: 'badrinath-temple',         open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens Apr/May, closes Nov for winter', is_seasonal: true },
  { slug: 'gangotri-temple',          open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens Akshaya Tritiya, closes Diwali', is_seasonal: true },
  { slug: 'yamunotri-temple',         open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Opens Akshaya Tritiya, closes Diwali', is_seasonal: true },
  { slug: 'hemkund-sahib',            open_months: [6,7,8,9],          closed_months: [10,11,12,1,2,3,4,5], seasonal_note: 'Open June to October only due to snowfall', is_seasonal: true },
  { slug: 'tungnath-temple',          open_months: [5,6,7,8,9,10],     closed_months: [11,12,1,2,3,4], seasonal_note: 'Highest Shiva temple, closed in winter', is_seasonal: true },
  { slug: 'maa-vaishno-devi-temple',  open_months: [1,2,3,4,5,6,7,8,9,10,11,12], closed_months: [], seasonal_note: 'Open year round, best Oct-Mar', is_seasonal: false },
]

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const Temple = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))
  for (const t of SEASONAL_TEMPLES) {
    const res = await Temple.updateOne(
      { slug: t.slug },
      { open_months: t.open_months, closed_months: t.closed_months, seasonal_note: t.seasonal_note, is_seasonal: t.is_seasonal }
    )
    console.log(t.slug, ':', res.matchedCount ? 'updated' : 'not found')
  }
  await mongoose.disconnect()
  console.log('Done!')
}
main().catch(console.error)
