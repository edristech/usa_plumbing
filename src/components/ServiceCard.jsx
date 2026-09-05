import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ServiceCard({ service }) {
  const Icon = service.icon
  return <Link to={`/services/${service.slug}`} className="group flex min-h-[245px] flex-col border border-line bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-copper hover:shadow-xl hover:shadow-ink/5"><div className="mb-10 flex items-start justify-between"><span className="flex size-11 items-center justify-center bg-sand text-copper transition duration-200 group-hover:bg-copper group-hover:text-white"><Icon size={21} aria-hidden="true" /></span><ArrowUpRight className="text-line transition duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-copper" size={20} aria-hidden="true" /></div><h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3><p className="mt-2 text-sm leading-6 text-muted">{service.shortDescription}</p><span className="mt-auto pt-5 text-sm font-semibold text-copper">Learn More</span></Link>
}