import { Clock3, HeartHandshake, ShieldCheck, Sparkles, UsersRound, Wrench } from 'lucide-react'

const reasons = [
  { title: 'Family Owned & Operated', description: 'A family-owned and operated company serving local plumbing needs.', icon: UsersRound },
  { title: 'Over 25 Years of Experience', description: 'More than 25 years of experience in professional plumbing service.', icon: Clock3 },
  { title: 'Licensed, Bonded & Insured', description: 'Licensed, bonded, and insured for added confidence in the work.', icon: ShieldCheck },
  { title: '24/7 Emergency Service', description: 'Emergency plumbing service is available around the clock.', icon: Wrench },
  { title: 'Quality Workmanship', description: 'A focus on doing careful work and addressing the plumbing concern clearly.', icon: Sparkles },
  { title: 'Professional Customer Service', description: 'Courtesy and customer service are part of the experience.', icon: HeartHandshake },
]

export default function WhyChooseUs() {
  return <section className="bg-sand px-5 py-20 md:px-8"><div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-copper">Why Choose USA Plumbing Service</p><h2 className="font-display text-3xl font-semibold leading-tight text-ink md:text-5xl">Experience and care for the work your home depends on.</h2><p className="mt-4 text-base leading-7 text-muted">Professional plumbing service should feel clear, respectful, and grounded in the details that matter.</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{reasons.map(({ title, description, icon: Icon }) => <article key={title} className="group border-t-2 border-copper bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5"><Icon size={22} className="text-copper transition-transform duration-200 group-hover:scale-110" aria-hidden="true" /><h3 className="mt-6 font-display text-xl font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{description}</p></article>)}</div></div></section>
}
