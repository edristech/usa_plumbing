import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getService } from '../data/services.js'

const pageMeta = {
  '/': ['USA Plumbing Service | Rancho Cucamonga Plumbing', 'USA Plumbing Service provides professional plumbing and rooter services in Rancho Cucamonga, California, with 24/7 emergency plumbing service.'],
  '/services': ['Plumbing Services | USA Plumbing Service', 'Explore professional plumbing and rooter services from USA Plumbing Service in Rancho Cucamonga, California.'],
  '/about': ['About USA Plumbing Service', 'Learn about USA Plumbing Service, a family-owned and operated plumbing company in Rancho Cucamonga, California.'],
  '/emergency-plumber': ['24/7 Emergency Plumbing Service | USA Plumbing Service', 'Contact USA Plumbing Service for 24/7 emergency plumbing service in Rancho Cucamonga, California.'],
  '/contact': ['Contact USA Plumbing Service', 'Contact USA Plumbing Service for professional plumbing and rooter service in Rancho Cucamonga, California.'],
}

export default function PageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const service = pathname.startsWith('/services/') ? getService(pathname.split('/').pop()) : null
    const [title, description] = service ? [`${service.title} | USA Plumbing Service`, `${service.shortDescription} USA Plumbing Service serves Rancho Cucamonga, California.`] : pageMeta[pathname] || ['USA Plumbing Service', 'Professional plumbing and rooter services in Rancho Cucamonga, California.']
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [pathname])
  return null
}
