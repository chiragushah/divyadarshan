import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import { SessionProvider } from './providers'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DivyaDarshan — India\'s Temple Explorer',
    template: '%s | DivyaDarshan',
  },
  description: 'Discover 350+ sacred temples across India. Plan your yatra with AI, track savings, log pilgrimages. Your complete pilgrimage companion.',
  keywords: ['temples india', 'yatra planner', 'pilgrimage guide', 'hindu temples', 'temple darshan', 'divyadarshan'],
  authors: [{ name: 'DivyaDarshan' }],
  creator: 'DivyaDarshan',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://divyadarshan.in',
    siteName: 'DivyaDarshan',
    title: 'DivyaDarshan — India\'s Temple Explorer',
    description: 'Discover 350+ sacred temples. Plan your yatra with AI.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DivyaDarshan',
    description: 'India\'s Temple Explorer & Yatra Planner',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="bg-ivory-100 text-gray-900 antialiased">
        <SessionProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                borderRadius: '6px',
              },
              success: { iconTheme: { primary: '#3D0808', secondary: '#FAF7F2' } },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  )
}
