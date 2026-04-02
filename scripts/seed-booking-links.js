// Run: node scripts/seed-booking-links.js
require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
const GROQ_KEY = process.env.GROQ_API_KEY

// ── Known city codes for major pilgrimage cities ──────────────────────────
// MakeMyTrip uses city slugs, RedBus uses hyphenated city names
const KNOWN_CITIES = {
  // city name (lowercase) → { mmt, redbus, irctc_code }
  'varanasi':        { mmt: 'varanasi',        redbus: 'varanasi',         irctc: 'BSB' },
  'tirupati':        { mmt: 'tirupati',        redbus: 'tirupati',         irctc: 'TPTY' },
  'shirdi':          { mmt: 'shirdi',          redbus: 'shirdi',           irctc: 'SNSI' },
  'mathura':         { mmt: 'mathura',         redbus: 'mathura',          irctc: 'MTJ' },
  'vrindavan':       { mmt: 'mathura',         redbus: 'mathura',          irctc: 'MTJ' },
  'haridwar':        { mmt: 'haridwar',        redbus: 'haridwar',         irctc: 'HW' },
  'rishikesh':       { mmt: 'rishikesh',       redbus: 'rishikesh',        irctc: 'RKSH' },
  'kedarnath':       { mmt: 'kedarnath',       redbus: 'haridwar',         irctc: 'HW' },
  'badrinath':       { mmt: 'badrinath',       redbus: 'haridwar',         irctc: 'HW' },
  'ujjain':          { mmt: 'ujjain',          redbus: 'ujjain',           irctc: 'UJN' },
  'nashik':          { mmt: 'nashik',          redbus: 'nashik',           irctc: 'NK' },
  'pune':            { mmt: 'pune',            redbus: 'pune',             irctc: 'PUNE' },
  'mumbai':          { mmt: 'mumbai',          redbus: 'mumbai',           irctc: 'CSTM' },
  'delhi':           { mmt: 'new-delhi',       redbus: 'delhi',            irctc: 'NDLS' },
  'new delhi':       { mmt: 'new-delhi',       redbus: 'delhi',            irctc: 'NDLS' },
  'amritsar':        { mmt: 'amritsar',        redbus: 'amritsar',         irctc: 'ASR' },
  'jammu':           { mmt: 'jammu',           redbus: 'jammu',            irctc: 'JAT' },
  'katra':           { mmt: 'katra',           redbus: 'katra',            irctc: 'SVDK' },
  'madurai':         { mmt: 'madurai',         redbus: 'madurai',          irctc: 'MDU' },
  'kanchipuram':     { mmt: 'kanchipuram',     redbus: 'kanchipuram',      irctc: 'CJ' },
  'rameswaram':      { mmt: 'rameswaram',      redbus: 'rameswaram',       irctc: 'RMM' },
  'thanjavur':       { mmt: 'thanjavur',       redbus: 'thanjavur',        irctc: 'TJ' },
  'tiruvannamalai':  { mmt: 'tiruvannamalai',  redbus: 'tiruvannamalai',   irctc: 'TNM' },
  'puri':            { mmt: 'puri',            redbus: 'puri',             irctc: 'PURI' },
  'bhubaneswar':     { mmt: 'bhubaneswar',     redbus: 'bhubaneswar',      irctc: 'BBS' },
  'guwahati':        { mmt: 'guwahati',        redbus: 'guwahati',         irctc: 'GHY' },
  'kolkata':         { mmt: 'kolkata',         redbus: 'kolkata',          irctc: 'HWH' },
  'ahmedabad':       { mmt: 'ahmedabad',       redbus: 'ahmedabad',        irctc: 'ADI' },
  'somnath':         { mmt: 'somnath',         redbus: 'somnath',          irctc: 'SMNH' },
  'dwarka':          { mmt: 'dwarka',          redbus: 'dwarka',           irctc: 'DWK' },
  'hyderabad':       { mmt: 'hyderabad',       redbus: 'hyderabad',        irctc: 'SC' },
  'bangalore':       { mmt: 'bengaluru',       redbus: 'bangalore',        irctc: 'SBC' },
  'bengaluru':       { mmt: 'bengaluru',       redbus: 'bangalore',        irctc: 'SBC' },
  'mysuru':          { mmt: 'mysore',          redbus: 'mysore',           irctc: 'MYS' },
  'mysore':          { mmt: 'mysore',          redbus: 'mysore',           irctc: 'MYS' },
  'udupi':           { mmt: 'udupi',           redbus: 'udupi',            irctc: 'UD' },
  'mangalore':       { mmt: 'mangalore',       redbus: 'mangalore',        irctc: 'MAQ' },
  'thiruvananthapuram': { mmt: 'thiruvananthapuram', redbus: 'thiruvananthapuram', irctc: 'TVC' },
  'trivandrum':      { mmt: 'thiruvananthapuram', redbus: 'thiruvananthapuram', irctc: 'TVC' },
  'thrissur':        { mmt: 'thrissur',        redbus: 'thrissur',         irctc: 'TCR' },
  'guruvayur':       { mmt: 'thrissur',        redbus: 'guruvayur',        irctc: 'GUV' },
  'kochi':           { mmt: 'kochi',           redbus: 'kochi',            irctc: 'ERS' },
  'bhopal':          { mmt: 'bhopal',          redbus: 'bhopal',           irctc: 'BPL' },
  'indore':          { mmt: 'indore',          redbus: 'indore',           irctc: 'INDB' },
  'gwalior':         { mmt: 'gwalior',         redbus: 'gwalior',          irctc: 'GWL' },
  'agra':            { mmt: 'agra',            redbus: 'agra',             irctc: 'AGC' },
  'allahabad':       { mmt: 'prayagraj',       redbus: 'prayagraj',        irctc: 'ALD' },
  'prayagraj':       { mmt: 'prayagraj',       redbus: 'prayagraj',        irctc: 'ALD' },
  'ayodhya':         { mmt: 'ayodhya',         redbus: 'ayodhya',          irctc: 'AY' },
  'lucknow':         { mmt: 'lucknow',         redbus: 'lucknow',          irctc: 'LKO' },
  'chandigarh':      { mmt: 'chandigarh',      redbus: 'chandigarh',       irctc: 'CDG' },
  'jaipur':          { mmt: 'jaipur',          redbus: 'jaipur',           irctc: 'JP' },
  'jodhpur':         { mmt: 'jodhpur',         redbus: 'jodhpur',          irctc: 'JU' },
  'pushkar':         { mmt: 'ajmer',           redbus: 'ajmer',            irctc: 'AII' },
  'ajmer':           { mmt: 'ajmer',           redbus: 'ajmer',            irctc: 'AII' },
  'bikaner':         { mmt: 'bikaner',         redbus: 'bikaner',          irctc: 'BKN' },
  'nathdwara':       { mmt: 'udaipur',         redbus: 'nathdwara',        irctc: 'UDZ' },
  'udaipur':         { mmt: 'udaipur',         redbus: 'udaipur',          irctc: 'UDZ' },
  'patna':           { mmt: 'patna',           redbus: 'patna',            irctc: 'PNBE' },
  'gaya':            { mmt: 'gaya',            redbus: 'gaya',             irctc: 'GAYA' },
  'bodh gaya':       { mmt: 'gaya',            redbus: 'gaya',             irctc: 'GAYA' },
  'ranchi':          { mmt: 'ranchi',          redbus: 'ranchi',           irctc: 'RNC' },
  'surat':           { mmt: 'surat',           redbus: 'surat',            irctc: 'ST' },
  'vadodara':        { mmt: 'vadodara',        redbus: 'vadodara',         irctc: 'BRC' },
  'rajkot':          { mmt: 'rajkot',          redbus: 'rajkot',           irctc: 'RJT' },
  'coimbatore':      { mmt: 'coimbatore',      redbus: 'coimbatore',       irctc: 'CBE' },
  'chennai':         { mmt: 'chennai',         redbus: 'chennai',          irctc: 'MAS' },
  'chidambaram':     { mmt: 'chidambaram',     redbus: 'chidambaram',      irctc: 'CDM' },
  'kumbakonam':      { mmt: 'kumbakonam',      redbus: 'kumbakonam',       irctc: 'KMU' },
  'hampi':           { mmt: 'hampi',           redbus: 'hospet',           irctc: 'HPT' },
  'hospet':          { mmt: 'hampi',           redbus: 'hospet',           irctc: 'HPT' },
  'badami':          { mmt: 'badami',          redbus: 'badami',           irctc: 'BMI' },
  'kolhapur':        { mmt: 'kolhapur',        redbus: 'kolhapur',         irctc: 'KOP' },
  'pandharpur':      { mmt: 'solapur',         redbus: 'pandharpur',       irctc: 'SUR' },
  'aurangabad':      { mmt: 'aurangabad',      redbus: 'aurangabad',       irctc: 'AWB' },
  'ellora':          { mmt: 'aurangabad',      redbus: 'aurangabad',       irctc: 'AWB' },
  'nagpur':          { mmt: 'nagpur',          redbus: 'nagpur',           irctc: 'NGP' },
  'visakhapatnam':   { mmt: 'visakhapatnam',   redbus: 'visakhapatnam',    irctc: 'VSKP' },
  'vijayawada':      { mmt: 'vijayawada',      redbus: 'vijayawada',       irctc: 'BZA' },
  'srisailam':       { mmt: 'srisailam',       redbus: 'srisailam',        irctc: 'MBD' },
  'siliguri':        { mmt: 'siliguri',        redbus: 'siliguri',         irctc: 'NJP' },
  'darjeeling':      { mmt: 'darjeeling',      redbus: 'darjeeling',       irctc: 'NJP' },
}

