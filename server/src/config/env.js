import 'dotenv/config'

export const port = Number.parseInt(process.env.PORT || '3001', 10)
export const jwtSecret = process.env.JWT_SECRET
export const frontendOrigin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
export const frontendOrigins = (process.env.FRONTEND_ORIGINS || `${frontendOrigin},http://127.0.0.1:5173`)
	.split(',')
	.map((origin) => origin.trim())
	.filter(Boolean)
