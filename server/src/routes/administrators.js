import { Router } from 'express'
import {
  createAdministrator,
  changeAdministratorPassword,
  deleteAdministrator,
  getAdministrator,
  listAdministrators,
  updateAdministratorStatus,
  updateAdministrator,
} from '../controllers/administrators.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'

const administratorsRouter = Router()
administratorsRouter.use(requireAdminAuth)
administratorsRouter.get('/', listAdministrators)
administratorsRouter.post('/', createAdministrator)
administratorsRouter.get('/:id', getAdministrator)
administratorsRouter.patch('/:id/password', changeAdministratorPassword)
administratorsRouter.patch('/:id/status', updateAdministratorStatus)
administratorsRouter.patch('/:id', updateAdministrator)
administratorsRouter.delete('/:id', deleteAdministrator)

export default administratorsRouter
