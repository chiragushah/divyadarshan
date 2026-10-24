// Curated kuldevi / kuldevta entries. Every entry states where its facts come from and how sure we are.
// Rule: nothing is written here that a source or the family did not say.

export interface KuldeviEntry {
  slug: string
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
    name: 'Kotyark Dham (Bhagwan Kotyark Prabhu)',
    kind: 'Community kuldaivat',
    place: 'Umreth',
    district: 'Anand',
    state: 'Gujarat',
    communities: ['Khadayata'],
    summary:
      'A sun temple on the Umreth–Dakor road, described as the kuldaivat (family deity) of the Khadayata community. The deity is regarded as a combined form of Vishnu and Surya Narayan. The temple also has a Durga Mata shrine that houses 19 kuldevis, representing the community’s 7 Brahmin and 12 Vanik gotras.',
    facts: [
      { label: 'Deity', value: 'Bhagwan Kotyark Prabhu — a combined form of Vishnu and Surya Narayan.' },
      { label: 'Location', value: 'On the Umreth–Dakor road, Umreth taluka, Anand district; about 4 km from Umreth bus station and 30 km from Anand city.' },
      { label: 'Kuldevis on the grounds', value: 'A Durga Mata shrine houses 19 kuldevis for the community’s 7 Brahmin and 12 Vanik gotras, with a metal Durga idol on a lion at the centre.' },
      { label: 'Sun temple', value: 'Described as a rare sun temple on the Tropic of Cancer, where sunlight enters the sanctum at noon on 21 June.' },
      { label: 'Tradition and the building', value: 'The deity is linked to the Kotyark Mahatmya in the Padma Purana. The present temple is new: construction began on 28 April 2017 and it was completed around 2022.' },
      { label: 'Temple office', value: 'Mobile 8849100296 (as listed on the source page; please confirm before travelling).' },
    ],
    timings: [
      { label: 'Mangala Aarti', value: '7:15 – 8:15 am' },
      { label: 'Shringar', value: '10:00 – 11:00 am' },
      { label: 'Rajbhog Aarti', value: '11:45 am – 1:00 pm' },
      { label: 'Utthapan', value: '4:15 – 4:30 pm' },
      { label: 'Sandhya Puja', value: '4:45 – 5:45 pm' },
      { label: 'Shayan', value: '6:15 – 7:15 pm' },
      { label: 'Darshan', value: '7:15 am – 1:00 pm and 4:00 – 7:15 pm, daily' },
    ],
    sources: [
      { title: 'PilgrimData — Kotyark Dham Temple, Umreth', url: 'https://pilgrimdata.in/temple/kotyark-dham-temple-umreth-tal-umreth-dist-anand/' },
    ],
    confidence: 'sourced',
    confidenceNote:
      'Based on one directory page. Timings, contact number and the list of gotras should be confirmed with the temple trust or a community elder before you travel.',
    related: ['gunmai-devi-maudi'],
  },
  {
    slug: 'gunmai-devi-maudi',
    name: 'Gunmai Devi',
    kind: 'Kuldevi',
    place: 'Maudi',
    district: 'Not yet confirmed',
    state: 'Gujarat',
    communities: ['Khadayata (Daudan)'],
    summary:
      'Gunmai Devi is the kuldevi of a Khadayata (Daudan) family, whose seat is at Maudi in Gujarat. We could not find any published source for this temple, so this page holds only what the family told us. It is the first entry of the Kuldevi directory, which depends on families sharing what they know.',
    facts: [
      { label: 'Deity', value: 'Gunmai Devi (spelling as given by the family).' },
      { label: 'Place', value: 'Maudi, Gujarat. Taluka and district are yet to be confirmed.' },
      { label: 'Community', value: 'Khadayata, Daudan (as given by the family).' },
      { label: 'Link to Kotyark Dham', value: 'The Khadayata community’s common kuldaivat is at Kotyark Dham, Umreth. Whether Gunmai Devi is one of the 19 kuldevis there has not been confirmed.' },
    ],
    sources: [{ title: 'Shared by a Khadayata family — not yet independently verified' }],
    confidence: 'family-shared',
    confidenceNote:
      'Family-shared and unverified. If you know this temple, please add what you know — the exact village location, customs and how to reach it.',
    related: ['kotyark-dham-umreth'],
  },
]

export const getKuldevi = (slug: string) => KULDEVI.find(k => k.slug === slug)
