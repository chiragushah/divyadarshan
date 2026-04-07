// check-temple-health.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  const total      = await T.countDocuments()
  const noImg      = await T.countDocuments({ $or: [{ image_url: { $exists: false } }, { image_url: '' }, { image_url: null }] })
  const noLat      = await T.countDocuments({ $or: [{ lat: { $exists: false } }, { lat: 0 }, { lat: null }] })
  const noDesc     = await T.countDocuments({ $or: [{ description: { $exists: false } }, { description: '' }] })
  const noTiming   = await T.countDocuments({ $or: [{ timing: { $exists: false } }, { timing: '' }] })
  const noBestTime = await T.countDocuments({ $or: [{ best_time: { $exists: false } }, { best_time: '' }] })
  const noDress    = await T.countDocuments({ $or: [{ dress_code: { $exists: false } }, { dress_code: '' }] })
  const noFest     = await T.countDocuments({ $or: [{ festivals: { $exists: false } }, { festivals: '' }] })
  const hasLive    = await T.countDocuments({ has_live: true })
  const noNearby   = await T.countDocuments({ $or: [{ nearby_places: { $exists: false } }, { nearby_places: { $size: 0 } }] })
  const hasSeasonal = await T.countDocuments({ is_seasonal: true })
  const noWebsite  = await T.countDocuments({ $or: [{ official_website: { $exists: false } }, { official_website: '' }] })

  console.log('\n=== DivyaDarshan Temple Data Health ===\n')
  console.log('Total temples:         ', total)
  console.log('')
  console.log('✅ COMPLETE:')
  console.log('  Has image:           ', total - noImg, '/', total)
  console.log('  Has nearby places:   ', total - noNearby, '/', total)
  console.log('  Has description:     ', total - noDesc, '/', total)
  console.log('  Has live darshan:    ', hasLive, '(live streams)')
  console.log('  Has seasonal data:   ', hasSeasonal, '(seasonal temples)')
  console.log('')
  console.log('⚠️  MISSING:')
  console.log('  No coordinates:      ', noLat, 'temples')
  console.log('  No timing:           ', noTiming, 'temples')
  console.log('  No best time:        ', noBestTime, 'temples')
  console.log('  No dress code:       ', noDress, 'temples')
  console.log('  No festivals:        ', noFest, 'temples')
  console.log('  No website:          ', noWebsite, 'temples')
  console.log('')

  // Show sample of temples missing coordinates
  if (noLat > 0) {
    const missingCoords = await T.find({ $or: [{ lat: { $exists: false } }, { lat: 0 }, { lat: null }] }, { name: 1, city: 1, state: 1 }).limit(10).lean()
    console.log('Temples missing coordinates (sample):')
    missingCoords.forEach((t) => console.log(' -', t.name, '|', t.city, t.state))
  }

  await mongoose.disconnect()
}

main().catch(console.error)
