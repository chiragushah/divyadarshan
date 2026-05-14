const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const temples = await mongoose.connection.db.collection('temples')
    .find({ has_live: true, live_channel_id: { $exists: false } })
    .project({ name: 1, slug: 1, state: 1 })
    .toArray()
  console.log('Temples without stream data:', temples.length)
  temples.forEach(t => console.log(' -', t.name, '|', t.state, '|', t.slug))
  mongoose.disconnect()
}).catch(console.error)
