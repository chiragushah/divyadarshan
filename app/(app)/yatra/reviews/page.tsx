export const dynamic = 'force-dynamic'
import { redirect } from 'next/navigation'

// Reviews are on individual temple pages
// Redirect to explore
export default function ReviewsPage() {
  redirect('/explore')
}
