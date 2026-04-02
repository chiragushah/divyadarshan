require('dotenv').config({ path: '.env.local' })

fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + process.env.GEMINI_API_KEY)
  .then(r => r.json())
  .then(d => {
    if (d.error) { console.log('ERROR:', d.error.message); return }
    d.models.forEach(m => console.log(m.name))
  })
  .catch(console.error)
