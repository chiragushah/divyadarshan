# DivyaDarshan - Fix emoji encoding + Google Translate
# Paste and run this entire block in PowerShell

$PROJECT = "C:\Users\chira\Downloads\divyadarshan"
Set-Location $PROJECT

Write-Host "Writing GoogleTranslate.tsx..." -ForegroundColor Yellow

$content = @'
'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    googleTranslateElementInit?: () => void
    google?: any
  }
}

const SKIP_PATHS = ['/auth/signin', '/auth/signup', '/auth/error', '/auth/verify']

export default function GoogleTranslate() {
  const pathname = usePathname()

  useEffect(() => {
    if (SKIP_PATHS.some(p => pathname?.startsWith(p))) {
      const el = document.getElementById('google_translate_element')
      if (el) el.innerHTML = ''
      const existing = document.getElementById('google-translate-script')
      if (existing) existing.remove()
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname
      return
    }

    if (document.getElementById('google-translate-script')) return

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
      <div id="google_translate_element" />
      <style>{`
        .goog-te-gadget { font-family: inherit !important; font-size: 12px !important; color: var(--muted) !important; }
        .goog-te-gadget-simple {
          background: transparent !important;
          border: 1px solid var(--border) !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
          font-size: 12px !important;
          cursor: pointer !important;
        }
        .goog-te-gadget-simple .goog-te-menu-value span { color: var(--muted) !important; }
        .goog-te-gadget-simple .goog-te-menu-value span:last-child { display: none !important; }
        .goog-te-gadget img { display: none !important; }
        .goog-te-banner-frame { display: none !important; }
        iframe.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        .goog-te-menu-frame {
          border-radius: 10px !important;
          border: 1px solid var(--border) !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important;
          overflow: hidden !important;
        }
        .goog-te-menu2 { border-radius: 10px !important; }
        .goog-te-menu2-item div { font-size: 13px !important; padding: 8px 14px !important; }
        .goog-te-menu2-item:hover div { background: #FFF5F5 !important; color: #8B1A1A !important; }
      `}</style>
    </>
  )
}
'@

$targetPath = "$PROJECT\components\translate\GoogleTranslate.tsx"
$utf8NoBOM  = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($targetPath, $content, $utf8NoBOM)
Write-Host "   OK - GoogleTranslate.tsx written" -ForegroundColor Green

Write-Host "`nFixing tab labels in ExploreClient.tsx..." -ForegroundColor Yellow

# Just patch the TABS array in the existing file - safer than rewriting whole file
$explorePath = "$PROJECT\app\(app)\explore\ExploreClient.tsx"
$explore = [System.IO.File]::ReadAllText($explorePath)

# Replace the broken tab labels (garbled emoji) with clean text labels
$explore = $explore -replace "const TABS = \[[\s\S]*?\]", @"
const TABS = [
  { id: 'directory', label: 'All Temples' },
  { id: 'darshan',   label: '🔴 Live Darshan' },
  { id: 'nearby',    label: '📍 Nearby' },
  { id: 'seasonal',  label: '📅 This Month' },
]
"@

[System.IO.File]::WriteAllText($explorePath, $explore, $utf8NoBOM)
Write-Host "   OK - Tab labels fixed" -ForegroundColor Green

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
git add "components\translate\GoogleTranslate.tsx"
git add "app\(app)\explore\ExploreClient.tsx"
git commit -m "fix: UTF8 no BOM, Google Translate position, tab emoji labels"
git push

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host " DONE - Vercel deploying in ~2 mins" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
