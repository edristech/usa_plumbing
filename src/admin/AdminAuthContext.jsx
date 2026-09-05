import { createContext, useContext, useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL
const AdminAuthContext = createContext(null)

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, { ...options, credentials: 'include', headers: { 'Content-Type': 'application/json', ...options.headers } })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(payload.message || 'Request failed')
    error.status = response.status
    throw error
  }
  return payload
}

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    apiRequest('/api/admin/auth/me').then((payload) => setAdmin(payload.data)).catch(() => setAdmin(null)).finally(() => setChecking(false))
  }, [])

  const login = async (email, password) => {
    const payload = await apiRequest('/api/admin/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    setAdmin(payload.data)
  }

  const logout = async () => {
    try { await apiRequest('/api/admin/auth/logout', { method: 'POST' }) } finally { setAdmin(null) }
  }

  return <AdminAuthContext.Provider value={{ admin, checking, login, logout }}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  return useContext(AdminAuthContext)
}
