import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import AdminDashboard from './admin/AdminDashboard.jsx'
import { AdminAuthProvider } from './admin/AdminAuthContext.jsx'
import { AdminLoading } from './admin/AdminLogin.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import PageMeta from './components/PageMeta.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Emergency from './pages/Emergency.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import Services from './pages/Services.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </BrowserRouter>
  )
}

function AppRoutes() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<AdminLoading />} />
      </Routes>
    )
  }

  return (
    <>
      <PageMeta />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:service" element={<ServiceDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/emergency-plumber" element={<Emergency />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App