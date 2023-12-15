import { type Express, Router } from 'express'

import qouteRouter from './quotesRouter'
import authRouter from './authRouter'

export const apiRouter = (app: Express): void => {
  const apiv1 = Router()
  apiv1.use('/auth', authRouter)
  apiv1.use('/quotes', qouteRouter)
  app.use('/api/v1', apiv1)
}
