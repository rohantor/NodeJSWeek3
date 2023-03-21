import * as express from 'express'
import { getAllRoles, getRoleById, insertIntoRole, updateRolePUT } from '../Controllers/roleController'

const router = express.Router()

router.get('/', getAllRoles)
router.get('/:id', getRoleById)
router.post('/', insertIntoRole)
router.put('/', updateRolePUT)

export default router
