import { AlertTriangle, ChevronLeft, ChevronRight, ClipboardList, Droplets, LogOut, Menu, RefreshCw, Search, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AdminLoading } from './AdminLogin.jsx'
import AdminAnalytics from './AdminAnalytics.jsx'
import AdminManagement from './AdminManagement.jsx'
import { useAdminAuth } from './AdminAuthContext.jsx'

const API_URL = import.meta.env.VITE_API_URL
const statuses = ['new', 'contacted', 'scheduled', 'completed', 'cancelled']

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers } })
  const payload = await response.json().catch(() => ({}))
  if (response.status === 401) throw new Error('AUTH_REQUIRED')
  if (!response.ok) throw new Error(payload.message || 'Request failed')
  return payload
}

function formatDate(value) { return value ? new Date(value).toLocaleDateString() : 'Not specified' }

export default function AdminDashboard() {
  const { admin, checking, logout } = useAdminAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [requests, setRequests] = useState([])
  const [emergencyRequests, setEmergencyRequests] = useState([])
  const [administrators, setAdministrators] = useState([])
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, scheduled: 0, completed: 0, cancelled: 0, emergency: 0 })
  const [analytics, setAnalytics] = useState(null)
  const [analyticsRange, setAnalyticsRange] = useState('30d')
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 })
  const [statusFilter, setStatusFilter] = useState('')
  const [emergencyFilter, setEmergencyFilter] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyticsLoading, setAnalyticsLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  const load = useCallback(async (page = 1) => {
    setLoading(true)
    setAnalyticsLoading(true)
    setMessage('')
    try {
      const params = new URLSearchParams({ page: String(page), limit: '10' })
      if (statusFilter) params.set('status', statusFilter)
      if (emergencyFilter) params.set('emergency', emergencyFilter)
      if (search.trim()) params.set('search', search.trim())
      const analyticsParams = new URLSearchParams({ range: analyticsRange })
      const [list, dashboardStats, emergencies, dashboardAnalytics] = await Promise.all([
        request(`/api/admin/service-requests?${params}`),
        request('/api/admin/dashboard/stats'),
        request('/api/admin/service-requests?emergency=true&limit=5'),
        request(`/api/admin/dashboard/analytics?${analyticsParams}`),
      ])
      setRequests(list.data)
      setPagination(list.pagination)
      setStats(dashboardStats.data)
      setEmergencyRequests(emergencies.data)
      setAnalytics(dashboardAnalytics.data)
    } catch (error) {
      if (error.message === 'AUTH_REQUIRED') navigate('/admin/login', { replace: true })
      else setMessage('Unable to load dashboard data. Please try again.')
    } finally { setLoading(false); setAnalyticsLoading(false) }
  }, [analyticsRange, emergencyFilter, navigate, search, statusFilter])

  const loadAdministrators = useCallback(async () => {
    try { setAdministrators((await request('/api/admin/administrators')).data) } catch (error) { if (error.message === 'AUTH_REQUIRED') navigate('/admin/login', { replace: true }); else setMessage('Unable to load administrators.') }
  }, [navigate])

  useEffect(() => { if (!checking && admin) { load(1); loadAdministrators() } }, [admin, checking, load, loadAdministrators])

  if (checking) return <AdminLoading />
  if (!admin) return <Navigate to="/admin/login" replace state={{ from: location }} />

  const viewDetails = async (id) => { try { setSelected((await request(`/api/admin/service-requests/${id}`)).data) } catch { setMessage('Unable to load request details.') } }
  const changeStatus = async (id, status) => { try { await request(`/api/admin/service-requests/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }); setMessage('Request status updated.'); await load(pagination.page); if (selected?.id === id) setSelected((await request(`/api/admin/service-requests/${id}`)).data) } catch { setMessage('Unable to update the request status.') } }
  const remove = async (id, name) => { if (!window.confirm(`Delete the request from ${name}? This cannot be undone.`)) return; try { await request(`/api/admin/service-requests/${id}`, { method: 'DELETE' }); setSelected(null); setMessage('Request deleted.'); await load(pagination.page > 1 && requests.length === 1 ? pagination.page - 1 : pagination.page) } catch { setMessage('Unable to delete the request.') } }
  const createAdmin = async (event) => { event.preventDefault(); try { await request('/api/admin/administrators', { method: 'POST', body: JSON.stringify({ email: adminEmail, password: adminPassword }) }); setAdminEmail(''); setAdminPassword(''); setMessage('Administrator created.'); await loadAdministrators() } catch (error) { setMessage(error.message === 'Invalid request' ? 'Use a valid email and a password of at least 12 characters.' : 'Unable to create administrator.') } }
  const signOut = async () => { await logout(); navigate('/admin/login', { replace: true }) }

  return <div className="min-h-screen bg-paper text-ink"><aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-ink p-7 text-white transition-transform lg:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-copper-light">USA Plumbing</p><p className="mt-2 font-display text-2xl">Operations</p></div><button className="lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X /></button></div><nav className="mt-14 grid gap-2"><NavItem href="#overview" icon={<Droplets size={17} />}>Dashboard</NavItem><NavItem href="#requests" icon={<ClipboardList size={17} />}>Service Requests</NavItem><NavItem href="#emergency" icon={<AlertTriangle size={17} />}>Emergency</NavItem><NavItem href="#administrators" icon={<ShieldCheckIcon />}>Administrators</NavItem><NavItem href="#analytics" icon={<ChartIcon />}>Analytics</NavItem></nav><button className="absolute bottom-8 left-7 flex items-center gap-3 text-sm font-semibold text-white/70 hover:text-white" onClick={signOut}><LogOut size={17} />Sign out</button></aside>{mobileNav && <button className="fixed inset-0 z-30 bg-ink/40 lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation overlay" />}<div className="lg:pl-72"><header className="sticky top-0 z-20 border-b border-line bg-white/95 px-5 py-4 backdrop-blur md:px-8"><div className="flex items-center justify-between gap-4"><button className="p-2 lg:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu /></button><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-copper">Service operations</p><h1 className="mt-1 font-display text-2xl font-semibold md:text-3xl">Good morning, {admin.email.split('@')[0]}</h1></div><button className="inline-flex items-center gap-2 border border-line px-3 py-2 text-sm font-semibold text-muted hover:border-copper hover:text-copper" onClick={() => { load(pagination.page); loadAdministrators() }}><RefreshCw size={16} />Refresh</button></div></header><main id="overview" className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10"><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-7"><Stat label="Total" value={stats.total} /><Stat label="New" value={stats.new} accent="blue" /><Stat label="Contacted" value={stats.contacted} accent="amber" /><Stat label="Scheduled" value={stats.scheduled} accent="copper" /><Stat label="Completed" value={stats.completed} accent="green" /><Stat label="Cancelled" value={stats.cancelled} accent="slate" /><Stat label="Emergency" value={stats.emergency} accent="red" /></div>{message && <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">{message}</div>}<section id="requests" className="mt-10"><SectionTitle eyebrow="Request queue" title="Service requests" /><div className="mt-5 flex flex-col gap-3 lg:flex-row"><label className="flex flex-1 items-center gap-2 border border-line bg-white px-3"><Search size={17} className="text-muted" /><input className="min-w-0 flex-1 border-0 bg-transparent py-2.5 text-sm outline-none" placeholder="Search name, phone, or email" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') load(1) }} /></label><select className="border border-line bg-white px-3 py-2 text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{status}</option>)}</select><select className="border border-line bg-white px-3 py-2 text-sm" value={emergencyFilter} onChange={(event) => setEmergencyFilter(event.target.value)}><option value="">All requests</option><option value="true">Emergency only</option><option value="false">Non-emergency</option></select><button className="inline-flex items-center justify-center gap-2 bg-copper px-4 py-2 text-sm font-bold text-white hover:bg-copper-dark" onClick={() => load(1)}><Search size={16} />Search</button></div><RequestTable requests={requests} loading={loading} onView={viewDetails} onStatusChange={changeStatus} onDelete={remove} /><Pagination pagination={pagination} loading={loading} onChange={load} /></section><AdminAnalytics data={analytics} range={analyticsRange} onRangeChange={setAnalyticsRange} loading={analyticsLoading} /><section id="emergency" className="mt-12"><SectionTitle eyebrow="Priority queue" title="Emergency requests" /><div className="mt-5 border border-red-200 bg-red-50">{loading ? <div className="p-6 text-sm text-muted">Loading emergency requests...</div> : emergencyRequests.length === 0 ? <div className="p-6 text-sm text-muted">No emergency requests.</div> : <div className="divide-y divide-red-200">{emergencyRequests.map((item) => <button key={item.id} className="flex w-full items-center justify-between gap-4 p-4 text-left hover:bg-red-100" onClick={() => viewDetails(item.id)}><span><strong className="block text-sm">{item.name}</strong><span className="text-xs text-muted">{item.service} · {formatDate(item.created_at)}</span></span><span className="inline-flex items-center gap-1 text-xs font-bold text-red-700"><AlertTriangle size={15} />Urgent</span></button>)}</div>}</div></section><section className="mt-12 border border-line bg-white p-5"><h2 className="font-display text-2xl font-semibold">Add administrator</h2><form className="mt-4 flex flex-col gap-3 md:flex-row" onSubmit={createAdmin}><input className="flex-1 border border-line px-3 py-2 text-sm" type="email" placeholder="Email address" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} required /><input className="flex-1 border border-line px-3 py-2 text-sm" type="password" placeholder="Password (12+ characters)" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} minLength="12" required /><button className="bg-ink px-4 py-2 text-sm font-bold text-white hover:bg-ink-soft">Create administrator</button></form></section><AdminManagement administrators={administrators} onRefresh={loadAdministrators} request={request} setMessage={setMessage} /></main></div>{selected && <RequestDetails request={selected} onClose={() => setSelected(null)} onStatusChange={changeStatus} onDelete={remove} />}</div>
}

function NavItem({ href, icon, children }) { return <a className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-white/75 hover:bg-white/10 hover:text-white" href={href}>{icon}{children}</a> }
function ShieldCheckIcon() { return <span aria-hidden="true">&#9673;</span> }
function ChartIcon() { return <span aria-hidden="true">&#9636;</span> }
function SectionTitle({ eyebrow, title }) { return <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-copper">{eyebrow}</p><h2 className="mt-2 font-display text-3xl font-semibold">{title}</h2></div> }
function Stat({ label, value, accent = 'ink' }) { const colors = { ink: 'border-ink', blue: 'border-blue-500', amber: 'border-amber-500', red: 'border-red-500', copper: 'border-copper', green: 'border-green-600', slate: 'border-slate-500' }; return <div className={`border-l-4 ${colors[accent]} bg-white p-4 shadow-sm`}><p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p><p className="mt-3 font-display text-3xl font-semibold">{value}</p></div> }
function RequestTable({ requests, loading, onView, onStatusChange, onDelete }) { return <div className="mt-6 overflow-x-auto border border-line bg-white">{loading ? <div className="p-10 text-center text-sm text-muted">Loading requests...</div> : requests.length === 0 ? <div className="p-10 text-center text-sm text-muted">No service requests match these filters.</div> : <table className="w-full min-w-[980px] text-left text-sm"><thead className="border-b border-line bg-sand text-xs uppercase tracking-wide text-muted"><tr>{['ID', 'Customer', 'Phone', 'Email', 'Service', 'Preferred', 'Emergency', 'Status', 'Created', 'Actions'].map((heading) => <th key={heading} className="px-4 py-4">{heading}</th>)}</tr></thead><tbody className="divide-y divide-line">{requests.map((item) => <tr key={item.id} className={item.emergency ? 'bg-red-50/50' : ''}><td className="px-4 py-4 text-muted">#{item.id}</td><td className="px-4 py-4 font-semibold">{item.name}</td><td className="px-4 py-4 text-muted">{item.phone}</td><td className="px-4 py-4 text-muted">{item.email}</td><td className="px-4 py-4">{item.service}</td><td className="px-4 py-4 text-xs text-muted">{formatDate(item.preferred_date)}{item.preferred_time ? ` · ${item.preferred_time}` : ''}</td><td className="px-4 py-4">{item.emergency ? <span className="font-bold text-red-700">Urgent</span> : 'No'}</td><td className="px-4 py-4"><select aria-label={`Change status for ${item.name}`} className="border border-line bg-white px-2 py-1 text-xs font-bold capitalize outline-none focus:border-copper" value={item.status} onChange={(event) => onStatusChange(item.id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td><td className="px-4 py-4 text-muted">{formatDate(item.created_at)}</td><td className="px-4 py-4"><div className="flex items-center gap-3"><button className="font-bold text-copper hover:text-copper-dark" onClick={() => onView(item.id)}>View</button><button className="text-xs font-bold text-red-700" onClick={() => onDelete(item.id, item.name)}>Delete</button></div></td></tr>)}</tbody></table>}</div> }
function Pagination({ pagination, loading, onChange }) { return <div className="mt-5 flex items-center justify-between text-sm text-muted"><span>Page {pagination.page} of {Math.max(pagination.totalPages, 1)} · {pagination.total} requests</span><div className="flex gap-2"><button className="border border-line bg-white p-2 disabled:opacity-40" disabled={pagination.page <= 1 || loading} onClick={() => onChange(pagination.page - 1)} aria-label="Previous page"><ChevronLeft size={17} /></button><button className="border border-line bg-white p-2 disabled:opacity-40" disabled={pagination.page >= pagination.totalPages || loading} onClick={() => onChange(pagination.page + 1)} aria-label="Next page"><ChevronRight size={17} /></button></div></div> }
function RequestDetails({ request, onClose, onStatusChange, onDelete }) { return <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-5" role="dialog" aria-modal="true"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-6 md:p-8"><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-copper">Request #{request.id}</p><h2 className="mt-2 font-display text-3xl font-semibold">{request.name}</h2></div><button className="p-2 text-muted hover:text-ink" onClick={onClose} aria-label="Close request details"><X /></button></div><div className="mt-7 grid gap-5 sm:grid-cols-2">{[['Phone', request.phone], ['Email', request.email], ['Service', request.service], ['Preferred date', formatDate(request.preferred_date)], ['Preferred time', request.preferred_time || 'Not specified'], ['Created', formatDate(request.created_at)], ['Updated', formatDate(request.updated_at)], ['Emergency', request.emergency ? 'Urgent service requested' : 'Standard request']].map(([label, value]) => <div key={label}><p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>)}</div><div className="mt-7 border-t border-line pt-5"><p className="text-xs font-bold uppercase tracking-wide text-muted">Message</p><p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-muted">{request.message || 'No message provided.'}</p></div><div className="mt-7 flex flex-wrap items-center justify-between gap-3"><select aria-label="Change request status" className="border border-line px-3 py-2 text-sm capitalize" value={request.status} onChange={(event) => onStatusChange(request.id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select><button className="border border-red-200 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-50" onClick={() => onDelete(request.id, request.name)}>Delete request</button></div></div></div> }
