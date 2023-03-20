import * as express from 'express'
import UserRouter from './userRouter'
import RoleRouter from './roleRouter'
export const router = express.Router()

router.use('/user', UserRouter)
router.use('/role', RoleRouter)