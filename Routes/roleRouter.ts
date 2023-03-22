import * as express from 'express'
import { getAllRoles, getRoleById, insertIntoRole, updateRolePATCH, updateRolePUT } from '../Controllers/roleController'

const router = express.Router()

router.get('/', getAllRoles)
router.get('/:id', getRoleById)
router.post('/', insertIntoRole)
router.put('/:id', updateRolePUT)
router.patch('/:id', updateRolePATCH)

export default router
