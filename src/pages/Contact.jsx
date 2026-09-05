import { Clock3, Mail, MapPin, Phone } from 'lucide-react'
import ContactForm from '../components/ContactForm.jsx'
import EmergencyCTA from '../components/EmergencyCTA.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const contactDetails = [
  {
    label: 'Phone',
    value: '909-623-0033',
    href: 'tel:9096230033',
    icon: Phone,
  },
  {
    label: 'Email',
    value: 'contact@usaplumbingservice.com',
    href: 'mailto:contact@usaplumbingservice.com',
    icon: Mail,
  },
  {
    label: 'Address',
    value: '12729 Jessie Ct, Rancho Cucamonga, CA 91739',
    icon: MapPin,
  },
  {
    label: 'Emergency availability',
    value: '24/7 Emergency Plumbing Service',
    icon: Clock3,
  },
]

export default function Contact() {
  return (
    <main>


      {/* Hero */}
<section
  className="relative bg-cover bg-center px-5 py-20 text-white md:px-8 md:py-24"
  style={{ backgroundImage: "url('/images/contact-hero.jpg')" }}
>
  <div className="absolute inset-0 bg-ink/70" />

  <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-end">
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-copper-light">
        Request service
      </p>

      <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight md:text-7xl">
        Contact USA Plumbing Service
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
        Tell us what is happening and share the details needed to start a
        conversation about your plumbing service.
      </p>
    </div>

    <a
      href="tel:9096230033"
      className="inline-flex shrink-0 items-center justify-center gap-2 bg-copper px-5 py-3.5 text-sm font-bold text-white transition hover:bg-copper-dark focus:outline-none focus:ring-2 focus:ring-copper focus:ring-offset-2 focus:ring-offset-ink"
    >
      <Phone size={16} aria-hidden="true" />
      Call Now
    </a>
  </div>
</section>



      {/* Contact details */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map(({ label, value, href, icon: Icon }) => (
            <div
              key={label}
              className="border border-line bg-white p-5"
            >
              <Icon
                className="text-copper"
                size={21}
                aria-hidden="true"
              />

              <h2 className="mt-5 text-sm font-bold text-ink">
                {label}
              </h2>

              {href ? (
                <a
                  href={href}
                  className="mt-2 block break-words text-sm leading-6 text-muted hover:text-copper focus:outline-none focus:ring-2 focus:ring-copper"
                >
                  {value}
                </a>
              ) : (
                <p className="mt-2 text-sm leading-6 text-muted">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact form + Map */}
      <section className="bg-sand px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_.7fr] lg:items-start">
          {/* Form */}
          <div
            id="request-service"
            className="bg-white p-6 md:p-9"
          >
            <SectionHeading
              eyebrow="Request service"
              title="A few details help us understand the request."
              text="Complete the form below. It is frontend-only and does not send or store your information."
            />

            <div className="mt-9">
              <ContactForm />
            </div>
          </div>

          {/* Location */}
          <div className="grid gap-8">
            <div>
              <SectionHeading
                eyebrow="Find us"
                title="Our local address"
                text="USA Plumbing Service · Complete Plumbing & Rooter"
              />
            </div>

            {/* Real Map */}
            <div className="overflow-hidden border border-line bg-white">
              <iframe
                title="USA Plumbing Service location"
                src="https://www.google.com/maps?q=12729+Jessie+Ct,+Rancho+Cucamonga,+CA+91739&output=embed"
                className="h-[350px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Emergency */}
            <div className="border-l-2 border-copper pl-5">
              <p className="text-sm font-bold text-ink">
                Need immediate assistance?
              </p>

              <p className="mt-1 text-sm text-muted">
                Call 909-623-0033 for 24/7 Emergency Plumbing Service.
              </p>

              <a
                href="tel:9096230033"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-copper focus:outline-none focus:ring-2 focus:ring-copper"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <EmergencyCTA compact={false} />

      {/* Bottom CTA */}
      <section className="bg-ink px-5 py-14 text-center text-white md:px-8">
        <h2 className="font-display text-3xl font-semibold">
          Need Plumbing Service?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-white/65">
          Call USA Plumbing Service or use the Request Service form to share
          what is happening.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="tel:9096230033"
            className="inline-flex items-center justify-center gap-2 bg-copper px-5 py-3 text-sm font-bold hover:bg-copper-dark"
          >
            <Phone size={16} aria-hidden="true" />
            Call Now
          </a>

          <a
            href="#request-service"
            className="inline-flex items-center justify-center border border-white/30 px-5 py-3 text-sm font-bold"
          >
            Request Service
          </a>
        </div>
      </section>
    </main>
  )
}