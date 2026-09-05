import SectionHeading from './SectionHeading.jsx'
import TestimonialCard from './TestimonialCard.jsx'

export default function TestimonialsSection({ items }) {
  return <section className="bg-paper px-5 py-20 md:px-8"><div className="mx-auto max-w-7xl"><SectionHeading eyebrow="Customer voice" title="A place for real customer experiences." text="Testimonials will be added here after they are approved by USA Plumbing Service." /><div className="mt-10 grid gap-4 md:grid-cols-3">{items.map((testimonial) => <TestimonialCard key={testimonial.id} {...testimonial} />)}</div></div></section>
}
