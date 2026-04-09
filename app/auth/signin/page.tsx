import GoogleTranslate from '@/components/translate/GoogleTranslate'
import { Suspense } from 'react'
import SignInForm from './SignInForm'

export default function SignInPage() {
  return (
    <>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 50 }}><GoogleTranslate /></div>
      <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1A0303, #3D0808)',
        fontFamily: 'sans-serif',
        color: 'rgba(237,224,196,.6)',
        fontSize: '14px',
        letterSpacing: '.05em'
      }}>
        Loading…
      </div>
    }>
      <SignInForm />
    </Suspense>
    </>
  )
}
