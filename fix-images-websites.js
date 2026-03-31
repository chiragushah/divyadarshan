/**
 * Fix temple images with real Wikipedia images + add official websites
 * Usage: node fix-images-websites.js
 */
const fs = require('fs')
const { MongoClient } = require('mongodb')

let MONGODB_URI = ''
try {
  const env = fs.readFileSync('.env.local', 'utf8')
  const match = env.match(/MONGODB_URI=(.+)/)
  if (match) MONGODB_URI = match[1].trim()
} catch(e) { process.exit(1) }

// Wikipedia Special:FilePath - most reliable free image source
const W = s => `https://en.wikipedia.org/wiki/Special:FilePath/${s}?width=600`

// Specific image + website for each temple
const DATA = {
  // ── UTTAR PRADESH
  'kashi-vishwanath-temple':      { img: W('Kashi_Vishwanath_Temple.jpg'),            web: 'https://shrikashivishwanath.org' },
  'ram-lalla-temple':             { img: W('Ram_Mandir_Ayodhya.jpg'),                  web: 'https://srjbtkshetra.org' },
  'banke-bihari-temple':          { img: W('Banke_Bihari_Temple_Vrindavan.jpg'),       web: 'https://www.bankebihari.org' },
  'krishna-janmabhoomi-temple':   { img: W('Krishna_Janmabhoomi.jpg'),                 web: 'https://www.mathura.nic.in' },
  'prem-mandir':                  { img: W('Prem_Mandir_Vrindavan.jpg'),               web: 'https://www.premmandir.org' },
  'sankat-mochan-hanuman-temple': { img: W('Sankat_Mochan_Temple_Varanasi.jpg'),       web: '' },
  'tulsi-manas-temple':           { img: W('Tulsi_Manas_Temple_Varanasi.jpg'),         web: '' },
  'hanuman-garhi-temple':         { img: W('Hanuman_Garhi_Ayodhya.jpg'),               web: '' },
  'kanak-bhawan-temple':          { img: W('Kanak_Bhawan_Ayodhya.jpg'),                web: '' },
  'gorakhnath-temple':            { img: W('Gorakhnath_Temple_Gorakhpur.jpg'),         web: 'https://www.gorakhnathmandirtrust.org' },

  // ── UTTARAKHAND
  'kedarnath-temple':             { img: W('Kedarnath_Temple.jpg'),                    web: 'https://badrinath-kedarnath.gov.in' },
  'badrinath-temple':             { img: W('Badrinath_Temple.jpg'),                    web: 'https://badrinath-kedarnath.gov.in' },
  'gangotri-temple':              { img: W('Gangotri_temple.jpg'),                     web: 'https://badrinath-kedarnath.gov.in' },
  'yamunotri-temple':             { img: W('Yamunotri_temple.jpg'),                    web: 'https://badrinath-kedarnath.gov.in' },
  'tungnath-temple':              { img: W('Tungnath_Temple.jpg'),                     web: 'https://badrinath-kedarnath.gov.in' },
  'haridwar-har-ki-pauri':        { img: W('Har_ki_Pauri_Haridwar.jpg'),              web: '' },
  'chandi-devi-temple':           { img: W('Chandi_Devi_temple_Haridwar.jpg'),         web: '' },
  'mansa-devi-temple':            { img: W('Mansa_Devi_Temple_Haridwar.jpg'),          web: '' },
  'amarnath-cave-temple':         { img: W('Amarnath_cave_temple.jpg'),                web: 'https://shriamarnathjishrine.com' },

  // ── JAMMU & KASHMIR
  'vaishno-devi-shrine':          { img: W('Vaishno_Devi_Bhawan.jpg'),                web: 'https://maavaishnodevi.org' },
  'shankaracharya-temple-srinagar':{ img: W('Shankaracharya_temple_Srinagar.jpg'),   web: '' },

  // ── HIMACHAL PRADESH
  'jwala-ji-temple':              { img: W('Jwala_ji_temple.jpg'),                    web: 'https://jwalajitemple.org' },
  'naina-devi-temple-bilaspur':   { img: W('Naina_Devi_Temple_Bilaspur.jpg'),         web: '' },
  'chamunda-devi-temple-kangra':  { img: W('Chamunda_Devi_Temple_Kangra.jpg'),        web: '' },
  'bijli-mahadev-temple':         { img: W('Bijli_Mahadev_Temple_Kullu.jpg'),         web: '' },
  'bhimakali-temple-sarahan':     { img: W('Bhimakali_Temple_Sarahan.jpg'),           web: '' },
  'jakhoo-temple-shimla':         { img: W('Jakhu_Temple_Shimla.jpg'),                web: '' },

  // ── TAMIL NADU
  'meenakshi-amman-temple':       { img: W('Meenakshi_Amman_Temple_Madurai.jpg'),     web: 'https://maduraimeenakshi.org' },
  'brihadeeswarar-temple':        { img: W('Brihadeeswara_temple_Thanjavur_2.jpg'),   web: 'https://www.thanjavur.tn.gov.in' },
  'arunachaleswarar-temple':      { img: W('Arunachalam_temple.jpg'),                 web: 'https://www.arunachaleswarar.org' },
  'ramanathaswamy-temple':        { img: W('Rameshwaram_temple.jpg'),                 web: 'https://www.rameswaramtemple.tnhrce.in' },
  'srirangam-ranganathaswamy-temple':{ img: W('Srirangam_temple.jpg'),               web: 'https://www.srirangam.org' },
  'chidambaram-nataraja-temple':  { img: W('Chidambaram_Nataraja_temple.jpg'),        web: 'https://www.thillainatarajan.in' },
  'kanchi-kamakshi-temple':       { img: W('Kanchi_kamakshi_temple.jpg'),             web: 'https://www.kanchikamakshi.com' },
  'kapaleeshwarar-temple':        { img: W('Kapaleeswarar_Temple_Chennai.jpg'),       web: '' },
  'palani-murugan-temple':        { img: W('Palani_temple.jpg'),                      web: 'https://aadhinamurugantemple.tnhrce.in' },
  'tiruchendur-murugan-temple':   { img: W('Tiruchendur_murugan_temple.jpg'),         web: '' },
  'kanyakumari-devi-temple':      { img: W('Kanyakumari_temple.jpg'),                 web: '' },
  'gangai-konda-cholapuram':      { img: W('Gangaikonda_cholapuram_temple.jpg'),      web: '' },
  'airavatesvara-temple-darasuram':{ img: W('Darasuram.jpg'),                         web: '' },

  // ── ANDHRA PRADESH & TELANGANA
  'tirumala-venkateswara-temple': { img: W('Tirumala_temple2007.jpg'),                web: 'https://tirupati.org' },
  'kanaka-durga-temple':          { img: W('Kanakadurga_Temple_Vijayawada.jpg'),      web: 'https://kanakadurgamma.org' },
  'srisailam-mallikarjuna':       { img: W('Srisailam_temple.jpg'),                   web: 'https://srisailadevasthanam.org' },
  'yadagirigutta-temple':         { img: W('Yadadri_temple.jpg'),                     web: 'https://yadagiriguttatemple.org' },
  'bhagya-lakshmi-temple-hyderabad':{ img: W('Bhagyalakshmi_Temple_Hyderabad.jpg'),  web: '' },
  'simhachalam-temple':           { img: W('Simhachalam_temple.jpg'),                 web: '' },
  'vemulawada-rajarajeswara-temple':{ img: W('Vemulawada_temple.jpg'),               web: '' },

  // ── KARNATAKA
  'chamundeshwari-temple':        { img: W('Chamundi_Hills_Temple.jpg'),              web: 'https://chamundeshwaritemple.com' },
  'hampi-virupaksha-temple':      { img: W('Virupaksha_temple_Hampi.jpg'),            web: 'https://www.hampi.in' },
  'vittala-temple-hampi':         { img: W('Vittala_temple_Hampi.jpg'),               web: 'https://www.hampi.in' },
  'murudeshwara-temple':          { img: W('Murudeshwara_temple.jpg'),                web: '' },
  'hoysaleswara-temple':          { img: W('Hoysaleswara_temple.jpg'),                web: '' },
  'udupi-sri-krishna-temple':     { img: W('Udupi_Krishna_temple.jpg'),              web: 'https://www.srikrishnamatha.org' },
  'kukke-subramanya-temple':      { img: W('Kukke_Subrahmanya_temple.jpg'),           web: '' },
  'dharmasthala-temple':          { img: W('Dharmasthala_temple.jpg'),                web: 'https://www.dharmasthala.in' },
  'gokarna-mahabaleshwar-temple': { img: W('Gokarna_temple.jpg'),                    web: '' },
  'chenna-kesava-temple-belur':   { img: W('Chennakeshava_temple_Belur.jpg'),        web: '' },
  'hoysaleswara-temple':          { img: W('Halebid_temple.jpg'),                     web: '' },
  'sravanabelagola-gomateshwara': { img: W('Gomateshwara_bahubali.jpg'),             web: '' },
  'sravanabelagola-bahubali-temple':{ img: W('Gomateshwara_bahubali.jpg'),           web: '' },
  'mudabidri-jain-temples':       { img: W('Mudabidri_Jain_temple.jpg'),             web: '' },
  'kollur-mookambika-temple':     { img: W('Mookambika_Temple.jpg'),                 web: '' },
  'sringeri-sharada-temple':      { img: W('Sringeri_temple.jpg'),                   web: 'https://www.sringeri.net' },
  'iskcon-temple-bangalore':      { img: W('ISKCON_Bangalore.jpg'),                  web: 'https://www.iskconbangalore.org' },
  'nanjangud-srikanteshwara':     { img: W('Nanjangud_temple.jpg'),                  web: '' },
  'pattadakal-temples':           { img: W('Pattadakal_temples.jpg'),                web: '' },
  'badami-cave-temples':          { img: W('Badami_cave_temples.jpg'),               web: '' },
  'aihole-temples':               { img: W('Aihole_Durga_temple.jpg'),               web: '' },

  // ── KERALA
  'guruvayur-krishna-temple':     { img: W('Guruvayur_temple.jpg'),                  web: 'https://guruvayurdevaswom.in' },
  'padmanabhaswamy-temple':       { img: W('Padmanabhaswamy_temple.jpg'),            web: '' },
  'sabarimala-ayyappa-temple':    { img: W('Sabarimala_temple.jpg'),                 web: 'https://sabarimala.kerala.gov.in' },
  'sree-vadakkunnathan-temple':   { img: W('Vadakkunnathan_temple_Thrissur.jpg'),    web: '' },
  'attukal-bhagavathy-temple':    { img: W('Attukal_Devi_Temple.jpg'),               web: '' },
  'chottanikkara-devi-temple':    { img: W('Chottanikkara_temple.jpg'),              web: '' },
  'parassinikadavu-muthappan-temple':{ img: W('Parassinikadavu_Muthappan_temple.jpg'), web: '' },

  // ── MAHARASHTRA
  'trimbakeshwar-temple':         { img: W('Trimbakeshwar_Shiva_temple.jpg'),        web: 'https://trimbakeshwar.org' },
  'bhimashankar-temple':          { img: W('Bhimashankar_temple.jpg'),               web: '' },
  'grishneshwar-temple':          { img: W('Grishneshwar_temple.jpg'),               web: '' },
  'siddhivinayak-temple':         { img: W('Siddhivinayak_Temple_Mumbai.jpg'),       web: 'https://www.siddhivinayak.org' },
  'shirdi-sai-baba-samadhi':      { img: W('Shirdi_Sai_Baba_temple.jpg'),            web: 'https://www.shrisaibabasansthan.org' },
  'mahalaxmi-temple-kolhapur':    { img: W('Mahalaxmi_Temple_Kolhapur.jpg'),         web: '' },
  'tulja-bhavani-temple':         { img: W('Tuljapur_Bhavani_Temple.jpg'),           web: '' },
  'vithoba-temple-pandharpur':    { img: W('Vitthal_temple_Pandharpur.jpg'),         web: '' },
  'ashtavinayak-morgaon-temple':  { img: W('Morgaon_temple.jpg'),                   web: '' },
  'shani-shingnapur-temple':      { img: W('Shani_Shingnapur_Temple.jpg'),           web: '' },
  'kailasha-temple-ellora':       { img: W('Kailash_Temple_Ellora.jpg'),             web: '' },
  'elephanta-caves-temple':       { img: W('Trimurti_Elephanta.jpg'),                web: '' },
  'alandi-dnyaneshwar-temple':    { img: W('Alandi_Sant_Dnyaneshwar_Temple.jpg'),    web: '' },
  'vani-saptashringi-cable-car-temple':{ img: W('Saptashringi_temple.jpg'),          web: '' },
  'mahur-renuka-devi-temple':     { img: W('Mahur_Renuka_Devi_Temple.jpg'),         web: '' },
  'jejuri-khandoba-temple':       { img: W('Jejuri_Khandoba_temple.jpg'),            web: '' },

  // ── GUJARAT
  'somnath-temple':               { img: W('Somnath_temple.jpg'),                    web: 'https://somnath.org' },
  'dwarkadhish-temple':           { img: W('Dwarkadhish_temple.jpg'),               web: 'https://dwarkadhish.org' },
  'ambaji-temple':                { img: W('Ambaji_temple_Gujarat.jpg'),             web: 'https://ambajimandir.org' },
  'nageshwar-temple':             { img: W('Nagnath_temple.jpg'),                   web: '' },
  'palitana-temples':             { img: W('Palitana_Jain_temples.jpg'),             web: '' },
  'shankheshwar-parshwanath-temple':{ img: W('Shankheshwar_Parshwanath.jpg'),       web: '' },
  'ranchhodraiji-temple-dakor':   { img: W('Dakor_temple.jpg'),                     web: '' },
  'sun-temple-modhera':           { img: W('Modhera_sun_temple.jpg'),               web: '' },
  'taranga-jain-temple':          { img: W('Taranga_Jain_temple.jpg'),              web: '' },
  'chotila-chamunda-temple':      { img: W('Chotila_Chamunda_Temple.jpg'),          web: '' },
  'pavagadh-kalika-mata-temple':  { img: W('Pavagadh_temple.jpg'),                  web: '' },
  'girnar-jain-temples':          { img: W('Girnar_Jain_temples.jpg'),              web: '' },
  'hutheesing-jain-temple-ahmedabad':{ img: W('Hutheesing_Jain_temple.jpg'),        web: '' },

  // ── RAJASTHAN
  'brahma-temple-pushkar':        { img: W('Brahma_temple_Pushkar.jpg'),            web: '' },
  'karni-mata-temple':            { img: W('Karni_Mata_Temple_Deshnok.jpg'),        web: '' },
  'ranakpur-jain-temple':         { img: W('Ranakpur_Jain_Temple.jpg'),             web: '' },
  'dilwara-jain-temples':         { img: W('Vimala_Vasahi_temple_Dilwara.jpg'),     web: '' },
  'nakoda-jain-temple':           { img: W('Nakoda_temple.jpg'),                    web: '' },
  'jaisalmer-jain-temples':       { img: W('Jaisalmer_Jain_temples.jpg'),           web: '' },
  'eklingji-temple':              { img: W('Eklingji_Temple_Udaipur.jpg'),          web: '' },
  'nathdwara-temple':             { img: W('Nathdwara_temple.jpg'),                 web: '' },
  'salasar-balaji-temple':        { img: W('Salasar_Balaji_temple.jpg'),            web: '' },
  'govind-dev-temple-jaipur':     { img: W('Govind_Dev_Ji_Temple_Jaipur.jpg'),      web: '' },
  'tanot-mata-temple':            { img: W('Tanot_Mata_temple.jpg'),                web: '' },
  'bhandasar-jain-temple':        { img: W('Bhandasar_Jain_Temple_Bikaner.jpg'),    web: '' },

  // ── MADHYA PRADESH
  'mahakaleshwar-temple':         { img: W('Mahakaleshwar_Temple_Ujjain.jpg'),      web: 'https://mahakaleshwar.nic.in' },
  'omkareshwar-temple':           { img: W('Omkareshwar_temple.jpg'),               web: '' },
  'khajuraho-temples':            { img: W('Khajuraho_Kandariya_temple.jpg'),       web: '' },
  'sonagiri-jain-temples':        { img: W('Sonagiri_Jain_temples.jpg'),            web: '' },
  'orchha-ram-raja-temple':       { img: W('Orchha_Ram_Raja_Temple.jpg'),           web: '' },
  'bhojpur-bhojeshwar-temple':    { img: W('Bhojeshwar_temple.jpg'),               web: '' },
  'amarkantak-temple':            { img: W('Amarkantak_temple.jpg'),                web: '' },

  // ── ODISHA
  'jagannath-temple-puri':        { img: W('Jagannath_Temple_Puri.jpg'),           web: 'https://jagannath.nic.in' },
  'konark-sun-temple':            { img: W('Konarka_Temple.jpg'),                   web: '' },
  'lingaraj-temple-bhubaneswar':  { img: W('Lingaraja_temple.jpg'),                web: '' },
  'taratarini-temple':            { img: W('Taratarini_temple.jpg'),               web: '' },
  'mukteshwar-temple-bhubaneswar':{ img: W('Mukteshwar_Temple_Bhubaneswar.jpg'),  web: '' },
  'kapilash-temple':              { img: W('Kapilash_Shiva_temple.jpg'),           web: '' },

  // ── WEST BENGAL
  'dakshineswar-kali-temple':     { img: W('Dakshineswar_Kali_Temple.jpg'),         web: '' },
  'kalighat-kali-temple':         { img: W('Kalighat_Temple_Kolkata.jpg'),          web: '' },
  'belur-math-temple':            { img: W('Belur_Math.jpg'),                       web: 'https://belurmath.org' },
  'tarapith-temple':              { img: W('Tarapith_Temple.jpg'),                  web: '' },
  'tarkeshwar-shiva-temple':      { img: W('Tarakeswar_temple.jpg'),               web: '' },

  // ── ASSAM
  'kamakhya-devi-temple':         { img: W('Kamakhya_temple.jpg'),                  web: 'https://kamakhyatemple.in' },
  'umananda-temple':              { img: W('Umananda_temple.jpg'),                  web: '' },

  // ── JHARKHAND & BIHAR
  'baidyanath-temple-deoghar':    { img: W('Baidyanath_temple_Deoghar.jpg'),        web: 'https://babadham.org' },
  'pareshnath-temple-shikharji':  { img: W('Sammed_Shikharji.jpg'),                web: '' },
  'vishnupad-temple-gaya':        { img: W('Vishnupad_Temple_Gaya.jpg'),            web: '' },
  'mahabodhi-temple-bodh-gaya':   { img: W('Mahabodhi_Temple.jpg'),                web: '' },

  // ── PUNJAB & HARYANA
  'golden-temple-amritsar':       { img: W('The_Golden_Temple_of_Amritsar_Jan_2009.jpg'), web: 'https://www.goldentempleamritsar.org' },
  'durgiana-temple-amritsar':     { img: W('Durgiana_Temple_Amritsar.jpg'),         web: '' },

  // ── DELHI
  'akshardham-temple-delhi':      { img: W('Akshardham_temple_Delhi.jpg'),          web: 'https://www.akshardham.com' },
  'chattarpur-temple':            { img: W('Chattarpur_Temple_Delhi.jpg'),           web: '' },
  'birla-mandir-delhi':           { img: W('Lakshmi_Narayan_Temple_Delhi.jpg'),     web: '' },
  'lal-mandir-delhi':             { img: W('Lal_Mandir_Delhi.jpg'),                 web: '' },

  // ── GOA
  'mangeshi-temple':              { img: W('Mangeshi_Temple_Goa.jpg'),              web: '' },
  'shanta-durga-temple':          { img: W('Shanta_Durga_Temple_Goa.jpg'),          web: '' },
  'mahalsa-temple-mardol':        { img: W('Mahalsa_Temple_Goa.jpg'),              web: '' },
}

