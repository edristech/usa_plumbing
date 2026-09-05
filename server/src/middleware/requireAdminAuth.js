import jwt from 'jsonwebtoken'
import { jwtSecret } from '../config/env.js'

function cookieToken(request) {
  const header = request.get('cookie') || ''
  const match = header.split(';').map((part) => part.trim()).find((part) => part.startsWith('admin_token='))
  if (!match) return null
  try { return decodeURIComponent(match.slice('admin_token='.length)) } catch { return null }
}

export function requireAdminAuth(request, response, next) {
  const authorization = request.get('authorization')
  const bearerToken = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null
  const token = bearerToken || cookieToken(request)

  if (!token || !jwtSecret) return response.status(401).json({ success: false, message: 'Authentication required' })

  try {
    const payload = jwt.verify(token, jwtSecret)
    if (!payload.adminId || !payload.email) throw new Error('Invalid admin token')
    request.admin = { id: payload.adminId, email: payload.email }
    return next()
  } catch {
    return response.status(401).json({ success: false, message: 'Authentication required' })
  }
}
