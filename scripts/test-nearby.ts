import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

async function main() {
  const groqKey = process.env.GROQ_API_KEY
  console.log('GROQ KEY LENGTH:', groqKey?.length)

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${groqKey}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 600,
      temperature: 0.1,
      messages: [
        { role: 'system', content: 'Return only JSON arrays.' },
        { role: 'user', content: 'List 3 places near Kashi Vishwanath temple Varanasi as JSON array with name, type, distance, description fields.' }
      ],
    }),
  })

  const data = await res.json()
  console.log('\nSTATUS:', res.status)
  console.log('\nFULL RESPONSE:')
  console.log(JSON.stringify(data, null, 2))
}

main().catch(console.error)
