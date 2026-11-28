import type { DishInfo, VariantInfo } from './enrichment'

// Sourced origin/temple notes (checked against independent sources) and per-version nutrition/fasting notes.
// Nutrition is an approximate estimate from standard food-composition tables.
export const DISH_INFO: Record<string, DishInfo> = {
  "kheer-payasam": {
    "origin": "Milk-and-rice dishes are old in Indian literature. The names come from Sanskrit kshira (milk) and payasa, and the food historian K. T. Achaya, as cited on Wikipedia, describes payasam as a staple of temple prasada. In the Valmiki Ramayana (Bala Kanda, sarga 16) a divine being rises from King Dasharatha's sacrificial fire carrying a vessel of payasa, which the king divides among his queens. The milk-rice that the village woman Sujata offered the Buddha just before his Enlightenment is told in Pali sources; the IGNCA's Jataka pages cite the Sutta Nipata and Dhammapada commentaries.\n\nTemple kitchens keep their own forms. The Orissa Review lists Bhoga Kshiri, a liquid of rice, milk, sugar and spices, in the evening offering at the Jagannath temple in Puri, and Bundia Khiri among its daily bhogas. At Ambalappuzha in Kerala, Kerala Tourism calls palpayasam the temple's main offering. Local legend explains its origin as either a chess game with Krishna or a debt of rice; no dated record was found for either version.",
    "temples": [
      {
        "name": "Ambalappuzha Sree Krishna Swamy Temple",
        "place": "Ambalappuzha, Alappuzha district, Kerala",
        "note": "Kerala Tourism calls palpayasam, a sweet milk-and-rice porridge, the temple's main offering; the Travancore Devaswom Board's page mentions a daily Palpayasa Nedyam."
      },
      {
        "name": "Shri Jagannath Temple",
        "place": "Puri, Odisha",
        "note": "The Orissa Review lists Bhoga Kshiri (rice, milk, sugar and spices) in the evening Badasinhara Dhupa and Bundia Khiri among the daily bhogas."
      }
    ],
    "sources": [
      "https://en.wikipedia.org/wiki/Kheer",
      "https://sanskritdocuments.org/sites/valmikiramayan/baala/sarga16/balaitrans16.htm",
      "https://ignca.gov.in/online-digital-resources/jataka-stories/088-sujata/",
      "https://magazines.odisha.gov.in/Orissareview/june2006/engpdf/14-15.pdf",
      "https://shreekhetra.com/chappan-bhoga-jagannath.html",
      "https://travancoredevaswomboard.org/2012/07/08/ambalappuzha-sree-krishnaswami-temple/",
      "https://www.keralatourism.org/temples/alappuzha/ambalapuzha-sree-krishna",
      "https://www.hindu-blog.com/2020/12/ambalapuzha-palpayasam-history-chess.html"
    ]
  },
  "laddu": {
    "origin": "Laddu-type sweets are offered at many temples, but the best documented case is Tirumala. Temple officials date the laddu offering at the Venkateswara temple to 2 August 1715 (The Quint, 2015). The temple's own news site instead points to inscriptions that mention a laddu-like offering called manoharam in 1480, says loose boondi prasadam was known from about 1803, and says the present ball form emerged in 1940. Almonds, cashews and raisins were added in later days.\n\nThe laddus are still prepared by hand by the Vaikhanasa sect of Brahmins in the temple's potu, while boondi is mass-produced in frying units outside the temple. TTD has said, as reported by The Hans India in 2022, that its laddus weigh 160 to 180 grams. The Tirupati laddu holds a registered Geographical Indication; TTD applied in 2009. The boondi laddu of North Indian Hanuman temples is a separate tradition for which no dated source was found.",
    "temples": [
      {
        "name": "Sri Venkateswara Swamy Temple (Tirumala Tirupati Devasthanams)",
        "place": "Tirumala, Andhra Pradesh",
        "note": "The laddu is the temple's prasadam, made by hand in the potu by Vaikhanasa Brahmins; TTD states a weight of 160 to 180 grams for the standard laddu and a larger 700 g laddu in its own specification."
      }
    ],
    "sources": [
      "https://news.tirumala.org/divine-fragrance-of-tiarupati-laddu/",
      "https://www.thequint.com/news/india/tirupati-temple-laddu-turns-300-heres-a-little-history",
      "https://www.thehansindia.com/news/cities/tirupathi/ttd-refutes-criticism-over-weight-of-srivari-laddus-768686",
      "https://www.newstap.in/andhra-pradesh/tirumala-laddu-size-quality-not-reduced-ttd-1447559",
      "https://www.thenewsminute.com/article/devotee-s-video-complaining-about-tirupati-laddu-weight-goes-viral-ttd-responds-169836",
      "https://en.wikipedia.org/wiki/Tirupati_laddu"
    ]
  },
  "aravana-payasam": {
    "origin": "Aravana is the payasam of the Sabarimala Ayyappa temple. Onmanorama reports that among temple payasams it is Sabarimala's aravana that is the most popular; it uses almost the same ingredients as the others but is prepared differently, which gives it a distinct taste. A 2025 Onmanorama feature says it is cooked for the noon Uchha Pooja and is made available for devotees to take home in cans. No dated early reference to aravana was found in the sources opened, so its beginnings are not stated here.\n\nThe name became a legal question in 2018. The Travancore Devaswom Board's commissioner, N. Vasu, said aravana is not a brand but the blessing given to the Ayyappa devotee. This followed reports that a company had applied for a trademark in 2007; the Board had said then that it would file its own application, which the report says it never did. The same report puts sales of aravana and appam over the two-month season at over Rs 100 crore.",
    "temples": [
      {
        "name": "Sabarimala Sree Dharma Sastha (Ayyappa) Temple",
        "place": "Sabarimala, Pathanamthitta district, Kerala",
        "note": "Onmanorama (2025) says aravana is cooked for the noon Uchha Pooja and is made available in cans for devotees to take home."
      }
    ],
    "sources": [
      "https://www.onmanorama.com/news/kerala/2018/11/08/sabarimala-aravana-patent.html",
      "https://www.onmanorama.com/food/features/2025/12/11/sabarimala-prasadam-significance.html"
    ]
  },
  "khaja": {
    "origin": "Khaja is part of the Jagannath temple's food offerings at Puri. The Orissa Review lists Khaja and Gaja among the daily bhogas, and a list of the temple's 56 items on shreekhetra.com describes khaja as layered maida fritters soaked in sugar syrup, separate from gaja, a fried wheat sweet in syrup. A Wikipedia summary adds that gaja is among the dry Mahaprasad items sent out as takeaways, and that Mahaprasad is sold at the temple's Ananda Bazaar.\n\nKhaja is also a sweet of Silao in Nalanda district, Bihar. Incredible India calls Silao khaja a traditional delicacy of Nalanda with the Geographical Indication tag, built of twelve to sixteen very thin sheets of dough, and notes the popular belief that the Buddha was served it by the people of Silao. Popular articles claim much older roots for khaja, but they cite no passages, so none are repeated here. No dated record of when khaja entered the Puri kitchens was found.",
    "temples": [
      {
        "name": "Shri Jagannath Temple",
        "place": "Puri, Odisha",
        "note": "The Orissa Review lists Khaja and Gaja among the daily bhogas offered to the deities; gaja is described as a dry Mahaprasad item given as takeaway."
      }
    ],
    "sources": [
      "https://magazines.odisha.gov.in/Orissareview/june2006/engpdf/14-15.pdf",
      "https://shreekhetra.com/chappan-bhoga-jagannath.html",
      "https://en.wikipedia.org/wiki/Mahaprasad_",
      "https://prod.incredibleindia.gov.in/content/incredible-india-v2/en/destinations/nalanda/food-and-cuisine/silao.html",
      "https://en.wikipedia.org/wiki/Khaja",
      "https://thebetterindia.com/262824/bihar-gi-tag-silao-khaja-nalanda-buddha-jagannath-puri-food-history",
      "https://oteats.outlooktraveller.com/features/silao-khaja-a-gi-tagged-flaky-delight-with-roots-in-320-bce",
      "https://slurrp.com/article/from-nalanda-to-kalinga--know-how-odia-khaja-travelled-all-the-way-to-become-one-of-shree-jagannath-s-56-bhogs-1629200064538",
      "https://en.wikipedia.org/wiki/Manasollasa",
      "https://peppertrail.com/recipes-frommanasollasa/"
    ]
  },
  "tahiri-akha": {
    "origin": "Tahiri's festival role is tied to Cheti Chand, the Sindhi new year, observed as the birthday of Jhulelal (Uderolal). Sindhi tradition places his birth in Vikram Samvat 1007 (Deccan Herald). NPR's 2017 account describes sweet tahri, also written tairi, served at the communal langar that closes a Cheti Chand celebration, and the Sindhi culture site jhulelal.com recalls big pots of taahri (sweet rice) shared on Janmashtami, Ram Navami and Shivratri. It spells the related offering Akho and says it is made on Cheti Chand with rice, milk and flour. No early text or temple record naming tahiri as an offering was found.\n\nWriters on Sindhi food link the sweet version with Sindh's place on the Silk Road, citing Persian, Arab and Central Asian influences and Mughal-era luxuries such as saffron and pistachios (NPR). Many Sindhi Hindus left newly formed Pakistan in 1947 for India and elsewhere, carrying their food traditions with them.",
    "temples": [
      {
        "name": "Ved Mandir",
        "place": "Milltown, New Jersey, USA",
        "note": "A 2017 NPR account of a family's yearly Cheti Chand celebration at Ved Mandir, a temple in central New Jersey, describes sweet tahri served at the closing langar."
      }
    ],
    "sources": [
      "https://www.npr.org/sections/thesalt/2017/03/29/521257751/the-tahri-that-binds-how-a-sweet-rice-dish-connects-a-woman-to-her-history",
      "https://en.wikipedia.org/wiki/Cheti_Chand",
      "https://www.deccanherald.com/amp/story/opinion%2Fthe-unifying-force-behind-the-sindhi-new-year-3464351",
      "https://www.jhulelal.com/impdays.html",
      "https://www.jhulelal.com/bhairanasahib.html",
      "https://www.wisdomlib.org/history/essay/lord-jhulelal-an-analytical-study/d/doc1239088.html",
      "https://vedmandir.squarespace.com/about-us",
      "https://en.wikipedia.org/wiki/Sindhi_cuisine",
      "https://www.dawn.com/news/1192336"
    ]
  },
  "puran-poli": {
    "origin": "The earliest references found are medieval. The Sanskrit encyclopedia Manasollasa was completed in 1129 CE under the Western Chalukya king Someshvara III (r. 1127-1138), and a popular history article on its food chapter lists a bread called polika, which it equates with puran poli. K. T. Achaya's The Story of Our Food (2003, p. 85), as cited on Wikipedia, likewise says the text refers to the dish.\n\nThe same Achaya reference says the Telugu encyclopaedic work Manucharitra, attributed to Allasani Peddana, gives the recipe under the name bakshyam, which fits the Telugu names bakshalu and bobbatlu still in use. The dish therefore carries different names across languages.\n\nIn festival practice, The Better India lists puran poli among foods made at Holi, Gudhi Padwa and Ugadi, and Lokmat Times reports that in Maharashtra it is offered as naivedya to Holika before Holika Dahan. These are press accounts, not temple or museum records.",
    "sources": [
      "https://livehistoryindia.com/story/snapshort-histories/what-indians-ate-in-the-12th-century",
      "https://en.wikipedia.org/wiki/Puran_poli",
      "https://en.wikipedia.org/wiki/Manasollasa",
      "https://peppertrail.com/recipes-frommanasollasa/",
      "https://thebetterindia.com/culture/traditional-spring-dishes-holi-besakhi-gudhi-padwa-india-11187560",
      "https://www.outlooktraveller.com/amp/story/explore-maharashtra/sweet-stories-you-never-knew-about-traditional-maharashtrian-desserts-and-their-ancient-origins",
      "https://www.lokmattimes.com/lifestyle/holi-2025-know-why-do-we-offer-puran-poli-as-naivedya-for-holika-dahan-and-story-behind-it-a510"
    ]
  },
  "chhappan-bhog": {
    "origin": "No dated early text, inscription or temple record for the number 56 was found, so the Govardhan account is best treated as a tradition retold by temples and writers, not a documented origin. What the sources do document is current practice.\n\nAt Nathdwara in Rajasthan, Open magazine reports that the Shrinathji image left Mathura in 1670 and settled in 1672 at Sinhad, which grew into Nathdwara, under Mewar's Sisodia rulers, in the time of Aurangzeb. A heritage article says Chhappan Bhog is part of the regular offering there and is especially grand at Janmashtami, Diwali, Holi and Annakut. A Pushtimarg site describes the Annakut at Nathdwara and mentions a chappan-bhog festival that inspired an early 19th-century painting.\n\nAt Puri, shreekhetra.com says 56 items are prepared every day for the Jagannath temple, offered in six sets of meals, and Outlook Traveller describes the daily offering as no fewer than 56 dishes. Lists differ by temple; Puri's includes khaja, khira and dalama.",
    "temples": [
      {
        "name": "Shrinathji Temple",
        "place": "Nathdwara, Rajasthan",
        "note": "A heritage article reports Chhappan Bhog as part of the temple's regular offering, especially grand at Janmashtami, Diwali, Holi and Annakut; pushti-marg.net describes the Annakut display there."
      },
      {
        "name": "Shri Jagannath Temple",
        "place": "Puri, Odisha",
        "note": "shreekhetra.com says 56 food items are prepared daily and offered in six sets of meals; Outlook Traveller says the daily offering has no fewer than 56 dishes."
      }
    ],
    "sources": [
      "https://openthemagazine.com/columns/lost-found-histories/the-travels-of-a-deity",
      "https://cultureandheritage.org/2024/02/chhappan-bhog-of-shri-nathji-temple-nathdwara-rajasthan-a-divine-feast-for-the-deity.html",
      "https://pushti-marg.net/divali.htm",
      "https://shreekhetra.com/chappan-bhoga-jagannath.html",
      "https://outlooktraveller.com/amp/story/explore/food-and-drink/puri-divine-feast",
      "https://www.mintageworld.com/media/detail/5089-the-flavour-of-indian-food-part-2-56-food-offering-chhappan-bhog/",
      "https://en.wikipedia.org/wiki/Shrinathji_Temple",
      "https://en.wikipedia.org/wiki/Cuisine_of_Odisha",
      "https://magazines.odisha.gov.in/Orissareview/june2006/engpdf/14-15.pdf"
    ]
  },
  "panchamrit": {
    "origin": "The word panchamrita is Sanskrit for the \"five amritas\"; Apte's dictionary (1965), cited on Wikipedia, defines it as a collection of five sweet things used in worshipping deities. The same page describes the abhisheka as starting with ghee poured on the idol's head, followed by milk, curd, honey and sugar. No dated Vedic, Puranic or Agamic reference was found in the sources opened, so no early date is claimed.\n\nPalani's panchamirtham is a distinct temple tradition. The News Minute calls it an abhisheka prasadam of the Arulmigu Dhandayuthapani Swamy Temple. The temple's Joint Commissioner applied for a Geographical Indication in June 2016, and the Press Information Bureau announced in August 2019 that it was the first time a temple prasadam from Tamil Nadu had received a GI tag. The PIB lists banana, jaggery, cow ghee, honey and cardamom in a fixed proportion; dates and sugar candy are added. It was first made on the hill and a production centre opened at the foothills in 2008, under the guidance of CFTRI Mysuru.",
    "temples": [
      {
        "name": "Arulmigu Dhandayuthapani Swamy Temple",
        "place": "Palani, Tamil Nadu",
        "note": "Palani Panchamirtham, made from banana, jaggery, cow ghee, honey and cardamom, is the temple's abhisheka prasadam for devotees; the PIB reported it as the first Tamil Nadu temple prasadam to receive a GI tag (2019)."
      }
    ],
    "sources": [
      "https://en.wikipedia.org/wiki/Panchamrita",
      "https://pib.gov.in/PressReleasePage.aspx?PRID=1582173",
      "https://www.thenewsminute.com/article/tamil-nadu-s-palani-panchamirtham-prasadam-given-gi-tag-107226"
    ]
  },
  "dalma": {
    "origin": "Dalma is Odisha's lentil-and-vegetable dish. Dalama appears by name in the Orissa Review's list of the Jagannath temple's daily bhogas, and shreekhetra.com's list of the temple's 56 items describes it as a typical Odia dish combining several dals with vegetables such as eggplant, pumpkin, sweet potato and coconut. Wikipedia's Mahaprasad page lists dali (lentils) among the cooked items offered in earthen pots. No dated early reference to dalma was found, so its age is not claimed.\n\nTemple and home versions differ. Sources on the Puri kitchen say onion, garlic, potato and tomato are not used, and several also exclude chillies: shreekhetra.com lists green and red chilli among items prohibited for Mahaprasad, and Outlook Traveller says no chillies or spices and no papaya. Free Press Journal says the spices are limited to cumin, black pepper, cardamom, clove and cinnamon. Home dalma is described more broadly: The Pioneer lists raw banana, pumpkin, papaya, brinjal, yam or drumstick, often finished with roasted cumin and ghee, and Slurrp says home versions vary by family.",
    "temples": [
      {
        "name": "Shri Jagannath Temple",
        "place": "Puri, Odisha",
        "note": "The Orissa Review names Dalama among the daily bhogas, and shreekhetra.com describes it as dal with vegetables such as brinjal, pumpkin, sweet potato and coconut; the temple kitchen's excluded-ingredient lists in the sources opened include chillies."
      }
    ],
    "sources": [
      "https://magazines.odisha.gov.in/Orissareview/june2006/engpdf/14-15.pdf",
      "https://shreekhetra.com/chappan-bhoga-jagannath.html",
      "https://shreekhetra.com/srikitchen.html",
      "https://outlooktraveller.com/amp/story/explore/food-and-drink/puri-divine-feast",
      "https://www.hinduismtoday.com/hpi/?p=12489",
      "https://www.freepressjournal.in/amp/weekend/step-inside-puris-rosha-ghara-the-sacred-kitchen-feeding-thousands-daily",
      "https://bhubaneswarbuzz.com/?p=7232",
      "https://dailypioneer.com/sunday-edition/the-cuisine-of-mahaprasad-memory-and-devotion",
      "https://www.slurrp.com/article/dalma-odishas-lentil-dish-beloved-by-lord-jagannath-and-his-devotees-alike-1687163768159",
      "https://en.wikipedia.org/wiki/Mahaprasad_"
    ]
  },
  "labra": {
    "origin": "No dated or scholarly reference to labra was found, so its age is not claimed. A 16th-century origin appears in one food article, but its editor's note describes it as a household narrative and it cites nothing, so it is not repeated here.\n\nWhat is documented is its place at the bhog. Outlook Traveller's account of the Durga Puja bhog names labra, mixed vegetables laced with panch phoron, among the dishes served with khichuri. The Federal describes khichuri at neighbourhood (sarbojanin) pujas, where giant cauldrons feed hundreds or thousands, served with labra or torkari, with onion and garlic kept out as part of sattvik preparation. The Cuisine India Society says labra is often offered as bhog at Durga Puja, and The Hans India calls it indispensable at Saraswati Puja. The Daily Star (Dhaka) also lists labra as a mixed vegetable dish cooked through the year, so it is not confined to puja.",
    "sources": [
      "https://outlooktraveller.com/explore/food-and-drink/what-goes-into-the-durga-pujo-bhog",
      "https://thefederal.com/category/features/how-simple-plate-khichuri-symbol-of-bengal-durga-puja-259941",
      "https://www.cuisineindiasociety.in/?p=1140",
      "https://www.thehansindia.com/life-style/six-traditional-bengali-bhog-recipes-to-prepare-at-home-on-saraswati-puja-1041471",
      "https://www.thedailystar.net/lifestyle/deshi-mix/news/menu-puja-festivities-1980841",
      "https://slurrp.com/article/truly-labrajawab-an-ode-to-a-durga-puja-staple-1728295685572"
    ]
  },
  "ugadi-pachadi": {
    "origin": "Ugadi (Yugadi) is the new year of the Telugu and Kannada regions, falling on the first day of Chaitra in March-April; Maharashtra and Goa keep the same day as Gudi Padwa. Britannica notes that, according to some Hindu texts, it is the day Brahma created the universe.\n\nBritannica calls the pachadi the holiday's central dish: a chutney of tamarind, neem flowers, jaggery, salt, chilli and raw mango, each standing for an emotion expected in the year ahead. In Karnataka it is called bevu-bella, \"neem-jaggery\". Present-day readings add a seasonal rationale; a nutritionist quoted by Deccan Chronicle describes it as Ayurveda-based and as preparing the body for the change of season, but that is a modern explanation, not a dated record.\n\nNo early text or inscription naming the six-taste mixture was found, so its age is not stated here.",
    "sources": [
      "https://www.britannica.com/topic/Ugadi",
      "https://deccanchronicle.com/southern-states/andhra-pradesh/ritualistic-ugadi-pachadi-readies-one-for-seasonal-shift-1869163",
      "https://en.wikipedia.org/wiki/Ugadi",
      "https://blog.yatradham.org/ugadi-at-srisailam-temple/",
      "https://www.thehansindia.com/andhra-pradesh/ugadi-celebrations-begins-at-srisailam-mallikarjuna-swamy-temple-870635",
      "https://www.thehansindia.com/andhra-pradesh/ugadi-brahmotsavams-begin-at-srisailam-temple-1057283",
      "https://deccanchronicle.com/southern-states/andhra-pradesh/srisailam-gears-up-for-ugadi-mahotsavam-1869252",
      "https://assets.thehansindia.com/andhra-pradesh/special-prayers-offered-to-presiding-deities-on-ugadi-789148",
      "https://deccanchronicle.com/nation/in-other-news/230323/ugadi-festival-held-with-fervour-at-srisailam.html",
      "https://www.deccanchronicle.com/amp/southern-states/andhra-pradesh/ugadi-celebrated-with-religious-fervour-at-tirumala-and-tirupati-temples-1869869"
    ]
  },
  "kanya-pujan": {
    "origin": "Worship of young girls as forms of the Goddess belongs to both the Chaitra and Sharad Navratris. Kanjak or Kanya Puja is observed particularly on Ashtami and Navami, and the meal is usually puri, kala chana and halwa, according to the Free Press Journal.\n\nIn Bengal and eastern India the rite is called Kumari Puja and is held mainly on Maha Ashtami, sometimes on Navami. At Belur Math, near Kolkata, Swami Vivekananda is reported to have started the ritual in 1901 as part of the Durga Puja he began there; the monastery still performs it on Ashtami.\n\nNo early text, temple record or inscription was found that fixes when halwa, puri and kala chana became the standard meal. Present-day writers offer symbolic readings of the trio, but these are explanations rather than dated evidence.",
    "temples": [
      {
        "name": "Jhandewalan Temple",
        "place": "Jhandewalan Road, Central Delhi",
        "note": "A priest quoted by Slurrp says that on Navami during Navratri the temple offers halwa, chana, coconut and poori to the goddess, and that devotees can donate or sponsor bhog such as halwa-chana. This is the temple's Navami bhog, not a described Kanya Pujan meal."
      },
      {
        "name": "Chhatarpur Temple (Shri Adhya Katyayani Shakti Peeth Mandir)",
        "place": "Chhatarpur, South Delhi",
        "note": "A sewadar quoted by Slurrp says a large langar during Navratri serves halwa, puri, aloo sabzi and pumpkin sabzi, offered first to the goddess and then distributed; the temple's own site describes free food and prasad (langar) during the Navratras. Chana is not mentioned and the langar is not described as Kanya Pujan."
      }
    ],
    "sources": [
      "https://slurrp.com/article/navratri-2024-a-glimpse-of-the-unique-bhog-offerings-at-delhis-iconic-temples-1727686338233",
      "https://chhattarpurmandir.org/religious.asp",
      "https://en.wikipedia.org/wiki/Chhatarpur_Temple",
      "https://www.freepressjournal.in/lifestyle/kanya-puja-during-navratri-meaning-significance-and-traditions-explained",
      "https://www.hindu-blog.com/2026/03/the-sacred-tradition-of-kumari-puja.html",
      "https://www.lokmattimes.com/national/year-after-year-appeal-of-belur-maths-kumari-puja-remains-the-same",
      "https://www.thestatesman.com/bengal/puja-at-belur-math-enters-125th-year-1503488337.html",
      "https://tribuneindia.com/news/devotees-flock-to-temples-as-navratri-begins"
    ]
  },
  "panjiri": {
    "origin": "Ayurvedic literature describes a preparation called panchajiraka paka for the postnatal period (sutika kala). A 2019 review in AYUSHDHARA (Anumol et al.) notes that it is mentioned in the Bhavaprakasha. The name panjiri is commonly traced to this term, from pancha (five) and jiraka (cumin or similar spices), and a Marathi dictionary of 1857 defines a sweetmeat of five ingredients; no page I opened proves a direct line from the old formulation to the festive sweet.\n\nAs a festival food, Outlook Traveller lists panjiri among the prasad sweets of Janmashtami, describing a dry, nutty version made with coriander seeds and mewa. The Daily Pioneer calls dhaniya panjiri common in households that avoid grain during the fast.\n\nI found no dated temple record showing when panjiri entered worship.",
    "sources": [
      "https://wisdomlib.org/uploads/journals/ayushdhara/vol-6-issue-6-november-december-2019/499-432-1141.pdf",
      "https://en.wikipedia.org/wiki/Panjiri",
      "https://oteats.outlooktraveller.com/features/guides/here-are-the-culinary-rituals-associated-with-janmashtami-from-across-india",
      "https://dailypioneer.com/news/makkhan-se-prasad-krishnas-story-through-food",
      "https://cultureandheritage.org/2024/02/chhappan-bhog-of-shri-nathji-temple-nathdwara-rajasthan-a-divine-feast-for-the-deity.html",
      "https://www.amarujala.com/lifestyle/travel/janmashtami-2025-nathdwara-chhappan-bhog-shrinathji-temple-rajasthan-janmashtami-celebration-2025-08-08",
      "https://www.nathdwaratemple.org/darshan/bhog",
      "https://en.wikipedia.org/wiki/Shrinathji_Temple",
      "https://www.indiatvnews.com/lifestyle/spirituality/56-bhog-list-janmashtami-items-2025-08-15-1003043"
    ]
  },
  "diwali-faral": {
    "origin": "DNA India describes faral as the festive sweets and savouries of Diwali. Its report on the Maharashtrian platter names chivda, chakli and karanji among the usual items, and anarsa, kadboli and chiroti as dishes in decline. Every item used to be made at home, but busy households now often buy them from home chefs or local sweet shops. Anarsa, the report says, takes 10-12 days to prepare.\n\nNo early text, inscription or temple record that documents faral, or the date when poha chivda became a Diwali staple, was found, so no age is claimed here. A Pune chivda maker says that when faral tins were once sent by post or bus, chivda stayed crisp longest; that is a business's own account and carries no source or date, but it fits why dry, fried foods suit a festival that is prepared for days in advance.",
    "sources": [
      "https://www.dnaindia.com/just-before-monday/report-the-lesser-known-faral-2682346",
      "https://babuslaxminarayanchiwda.com/how-patal-poha-chiwda-became-a-diwali-staple",
      "https://www.slurrp.com/article/did-these-diwali-treats-have-medicinal-origins-1700602379034"
    ]
  },
  "lohri-til-rewari": {
    "origin": "Lohri is the celebration of longer days after the winter solstice, and is also linked to the rabi (winter) crop harvest. It is celebrated mainly in Punjab, and also in Jammu, Haryana, Himachal Pradesh and Delhi; Sindhis call it Lal Loi. After sunset people circle a bonfire and pour in offerings such as sesame, jaggery, sugar candy, popcorn, rewaries and gajjak, which is believed to carry prayers to the Sun for a good harvest and the end of winter.\n\nThe earliest dated records found are accounts by European visitors to Maharaja Ranjit Singh's court at Lahore: a visit in 1832, gift-giving on Lohri day noted in 1836, and a large night bonfire at court in 1844. Folklore centres on Dulla Bhatti, a Punjabi hero said to have rescued girls in Akbar's reign; Lohri songs are built around him, but this is legend, not history.\n\nNo early text describing rewari or gajak specifically as offerings was found.",
    "sources": [
      "https://en.wikipedia.org/wiki/Lohri",
      "https://ic.nvli.in/cuisine/lohri-honouring-harvest",
      "https://indianculture.gov.in/food-and-culture/celebration-on-a-plate"
    ]
  },
  "gujiya": {
    "origin": "Gujiya belongs to a wide family of stuffed, fried dumplings found across India. Wikipedia says gujhia is especially popular in Uttar Pradesh, Rajasthan, Gujarat and the Bihar-Bhojpuri region, where it is made for Chhath, Holi and Diwali. Related forms carry regional names: gughra in Gujarat, karanji in Maharashtra, kajjikayalu in Andhra Pradesh, garijalu in Telangana, karjikayi or kadubu in Karnataka, and neureo in Goa.\n\nBihar makes two kinds of pedakiya, one of khoa and one of roasted semolina (suji) with sugar, nuts and cardamom; the dry versions are especially eaten during Chhath.\n\nA popular claim dates the earliest gujiya to the 13th century, a jaggery-and-honey filling in wheat flour, sun-dried. Wikipedia carries it under a verification warning and the other accounts cite no source, so it is not repeated as fact here.",
    "sources": [
      "https://en.wikipedia.org/wiki/Gujhia",
      "https://www.outlooktraveller.com/explore/food-and-drink/story-behind-gujiya",
      "https://thebetterindia.com/312049/how-gujiya-came-to-india-turkish-connection-history-holi-sweet-dumplings-gujia-recipe/"
    ]
  },
  "puliyodarai": {
    "origin": "Tamarind rice is a long-standing temple offering in the Tamil, Telugu and Kannada country, though dated documentation for this dish is thin. A DT Next feature reports that Tirumala has one of the most comprehensive sets of food-related inscriptions and lists puliyodharai among the offerings. It adds that recipe inscriptions are rare, perhaps no more than ten across all temples, dating from the Chola and Nayaka periods, though it does not date the Tirumala records themselves. I could not confirm this from a primary inscription.\n\nTamarind rice is served through the day at the Ranganathaswamy temple in Srirangam, where much of it is sold at a prasadam stall, and is a daily offering at the Appakkudathan Perumal temple at Koviladi. At Melukote it is described as the signature dish of the temple town's Iyengar community.",
    "temples": [
      {
        "name": "Sri Ranganathaswamy Temple",
        "place": "Srirangam, Tiruchirappalli, Tamil Nadu",
        "note": "Open magazine reports puliogare among the dishes served through the day, with a prasadam stall where much of it can be bought."
      },
      {
        "name": "Cheluvanarayana Swamy Temple",
        "place": "Melukote (Melkote), Mandya district, Karnataka",
        "note": "The Karnataka tourism site lists Thuni Thengol and Puliyogare as popular prasadams of the temple; Lonely Planet singles out the Melkote temple's puliyogare as a distinctive version of tamarind rice."
      },
      {
        "name": "Appakkudathan Perumal Temple",
        "place": "Koviladi, Tamil Nadu",
        "note": "Open magazine says puliogare (tamarind rice) is carried to the deity as a daily offering at the 6 pm evening puja, together with seven appams."
      }
    ],
    "sources": [
      "https://www.dtnext.in/puliyodharai-a-hot-favourite-prasadam",
      "https://openthemagazine.com/features/living/a-divine-treat/",
      "https://www.karnataka.com/mandya/melukote-cheluvanarayana-swamy-temple/",
      "https://www.lonelyplanet.com/articles/sacred-cuisine-from-south-indian-temples",
      "https://www.thenewsminute.com/amp/story/features/melukote-karnataka-town-famed-temples-and-tanks-and-its-unforgettable-puliyogare-54587",
      "https://theprint.in/opinion/tirupati-god-was-offered-pongal-north-indian-pilgrims-brought-laddus/2280820",
      "https://www.ramanuja.org/sri/Srirangam/BriefHistory"
    ]
  },
  "pinda": {
    "origin": "Pinda, a ball of cooked rice offered to departed ancestors, belongs to the shraddha rites of the Dharmashastra and Puranic literature. Wikipedia's article, citing P. V. Kane's History of Dharmasastra, names the Garuda and Matsya Puranas and the Vishnu Smriti, and notes that the Tamil anthology Purananuru mentions a rice ball called pindam. I could verify these only through that article, not the primary texts.\n\nThe ingredients described are cooked rice with black sesame seeds and ghee, with barley flour in some accounts and ghee or honey as the binder. Details differ by family tradition, so families follow their own priest's guidance.\n\nGaya, in Bihar, is a major site for pind daan. Bihar Tourism says the Vishnupad Temple, on the bank of the Phalgu River, was erected in 1787 by Queen Ahilyabai, and that Rama is said to have performed pind daan at Gaya for his father Dasharatha.",
    "temples": [
      {
        "name": "Vishnupad Temple",
        "place": "Gaya, Bihar",
        "note": "Bihar Tourism calls it a major site for pind daan, on the bank of the Phalgu River, known for a sacred footprint of Vishnu set into rock; it says the temple was erected in 1787 by Queen Ahilyabai."
      }
    ],
    "sources": [
      "https://tourism.bihar.gov.in/en/destinations/gaya/vishnupad-temple",
      "https://en.wikipedia.org/wiki/Pinda_"
    ]
  },
  "ghewar": {
    "origin": "Ghewar (ghevar) is a Rajasthani sweet associated with the monsoon month of Shravana and the festivals of Teej and Raksha Bandhan; Slurrp describes it as long linked with those festivals, and an Amar Chitra Katha feature says it is prepared in July and August. Accounts say it began in the royal courts of Rajasthan, and the Cuisine India Society links it to Jaipur, where it says confectioners perfected its crisp, airy texture. No document giving a date or a place of first making was found, and these accounts cite no sources.\n\nThe custom is better attested. Slurrp reports that on Sinjara, the day before Gangaur, parents send gifts to newly married daughters, including ghevar, and calls it a staple of the day. In Jaipur, ghevar boxes are exchanged as gifts at Teej.",
    "sources": [
      "https://www.slurrp.com/article/gangaur-and-ghevar-a-rajasthani-festivals-sweetest-tradition-1742214655434",
      "https://www.cuisineindiasociety.in/?p=1109",
      "https://www.amarchitrakatha.com/history_details/stories-of-sweets-of-india/",
      "https://en.wikipedia.org/wiki/Ghevar"
    ]
  },
  "makhan-mishri": {
    "origin": "The child Krishna's butter-stealing is part of the Bhagavata Purana's account of his Gokul childhood: verse 10.8.29, in a translation on Vedabase, says he devises ways to steal curd, butter and milk and then eats and drinks them. In Mathura, Vrindavan and Gokul he is remembered as Makhan Chor, and the Daily Pioneer describes fresh white butter mixed with mishri crystals as an offering to Bal Krishna, closely tied to Mathura and Vrindavan. It is a devotional practice, not a dish with a dated invention.\n\nAt Nathdwara, in the Pushtimarg tradition, Inditales and a Hindu-blog article on Gwal seva describe the Gwal darshan, when Shrinathji is told that his cows are well and is offered makhan mishri and other milk-based foods. I found no inscription or early text recording the specific pairing of butter and mishri.",
    "temples": [
      {
        "name": "Shrinathji Temple",
        "place": "Nathdwara, Rajasthan",
        "note": "At the Gwal darshan the deity is told that the cows in his cowshed are well, and he is offered makhan mishri and other milk-based foods (Inditales); another account lists puri, batashe and dahi alongside it (hindu-blog)."
      }
    ],
    "sources": [
      "https://inditales.com/?p=10195",
      "https://www.hindu-blog.com/2022/11/gvala-seva-at-nathdwara-shrinathji.html",
      "https://vedabase.net/sb/10/8/29.htm",
      "https://dailypioneer.com/news/makkhan-se-prasad-krishnas-story-through-food",
      "https://oteats.outlooktraveller.com/features/guides/here-are-the-culinary-rituals-associated-with-janmashtami-from-across-india",
      "https://www.bruitemagazine.com/?p=6518",
      "https://www.nathdwaratemple.org/darshan/Gwal",
      "https://en.wikipedia.org/wiki/Jain_vegetarianism",
      "https://jainqq.org/pagetext/Handbook_of_Jainology/001346/169"
    ]
  },
  "halwa-sheera": {
    "origin": "Karah prasad is the sacrament shared at the end of Sikh services. The Sikh Encyclopedia says the custom of offering it in the gurdwara is traced back to Guru Arjan, and gives no date. Ghee, wheat flour and sugar are weighed in equal amounts, and the word karah comes from a Sanskrit term for a large boiling pan. One scholarly view quoted on Wikipedia, W. H. McLeod's, is that the Sikh practice was presumably taken from the Hindu custom of offering prasad in temples.\n\nAt Harmandir Sahib, cooks told The Tribune they use one kilogram each of ghee, atta and sugar with six litres of water, and make it fresh. At Annavaram, where the idol was consecrated on 6 August 1891, The Hans India describes the prasad as wheat flour cooked with sugar, ghee and cardamom and packed in leaves, and reports ISO certification in 2019, later FSSAI certification. A recipe site says Maharashtrian puja sheera is traditionally made in savva (1¼) proportion but gives no reason.",
    "temples": [
      {
        "name": "Sri Harmandir Sahib (Golden Temple)",
        "place": "Amritsar, Punjab",
        "note": "Karah prasad of atta, ghee and sugar is cooked in a hall attached to a kitchen along the parikrama and sold by coupon, according to The Tribune."
      },
      {
        "name": "Sri Veera Venkata Satyanarayana Swamy Temple",
        "place": "Annavaram, Andhra Pradesh",
        "note": "The Hans India describes the temple's prasad as a wheat-flour sweet made with sugar, ghee and cardamom, packed hot in addaku (wild) leaves, and certified by FSSAI; the grain is reported as wheat flour, not rava."
      }
    ],
    "sources": [
      "https://www.thesikhencyclopedia.com/karah-prasad",
      "https://en.wikipedia.org/wiki/Karah_Parshad",
      "https://www.tribuneindia.com/news/amritsar/devotion-tradition-define-prashad-prep-at-golden-temple/",
      "https://assets.thehansindia.com/andhra-pradesh/fssai-certification-for-annavaram-prasadam-903881",
      "https://en.wikipedia.org/wiki/Satyanarayana_Temple,_Annavaram",
      "https://madhurasrecipe.com/savva-kilo-prasadacha-sheera/",
      "https://temple.dinamalar.com/en/new_en.php?id=1571",
      "https://www.slurrp.com/recipes/annavaram-prasadam-1612539393",
      "https://eastgodavari.ap.gov.in/lord-sri-veera-venkata-satya-narayana-swamy-vari-devasthanam-annavaram/"
    ]
  },
  "sweet-pongal": {
    "origin": "Britannica describes Pongal as a harvest festival in which rice is boiled in milk, usually around 14 January when the Sun enters Makara, and the Tamil Nadu tourism site derives the name from the Tamil word for boiling over. One article on tamilculture.com notes that early Tamil literature has no direct reference to Pongal. It points to Purananooru 22, which mentions a dish called pulukal that scholars compare to pongal, and says the word itself first appears in the 9th-century Civaka Cintamani. These are one writer's claims and are best treated as leads.\n\nAs a temple offering, akkaravadisal, a milk, rice, moong dal and jaggery sweet comparable to sakkarai pongal, is prepared as prasadam for Andal. A heritage article places it in Margazhi at Srivilliputhur; the Auroville Society says it marks the close of the Margazhi vow on the first day of Thai. It is also offered at Kallazhagar temple near Madurai on the 27th day of Margazhi. No early record of the Andhra or Karnataka forms was found.",
    "temples": [
      {
        "name": "Andal Temple (Srivilliputhur Divya Desam)",
        "place": "Srivilliputhur, Tamil Nadu",
        "note": "Akkaravadisal (akkara adisil), a milk, rice, moong dal and jaggery sweet comparable to sakkarai pongal, is prepared as prasadam for Andal; sources differ on timing, Margazhi (heritage article) or the first day of Thai (Auroville Society article). The temple is a Divya Desam and the birthplace of Andal (Incredible India)."
      },
      {
        "name": "Kallazhagar Temple (Alagar Koil)",
        "place": "Madurai, Tamil Nadu",
        "note": "Akkaravadisal, made with rice, moong dal, milk, jaggery and ghee, is offered on the 27th day of Margazhi, linked to Andal's vow in Nachiyar Thirumozhi 9.6, per a temple-offerings blog (single source)."
      }
    ],
    "sources": [
      "https://britannica.com/topic/Pongal",
      "https://www.tamilnadutourism.tn.gov.in/events/pongal-festival",
      "https://tamilculture.com/the-history-of-pongal-did-you-know-that-there-is-no-reference-to-pongal-in-ancient-tamil-text",
      "https://cultureandheritage.org/2024/02/akkaravadisal-the-divine-delicacy-of-andal-temple-srivilliputhur-tamil-nadu.html",
      "https://renaissance.aurosociety.org/devotee-as-the-deity-srivilliputhur-andal-temple/",
      "https://www.incredibleindia.gov.in/en/tamil-nadu/madurai/srivilliputtur-andal-temple",
      "https://www.hindu-blog.com/2022/12/story-of-offering-akkaravadisal-in-margazhi-month-kallazhagar-temple.html",
      "https://hindupad.com/koodaravalli-2014-koodaravalli-festival-margazhi-month"
    ]
  },
  "sev-ravo": {
    "origin": "Homegrown says the Zoroastrians who became the Parsis left Persia in the 7th century CE and settled on the Gujarat coast, where they began to absorb local sweet traditions, including semolina-based ravo, a ceremonial sweet served on joyous occasions. The same article reports an enduring oral tradition in which the Parsi high priest poured a spoonful of sugar into the king's cup of milk. Encyclopaedia Iranica notes the story comes from the Qesse-ye Sanjan, written down in 1600, and that scholars give no firm arrival date.\n\nOn Navroz, the Parsi New Year, Zee Zest says breakfast is usually sev with dahi and that ravo is another popular sweet for breakfast, and parsicuisine.com also lists both under breakfast. Indian Parsis follow the Shahenshahi calendar, which has no leap years, so their Navroz falls about 200 days away from the spring equinox date, according to The Better India.",
    "sources": [
      "https://homegrown.co.in/homegrown-explore/sugar-milk-magic-how-migration-assimilation-shaped-parsi-desserts",
      "https://iranicaonline.org/articles/parsi-communities-i-early-history",
      "https://zeezest.com/food/what-do-indian-parsis-eat-on-navroze-or-parsi-new-year-zee-zest-307",
      "https://www.parsicuisine.com/navroz/",
      "https://www.thebetterindia.com/112242/navroz-new-year-parsi-community-india/",
      "https://newsmeter.in/lifestyle/sev-to-sali-gosh-here-are-some-parsi-dishes-that-make-jamshedi-navroz-special-745589"
    ]
  },
  "gopalkala": {
    "origin": "Gopalkala is a Maharashtrian dish tied to Gokulashtami and the Dahi Handi pot-breaking. Amar Chitra Katha says the pot holds a specially made festive dish called gopalkala, and describes it as traditionally potluck-style, with neighbours or community members each bringing one or two ingredients that are mixed together. Common items such as flattened rice and spices let families of different means take part. Dairy has pride of place because Krishna is believed to have favoured it, and the recipe is not fixed: curd, milk, puffed or flattened rice, cucumber, fruit and pickles are all listed.\n\nSlurrp says it is served as bhog during Janmashtami and that the same mixture fills the pot hung high for Dahi Handi, but its explanation rests on tradition and folklore and cites no scripture. No temple record or early text naming gopalkala was found, so its age is uncertain.",
    "sources": [
      "https://www.amarchitrakatha.com/history_details/the-significance-of-gopalkala/",
      "https://www.slurrp.com/article/janmashtami-2022-why-gopalkala-is-integral-to-this-festival-1660284839013",
      "https://www.trawell.in/maharashtra/pandharpur/sri-gopalkrishna-temple"
    ]
  },
  "narali-bhat": {
    "origin": "Narali Purnima falls on the Shravan full moon and is observed by Hindu fishing communities on the Konkan coast and in Mumbai, according to Incredible India. At Versova Koliwada, the Jio Institute exhibit describes processions carrying coconuts in a water-filled pot, offered to Varuna, whom the Kolis call Darya Raja, for safety on long sea voyages. It says the festival marks the end of the monsoon and the start of the new fishing season, after a two-month government ban on fishing.\n\nNarali bhat is one of the festival's naivedya items. The Jio exhibit describes it as coconut milk with rice and dry fruits, while eSamskriti describes it as a festive rice dish flavoured with coconut and jaggery, prepared for offerings and for community feasts. No early written record of narali bhat itself was found.",
    "sources": [
      "https://www.incredibleindia.gov.in/en/festivals-and-events/maharashtra/narali-pournima",
      "https://exhibits.jioinstitute.edu.in/spotlight/the-koli-festival-of-narali-purnima",
      "https://esamskriti.com/e/Culture/Festivals/Narali-Purnima-is-a-Festival-of-Coastal-Communities-1.aspx",
      "https://utsav.gov.in/view-event/narali-purnima",
      "https://en.wikipedia.org/wiki/Narali_Poornima"
    ]
  },
  "khichdi-bhog": {
    "origin": "Rice and lentils cooked together is an everyday meal, so its place in worship is a set of regional customs rather than a single origin. In Puri, the Orissa Review (2006) says Pahili Bhoga, the first food offered early in the morning in the month of Pausa, is a khechedi preparation, linked in an account to Yashoda cooking it for her son. A 2009 Orissa Review article lists kanika khechudi, with dal and vegetable curries, in the temple's morning meal and says the daily ritual system is believed to date from the 13th century, in the reign of Anangabhima Dev.\n\nIn Bengal, The Federal says bhoger khichuri is served on Ashtami of Durga Puja, offered to the goddess first, and cooked in large batches at community pujas. Slurrp reports the author Rinku Ghosh tracing sarbojonin (public) Durga Puja bhog to the 1943 famine, when a Howrah family began distributing bhog to the public. No source found names khichdi as a fixed Datta offering.",
    "temples": [
      {
        "name": "Shree Jagannath Temple",
        "place": "Puri, Odisha",
        "note": "The Orissa Review lists khechedi as the Pahili Bhoga offered in Pausa (December) and kanika khechudi in the morning meal (Sakal Dhupa)."
      }
    ],
    "sources": [
      "https://magazines.odisha.gov.in/Orissareview/june2006/engpdf/14-15.pdf",
      "https://magazines.odisha.gov.in/Orissareview/2009/June/engpdf/84-87.pdf",
      "https://thefederal.com/category/features/how-simple-plate-khichuri-symbol-of-bengal-durga-puja-259941",
      "https://slurrp.com/article/kiara-advani-and-rani-mukerji-bond-over-durga-puja-khichdi-heres-why-the-dish-is-a-puja-staple-1697962831370",
      "https://shreekhetra.com/mahaprasad.html",
      "https://www.hindu-blog.com/2024/01/sri-kshetra-ganagapur-dattatreya-temple-festivals-history.html",
      "https://www.incredibleindia.gov.in/en/festivals-and-events/maharashtra/shree-datta-jayanti"
    ]
  },
  "tilgul": {
    "origin": "Tilgul is eaten through the winter and made especially for Makar Sankranti in mid-January. Amar Chitra Katha says it is very popular in Maharashtra, where it is made into small laddoos or chikki, and that families exchange it with the greeting \"tilgul kha, goad goad bola\" (have tilgul, speak sweet words). A folklore archive at USC records the same custom, tied to Surya, with the practical reason that sesame and jaggery keep the body warm in the cold months.\n\nOn why sesame matters, Scroll quotes a book on Hinduism saying that til emanates from Vishnu's body, and Amar Chitra Katha reports a belief that sesame formed from drops of Vishnu's sweat. In Karnataka, Scroll says ellu-bella mixes sesame, jaggery, dried coconut, roasted peanuts and fried chana dal, and is sometimes shared with sugar figurines (sakkare achchu) and sugarcane. These are traditions; no early text or temple record naming these exact sweets was found.",
    "sources": [
      "https://www.amarchitrakatha.com/history_details/why-is-tilgul-given-on-makar-sankranti/",
      "https://folklore.usc.edu/?p=50089",
      "https://scroll.in/magazine/864777/scroll_in",
      "https://en.wikipedia.org/wiki/Tilgul"
    ]
  },
  "sundal": {
    "origin": "Sundal is a salad of pulses or grains that is offered as naivedyam during Navaratri and Golu. DT Next says a different variety is offered on each day of the festival, and links the nine varieties to the nine planets, offered to appease them. A food article on Slurrp says the snack is of Tamil origin and was first known to have been served to presiding deities in temples before being given to devotees, a claim it does not source.\n\nThe golu display itself is traced to the royal Navaratri celebrations of the Vijayanagara kingdom in the 14th century, and was especially popular at the courts of Thanjavur and Pudukkottai, according to BiblioAsia. Guests leave with a thamboolam tray of kumkum, turmeric and betel leaves, and prasadam is served to visitors. No dated early reference to sundal itself was found.",
    "temples": [
      {
        "name": "Varadaraja Perumal Temple",
        "place": "Kanchipuram, Tamil Nadu",
        "note": "A temple-prasadam guide on hindutone.com says the temple provides sundal and payasam on Vaikuntha Ekadashi (single source)."
      },
      {
        "name": "Rajagopalaswamy Temple",
        "place": "Mannargudi, Tamil Nadu",
        "note": "The same guide lists panchamirtham and sundal among the offerings highlighted on Vaikuntha Ekadashi (single source)."
      }
    ],
    "sources": [
      "https://www.dtnext.in/lifestyletopnews/2016/10/02/nine-days-of-fasting-and-feasting",
      "https://www.slurrp.com/article/sundal-for-golu-origins-and-history-of-the-south-indian-navratri-staple-1728465724531",
      "https://biblioasia.nlb.gov.sg/vol-15/issue-3/oct-dec-2019/navaratri-golu/",
      "https://hindutone.com/temples/temple-prasadams-offered-on-vaikuntha-ekadashi-across-india/",
      "https://newstodaynet.com/2025/09/22/navarathri-sundals-a-chennai-tradition-of-devotion-and-flavour/",
      "https://www.subbuskitchen.com/navratri-recipes-sundal-recipes",
      "https://en.wikipedia.org/wiki/Golu_"
    ]
  },
  "karthigai-pori": {
    "origin": "Karthigai Deepam is a lamp festival of Tamil Nadu. The Ilankai Tamil Sangam article and the Tiruvannamalai district website say it is mentioned in the Sangam anthology Akananuru, with Natrinai and the poet Avvaiyar also cited; the dates given for Sangam literature vary, from the 2nd to 5th century CE to about 200 BCE to 300 CE. These pages do not quote the verses, and none connects pori to those texts.\n\nAt Tiruvannamalai, Wikipedia says the festival lasts ten days and ends with a lamp lit in a cauldron of ghee on top of the Arunachala hill; it adds that the festival was celebrated as early as the Chola period. Pori urundai, puffed rice with jaggery, is described as the festival's neivedyam, and a folk story links its shape to the rice balls elephants ate, tied to the anai vilakku. The Ilankai Tamil Sangam article also links the month to the Krittika stars who cared for Murugan.",
    "temples": [
      {
        "name": "Arunachaleswarar Temple",
        "place": "Tiruvannamalai, Tamil Nadu",
        "note": "A temple-offerings blog says a special naivedyam of pori urundai (puffed rice and jaggery syrup) is offered on Karthigai Deepam day (single source). The festival lasts ten days and ends with the Deepam on the hill (Wikipedia, utsav.gov.in)."
      }
    ],
    "sources": [
      "https://sangam.org/?p=18650",
      "https://tiruvannamalai.nic.in/?p=23428",
      "https://utsav.gov.in/view-event/maha-deepam-festival-thiruvannamalai-1",
      "https://en.wikipedia.org/wiki/Arunachalesvara_Temple",
      "https://www.hindu-blog.com/2023/05/food-offering-at-tiruvannamalai.html",
      "https://www.hindu-blog.com/2017/10/pori-urundai-prasadam-offered-on-day-of.html",
      "https://www.dailypioneer.com/news/renewing-faith-under-the-krittika-star"
    ]
  },
  "narkel-naru-sandesh": {
    "origin": "These are two different sweets with different histories. Narkel naru, a coconut-jaggery ball, is prepared for Lakshmi Puja in Bengal, where one writer says the puja \"feels incomplete without narkel naru\" and that there is no clear scriptural reason for it, the custom resting on what elders handed down; the writer says the word naru comes from laddu. Bong Eats links it to Bijoya Dashami and says chhana sandesh is a much more recent phenomenon than coconut-and-jaggery sweets.\n\nSandesh is a medieval Bengali word. Wikipedia says it appears in Krittibas's Ramayana, most likely as solidified kheer, and Scroll reports Chitrita Banerji reading the sandesh in the Chaitanyacharitamrita as sweetened pellets of khoya kheer. Banerji says the name commonly meant the chhana sweet only by the second half of the 19th century. Scroll presents a Portuguese origin for chhana in the 16th century as the most enduring theory, not settled fact. Nolen gur versions use the first sap of the date palm in winter.",
    "sources": [
      "https://www.hindu-blog.com/2024/01/narkel-naru-dish-lakshmi-puja-bengal.html",
      "https://bongeats.com/recipe/naru",
      "https://en.wikipedia.org/wiki/Sandesh_",
      "https://scroll.in/magazine/858633/",
      "https://www.outlookindia.com/traveller/cuisine/a-sweet-winter-treat-from-bengal-nolen-gurer-sandesh/"
    ]
  },
  "modak": {
    "origin": "Sweet filled dumplings called modaka appear in old Indian food writing, though the accounts we could open are secondary. A medieval Sanskrit text, the Manasollasa, attributed to the Chalukya king Someshvara III, is reported to describe a rice-flour dumpling with a sweet filling flavoured with cardamom and camphor; the same article cautions that this is not necessarily today's steamed coconut-and-jaggery modak.\n\nThe link with Ganesha is traced mainly through art. Art historian Saili Palande Datar points to sculpture from about the 6th century CE, including work at Ellora, showing Ganesha with a modak-like sweet. Forms differ by region: steamed rice-flour modaks on the coast, fried wheat-flour ones in the Ghats, and in Tamil Brahmin cookery, as in the book Samaithu Par, four kinds of modakam with different fillings. Datar suggests the Thanjavur Marathas may have connected the Marathi and Tamil forms, but only as a possibility.",
    "temples": [
      {
        "name": "Arulmigu Karpaga Vinayagar Temple",
        "place": "Pillayarpatti, Sivagangai district, Tamil Nadu",
        "note": "The ten-day Vinayagar Chaturthi festival here is reported to end with an enormous offering of modhagam, said to weigh over 27 kg and use about 18 measures of rice, distributed as prasadam. The state festival portal says devotees offer the deity his favourite kozhakattai."
      }
    ],
    "sources": [
      "https://www.downtoearth.org.in/food/ganesh-chaturthi-the-modak-s-history-reflects-its-strong-ties-to-the-land-here-is-how-84629",
      "https://oteats.outlooktraveller.com/features/guides/this-is-the-story-and-history-behind-lord-ganeshas-favourite-modak",
      "https://utsav.gov.in/view-event/vinayagar-chaturthi-festival-at-arulmigu-karpaga-vinayagar-temple-pillayarpatti",
      "https://www.outlooktraveller.com/experiences/places-of-interest/pillayarpatti-the-tamil-nadu-temple-where-ganesha-is-carved-into-living-rock"
    ]
  },
  "annakut": {
    "origin": "Annakut belongs to Govardhan Puja, kept on the first day of the bright half of Kartika, the day after Diwali; Britannica adds that the day also opens the new year in the Vikrama calendar. In the story told in Hindu tradition, Krishna lifted Govardhan hill to shelter the people of Braj from storms sent by Indra, and the heaped food recalls that episode.\n\nAt Nathdwara in Rajasthan, the seat of Shrinathji in the Pushtimarg tradition, Annakut is among the temple's major festivals. A heritage account says the image was moved from Govardhan and installed at Nathdwara in 1672. A local news report describes huge quantities of rice and other dishes made from the new crop being offered, after which Bhil families take heaps of the rice home as prasad. BAPS Swaminarayan temples also hold Annakut; BAPS reports a Guinness record of 1,247 dishes at its Neasden mandir in London in 2000. No dated record of the first Annakut was found.",
    "temples": [
      {
        "name": "Shrinathji Temple",
        "place": "Nathdwara, Rajasthan",
        "note": "Annakut is listed among the temple's major festivals, when thousands of food items are offered to Shrinathji. A local news report describes rice and other dishes from the new crop offered, with Bhil families taking heaps of the rice home as prasad."
      },
      {
        "name": "BAPS Shri Swaminarayan Mandir",
        "place": "Neasden, London, UK",
        "note": "BAPS reports a Guinness World Record for 1,247 vegetarian dishes offered at its Annakut on 27 October 2000."
      }
    ],
    "sources": [
      "https://www.britannica.com/topic/Goverdhan-Puja",
      "https://vishvasa.github.io/AgamaH/AryaH/hinduism/sAmya-vaiShamye/articles/lochtefeld_hinduism-encyclopedia/entries/G/Govardhan_Puja",
      "https://cultureandheritage.org/shrinathji-temple-nathdwara-rajasthan",
      "https://udaipurtimes.com/celebrations/goverdhan-pooja-and-annakoot-following-diwali/c74416-w2859-cid101615-s10699.htm",
      "https://rasonly.com/current-affairs/353-year-old-govardhan-puja-tradition-in-nathdwara-rajasthan",
      "https://www.baps.org/News/2000/3rd-Guinness-World-Record-for-Annakut-1926.aspx",
      "https://www.baps.org/About-BAPS/WhatPeopleSay/AwardsandRecognitions.aspx",
      "https://www.baps.org/News/2019/Diwali-and-Annakut-Celebration-2019-17959.aspx"
    ]
  },
  "kheel-batasha": {
    "origin": "Kheel (puffed rice) and batasha (sugar drops) are offered at Diwali, and food writers link the pairing to the autumn harvest, when rice and sugarcane are freshly cut. One writer recalls them as the offerings made to rows of lit lamps at her family's Lakshmi puja, and says she cannot tell how old the practice is. The International Rice Research Institute's Rice Today describes kheel batasha as puffed rice and sugar, often served at religious occasions such as Diwali and mostly offered to Hindu deities.\n\nWe found no dated text, inscription or temple record for kheel and batasha, so no early history is claimed. The jaggery-bound puffed-rice ball moa is a separate regional preparation; its offering at Lakshmi Puja or Poush Sankranti was not confirmed from a reliable source, so it is not described here.",
    "sources": [
      "https://scroll.in/magazine/854531/scroll_in",
      "https://ricetoday.irri.org/rice-on-twitter-kheel-batasha",
      "https://www.thedailystar.net/lifestyle/poush-sankranti-1342648",
      "https://www.hindu-blog.com/2024/01/indispensable-items-kojagari-lakshmi-puja.html"
    ]
  },
  "thandai": {
    "origin": "The origin of thandai is not firmly documented. Popular belief links it to Shiva, saying Parvati gave him a cooling drink after he swallowed the poison from the churning of the ocean, but writers present this as legend, not history. The name comes from thanda, 'cool'.\n\nOne account traces thandai to sardai, a milk-and-nut drink of the Nihang Sikh community, sometimes made with bhang, and mentions a thandai mix served at the Patiala court in winter; these claims come from chefs and a nutritionist quoted in Deccan Herald, not from written records. A Hindustan Times feature dates the original recipe to the early 20th century. Newspapers report bhang offered as prasad to Baba Vishwanath in Varanasi at Mahashivaratri and thandai sold across the city, but we found no temple record naming plain thandai as an offering. This page gives the bhang-free form.",
    "sources": [
      "https://www.deccanherald.com/features/thandai-the-godly-good-ambrosia-1089960.html",
      "https://pressreader.com/india/ht-cafe/20200309/281938839972622",
      "https://zeenews.india.com/culture/did-you-know-bhang-is-served-as-prasad-in-varanasi-on-maha-shivratri-2264972.html",
      "https://www.dtnext.in/lifestyletopnews/2017/02/26/the-legacy-of-varanasi",
      "https://www.oneindia.com/2006/02/26/city-of-shiva-varanasi-plunges-into-bhang-on-shivratri-1140968470.html"
    ]
  },
  "pana": {
    "origin": "Pana Sankranti, also called Maha Bishuba Sankranti, is the Odia new year, when the Sun enters Mesha (Aries), around 13 or 14 April; a new Odia almanac (panji) takes effect that day. The day is also observed as Hanuman's birthday, and devotees spend it visiting temples.\n\nPana is a cold sweet drink, described in Odisha media as made with wood apple, jaggery and seasonal fruits, offered to deities and shared with the community. A cultural article describes hanging a small earthen pot with a hole in its base over the tulsi plant, filled with water or pana so that it drips onto the plant, and refilled daily through the month. OdishaTV reports that at Puri's Srimandir on the day a special pana of chhena, jaggery, banana, milk, cardamom, pepper and chhatua is offered as bhog, in the context of the Hanuman rituals at Singhadwara. No early textual record of pana was found, so no antiquity is claimed.",
    "temples": [
      {
        "name": "Shri Jagannath Temple (Srimandir)",
        "place": "Puri, Odisha",
        "note": "On Maha Bishuba Sankranti a special pana of chhena, jaggery, banana, milk, cardamom, pepper and chhatua is reported as offered as bhog, in the context of the Hanuman rituals at Singhadwara; the report does not say who receives it (OdishaTV, 2023)."
      }
    ],
    "sources": [
      "https://odishatv.in/news/odisha/maha-bishuba-sankranti-special-rituals-held-at-srimandir-new-odia-almanac-comes-into-effect-201646",
      "https://odishatv.in/news/odisha/odia-new-year-begins-pana-sankranti-hanuman-jayanti-special-rituals-odisha-260310",
      "https://esamskriti.com/e/Culture/Festivals/How-PANA-SANKRANTI-is-celebrated-in-Odisha-1.aspx",
      "https://www.newsonair.gov.in/maha-vishuba-sankranti-and-pana-sankranti-mark-beginning-of-odia-new-year",
      "https://www.dailypioneer.com/2021/state-editions/pana-sankranti-marks-advent-of-odia-ny.html"
    ]
  },
  "panakam": {
    "origin": "Panakam is jaggery water, flavoured in different regions with ginger, pepper, cardamom or lemon. Its best-documented temple home is the Panakala Lakshmi Narasimha Swamy temple at Mangalagiri in Andhra Pradesh, where the deity is named for the offering. The Guntur district tourism page and a travel guide say devotees' jaggery water is poured into the deity's mouth, and that about half is believed to be returned and given back as prasad.\n\nPanakam is also reported as a traditional Rama Navami drink, commonly taken with kosambari at that festival, and as a drink served in temples and homes. We found no dated early text or inscription for panakam, so its antiquity is not stated here. Temple accounts of legends around the Mangalagiri hill are belief rather than documented history.",
    "temples": [
      {
        "name": "Sri Panakala Lakshmi Narasimha Swamy Temple",
        "place": "Mangalagiri, Guntur district, Andhra Pradesh",
        "note": "Devotees' jaggery water (panakam) is poured into the mouth of the deity; about half is believed to be returned and given back as prasad (Guntur district tourism page; MapsOfIndia)."
      }
    ],
    "sources": [
      "https://guntur.ap.gov.in/religious-tourism/",
      "https://www.mapsofindia.com/vijayawada/travel-attractions/mangalgiri-temple.html",
      "https://hindupad.com/panakala-narasimha-swamy-god-who-is-offered-panakam-as-naivedyam/",
      "https://www.slurrp.com/article/ram-navami-special-traditional-bhog-recipes-from-across-india-1774428328682",
      "https://www.boldsky.com/yoga-spirituality/ram-navami-2023-panakam-and-kosambari-the-traditional-naivedyams-for-navami-145284.html",
      "https://en.wikipedia.org/wiki/Panakam"
    ]
  },
  "appam": {
    "origin": "Unniyappam is best documented in Kerala temple offerings. Kerala Tourism describes the Kottarakkara Mahaganapathi temple as famous for its unniyappam offering, and the temple's own account of its origin tells of a Thampuran who vowed to cover the idol entirely with unniyappam; this is temple legend, not documented history.\n\nAt Sabarimala, appam and aravana are the major offerings, sold by the Travancore Devaswom Board, with record sales in the Mandalam-Makaravilakku season that runs from November to January. A food article describes the appam as a batter of rice flour, very ripe bananas, jaggery, coconut, sesame and cardamom, fried in a cast-iron pan with semicircular hollows. In 2018 the Board enlisted the Central Food Technological Research Institute (CFTRI) to improve the appam and aravana's quality, taste and shelf-life. No dated early reference was found for the Kerala form, and nothing was confirmed for the Tamil Karthigai nei appam.",
    "temples": [
      {
        "name": "Sabarimala Sree Dharma Sastha (Ayyappa) Temple",
        "place": "Sabarimala, Kerala",
        "note": "Appam and aravana are the major offerings, sold by the Travancore Devaswom Board; sales are heaviest in the Mandalam-Makaravilakku season, November to January."
      },
      {
        "name": "Kottarakkara Sree Mahaganapathi Temple",
        "place": "Kottarakkara, Kollam district, Kerala",
        "note": "Kerala Tourism calls the temple famous for its unniyappam offering; the temple's own history says a Thampuran vowed to cover the idol with unniyappam (a temple legend)."
      }
    ],
    "sources": [
      "https://www.keralatourism.org/temples/kollam/kottarakkara-mahaganapathi",
      "https://www.kottarakaratemple.org/ktrSMGT_vzp.php",
      "https://english.metrovaartha.com/news/kerala/appam-aravana-sales-in-sabarimala-rise-by-rs-1834-crore",
      "https://www.slurrp.com/article/sweet-tidings-at-sabarimala-1669525121725",
      "https://www.onmanorama.com/news/kerala/2018/04/29/sabarimala-appam-and-aravana-to-be-more-delicious-with-a-cftri-touch.html",
      "https://www.business-standard.com/article/pti-stories/sabarimala-prasadam-to-get-makeover-with-cftri-touch-118042900278_1.html",
      "https://gokshetra.com/kottarakkara-ganapathy-temple-darshan-guide/"
    ]
  },
  "kosambari": {
    "origin": "We found no dated text or temple record for kosambari or vadapappu, so no history is claimed. What the sources do show is present-day practice. Kosambari, a salad of soaked moong dal with cucumber and coconut, is described as a Karnataka dish served as naivedyam and given as prasad in temples at Rama Navami, often as the twin of panakam. A Karnataka newspaper reports an age-old custom of handing out paanaka and kosambari at public stalls on Rama Navami. Vadapappu is its Andhra counterpart, but no reliable source for its festival role was found.",
    "sources": [
      "https://www.cuisineindiasociety.in/recipes/kosambari/",
      "https://www.boldsky.com/yoga-spirituality/ram-navami-2023-panakam-and-kosambari-the-traditional-naivedyams-for-navami-145284.html",
      "https://udayavani.com/?p=1451752",
      "https://www.dailypioneer.com/2025/sunday-edition/karnataka--a-celebration-of-history---gustatory-experiences-.html",
      "https://www.slurrp.com/article/ram-navami-special-traditional-bhog-recipes-from-across-india-1774428328682",
      "https://en.wikipedia.org/wiki/Kosambari",
      "https://telanganatoday.com/sri-rama-navami-celebrated-in-grand-traditional-manner-at-bhadrachalam",
      "https://www.thehansindia.com/news/cities/khammam/bhadrachalam-a-grand-celebration-of-spirituality-and-tradition-872826",
      "https://utsav.gov.in/view-event/sreerama-navami"
    ]
  },
  "thekua": {
    "origin": "Thekua is the characteristic prasad of Chhath, a festival of Sun worship observed mainly in Bihar, Jharkhand and eastern Uttar Pradesh, and also in Nepal. India's Utsav portal lists it among the prasad offerings with kheer, kasar and seasonal fruits, and Hinduism Today calls it the festival's distinctive prasad. Accounts describe it as made from wheat flour and jaggery, fried in ghee, prepared on the evening of Kharna, the second day, or the next morning. Cooks prefer whole wheat to refined flour for a crisp exterior. It is also called Thokwa.\n\nChhath is described as a post-harvest thanksgiving, and freshly cut sugarcane is among the offerings. We found no dated text, inscription or temple record that names thekua, so its age is not stated here.",
    "sources": [
      "https://thebetterindia.com/265598/bihar-chhath-puja-thekua-food-science-health-benefits-sweet",
      "https://www.hinduismtoday.com/hpi/?p=3670",
      "https://utsav.gov.in/view-event/chhath-puja",
      "https://www.incredibleindia.gov.in/en/festivals-and-events/chhath-puja",
      "https://www.sahapedia.org/chhath-puja-origin-of-the-festival-and-the-story-of-devasena"
    ]
  },
  "puri-mahaprasad": {
    "origin": "Puri's Mahaprasad is cooked in the Jagannath temple kitchen in earthen pots over firewood, and the temple is reported to offer fifty-six varieties of dishes. The Orissa Review, a state government magazine, credits the 13th-century king Anangabhima Dev with establishing the temple's daily rituals. Reports of the number of clay hearths differ widely, so no count is given here.\n\nThe name Abadha is explained locally as a-badha, 'not served': the food is offered in the pot it was cooked in, without being portioned out. After being offered to Jagannath and then Goddess Bimala it is called Mahaprasad and is carried to Ananda Bazar, at the north-east corner of the outer enclosure, where pilgrims buy wet (Sankhudi) and dry (Sukhila) types daily. Kotha Bhoga, also called Raja Bhoga, goes to servitors as their share and is not sold.",
    "temples": [
      {
        "name": "Shree Jagannath Temple",
        "place": "Puri, Odisha",
        "note": "Mahaprasad is cooked in earthen pots on firewood in the temple kitchen, offered to Jagannath and Bimala, and sold daily at Ananda Bazar as wet (Sankhudi) and dry (Sukhila) prasad."
      }
    ],
    "sources": [
      "https://shreekhetra.com/mahaprasad.html",
      "https://business-standard.com/amp/article/news-ians/jagananth-temple-mahaprasad-700-cooks-50-000-mouths-rs-10-lakh-business-foodie-trail-puri-115072900377_1.html",
      "https://www.outlooktraveller.com/experiences/food-and-drink/puri-divine-feast",
      "https://magazines.odisha.gov.in/Orissareview/2009/June/engpdf/84-87.pdf",
      "https://en.wikipedia.org/wiki/Mahaprasad_",
      "https://en.wikipedia.org/wiki/Rosaghara",
      "https://www.freepressjournal.in/weekend/step-inside-puris-rosha-ghara-the-sacred-kitchen-feeding-thousands-daily"
    ]
  },
  "pitha": {
    "origin": "Pitha is the old family of rice-flour cakes of eastern India, and Bengal's writers noticed them early. A 15th-century poet, Bipradas Pipilai, mentions pithe, and Mukundaram Chakrabarti's Chandimangal speaks of sweet rice-flour cakes cooked in milk. In Bengal they are made for Poush Parbon, the Makar Sankranti harvest festival.\n\nIn Assam pitha is central to Bihu, and til pitha, made with sesame and jaggery, belongs to Bhogali Bihu. In Odisha pithas are part of the food offered to the deities at the Jagannath temple in Puri, where arisa and kakara are listed among the Dolayatra offerings. The exact age of each regional pitha is not documented.",
    "temples": [
      {
        "name": "Shri Jagannath Temple",
        "place": "Puri, Odisha",
        "note": "The temple's bhoga offerings include arisa and kakara at Dolayatra (February-March), along with other pithas such as suara pitha and poda pitha, according to the Orissa Review article on bhoga offerings."
      }
    ],
    "sources": [
      "https://magazines.odisha.gov.in/Orissareview/june2006/engpdf/14-15.pdf",
      "https://scroll.in/magazine/858633/",
      "https://deccanherald.com/specials/celebrating-the-flavours-of-festivity-with-pitha-1083076.html",
      "https://thefederal.com/amp/category/the-eighth-column/why-bihu-celebration-in-assam-is-incomplete-without-pitha-and-laru-166559",
      "https://etvbharat.com/en/!lifestyle/food-makar-sankranti-sweets-recipes-india-enn25011402059",
      "https://en.wikipedia.org/wiki/Pitha"
    ]
  },
  "charanamrit": {
    "origin": "Charanamrit (charanamrita) means \"nectar of the feet\": the water in which the feet of a guru or the image of a deity have been bathed, which the devotee drinks as a sign of humility and to receive grace. The term can also be used for any liquid that stands for the deity's grace.\n\nPractice differs by tradition. Sri Vaishnava teachers describe a theertham of water with tulsi, cloves and cardamom, taken three times at the temple or at home; another description of the Vishnu-temple version adds saffron and edible camphor (pachai karpooram). Pushtimarg writings describe a charanamrit of the soil of Vraj, Yamuna soil and the bath water of Shrinathji, while other writers describe milk, curd, honey, ghee, tulsi and Ganga water. A dated origin is not documented.",
    "sources": [
      "https://vishvasa.github.io/AgamaH/AryaH/hinduism/sAmya-vaiShamye/articles/lochtefeld_hinduism-encyclopedia/entries/C/Charanamrta",
      "https://chinnajeeyar.org/?p=59299",
      "https://hindupad.com/thulasi-theertham/",
      "https://archive.org/download/Pushtimarg/Charanamrutenglish.pdf",
      "https://www.rudraksha-ratna.com/articles/charanamrita",
      "https://wikiwand.com/en/Theertham"
    ]
  },
  "krishna-snacks": {
    "origin": "Krishna Janmashtami snacks follow the picture of the child Krishna of Gokul, a butter-and-curd thief who is a favourite subject of Bhagavata Purana paintings, such as a Punjab Hills folio of about 1780 at the Metropolitan Museum. In Tamil Nadu, tiny footprints of rice-flour paste are drawn from the entrance towards the puja room to welcome the baby god, and the offerings include uppu seedai, vella seedai and kai murukku.\n\nIn Udupi, the Sri Krishna Matha, said to have been established around 1238 CE by Madhvacharya, still prepares chakli (chakkuli) and laddus in lakhs as Janmashtami prasad, distributed on Vittal Pindi day. No dated origin for the snacks themselves is documented.",
    "temples": [
      {
        "name": "Sri Krishna Matha",
        "place": "Udupi, Karnataka",
        "note": "Chakli (chakkuli) and laddus are prepared in lakhs as prasad for Janmashtami and distributed on Vittal Pindi day; Deccan Chronicle and Deccan Herald report around 1 to 1.5 lakh chaklis each year. Kodubale and avalakki are not mentioned in these reports."
      }
    ],
    "sources": [
      "https://oteats.outlooktraveller.com/features/guides/here-are-the-culinary-rituals-associated-with-janmashtami-from-across-india",
      "https://www.deccanchronicle.com/southern-states/karnataka/laddus-chaklis-and-festive-fervour-grip-udupi-ahead-of-janmashtami-1984549",
      "https://www.deccanherald.com/temple-town-gears-krishna-690648.html",
      "https://udayavani.com/english-news/sri-krishna-matha-glorious-krishna-janmashtami-celebrations-in-udupi",
      "https://karnatakatourism.org/tour-item/udupi-sri-krishna-temple/",
      "https://metmuseum.org/art/collection/search/662776"
    ]
  },
  "ven-pongal": {
    "origin": "Ven pongal is a staple of Tamil temple kitchens: the Tamil Nadu tourism site lists \"Venn Pongal\" among common temple dishes, and Open magazine describes temple pongal as a khichdi of rice, moong dal and spices. A dated origin for the plain white version is not documented.\n\nThe best-told story is from Thirukkannapuram in Nagapattinam district. There, a butter pongal of rice, green gram and freshly melted butter is part of the Sowriraja Perumal temple's last offering of the day at 10 pm. Local tradition holds that Muniyodaran, a Chola-era tax official, gave tax collections to the temple to feed people during a famine, which angered the king, and that after his release he offered this pongal to the deity. In Karnataka the savoury version is called khara pongal, made with rice, moong dal, pepper, cumin, ginger and curry leaves and served with coconut chutney.",
    "temples": [
      {
        "name": "Sowriraja Perumal Temple",
        "place": "Thirukkannapuram, Tamil Nadu",
        "note": "A butter pongal of rice, green gram and melted butter is offered in the nightly ritual at about 10 pm, per Open magazine; this is a butter pongal, related to but not identical with the ven pongal here."
      }
    ],
    "sources": [
      "https://openthemagazine.com/special/a-divine-treat/",
      "https://www.tamilnadutourism.tn.gov.in/food/temple-cuisine",
      "https://karnatakatourism.org/experiences/pongal-khara-sakkarai-pongal",
      "https://www.ramanuja.org/sri/Srirangam/BriefHistory",
      "https://tamilculture.com/the-history-of-pongal-did-you-know-that-there-is-no-reference-to-pongal-in-ancient-tamil-text",
      "https://temple.dinamalar.com/en/new_en.php?id=464"
    ]
  },
  "sunthavda": {
    "origin": "Sunthavda appears in the Sai Satcharita, the account of Sai Baba of Shirdi written by the devotee Hemadpant. In the chapter on the first Rama Navami festival at Shirdi, held in the early 1910s, a devotee named Radhakrishnabai is to prepare sunthavada (written sunthwada in the Sansthan's English text), described as sweetmeats of ginger-powder mixed with sugar, for the celebration.\n\nThis is the earliest written mention found. Earlier history is not well documented, and recipes vary from household to household.",
    "temples": [
      {
        "name": "Sai Baba Temple (Shirdi Sansthan)",
        "place": "Shirdi, Maharashtra",
        "note": "The Sai Satcharita records sunthavada (ginger powder with sugar) prepared as sweet for the first Rama Navami celebration at Shirdi; current distribution at the temple is not confirmed here."
      }
    ],
    "sources": [
      "https://saibaba.org/satcharitra/sai6.html",
      "https://www.sai.org.in/sites/default/files/sai-samarth-charita-english-chapter6.pdf",
      "https://www.boldsky.com/yoga-spirituality/shirdi-sai-baba/2006/chapter-6-part-2.html"
    ]
  }
}

