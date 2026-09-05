import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { pool } from '../config/database.js'
import { jwtSecret } from '../config/env.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const cookieName = 'admin_token'
const cookieOptions = `; HttpOnly; SameSite=Lax; Max-Age=${8 * 60 * 60}`

function validEmail(value) {
  return typeof value === 'string' && emailPattern.test(value.trim().toLowerCase())
}

function setAuthCookie(response, token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  response.setHeader('Set-Cookie', `${cookieName}=${encodeURIComponent(token)}${cookieOptions}${secure}; Path=/`)
}

function clearAuthCookie(response) {
  response.setHeader('Set-Cookie', `${cookieName}=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/`)
}

export async function login(request, response) {
  console.log('[AUTH] Login request received')
  const email = typeof request.body?.email === 'string' ? request.body.email.trim().toLowerCase() : ''
  const password = request.body?.password
  if (!validEmail(email) || typeof password !== 'string' || !password) {
    return response.status(400).json({ success: false, message: 'Email and password are required' })
  }
  if (!jwtSecret) return response.status(500).json({ success: false, message: 'Internal server error' })

  try {
    const result = await pool.query('SELECT id, email, password_hash, active FROM administrators WHERE email = $1', [email])
    console.log('[AUTH] Database lookup completed')
    const administrator = result.rows[0]
    const passwordMatches = administrator ? await bcrypt.compare(password, administrator.password_hash) : false
    console.log('[AUTH] Password verification completed')
    if (!administrator || !administrator.active || !passwordMatches) {
      return response.status(401).json({ success: false, message: 'Invalid email or password' })
    }
    const token = jwt.sign({ adminId: administrator.id, email: administrator.email }, jwtSecret, { expiresIn: '8h' })
    console.log('[AUTH] Token/session creation completed')
    setAuthCookie(response, token)
    return response.json({ success: true, data: { id: administrator.id, email: administrator.email } })
  } catch (error) {
    console.error('[AUTH] Login failed at server stage', error.name || 'UnknownError')
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export function me(request, response) {
  return response.json({ success: true, data: request.admin })
}

export function logout(_request, response) {
  clearAuthCookie(response)
  return response.json({ success: true, message: 'Logged out successfully' })
}
