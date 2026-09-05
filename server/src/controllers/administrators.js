import bcrypt from 'bcryptjs'
import { pool } from '../config/database.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const adminColumns = 'id, email, active, created_at, updated_at'

function normalizedEmail(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}

function validEmail(email) {
  return emailPattern.test(email)
}

function invalidRequest(response) {
  return response.status(400).json({ success: false, message: 'Invalid request' })
}

export async function listAdministrators(_request, response) {
  try {
    const result = await pool.query(`SELECT ${adminColumns} FROM administrators ORDER BY created_at ASC, id ASC`)
    return response.json({ success: true, data: result.rows })
  } catch (error) {
    console.error('Administrator listing failed', error)
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export async function createAdministrator(request, response) {
  const email = normalizedEmail(request.body?.email)
  const password = request.body?.password
  if (!validEmail(email) || typeof password !== 'string' || password.length < 12) return invalidRequest(response)

  try {
    const passwordHash = await bcrypt.hash(password, 12)
    const result = await pool.query(
      `INSERT INTO administrators (email, password_hash) VALUES ($1, $2) RETURNING ${adminColumns}`,
      [email, passwordHash],
    )
    return response.status(201).json({ success: true, data: result.rows[0] })
  } catch (error) {
    if (error.code === '23505') return response.status(400).json({ success: false, message: 'An administrator with that email already exists' })
    console.error('Administrator creation failed', error)
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export async function updateAdministrator(request, response) {
  const id = Number(request.params.id)
  const email = normalizedEmail(request.body?.email)
  if (!Number.isSafeInteger(id) || id < 1 || !validEmail(email)) return invalidRequest(response)

  try {
    const result = await pool.query(
      `UPDATE administrators SET email = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 RETURNING ${adminColumns}`,
            [email, id],
    )
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Administrator not found' })
    return response.json({ success: true, data: result.rows[0] })
  } catch (error) {
    if (error.code === '23505') return response.status(400).json({ success: false, message: 'An administrator with that email already exists' })
    console.error('Administrator update failed', error)
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export async function getAdministrator(request, response) {
  const id = Number(request.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return invalidRequest(response)
  try {
    const result = await pool.query(`SELECT ${adminColumns} FROM administrators WHERE id = $1`, [id])
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Administrator not found' })
    return response.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Administrator lookup failed', error)
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export async function changeAdministratorPassword(request, response) {
  const id = Number(request.params.id)
  const newPassword = request.body?.newPassword
  if (!Number.isSafeInteger(id) || id < 1 || typeof newPassword !== 'string' || newPassword.length < 12) return invalidRequest(response)
  try {
    const passwordHash = await bcrypt.hash(newPassword, 12)
    const result = await pool.query('UPDATE administrators SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id', [passwordHash, id])
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Administrator not found' })
    return response.json({ success: true, message: 'Administrator password changed' })
  } catch (error) {
    console.error('Administrator password change failed', error)
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export async function updateAdministratorStatus(request, response) {
  const id = Number(request.params.id)
  const active = request.body?.active
  if (!Number.isSafeInteger(id) || id < 1 || typeof active !== 'boolean') return invalidRequest(response)
  try {
    if (!active) {
      const activeCount = await pool.query('SELECT COUNT(*)::int AS count FROM administrators WHERE active = TRUE')
      if (activeCount.rows[0].count <= 1) return response.status(400).json({ success: false, message: 'The last active administrator cannot be deactivated' })
    }
    const result = await pool.query(`UPDATE administrators SET active = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING ${adminColumns}`, [active, id])
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Administrator not found' })
    return response.json({ success: true, data: result.rows[0] })
  } catch (error) {
    console.error('Administrator status update failed', error)
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}

export async function deleteAdministrator(request, response) {
  const id = Number(request.params.id)
  if (!Number.isSafeInteger(id) || id < 1) return invalidRequest(response)

  try {
    const countResult = await pool.query('SELECT COUNT(*)::int AS count FROM administrators')
    if (countResult.rows[0].count <= 1) return response.status(400).json({ success: false, message: 'The last administrator cannot be deleted' })
    const result = await pool.query('DELETE FROM administrators WHERE id = $1 RETURNING id', [id])
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Administrator not found' })
    return response.status(204).send()
  } catch (error) {
    console.error('Administrator deletion failed', error)
    return response.status(500).json({ success: false, message: 'Internal server error' })
  }
}