export const VARIANT_INFO: Record<string, VariantInfo> = {
  "kheer-payasam/north-sharad-purnima": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (a small bowl)",
      "kcal": 259,
      "carbs_g": 32.8,
      "protein_g": 8.3,
      "fat_g": 10.9,
      "sugar_g": 26.6
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds, pistachios or chironji)"
    ],
    "fasting": "Rice is a grain, so this is not suitable for Ekadashi or Navratri fasts as written. A kheer cooked the same way with samak (barnyard millet) rice or soaked sabudana is the usual vrat version; the milk, sugar, ghee, saffron, cardamom and nuts are all normally accepted.",
    "diabetic": "Roughly 27 g of sugar per bowl is a high load, so keep to a small portion and avoid pairing it with other sweets. More milk and nuts and less rice or sugar make it less sharply sweet; ask your own clinician about sweets in your plan."
  },
  "kheer-payasam/bengal-payesh": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (a small bowl)",
      "kcal": 230,
      "carbs_g": 29.6,
      "protein_g": 7.7,
      "fat_g": 9.2,
      "sugar_g": 22.7
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "Gobindobhog rice is a grain, so this does not suit grain-free fasts such as Ekadashi or Navratri as written. Samak rice can replace it for a vrat pudding, but the aromatic Gobindobhog character is lost; in Bengali homes payesh is more often offered in puja itself than made for a fast.",
    "diabetic": "About 23 g of sugar per serving, mostly from added sugar or gur; nolen gur is not lower in sugar than sugar. Keep to one small serving and have it after a meal rather than on an empty stomach."
  },
  "kheer-payasam/kerala-ada-pradhaman": {
    "nutrition": {
      "portion": "1 serving, one-eighth of the recipe (a small bowl)",
      "kcal": 423,
      "carbs_g": 52.3,
      "protein_g": 3.4,
      "fat_g": 23.7,
      "sugar_g": 35.5
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "Ada is made from rice, so it is not suitable for grain-free fasts, and I know of no ready substitute that gives the same pradhaman. It is a sadya and temple vazhipadu dish rather than a vrat food.",
    "diabetic": "This is the heaviest of the payasams here, with about 35 g of sugar mostly from jaggery plus coconut fat per bowl; jaggery raises blood sugar much like sugar does. Serve a very small bowl, and treat it as an occasional festival portion."
  },
  "kheer-payasam/tamil-paal-payasam": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (a small bowl)",
      "kcal": 233,
      "carbs_g": 33.4,
      "protein_g": 6.3,
      "fat_g": 8.6,
      "sugar_g": 26.4
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "Raw rice makes it unsuitable for grain-free fasts as written. For a vrat, paal payasam is commonly cooked with sabudana or samak rice instead, using the same slow milk method; edible camphor and cardamom are fine.",
    "diabetic": "About 26 g of sugar per serving; the long simmering concentrates the milk sugar as well. A smaller bowl is the practical lever; reducing the added sugar a little still works because the milk itself sweetens it."
  },
  "kheer-payasam/odisha-khiri": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (a small bowl)",
      "kcal": 205,
      "carbs_g": 28.0,
      "protein_g": 6.6,
      "fat_g": 7.7,
      "sugar_g": 20.7
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "The new-crop rice makes this a grain dish, so it is not suitable for fasts that exclude grains. It is cooked for Nuakhai and temple bhog rather than as a fasting food.",
    "diabetic": "This has the least added sugar of the kheers here, about 21 g per serving, though it is still a sweet. Keep to a small portion and avoid the extra sugar at the table."
  },
  "kheer-payasam/sujata-kheer": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (a small bowl)",
      "kcal": 156,
      "carbs_g": 20.7,
      "protein_g": 6.0,
      "fat_g": 5.6,
      "sugar_g": 14.4
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Rice makes it unsuitable for Ekadashi or Navratri fasts as written; samak rice cooked in milk with honey or jaggery is the usual way to adapt it. It is a Buddhist remembrance offering and not tied to a Hindu vrat.",
    "jain": "Jain households avoid honey, so use jaggery or sugar instead; the recipe already lists jaggery as an alternative.",
    "diabetic": "With about 14 g of sugar per bowl this is the lightest of the kheers here, but honey and jaggery still count as sugar. Take a small bowl and cool slightly before adding the sweetener so you can judge how much you need."
  },
  "laddu/north-boondi": {
    "nutrition": {
      "portion": "1 laddu, one-seventeenth of the recipe (about 20 g from the ingredient weights)",
      "kcal": 91,
      "carbs_g": 13.2,
      "protein_g": 1.6,
      "fat_g": 3.7,
      "sugar_g": 9.9
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "Besan is a ground pulse, so it is not suitable on Ekadashi or Navratri fasts where grains and pulses are avoided. It is prasad for Tuesdays and Saturdays; vrat laddus are a different recipe, made from rajgira or sabudana.",
    "diabetic": "Sugar syrup and fried besan make this calorie-dense, around 10 g of sugar per laddu at this size. One laddu, not two, and eaten after a meal; a pulse flour base slows absorption a little but does not make it a low-sugar sweet."
  },
  "laddu/tirupati": {
    "nutrition": {
      "portion": "1 laddu, one-eleventh of the recipe (about 35 g from the ingredient weights)",
      "kcal": 169,
      "carbs_g": 24.1,
      "protein_g": 2.6,
      "fat_g": 7.3,
      "sugar_g": 18.6
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "Besan makes this unsuitable on fasts that exclude grains and pulses, and no substitution reproduces the temple laddu. At Tirumala it is taken as prasad rather than as fasting food.",
    "diabetic": "A laddu at this size has about 19 g of sugar and a lot of ghee, so it is best shared. Take a small piece and avoid eating it on an empty stomach."
  },
  "aravana-payasam/kerala": {
    "nutrition": {
      "portion": "1 serving, one-eighth of the recipe (a small bowl)",
      "kcal": 359,
      "carbs_g": 59.6,
      "protein_g": 1.8,
      "fat_g": 13.0,
      "sugar_g": 43.1
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "It is built on cooked rice and a very large amount of jaggery, so it is not suitable for grain-free fasts. Pilgrims observing the 41-day vratham eat it as prasad, but I have not verified a fasting-day version.",
    "diabetic": "About 43 g of sugar per serving, mostly jaggery; this is a dense sweet meant to be eaten in very small amounts. A spoonful or two is the realistic portion, and not on its own."
  },
  "khaja/odisha-puri": {
    "nutrition": {
      "portion": "1 piece, one-twelfth of the recipe",
      "kcal": 265,
      "carbs_g": 34.5,
      "protein_g": 2.3,
      "fat_g": 13.5,
      "sugar_g": 17.5
    },
    "allergens": [
      "Gluten (wheat)",
      "Milk"
    ],
    "fasting": "Made from maida (refined wheat), so it is not suitable for fasts that exclude grains. It is a temple sweet and Mahaprasad, not a vrat food.",
    "diabetic": "Refined flour fried in ghee and soaked in sugar syrup, about 17 g of sugar a piece; one small piece is the practical limit. It is not a slow-release sweet, so do not combine it with other sweets."
  },
  "tahiri-akha/sindhi": {
    "nutrition": {
      "portion": "1 serving of sweet tahiri, one-seventh of the sweet recipe (a small bowl)",
      "kcal": 306,
      "carbs_g": 48.1,
      "protein_g": 3.2,
      "fat_g": 11.7,
      "sugar_g": 23.6
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds, cashews)"
    ],
    "fasting": "Basmati rice and regular salt are used, so this does not suit grain-free fasts as written; rock salt can replace the pinch of salt but the rice remains. I could not verify a samak-rice version of tahiri.",
    "jain": "The sweet tahiri fits as written. The savoury tahiri uses potato, carrot, ginger and (optionally) tomato, so a Jain household should swap potato and carrot for above-ground vegetables and omit ginger.",
    "diabetic": "Sweet tahiri combines white rice and added sugar, about 24 g of sugar per serving; a small portion is best. Using less sugar than the recipe suggests and adding more nuts relative to rice can soften the load."
  },
  "puran-poli/maharashtra": {
    "nutrition": {
      "portion": "1 poli (about 100 g)",
      "kcal": 342,
      "carbs_g": 56.5,
      "protein_g": 8.0,
      "fat_g": 9.4,
      "sugar_g": 22.1
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)"
    ],
    "fasting": "Not suitable for a vrat or Ekadashi fast: both the filling (chana dal) and the dough (maida and wheat) are grains and pulses. It is a festival food for Holi, Gudi Padwa and similar days rather than a fasting dish.",
    "diabetic": "Each poli carries roughly 22 g of sugar from jaggery plus refined flour, so a half poli is a sensible portion. Having it with a protein or vegetable-rich meal rather than alone may soften the glucose rise; jaggery is not a lower-sugar choice than sugar."
  },
  "puran-poli/karnataka-holige": {
    "nutrition": {
      "portion": "1 holige (about 90 g)",
      "kcal": 343,
      "carbs_g": 50.3,
      "protein_g": 7.2,
      "fat_g": 12.8,
      "sugar_g": 18.0
    },
    "allergens": [
      "Gluten (wheat)",
      "Milk",
      "Sesame"
    ],
    "fasting": "Not suitable for a fast: it uses chana dal, maida and rava (semolina), all grains or pulses. It belongs to Yugadi and Varamahalakshmi feasting rather than vrat days.",
    "diabetic": "One holige gives about 18 g of sugar from jaggery plus refined flour, so half a holige is a more modest portion. Serving it with a protein-rich meal and skipping extra ghee or sugar on top keeps the load lower."
  },
  "puran-poli/andhra-bobbatlu": {
    "nutrition": {
      "portion": "1 bobbattu (about 90 g)",
      "kcal": 334,
      "carbs_g": 47.0,
      "protein_g": 6.5,
      "fat_g": 13.4,
      "sugar_g": 17.7
    },
    "allergens": [
      "Gluten (wheat)",
      "Milk",
      "Sesame"
    ],
    "fasting": "Not suitable for a fast: chana dal, maida and rava are all grains or pulses. Ugadi and Varalakshmi Vratam are feast days, so it is usually offered as naivedyam and eaten afterwards, not during a strict fast.",
    "diabetic": "Each bobbattu has about 18 g of sugar from jaggery and a good amount of oil and ghee, so it is calorie-dense for its size. A half portion with a savoury meal is more reasonable than eating it on its own."
  },
  "puran-poli/gujarat-vedmi": {
    "nutrition": {
      "portion": "1 vedmi (about 110 g)",
      "kcal": 397,
      "carbs_g": 62.3,
      "protein_g": 9.4,
      "fat_g": 12.8,
      "sugar_g": 22.0
    },
    "allergens": [
      "Gluten (wheat)",
      "Milk"
    ],
    "fasting": "Not suitable for a fast: toor dal, wheat and maida are used. It is a festive offering rather than a vrat dish.",
    "diabetic": "Each vedmi has about 22 g of sugar and a fair amount of ghee, so a half portion is sensible. Replacing sugar with jaggery in the recipe does not reduce the sugar load; having it with plain dal or vegetables rather than alone helps blunt the rise."
  },
  "chhappan-bhog/braj-pushtimarg": {
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds, cashews, pistachios)",
      "Peanuts"
    ],
    "fasting": "Not suitable for a fast as a whole: the plan includes rice, wheat puris, dals, kadhi and many fried savouries. A small vrat-friendly bhog can be assembled only from fruit, milk sweets and makhan-mishri, and each dish then needs its own check.",
    "jain": "Drop the aloo sabzi, replace carrot halwa with doodhi or pumpkin halwa, and use dry ginger powder in place of fresh ginger. Check that the pickle, chutney and any bought sweets carry no root vegetables or onion.",
    "diabetic": "This is mostly sweets, fried items and refined flour, so a full plate is a very large sugar and fat load. Tasting a spoonful of two or three items and leaving the syrupy sweets for others is more practical than eating a full offering."
  },
  "chhappan-bhog/south-indian": {
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (cashews, optional)",
      "Peanuts"
    ],
    "fasting": "Not suitable for a fast as a whole: it is built on rice, dal, semolina and fried snacks. Only the fruit, plain milk-based items and tulsi-tambulam parts could belong to a vrat, and the sweets and snacks would need separate checking.",
    "jain": "Leave out fresh ginger and the root vegetables in the kootu, poriyal and sambar, and use dry ginger powder in the curd rice; prefer gourds, raw banana and beans. Check the sambar powder and tempering for anything beyond what your household uses.",
    "diabetic": "Several items are sweet and ghee-rich (kesari, laddu, payasam, Mysore pak), so keep to a small spoon of one or two. Choose the rasam, kootu, poriyal and curd rice for the main plate."
  },
  "panchamrit/north-maharashtra": {
    "nutrition": {
      "portion": "1 prasad spoonful, one-eleventh of the recipe (about 40 g)",
      "kcal": 49,
      "carbs_g": 6.2,
      "protein_g": 1.2,
      "fat_g": 2.3,
      "sugar_g": 5.9
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds, optional)"
    ],
    "fasting": "Suitable for most vrats such as Ekadashi, Mondays and Janmashtami: it has no grain, pulse or salt. Use makhana rather than nuts if your household's fast restricts them, and keep the tulsi for Vishnu or Krishna offerings.",
    "jain": "Honey is not used by many Jain households; leave it out and add a little extra mishri if needed. Milk, curd and ghee are fine.",
    "diabetic": "A spoonful has around 6 g of sugar, mostly from honey, mishri and milk, so the portion size is what matters. Using only a few spoonfuls and leaving out the extra raisins keeps it modest; honey does not lower the sugar impact compared with sugar."
  },
  "panchamrit/palani-tamil": {
    "nutrition": {
      "portion": "1 small cup, one-seventh of the recipe (about 85 g)",
      "kcal": 202,
      "carbs_g": 41.8,
      "protein_g": 0.9,
      "fat_g": 4.7,
      "sugar_g": 34.4
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Suitable for most fasts: it has no grain, pulse or salt, and Palani's own panchamirtham is a fruit-and-sugar preparation. Skip the optional dry ginger if your fast restricts it.",
    "jain": "Honey is avoided by many Jain households; leave it out and use a little extra jaggery or date. The rest fits as written.",
    "diabetic": "A small cup holds about 34 g of sugar from banana, dates, jaggery and honey, so it is a very concentrated sweet. A teaspoon or two as prasad is more practical than a full cup; mashing less jaggery and keeping to ripe-but-not-overripe bananas lowers it a little."
  },
  "dalma/odisha": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (about 175 g)",
      "kcal": 217,
      "carbs_g": 34.0,
      "protein_g": 8.6,
      "fat_g": 6.2,
      "sugar_g": 6.5
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Not suitable for a fast: it is built on toor and moong dal and uses ordinary salt, and the dal is not allowed on grain-free fasts. A vrat vegetable dish would be a different recipe, such as one of raw banana and pumpkin with rock salt.",
    "jain": "Replace the elephant-foot yam or sweet potato with more pumpkin, raw banana or papaya, and use dry ginger powder instead of fresh ginger, as Jain households avoid root vegetables. Check that hing is plain and from a source your household accepts.",
    "diabetic": "Dalma is lentil-based and vegetable-rich, with about 6 g of sugar per serving, so it is on the gentler end of this group. Going easy on the sugar or jaggery pinch and eating it with a vegetable side rather than a large amount of rice keeps the load lower."
  },
  "labra/bengal": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 165 g)",
      "kcal": 121,
      "carbs_g": 15.2,
      "protein_g": 2.1,
      "fat_g": 6.6,
      "sugar_g": 5.7
    },
    "allergens": [
      "Mustard",
      "Milk"
    ],
    "fasting": "Not suitable for a fast as written: the panch phoron includes mustard, fenugreek and other seeds, and the recipe uses cauliflower, radish and brinjal that many Ekadashi and Navratri fasts avoid. A simpler pumpkin, raw banana and potato dish with rock salt would suit a fast better.",
    "jain": "Leave out the potato and radish (root vegetables) and replace fresh ginger paste with dry ginger powder; use more pumpkin, beans and raw banana. Use ghee instead of mustard oil if you prefer.",
    "diabetic": "The recipe has about 6 g of sugar per serving and is mostly non-starchy vegetables, though the potato and raw banana add starch. Using less potato and no added sugar, and taking it with a small portion of khichuri or rice, lowers the load."
  },
  "ugadi-pachadi/andhra-telangana": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 60 g, 4 tbsp)",
      "kcal": 55,
      "carbs_g": 13.2,
      "protein_g": 0.3,
      "fat_g": 0.4,
      "sugar_g": 11.6
    },
    "fasting": "Ugadi is a feast day, not a fast, but Chaitra Navratri begins the same day, and this pachadi has no grains or pulses. For a vrat, use rock salt (sendha namak) and check whether your household accepts green chilli or pepper; the rest is fruit, jaggery and neem.",
    "diabetic": "Jaggery and tamarind make this mostly sugar (about 12 g per serving), so keep to the traditional small spoonful. Taking it with a meal rather than alone, and trimming the jaggery, lowers the glycaemic hit."
  },
  "ugadi-pachadi/karnataka": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 25 g, 1.5 tbsp)",
      "kcal": 74,
      "carbs_g": 15.7,
      "protein_g": 0.2,
      "fat_g": 1.3,
      "sugar_g": 13.9
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "No grains or pulses, so it suits Navratri or Ekadashi if the pinch of salt is rock salt. The ghee is fine for most vrat households; the optional pepper or chilli depends on your family's rule.",
    "diabetic": "This is the sweetest version, with about 100 g jaggery in the batch and roughly 14 g sugars per serving. Small spoonfuls, eaten after a meal, and using less jaggery are the practical ways to reduce the load."
  },
  "ugadi-pachadi/maharashtra-gudi-padwa": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (about 10 g, 2 tsp)",
      "kcal": 27,
      "carbs_g": 5.9,
      "protein_g": 0.2,
      "fat_g": 0.4,
      "sugar_g": 5.0
    },
    "fasting": "Grain- and pulse-free, so it can be eaten on a fast day with rock salt in place of the pinch of salt. Ajwain and cumin are accepted in many vrat households but not all, so omit them if your family avoids them.",
    "diabetic": "A serving is only about 10 g and holds roughly 5 g sugars, so the portion keeps the load small. Adding the raw mango and coconut rather than extra jaggery helps keep the sweetness down."
  },
  "ugadi-pachadi/tamil-nadu-puthandu": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 55 g, 3-4 tbsp)",
      "kcal": 74,
      "carbs_g": 16.8,
      "protein_g": 0.3,
      "fat_g": 0.8,
      "sugar_g": 14.9
    },
    "allergens": [
      "Milk",
      "Mustard",
      "Sesame"
    ],
    "fasting": "No grains or pulses, so it can work for Navratri or Ekadashi if you use rock salt and skip the mustard and asafoetida tempering, which many fasting households avoid. Use ghee for tempering rather than sesame oil if you want to stay closest to common vrat practice.",
    "diabetic": "Cooked mango plus 100 g jaggery gives about 15 g sugars per serving. Halving the jaggery and keeping to a small cupful or less, taken with a meal, reduces the sugar load."
  },
  "kanya-pujan/up-delhi": {
    "nutrition": {
      "portion": "1 guest plate: 2 puri, 1 small bowl of sooji halwa and 1 small bowl of chana (one-tenth of the halwa and chana batches)",
      "kcal": 591,
      "carbs_g": 65.7,
      "protein_g": 11.3,
      "fat_g": 32.1,
      "sugar_g": 17.7
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds)"
    ],
    "fasting": "Not suitable for a Navratri fast: the puri use wheat, the halwa uses sooji and the chana is a pulse. This is the meal served after the fast is broken; households keeping a strict vrat usually swap to kuttu or singhara puri with a potato curry, since chana has no true vrat substitute.",
    "jain": "Leave out the fresh ginger (a root); hing, cumin and amchur still give the chana its savoury note.",
    "diabetic": "This plate is a heavy, mixed meal at nearly 600 kcal, with ghee and sugar in the halwa the main load. A smaller portion of halwa, one puri instead of two, and eating the chana first slow the glucose rise."
  },
  "kanya-pujan/punjab-himachal": {
    "nutrition": {
      "portion": "1 guest plate: 2 puri, 1 small bowl of atta halwa and 1 small bowl of chana (one-tenth of the halwa and chana batches)",
      "kcal": 579,
      "carbs_g": 60.5,
      "protein_g": 10.5,
      "fat_g": 33.5,
      "sugar_g": 17.6
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds)"
    ],
    "fasting": "Not suitable for a Navratri fast, since the puri and halwa are wheat and the chana is a pulse; it is served to break the fast after Ashtami puja. For a strict vrat, kuttu or singhara atta halwa and puri are the usual swaps, while the kala namak in the chana is skipped if your household avoids it.",
    "jain": "Leave out the fresh ginger; use extra amchur and anardana for tang.",
    "diabetic": "The ghee-rich karah halwa and puri bring the plate to nearly 600 kcal. Taking a smaller bowl of halwa, one puri, and the chana first, and using less sugar, lowers the glycaemic hit."
  },
  "panjiri/braj-dhaniya": {
    "nutrition": {
      "portion": "1 serving, two tablespoons (about 20 g), one-eighteenth of the recipe",
      "kcal": 95,
      "carbs_g": 10.4,
      "protein_g": 1.3,
      "fat_g": 6.4,
      "sugar_g": 5.8
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds, cashews)"
    ],
    "fasting": "Grain-free and salt-free, so it fits Janmashtami and Ekadashi fasts as written, which is why dhaniya panjiri is the usual midnight offering. Makhana and nuts are generally accepted; check whether your household allows gond.",
    "diabetic": "Each spoonful is mostly ghee and nuts with about 6 g sugars, so the load is modest at the stated portion. Keeping to two tablespoons and reducing the powdered sugar are the practical steps; do not treat it as free food."
  },
  "panjiri/punjab-atta": {
    "nutrition": {
      "portion": "1 serving, about three tablespoons (about 30 g), one-fourteenth of the recipe",
      "kcal": 157,
      "carbs_g": 15.9,
      "protein_g": 2.0,
      "fat_g": 9.7,
      "sugar_g": 6.7
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds, cashews, pistachios)"
    ],
    "fasting": "Not suitable for a grain-free fast because the base is wheat flour. Roasted singhara or kuttu flour is a common vrat substitution, but the texture and sweetness change, so treat it as a different recipe.",
    "jain": "Dry ginger (sonth) is accepted in some Jain households and avoided in others, so omit it if your family avoids ginger in any form.",
    "diabetic": "Wheat flour, gond and sugar together give about 16 g carbohydrate per serving, with around 7 g sugars. A smaller spoonful, less sugar and eating it with a meal are the practical ways to lower the glycaemic hit; it is also calorie-dense because of the ghee."
  },
  "diwali-faral/maharashtra": {
    "nutrition": {
      "portion": "1 faral plate, one-eleventh of the recipe: about 1 besan ladoo (45 g), a handful of chivda and 2-3 chakli (about 100 g in all)",
      "kcal": 518,
      "carbs_g": 48.8,
      "protein_g": 10.4,
      "fat_g": 32.2,
      "sugar_g": 11.9
    },
    "allergens": [
      "Peanuts",
      "Sesame",
      "Mustard",
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds, cashews)"
    ],
    "fasting": "Not suitable for a fast. Poha is rice, besan and chana dal are pulses, bhajani flour is multi-grain, and the chivda and chakli carry regular salt, mustard and hing.",
    "diabetic": "A full plate is about 500 kcal, with fried chakli, chivda oil and ladoo ghee carrying most of it. Taking one small ladoo or a few pieces of chivda rather than the whole plate, and avoiding extra sugar, is the realistic way to lower the glycaemic hit."
  },
  "lohri-til-rewari/punjab": {
    "nutrition": {
      "portion": "1 share, one-twentieth of the whole recipe: roughly 1 rewari, 1 piece of gajak and a small handful of popcorn, peanut and makhana mix (about 35 g in all)",
      "kcal": 178,
      "carbs_g": 20.1,
      "protein_g": 3.9,
      "fat_g": 10.1,
      "sugar_g": 14.2
    },
    "allergens": [
      "Sesame",
      "Peanuts",
      "Milk"
    ],
    "fasting": "Lohri is not a fast. As written, the rewari and gajak have no grains, pulses or salt, so they suit most fasts that allow sesame and jaggery. The popcorn is maize and is left out of strict grain-free fasts; makhana and peanuts are accepted in many but not all households.",
    "diabetic": "These are almost entirely sugar, jaggery and oily sesame, with about 14 g sugars per share. One small piece of gajak is enough; the sesame's fat and fibre slow absorption a little, but it is still a concentrated sweet."
  },
  "gujiya/braj-up": {
    "nutrition": {
      "portion": "1 gujiya (about 50 g)",
      "kcal": 227,
      "carbs_g": 20.7,
      "protein_g": 4.2,
      "fat_g": 14.3,
      "sugar_g": 7.7
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds, cashews)"
    ],
    "fasting": "Not suitable for a vrat: the shell is maida and the dish is a fried flour sweet. It is a festive sweet for Holi, not a fasting food.",
    "diabetic": "Each piece carries refined flour, khoya and added sugar plus absorbed frying ghee, so it is calorie-dense for its size. Keeping to a single small piece, eating it after a meal rather than alone, and pairing with a walk or plain protein can soften the glucose rise; sugar in the filling can be reduced."
  },
  "gujiya/bihar-pedakiya": {
    "nutrition": {
      "portion": "1 pedakiya (about 45 g)",
      "kcal": 202,
      "carbs_g": 20.3,
      "protein_g": 3.8,
      "fat_g": 11.9,
      "sugar_g": 6.4
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds, cashews)"
    ],
    "fasting": "Not suitable for a fast, since both the shell and the filling use wheat (maida and suji). It is an offering and festival sweet, not vrat food.",
    "diabetic": "Maida and semolina digest quickly and the filling adds sugar, so portion size matters most; one piece is a sensible limit. Reducing the powdered sugar and eating it alongside a meal with vegetables or protein can lower the glycaemic hit."
  },
  "gujiya/maharashtra-karanji": {
    "nutrition": {
      "portion": "1 karanji (about 45 g)",
      "kcal": 187,
      "carbs_g": 22.4,
      "protein_g": 2.6,
      "fat_g": 10.1,
      "sugar_g": 9.1
    },
    "allergens": [
      "Gluten (wheat)",
      "Tree nuts (almonds, cashews)",
      "Milk"
    ],
    "fasting": "Not suitable for a fast: rava and maida form the shell. It is a Diwali faral and Ganesh Chaturthi sweet, not vrat food.",
    "diabetic": "Fresh coconut adds fibre and fat, which slows absorption a little, but the sugar or jaggery filling and the refined-flour shell still add up; jaggery is not meaningfully lower in sugar. One small piece, less sweetener in the filling and eating it with a meal are practical ways to limit the load. Milk appears only in the optional dough liquid; use water for a dairy-free shell."
  },
  "puliyodarai/tamil-nadu": {
    "nutrition": {
      "portion": "1 serving, one-fifth of the recipe (about 105 g)",
      "kcal": 320,
      "carbs_g": 43.2,
      "protein_g": 6.3,
      "fat_g": 14.8,
      "sugar_g": 10.3
    },
    "allergens": [
      "Peanuts",
      "Sesame",
      "Mustard"
    ],
    "fasting": "Not suitable for a standard Ekadashi or Navratri fast as written, because it uses rice, chana and urad dal, mustard and regular salt. It is usually offered and eaten as prasadam after the fast, or on non-fasting festival days.",
    "diabetic": "Mostly white rice with tamarind, jaggery and oil, so the starch load is high for the portion. A smaller serving, extra vegetables or curd on the side, and cutting the jaggery can help; the peanuts and oil slow absorption only slightly."
  },
  "puliyodarai/andhra-pulihora": {
    "nutrition": {
      "portion": "1 serving, one-fifth of the recipe (about 100 g)",
      "kcal": 287,
      "carbs_g": 37.0,
      "protein_g": 5.2,
      "fat_g": 13.8,
      "sugar_g": 7.8
    },
    "allergens": [
      "Peanuts",
      "Mustard",
      "Sesame"
    ],
    "fasting": "Not suitable as written for an Ekadashi or Navratri fast: it uses rice, dals, mustard and regular salt. Samak (barnyard millet) rice is sometimes used for fasting tamarind rice, but the dals, mustard and curry-leaf tempering would still need to change, so it is a different dish.",
    "jain": "Ginger is a root and is left out in Jain households, and hing must be checked for sourcing; extra green chilli or black pepper can replace the ginger's bite.",
    "diabetic": "The rice dominates the carbohydrate, and jaggery here is only a teaspoon, so the main lever is portion size. Cooling the rice before mixing, adding a side of vegetables or curd, and taking a smaller serving can lower the glycaemic effect."
  },
  "puliyodarai/karnataka-puliyogare": {
    "nutrition": {
      "portion": "1 serving, one-fifth of the recipe (about 105 g)",
      "kcal": 307,
      "carbs_g": 41.8,
      "protein_g": 6.0,
      "fat_g": 14.0,
      "sugar_g": 10.4
    },
    "allergens": [
      "Peanuts",
      "Sesame",
      "Mustard"
    ],
    "fasting": "Not suitable for a fast as written: rice, chana and urad dal, mustard and regular salt are used. It is better kept as a prasadam to eat after a vrat.",
    "diabetic": "The jaggery and dry coconut add a little sugar and fat on top of the rice, so one serving is a sensible limit. Reducing the jaggery, using less rice per portion and adding vegetables or curd on the side can reduce the spike."
  },
  "pinda/north-gaya": {
    "nutrition": {
      "portion": "1 pinda (about 40 g); the rite uses it as an offering",
      "kcal": 94,
      "carbs_g": 12.0,
      "protein_g": 1.2,
      "fat_g": 4.8,
      "sugar_g": 4.5
    },
    "allergens": [
      "Milk",
      "Sesame"
    ],
    "fasting": "A pinda is a ritual offering, not food for a fast, so vrat substitutions do not apply. Whether the person performing the rite fasts first varies by family and priest.",
    "diabetic": "Pindas are normally offered, not eaten; if the rice is later shared, one small ball has modest carbohydrate with some honey. Leaving out the honey or sharing the portion are simple ways to cut sugar."
  },
  "pinda/south-tamil": {
    "nutrition": {
      "portion": "1 pinda (about 40 g, excluding the shraddha meal)",
      "kcal": 101,
      "carbs_g": 10.1,
      "protein_g": 1.4,
      "fat_g": 6.2,
      "sugar_g": 0.0
    },
    "allergens": [
      "Milk",
      "Sesame"
    ],
    "fasting": "A pinda is a ritual offering and the shraddha meal is eaten after the rite, so this is not a vrat dish and fasting substitutions do not apply.",
    "diabetic": "The pinda itself has no added sugar and little carbohydrate per ball; the rest of the shraddha meal (rice, vada, jaggery payasam) is where the load lies. Smaller helpings of rice and payasam and extra vegetable sides help."
  },
  "ghewar/rajasthan": {
    "nutrition": {
      "portion": "1 small ghewar with rabri (one-sixth of the recipe, about 110 g)",
      "kcal": 426,
      "carbs_g": 45.8,
      "protein_g": 6.5,
      "fat_g": 24.9,
      "sugar_g": 29.9
    },
    "allergens": [
      "Gluten (wheat)",
      "Milk",
      "Tree nuts (pistachios, almonds)"
    ],
    "fasting": "Not suitable for a vrat: the base is maida and it is syrup-soaked and topped with rabri. It is a festive sweet shared after the day's observances.",
    "diabetic": "One of the heaviest items in this group: refined flour, a sugar-syrup soak, absorbed ghee and sweet rabri in one piece. A small slice shared among several people, or the plain unsoaked disc without syrup, reduces the load; it is best eaten after a balanced meal rather than alone."
  },
  "makhan-mishri/braj": {
    "nutrition": {
      "portion": "1 serving (about 14 g butter with about 5 g mishri, 19 g)",
      "kcal": 120,
      "carbs_g": 5.0,
      "protein_g": 0.1,
      "fat_g": 11.4,
      "sugar_g": 5.0
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Suits Ekadashi, Janmashtami and Monday fasts well as it has no grain, pulse or salt; use unsalted butter, which the recipe already specifies. Mishri is generally accepted in vrat food.",
    "diabetic": "Mostly fat with a little sugar; a small serving gives few carbohydrates but is high in saturated fat for its size. Using only a pinch of mishri and keeping to a spoonful keeps the sugar low."
  },
  "halwa-sheera/sikh-kada-prasad": {
    "nutrition": {
      "portion": "1 handful of prasad (about 50 g), one-fifteenth of the recipe",
      "kcal": 132,
      "carbs_g": 13.6,
      "protein_g": 0.8,
      "fat_g": 8.1,
      "sugar_g": 8.0
    },
    "allergens": [
      "Gluten (wheat)"
    ],
    "fasting": "Wheat is a grain, so kada prasad is not suitable for Ekadashi or Navratri fasts that avoid grains. In a gurdwara it is simply received as sacrament and is not tied to a vrat.",
    "diabetic": "One 50 g handful carries about 8 g of sugar and a lot of ghee, so a small handful is the practical portion. Eating it after a meal rather than on an empty stomach slows the sugar rise."
  },
  "halwa-sheera/maharashtra-gujarat-sheera": {
    "nutrition": {
      "portion": "1 serving, one-ninth of the recipe (about 2/3 cup)",
      "kcal": 514,
      "carbs_g": 51.1,
      "protein_g": 4.1,
      "fat_g": 33.0,
      "sugar_g": 32.4
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (cashews)"
    ],
    "fasting": "Semolina is wheat, so this sheera is not suitable for Ekadashi or Navratri. A vrat sheera is usually made with rajgira or singhara flour instead, which is a different recipe.",
    "diabetic": "The sava measure makes this rich, with about 32 g of sugar per serving. A smaller portion, or the lighter ghee and sugar amounts the recipe itself allows, lowers the load; a ripe banana already adds sweetness."
  },
  "halwa-sheera/andhra-annavaram": {
    "nutrition": {
      "portion": "1 serving, one-eighth of the recipe (about 1/2 cup)",
      "kcal": 299,
      "carbs_g": 36.7,
      "protein_g": 3.5,
      "fat_g": 16.0,
      "sugar_g": 20.4
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (cashews)"
    ],
    "fasting": "Cracked wheat is a grain, so this prasadam is not suitable for Ekadashi or Navratri fasts that avoid grains.",
    "diabetic": "Broken wheat keeps more fibre than fine semolina, but with about 20 g of sugar per serving a small portion is still sensible. Using jaggery does not meaningfully reduce the sugar load."
  },
  "sweet-pongal/tamil-sakkarai": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 3/4 cup)",
      "kcal": 291,
      "carbs_g": 41.1,
      "protein_g": 6.2,
      "fat_g": 11.8,
      "sugar_g": 24.3
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "Rice and moong dal are a grain and a pulse, so this is not suitable for Ekadashi or Navratri fasts that avoid both. It belongs to the Thai Pongal feast rather than a fast.",
    "diabetic": "About 24 g of sugar per serving, mostly from jaggery, which acts much like sugar in the body. A small portion, with the moong dal and milk already slowing digestion a little, is the practical approach."
  },
  "sweet-pongal/andhra-chakkera": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 3/4 cup)",
      "kcal": 309,
      "carbs_g": 47.7,
      "protein_g": 4.7,
      "fat_g": 11.4,
      "sugar_g": 28.0
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "It uses rice and moong dal, so it is not suitable for Ekadashi or Navratri fasts that avoid grains and pulses.",
    "diabetic": "With about 28 g of sugar per serving this is the sweetest of the three; the recipe's own option of 3/4 cup jaggery and a small portion both help."
  },
  "sweet-pongal/karnataka-sihi": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (about 3/4 cup)",
      "kcal": 309,
      "carbs_g": 51.5,
      "protein_g": 5.1,
      "fat_g": 9.4,
      "sugar_g": 23.6
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "Rice and moong dal make it unsuitable for Ekadashi or Navratri fasts that avoid grains and pulses.",
    "diabetic": "It is the highest in carbohydrate of the three (about 52 g per serving) because of the larger rice share. Keep the portion small and pair it with a protein-rich meal rather than eating it alone."
  },
  "sev-ravo/parsi-sev": {
    "nutrition": {
      "portion": "1 serving, one-fifth of the recipe (about 3/4 cup)",
      "kcal": 248,
      "carbs_g": 31.8,
      "protein_g": 5.9,
      "fat_g": 11.2,
      "sugar_g": 19.5
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds, pistachios)"
    ],
    "fasting": "Vermicelli is wheat, so sev is not suitable for Ekadashi or Navratri. It belongs to Navroz rather than a vrat.",
    "diabetic": "About 20 g of sugar per serving. Vermicelli cooked in milk raises blood sugar fairly quickly, so a smaller portion and reduced sugar (the recipe says it can be adjusted) help."
  },
  "sev-ravo/parsi-ravo": {
    "nutrition": {
      "portion": "1 serving, one-fifth of the recipe (about 3/4 cup)",
      "kcal": 282,
      "carbs_g": 40.6,
      "protein_g": 5.8,
      "fat_g": 11.2,
      "sugar_g": 27.3
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Tree nuts (almonds)",
      "Egg"
    ],
    "fasting": "Semolina is wheat, so ravo is not suitable for Ekadashi or Navratri. The optional egg also rules it out for any vrat.",
    "jain": "It fits a Jain household once the optional egg is omitted, which the recipe already allows.",
    "diabetic": "About 27 g of sugar per serving, so the recipe's suggested reduction to 1/3 cup sugar helps. Serve a small portion, not on an empty stomach."
  },
  "gopalkala/maharashtra": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 1/2 cup)",
      "kcal": 106,
      "carbs_g": 13.4,
      "protein_g": 3.5,
      "fat_g": 4.5,
      "sugar_g": 4.3
    },
    "allergens": [
      "Milk",
      "Peanuts"
    ],
    "fasting": "Poha is flattened rice, so it is not used in Ekadashi or Navratri fasts that avoid grains. Gopalkala is traditionally made after Janmashtami, on the day of Dahi Handi.",
    "jain": "Leave out the grated ginger (a root); the rest of the recipe fits as written.",
    "diabetic": "Fairly low in sugar (about 4 g per serving), but poha digests quickly. Cucumber, curd and peanuts slow it down; a small portion with these is the practical approach."
  },
  "narali-bhat/maharashtra-konkan": {
    "nutrition": {
      "portion": "1 serving, one-fifth of the recipe (about 1 cup)",
      "kcal": 394,
      "carbs_g": 65.4,
      "protein_g": 4.2,
      "fat_g": 13.4,
      "sugar_g": 28.0
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "It is a rice dish, so it is not suitable for Ekadashi or Navratri fasts that avoid grains.",
    "diabetic": "This is the heaviest dish in carbohydrate here (about 65 g per serving, 28 g of it sugar). A half portion is more sensible; the coconut and ghee slow it slightly but do not offset the jaggery."
  },
  "khichdi-bhog/bengal-bhoger-khichuri": {
    "nutrition": {
      "portion": "1 serving, one-seventh of the recipe (about 280 g cooked)",
      "kcal": 282,
      "carbs_g": 39.7,
      "protein_g": 7.2,
      "fat_g": 11.0,
      "sugar_g": 2.5
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Rice and moong dal are the base, so this is not suitable for a fast that avoids grains and pulses, such as Ekadashi or Navratri fasts. Swapping in samak rice or sabudana would make a different dish rather than this khichdi.",
    "jain": "Potato and fresh ginger paste are root vegetables, and many Jain households also avoid cauliflower; leave out the potato and ginger (dry ginger powder is a common substitute) and use gourds or beans instead.",
    "diabetic": "Rice makes this a mostly starchy dish with little added sugar, so the main lever is portion size and what it is served with. Keeping to a smaller serving, adding more vegetables and pairing it with curd or a vegetable side can soften the glycaemic effect. The recipe has only about 1 tsp of sugar in total, so the carbohydrate is almost all from rice and dal."
  },
  "khichdi-bhog/odisha-khechudi": {
    "nutrition": {
      "portion": "1 serving, one-sixth of the recipe (about 225 g cooked)",
      "kcal": 233,
      "carbs_g": 36.8,
      "protein_g": 6.4,
      "fat_g": 6.8,
      "sugar_g": 0.7
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Rice and moong dal are the base, so this is not suitable for a fast that avoids grains and pulses, such as Ekadashi or Navratri fasts. Swapping in samak rice or sabudana would make a different dish rather than this khichdi.",
    "jain": "Fresh ginger is a root; use a little dry ginger powder or omit it for a Jain household.",
    "diabetic": "Rice makes this a mostly starchy dish with little added sugar, so the main lever is portion size and what it is served with. Keeping to a smaller serving, adding more vegetables and pairing it with curd or a vegetable side can soften the glycaemic effect. This is the plainest of the three versions, with almost no added sugar."
  },
  "khichdi-bhog/maharashtra-datta": {
    "nutrition": {
      "portion": "1 serving, one-fifth of the recipe (about 240 g cooked)",
      "kcal": 278,
      "carbs_g": 44.0,
      "protein_g": 7.6,
      "fat_g": 8.1,
      "sugar_g": 0.7
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Rice and moong dal are the base, so this is not suitable for a fast that avoids grains and pulses, such as Ekadashi or Navratri fasts. Swapping in samak rice or sabudana would make a different dish rather than this khichdi.",
    "jain": "The optional grated ginger is a root; replace it with a pinch of dry ginger powder or omit it. Otherwise the recipe fits as written.",
    "diabetic": "Rice makes this a mostly starchy dish with little added sugar, so the main lever is portion size and what it is served with. Keeping to a smaller serving, adding more vegetables and pairing it with curd or a vegetable side can soften the glycaemic effect. Because it serves only five, each portion is larger than in the other versions, so a smaller helping is worth considering."
  },
  "tilgul/maharashtra-ladoo": {
    "nutrition": {
      "portion": "1 ladoo (about 25 g)",
      "kcal": 118,
      "carbs_g": 14.5,
      "protein_g": 2.2,
      "fat_g": 6.3,
      "sugar_g": 10.5
    },
    "allergens": [
      "Sesame",
      "Peanuts",
      "Milk"
    ],
    "fasting": "It contains no grains, pulses or salt, so it is commonly eaten on fasting days; groundnuts are accepted in many fasts but check your family's custom.",
    "diabetic": "Jaggery is the main carbohydrate, so each ladoo carries roughly 10 g of sugar despite the sesame and peanuts. One small ladoo eaten after a meal, not on its own, is a more measured way to enjoy it."
  },
  "tilgul/gujarat-chikki": {
    "nutrition": {
      "portion": "1 piece (about 15 g)",
      "kcal": 74,
      "carbs_g": 9.1,
      "protein_g": 1.4,
      "fat_g": 4.0,
      "sugar_g": 6.4
    },
    "allergens": [
      "Sesame",
      "Milk"
    ],
    "fasting": "It has no grains, pulses or salt, only sesame and jaggery, so it suits most fasts; confirm your household accepts jaggery on the day.",
    "diabetic": "Almost half of each piece is sugar from jaggery, and chikki is easy to eat several pieces of at once. Keep to one piece and have it with a meal rather than alone."
  },
  "tilgul/karnataka-ellu-bella": {
    "nutrition": {
      "portion": "1 serving, about 1/4 cup (about 35 g)",
      "kcal": 174,
      "carbs_g": 17.4,
      "protein_g": 4.6,
      "fat_g": 10.6,
      "sugar_g": 9.4
    },
    "allergens": [
      "Sesame",
      "Peanuts"
    ],
    "fasting": "Fried gram is a pulse, so this is not suitable for a fast that avoids pulses; for such a day, leave it out and use more peanuts and coconut.",
    "diabetic": "The dry jaggery cubes are the sugar source, about 9 g per serving, and the nuts, sesame and fried gram add fat and fibre that slow absorption somewhat. Eat the jaggery cubes in small numbers and skip the sugar-candy figurines."
  },
  "sundal/tamil-nadu": {
    "nutrition": {
      "portion": "1 small cup, one-seventh of the recipe (about 75 g cooked)",
      "kcal": 159,
      "carbs_g": 19.3,
      "protein_g": 6.3,
      "fat_g": 6.7,
      "sugar_g": 3.4
    },
    "allergens": [
      "Mustard",
      "Sesame"
    ],
    "fasting": "Chickpeas are a pulse, so this is not suitable for a fast that avoids pulses, such as Ekadashi. It is typically made as the Navratri golu offering shared with guests rather than as fasting food.",
    "diabetic": "It has no added sugar and its chickpea protein and fibre make it one of the gentler festival snacks, but the carbohydrate from chickpeas still counts. Keep to the small cup and go easy on the coconut and oil."
  },
  "sundal/andhra-guggillu": {
    "nutrition": {
      "portion": "1 small cup, one-seventh of the recipe (about 75 g cooked)",
      "kcal": 160,
      "carbs_g": 19.9,
      "protein_g": 6.4,
      "fat_g": 6.6,
      "sugar_g": 3.4
    },
    "allergens": [
      "Mustard",
      "Peanuts",
      "Milk"
    ],
    "fasting": "Chickpeas are a pulse, so this is not suitable for a fast that avoids pulses or grains. It is usually made as an offering to be shared, not as fasting food.",
    "jain": "Fresh ginger is a root; omit it or use a pinch of dry ginger powder for a Jain household.",
    "diabetic": "There is no added sugar, and the chickpeas supply protein and fibre, but they are still starchy. A small cup is a reasonable portion, with oil and coconut kept modest."
  },
  "karthigai-pori/tamil-nadu": {
    "nutrition": {
      "portion": "1 urundai (about 26 g)",
      "kcal": 101,
      "carbs_g": 21.5,
      "protein_g": 1.0,
      "fat_g": 1.3,
      "sugar_g": 13.0
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Puffed rice is a grain, so this is not suitable for a fast that avoids grains; it is usually made for the festival evening offering rather than for fasting days.",
    "diabetic": "Over half of each urundai's weight is jaggery, giving about 13 g of sugar in a small ball. Having one, with the roasted gram and coconut doing a little to slow absorption, is a better choice than several."
  },
  "narkel-naru-sandesh/bengal": {
    "nutrition": {
      "portion": "1 narkel naru (about 28 g) plus 1 sandesh (about 19 g), about 47 g together",
      "kcal": 150,
      "carbs_g": 17.4,
      "protein_g": 2.8,
      "fat_g": 8.3,
      "sugar_g": 14.3
    },
    "allergens": [
      "Milk",
      "Tree nuts (pistachio)"
    ],
    "fasting": "Neither sweet contains grains, pulses or salt: naru is coconut and jaggery, sandesh is milk, sugar and pistachio, and milk sweets are accepted in most fasts. Check that your household accepts jaggery and sugar on the day.",
    "diabetic": "Mostly the naru's jaggery (about 12 g sugar) drives the sugar load; the sandesh is lighter in sugar if made with little added sweetener. One naru or one sandesh, not both, is a more measured portion."
  },
  "modak/maharashtra": {
    "nutrition": {
      "portion": "1 modak (about 50 g), one-eleventh of the recipe",
      "kcal": 154,
      "carbs_g": 25.4,
      "protein_g": 1.3,
      "fat_g": 5.4,
      "sugar_g": 12.1
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Made with rice flour, so it is not suitable for Ekadashi or Navratri fasts that exclude grains, and ordinary salt is used. A samak (barnyard millet) flour shell is sometimes tried by families, but the dough handles differently and is not the traditional modak.",
    "diabetic": "Roughly 12 g of sugar per modak, mostly from jaggery, which acts much like sugar in the body. One modak is a sensible portion; eating it after a meal rather than alone, and using less jaggery, lowers the sugar load."
  },
  "modak/tamil-karnataka": {
    "nutrition": {
      "portion": "1 kozhukattai (about 45 g), one-thirteenth of the recipe",
      "kcal": 125,
      "carbs_g": 23.3,
      "protein_g": 1.7,
      "fat_g": 2.8,
      "sugar_g": 10.2
    },
    "allergens": [
      "Milk",
      "Sesame"
    ],
    "fasting": "Uses rice flour and chana dal (a pulse), so it does not fit fasts that exclude grains and pulses such as Ekadashi or Navratri. There is no workable vrat substitute for this particular dumpling.",
    "diabetic": "About 10 g of sugar per piece, mostly from jaggery. The chana dal adds a little protein and fibre, which helps slightly, but one piece is a sensible portion; a smaller amount of jaggery in the filling lowers the load."
  },
  "modak/goa-konkan": {
    "nutrition": {
      "portion": "1 patoli (about 55 g), one-eleventh of the recipe",
      "kcal": 142,
      "carbs_g": 27.7,
      "protein_g": 1.5,
      "fat_g": 2.8,
      "sugar_g": 12.1
    },
    "fasting": "Made from rice batter, so it is not suitable for Ekadashi, Navratri or other fasts that exclude grains; it also uses ordinary salt. There is no honest vrat substitute for the rice batter.",
    "diabetic": "About 12 g of sugar per piece from the jaggery filling, on top of starchy rice batter. Keep to one piece and have it with a meal; using less jaggery or more fresh coconut in the filling reduces the sugar a little."
  },
  "annakut/nathdwara-rajasthan": {
    "nutrition": {
      "portion": "1 plate, one-tenth of the whole spread (about 700 g: rice, sabzi, kadhi and bajra khichdi)",
      "kcal": 554,
      "carbs_g": 92.3,
      "protein_g": 13.9,
      "fat_g": 14.1,
      "sugar_g": 5.3
    },
    "allergens": [
      "Milk",
      "Mustard"
    ],
    "fasting": "This is a grain, pulse and gram-flour spread (rice, bajra, moong, besan), so it is not a vrat dish; Annakut is itself a feast day, not a fast. It is not suitable for Ekadashi or Navratri.",
    "jain": "Potato, sweet potato, suran (yam), carrot and the ginger paste are root vegetables, so a Jain household would use only above-ground vegetables such as raw banana, beans, pumpkin and peas and leave out ginger. Some Jain families also avoid brinjal.",
    "diabetic": "A full plate is high in starch (about 90 g of carbohydrate) though low in added sugar. Making half the plate vegetables and kadhi, taking a smaller rice portion, and using the bajra and moong khichdi in place of some rice slows the glucose rise."
  },
  "annakut/braj-govardhan": {
    "nutrition": {
      "portion": "1 serving of the sabzi only, one-ninth of the dish (about 80 g of raw vegetables with its oil)",
      "kcal": 97,
      "carbs_g": 13.0,
      "protein_g": 1.4,
      "fat_g": 4.7,
      "sugar_g": 2.2
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)",
      "Mustard"
    ],
    "fasting": "Not a vrat dish: it is a feast served with rice, wheat puris, kadhi and sweets, and uses regular salt and many spices. Govardhan Puja is a feast day rather than a fasting day.",
    "jain": "The recipe depends on potato, radish, turnip and carrot, which are root vegetables; a Jain household would keep to pumpkin, beans, peas and cauliflower and leave the root vegetables out.",
    "diabetic": "The sabzi itself has little sugar (about 2 g per serving), but the potatoes and the accompaniments (puris, rice, kheer, jalebi, laddu) carry the carbohydrate load. Choosing the sabzi with fewer potatoes, a small portion of rice or puri, and one sweet in place of three is the practical lever."
  },
  "kheel-batasha/north-india-lakshmi": {
    "nutrition": {
      "portion": "1 prasad serving: 2 batasha (about 24 g) with about 10 g kheel",
      "kcal": 131,
      "carbs_g": 32.5,
      "protein_g": 0.6,
      "fat_g": 0.1,
      "sugar_g": 23.5
    },
    "fasting": "Puffed rice is a grain product, so it does not suit fasts that exclude grains, and it is offered at Diwali rather than during a fast. Sugar batasha alone is permitted in some vrats, but that is a different item from this offering plate.",
    "diabetic": "Essentially all carbohydrate is sugar (about 24 g in this portion, around 6 tsp). Take one batasha rather than two, or share the plate, since there is no fibre or protein to slow it."
  },
  "kheel-batasha/bengal-muri-moa": {
    "nutrition": {
      "portion": "1 moa (about 24 g), one-twelfth of the recipe",
      "kcal": 92,
      "carbs_g": 20.6,
      "protein_g": 0.4,
      "fat_g": 0.9,
      "sugar_g": 14.2
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Muri is puffed rice, a grain, so moa is not suitable for fasts that exclude grains such as Ekadashi or Navratri. There is no real vrat substitute for muri here.",
    "diabetic": "About 14 g of sugar per moa, almost entirely from jaggery, which raises blood sugar much as sugar does. One small moa is a reasonable portion; eating it after a meal rather than alone and trimming the jaggery are the practical ways to lower the load."
  },
  "thandai/braj-up": {
    "nutrition": {
      "portion": "1 glass (about 165 ml), one-seventh of the batch",
      "kcal": 188,
      "carbs_g": 23.4,
      "protein_g": 6.5,
      "fat_g": 8.3,
      "sugar_g": 22.0
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds)"
    ],
    "fasting": "With no grains, pulses or regular salt, thandai is commonly taken in Mahashivaratri and other fasts that allow milk, nuts and sugar. Check that poppy seeds, fennel and pepper are accepted in your family's vrat rules, and use plain milk, not bhang.",
    "diabetic": "About 22 g of sugar per glass, much of it the 100 g added sugar, plus milk's lactose. A half glass, less sugar (the nut paste is already sweet) or a small amount of an unsweetened version lowers the load; the nuts and milk fat slow absorption somewhat."
  },
  "thandai/rajasthan": {
    "nutrition": {
      "portion": "1 glass (about 190 ml), one-seventh of the batch",
      "kcal": 259,
      "carbs_g": 33.3,
      "protein_g": 8.4,
      "fat_g": 11.3,
      "sugar_g": 31.2
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds, pistachios, cashews)"
    ],
    "fasting": "With no grains, pulses or regular salt, it is commonly taken in Mahashivaratri and similar fasts that allow milk, nuts and sugar. Check that poppy seeds and pepper are accepted in your family's vrat rules.",
    "diabetic": "About 31 g of sugar per glass because the recipe is deliberately sweet and calorie-rich. A half glass, reducing the added sugar to about half, and taking it with food keeps the load lower."
  },
  "pana/odisha": {
    "nutrition": {
      "portion": "1 glass (about 240 ml), one-seventh of the batch",
      "kcal": 144,
      "carbs_g": 30.2,
      "protein_g": 2.2,
      "fat_g": 1.9,
      "sugar_g": 19.2
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "With no grains, pulses or regular salt, bela pana fits many fruit-and-milk vrats; it uses curd or milk, jaggery and fruit only. Skip the optional lime or pepper if your fast excludes them.",
    "diabetic": "About 19 g of sugar per glass from jaggery, banana and bael pulp. Bael is high in natural sugar, so a half glass, less jaggery and thicker curd rather than extra fruit keep the load lower."
  },
  "panakam/telangana-andhra": {
    "nutrition": {
      "portion": "1 glass (about 150 ml, one-seventh of the recipe)",
      "kcal": 111,
      "carbs_g": 28.4,
      "protein_g": 0.2,
      "fat_g": 0.1,
      "sugar_g": 27.7
    },
    "fasting": "Contains no grain, pulse or regular salt, so it suits Ekadashi, Navratri or Rama Navami fasts as written. Tulsi and lemon are fine; no substitution needed.",
    "diabetic": "This is mostly jaggery sugar (roughly 28 g per glass), which is absorbed quickly as a drink. A half glass, made with less jaggery and a little more water, sipped with a meal rather than alone, lowers the load."
  },
  "panakam/karnataka": {
    "nutrition": {
      "portion": "1 glass (about 150 ml, one-seventh of the recipe)",
      "kcal": 86,
      "carbs_g": 21.9,
      "protein_g": 0.2,
      "fat_g": 0.1,
      "sugar_g": 20.9
    },
    "fasting": "No grain, pulse or salt, so it fits Ekadashi and Navratri fasts. Edible camphor, if used, should be the labelled edible kind.",
    "jain": "Fresh ginger is a root, so Jain households usually leave out the ginger juice or use a little dry ginger if their practice allows it.",
    "diabetic": "About 21 g of sugar per glass, all from jaggery and taken as a liquid. A smaller glass, extra water and extra lemon reduce the sugar per sip; it is best not taken on an empty stomach."
  },
  "panakam/maharashtra-kairi-panha": {
    "nutrition": {
      "portion": "1 glass (about 200 ml, one of roughly 4.5 glasses)",
      "kcal": 168,
      "carbs_g": 42.8,
      "protein_g": 0.7,
      "fat_g": 0.3,
      "sugar_g": 41.5
    },
    "allergens": [
      "Milk"
    ],
    "fasting": "Contains no grain or pulse; the only change for a fast is to use rock salt (sendha namak) for the pinch of salt, and water instead of milk to soak the saffron if milk is not taken.",
    "diabetic": "This is the sweetest of the three panakam versions, about 40 g of sugar per glass from jaggery plus mango. Serve in half-glass cups and dilute further; the mango's sourness hides how sweet it is."
  },
  "appam/kerala-unniyappam": {
    "nutrition": {
      "portion": "1 unniyappam (about 35 g, one-twentieth of the recipe)",
      "kcal": 102,
      "carbs_g": 17.1,
      "protein_g": 0.9,
      "fat_g": 3.6,
      "sugar_g": 8.3
    },
    "allergens": [
      "Milk",
      "Sesame"
    ],
    "fasting": "Made from rice, so it is not suitable for fasts that avoid grains (Ekadashi, many Navratri fasts). It cannot be sensibly rebuilt with kuttu or sabudana, which would give a different dish.",
    "diabetic": "About 8 g of sugar from jaggery and banana in each piece, plus a starchy rice base. One appam is a modest portion; eating it with a protein or after a meal, not alone, softens the sugar rise."
  },
  "appam/tamil-nei-appam": {
    "nutrition": {
      "portion": "1 nei appam (about 35 g, one-fifteenth of the recipe)",
      "kcal": 115,
      "carbs_g": 19.9,
      "protein_g": 0.9,
      "fat_g": 3.6,
      "sugar_g": 10.4
    },
    "allergens": [
      "Gluten (wheat)",
      "Milk"
    ],
    "fasting": "Contains rice flour and wheat flour, so it is not suitable for grain-free fasts. It is a feast-day sweet (Karthigai Deepam) rather than a fasting food.",
    "diabetic": "Each appam carries about 10 g of sugar and starchy flour, and it is fried. One piece is a sensible portion; avoid eating it hot and alone on an empty stomach."
  },
  "kosambari/karnataka-kosambari": {
    "nutrition": {
      "portion": "1 serving, one-quarter of the recipe (about 90 g)",
      "kcal": 125,
      "carbs_g": 18.2,
      "protein_g": 6.4,
      "fat_g": 3.5,
      "sugar_g": 2.8
    },
    "allergens": [
      "Mustard"
    ],
    "fasting": "Uses split moong, a pulse, so it is unsuitable for fasts that avoid pulses, and is traditionally eaten to break the Rama Navami fast rather than during it. For a strict vrat the dal would need to be left out, which changes the dish.",
    "jain": "Carrot is a root vegetable, so leave it out and add more cucumber. Hing is optional; use it only if it is from a source the household accepts.",
    "diabetic": "Moong dal gives protein and fibre, with little sugar (about 3 g per serving), so it is a relatively gentle dish. Keep the coconut and tempering oil modest and count it as a small serving."
  },
  "kosambari/andhra-vadapappu": {
    "nutrition": {
      "portion": "1 serving, one-quarter of the recipe (about 70 g)",
      "kcal": 106,
      "carbs_g": 16.7,
      "protein_g": 6.2,
      "fat_g": 2.0,
      "sugar_g": 2.0
    },
    "fasting": "Uses split moong, a pulse, so it is unsuitable for fasts that avoid pulses, and is eaten after the Rama Navami offering. Salt would need to be rock salt in any fast.",
    "jain": "Fresh ginger is a root, so Jain households usually leave it out or use dry ginger only if accepted.",
    "diabetic": "Low in sugar (about 2 g per serving) with some protein from the dal. Keep the portion to what is offered, and be aware that it is eaten alongside sweet panakam."
  },
  "thekua/bihar-thekua": {
    "nutrition": {
      "portion": "1 thekua (about 30 g, one-twentieth of the recipe)",
      "kcal": 134,
      "carbs_g": 16.8,
      "protein_g": 1.9,
      "fat_g": 7.1,
      "sugar_g": 7.4
    },
    "allergens": [
      "Gluten (wheat)",
      "Milk",
      "Tree nuts (almonds or cashews, optional)"
    ],
    "fasting": "Made from wheat flour, so it is not suitable for Ekadashi or other grain-free fasts. It is eaten as prasad after the Chhath offering, not during the devotees' own fast.",
    "diabetic": "About 7 g of sugar per piece, with wheat flour and ghee, so it is calorie-dense. Take half a piece, and avoid extra jaggery; whole wheat and fennel are already the better choices here."
  },
  "thekua/purvanchal-kasar": {
    "nutrition": {
      "portion": "1 laddu (about 40 g, one-fifteenth of the recipe)",
      "kcal": 174,
      "carbs_g": 29.4,
      "protein_g": 1.5,
      "fat_g": 5.6,
      "sugar_g": 13.0
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds or cashews, optional)"
    ],
    "fasting": "Made from rice flour, so it is not suitable for grain-free fasts. It is a Chhath prasad eaten after the offering rather than a fasting food.",
    "diabetic": "About 13 g of sugar and a starchy rice-flour base in each laddu, so it is a sweet to share. A half laddu with other food is a more measured portion than a whole one."
  },
  "puri-mahaprasad/odisha-puri": {
    "nutrition": {
      "portion": "1 plate, 1/5.5 of the rice, kanika, santula and saga (about 450 g; khechudi, dalma, khaja not included)",
      "kcal": 693,
      "carbs_g": 127.8,
      "protein_g": 10.7,
      "fat_g": 17.0,
      "sugar_g": 34.1
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashews)"
    ],
    "fasting": "This is a full meal of rice, sweet rice and vegetables, so it is not suitable for grain-free fasts such as Ekadashi in many households. It is an offering and a feast, not a vrat plate.",
    "jain": "Santula uses ginger and brinjal, and kanika and saga use cumin; Jain households usually leave out ginger and brinjal and use dry ginger only if their practice allows it.",
    "diabetic": "A large plate of rice and sweet kanika, with about 34 g of sugar and 128 g of carbohydrate. Eating a small portion of kanika, a smaller rice portion and more of the santula and saga lowers the glycaemic hit."
  },
  "pitha/bengal-patishapta": {
    "nutrition": {
      "portion": "1 patishapta (about 60 g, crêpe with coconut-jaggery filling)",
      "kcal": 192,
      "carbs_g": 30.3,
      "protein_g": 2.6,
      "fat_g": 7.2,
      "sugar_g": 16.1
    },
    "allergens": [
      "Milk",
      "Gluten (wheat)"
    ],
    "fasting": "Not suitable for a fast: it uses rice flour, semolina and maida, which are grains and refined wheat. A vrat version would need a different dish.",
    "jain": "Nothing needs changing: no root vegetables, onion, garlic or honey. Check that the jaggery and khoya are clean.",
    "diabetic": "Jaggery and sugar make it sweet-dense, so keep to one small piece and eat it alongside protein or a salad rather than as a snack alone. Fresh coconut and the milk slow the sugar rise only slightly."
  },
  "pitha/assam-til-pitha": {
    "nutrition": {
      "portion": "One-tenth of the recipe: 1 til pitha with about one-tenth of the narikol laru (about 70 g)",
      "kcal": 250,
      "carbs_g": 34.8,
      "protein_g": 3.2,
      "fat_g": 11.9,
      "sugar_g": 15.2
    },
    "allergens": [
      "Sesame",
      "Milk"
    ],
    "fasting": "Not suitable for most grain-free fasts since the pitha is made from rice or rice flour. It may suit fasts that allow rice, but not Ekadashi, where grains are avoided.",
    "diabetic": "A single pitha already holds roughly 15 g of sugar from jaggery; take one piece, skip the second laru, and pair with plain tea or a handful of nuts. Sesame and coconut add fibre and fat, which slow digestion a little."
  },
  "pitha/odisha-arisa": {
    "nutrition": {
      "portion": "1 arisa pitha (about 50 g)",
      "kcal": 245,
      "carbs_g": 36.7,
      "protein_g": 1.8,
      "fat_g": 10.2,
      "sugar_g": 14.2
    },
    "allergens": [
      "Sesame",
      "Milk"
    ],
    "fasting": "Not suitable for a grain fast as it is made from rice flour and deep fried; it is eaten at harvest festivals, not Ekadashi or Navratri vrat.",
    "diabetic": "Each piece combines refined rice flour, jaggery and fried oil, so it raises sugar quickly and is energy-dense. A half piece with plain food is a more modest choice; it is not a low-sugar sweet."
  },
  "charanamrit/north-braj": {
    "allergens": [
      "Milk"
    ],
    "fasting": "Suitable for most fasts as written: no grain, pulse or salt. Use fresh tulsi plucked the day before for Ekadashi and Sunday, as the recipe says.",
    "jain": "Honey is not used in many Jain households; replace it with a little extra mishri.",
    "diabetic": "Sweetener is only about 3 g sugar per portion, so the load is small; the usual serving is three sips. Honey and milk still count toward sugar, so keep it to the ritual amount."
  },
  "charanamrit/sri-vaishnava-south": {
    "fasting": "Suitable for fasts: only water, spices, tulsi and optional edible camphor and saffron, with no grain, pulse or salt.",
    "jain": "Fits as written: no root vegetables, honey or dairy. Source hing-free and use edible-grade camphor only.",
    "diabetic": "Negligible sugar and energy, so the ritual sip is unlikely to matter for sugar. Use only edible-grade camphor in a tiny amount."
  },
  "krishna-snacks/tamil-seedai": {
    "nutrition": {
      "portion": "One-sixth of the recipe: about 7 seedai and one-sixth of the vella aval (about 90 g)",
      "kcal": 319,
      "carbs_g": 48.8,
      "protein_g": 3.6,
      "fat_g": 12.5,
      "sugar_g": 14.6
    },
    "allergens": [
      "Milk",
      "Sesame",
      "Tree nuts (cashew, optional)"
    ],
    "fasting": "Not suitable for a grain fast: rice flour and urad dal flour are used, and fried snacks with regular salt are normally for the evening feast after the vrat. Many families fast until midnight, then offer these.",
    "jain": "Fits as written, with hing not used in this version. Check that the jaggery is clean.",
    "diabetic": "Fried rice snacks plus jaggery aval is a high-carb, energy-dense combination. Take two or three seedai and a small spoon of aval rather than the full portion."
  },
  "krishna-snacks/karnataka-chakli": {
    "nutrition": {
      "portion": "One-sixth of the recipe: about 4 chakli and one-sixth of the sihi avalakki (about 90 g)",
      "kcal": 326,
      "carbs_g": 49.4,
      "protein_g": 3.8,
      "fat_g": 12.9,
      "sugar_g": 14.6
    },
    "allergens": [
      "Milk",
      "Sesame",
      "Peanuts (optional)"
    ],
    "fasting": "Not suitable for a grain fast: rice flour and roasted gram flour are used and the dish is fried. These are generally made ahead and eaten after the fast is broken.",
    "jain": "Asafoetida is optional and the recipe says to skip it for hing-free homes; otherwise nothing needs to change.",
    "diabetic": "Both parts are starch-heavy and the aval is sweetened with jaggery. One chakli with a small spoon of avalakki is more modest than a full portion; roasted gram adds a little protein."
  },
  "ven-pongal/tamil-nadu-temple": {
    "nutrition": {
      "portion": "1 serving, one-quarter of the recipe (about 1 cup, 200-250 g)",
      "kcal": 242,
      "carbs_g": 28.9,
      "protein_g": 5.5,
      "fat_g": 11.8,
      "sugar_g": 0.5
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashew)"
    ],
    "fasting": "Not suitable for strict grain fasts as it uses rice and moong dal. It is commonly eaten at Vaikuntha Ekadashi in temples that serve it, but on a grain-free vrat use a samak or sabudana preparation instead.",
    "jain": "Fits as written when hing is skipped. Ginger and curry leaves are fine; no root vegetables or onion used.",
    "diabetic": "Rice and ghee give a moderate carbohydrate load with little sugar. A smaller portion with sambar or vegetables, and moong dal for protein, helps; the ghee makes it calorie-dense."
  },
  "ven-pongal/karnataka-huggi": {
    "nutrition": {
      "portion": "1 serving, one-quarter of the recipe (about 1 cup, 180-220 g)",
      "kcal": 252,
      "carbs_g": 29.3,
      "protein_g": 5.6,
      "fat_g": 12.8,
      "sugar_g": 0.7
    },
    "allergens": [
      "Milk",
      "Tree nuts (cashew)"
    ],
    "fasting": "Not suitable for strict grain fasts as it uses rice and moong dal. For a vrat, a samak or kuttu preparation is the usual alternative.",
    "jain": "Fits as written; leave out hing if not used. No onion, garlic or root vegetables.",
    "diabetic": "Starch from rice with little added sugar; ghee and coconut make it energy-dense. A smaller portion with vegetables or sambar is a modest way to eat it."
  },
  "sunthavda/maharashtra": {
    "nutrition": {
      "portion": "1 small serving, one-twelfth of the recipe (about 25 g)",
      "kcal": 119,
      "carbs_g": 12.1,
      "protein_g": 1.2,
      "fat_g": 8.0,
      "sugar_g": 7.8
    },
    "allergens": [
      "Milk",
      "Tree nuts (almonds, cashews)"
    ],
    "fasting": "Suitable for most fasts as it uses no grain, pulse or regular salt, but check the ghee, jaggery and poppy seeds. Dry ginger, coconut, nuts and jaggery are commonly accepted in vrat.",
    "diabetic": "Jaggery and coconut make it sugar and fat dense even in a small portion. Keep to one spoonful or small piece, and eat it after a meal rather than alone; the ginger does not offset the sugar."
  },
  "pana/odisha-adhara-pana": {
    "nutrition": {
      "portion": "1 glass (about 200 ml), one-tenth of the recipe",
      "kcal": 273,
      "carbs_g": 48.6,
      "protein_g": 6.9,
      "fat_g": 6.2,
      "sugar_g": 35.5
    },
    "fasting": "Not for a grain-free fast: it contains parched rice and roasted chickpea flour. Fine for a milk-and-fruit fast only if you leave those two out.",
    "diabetic": "High in sugar (about 35 g a glass) from sugar, fruit and khoya. A half glass is plenty; make it with less sugar since the fruit already sweetens it.",
    "allergens": [
      "Milk"
    ]
  },
  "khaja/bihar-silao": {
    "nutrition": {
      "portion": "1 piece (about 40 g), one-twentieth of the batch",
      "kcal": 179,
      "carbs_g": 26.7,
      "protein_g": 2.1,
      "fat_g": 7.2,
      "sugar_g": 12.6
    },
    "fasting": "Wheat flour, so not suitable for Ekadashi or Navratri fasts that avoid grains.",
    "diabetic": "A syrup-soaked, deep-fried sweet; one piece is a full portion. Have it after a meal, not on its own.",
    "allergens": [
      "Gluten (wheat)",
      "Milk"
    ]
  },
  "khaja/andhra-madatha-kaja": {
    "nutrition": {
      "portion": "1 piece (about 20 g), one-twentieth of the batch",
      "kcal": 91,
      "carbs_g": 13.3,
      "protein_g": 1.1,
      "fat_g": 3.9,
      "sugar_g": 6.0
    },
    "fasting": "Wheat flour, so not suitable for grain-free fasts.",
    "diabetic": "Syrup-coated and fried: keep to one small piece, with a meal.",
    "allergens": [
      "Gluten (wheat)",
      "Milk"
    ]
  },
  "laddu/gujarat-churma": {
    "nutrition": {
      "portion": "1 laddu (about 60 g), one-twelfth of the batch",
      "kcal": 314,
      "carbs_g": 36.8,
      "protein_g": 4.1,
      "fat_g": 17.3,
      "sugar_g": 15.2
    },
    "fasting": "Made with whole wheat, so not for grain-free fasts.",
    "diabetic": "Jaggery and ghee make it dense: about 15 g sugar and 310 kcal a laddu. Half a laddu is a sensible share.",
    "allergens": [
      "Gluten (wheat)",
      "Milk",
      "Tree nuts (almond, cashew)"
    ]
  },
  "narkel-naru-sandesh/assam-narikol-laru": {
    "nutrition": {
      "portion": "1 laru (about 20 g), one-fifteenth of the batch",
      "kcal": 76,
      "carbs_g": 8.7,
      "protein_g": 0.4,
      "fat_g": 4.7,
      "sugar_g": 7.5
    },
    "fasting": "Coconut and sugar only, so it suits fasts that allow sugar and coconut. Leave out the ghee if you avoid dairy.",
    "diabetic": "Small and mostly sugar and coconut; one laru is about 7 g of sugar.",
    "allergens": [
      "Milk"
    ]
  },
  "diwali-faral/goa-godshe-fov": {
    "nutrition": {
      "portion": "1 small bowl of the dry (kalayle) fov, one-fifth of the batch (about 50 g)",
      "kcal": 126,
      "carbs_g": 23.2,
      "protein_g": 1.5,
      "fat_g": 3.1,
      "sugar_g": 9.0
    },
    "fasting": "Made with flattened rice (a grain), so not for grain-free fasts.",
    "diabetic": "Jaggery-sweet; the dry version is lighter than the coconut-milk-style one. A small bowl is the portion.",
    "allergens": [
      "Tree nuts (coconut)"
    ]
  },
  "diwali-faral/goa-tikshe-fov": {
    "nutrition": {
      "portion": "1/4 cup (about 45 g), one-fourteenth of the batch",
      "kcal": 224,
      "carbs_g": 24.8,
      "protein_g": 3.3,
      "fat_g": 13.0,
      "sugar_g": 15.7
    },
    "fasting": "Contains flattened rice, chana dal and peanuts, so not for grain-free fasts.",
    "diabetic": "A fried snack with a hot-jaggery coating; a quarter cup is the realistic portion.",
    "allergens": [
      "Peanuts",
      "Sesame",
      "Tree nuts (coconut)"
    ]
  },
  "sunthavda/dry-powder-janmashtami": {
    "nutrition": {
      "portion": "1 small spoonful (about 10 g), one-seventeenth of the batch",
      "kcal": 47,
      "carbs_g": 6.4,
      "protein_g": 0.7,
      "fat_g": 2.5,
      "sugar_g": 4.4
    },
    "fasting": "Made with nuts, seeds, dry ginger and sugar, with no grain or pulse, so it generally fits fasts that allow dry fruits; check that your fast allows sugar.",
    "diabetic": "Mostly nuts and seeds with a little sugar: about 4 g sugar a spoonful. A spoonful at a time is traditional.",
    "allergens": [
      "Tree nuts (almond, cashew)",
      "Sesame"
    ],
    "jain": "Dry ginger is a root-derived spice; Jain households that avoid it can substitute extra cardamom and fennel."
  },
  "labra/bangladesh": {
    "nutrition": {
      "portion": "1 serving (about 250 g), one-eighth of the recipe",
      "kcal": 139,
      "carbs_g": 16.1,
      "protein_g": 2.8,
      "fat_g": 7.9,
      "sugar_g": 7.2
    },
    "fasting": "Contains root vegetables and mixed vegetables; not for fasts that avoid them.",
    "diabetic": "A vegetable dish with little sugar; the ghee adds most of the calories.",
    "allergens": [
      "Mustard (panch phoron)"
    ],
    "jain": "Radish, carrot, sweet potato, ginger and other roots are used; Jain households would need to skip those."
  },
  "dalma/odisha-habisa-kartika": {
    "nutrition": {
      "portion": "1 serving (about 350 g), one-fifth of the recipe",
      "kcal": 275,
      "carbs_g": 36.1,
      "protein_g": 8.5,
      "fat_g": 11.5,
      "sugar_g": 2.0
    },
    "fasting": "Contains moong dal and vegetables; the Habisa month is its own vegetarian discipline, not a grain-free vrat.",
    "diabetic": "Low in sugar. Dal and tubers raise blood sugar slowly; keep the rice portion beside it small.",
    "allergens": [
      "Milk"
    ],
    "jain": "Uses taro, yam, raw banana and ginger (roots and tubers); not suitable as written for Jain households."
  },
  "gopalkala/karnataka-mosaru-avalakki": {
    "nutrition": {
      "portion": "1 serving (about 220 g), roughly one-third of the recipe",
      "kcal": 215,
      "carbs_g": 26.4,
      "protein_g": 5.7,
      "fat_g": 9.9,
      "sugar_g": 6.3
    },
    "fasting": "Poha is a grain, so it suits the Janmashtami feast, not a grain-free fast.",
    "diabetic": "Curd and poha: moderate carbs, very little sugar. Fresh curd adds protein.",
    "allergens": [
      "Milk",
      "Tree nuts (cashew)"
    ]
  },
  "tahiri-akha/kashmiri-pandit-tahar": {
    "nutrition": {
      "portion": "1 serving (about 250 g cooked rice), one-fourth of the recipe",
      "kcal": 329,
      "carbs_g": 58.5,
      "protein_g": 5.2,
      "fat_g": 7.9,
      "sugar_g": 0.0
    },
    "fasting": "Rice is a grain; not for grain-free fasts.",
    "diabetic": "Plain rice with turmeric; the carbohydrate load is that of rice, so keep to a normal bowl.",
    "jain": "Turmeric is a rhizome, so this is not suitable for Jain households as written."
  }
}
