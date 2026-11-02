// Curated kuldevi / kuldevta entries. Every entry states where its facts come from and how sure we are.
// Rule: nothing is written here that a source or the family did not say.

export interface KuldeviEntry {
  slug: string
  /** Slug of this deity's temple page on the portal, when it has one. */
  temple_slug?: string
  name: string
  kind: 'Kuldevi' | 'Kuldevta' | 'Community kuldaivat'
  place: string
  district: string
  state: string
  communities: string[]
  summary: string
  facts: { label: string; value: string }[]
  timings?: { label: string; value: string }[]
  sources: { title: string; url?: string }[]
  confidence: 'sourced' | 'family-shared'
  confidenceNote: string
  related?: string[]
}

export const KULDEVI: KuldeviEntry[] = [
  {
    slug: 'kotyark-dham-umreth',
    name: 'Kotyark Dham, Umreth',
    kind: 'Community kuldaivat',
    place: 'Umreth',
    district: 'Anand',
    state: 'Gujarat',
    communities: ['Khadayata'],
    summary:
      'A temple on the Umreth–Dakor road in Umreth taluka, Anand district, Gujarat, described as the kuldaivat (family deity) of the Khadayata community.',
    facts: [
      { label: 'Location', value: 'On the Umreth–Dakor road, Umreth taluka, Anand district, Gujarat.' },
      { label: 'Community', value: 'Described as the common kuldaivat of the Khadayata community.' },
    ],
    sources: [
      { title: 'PilgrimData — Kotyark Dham Temple, Umreth', url: 'https://pilgrimdata.in/temple/kotyark-dham-temple-umreth-tal-umreth-dist-anand/' },
    ],
    confidence: 'sourced',
    confidenceNote:
      'Only the location and the Khadayata link could be confirmed. Details such as timings, the shrines on the grounds and the gotra lists are not shown until the temple trust or a community elder confirms them. Another Kotyark temple is reported near Mahudi in Gandhinagar district; ask your family elders which seat your family follows.',
  },
  {
    "slug": "ambaji-temple",
    "temple_slug": "ambaji-temple",
    "name": "Ambaji Mata (Arasuri Amba), Ambaji Temple",
    "kind": "Kuldevi",
    "place": "Ambaji",
    "district": "Banaskantha",
    "state": "Gujarat",
    "communities": [],
    "summary": "Ambaji is the temple of Arasuri Amba in the Arasur hills at the south-western end of the Aravali range, in Banaskantha district. The goddess is worshipped through the Visa Yantra rather than an idol, and tradition counts the site as a Shakti Pitha. Family links to Ambaji as a kuldevi are not documented in the sources checked.",
    "facts": [
      {
        "label": "Deity",
        "value": "Arasuri Amba / Ambaji; worshipped as a yantra (Visa/Viso Yantra), not an idol"
      },
      {
        "label": "Location",
        "value": "Ambaji town, Banaskantha district, Gujarat; Arasur hills, Aravalli range"
      },
      {
        "label": "Tradition",
        "value": "Revered as one of the 51 Shakti Pithas; traditionally believed to enshrine Sati's heart"
      },
      {
        "label": "History",
        "value": "Gujarat Tourism says originally built by Nagar Brahmins; Gabbar hill nearby is called the original abode"
      },
      {
        "label": "Main festivals",
        "value": "Navratri, Bhadarvi Poornima fair (September), Diwali"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Ambaji Mata Temple",
        "url": "https://en.wikipedia.org/wiki/Ambaji_Mata_Temple"
      },
      {
        "title": "Gujarat Tourism: Ambaji Temple, Banaskantha",
        "url": "https://gujarattourism.com/north-zone/banaskantha/ambaji-temple.html"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, deity form, Shakti Pitha tradition and festivals are consistent across Wikipedia and Gujarat Tourism. No source read says which communities hold Ambaji as kuldevi, so any family claim must come from the family's own elders or records."
  },
  {
    "slug": "ashapura-mata-temple-mata-no-madh",
    "temple_slug": "ashapura-mata-temple-mata-no-madh",
    "name": "Ashapura Mata, Mata no Madh",
    "kind": "Kuldevi",
    "place": "Mata no Madh",
    "district": "Kutch (Lakhpat taluka)",
    "state": "Gujarat",
    "communities": [
      "Jadeja Rajput"
    ],
    "summary": "Ashapura Mata, described by Wikipedia as a goddess regarded as fulfilling the wishes of her adherents, is the household deity of the former Jadeja rulers of Kutch and is also seen as the main guardian deity of the region. Her main shrine is at Mata no Madh in Lakhpat taluka. Wikipedia's Ashapura Mata article lists a wide set of Rajput, Brahmin and trading communities as regarding her as kuldevi.",
    "facts": [
      {
        "label": "Deity",
        "value": "Ashapura Mata, considered an expansion of Shakambhari Devi (Wikipedia)"
      },
      {
        "label": "Location",
        "value": "Mata no Madh village, Lakhpat taluka, Kutch; about 100-105 km from Bhuj (Inditales and Wikipedia)"
      },
      {
        "label": "Tradition",
        "value": "Kapadi ascetics preside over temple rituals (Inditales); subordinate Chauhan priests perform the deity's pooja (Wikipedia)"
      },
      {
        "label": "History",
        "value": "Wikipedia says built in the 14th century by Karad Vania ministers (Inditales gives a popular 15th-century origin story); rebuilt by 1823 after the 1819 earthquake; repaired after the 2001 earthquake"
      },
      {
        "label": "Main festivals",
        "value": "Chaitra and Ashvin (Sharad) Navaratri; Ashvin regarded as the larger"
      }
    ],
    "sources": [
      {
        "title": "Mata no Madh - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Mata_no_Madh"
      },
      {
        "title": "Ashapura Mata - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Ashapura_Mata"
      },
      {
        "title": "Mata Na Madh - Abode of Ashapura Mata in Kutch - Inditales",
        "url": "https://inditales.com/?p=38712"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Temple location, rebuilding dates and Jadeja link are supported by Wikipedia and Inditales. The longer community list comes only from Wikipedia's Ashapura Mata article and is not entered here. Many families outside the Jadeja claim Ashapura Mata as kuldevi; a family should confirm with its elders that its own kuldevi is Ashapura Mata and whether its seat is Mata no Madh or another Ashapura temple, since the goddess has several shrines."
  },
  {
    "slug": "bahucharaji-temple",
    "temple_slug": "bahucharaji-temple",
    "name": "Bahuchara Mata (Bahucharaji), Becharaji",
    "kind": "Kuldevi",
    "place": "Becharaji (Bahucharaji)",
    "district": "Mehsana",
    "state": "Gujarat",
    "communities": [],
    "summary": "Bahuchara Mata is a goddess of Gujarat with her main temple at Becharaji in Mehsana district. According to the legend recorded by CPREEC, she was the daughter of a Charan who chose self-immolation with her sisters rather than surrender to a marauder. She is described as the kuldevi of many castes in Gujarat, and is the patron goddess of the hijra community.",
    "facts": [
      {
        "label": "Deity",
        "value": "Bahuchara Mata, shown seated on a rooster"
      },
      {
        "label": "Location",
        "value": "Becharaji town, Mehsana district, Gujarat"
      },
      {
        "label": "Tradition",
        "value": "Considered a Shakti Peetha (Sati's hands said to have fallen) per CPREEC"
      },
      {
        "label": "History",
        "value": "Legend: Charan daughter whose caravan was attacked by Bapiya; Wikipedia notes weak sourcing on parts"
      },
      {
        "label": "Main festivals",
        "value": "Navaratri; Chaitra and Ashadhi Purnima fairs; Sami tree worship at Dussehra"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Bahuchar Mata Temple, Becharaji",
        "url": "https://en.wikipedia.org/wiki/Bahuchar_Mata_Temple,_Becharaji"
      },
      {
        "title": "CPREEC Eco-Heritage: Bahucharaji",
        "url": "https://ecoheritage.cpreec.org/bahucharaji/"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, Navaratri and the hijra reverence are from Wikipedia; the legend, Shakti Peetha claim, other festivals and 'kuldevi of many castes' are from CPREEC. Both are general sources; no source lists specific castes, gotras or surnames. A family should confirm with elders that their kuldevi is this Becharaji shrine and not another Bahuchara Mata temple."
  },
  {
    "slug": "banashankari-amma-temple",
    "temple_slug": "banashankari-amma-temple",
    "name": "Banashankari Amma (Shakambhari), Banashankari Temple, Cholachagudda",
    "kind": "Kuldevi",
    "place": "Cholachagudda (near Badami)",
    "district": "Bagalkot",
    "state": "Karnataka",
    "communities": [
      "Devanga",
      "Deshastha Brahmins (some)"
    ],
    "summary": "Banashankari, also called Shakambhari and regarded as an incarnation of Parvati, is worshipped at a temple in Cholachagudda near Badami. Wikipedia describes her as the tutelary deity of the Chalukyas, and as the tutelary deity of the Devanga community and of some Deshastha Brahmins.",
    "facts": [
      {
        "label": "Deity",
        "value": "Banashankari / Shakambhari, a form of Parvati"
      },
      {
        "label": "Location",
        "value": "Cholachagudda, about 5 km from Badami, Bagalkot district, Karnataka"
      },
      {
        "label": "Tradition",
        "value": "Tutelary deity of Chalukyas, Devanga community, some Deshastha Brahmins (Wikipedia)"
      },
      {
        "label": "History",
        "value": "Wikipedia says 7th-century origin; present temple built 1750 by Parusharam Agale"
      },
      {
        "label": "Main festivals",
        "value": "Banashankari jatre (Jan-Feb) with rath procession; Teppotsava; Palleda Habba"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Banashankari Amma Temple",
        "url": "https://en.wikipedia.org/wiki/Banashankari_Amma_Temple"
      },
      {
        "title": "Outlook Traveller: Banashankari and Mahakuta, Temple Villages",
        "url": "https://www.outlookindia.com/traveller/ot-getaway-guides/banashankari-mahakuta-temple-villages/"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, deity and festivals are consistent across both sources. Community claims (Devanga, Deshastha Brahmins) rest on Wikipedia alone; Outlook confirms only the Chalukya-era kuldevi role. Families should confirm with their own elders, since 'some Deshastha Brahmins' is not specific and no gotras are listed."
  },
  {
    "slug": "chotila-chamunda-temple",
    "temple_slug": "chotila-chamunda-temple",
    "name": "Chamunda Mataji Temple, Chotila",
    "kind": "Kuldevi",
    "place": "Chotila",
    "district": "Surendranagar",
    "state": "Gujarat",
    "communities": [],
    "summary": "The temple stands on top of Chotila hill in Surendranagar district and is dedicated to Chamunda, a fierce form of the goddess. Gujarat Tourism says she is kuldevi of many communities in Gujarat; the sources read do not say which communities.",
    "facts": [
      {
        "label": "Deity",
        "value": "Chamunda Mataji (Chamunda Devi)"
      },
      {
        "label": "Location",
        "value": "Top of Chotila hill, about 1,173-1,250 ft (sources differ); Chotila taluka, Surendranagar district"
      },
      {
        "label": "Tradition",
        "value": "Gujarat Tourism: kuldevi of many communities in Gujarat (none named)"
      },
      {
        "label": "History",
        "value": "Local tradition (apnisanskriti.com): idol found by digging after a dream. Wikipedia: the town was known as Chotgadh in ancient times and was acquired by the Kathis in 1566 CE"
      },
      {
        "label": "Main festivals",
        "value": "Navratri Mahotsav (Gujarat Tourism: 11-19 Oct 2026). Apnisanskriti.com notes devotee rush in Kartik month, on every Purnima, and on the 7th and 8th of Shravan"
      }
    ],
    "sources": [
      {
        "title": "Chotila (Wikipedia)",
        "url": "https://en.wikipedia.org/wiki/Chotila"
      },
      {
        "title": "Shri Chamunda Mata Mandir Navratri Mahotsav, Chotila (Incredible India / Gujarat Tourism)",
        "url": "https://www.incredibleindia.gov.in/en/festivals-and-events/gujarat/shri-chamunda-mata-mandir-navratri-mahotsav-chotila"
      },
      {
        "title": "Chamunda Devi Temple, Chotila (Apni Sanskriti)",
        "url": "https://www.apnisanskriti.com/chamunda-devi-temple-chotila-surendranagar-gujarat"
      },
      {
        "title": "Surendranagar district site: Chotila",
        "url": "https://surendranagar.nic.in/?p=26062"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location and the town's history are from Wikipedia and the district site; festival dates and the 'kuldevi of many communities' statement are from Gujarat Tourism, repeated by Apni Sanskriti. The temple's own founding date and which communities hold her as kuldevi were not found in a source; families should confirm with their elders."
  },
  {
    "slug": "jeen-mata-temple",
    "temple_slug": "jeen-mata-temple",
    "name": "Jeen Mata (Jayanti Mata), Jeen Mata Temple",
    "kind": "Kuldevi",
    "place": "Raiwasa (Ralawata), Aravalli hills",
    "district": "Sikar",
    "state": "Rajasthan",
    "communities": [
      "Shekhawat Rajput",
      "Meena",
      "Jeengar"
    ],
    "summary": "Jeen Mata is regarded as an incarnation of Durga, worshipped at a hilltop shrine in the Aravalli hills of Sikar district. According to local legend she was the daughter of King Ghangh of Ghoghu and sister of Harsha, who is regarded as an incarnation of Bhairon. Several Rajasthani communities are named by published pages as holding her as kuldevi.",
    "facts": [
      {
        "label": "Deity",
        "value": "Jeen Mata (Jayanti Mata), regarded as Durga"
      },
      {
        "label": "Location",
        "value": "Aravalli hills, Sikar district, Rajasthan"
      },
      {
        "label": "Tradition",
        "value": "Known as a Shakti Peeth; Harsh Bhairav shrine on the hilltop"
      },
      {
        "label": "History",
        "value": "Date unknown; local belief says about 1000 to 1200 years old, rebuilt by the Pandavas"
      },
      {
        "label": "Main festivals",
        "value": "Navratri, with a fair held at the temple"
      }
    ],
    "sources": [
      {
        "title": "The Divine India: Jeen Mata Temple",
        "url": "https://www.thedivineindia.com/amp/5803.html"
      },
      {
        "title": "BhaktiBharat: Jeen Mata Mandir",
        "url": "https://www.bhaktibharat.com/amp/en/mandir/jeen-mata-mandir"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Legend, location and the first community list come from The Divine India; Navratri fair and the broader list from BhaktiBharat. Both are devotional/tourism sites, not scholarly. Families should confirm with their elders, especially for the broader communities, since the two lists conflict."
  },
  {
    "slug": "pavagadh-kalika-mata-temple",
    "temple_slug": "pavagadh-kalika-mata-temple",
    "name": "Kalika Mata (Mahakali) Temple, Pavagadh",
    "kind": "Kuldevi",
    "place": "Pavagadh Hill (near Halol)",
    "district": "Panchmahal",
    "state": "Gujarat",
    "communities": [],
    "summary": "The temple sits at the summit of Pavagadh Hill within the Champaner-Pavagadh Archaeological Park (UNESCO World Heritage Site) and is dedicated to Kalika / Mahakali, worshipped as a form of Durga or Chandi. Wikipedia says it is believed to be one of the 51 Shakti Peeths and was once a Jain site; a family tracing kuldevi to her is not documented in the sources read.",
    "facts": [
      {
        "label": "Deity",
        "value": "Kalika Mata / Mahakali (as Durga or Chandi)"
      },
      {
        "label": "Location",
        "value": "Summit of Pavagadh Hill, Panchmahal district, near Halol, Gujarat"
      },
      {
        "label": "Tradition",
        "value": "Believed to be a Shakti Peeth; earliest worshippers said to be Bhil and Koli people"
      },
      {
        "label": "History",
        "value": "Wikipedia dates the temple to the 10th-11th c.; Achalgacch Jain link from 1113 CE; shrine redeveloped in 2022"
      },
      {
        "label": "Main festivals",
        "value": "Navratri; Chaitra Ashtami fair (Chitra sud 8)"
      }
    ],
    "sources": [
      {
        "title": "Kalika Mata Temple, Pavagadh (Wikipedia)",
        "url": "https://en.wikipedia.org/wiki/Kalika_Mata_Temple,_Pavagadh"
      },
      {
        "title": "Pavagadh (Wikipedia)",
        "url": "https://en.wikipedia.org/wiki/Pavagadh"
      },
      {
        "title": "Kalika Mata Temple, Pavagarh: Restoring the lost Glory of Shakti Peeth (Organiser, 2023)",
        "url": "https://organiser.org/2023/08/17/190392/bharat/kalika-mata-temple-restoring-the-lost-glory-2/"
      },
      {
        "title": "Pavagadh Hill (CPREEC EcoHeritage)",
        "url": "https://ecoheritage.cpreec.org/?p=6688"
      },
      {
        "title": "Kuladevata (Wikipedia, via Wikiwand)",
        "url": "https://www.wikiwand.com/en/articles/Kuladevata"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, deity, dating and festivals are cross-checked between Wikipedia, Organiser and CPREEC. Whether any family or community holds her as kuldevi is NOT supported by these sources, so communities are left empty; families must confirm with their own elders."
  },
  {
    "slug": "karni-mata-temple",
    "temple_slug": "karni-mata-temple",
    "name": "Karni Mata, Karni Mata Temple (Deshnoke)",
    "kind": "Kuldevi",
    "place": "Deshnoke",
    "district": "Bikaner",
    "state": "Rajasthan",
    "communities": [
      "Rajputs",
      "Charans",
      "Rathores (incl. royal houses of Bikaner and Jodhpur)"
    ],
    "summary": "Karni Mata is a Charan woman saint-goddess of the 14th-16th century, regarded as an incarnation of Shakti, whose most important temple stands at Deshnoke. Wikipedia describes Charans as her principal followers who serve as her priests, and says many Rajput clans worship her as family goddess, with the Rathores regarding her as patron deity and the royal families of Jodhpur and Bikaner as official devotees.",
    "facts": [
      {
        "label": "Deity",
        "value": "Karni Mata, venerated as an incarnation of Shakti"
      },
      {
        "label": "Location",
        "value": "Deshnoke town, Bikaner district, Rajasthan; about 30 km south of Bikaner"
      },
      {
        "label": "Tradition",
        "value": "Tutelary deity of Rajputs and Charans (Wikipedia); Charans serve as priests"
      },
      {
        "label": "History",
        "value": "Wikipedia says the temple was originally constituted around 1530 and the present building was completed in Rajput style by Maharaja Ganga Singh of Bikaner"
      },
      {
        "label": "Main festivals",
        "value": "Karni Mata Fair twice a year during Navratras (Chaitra and Ashvin)"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Karni Mata",
        "url": "https://en.wikipedia.org/wiki/Karni_Mata"
      },
      {
        "title": "Wikipedia: Karni Mata Temple",
        "url": "https://en.wikipedia.org/wiki/Karni_Mata_Temple"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Temple details come from Wikipedia's temple article; community statements come from the Karni Mata article. Both are Wikipedia, so independence is limited. Families should confirm with their own elders whether Karni Mata is their kuldevi; the sources do not list clans or gotras."
  },
  {
    "slug": "jejuri-khandoba-temple",
    "temple_slug": "jejuri-khandoba-temple",
    "name": "Khandoba (Malhari Martand), Jejuri",
    "kind": "Kuldevta",
    "place": "Jejuri",
    "district": "Pune (Purandar taluka)",
    "state": "Maharashtra",
    "communities": [
      "Dhangar"
    ],
    "summary": "Khandoba, also called Khanderao or Khanderaya, is regarded as an avatar of Shiva. Wikipedia describes him as the kuladevata of many farming families, Brahmins and the nomadic Dhangar tribe. His hill temple is at Jejuri, in Purandar taluka of Pune district.",
    "facts": [
      {
        "label": "Deity",
        "value": "Khandoba / Khanderao / Khanderaya (also Martanda Bhairava, Malhari), regarded as an avatar of Shiva"
      },
      {
        "label": "Location",
        "value": "Hill temple, Jejuri, Purandar taluka, Pune district; about 50 km from Pune (Wikipedia)"
      },
      {
        "label": "Tradition",
        "value": "Legend of defeating the demon brothers Mani and Malla (Wikipedia)"
      },
      {
        "label": "History",
        "value": "Worship said to begin 12th-13th century; rebuilt in the Peshwa era; Portuguese church bells from Vasai (taken 1737) were gifted to the temple. Wikipedia's text and infobox disagree on the builder"
      },
      {
        "label": "Main festivals",
        "value": "Somavati Amavasya, Champa Shashthi, Chaitra Purnima"
      }
    ],
    "sources": [
      {
        "title": "Khandoba Temple, Jejuri - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Khandoba_Temple,_Jejuri"
      },
      {
        "title": "Khandobachi Jejuri - Incredible India (Ministry of Tourism)",
        "url": "https://www.incredibleindia.gov.in/en/maharashtra/pune/khandobachi-jejuri"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, deity names, festivals and the broad community statements come from the two sources above. Families should confirm with their elders that Khandoba is their own kuladaivat, which branch or temple (Jejuri or another Khandoba seat) they trace to, and the family's own customs; neither source lists gotras or surnames."
  },
  {
    "slug": "mahalaxmi-temple-kolhapur",
    "temple_slug": "mahalaxmi-temple-kolhapur",
    "name": "Mahalakshmi (Ambabai) Temple, Kolhapur",
    "kind": "Kuldevi",
    "place": "Kolhapur (Karveer)",
    "district": "Kolhapur",
    "state": "Maharashtra",
    "communities": [],
    "summary": "The temple in Kolhapur is dedicated to Mahalakshmi, locally called Ambabai, and is described by Maharashtra Tourism and others as a Shakti Peetha on the Panchganga river. Wikipedia's Kuladevata article lists her among kuladevatas worshipped in Maharashtra, so some families trace their lineage deity to her, but no source read here says which ones.",
    "facts": [
      {
        "label": "Deity",
        "value": "Mahalakshmi / Ambabai"
      },
      {
        "label": "Location",
        "value": "Bhavani Mandap, Mahadwar Road, Kolhapur, Maharashtra"
      },
      {
        "label": "Tradition",
        "value": "Described as a Shakti Peetha; listed by Wikipedia among Maharashtra kuladevatas"
      },
      {
        "label": "History",
        "value": "Wikipedia says built by Chalukya king Karnadeva in 634 CE (Hemadpanti style, 7th c.); ambabai.com gives conflicting dates and says the idol was re-established on 26 Sept 1715"
      },
      {
        "label": "Main festivals",
        "value": "Kirnotsav, Rathotsav, Navratri (Lalita Panchami palanquin to Temblai), Friday and full-moon palanquin processions, Dussehra (per Wikipedia and The Statesman)"
      }
    ],
    "sources": [
      {
        "title": "Mahalakshmi Temple, Kolhapur (Wikipedia)",
        "url": "https://en.wikipedia.org/wiki/Mahalakshmi_Temple,_Kolhapur"
      },
      {
        "title": "Kuladevata (Wikipedia, via Wikiwand)",
        "url": "https://www.wikiwand.com/en/articles/Kuladevata"
      },
      {
        "title": "Maharashtra Tourism: Mahalaxmi Temple",
        "url": "https://maharashtratourism.gov.in/?p=8254"
      },
      {
        "title": "History - Mahalaxmi Temple Kolhapur (ambabai.com, devotee site)",
        "url": "https://ambabai.com/history.html"
      },
      {
        "title": "Legends and beliefs associated with Mahalakshmi Temple, Kolhapur (The Statesman)",
        "url": "https://www.thestatesman.com/lifestyle/legends-and-beliefs-associated-with-mahalakshmi-temple-kolhapur-1503111524.html/amp"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Temple location, deity, the Wikipedia 634 CE dating and the festival list are from Wikipedia, The Statesman and ambabai.com. Her general status as a kuladevata in Maharashtra comes only from Wikipedia's list. Which communities, gotras or surnames have her as kuldevi is NOT established by these sources; a family must confirm with its own elders and family priest (kulguru/upadhyay)."
  },
  {
    "slug": "mahur-renuka-devi-temple",
    "temple_slug": "mahur-renuka-devi-temple",
    "name": "Renuka Devi (Renuka Mata), Mahur",
    "kind": "Kuldevi",
    "place": "Mahur (Mahurgad)",
    "district": "Nanded",
    "state": "Maharashtra",
    "communities": [],
    "summary": "Renuka Mata, wife of Sage Jamadagni and mother of Parashurama, is worshipped at Mahur in Nanded district, where Wikipedia records the belief that her head fell. Hindutone says many Maharashtra families worship her as a kuladevata and calls Mahur her pre-eminent shrine in the state.",
    "facts": [
      {
        "label": "Deity",
        "value": "Renuka Mata (Renuka Devi)"
      },
      {
        "label": "Location",
        "value": "Mahur (Mahurgad), Nanded district, Maharashtra; on the first of three hills"
      },
      {
        "label": "Tradition",
        "value": "Wikipedia says it is considered one of the 'three and half' Shakta pithas of Maharashtra"
      },
      {
        "label": "History",
        "value": "Belief: Renuka's head fell here; Parashurama performed last rites under Dattatreya's guidance"
      },
      {
        "label": "Main festivals",
        "value": "Fair at Vijayadashami (Wikipedia, marked citation needed); Mahapuja on Navaratri and Datta Pournima (Wikipedia, not tied explicitly to this temple)"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Mahur, Maharashtra",
        "url": "https://en.wikipedia.org/wiki/Mahur,_Maharashtra"
      },
      {
        "title": "Wikipedia: Kuldevi (regional kuladevata lists)",
        "url": "https://en.wikipedia.org/wiki/Kuldevi"
      },
      {
        "title": "Hindutone: Goddess Renuka Yellamma",
        "url": "https://hindutone.com/hindu-gods/renuka-yellamma-goddess/"
      },
      {
        "title": "Maharashtra Tourism: Mahur",
        "url": "https://maharashtratourism.gov.in/?p=8276"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, legend and festival fair come from Wikipedia; the Maharashtra Tourism page (thin, mostly navigation) only confirms Mahur as a Renuka Devi pilgrimage site; the family-deity role is from a general article and a regional list. No source tying specific communities, gotras or surnames to Mahur was found. Families should confirm with their elders whether their kuldevi is Renuka of Mahur or another Renuka/Yellamma shrine."
  },
  {
    "slug": "osian-temples",
    "temple_slug": "osian-temples",
    "name": "Sachiya Mata Temple, Osian",
    "kind": "Kuldevi",
    "place": "Osian",
    "district": "Jodhpur",
    "state": "Rajasthan",
    "communities": [
      "Oswal"
    ],
    "summary": "Sachiya Mata is the goddess of a hill temple at Osian, the town the Oswal merchant community traces its origin to. Wikipedia says Jain legend links her to Chamunda, whom Acharya Ratnaprabhasuri is said to have persuaded to become vegetarian, after which she became the protecting deity of the Oswal clan; Wikipedia's Oswal article says Oswals regard the temple as a mother temple.",
    "facts": [
      {
        "label": "Deity",
        "value": "Sachiya Mata (Sacchiyay Mata, Osiya Mataji), linked to Chamunda"
      },
      {
        "label": "Location",
        "value": "Hill north-east of the Mahavira Jain temple, Osian, about 60 km from Jodhpur"
      },
      {
        "label": "Tradition",
        "value": "Wikipedia: protecting deity of the Oswal clan; Oswals call it a mother temple. eSamskriti: clan goddess of Oswals and Parmar Rajputs"
      },
      {
        "label": "History",
        "value": "Wikipedia: Jain legend dated ~457 BCE, architecture 8th-10th c. Pratihara period. eSamskriti: temple made in 1177 CE by the Parmars"
      },
      {
        "label": "Main festivals",
        "value": "Not stated in the sources read; eSamskriti mentions newlywed visits and first head-shaving ceremonies"
      }
    ],
    "sources": [
      {
        "title": "Sachiya Mata Temple (Wikipedia)",
        "url": "https://en.wikipedia.org/wiki/Sachiya_Mata_Temple"
      },
      {
        "title": "Oswal (Wikipedia)",
        "url": "https://en.wikipedia.org/wiki/Oswal"
      },
      {
        "title": "Sachiya Mata Temple Osian (eSamskriti, Sanjeev Nayyar)",
        "url": "https://esamskriti.com/a/Rajasthan/Sachiya-Mata-Temple-Osian.aspx"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Oswal association with the temple is supported by two sources (Wikipedia for 'mother temple' and protecting deity, eSamskriti for 'clan goddess'). The Parmar Rajput claim is from eSamskriti only and uncited there. Individual Oswal clans, gotras or surnames were not listed by any source read; families should confirm with elders whether Sachiya Mata is their own kuldevi."
  },
  {
    "slug": "saptashringi-temple",
    "temple_slug": "saptashringi-temple",
    "name": "Saptashrungi Nivasini Devi, Saptashrungi Gad",
    "kind": "Kuldevi",
    "place": "Vani (Nanduri), Kalwan taluka",
    "district": "Nashik",
    "state": "Maharashtra",
    "communities": [],
    "summary": "Saptashrungi is a form of Durga, shown with eighteen arms in the Mahalakshmi iconography, worshipped on a hill range of seven hills near Vani. Wikipedia says some Marathas and Hindu tribes worship her as their kuldaivat, and the shrine is counted as the half Shakta pitha among Maharashtra's three and a half.",
    "facts": [
      {
        "label": "Deity",
        "value": "Saptashrungi Nivasini, a form of Durga"
      },
      {
        "label": "Location",
        "value": "Vani/Nanduri, Kalwan taluka, Nashik district, about 60 km from Nashik"
      },
      {
        "label": "Tradition",
        "value": "Counted as the 'half' Shakta pitha of Maharashtra's three and a half; status as a full pitha is disputed"
      },
      {
        "label": "History",
        "value": "Stone steps reportedly built by Umabai Dabhade in 1710; temple trust formed 1975"
      },
      {
        "label": "Main festivals",
        "value": "Chaitrotsav (Rama Navami to Chaitra Poornima); Navratri and Dussehra"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Saptashrungi",
        "url": "https://en.wikipedia.org/wiki/Saptashrungi"
      },
      {
        "title": "Utsav (Government of India): Shri Saptshrungi Niwasini Devi Temple",
        "url": "https://utsav.gov.in/view-darshan/shri-saptshrungi-niwasini-devi-temple-1"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, deity, festivals and the kuldaivat claim come from Wikipedia; the government Utsav page confirms deity, location and the half-pitha tradition but says nothing on kuldevi or festivals. Community claims rest on one source. Families should confirm with their elders whether this is their kuldevi and which sub-lineage applies."
  },
  {
    "slug": "mangeshi-temple",
    "temple_slug": "mangeshi-temple",
    "name": "Shri Mangesh (Manguesh), Mangeshi Temple",
    "kind": "Kuldevta",
    "place": "Mangeshi, Priol",
    "district": "South Goa",
    "state": "Goa",
    "communities": [],
    "summary": "Mangesh is Shiva worshipped as a linga at Mangeshi village, Priol, in Ponda taluka. According to temple records cited by Wikipedia, the linga was moved from Kushasthali (Cortalim) in 1560 during Portuguese rule. Goud Saraswat Brahmin families, notably per Wikipedia of the Vatsa and Kaundinya gotras, trace their kuladevata tradition to him.",
    "facts": [
      {
        "label": "Deity",
        "value": "Shiva as Manguesh, worshipped as a linga"
      },
      {
        "label": "Location",
        "value": "Mangeshi, Priol, Ponda taluka, Goa; about 21 km from Panaji"
      },
      {
        "label": "Tradition",
        "value": "Wikipedia says the traditional family patrons (Kulavis) belong to the Vatsa and Kaundinya gotras"
      },
      {
        "label": "History",
        "value": "Linga moved from Kushasthali to Priol in 1560 (temple records); Peshwas donated the village in 1739; golden kalasha 1973"
      },
      {
        "label": "Main festivals",
        "value": "Maha Shivaratri, Magha Poornima Jatrotsav, Rama Navami, Navaratri; Monday palanquin procession"
      }
    ],
    "sources": [
      {
        "title": "Mangueshi Temple - Wikipedia",
        "url": "https://en.wikipedia.org/wiki/Mangueshi_Temple"
      },
      {
        "title": "Manguesh Temple - Temple Purohit",
        "url": "https://www.templepurohit.com/?p=9337"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, history and festivals are consistent across both sources. The gotra statement (Vatsa and Koundinya) is from Wikipedia only and is attributed; Temple Purohit only says 'many' Goud Saraswat Brahmins. Families should confirm with their elders whether Mangesh is their kuldevta and which gotra/Kulavi lineage applies, as other Saraswat families have different kuladevatas."
  },
  {
    "slug": "shanta-durga-temple",
    "temple_slug": "shanta-durga-temple",
    "name": "Shri Shantadurga (Santeri), Kavlem",
    "kind": "Kuldevi",
    "place": "Kavlem (Kavale)",
    "district": "South Goa",
    "state": "Goa",
    "communities": [
      "Goud Saraswat Brahmin"
    ],
    "summary": "Shantadurga, also called Santeri, is the goddess of the temple at Kavlem in Ponda taluka, Goa. Her worship moved here from Quelossim (Keloshi) in Salcete after the Portuguese pressure of the 1560s. Many Goud Saraswat Brahmin families trace their family deity to her.",
    "facts": [
      {
        "label": "Deity",
        "value": "Shantadurga (Santeri), mediator between Vishnu and Shiva in local legend"
      },
      {
        "label": "Location",
        "value": "Kavlem village foothill, Ponda taluka, Goa"
      },
      {
        "label": "Tradition",
        "value": "Wikipedia: kuldevi of many Goud Saraswat Brahmin families"
      },
      {
        "label": "History",
        "value": "Moved from Keloshi c.1566; present temple built 1713-1738 per Wikipedia"
      },
      {
        "label": "Main festivals",
        "value": "Magh Shuddha Panchami (Jatrotsav), Navaratri, Mahapanchami palanquin (Wikipedia)"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Shanta Durga Temple",
        "url": "https://en.wikipedia.org/wiki/Shanta_Durga_Temple"
      },
      {
        "title": "Shree Shantadurga temple: About",
        "url": "https://shreeshantadurga.com/temple/"
      },
      {
        "title": "Goa Government: Shanta Durga Temple",
        "url": "https://www.goa.gov.in/places/shanta-durga-temple/"
      },
      {
        "title": "Wikipedia: Kuldevi (Konkan list)",
        "url": "https://en.wikipedia.org/wiki/Kuldevi"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Move from Keloshi c.1566 and the 18th-century construction come from the temple site and Wikipedia; the GSB kuldevi claim is Wikipedia only. Wikipedia's Kuldevi page lists Shantadurga among Konkan kuladevatas by region. No source lists gotras or surnames. Families should confirm with elders whether their kuldevi is Shantadurga at Kavlem or another Shantadurga/Santeri temple."
  },
  {
    "slug": "tulja-bhavani-temple",
    "temple_slug": "tulja-bhavani-temple",
    "name": "Tulja Bhavani (Bhavani Amba), Tuljapur",
    "kind": "Kuldevi",
    "place": "Tuljapur",
    "district": "Dharashiv (formerly Osmanabad)",
    "state": "Maharashtra",
    "communities": [
      "Maratha clans (unspecified)",
      "Other Marathi castes (unspecified)"
    ],
    "summary": "Tulja Bhavani is worshipped at Tuljapur in Dharashiv district, on the Yamunachala hill. Wikipedia, citing Pattanaik, calls her the kuldevi of many Maratha clans, and, citing ul Hassan, says she is revered by or is the family deity of many other Marathi castes. Which specific clans or families is not listed.",
    "facts": [
      {
        "label": "Deity",
        "value": "Bhavani (Amba Bhavani), a form of Durga; the goddess is said to be swayambhu (self-manifested)"
      },
      {
        "label": "Location",
        "value": "Tuljapur, Dharashiv district, Maharashtra; about 45 km from Solapur"
      },
      {
        "label": "Tradition",
        "value": "Counted among the 51 Shakti Pithas (per Wikipedia); kuldevi of many Maratha clans"
      },
      {
        "label": "History",
        "value": "Wikipedia says built in the 12th century CE by Mahamandaleshwara Maradadeva of the Kadamb dynasty"
      },
      {
        "label": "Main festivals",
        "value": "Navaratri, Dussehra; also Ganesh Chaturthi, Holi, Diwali (Wikipedia infobox)"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Tulja Bhavani Temple",
        "url": "https://en.wikipedia.org/wiki/Tulja_Bhavani_Temple"
      },
      {
        "title": "Hindutone: Tulja Bhavani Temple, Tuljapur (secondary, unverified)",
        "url": "https://hindutone.com/temples/tulja-bhavani-temple-tuljapur-shakti-peetha/"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location, deity and the 12th-century Kadamb attribution come from Wikipedia (which cites Pattanaik, ul Hassan and Bansal) and the Hindutone page agrees on location and builder. Which specific clans, surnames or gotras have Tulja Bhavani as kuldevi is not listed in either source, so families should confirm with their own elders and family priest."
  },
  {
    "slug": "yogeshwari-devi-temple-ambajogai",
    "temple_slug": "yogeshwari-devi-temple-ambajogai",
    "name": "Yogeshwari Devi (Jogai), Ambajogai",
    "kind": "Kuldevi",
    "place": "Ambajogai",
    "district": "Beed",
    "state": "Maharashtra",
    "communities": [
      "Chitpavan Brahmin",
      "96-kuli Maratha"
    ],
    "summary": "Yogeshwari, also called Jogai, is a form of Durga whose temple gives Ambajogai its name. Wikipedia says many Chitpavan Brahmin and 96-kuli Maratha families regard her as kuladevi, and Puratattva ties the Chitpavan connection to a Parashurama legend.",
    "facts": [
      {
        "label": "Deity",
        "value": "Yogeshwari (Jogai), a form of Durga; name derives from Yoga-Ishwari"
      },
      {
        "label": "Location",
        "value": "Ambajogai, Beed district, Maharashtra"
      },
      {
        "label": "Tradition",
        "value": "Local belief says Amba appeared here to defeat the demon Dantasura"
      },
      {
        "label": "History",
        "value": "Wikipedia says the town's temples point to prosperity dating to the 10th century CE"
      }
    ],
    "sources": [
      {
        "title": "Wikipedia: Ambajogai",
        "url": "https://en.wikipedia.org/wiki/Ambajogai"
      },
      {
        "title": "Wikipedia: Yogeshvari",
        "url": "https://en.wikipedia.org/wiki/Yogeshvari"
      },
      {
        "title": "Puratattva: Ambajogai, Kuladevi of Chitpavan Brahmins",
        "url": "https://www.puratattva.in/ambajogai-kuladevi-of-chitpavan-brahmins/"
      },
      {
        "title": "Yatradham blog: Ambajogai Yogeshwari Temple",
        "url": "https://blog.yatradham.org/ambajogai-yogeshwari-temple-timings/"
      },
      {
        "title": "Wikipedia: Limaye",
        "url": "https://en.wikipedia.org/wiki/Limaye"
      }
    ],
    "confidence": "sourced",
    "confidenceNote": "Location and the kuldevi-of-many-families claim are supported by several pages; Chitpavan is supported by Wikipedia (Yogeshvari), Puratattva and Yatradham, and 96-kuli Maratha by Wikipedia only. Other communities named only by a single blog are not entered. Families should confirm with their elders."
  },
]

export const getKuldevi = (slug: string) => KULDEVI.find(k => k.slug === slug)
