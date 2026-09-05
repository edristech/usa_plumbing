import { ArrowLeft, CircleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from './Button.jsx'

export default function ServiceHero({ service, detail }) {
  const Icon = service.icon

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center px-5 py-20 text-white md:px-8"
      style={{ backgroundImage: "url('/images/services-hero.jpg')" }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Subtle brand gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          All services
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <div className="mb-6 flex size-14 items-center justify-center bg-copper text-white">
              <Icon aria-hidden="true" />
            </div>

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-copper-light">
              Service detail
            </p>

            <h1 className="font-display text-5xl font-semibold leading-tight text-white md:text-6xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">
              {detail.intro}
            </p>

            <div className="mt-8">
              <Button to="/contact">Request Service</Button>
            </div>
          </div>

          <div className="border-l border-white/30 pl-7 text-sm leading-7 text-white/80">
            <CircleAlert
              className="mb-5 text-copper-light"
              aria-hidden="true"
            />

            <p>
              Business-specific availability, pricing, guarantees, and
              response times should be added only after verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}