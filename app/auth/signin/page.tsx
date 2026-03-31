import { Suspense } from 'react'
import SignInForm from './SignInForm'

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{background:'linear-gradient(135deg,#1A0303,#3D0808)'}}><div className="text-white">Loading...</div></div>}>
      <SignInForm />
    </Suspense>
  )
}
