import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import Boom from '@hapi/boom'

import { prisma } from '../services/db/prisma'

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw Boom.unauthorized('Authentication invalid')
    }

    const token = authHeader.split(' ')[1]
    if (!process.env.JWT_SECRET) throw Boom.internal('JWT secret not found')
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    if (!payload || (typeof payload === 'string')) throw Boom.unauthorized('Invalid token')
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true }
    })
    if (!user) throw Boom.notFound('User nor found')

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}
