import type { Metadata } from 'next'
import RecommendTemplePage from './RecommendTemplePage'

export const metadata: Metadata = {
  title: 'Recommend a Temple — DivyaDarshanam',
  description: 'Know a sacred temple not in our directory? Recommend it and help pilgrims discover it.',
}

export default function Page() {
  return <RecommendTemplePage />
}
