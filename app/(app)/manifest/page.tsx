import type { Metadata } from 'next'
import ManifestLanding from './ManifestLanding'

export const metadata: Metadata = {
  title: 'Manifest — Sacred Sankalp | DivyaDarshanam',
  description: 'Write your sacred intention. Dedicated to your deity. Guided by ancient Sankalp tradition. Deity shlokas, Navagraha mantras and a private intention journal.',
}

export default function Page() {
  return <ManifestLanding />
}