// Better category images (actual temple photos, not Taj Mahal!)
const CAT_IMAGES = {
  shiva:   'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Kedareswar_temple_Varanasi.jpg/500px-Kedareswar_temple_Varanasi.jpg',
  vishnu:  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Srirangam_temple.jpg/500px-Srirangam_temple.jpg',
  shakti:  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Meenakshi_Amman_Temple_Madurai.jpg/500px-Meenakshi_Amman_Temple_Madurai.jpg',
  ganesha: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Siddhivinayak_Temple_Mumbai.jpg/500px-Siddhivinayak_Temple_Mumbai.jpg',
  krishna: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Vrindavan_temples.jpg/500px-Vrindavan_temples.jpg',
  murugan: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Meenakshi_Amman_Temple_Madurai.jpg/500px-Meenakshi_Amman_Temple_Madurai.jpg',
  jain:    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Ranakpur_Jain_Temple.jpg/500px-Ranakpur_Jain_Temple.jpg',
  hanuman: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Sankat_Mochan_Temple_Varanasi.jpg/500px-Sankat_Mochan_Temple_Varanasi.jpg',
  south:   'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Brihadeeswarar_Temple.jpg/500px-Brihadeeswarar_Temple.jpg',
  north:   'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Kashi_Vishwanath_Temple.jpg/500px-Kashi_Vishwanath_Temple.jpg',
  hill:    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Kedarnath_Temple.jpg/500px-Kedarnath_Temple.jpg',
  coastal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Somnath_temple_Prabhas_Patan.jpg/500px-Somnath_temple_Prabhas_Patan.jpg',
}

