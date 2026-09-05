import { CheckCircle2, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTASection from '../components/CTASection.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const values = [
  {
    title: 'Quality Workmanship',
    text: 'A focus on careful, professional plumbing and rooter service.',
    icon: Sparkles,
  },
  {
    title: 'Courtesy',
    text: 'Respectful service for homeowners and the spaces they care for.',
    icon: HeartHandshake,
  },
  {
    title: 'Customer Service',
    text: 'Clear communication and a considerate experience from first contact.',
    icon: CheckCircle2,
  },
]

export default function About() {
  return (
    <main>
      {/* Hero */}
<section
  className="relative overflow-hidden bg-cover bg-center px-5 py-24 text-white md:px-8"
  style={{ backgroundImage: "url('/images/about-us.jpg')" }}
>
  {/* Only darken the area behind the text */}
  <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

  <div className="relative z-10 mx-auto max-w-7xl">
    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-copper-light">
      About USA Plumbing Service
    </p>

    <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight text-white md:text-7xl">
      Professional plumbing with a local, family-owned foundation.
    </h1>

    <p className="mt-7 max-w-2xl text-lg leading-8 text-white/90">
      USA Plumbing Service is Complete Plumbing &amp; Rooter, serving
      Rancho Cucamonga and surrounding areas with over 25 years of
      experience.
    </p>
  </div>
</section>

      {/* Our Story */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 lg:grid-cols-[1fr_.8fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Our story"
            title="Experience you can bring to the conversation."
          />

          <div className="mt-6 max-w-2xl space-y-5 text-base leading-8 text-muted">
            <p>
              USA Plumbing Service is a family-owned and operated plumbing
              company. With over 25 years of experience, the team provides
              professional plumbing and rooter services for homes in Rancho
              Cucamonga, California and surrounding areas.
            </p>

            <p>
              The company’s approach is grounded in quality workmanship,
              courtesy, and customer service. Each interaction is an
              opportunity to make the next step clearer for the homeowner.
            </p>
          </div>
        </div>

        <div className="border border-line bg-white p-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-copper">
            Company details
          </p>

          <h2 className="mt-6 font-display text-2xl font-semibold text-ink">
            Complete Plumbing &amp; Rooter
          </h2>

          <address className="mt-4 not-italic text-sm leading-6 text-muted">
            12729 Jessie Ct
            <br />
            Rancho Cucamonga, CA 91739
          </address>

          <a
            href="mailto:contact@usaplumbingservice.com"
            className="mt-4 inline-block break-all text-sm font-semibold text-copper"
          >
            contact@usaplumbingservice.com
          </a>

          <div className="mt-7 border-t border-line pt-5">
            <p className="text-sm font-semibold text-ink">
              California License #961844
            </p>

            <p className="mt-2 text-sm text-muted">
              Licensed · Bonded · Insured
            </p>
          </div>
        </div>
      </section>

      {/* Quality & Customer Service */}
      <section className="bg-sand px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Quality & customer service"
            title="Workmanship matters. So does how you are treated."
            text="USA Plumbing Service focuses on professional plumbing and rooter service alongside courtesy and customer service. The goal is a clear, respectful experience for the homeowner."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map(({ title, text, icon: Icon }) => (
              <article
                key={title}
                className="border-t-2 border-copper bg-white p-7"
              >
                <Icon
                  className="text-copper"
                  size={22}
                  aria-hidden="true"
                />

                <h2 className="mt-6 font-display text-xl font-semibold text-ink">
                  {title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Licensed, Bonded & Insured */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Licensed, bonded & insured"
              title="A professional foundation for your plumbing needs."
            />

            <p className="mt-5 text-base leading-7 text-muted">
              USA Plumbing Service is licensed, bonded, and insured.
              California License #961844.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="border border-line p-6 text-center">
              <ShieldCheck
                className="mx-auto text-copper"
                aria-hidden="true"
              />

              <p className="mt-4 text-sm font-bold text-ink">
                Licensed
              </p>
            </div>

            <div className="border border-line p-6 text-center">
              <ShieldCheck
                className="mx-auto text-copper"
                aria-hidden="true"
              />

              <p className="mt-4 text-sm font-bold text-ink">
                Bonded
              </p>
            </div>

            <div className="border border-line p-6 text-center">
              <ShieldCheck
                className="mx-auto text-copper"
                aria-hidden="true"
              />

              <p className="mt-4 text-sm font-bold text-ink">
                Insured
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to discuss your plumbing needs?"
        text="Request professional plumbing service or call USA Plumbing Service directly."
      />

      {/* Return Home */}
      <section className="px-5 py-8 text-center text-sm text-muted">
        <Link
          to="/"
          className="font-semibold text-copper"
        >
          Return to home
        </Link>
      </section>
    </main>
  )
}