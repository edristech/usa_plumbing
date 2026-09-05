import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import AboutSection from '../components/AboutSection.jsx'
import CTASection from '../components/CTASection.jsx'
import EmergencyCTA from '../components/EmergencyCTA.jsx'
import FAQ from '../components/FAQ.jsx'
import Hero from '../components/Hero.jsx'
import ProcessSteps from '../components/ProcessSteps.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceGrid from '../components/ServiceGrid.jsx'
import ServiceAreas from '../components/ServiceAreas.jsx'
import TestimonialsSection from '../components/TestimonialsSection.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import { homepageFaqs } from '../data/faq.js'
import { serviceAreas } from '../data/serviceAreas.js'
import { services } from '../data/services.js'
import { testimonials } from '../data/testimonials.js'

export default function Home() {
  return <main>
    <Hero />
    <section className="border-b border-line bg-white"><div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 md:px-8"><div className="flex items-center gap-3"><CheckCircle2 className="text-copper" /><span className="text-sm font-semibold text-ink">Clear communication</span></div><div className="flex items-center gap-3"><CheckCircle2 className="text-copper" /><span className="text-sm font-semibold text-ink">Professional service</span></div><div className="flex items-center gap-3"><CheckCircle2 className="text-copper" /><span className="text-sm font-semibold text-ink">Local details, verified before launch</span></div></div></section>
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8"><SectionHeading eyebrow="Our services" title="Plumbing problems have a way of showing up at the worst time." text="Explore professional plumbing and rooter services for homes in Rancho Cucamonga and surrounding areas." /><div className="mt-10"><ServiceGrid items={services.slice(0, 6)} /></div><Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-copper">View all services <ArrowRight size={16} /></Link></section>
    <AboutSection />
    <WhyChooseUs />
    <EmergencyCTA compact />
    <CTASection title="Plumbing issue on your mind? Start with the details." />
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8"><SectionHeading eyebrow="A simpler process" title="From first message to a clear next step." /><div className="mt-10"><ProcessSteps /></div></section>
    <TestimonialsSection items={testimonials} />
    <ServiceAreas areas={serviceAreas} />
    <section className="bg-sand px-5 py-20 md:px-8"><div className="mx-auto max-w-3xl"><SectionHeading align="center" eyebrow="Questions" title="Good information makes the next step easier." /><div className="mt-10"><FAQ items={homepageFaqs} /></div></div></section>
  </main>
}