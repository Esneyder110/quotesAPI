import { Router } from 'express'

import { login, register } from '../controllers/authController'

const authRouter = Router()

authRouter.route('/login').post(login)
authRouter.route('/register').post(register)

export default authRouter
