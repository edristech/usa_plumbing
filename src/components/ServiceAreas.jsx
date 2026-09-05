import { ArrowRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading.jsx'

export default function ServiceAreas({ areas }) {
  return <section className="mx-auto max-w-7xl px-5 py-20 md:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><SectionHeading eyebrow="Service areas" title="Proud to serve the place this company calls home." text="USA Plumbing Service is based in Rancho Cucamonga, California. Additional service locations can be added here after verification." /><div><div className="grid gap-3 sm:grid-cols-2">{areas.map((area) => <article key={area.id} className="border border-line bg-white p-5"><MapPin size={20} className="text-copper" aria-hidden="true" /><h3 className="mt-4 font-display text-xl font-semibold text-ink">{area.name}</h3><p className="mt-1 text-sm text-muted">{area.region}</p><p className="mt-3 text-sm leading-6 text-muted">{area.description}</p></article>)}</div><Link to="/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-copper">Contact USA Plumbing Service <ArrowRight size={16} aria-hidden="true" /></Link></div></div></section>
}