function getFallbackImage(name, deity, type, state, categories) {
  const d = (deity||'').toLowerCase()
  const cat = (categories||[])
  if (cat.includes('Jain') || type?.includes('Jain')) return CAT_IMAGES.jain
  if (cat.includes('Hilltop')) return CAT_IMAGES.hill
  if (cat.includes('Coastal')) return CAT_IMAGES.coastal
  if (d.includes('shiva') || d.includes('mahadev') || d.includes('shankar')) return CAT_IMAGES.shiva
  if (d.includes('krishna') || d.includes('jagannath') || d.includes('vithal')) return CAT_IMAGES.krishna
  if (d.includes('vishnu') || d.includes('rama') || d.includes('venkat') || d.includes('narayan') || d.includes('balaji')) return CAT_IMAGES.vishnu
  if (d.includes('durga') || d.includes('kali') || d.includes('shakti') || d.includes('devi') || d.includes('amba') || d.includes('bhavani') || d.includes('chamunda') || d.includes('lakshmi')) return CAT_IMAGES.shakti
  if (d.includes('ganesha') || d.includes('ganesh') || d.includes('vinayak')) return CAT_IMAGES.ganesha
  if (d.includes('murugan') || d.includes('subramanya')) return CAT_IMAGES.murugan
  if (d.includes('hanuman') || d.includes('bajrang')) return CAT_IMAGES.hanuman
  // State-based fallback
  const southStates = ['Tamil Nadu','Kerala','Andhra Pradesh','Telangana','Karnataka']
  if (southStates.includes(state)) return CAT_IMAGES.south
  return CAT_IMAGES.north
}

async function main() {
  const client = new MongoClient(MONGODB_URI, { family:4, serverSelectionTimeoutMS:15000 })
  await client.connect()
  console.log('✅ Connected\n')

  const col = client.db().collection('temples')
  const temples = await col.find({}).toArray()
  console.log(`📊 Updating ${temples.length} temples...\n`)

  let ok = 0, imgFixed = 0, webAdded = 0

  for (const t of temples) {
    const specific = DATA[t.slug]
    const newImg = specific?.img || getFallbackImage(t.name, t.deity, t.type, t.state, t.categories)
    const website = specific?.web || ''

    await col.updateOne({ _id: t._id }, {
      $set: {
        image_url: newImg,
        ...(website ? { official_website: website } : {}),
      }
    })

    ok++
    if (newImg !== t.image_url) imgFixed++
    if (website) webAdded++
    if (ok % 50 === 0) console.log(`  ✅ ${ok}/${temples.length}...`)
  }

  console.log(`\n🎉 Done!`)
  console.log(`   Images updated: ${imgFixed}`)
  console.log(`   Websites added: ${webAdded}`)
  console.log(`   Total processed: ${ok}`)
  await client.close()
}

main().catch(e => { console.error('❌', e.message); process.exit(1) })
