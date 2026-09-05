import CTASection from '../components/CTASection.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceGrid from '../components/ServiceGrid.jsx'
import { services } from '../data/services.js'

export default function Services() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[500px] overflow-hidden bg-cover bg-center px-5 py-20 text-white md:px-8"
        style={{ backgroundImage: "url('/images/services-hero.jpg')" }}
      >
        {/* Dark gradient only for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[460px] max-w-7xl items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-copper-light">
              Our services
            </p>

            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight md:text-6xl">
              Professional plumbing and rooter services for your home.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">
              USA Plumbing Service serves Rancho Cucamonga, California and
              surrounding areas, with 24/7 emergency service available.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeading
          eyebrow="Find your service"
          title="Start with the problem you are seeing."
          text="Browse the categories below. Service scope and availability should be confirmed by the business before publishing."
        />

        <div className="mt-12">
          <ServiceGrid items={services} />
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="bg-[#8f2e1d] px-5 py-14 text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200">
              24/7 Emergency Plumbing Service
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold">
              When it cannot wait, call now.
            </h2>
          </div>

          <a
            href="tel:9096230033"
            className="inline-flex items-center border border-white/40 bg-white px-5 py-3 text-sm font-bold text-[#8f2e1d]"
          >
            Call Now: 909-623-0033
          </a>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Not sure which service you need?"
        text="Share what is happening and the company can guide the next step."
      />
    </main>
  )
}