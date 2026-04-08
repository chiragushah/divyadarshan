// audit-swaminarayan.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

async function main() {
  await mongoose.connect(process.env.MONGODB_URI)
  const T = mongoose.models.Temple || mongoose.model('Temple', new mongoose.Schema({}, { strict: false }))

  const temples = await T.find({ type: 'Swaminarayan' }).lean()
  console.log(`\n=== Swaminarayan Temple Audit (${temples.length} temples) ===\n`)

  const issues = []

  for (const t of temples) {
    const problems = []

    // Check image
    if (!t.blob_image_url || t.blob_image_url === '') problems.push('No blob image')
    if (t.blob_image_url?.includes('kashi-vishwanath')) problems.push('Using Kashi image as fallback')

    // Check coordinates
    if (!t.lat || t.lat === 0) problems.push('No coordinates')

    // Check content
    if (!t.timing || t.timing === '') problems.push('No timing')
    if (!t.description || t.description.length < 50) problems.push('Short/no description')
    if (!t.nearby_places || t.nearby_places.length === 0) problems.push('No nearby places')
    if (!t.facilities || Object.keys(t.facilities).length === 0) problems.push('No facilities')
    if (!t.how_to_reach || Object.keys(t.how_to_reach).length === 0) problems.push('No how to reach')

    // Check facilities format consistency
    const facVals = Object.values(t.facilities || {})
    const hasEmojiFormat = facVals.some(v => v.startsWith('✅') || v.startsWith('❌') || v.startsWith('⚠️'))
    const hasPlainFormat = facVals.some(v => !v.startsWith('✅') && !v.startsWith('❌') && !v.startsWith('⚠️') && v.length > 0)
    if (hasPlainFormat && !hasEmojiFormat) problems.push('Facilities in plain text (not emoji format)')

    // Check categories is array
    if (!Array.isArray(t.categories)) problems.push('Categories not array: ' + typeof t.categories)

    const status = problems.length === 0 ? '✅' : '⚠️'
    console.log(`${status} ${t.name}`)
    console.log(`   Slug: ${t.slug}`)
    console.log(`   Coords: ${t.lat}, ${t.lng}`)
    console.log(`   Image: ${t.blob_image_url?.slice(50, 90) || 'MISSING'}`)
    console.log(`   Nearby: ${t.nearby_places?.length || 0} places`)
    console.log(`   Facilities: ${Object.keys(t.facilities || {}).length} fields`)
    if (problems.length > 0) {
      problems.forEach(p => console.log(`   ❗ ${p}`))
      issues.push({ name: t.name, problems })
    }
    console.log()
  }

  console.log('\n=== Summary ===')
  console.log('Total Swaminarayan temples:', temples.length)
  console.log('With issues:', issues.length)
  console.log('Clean:', temples.length - issues.length)

  if (issues.length > 0) {
    console.log('\nTemples needing fixes:')
    issues.forEach(i => {
      console.log(`  ${i.name}:`)
      i.problems.forEach(p => console.log(`    - ${p}`))
    })
  }

  await mongoose.disconnect()
}

main().catch(console.error)
