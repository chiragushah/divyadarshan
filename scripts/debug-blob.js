require('dotenv').config({ path: '.env.local' })
const { put } = require('@vercel/blob')

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  console.log('BLOB TOKEN:', token ? token.slice(0, 20) + '... (' + token.length + ' chars)' : 'MISSING!')

  // Test with a simple text upload first
  try {
    console.log('\nTesting Blob upload...')
    const blob = await put('test/hello.txt', 'Hello DivyaDarshan!', {
      access: 'public',
      token: token,
    })
    console.log('SUCCESS! URL:', blob.url)
  } catch (e) {
    console.log('ERROR:', e.message)
    console.log('Full error:', JSON.stringify(e, null, 2))
  }

  // Test image download
  console.log('\nTesting image download from Wikipedia...')
  try {
    const res = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Kashi_Vishwanath_Temple.jpg/800px-Kashi_Vishwanath_Temple.jpg', {
      headers: { 'User-Agent': 'DivyaDarshan/1.0' }
    })
    console.log('Download status:', res.status, res.statusText)
    console.log('Content-Type:', res.headers.get('content-type'))
  } catch (e) {
    console.log('Download ERROR:', e.message)
  }
}

main().catch(console.error)
