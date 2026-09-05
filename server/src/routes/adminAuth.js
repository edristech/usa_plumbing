import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { login, logout, me } from '../controllers/adminAuth.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'

const adminAuthRouter = Router()
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Please try again later.' },
})

adminAuthRouter.post('/login', loginLimiter, login)
adminAuthRouter.get('/me', requireAdminAuth, me)
adminAuthRouter.post('/logout', logout)

export default adminAuthRouter
