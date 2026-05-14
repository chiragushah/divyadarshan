// Update all 31 remaining temples with live stream data
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

const TEMPLES = [
  {
    slug: 'arunachaleswarar-temple',
    channelId: 'UC2dzxD-qouX44-N1nowCeKg',
    ytChannel: 'https://www.youtube.com/channel/UC2dzxD-qouX44-N1nowCeKg',
    directUrl: 'https://arunachalam.org/live',
    streamType: 'both',
  },
  {
    slug: 'ramanathaswamy-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=ramanathaswamy+rameswaram+live+darshan',
    directUrl: 'https://www.rameswaramtemple.tnhrce.in',
    streamType: 'both',
  },
  {
    slug: 'kamakhya-devi-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=kamakhya+temple+live+darshan',
    directUrl: 'https://kamakhyatemple.org',
    streamType: 'both',
  },
  {
    slug: 'dwarkadhish-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=dwarkadhish+temple+live+darshan',
    directUrl: 'https://dwarkadhishtemple.org',
    streamType: 'both',
  },
  {
    slug: 'omkareshwar-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=omkareshwar+jyotirlinga+live',
    directUrl: 'https://www.omkareshwar.org',
    streamType: 'both',
  },
  {
    slug: 'trimbakeshwar-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=trimbakeshwar+jyotirlinga+live+darshan',
    directUrl: 'https://trimbakeshwar.org',
    streamType: 'both',
  },
  {
    slug: 'kanaka-durga-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=kanaka+durga+vijayawada+live',
    directUrl: 'https://kanakadurgamma.org',
    streamType: 'both',
  },
  {
    slug: 'vijayawada-kanaka-durga',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=vijayawada+kanaka+durga+live+darshan',
    directUrl: 'https://kanakadurgamma.org',
    streamType: 'both',
  },
  {
    slug: 'dakshineswar-kali-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=dakshineswar+kali+temple+live+darshan',
    directUrl: 'https://www.dakshineswarkalitemple.org',
    streamType: 'both',
  },
  {
    slug: 'kalighat-kali-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=kalighat+kali+temple+live+darshan',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'baidyanath-temple-deoghar',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=baidyanath+dham+deoghar+live',
    directUrl: 'https://www.baidyanathdham.com',
    streamType: 'both',
  },
  {
    slug: 'jwala-ji-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=jwala+ji+temple+himachal+live+darshan',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'srisailam-mallikarjuna',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=srisailam+mallikarjuna+live+darshan',
    directUrl: 'https://www.srisailadevasthanam.org',
    streamType: 'both',
  },
  {
    slug: 'srirangam-ranganathaswamy',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=srirangam+ranganathaswamy+live',
    directUrl: 'https://www.srirangam.org',
    streamType: 'both',
  },
  {
    slug: 'srirangam-ranganathaswamy-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=srirangam+ranganathaswamy+live',
    directUrl: 'https://www.srirangam.org',
    streamType: 'both',
  },
  {
    slug: 'chamundeshwari-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=chamundeshwari+temple+mysore+live',
    directUrl: 'https://chamundeshwaritemple.kar.nic.in',
    streamType: 'both',
  },
  {
    slug: 'vithoba-temple-pandharpur',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=pandharpur+vitthal+vithoba+live+darshan',
    directUrl: 'https://www.vitthal.in',
    streamType: 'both',
  },
  {
    slug: 'mahalaxmi-temple-kolhapur',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=kolhapur+mahalaxmi+ambabai+live',
    directUrl: 'https://mahalaxmikolhapur.com',
    streamType: 'both',
  },
  {
    slug: 'shani-shingnapur-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=shani+shingnapur+live+darshan',
    directUrl: 'https://www.shanishingnapur.com',
    streamType: 'both',
  },
  {
    slug: 'tulja-bhavani-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=tulja+bhavani+temple+live',
    directUrl: 'https://tuljadevitemple.in',
    streamType: 'both',
  },
  {
    slug: 'krishna-janmabhoomi-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=krishna+janmabhoomi+mathura+live',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'banke-bihari-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=banke+bihari+temple+vrindavan+live',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'vindhyavasini-temple-mirzapur',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=vindhyavasini+devi+mirzapur+live',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'chitrakoot-ram-ghat',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=chitrakoot+ramghat+aarti+live',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'ranchhodraiji-temple-dakor',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=dakor+ranchhodraiji+live+darshan',
    directUrl: null,
    streamType: 'youtube',
  },
  {
    slug: 'udupi-sri-krishna-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=udupi+krishna+temple+live',
    directUrl: 'https://www.udupimutt.org',
    streamType: 'both',
  },
  {
    slug: 'tiruchendur-murugan-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=tiruchendur+murugan+temple+live',
    directUrl: 'https://www.tiruchendurmurugantemple.tnhrce.in',
    streamType: 'both',
  },
  {
    slug: 'palani-murugan-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=palani+murugan+dhandayuthapani+live',
    directUrl: 'https://www.palanitemple.tnhrce.in',
    streamType: 'both',
  },
  {
    slug: 'kanyakumari-devi-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=kanyakumari+devi+temple+live',
    directUrl: 'https://www.kanyakumaritemple.tnhrce.in',
    streamType: 'both',
  },
  {
    slug: 'yadagirigutta-temple',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=yadagirigutta+lakshmi+narasimha+live',
    directUrl: 'https://yadagirigutta.telangana.gov.in',
    streamType: 'both',
  },
  {
    slug: 'maheshwar-temple-madhya-pradesh',
    channelId: null,
    ytChannel: 'https://www.youtube.com/results?search_query=maheshwar+narmada+ghat+aarti+live',
    directUrl: null,
    streamType: 'youtube',
  },
]

async function main() {
  console.log('Connecting to MongoDB...')
  await mongoose.connect(process.env.MONGODB_URI)
  const db = mongoose.connection.db.collection('temples')

  console.log(`Updating ${TEMPLES.length} temples...`)
  for (const t of TEMPLES) {
    await db.updateOne(
      { slug: t.slug },
      {
        $set: {
          live_channel_id: t.channelId || null,
          live_direct_url: t.directUrl || null,
          live_yt_channel: t.ytChannel,
          live_stream_type: t.streamType,
          live_url: t.directUrl || t.ytChannel,
        }
      }
    )
    console.log(`  ✓ ${t.slug}`)
  }

  await mongoose.disconnect()
  console.log(`\nDone! All ${TEMPLES.length} temples updated with live stream data.`)
}

main().catch(console.error)
