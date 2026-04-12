// Fix Google Translate - targeted fix only
// Does NOT touch Navbar, ExploreClient, or any other file
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const P = 'C:\\Users\\chira\\Downloads\\divyadarshanam'

// ── 1. Remove unused GoogleTranslate import from layout.tsx ──
console.log('[1/2] Cleaning layout.tsx...')
let layout = fs.readFileSync(path.join(P, 'app/layout.tsx'), 'utf8')
// Remove the dynamic import line - it's unused and conflicts with Navbar import
layout = layout.replace(
  `import dynamic from 'next/dynamic'\nconst GoogleTranslate = dynamic(() => import('@/components/translate/GoogleTranslate'), { ssr: false })\n`,
  ''
)
// Also try without the dynamic import line if already removed
layout = layout.replace(
  `const GoogleTranslate = dynamic(() => import('@/components/translate/GoogleTranslate'), { ssr: false })\n`,
  ''
)
fs.writeFileSync(path.join(P, 'app/layout.tsx'), layout, 'utf8')
console.log('  OK')

// ── 2. Rewrite GoogleTranslate.tsx - clean, working version ──
console.log('[2/2] Rewriting GoogleTranslate.tsx...')

const component = `'use client'
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
      <style>{\`
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
      \`}</style>
    </>
  )
}
`

fs.writeFileSync(
  path.join(P, 'components/translate/GoogleTranslate.tsx'),
  component,
  'utf8'
)
console.log('  OK')

// ── Push ─────────────────────────────────────────────────────
process.chdir(P)
execSync('git add "app/layout.tsx" "components/translate/GoogleTranslate.tsx"', { stdio: 'inherit' })
execSync('git commit -m "fix: google translate - remove double import, fix dropdown CSS"', { stdio: 'inherit' })
execSync('git push', { stdio: 'inherit' })
console.log('\nDone! Vercel deploying in ~2 mins.')
