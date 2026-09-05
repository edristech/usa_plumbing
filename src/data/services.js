import { Bath, CircleAlert, Flame, Gauge, Pipette, Search, ShowerHead, Toilet, Trash2, Waves } from 'lucide-react'

const commonDetails = {
  problems: ['Changes in performance', 'Leaks, moisture, or visible damage', 'A recurring issue that has not stayed resolved', 'Questions about repair or replacement'],
  includes: ['Initial assessment of the concern', 'Clear explanation of findings', 'Recommended next steps', 'Work details confirmed before service'],
  benefits: ['Understand the issue', 'Choose an informed next step', 'Get the right service for the problem'],
}

export const services = [
  { id: 'drain-cleaning', title: 'Drain Cleaning', shortDescription: 'Clear slow or blocked drains and get water moving again.', icon: Waves, slug: 'drain-cleaning', detail: { intro: 'Persistent slow drains are a signal worth addressing. A proper assessment helps prevent recurring blockages.', problems: ['Slow sinks, tubs, or showers', 'Recurring clogs', 'Unpleasant drain odors', 'Multiple backed-up fixtures'], includes: ['Drain and fixture assessment', 'Blockage removal', 'Flow testing', 'Maintenance recommendations'], benefits: ['Improve flow', 'Reduce repeat clogs', 'Protect connected plumbing'] } },
  { id: 'sewer-line-services', title: 'Sewer Line Services', shortDescription: 'Practical diagnosis and repair for residential sewer line concerns.', icon: Pipette, slug: 'sewer-line-services' },
  { id: 'water-heater-services', title: 'Water Heater Services', shortDescription: 'Get help with water heater concerns, service, and replacement planning.', icon: Flame, slug: 'water-heater-services' },
  { id: 'leak-detection', title: 'Leak Detection', shortDescription: 'Find hidden water leaks before they create bigger problems.', icon: Search, slug: 'leak-detection' },
  { id: 'pipe-repair', title: 'Pipe Repair', shortDescription: 'Repair damaged, corroded, or leaking supply and drain pipes.', icon: Pipette, slug: 'pipe-repair' },
  { id: 'sinks-faucets', title: 'Sinks & Faucets', shortDescription: 'Restore the everyday fixtures your household depends on.', icon: ShowerHead, slug: 'sinks-faucets' },
  { id: 'garbage-disposal', title: 'Garbage Disposal', shortDescription: 'Get a jammed, noisy, or non-working disposal assessed.', icon: Trash2, slug: 'garbage-disposal' },
  { id: 'backflow-prevention', title: 'Backflow Prevention', shortDescription: 'Support the safe separation of clean and used water systems.', icon: Gauge, slug: 'backflow-prevention' },
  { id: 'bathtubs-showers', title: 'Bathtubs & Showers', shortDescription: 'Address leaks, drainage, and fixture concerns in the bathroom.', icon: Bath, slug: 'bathtubs-showers' },
  { id: 'leaky-toilets', title: 'Leaky Toilets', shortDescription: 'Resolve leaks, running water, clogs, and unreliable toilets.', icon: Toilet, slug: 'leaky-toilets' },
  { id: 'slab-leak-detection', title: 'Slab Leak Detection', shortDescription: 'Investigate signs of concealed plumbing leaks beneath a home.', icon: Search, slug: 'slab-leak-detection' },
  { id: 'emergency-plumbing', title: 'Emergency Plumbing', shortDescription: 'Call for help with urgent leaks, backups, and plumbing failures.', icon: CircleAlert, slug: 'emergency-plumbing', detail: { intro: 'When a plumbing problem cannot wait, start with a clear plan and a qualified professional.', problems: ['Burst or actively leaking pipes', 'Sewage or drain backups', 'No water or loss of pressure', 'Overflowing fixtures'], includes: ['Initial problem assessment', 'Source isolation guidance', 'Repair options and next steps', 'Cleanup recommendations'], benefits: ['Reduce damage', 'Restore essential water service', 'Understand the repair before work begins'] } },
]

export const getService = (slug) => services.find((service) => service.slug === slug)
export const getServiceDetail = (service) => ({ ...commonDetails, ...service.detail })
