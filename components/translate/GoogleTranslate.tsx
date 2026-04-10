'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
declare global { interface Window { googleTranslateElementInit?: () => void; google?: any } }
const SKIP_PATHS = ['/auth/signin', '/auth/signup', '/auth/error', '/auth/verify']
export default function GoogleTranslate() {
  const pathname = usePathname()
  useEffect(() => {
    if (SKIP_PATHS.some(p => pathname?.startsWith(p))) {
      const el = document.getElementById('google_translate_element')
      if (el) el.innerHTML = ''
      const ex = document.getElementById('google-translate-script')
      if (ex) ex.remove()
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      return
    }
    if (document.getElementById('google-translate-script')) return
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'hi,bn,gu,mr,ta,te,kn,ml,pa,or,as,ur,sa', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element')
      }
    }
    const s = document.createElement('script')
    s.id = 'google-translate-script'
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    s.async = true
    document.body.appendChild(s)
  }, [pathname])
  if (SKIP_PATHS.some(p => pathname?.startsWith(p))) return null
  return (<><div id="google_translate_element" /><style>{'.goog-te-banner-frame{display:none!important}iframe.skiptranslate{display:none!important}body{top:0px!important}.goog-te-gadget-simple{background:transparent!important;border:1px solid #e5e7eb!important;border-radius:6px!important;padding:4px 8px!important;font-size:12px!important}.goog-te-gadget img{display:none!important}.goog-te-gadget-simple .goog-te-menu-value span:last-child{display:none!important}'}</style></>) }
