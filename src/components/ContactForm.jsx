import { AlertCircle, CheckCircle2, Phone } from 'lucide-react'
import { useState } from 'react'
import { services } from '../data/services.js'
import Button from './Button.jsx'

const initialValues = { name: '', phone: '', email: '', service: '', date: '', time: '', message: '', emergency: false }
const apiUrl = import.meta.env.VITE_API_URL

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  if (!values.email.trim()) errors.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (!values.service) errors.service = 'Please select a service.'
  if (!values.message.trim()) errors.message = 'Please tell us a little about the plumbing issue.'
  return errors
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [requestState, setRequestState] = useState('idle')
  const [requestError, setRequestError] = useState('')

  const update = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setRequestState('idle')
    setRequestError('')
  }

  const submit = async (event) => {
    event.preventDefault()
    if (requestState === 'loading') return
    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setRequestState('loading')
    setRequestError('')

    try {
      const response = await fetch(`${apiUrl}/api/service-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          service: values.service,
          preferred_date: values.date,
          preferred_time: values.time,
          message: values.message,
          emergency: values.emergency,
        }),
      })

      if (response.status === 201) {
        setValues(initialValues)
        setErrors({})
        setRequestState('success')
        return
      }

      setRequestState('error')
      setRequestError(response.status === 400
        ? 'Please review your information and try again.'
        : 'We could not submit your request right now. Please try again later.')
    } catch {
      setRequestState('error')
      setRequestError('We could not connect to our service. Please check your connection and try again.')
    }
  }

  if (requestState === 'success') return <div className="border border-green-200 bg-green-50 p-7" role="status" aria-live="polite"><CheckCircle2 className="text-green-700" size={24} aria-hidden="true" /><h2 className="mt-4 font-display text-2xl font-semibold text-ink">Thank you. Your service request was received.</h2><p className="mt-2 text-sm leading-6 text-muted">Our team will review your request and contact you shortly.</p><button type="button" className="mt-6 text-sm font-bold text-copper focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2" onClick={() => { setValues(initialValues); setErrors({}); setRequestState('idle') }}>Request another service</button></div>

  return <form onSubmit={submit} className="grid gap-5" noValidate aria-describedby="form-note">
    {Object.keys(errors).length > 0 && <div className="flex gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" /><span>Please review the highlighted fields below.</span></div>}
    {requestState === 'error' && <div className="flex gap-3 border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" /><span>{requestError}</span></div>}
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Full Name" name="name" value={values.name} onChange={update} error={errors.name} placeholder="Your full name" required /><Field label="Phone Number" name="phone" value={values.phone} onChange={update} error={errors.phone} placeholder="909-623-0033" required /></div>
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Email" name="email" type="email" value={values.email} onChange={update} error={errors.email} placeholder="you@example.com" required /><label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="service">Service Needed<select id="service" required name="service" value={values.service} onChange={update} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? 'service-error' : undefined} className={`border bg-white px-4 py-3 font-normal outline-none focus:border-copper ${errors.service ? 'border-red-600' : 'border-line'}`}><option value="">Select a service</option>{services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}</select>{errors.service && <span id="service-error" className="text-xs font-normal text-red-700">{errors.service}</span>}</label></div>
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Preferred Date" name="date" type="date" value={values.date} onChange={update} /><Field label="Preferred Time" name="time" type="time" value={values.time} onChange={update} /></div>
    <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor="message">Message<textarea id="message" required name="message" value={values.message} onChange={update} rows="5" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'message-error' : undefined} className={`resize-y border px-4 py-3 font-normal outline-none focus:border-copper ${errors.message ? 'border-red-600' : 'border-line'}`} placeholder="Tell us what is happening" />{errors.message && <span id="message-error" className="text-xs font-normal text-red-700">{errors.message}</span>}</label>
    <label className="flex items-start gap-3 text-sm text-ink"><input type="checkbox" name="emergency" checked={values.emergency} onChange={update} className="mt-0.5 size-4 accent-copper" /> <span><strong className="font-semibold">Emergency Service</strong><span className="block text-muted">Select this if the plumbing problem needs urgent attention.</span></span></label>
    {values.emergency && <div className="flex flex-col gap-3 border-l-2 border-copper bg-sand p-4 text-sm text-ink sm:flex-row sm:items-center sm:justify-between" role="note"><span className="font-semibold">Need immediate assistance? Call 909-623-0033</span><a href="tel:9096230033" className="inline-flex items-center gap-2 font-bold text-copper focus:outline-none focus:ring-2 focus:ring-copper"><Phone size={16} aria-hidden="true" /> Call Now</a></div>}
    <Button type="submit" disabled={requestState === 'loading'}>{requestState === 'loading' ? 'Sending Request...' : 'Request Service'}</Button><p id="form-note" className="text-xs leading-5 text-muted">Your details are sent securely to our service team.</p>
  </form>
}

function Field({ label, name, type = 'text', value, onChange, error, placeholder, required = false }) {
  const errorId = `${name}-error`
  return <label className="grid gap-2 text-sm font-semibold text-ink" htmlFor={name}>{label}{required && <span className="ml-1 text-copper" aria-hidden="true">*</span>}<input id={name} required={required} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} className={`border px-4 py-3 font-normal outline-none focus:border-copper ${error ? 'border-red-600' : 'border-line'}`} />{error && <span id={errorId} className="text-xs font-normal text-red-700">{error}</span>}</label>
}
