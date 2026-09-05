import { pool } from '../config/database.js'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function trimmedString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function createServiceRequest(request, response) {
  const body = request.body && typeof request.body === 'object' ? request.body : {}
  const name = trimmedString(body.name)
  const phone = trimmedString(body.phone)
  const email = trimmedString(body.email)
  const service = trimmedString(body.service)
  const message = trimmedString(body.message)
  const preferredDate = trimmedString(body.preferred_date) || null
  const preferredTime = trimmedString(body.preferred_time) || null
  const emergency = body.emergency === undefined ? false : body.emergency

  if (!name || !phone || !email || !service || !message) {
    return response.status(400).json({
      error: 'Bad Request',
      message: 'name, phone, email, service, and message are required',
    })
  }

  if (!emailPattern.test(email)) {
    return response.status(400).json({
      error: 'Bad Request',
      message: 'email must have a valid format',
    })
  }

  if (typeof emergency !== 'boolean') {
    return response.status(400).json({
      error: 'Bad Request',
      message: 'emergency must be a boolean',
    })
  }

  try {
    const result = await pool.query(
      `INSERT INTO service_requests
        (name, phone, email, service, preferred_date, preferred_time, message, emergency)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, status`,
      [name, phone, email, service, preferredDate, preferredTime, message, emergency],
    )

    return response.status(201).json({
      success: true,
      message: 'Service request submitted successfully',
      data: result.rows[0],
    })
  } catch (error) {
    console.error('Service request insertion failed', error)
    return response.status(500).json({
      error: 'Internal Server Error',
      message: 'Unable to submit service request',
    })
  }
}