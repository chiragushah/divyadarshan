export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import ExploreClient from './ExploreClient'

export const metadata: Metadata = {
  title: 'Explore Temples — DivyaDarshan',
  description: 'Browse 350+ sacred Hindu temples across India. Filter by deity, state, circuit and more.',
}

interface Props {
  searchParams: { q?: string; state?: string; deity?: string; category?: string; live?: string; page?: string; tab?: string }
}

export default async function ExplorePage({ searchParams }: Props) {
  await connectDB()

  const page  = parseInt(searchParams.page || '1')
  const limit = 48
  const skip  = (page - 1) * limit

  const filter: Record<string, any> = {}
  if (searchParams.q)        filter.$or = [
    { name:  { $regex: searchParams.q, $options: 'i' } },
    { city:  { $regex: searchParams.q, $options: 'i' } },
    { deity: { $regex: searchParams.q, $options: 'i' } },
  ]
  if (searchParams.state)    filter.state      = searchParams.state
  if (searchParams.deity)    filter.deity      = { $regex: searchParams.deity, $options: 'i' }
  if (searchParams.category) filter.categories = searchParams.category
  if (searchParams.live === 'true') filter.has_live = true

  const [temples, total] = await Promise.all([
    Temple.find(filter).sort({ name: 1 }).skip(skip).limit(limit).lean() as any,
    Temple.countDocuments(filter),
  ])

  // Get unique states for filter dropdown
  const allStates = await Temple.distinct('state')
  const states = allStates.sort()

  const data = temples.map((t: any) => ({ ...t, id: t._id.toString() }))

  return (
    <ExploreClient
      initialTemples={data as any}
      total={total}
      page={page}
      states={states}
      activeFilters={searchParams}
    />
  )
}
