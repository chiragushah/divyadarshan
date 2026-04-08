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
    // Remove any existing script
    const existingScript = document.getElementById('google-translate-script')
    if (existingScript) existingScript.remove()

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
    script.id = 'google-translate-script'
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <div id="google_translate_element" style={{ display: 'inline-flex', alignItems: 'center' }} />
      <style>{`
        /* Clean up Google Translate widget styling */
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
        .goog-te-gadget img {
          display: none !important;
        }
        /* Hide the top bar Google adds */
        .goog-te-banner-frame {
          display: none !important;
        }
        body {
          top: 0 !important;
        }
        /* Style the dropdown */
        .goog-te-menu-frame {
          border-radius: 12px !important;
          border: 1.5px solid #E8E0D4 !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12) !important;
          overflow: hidden !important;
        }
        .goog-te-menu2 {
          border-radius: 12px !important;
        }
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
