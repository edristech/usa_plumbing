import { Eye, EyeOff, LockKeyhole, LogIn, Mail } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext.jsx'

export default function AdminLogin() {
  const { admin, checking, login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (checking) return <AdminLoading />
  if (admin) return <Navigate to="/admin" replace />

  const submit = async (event) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || !password) {
      setError('Enter a valid email and password.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await login(normalizedEmail, password)
      navigate(location.state?.from?.pathname || '/admin', { replace: true })
    } catch (loginError) {
      setError(loginError.status === 401
        ? 'Invalid email or password'
        : loginError.status === 429
          ? 'Too many sign-in attempts. Please wait a few minutes and try again.'
          : 'Unable to sign in right now. Please try again.')
    } finally { setLoading(false) }
  }

  return <main className="flex min-h-screen items-center justify-center bg-ink px-5 py-12"><div className="w-full max-w-md border border-white/10 bg-white p-8 shadow-2xl sm:p-10"><div className="mb-9"><p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">USA Plumbing Service</p><h1 className="mt-3 font-display text-4xl font-semibold text-ink">Admin sign in</h1><p className="mt-3 text-sm leading-6 text-muted">Access service requests and keep the team moving.</p></div><form className="grid gap-5" onSubmit={submit} noValidate>{error && <div className="border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</div>}<label className="grid gap-2 text-sm font-semibold text-ink">Email<div className="flex items-center border border-line px-3 focus-within:border-copper"><Mail size={17} className="text-muted" aria-hidden="true" /><input className="min-w-0 flex-1 border-0 px-3 py-3 outline-none" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></div></label><label className="grid gap-2 text-sm font-semibold text-ink">Password<div className="flex items-center border border-line px-3 focus-within:border-copper"><LockKeyhole size={17} className="text-muted" aria-hidden="true" /><input className="min-w-0 flex-1 border-0 px-3 py-3 outline-none" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /><button type="button" className="p-2 text-muted hover:text-ink" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label><button className="inline-flex items-center justify-center gap-2 bg-copper px-5 py-3.5 text-sm font-bold text-white transition hover:bg-copper-dark disabled:cursor-not-allowed disabled:opacity-60" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}<LogIn size={16} aria-hidden="true" /></button></form></div></main>
}

export function AdminLoading() { return <main className="flex min-h-screen items-center justify-center bg-paper text-sm font-semibold text-muted">Checking admin session...</main> }
