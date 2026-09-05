import ServiceCard from './ServiceCard.jsx'

export default function ServiceGrid({ items }) { return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((service) => <ServiceCard key={service.slug} service={service} />)}</div> }