'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/explore'
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogle = async () => {
    setGoogleLoading(true)
    await signIn('google', { callbackUrl })
  }

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.email || !form.password) return
    setLoading(true); setError('')
    const res = await signIn('credentials', {
      email: form.email, password: form.password,
      name: form.name, mode,
      redirect: false,
    })
    if (res?.error) {
      setError(mode === 'signin' ? 'Invalid email or password.' : 'Could not create account. Email may already be in use.')
      setLoading(false)
    } else {
      router.push(callbackUrl)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, var(--crim-dk), var(--crimson))' }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="font-serif text-3xl font-medium" style={{ color: 'var(--ivory)' }}>DivyaDarshan</div>
            <div className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(237,224,196,.5)' }}>Temple Explorer</div>
          </Link>
        </div>

        <div className="card card-p">
          {/* Mode toggle */}
          <div className="flex rounded-lg overflow-hidden mb-6 p-1" style={{ background: 'var(--ivory2)' }}>
            {(['signin', 'signup'] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                className="flex-1 py-2 text-sm font-medium rounded-md transition-all"
                style={{
                  background: mode === m ? 'var(--white)' : 'transparent',
                  color: mode === m ? 'var(--ink)' : 'var(--muted)',
                  boxShadow: mode === m ? 'var(--sh1)' : 'none',
                }}>
                {m === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg text-sm" style={{ background: '#FFF0F0', color: 'var(--live)', border: '1px solid #FFCDD2' }}>
              {error}
            </div>
          )}

          {/* Google */}
          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl text-sm font-medium border transition-all mb-4"
            style={{ borderColor: 'var(--border)', background: 'var(--white)', color: 'var(--ink)' }}>
            {googleLoading ? <Loader2 size={16} className="animate-spin" /> : (
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            Continue with Google
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" style={{ borderColor: 'var(--border)' }} />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 text-xs" style={{ background: 'var(--white)', color: 'var(--muted2)' }}>or continue with email</span>
            </div>
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} className="space-y-3">
            {mode === 'signup' && (
              <div>
                <label className="label">Name</label>
                <input className="input" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              </div>
            )}
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={8} />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary w-full mt-4">
              {loading ? <><Loader2 size={15} className="animate-spin" /> Please wait…</> : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-5 text-xs" style={{ color: 'var(--muted2)' }}>
            By continuing, you agree to our{' '}
            <Link href="/terms" className="underline" style={{ color: 'var(--crimson)' }}>Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="underline" style={{ color: 'var(--crimson)' }}>Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center mt-4 text-xs" style={{ color: 'rgba(237,224,196,.4)' }}>
          <Link href="/" style={{ color: 'rgba(237,224,196,.5)' }}>← Back to home</Link>
        </p>
      </div>
    </div>
  )
}
