'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

// Google Translate rewrites DOM including hidden CSRF inputs.
// Auth pages must never be translated â€” it breaks NextAuth sign-in.
const SKIP_PATHS = ['/auth/signin', '/auth/signup', '/auth/error', '/auth/verify']

export default function GoogleTranslate() {
  const pathname = usePathname()

  useEffect(() => {
    if (SKIP_PATHS.some(p => pathname?.startsWith(p))) {
      // Clean up widget and clear googtrans cookie on auth pages
      const el = document.getElementById('google_translate_element')
      if (el) el.innerHTML = ''
      const existing = document.getElementById('google-translate-script')
      if (existing) existing.remove()
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname
      return
    }

    const existingScript = document.getElementById('google-translate-script')
    if (existingScript) return

    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'hi,bn,gu,mr,ta,te,kn,ml,pa,or,as,ur,sa,ne,kok,sd,mni',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true,
        }, 'google_translate_element')
      }
    }

    const script = document.createElement('script')
    script.id    = 'google-translate-script'
    script.src   = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [pathname])

  if (SKIP_PATHS.some(p => pathname?.startsWith(p))) return null

  return (
    <>
      <div id="google_translate_element" style={{ display: 'inline-flex', alignItems: 'center' }} />
      <style>{`
        .goog-te-gadget {
          font-family: 'Inter', sans-serif !important;
          font-size: 13px !important;
          color: #6B5B4E !important;
        }
        .goog-te-gadget-simple {
          background: white !important;
          border: 1.5px solid #E8E0D4 !important;
          border-radius: 8px !important;
          padding: 5px 10px !important;
          font-size: 12px !important;
          cursor: pointer !important;
        }
        .goog-te-gadget-simple .goog-te-menu-value span {
          color: #6B5B4E !important;
        }
        .goog-te-gadget-simple .goog-te-menu-value span:last-child {
          display: none !important;
        }
        .goog-te-gadget img { display: none !important; }
        .goog-te-banner-frame { display: none !important; }
        iframe.skiptranslate { display: none !important; }
        body { top: 0 !important; position: static !important; }
        .goog-te-menu-frame {
          border-radius: 12px !important;
          border: 1.5px solid #E8E0D4 !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
          overflow: hidden !important;
        }
        .goog-te-menu2 { border-radius: 12px !important; }
        .goog-te-menu2-item div {
          font-family: 'Inter', sans-serif !important;
          font-size: 13px !important;
          padding: 8px 16px !important;
        }
        .goog-te-menu2-item:hover div {
          background: #FFF5F5 !important;
          color: #8B1A1A !important;
        }
      `}</style>
    </>
  )
}
