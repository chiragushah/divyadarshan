'use client'
import { useEffect } from 'react'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Don't load twice
    if (document.getElementById('google-translate-script')) return

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'hi,bn,gu,mr,ta,te,kn,ml,pa,or,as,ur,sa',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true,
        },
        'google_translate_element'
      )
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <div id="google_translate_element" />
      <style>{`
        /* Hide the annoying top banner Google injects */
        .goog-te-banner-frame { display: none !important; }
        body { top: 0px !important; }

        /* Style the Select Language button */
        .goog-te-gadget { font-family: inherit !important; }
        .goog-te-gadget-simple {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 6px !important;
          padding: 4px 10px !important;
          font-size: 13px !important;
          cursor: pointer !important;
          white-space: nowrap !important;
        }
        .goog-te-gadget-simple .goog-te-menu-value span {
          color: #555 !important;
        }
        /* Hide the Google logo text */
        .goog-te-gadget-simple .goog-te-menu-value span:last-child {
          display: none !important;
        }
        .goog-te-gadget img { display: none !important; }
      `}</style>
    </>
  )
}
