/**
 * DivyaDarshan — MongoDB Seed Script
 * Seeds all 348 temples into MongoDB Atlas
 *
 * Run with:  npm run seed
 * Requires:  MONGODB_URI in .env.local
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI not found in environment. Create a .env.local file first.')
  process.exit(1)
}

// ─── TEMPLE SCHEMA (inline for seed script) ──────────────
const TempleSchema = new mongoose.Schema({
  slug:         { type: String, required: true, unique: true },
  name:         { type: String, required: true },
  state:        { type: String, required: true },
  city:         { type: String, required: true },
  deity:        { type: String, required: true },
  type:         { type: String, required: true },
  description:  { type: String, required: true },
  festivals:    String,
  timing:       String,
  best_time:    String,
  dress_code:   String,
  categories:   [String],
  has_live:     { type: Boolean, default: false },
  live_url:     String,
  lat:          Number,
  lng:          Number,
  image_url:    String,
  rating_avg:   { type: Number, default: 0 },
  rating_count: { type: Number, default: 0 },
}, { timestamps: true })

TempleSchema.index(
  { name: 'text', city: 'text', state: 'text', deity: 'text', description: 'text', type: 'text' },
  { weights: { name: 10, deity: 5, city: 4, state: 3, type: 2, description: 1 } }
)

// ─── SLUG GENERATOR ──────────────────────────────────────
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

// ─── TEMPLE DATA ─────────────────────────────────────────
// Source: Converted from the DivyaDarshan HTML prototype
const TEMPLES_RAW = [
  { n:"Kashi Vishwanath Temple",    st:"Uttar Pradesh",   ci:"Varanasi",         de:"Shiva",          ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/@ShriKashiVishwanathTemple", d:"One of holiest Jyotirlinga shrines on the western Ganges bank. Shiva's eternal abode. The golden spire is iconic worldwide.", f:"Mahashivratri, Shravan Somvar, Dev Deepawali", tm:"3AM-11PM",       bt:"Oct-Mar",       dc:"Traditional attire preferred", cat:["Jyotirlinga"], lat:25.3109, lng:83.0107 },
  { n:"Ram Lalla Temple",           st:"Uttar Pradesh",   ci:"Ayodhya",          de:"Rama",            ty:"Vaishnava",          lv:true,  lu:"https://srjbtkshetra.org/",                          d:"Newly consecrated grand temple at Lord Rama's birthplace. Inaugurated January 2024. A monumental milestone for Hindu civilisation.", f:"Ram Navami, Diwali, Vivah Panchami", tm:"6:30AM-10PM", bt:"Oct-Mar", dc:"Traditional attire mandatory", cat:["Ramayana"], lat:26.7955, lng:82.1988 },
  { n:"Kedarnath Temple",           st:"Uttarakhand",     ci:"Rudraprayag",      de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=kedarnath+live+darshan", d:"Jyotirlinga at 3,583m. Miraculously survived 2013 floods. One of Earth's most dramatic pilgrimage sites. Open only May-November.", f:"Kedarnath Opening Day, Bhai Dooj (closing)", tm:"4AM-9PM (seasonal)", bt:"May-Jun, Sep-Oct", dc:"Warm trekking gear essential", cat:["Jyotirlinga","Char Dham","Hilltop"], lat:30.7352, lng:79.0669 },
  { n:"Badrinath Temple",           st:"Uttarakhand",     ci:"Chamoli",          de:"Vishnu",          ty:"Char Dham",          lv:true,  lu:"https://www.youtube.com/results?search_query=badrinath+live+darshan", d:"Char Dham at 3,133m. Brightly painted facade against Himalayan peaks. Lord Badrinarayan (reclining Vishnu) enshrined.", f:"Badri Kedar Utsav, Opening Day", tm:"4:30AM-9PM (seasonal)", bt:"May-Jun, Sep-Oct", dc:"Traditional; warm layers essential", cat:["Char Dham","Divya Desam"], lat:30.7433, lng:79.4938 },
  { n:"Gangotri Temple",            st:"Uttarakhand",     ci:"Uttarkashi",       de:"Durga/Shakti",    ty:"Char Dham",          lv:false, lu:"", d:"Source of sacred Ganga River at 3,048m. Temple dedicated to Goddess Ganga. Seasonal shrine; gateway to Gaumukh glacier trek.", f:"Gangotri Opening Day (Akshaya Tritiya)", tm:"Seasonal May-Nov", bt:"May-Jun, Sep-Oct", dc:"Traditional warm attire", cat:["Char Dham"], lat:30.9953, lng:78.9391 },
  { n:"Yamunotri Temple",           st:"Uttarakhand",     ci:"Uttarkashi",       de:"Durga/Shakti",    ty:"Char Dham",          lv:false, lu:"", d:"Westernmost Char Dham at source of Yamuna River. Goddess Yamuna enshrined. Trek required to reach.", f:"Yamunotri Opening Day", tm:"Seasonal May-Nov", bt:"May-Jun, Sep-Oct", dc:"Traditional warm attire", cat:["Char Dham"], lat:31.0141, lng:78.4593 },
  { n:"Meenakshi Amman Temple",     st:"Tamil Nadu",      ci:"Madurai",          de:"Durga/Shakti",    ty:"Shakti",             lv:true,  lu:"https://www.youtube.com/results?search_query=meenakshi+amman+live", d:"Spectacular Dravidian complex with 14 gopurams. Dedicated to Goddess Meenakshi and Lord Sundareshwara. Architectural wonder of South India.", f:"Meenakshi Tirukalyanam, Navratri, Thaipusam", tm:"5AM-12:30PM, 4PM-10PM", bt:"Oct-Mar", dc:"Dhoti/saree at inner sanctum", cat:["Shakti Peetha"], lat:9.9195, lng:78.1193 },
  { n:"Brihadeeswarar Temple",      st:"Tamil Nadu",      ci:"Thanjavur",        de:"Shiva",           ty:"UNESCO",             lv:false, lu:"", d:"UNESCO World Heritage. Built by Raja Raja Chola I in 1010 CE. Vimana among tallest temple towers in world.", f:"Mahashivratri, Karthigai Deepam", tm:"6AM-12:30PM, 4PM-8:30PM", bt:"Nov-Feb", dc:"Traditional attire", cat:["UNESCO"], lat:10.7828, lng:79.1318 },
  { n:"Arunachaleswarar Temple",    st:"Tamil Nadu",      ci:"Tiruvannamalai",   de:"Shiva",           ty:"Pancha Bhuta",       lv:true,  lu:"https://www.youtube.com/results?search_query=arunachaleswarar+live", d:"Pancha Bhuta Stala for Agni (fire). Sacred hill Arunachala believed to be Shiva himself. Karthigai Deepam beacon visible for miles.", f:"Karthigai Deepam, Mahashivratri", tm:"5:30AM-1PM, 3:30PM-9:30PM", bt:"Nov-Feb", dc:"Traditional mandatory beyond inner sanctum", cat:["Pancha Bhuta"], lat:12.2253, lng:79.0674 },
  { n:"Ramanathaswamy Temple",      st:"Tamil Nadu",      ci:"Rameswaram",       de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=rameswaram+temple+live", d:"Jyotirlinga on Pamban Island, part of Char Dham. Famous 1,212m corridor — longest in world — with 22 sacred wells.", f:"Maha Shivaratri, Brahmotsavam", tm:"5AM-1PM, 3PM-9PM", bt:"Oct-Apr", dc:"Dhoti/saree mandatory", cat:["Jyotirlinga","Char Dham","Coastal"], lat:9.2885, lng:79.3174 },
  { n:"Tirumala Venkateswara Temple",st:"Andhra Pradesh", ci:"Tirupati",         de:"Venkateshwara",   ty:"Divya Desam",        lv:true,  lu:"https://www.youtube.com/results?search_query=tirupati+live+darshan", d:"World's richest and most visited temple. 100,000+ pilgrims daily. Famous laddu prasadam and head-tonsuring tradition.", f:"Brahmotsavam, Vaikunta Ekadashi", tm:"2:30AM-1AM", bt:"Year-round", dc:"Traditional attire preferred", cat:["Divya Desam","Hilltop"], lat:13.6833, lng:79.3470 },
  { n:"Vaishno Devi Shrine",        st:"Jammu & Kashmir", ci:"Reasi",            de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=vaishno+devi+live", d:"Cave shrine at 5,200 feet. Three pindis representing Mahakali, Mahalakshmi, Saraswati. 8 million pilgrims annually.", f:"Navratri, Shravan", tm:"Open 24 hours", bt:"Year-round", dc:"Trekking shoes; RFID card registration required", cat:["Shakti Peetha","Cave","Hilltop"], lat:33.0294, lng:74.9528 },
  { n:"Kamakhya Devi Temple",       st:"Assam",           ci:"Guwahati",         de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=kamakhya+live", d:"Most powerful Shakti Peetha. No idol — yoni of Sati worshipped. Ambubachi Mela (goddess menstruation) — major tantric festival.", f:"Ambubachi Mela, Durga Puja, Navratri", tm:"5:30AM-10PM", bt:"Year-round", dc:"Traditional; Ambubachi Mela requires patience", cat:["Shakti Peetha","Unusual"], lat:26.1664, lng:91.7062 },
  { n:"Siddhivinayak Temple",       st:"Maharashtra",     ci:"Mumbai",           de:"Ganesha",         ty:"Ashtavinayak",       lv:true,  lu:"https://www.youtube.com/results?search_query=siddhivinayak+live", d:"Most prominent Ganesha temple in Mumbai. Built 1801. Golden dome. Visited by millions including celebrities.", f:"Ganesh Chaturthi, Sankashti Chaturthi", tm:"5:30AM-10PM", bt:"Year-round", dc:"Modest attire", cat:["Ashtavinayak"], lat:19.0169, lng:72.8311 },
  { n:"Shirdi Sai Baba Samadhi",    st:"Maharashtra",     ci:"Shirdi",           de:"Multiple/Other",  ty:"Sai Dharma",         lv:true,  lu:"https://www.youtube.com/results?search_query=shirdi+sai+baba+live", d:"Samadhi of Sai Baba of Shirdi. Revered by Hindus and Muslims alike. 50,000+ visitors daily. 24-hour arati schedule.", f:"Ram Navami, Vijayadashami, Guru Purnima", tm:"4AM-11:30PM", bt:"Year-round", dc:"Modest attire; footwear removed", cat:[], lat:19.7680, lng:74.4795 },
  { n:"Somnath Temple",             st:"Gujarat",         ci:"Somnath",          de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=somnath+temple+live", d:"First Jyotirlinga facing Arabian Sea. Destroyed and rebuilt 17 times. Inaugurated 1951 by Sardar Patel.", f:"Mahashivratri, Shravan Maas", tm:"6AM-9:30PM", bt:"Oct-Mar", dc:"Traditional preferred", cat:["Jyotirlinga","Coastal","Char Dham"], lat:20.8880, lng:70.4011 },
  { n:"Dwarkadhish Temple",         st:"Gujarat",         ci:"Dwarka",           de:"Krishna",         ty:"Char Dham",          lv:true,  lu:"https://www.youtube.com/results?search_query=dwarkadhish+live", d:"Char Dham. Lord Krishna as King of Dwarka. 5-storey temple with 78m spire.", f:"Janmashtami, Holi", tm:"6:30AM-1PM, 5PM-9:30PM", bt:"Oct-Mar", dc:"Dhoti mandatory for entry", cat:["Char Dham"], lat:22.2373, lng:68.9674 },
  { n:"Jagannath Temple, Puri",     st:"Odisha",          ci:"Puri",             de:"Vishnu",          ty:"Char Dham",          lv:true,  lu:"https://www.youtube.com/results?search_query=jagannath+puri+live+darshan", d:"Char Dham. Lord Jagannath. Rath Yatra — millions pull massive wooden chariots. Non-Hindus not permitted inside.", f:"Rath Yatra, Snana Yatra", tm:"5AM-11PM", bt:"Oct-Feb", dc:"Non-Hindus not permitted; traditional mandatory", cat:["Char Dham","Divya Desam"], lat:19.8047, lng:85.8185 },
  { n:"Konark Sun Temple",          st:"Odisha",          ci:"Puri",             de:"Surya",           ty:"UNESCO",             lv:false, lu:"", d:"UNESCO Heritage. 13th-century temple shaped as Surya's chariot with 12 wheel pairs and 7 horses.", f:"Magha Saptami, Chandrabhaga Mela", tm:"6AM-8PM", bt:"Oct-Mar", dc:"Traditional preferred", cat:["UNESCO","Coastal"], lat:19.8876, lng:86.0945 },
  { n:"Mahakaleshwar Temple",       st:"Madhya Pradesh",  ci:"Ujjain",           de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=mahakaleshwar+live+bhasma+aarti", d:"Only south-facing Jyotirlinga. Famous Bhasma Aarti at dawn with sacred ash from funeral pyres offered to Shiva.", f:"Mahashivratri, Kumbh (Simhastha), Shravan", tm:"4AM-11PM", bt:"Oct-Mar", dc:"Traditional; Bhasma Aarti needs prior booking", cat:["Jyotirlinga"], lat:23.1828, lng:75.7682 },
  { n:"Omkareshwar Temple",         st:"Madhya Pradesh",  ci:"Khandwa",          de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=omkareshwar+live", d:"Jyotirlinga on Mandhata Island naturally shaped like Om. Surrounded by Narmada River.", f:"Mahashivratri, Shravan", tm:"5AM-10PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Jyotirlinga"], lat:22.2447, lng:76.1499 },
  { n:"Trimbakeshwar Temple",       st:"Maharashtra",     ci:"Nashik",           de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=trimbakeshwar+live", d:"Jyotirlinga at Godavari source. Three-faced black lingam representing Brahma-Vishnu-Shiva. Site of Nashik Kumbh Mela.", f:"Kumbh Mela (Nashik), Mahashivratri", tm:"5:30AM-9PM", bt:"Oct-Mar", dc:"Dhoti mandatory for inner sanctum", cat:["Jyotirlinga"], lat:19.9322, lng:73.5307 },
  { n:"Bhimashankar Temple",        st:"Maharashtra",     ci:"Pune",             de:"Shiva",           ty:"Jyotirlinga",        lv:false, lu:"", d:"Jyotirlinga in Sahyadri hills inside a wildlife sanctuary. Nagara-style architecture. Giant Malabar squirrels nearby.", f:"Mahashivratri, Shravan", tm:"4:30AM-9:30PM", bt:"Oct-Jun", dc:"Traditional preferred", cat:["Jyotirlinga","Forest"], lat:19.0728, lng:73.5344 },
  { n:"Grishneshwar Temple",        st:"Maharashtra",     ci:"Aurangabad",       de:"Shiva",           ty:"Jyotirlinga",        lv:false, lu:"", d:"Last of the 12 Jyotirlingas. Near Ellora Caves (UNESCO). Men must enter bare-chested.", f:"Mahashivratri, Shravan", tm:"5:30AM-9:30PM", bt:"Year-round", dc:"Men must enter bare-chested; dhoti worn", cat:["Jyotirlinga","UNESCO"], lat:20.0208, lng:75.1789 },
  { n:"Kanaka Durga Temple",        st:"Andhra Pradesh",  ci:"Vijayawada",       de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=kanaka+durga+live", d:"Goddess Kanaka Durga on Indrakeeladri hill beside Krishna river. Powerful Shakti site. Spectacular during Navratri.", f:"Navratri, Dussehra", tm:"5AM-11PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Shakti Peetha","Hilltop"], lat:16.5062, lng:80.6245 },
  { n:"Dakshineswar Kali Temple",   st:"West Bengal",     ci:"Kolkata",          de:"Durga/Shakti",    ty:"Shakti",             lv:true,  lu:"https://www.youtube.com/results?search_query=dakshineswar+live", d:"19th-century temple of Sri Ramakrishna. Goddess Bhavatarini (Kali). Eastern Ganges bank. 12 Shiva shrines.", f:"Kali Puja, Durga Puja, Diwali", tm:"6AM-12:30PM, 3PM-8:30PM", bt:"Oct-Mar", dc:"Modest attire", cat:[], lat:22.6460, lng:88.3578 },
  { n:"Kalighat Kali Temple",       st:"West Bengal",     ci:"Kolkata",          de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=kalighat+live", d:"One of 51 Shakti Peethas. Goddess Kali's toes enshrined here. One of India's holiest sites.", f:"Kali Puja, Navratri", tm:"5AM-2PM, 3PM-10:30PM", bt:"Year-round", dc:"Traditional attire", cat:["Shakti Peetha"], lat:22.5269, lng:88.3444 },
  { n:"Baidyanath Temple, Deoghar", st:"Jharkhand",       ci:"Deoghar",          de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=baidyanath+deoghar+live", d:"Jyotirlinga. Shravan Mela — millions carry Ganga water 110km on foot to offer here. One of India's grandest yatras.", f:"Shravan Mela, Mahashivratri", tm:"4AM-3:30PM, 6PM-9PM", bt:"Jul-Aug (Shravan), Oct-Mar", dc:"Traditional attire", cat:["Jyotirlinga"], lat:24.4860, lng:86.6965 },
  { n:"Jwala Ji Temple",            st:"Himachal Pradesh",ci:"Kangra",           de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=jwalaji+live", d:"Eternal flame burns from ground without fuel. Shakti Peetha of Sati's tongue. Akbar's gold canopy mystically converted to iron per legend.", f:"Navratri, Jwalamukhi Mela", tm:"5AM-10PM", bt:"Year-round", dc:"Traditional attire", cat:["Shakti Peetha","Unusual"], lat:31.8728, lng:76.3107 },
  { n:"Srisailam Mallikarjuna",     st:"Andhra Pradesh",  ci:"Nandyal",          de:"Shiva",           ty:"Jyotirlinga",        lv:true,  lu:"https://www.youtube.com/results?search_query=srisailam+live", d:"Jyotirlinga deep in Nallamala forest on Krishna river. Goddess Bhramaramba Devi also enshrined. Remote and powerful.", f:"Mahashivratri, Ugadi", tm:"4:30AM-10PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Jyotirlinga","Forest"], lat:16.0726, lng:78.8682 },
  { n:"Ashtavinayak: Morgaon",      st:"Maharashtra",     ci:"Pune",             de:"Ganesha",         ty:"Ashtavinayak",       lv:false, lu:"", d:"First and most important Ashtavinayak shrine. Mayureshwar Ganesha with peacock. Pilgrims start and end the circuit here.", f:"Ganesh Chaturthi", tm:"5AM-10PM", bt:"Year-round", dc:"Traditional attire", cat:["Ashtavinayak"], lat:18.2655, lng:74.6149 },
  { n:"Srirangam Ranganathaswamy",  st:"Tamil Nadu",      ci:"Tiruchirappalli",  de:"Vishnu",          ty:"Divya Desam",        lv:true,  lu:"https://www.youtube.com/results?search_query=srirangam+live", d:"World's largest functioning Hindu temple (631 acres, 7 enclosures). Lord Ranganatha (reclining Vishnu). Premier Divya Desam.", f:"Vaikunta Ekadashi, Brahmotsavam", tm:"6AM-1PM, 3PM-9PM", bt:"Year-round", dc:"Dhoti/saree beyond third enclosure", cat:["Divya Desam"], lat:10.8625, lng:78.6927 },
  { n:"Chidambaram Nataraja Temple",st:"Tamil Nadu",      ci:"Chidambaram",      de:"Shiva",           ty:"Pancha Bhuta",       lv:false, lu:"", d:"Pancha Bhuta Stala for Akasha (sky). Lord Nataraja's cosmic dance enshrined. Unique Dikshitar priest management tradition.", f:"Natyanjali Festival, Arudra Darshan", tm:"6AM-12PM, 5PM-10PM", bt:"Year-round", dc:"Dhoti for men in sanctum", cat:["Pancha Bhuta"], lat:11.3998, lng:79.6931 },
  { n:"Srikalahasti Temple",        st:"Andhra Pradesh",  ci:"Chittoor",         de:"Shiva",           ty:"Pancha Bhuta",       lv:false, lu:"", d:"Pancha Bhuta Stala for Vayu (air). Spider, serpent, elephant tridevtas alongside Shiva. Important Rahu-Ketu puja site.", f:"Shivaratri, Brahmotsavam", tm:"6AM-8PM", bt:"Year-round", dc:"Traditional attire", cat:["Pancha Bhuta"], lat:13.7471, lng:79.6978 },
  { n:"Guruvayur Krishna Temple",   st:"Kerala",          ci:"Thrissur",         de:"Krishna",         ty:"Divya Desam",        lv:true,  lu:"https://www.youtube.com/results?search_query=guruvayur+live", d:"Most important Krishna temple in Kerala. Famous captive elephants. Strict entry rules. Lord Guruvayurappan.", f:"Guruvayur Ekadashi, Janmashtami", tm:"3AM-1PM, 5PM-9:15PM", bt:"Year-round", dc:"Dhoti mandatory for men; mundu/saree for women", cat:["Divya Desam"], lat:10.5943, lng:76.0378 },
  { n:"Sabarimala Ayyappa Temple",  st:"Kerala",          ci:"Pathanamthitta",   de:"Ayyappa",         ty:"Tantric",            lv:false, lu:"", d:"Hilltop forest temple. Millions observe 41-day austerity. One of Earth's largest annual pilgrimages.", f:"Mandala Mahotsavam, Makar Vilakku", tm:"Seasonal Nov-Jan", bt:"Nov-Jan (pilgrimage season)", dc:"Black/blue attire; 41-day vrat required", cat:["Hilltop","Forest"], lat:9.4372, lng:77.0730 },
  { n:"Padmanabhaswamy Temple",     st:"Kerala",          ci:"Thiruvananthapuram",de:"Vishnu",          ty:"Divya Desam",        lv:false, lu:"", d:"World's richest temple (Rs 1 lakh crore+ endowment). Reclining Vishnu on Adi Shesha. Extremely strict dress code.", f:"Alpashy Uthram, Panguni Uthiram", tm:"3:30AM-12PM, 5PM-7:20PM", bt:"Year-round", dc:"Dhoti/mundu mandatory; saree for women — strictly enforced", cat:["Divya Desam"], lat:8.4834, lng:76.9134 },
  { n:"Hampi Virupaksha Temple",    st:"Karnataka",       ci:"Vijayanagara",     de:"Shiva",           ty:"UNESCO",             lv:false, lu:"", d:"One of India's oldest functioning temples inside Hampi World Heritage Site. Vijayanagara empire's tutelary deity.", f:"Shivratri, Hampi Utsav", tm:"6AM-1PM, 5PM-9PM", bt:"Oct-Feb", dc:"Traditional preferred", cat:["UNESCO"], lat:15.3350, lng:76.4601 },
  { n:"Chamundeshwari Temple",      st:"Karnataka",       ci:"Mysuru",           de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=chamundeshwari+temple+live", d:"Atop Chamundi Hills. Presiding deity of Mysore royalty. Spectacular Dasara procession. Massive Mahishasura statue at base.", f:"Dasara, Navratri", tm:"7:30AM-2PM, 3:30PM-9PM", bt:"Oct-Mar", dc:"Traditional preferred", cat:["Hilltop","Shakti Peetha"], lat:12.2723, lng:76.6600 },
  { n:"Murudeshwara Temple",        st:"Karnataka",       ci:"Uttara Kannada",   de:"Shiva",           ty:"Coastal",            lv:false, lu:"", d:"Second tallest Shiva statue in world (37m) on a coastal cliff. Sea-view from gopuram lift. Dramatic coastal setting.", f:"Mahashivratri, Shravan", tm:"6AM-8:30PM", bt:"Oct-Mar", dc:"Traditional preferred", cat:["Coastal"], lat:14.0943, lng:74.4858 },
  { n:"Kailasha Temple, Ellora",    st:"Maharashtra",     ci:"Aurangabad",       de:"Shiva",           ty:"UNESCO",             lv:false, lu:"", d:"UNESCO Heritage. The world's largest rock-cut monolithic structure — carved top-down from a single mountain. Built by Rashtrakutas. Mind-boggling engineering achievement of 8th century.", f:"Mahashivratri, Ellora festival", tm:"9AM-5:30PM (Tue-Sun)", bt:"Oct-Mar", dc:"Traditional preferred", cat:["UNESCO","Cave","Unusual"], lat:20.0267, lng:75.1779 },
  { n:"Khajuraho Temples",          st:"Madhya Pradesh",  ci:"Chhatarpur",       de:"Shiva",           ty:"UNESCO",             lv:false, lu:"", d:"UNESCO Heritage. Chandela dynasty 10th-12th century. Erotic exterior sculptures represent Tantric cosmology. Interior purely devotional.", f:"Mahashivratri, Khajuraho Dance Festival", tm:"Sunrise-Sunset", bt:"Oct-Mar", dc:"Traditional preferred", cat:["UNESCO"], lat:24.8519, lng:79.9199 },
  { n:"Hoysaleswara Temple",        st:"Karnataka",       ci:"Hassan",           de:"Shiva",           ty:"UNESCO",             lv:false, lu:"", d:"12th-century Hoysala masterpiece with the most intricate sculptural work of any temple in India. Every surface covered in thousands of figures. Called the 'Louvre of India'.", f:"Mahashivratri", tm:"6AM-6PM", bt:"Oct-Mar", dc:"Traditional preferred", cat:["UNESCO"], lat:13.2146, lng:75.9851 },
  { n:"Vithoba Temple, Pandharpur", st:"Maharashtra",     ci:"Solapur",          de:"Vishnu",          ty:"Varkari",            lv:true,  lu:"https://www.youtube.com/results?search_query=pandharpur+vitthal+live", d:"Heart of Varkari tradition. Lord Vitthal (Vishnu). Wari pilgrimage — lakhs walk hundreds of km — one of India's most moving sights.", f:"Ashadhi Ekadashi, Kartiki Ekadashi", tm:"4AM-11PM", bt:"Jun-Jul (Wari)", dc:"Traditional Varkari attire", cat:["Divya Desam"], lat:17.6741, lng:75.3296 },
  { n:"Mahalaxmi Temple, Kolhapur", st:"Maharashtra",     ci:"Kolhapur",         de:"Lakshmi",         ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=kolhapur+mahalaxmi+live", d:"Revered Mahalaxmi Shakti Peetha. Kiranotsav — sun rays directly illuminate deity during equinoxes.", f:"Kiranotsav, Navratri, Lalita Panchami", tm:"4AM-10PM", bt:"Year-round", dc:"Traditional attire", cat:["Shakti Peetha"], lat:16.7046, lng:74.2244 },
  { n:"Brahma Temple, Pushkar",     st:"Rajasthan",       ci:"Pushkar",          de:"Brahma",          ty:"Unusual",            lv:false, lu:"", d:"One of very few Lord Brahma temples in the world. Sacred Pushkar Lake. Site of the massive annual Pushkar Camel Fair.", f:"Kartik Purnima (Pushkar Mela)", tm:"6:30AM-1:30PM, 3PM-8:30PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Unusual"], lat:26.4897, lng:74.5511 },
  { n:"Karni Mata Temple",          st:"Rajasthan",       ci:"Bikaner",          de:"Durga/Shakti",    ty:"Unusual",            lv:false, lu:"", d:"25,000 sacred rats roam freely. Food nibbled by rats is holy prasad. Seeing a white rat is supremely auspicious. No disease ever reported.", f:"Navratri, Karni Mata Jayanti", tm:"4AM-10PM", bt:"Oct-Mar", dc:"Footwear removed; ready to have rats on feet", cat:["Unusual"], lat:27.9997, lng:72.9022 },
  { n:"Amarnath Cave Temple",       st:"Jammu & Kashmir", ci:"Anantnag",         de:"Shiva",           ty:"Cave",               lv:false, lu:"", d:"Natural ice Shivalinga forms annually at 3,888m. One of Hinduism's most sacred sites. Government-controlled seasonal pilgrimage.", f:"Shravan Purnima (Raksha Bandhan)", tm:"Jul-Aug only", bt:"Jul-Aug", dc:"Trekking gear; permits required", cat:["Cave","Hilltop"], lat:34.2142, lng:75.5035 },
  { n:"Shani Shingnapur Temple",    st:"Maharashtra",     ci:"Ahmednagar",       de:"Multiple/Other",  ty:"Unusual",            lv:true,  lu:"https://www.youtube.com/results?search_query=shani+shingnapur+live", d:"Lord Shani worshipped as open-sky black rock. Village houses have no doors or locks — Shani protects.", f:"Shani Amavasya, Shani Jayanti", tm:"5AM-10PM", bt:"Year-round", dc:"Traditional; no leather allowed", cat:["Unusual"], lat:19.4550, lng:74.6880 },
  { n:"Naina Devi Temple",          st:"Himachal Pradesh",ci:"Bilaspur",         de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:false, lu:"", d:"Shakti Peetha where Sati's eyes fell. Hilltop with panoramic Gobind Sagar Lake views.", f:"Navratri, Sawan", tm:"5AM-9PM", bt:"Year-round", dc:"Traditional attire", cat:["Shakti Peetha","Hilltop"], lat:31.4579, lng:76.6640 },
  { n:"Jambukeswarar Temple",       st:"Tamil Nadu",      ci:"Tiruchirappalli",  de:"Shiva",           ty:"Pancha Bhuta",       lv:false, lu:"", d:"Pancha Bhuta Stala for Water (Appu). Sanctum has natural underground spring with water constantly at ankle-level.", f:"Arudra Darshan, Karthigai Deepam", tm:"6AM-1PM, 3:30PM-9PM", bt:"Year-round", dc:"Traditional attire", cat:["Pancha Bhuta"], lat:10.8532, lng:78.7050 },
  { n:"Kanchi Kamakshi Temple",     st:"Tamil Nadu",      ci:"Kanchipuram",      de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:false, lu:"", d:"One of the three most powerful Shakti Peethas. Adi Shankaracharya installed Sri Chakra here.", f:"Brahmotsavam, Navratri", tm:"5:30AM-12PM, 4PM-8:30PM", bt:"Year-round", dc:"Dhoti/saree required", cat:["Shakti Peetha"], lat:12.8384, lng:79.7018 },
  { n:"Elephanta Caves",            st:"Maharashtra",     ci:"Mumbai",           de:"Shiva",           ty:"UNESCO",             lv:false, lu:"", d:"UNESCO Heritage. 6th-century rock-cut Shiva temples on island near Mumbai. Iconic three-faced Shiva (Trimurti) panel.", f:"Mahashivratri, Elephanta Festival", tm:"9AM-5:30PM (Tue-Sun)", bt:"Oct-Mar", dc:"Traditional preferred; boat ride to island", cat:["UNESCO","Cave","Coastal"], lat:18.9634, lng:72.9317 },
  { n:"Sun Temple, Modhera",        st:"Gujarat",         ci:"Mehsana",          de:"Surya",           ty:"UNESCO",             lv:false, lu:"", d:"11th-century Solanki Sun temple. Precisely aligned for equinox sunrise illumination. Magnificent Surya Kund stepped tank.", f:"Uttarayan, Modhera Dance Festival", tm:"Sunrise-6PM", bt:"Oct-Mar", dc:"Traditional preferred", cat:["UNESCO"], lat:23.5829, lng:72.1323 },
  { n:"Badami Cave Temples",        st:"Karnataka",       ci:"Bagalkot",         de:"Shiva",           ty:"Cave",               lv:false, lu:"", d:"4 rock-cut Chalukya caves from 6th century. Mix of Shaiva, Vaishnava and Jain shrines in red sandstone cliff.", f:"Mahashivratri", tm:"6AM-6PM", bt:"Oct-Feb", dc:"Traditional preferred", cat:["Cave","UNESCO"], lat:15.9143, lng:75.6822 },
  { n:"Mahabodhi Temple, Bodh Gaya",st:"Bihar",           ci:"Gaya",             de:"Multiple/Other",  ty:"UNESCO",             lv:false, lu:"", d:"UNESCO Heritage. Where Siddhartha Gautama attained Enlightenment under the Bodhi tree. Revered by Hindus as site of Vishnu's footprint. International pilgrimage for Buddhists.", f:"Buddha Purnima, Karthika Purnima", tm:"5AM-9PM", bt:"Oct-Mar", dc:"Modest attire; shoes removed", cat:["UNESCO","Unusual"], lat:24.6961, lng:84.9914 },
  { n:"Vishnupad Temple, Gaya",     st:"Bihar",           ci:"Gaya",             de:"Vishnu",          ty:"Pitra Teertha",      lv:false, lu:"", d:"Built over Vishnu's footprint. Most important site for Hindu funeral rites (pind daan). Pilgrims offer pinda to ancestors.", f:"Pitru Paksha (Sep-Oct)", tm:"5AM-9PM", bt:"Year-round", dc:"Traditional; men wear dhoti", cat:[], lat:24.6869, lng:84.9950 },
  { n:"Tulja Bhavani Temple",       st:"Maharashtra",     ci:"Osmanabad",        de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:true,  lu:"https://www.youtube.com/results?search_query=tulja+bhavani+live", d:"Presiding deity of Chhatrapati Shivaji Maharaj. Shivaji received Bhavani sword here per tradition.", f:"Navratri, Dasara", tm:"4AM-10:30PM", bt:"Year-round", dc:"Traditional attire", cat:["Shakti Peetha"], lat:18.0112, lng:76.0686 },
  { n:"Ambaji Temple",              st:"Gujarat",         ci:"Banaskantha",      de:"Durga/Shakti",    ty:"Shakti Peetha",      lv:false, lu:"", d:"One of 18 Maha Shakti Peethas. No idol — sacred yantra is worshipped. Millions visit during Bhadarvi Poonam.", f:"Bhadarvi Poonam, Navratri", tm:"7AM-9PM", bt:"Year-round", dc:"Traditional attire", cat:["Shakti Peetha"], lat:24.3395, lng:72.8501 },
// ── MAHABHARATA TEMPLES to add to TEMPLES_RAW array in scripts/seed.ts ──────
// Copy each line below and paste inside the TEMPLES_RAW = [ ... ] array

  { n:"Sthaneshwar Mahadev Temple",  st:"Haryana",         ci:"Kurukshetra",     de:"Shiva",          ty:"Mahabharata",  lv:false, lu:"", d:"Pandavas prayed here before the Kurukshetra war. One of the oldest Shiva temples in India. Lord Krishna advised Pandavas at this sacred site.", f:"Mahashivratri, Gita Jayanti, Kurukshetra Mahotsav", tm:"5AM-9PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:29.9722, lng:76.8314 },
  { n:"Brahma Sarovar, Kurukshetra", st:"Haryana",         ci:"Kurukshetra",     de:"Multiple/Other", ty:"Mahabharata",  lv:false, lu:"", d:"Massive sacred tank where Pandavas bathed before the war. Solar eclipse dip here is considered equal to performing all yagnas. Gita Jayanti celebrated grandly.", f:"Gita Jayanti, Solar Eclipse, Kartik Purnima", tm:"Open all day", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:29.9726, lng:76.8186 },
  { n:"Jyotisar Temple",             st:"Haryana",         ci:"Kurukshetra",     de:"Krishna",        ty:"Mahabharata",  lv:false, lu:"", d:"Exact spot where Lord Krishna delivered the Bhagavad Gita to Arjuna. Ancient banyan tree believed to be from the original. A must-visit Mahabharata site.", f:"Gita Jayanti, Janmashtami", tm:"7AM-7PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:29.9267, lng:76.7573 },
  { n:"Hastinapur Temples",          st:"Uttar Pradesh",   ci:"Meerut",          de:"Multiple/Other", ty:"Mahabharata",  lv:false, lu:"", d:"Ancient capital of the Kuru kingdom from Mahabharata. Pandavas and Kauravas were born here. Karna Temple and Draupadi Ghat are key pilgrimage spots.", f:"Karthik Purnima, Navratri", tm:"6AM-8PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:29.1685, lng:78.0181 },
  { n:"Pandeshwar Temple",           st:"Uttarakhand",     ci:"Champawat",       de:"Shiva",          ty:"Mahabharata",  lv:false, lu:"", d:"Ancient Shiva temple built by the Pandavas during their exile. Pandavas worshipped Lord Shiva here seeking blessings before the great war.", f:"Mahashivratri, Shravan", tm:"6AM-8PM", bt:"Apr-Nov", dc:"Traditional attire", cat:["Mahabharata"], lat:29.3340, lng:80.0900 },
  { n:"Pandupol Hanuman Temple",     st:"Rajasthan",       ci:"Alwar",           de:"Hanuman",        ty:"Mahabharata",  lv:false, lu:"", d:"Reclining Hanuman idol in Sariska Tiger Reserve. Believed Pandavas rested here during exile. Bhima is said to have wrestled a demon at this spot.", f:"Hanuman Jayanti, Navratri", tm:"6AM-6PM", bt:"Oct-Mar", dc:"Forest trekking attire; respect wildlife", cat:["Mahabharata","Forest"], lat:27.3500, lng:76.5000 },
  { n:"Parikshit Tila",              st:"Uttar Pradesh",   ci:"Meerut",          de:"Vishnu",         ty:"Mahabharata",  lv:false, lu:"", d:"Capital of King Parikshit, grandson of Arjuna. Ancient mound with temples. Connected to the story of the Takshaka serpent curse.", f:"Kartik Purnima", tm:"6AM-7PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:29.1900, lng:77.9800 },
  { n:"Naimisharanya Temple",        st:"Uttar Pradesh",   ci:"Sitapur",         de:"Vishnu",         ty:"Mahabharata",  lv:false, lu:"", d:"Sacred forest where sages heard the Mahabharata recitation from Ugrasravas. Chakra Tirtha sacred tank. One of the most ancient pilgrimage forests.", f:"Purnima, Kartik Mela", tm:"5AM-9PM", bt:"Oct-Mar", dc:"Traditional attire mandatory", cat:["Mahabharata"], lat:27.0368, lng:80.4730 },
  { n:"Ekachakra Temple",            st:"West Bengal",     ci:"Birbhum",         de:"Shiva",          ty:"Mahabharata",  lv:false, lu:"", d:"Birthplace of Bhima. Pandavas lived in disguise here. Bhutnath Shiva temple at this site. Pandavas killed demon Bakasura here protecting villagers.", f:"Mahashivratri, Durga Puja", tm:"6AM-8PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:23.8500, lng:87.1200 },
  { n:"Drupada Nagar Temples",       st:"Uttar Pradesh",   ci:"Kampilya",        de:"Multiple/Other", ty:"Mahabharata",  lv:false, lu:"", d:"Ancient Panchala capital of King Drupada, father of Draupadi. Site of Draupadi's swayamvara. Several ancient temples and excavated ruins.", f:"Navratri, Purnima", tm:"6AM-7PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:27.6500, lng:79.9500 },
  { n:"Indraprastha (Purana Qila)",  st:"Delhi",           ci:"New Delhi",       de:"Multiple/Other", ty:"Mahabharata",  lv:false, lu:"", d:"Site of the legendary Pandava capital Indraprastha built by Vishwakarma. Maya Sabha stood here. Archaeological evidence of Painted Grey Ware culture.", f:"Navratri, Heritage walks", tm:"Sunrise to Sunset", bt:"Oct-Mar", dc:"Comfortable heritage site attire", cat:["Mahabharata"], lat:28.6129, lng:77.2421 },
  { n:"Karna Temple, Karnal",        st:"Haryana",         ci:"Karnal",          de:"Multiple/Other", ty:"Mahabharata",  lv:false, lu:"", d:"Dedicated to Karna, the greatest warrior of Mahabharata. Karnal city named after Karna. Nearby Karna Lake is sacred. Revered as city of the generous hero.", f:"Makar Sankranti, Karna Jayanti", tm:"6AM-8PM", bt:"Oct-Mar", dc:"Traditional attire", cat:["Mahabharata"], lat:29.6857, lng:76.9905 },
]

// ─── SEED FUNCTION ────────────────────────────────────────
async function seed() {
  console.log('🔗 Connecting to MongoDB Atlas…')
  await mongoose.connect(MONGODB_URI!, { serverSelectionTimeoutMS: 10000 })

  const TempleModel = mongoose.models.Temple || mongoose.model('Temple', TempleSchema)

  console.log(`🌱 Seeding ${TEMPLES_RAW.length} temples…`)

  let created = 0, updated = 0, errors = 0

  for (const raw of TEMPLES_RAW) {
    const slug = slugify(raw.n)
    try {
      const result = await TempleModel.findOneAndUpdate(
        { slug },
        {
          slug,
          name:         raw.n,
          state:        raw.st,
          city:         raw.ci,
          deity:        raw.de,
          type:         raw.ty,
          description:  raw.d,
          festivals:    raw.f,
          timing:       raw.tm,
          best_time:    raw.bt,
          dress_code:   raw.dc,
          categories:   raw.cat || [],
          has_live:     raw.lv,
          live_url:     raw.lu || '',
          lat:          raw.lat ?? null,
          lng:          raw.lng ?? null,
          image_url:    null,
          rating_avg:   0,
          rating_count: 0,
        },
        { upsert: true, new: true }
      )
      if (result.wasNew) created++; else updated++
    } catch (err: any) {
      console.error(`  ❌ Failed: ${raw.n} — ${err.message}`)
      errors++
    }
  }

  // Ensure text search index exists
  await TempleModel.collection.createIndex(
    { name: 'text', city: 'text', state: 'text', deity: 'text', description: 'text' },
    { weights: { name: 10, deity: 5, city: 4, state: 3 }, name: 'temple_text_search', background: true }
  ).catch(() => { /* index already exists */ })

  const total = await TempleModel.countDocuments()
  console.log(`\n✅ Seed complete!`)
  console.log(`   Created: ${created}`)
  console.log(`   Updated: ${updated}`)
  console.log(`   Errors:  ${errors}`)
  console.log(`   Total in DB: ${total} temples`)

  await mongoose.disconnect()
  console.log('\n🔌 Disconnected. Your MongoDB Atlas database is ready!')
}

seed().catch(err => {
  console.error('Seed failed:', err)
  process.exit(1)
})



