import { Router } from 'express'
import { createServiceRequest } from '../controllers/serviceRequests.js'

const serviceRequestsRouter = Router()

serviceRequestsRouter.post('/service-requests', createServiceRequest)

export default serviceRequestsRouter