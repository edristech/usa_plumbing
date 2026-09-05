import { ArrowRight, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Button({ children, to, variant = 'primary', phone = false, type = 'button', disabled = false }) {
  const className = `inline-flex items-center justify-center gap-2 border px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variant === 'primary' ? 'border-copper bg-copper text-white hover:bg-copper-dark' : variant === 'dark' ? 'border-ink bg-ink text-white hover:bg-ink-soft' : 'border-line bg-white text-ink hover:border-copper hover:text-copper'}`
  const content = <>{phone ? <Phone size={16} aria-hidden="true" /> : <ArrowRight size={16} aria-hidden="true" />}{children}</>
  if (to) return <Link className={className} to={to}>{content}</Link>
  return <button className={className} type={type} disabled={disabled}>{content}</button>
}