function getCityLinks(city, state, templeName) {
  const cityLower = (city || '').toLowerCase().trim()
  const codes = KNOWN_CITIES[cityLower]

  if (codes) {
    return {
      hotels:   'https://www.makemytrip.com/hotels/' + codes.mmt + '/hotels-in-' + codes.mmt + '.html',
      trains:   'https://www.irctc.co.in/nget/train-search',
      buses:    'https://www.redbus.in/bus-tickets/' + codes.redbus,
      flights:  'https://www.makemytrip.com/flights/',
    }
  }

  // Fallback to Google search for unknown cities
  const q = encodeURIComponent(city + ' ' + state + ' India')
  const tq = encodeURIComponent(templeName)
  return {
    hotels:  'https://www.google.com/search?q=hotels+near+' + tq,
    trains:  'https://www.irctc.co.in/nget/train-search',
    buses:   'https://www.google.com/search?q=bus+to+' + q,
    flights: 'https://www.google.com/search?q=flights+to+' + q,
  }
}

async function main() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(MONGODB_URI)
  const db = mongoose.connection.db
  const temples = await db.collection('temples').find({}).toArray()
  console.log('Found ' + temples.length + ' temples\n')

  let known = 0, fallback = 0
  for (const t of temples) {
    const cityLower = (t.city || '').toLowerCase().trim()
    const hasKnownCode = !!KNOWN_CITIES[cityLower]
    const links = getCityLinks(t.city, t.state, t.name)

    await db.collection('temples').updateOne(
      { _id: t._id },
      { $set: { booking_links: links } }
    )

    if (hasKnownCode) {
      known++
      console.log('OK  ' + t.name + ' (' + t.city + ')')
    } else {
      fallback++
      console.log('~   ' + t.name + ' (' + t.city + ') - Google fallback')
    }
  }

  console.log('\nDone!')
  console.log('Exact city codes: ' + known + '/' + temples.length)
  console.log('Google fallback:  ' + fallback + '/' + temples.length)
  await mongoose.disconnect()
}

main().catch(e => { console.error('FATAL:', e.message); process.exit(1) })
