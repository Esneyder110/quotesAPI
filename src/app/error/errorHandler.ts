import { type ErrorRequestHandler, type Express } from 'express'
import Boom from '@hapi/boom'
import { Prisma } from '@prisma/client'

export function appErrorHandler (app: Express): void {
  app.use(logErrors)
  app.use(prismaErrorHandlerfunction)
  app.use(boomErrorHandlerfunction)
  app.use(genericErrorHandler)
}

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.log('=====================================================================')
  console.log(err, null, 2)
  console.log('=====================================================================')
  next(err)
}

const prismaErrorHandlerfunction: ErrorRequestHandler = (err, req, res, next) => {
  try {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2025') {
        throw Boom.notFound()
      }
    }
    next(err)
  } catch (error) {
    next(error)
  }
}

const boomErrorHandlerfunction: ErrorRequestHandler = (err, req, res, next) => {
  if (Boom.isBoom(err)) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

const genericErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    status: err.status
  })
}

// export const invalidSignatureError: ErrorRequestHandler = (err, req, res, next) => {
//   if (err.message === 'invalid signature') {
//     console.log(err.code)
//     next(Boom.unauthorized('Authentication invalid'))
//   } else {
//     next(err)
//   }
// }

// export const duplicateValueError: ErrorRequestHandler = (err, req, res, next) => {
//   if (err.code && err.code === 11000) {
//     const duplicateValue = Boom.badRequest(
//       `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`
//     )
//     next(duplicateValue)
//   } else {
//     next(err)
//   }
// }

// export const castingError: ErrorRequestHandler = (err, req, res, next) => {
//   if (err.name === 'CastError') {
//     next(Boom.badRequest(`Invalid ${err.path}: ${err.value}`))
//   } else {
//     next(err)
//   }
// }

// export const validationError: ErrorRequestHandler = (err, req, res, next) => {
//   if (err.name === 'ValidationError') {
//     const message = Object.values(err.errors)
//       .map((item: any) => {
//         return `Invalid: ${item.path}: ${item.value}`
//       })
//       .join(', ')
//     next(Boom.badRequest(message))
//   } else {
//     next(err)
//   }
// }
