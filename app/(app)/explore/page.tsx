export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import connectDB from '@/lib/mongodb/connect'
import { Temple } from '@/models'
import ExploreClient from './ExploreClient'

export const metadata: Metadata = {
  title: 'Explore Temples — DivyaDarshanam',
  description: 'Browse 294+ sacred temples across India. Filter by deity, state, live darshan and more.',
}

interface Props {
  searchParams: { q?: string; state?: string; deity?: string; category?: string; live?: string; page?: string; tab?: string; religion?: string }
}

export default async function ExplorePage({ searchParams }: Props) {
  await connectDB()

  const page  = parseInt(searchParams.page || '1')
  const limit = 48
  const skip  = (page - 1) * limit

  const filter: Record<string, any> = {}
  if (searchParams.q)     filter.$or = [
    { name:  { $regex: searchParams.q, $options: 'i' } },
    { city:  { $regex: searchParams.q, $options: 'i' } },
    { state: { $regex: searchParams.q, $options: 'i' } },
    { deity: { $regex: searchParams.q, $options: 'i' } },
    { type:  { $regex: searchParams.q, $options: 'i' } },
  ]
  if (searchParams.state)    filter.state      = searchParams.state
  if (searchParams.deity)    filter.deity      = { $regex: searchParams.deity, $options: 'i' }
  if (searchParams.category) filter.categories = searchParams.category
  if (searchParams.live === 'true') filter.has_live = true
  // ← FIX: Live Darshan tab also filters by has_live
  if (searchParams.tab === 'darshan') filter.has_live = true
  // Religion filter
  if (searchParams.religion) {
    const r = searchParams.religion
    const religionFilters: Record<string, any> = {
      hindu:       { type: { $nin: ['Jain', 'Jain Temple', 'Buddhist', 'Sikh'] } },
      shaiva:      { $or: [{ deity: { $regex: 'Shiva|Shankar|Mahadev|Lingam', $options: 'i' } }, { type: { $in: ['Jyotirlinga', 'Panch Kedar', 'Pancha Bhuta', 'Navagraha'] } }] },
      vaishnava:   { $or: [{ deity: { $regex: 'Vishnu|Krishna|Rama|Balaji|Narayan|Jagannath|Vitthal|Vithoba', $options: 'i' } }, { type: { $in: ['Divya Desam', 'Char Dham'] } }] },
      shakta:      { $or: [{ deity: { $regex: 'Durga|Shakti|Devi|Kali|Parvati|Mata|Bhavani|Kamakshi|Meenakshi|Amba|Chamunda', $options: 'i' } }, { type: 'Shakti Peetha' }] },
      ganapatya:   { deity: { $regex: 'Ganesha|Ganapati|Vinayak', $options: 'i' } },
      saura:       { deity: { $regex: 'Surya|Sun', $options: 'i' } },
      skanda:      { deity: { $regex: 'Murugan|Kartikeya|Skanda|Subramanya', $options: 'i' } },
      nath:        { type: 'Nath Sampradaya' },
      ramakrishna: { type: 'Ramakrishna' },
      iskcon:      { deity: { $regex: 'Krishna|ISKCON', $options: 'i' } },
      smarta:      { type: { $in: ['Mixed', 'Folk Deity'] } },
      jain:        { $or: [{ type: { $in: ['Jain', 'Jain Temple'] } }, { categories: { $regex: 'Jain', $options: 'i' } }] },
      buddhist:    { $or: [{ type: 'Buddhist' }, { categories: { $regex: 'Buddha', $options: 'i' } }] },
      sikh:        { type: 'Sikh' },
      swaminarayan: { $or: [{ deity: { $regex: 'Swaminarayan|Sahajanand', $options: 'i' } }, { type: { $regex: 'Swaminarayan', $options: 'i' } }] },
    }
    if (religionFilters[r]) Object.assign(filter, religionFilters[r])
  }

  const [temples, total] = await Promise.all([
    Temple.find(filter).sort({ name: 1 }).skip(skip).limit(limit).lean() as any,
    Temple.countDocuments(filter),
  ])

  const allStates = await Temple.distinct('state')
  const data = temples.map((t: any) => ({ ...t, id: t._id.toString() }))

  return (
    <ExploreClient
      initialTemples={data as any}
      total={total}
      page={page}
      states={allStates.sort()}
      activeFilters={searchParams}
    />
  )
}
