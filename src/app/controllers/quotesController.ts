import { type NextFunction, type Request, type Response } from 'express'

import { prisma } from '../services/db/prisma'
import Boom from '@hapi/boom'
import { CreateQuoteSchema, DeleteQuoteSchema, GetOneQuoteSchema, UpdateQuoteSchema } from '../models/quotesModel'

export const getAllQoutes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quotes = await prisma.quote.findMany()
    res.json({ data: quotes })
  } catch (error) {
    next(error)
  }
}

export const getOneQoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = GetOneQuoteSchema.parse({ id: req.params.id })

    const quote = await prisma.quote.findUnique({
      where: { id }
    })

    if (!quote) throw Boom.notFound('Quote not found')

    res.json({ data: quote })
  } catch (error) {
    next(error)
  }
}

export const createQuote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text, author } = CreateQuoteSchema.parse(req.body)

    const quote = await prisma.quote.create({
      data: {
        text,
        author
      }
    })

    res.status(201).json({ data: quote })
  } catch (error) {
    next(error)
  }
}

export const updateQuote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, ...data } = UpdateQuoteSchema.parse({
      id: req.params.id,
      ...req.body
    })

    const quote = await prisma.quote.update({
      where: { id },
      data
    })

    res.json({ data: quote })
  } catch (error) {
    next(error)
  }
}

export const deleteQuote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = DeleteQuoteSchema.parse({ id: req.params.id })

    const quote = await prisma.quote.delete({
      where: { id }
    })

    res.json({ data: quote })
  } catch (error) {
    next(error)
  }
}
