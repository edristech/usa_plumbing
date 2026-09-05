import { pool } from '../config/database.js'

const allowedStatuses = new Set(['new', 'contacted', 'scheduled', 'completed', 'cancelled'])
const requestColumns = `
  id, name, phone, email, service, preferred_date, preferred_time,
  message, emergency, status, created_at, updated_at`

function parseId(value) {
  const id = Number(value)
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(id) || id < 1) return null
  return id
}

function parsePositiveInteger(value, fallback) {
  if (value === undefined) return fallback
  if (!/^\d+$/.test(value) || Number(value) < 1) return null
  return Number(value)
}

function internalServerError(response, error) {
  console.error('Admin service request operation failed', error)
  return response.status(500).json({ success: false, message: 'Internal server error' })
}

export async function listServiceRequests(request, response) {
  const page = parsePositiveInteger(request.query.page, 1)
  const limit = parsePositiveInteger(request.query.limit, 20)
  const { status, emergency, search } = request.query

  if (!page || !limit || limit > 100 || (status !== undefined && !allowedStatuses.has(status)) || (emergency !== undefined && !['true', 'false'].includes(emergency)) || (search !== undefined && (typeof search !== 'string' || search.trim().length > 100))) {
    return response.status(400).json({ success: false, message: 'Invalid request' })
  }

  const conditions = []
  const values = []
  if (status !== undefined) {
    values.push(status)
    conditions.push(`status = $${values.length}`)
  }
  if (emergency !== undefined) {
    values.push(emergency === 'true')
    conditions.push(`emergency = $${values.length}`)
  }
  if (search?.trim()) {
    values.push(`%${search.trim()}%`)
    conditions.push(`(name ILIKE $${values.length} OR phone ILIKE $${values.length} OR email ILIKE $${values.length})`)
  }
  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  const offset = (page - 1) * limit

  try {
    const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM service_requests ${whereClause}`, values)
    const total = countResult.rows[0].total
    const requestsResult = await pool.query(
      `SELECT ${requestColumns} FROM service_requests ${whereClause}
       ORDER BY created_at DESC, id DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
      [...values, limit, offset],
    )

    return response.json({
      success: true,
      data: requestsResult.rows,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    return internalServerError(response, error)
  }
}

export async function getServiceRequest(request, response) {
  const id = parseId(request.params.id)
  if (!id) return response.status(400).json({ success: false, message: 'Invalid request' })

  try {
    const result = await pool.query(`SELECT ${requestColumns} FROM service_requests WHERE id = $1`, [id])
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Service request not found' })
    return response.json({ success: true, data: result.rows[0] })
  } catch (error) {
    return internalServerError(response, error)
  }
}

export async function updateServiceRequestStatus(request, response) {
  const id = parseId(request.params.id)
  const status = request.body?.status
  if (!id || typeof status !== 'string' || !allowedStatuses.has(status)) {
    return response.status(400).json({ success: false, message: 'Invalid request' })
  }

  try {
    const result = await pool.query(
      `UPDATE service_requests SET status = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2 RETURNING ${requestColumns}`,
      [status, id],
    )
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Service request not found' })
    return response.json({ success: true, data: result.rows[0] })
  } catch (error) {
    return internalServerError(response, error)
  }
}

export async function deleteServiceRequest(request, response) {
  const id = parseId(request.params.id)
  if (!id) return response.status(400).json({ success: false, message: 'Invalid request' })

  try {
    const result = await pool.query('DELETE FROM service_requests WHERE id = $1 RETURNING id', [id])
    if (!result.rowCount) return response.status(404).json({ success: false, message: 'Service request not found' })
    return response.status(204).send()
  } catch (error) {
    return internalServerError(response, error)
  }
}

export async function getDashboardStats(_request, response) {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*)::int AS total,
        COUNT(*) FILTER (WHERE status = 'new')::int AS new,
        COUNT(*) FILTER (WHERE status = 'contacted')::int AS contacted,
        COUNT(*) FILTER (WHERE status = 'scheduled')::int AS scheduled,
        COUNT(*) FILTER (WHERE status = 'completed')::int AS completed,
        COUNT(*) FILTER (WHERE status = 'cancelled')::int AS cancelled,
        COUNT(*) FILTER (WHERE emergency = TRUE)::int AS emergency
      FROM service_requests`)
    return response.json({ success: true, data: result.rows[0] })
  } catch (error) {
    return internalServerError(response, error)
  }
}

function analyticsRange(value) {
  return { today: 1, '7d': 7, '30d': 30, '90d': 90 }[value] || null
}

export async function getDashboardAnalytics(request, response) {
  const range = request.query.range || '30d'
  if (range !== 'all' && !analyticsRange(range)) return response.status(400).json({ success: false, message: 'Invalid request' })
  const days = analyticsRange(range)
  const values = days ? [days] : []
  const where = days ? 'WHERE created_at >= CURRENT_DATE - ($1::int - 1)' : ''
  try {
    const [overTime, byStatus, emergency, byService] = await Promise.all([
      pool.query(`SELECT created_at::date AS date, COUNT(*)::int AS count FROM service_requests ${where} GROUP BY created_at::date ORDER BY date`, values),
      pool.query(`SELECT status, COUNT(*)::int AS count FROM service_requests ${where} GROUP BY status ORDER BY status`, values),
      pool.query(`SELECT COUNT(*) FILTER (WHERE emergency = TRUE)::int AS emergency, COUNT(*) FILTER (WHERE emergency = FALSE)::int AS "nonEmergency" FROM service_requests ${where}`, values),
      pool.query(`SELECT service, COUNT(*)::int AS count FROM service_requests ${where} GROUP BY service ORDER BY count DESC, service`, values),
    ])
    return response.json({ success: true, data: { requestsOverTime: overTime.rows, byStatus: byStatus.rows, emergency: emergency.rows[0], byService: byService.rows } })
  } catch (error) {
    return internalServerError(response, error)
  }
}