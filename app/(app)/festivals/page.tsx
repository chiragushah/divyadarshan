import type { Metadata } from 'next'
import { FESTIVALS } from '@/lib/data/festivals'
import FestivalsClient from './FestivalsClient'

export const metadata: Metadata = {
  title: 'Festivals of India — Significance, Rituals & Temples | DivyaDarshanam',
  description:
    'A detailed guide to the festivals of India — their significance, how they are celebrated, the food and prasad, dances, the deity worshipped and the temples to visit for each.',
}

export default function FestivalsPage() {
  // Pass the full dataset to the client for interactive filtering (static, in-repo).
  return <FestivalsClient festivals={FESTIVALS} />
}
