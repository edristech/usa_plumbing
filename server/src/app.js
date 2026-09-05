import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import adminServiceRequestsRouter from './routes/adminServiceRequests.js'
import administratorsRouter from './routes/administrators.js'
import adminAuthRouter from './routes/adminAuth.js'
import healthRouter from './routes/health.js'
import serviceRequestsRouter from './routes/serviceRequests.js'
import { frontendOrigins } from './config/env.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: (origin, callback) => callback(null, !origin || frontendOrigins.includes(origin)), credentials: true }))
app.use(express.json())
app.use('/api', healthRouter)
app.use('/api', serviceRequestsRouter)
app.use('/api/admin/auth', adminAuthRouter)
app.use('/api/admin/administrators', administratorsRouter)
app.use('/api/admin', adminServiceRequestsRouter)
app.use(notFoundHandler)
app.use(errorHandler)

export default app
