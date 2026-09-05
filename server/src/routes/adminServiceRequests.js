import { Router } from 'express'
import {
  deleteServiceRequest,
  getServiceRequest,
  getDashboardStats,
  getDashboardAnalytics,
  listServiceRequests,
  updateServiceRequestStatus,
} from '../controllers/adminServiceRequests.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'

const adminServiceRequestsRouter = Router()

adminServiceRequestsRouter.use(requireAdminAuth)
adminServiceRequestsRouter.get('/dashboard/stats', getDashboardStats)
adminServiceRequestsRouter.get('/dashboard/analytics', getDashboardAnalytics)
adminServiceRequestsRouter.get('/service-requests', listServiceRequests)
adminServiceRequestsRouter.get('/service-requests/:id', getServiceRequest)
adminServiceRequestsRouter.patch('/service-requests/:id/status', updateServiceRequestStatus)
adminServiceRequestsRouter.delete('/service-requests/:id', deleteServiceRequest)

export default adminServiceRequestsRouter