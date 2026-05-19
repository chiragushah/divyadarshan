const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })
const P = 'C:\\Users\\chira\\Downloads\\divyadarshan'

async function main() {
  console.log('Fetching blob image URLs from MongoDB...')
  await mongoose.connect(process.env.MONGODB_URI)
  const db = mongoose.connection.db.collection('temples')

  const slugs = [
    'kedarnath-temple',
    'tirumala-venkateswara-temple',
    'kashi-vishwanath-temple',
    'vaishno-devi-shrine',
    'shirdi-sai-baba-samadhi',
    'somnath-temple',
  ]

  const temples = await db.find(
    { slug: { $in: slugs } },
    { projection: { slug: 1, name: 1, blob_image_url: 1, image_url: 1 } }
  ).toArray()

  await mongoose.disconnect()

  // Build a map
  const map = {}
  temples.forEach(t => {
    map[t.slug] = t.blob_image_url || t.image_url || ''
  })

  console.log('Image URLs found:')
  slugs.forEach(s => console.log(' ', s, '->', map[s] ? map[s].slice(0,60)+'...' : 'MISSING'))

  // Update page.tsx with real image URLs
  let page = fs.readFileSync(path.join(P, 'app/page.tsx'), 'utf8')

  const newCards = `const TEMPLE_CARDS = [
  { img: '${map['kedarnath-temple'] || ''}', title: 'Kedarnath Temple', desc: 'One of the holiest Shiva shrines. Plan your trek with AI-guided itineraries.', link: '/temple/kedarnath-temple' },
  { img: '${map['tirumala-venkateswara-temple'] || ''}', title: 'Tirumala Tirupati', desc: 'Most visited temple on Earth. Check live darshan slots.', link: '/temple/tirumala-venkateswara-temple' },
  { img: '${map['kashi-vishwanath-temple'] || ''}', title: 'Kashi Vishwanath', desc: 'The eternal city of Lord Shiva. Watch live darshan from the Jyotirlinga.', link: '/temple/kashi-vishwanath-temple' },
  { img: '${map['vaishno-devi-shrine'] || ''}', title: 'Vaishno Devi', desc: 'Plan your trek to Maa Vaishno Devi with route guides.', link: '/temple/vaishno-devi-shrine' },
  { img: '${map['shirdi-sai-baba-samadhi'] || ''}', title: 'Shirdi Sai Baba', desc: 'Watch live darshan from Shirdi Sai Baba Samadhi Mandir.', link: '/temple/shirdi-sai-baba-samadhi' },
  { img: '${map['somnath-temple'] || ''}', title: 'Somnath Temple', desc: 'First Jyotirlinga of Lord Shiva. Watch sunset aarti live.', link: '/temple/somnath-temple' },
]`

  // Replace old TEMPLE_CARDS
  page = page.replace(/const TEMPLE_CARDS = \[[\s\S]*?\]/m, newCards)

  fs.writeFileSync(path.join(P, 'app/page.tsx'), page, 'utf8')
  console.log('OK: page.tsx updated with blob image URLs')

  process.chdir(P)
  execSync('git add "app/page.tsx"', { stdio: 'inherit' })
  execSync('git commit -m "fix: temple cards use blob CDN images"', { stdio: 'inherit' })
  execSync('git push', { stdio: 'inherit' })
  console.log('Done! Vercel deploying in ~2 mins.')
}

main().catch(console.error)
