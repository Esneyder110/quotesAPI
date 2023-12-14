import { type NextFunction, type Request, type Response } from 'express'

import { prisma } from '../services/db/prisma'
import Boom from '@hapi/boom'

export const getAllQoutes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const quotes = await prisma.quote.findMany()
    res.json(quotes)
  } catch (error) {
    next(error)
  }
}

export const getOneQoute = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    console.log(id)
    const quote = await prisma.quote.findUnique({
      where: { id }
    })
    if (!quote) throw Boom.notFound('Quote not found')

    res.json(quote)
  } catch (error) {
    next(error)
  }
}

export const createQuote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text, author } = req.body
    const quote = await prisma.quote.create({
      data: {
        text,
        author
      }
    })

    res.status(201).json(quote)
  } catch (error) {
    next(error)
  }
}

export const updateQuote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    const data = req.body
    const quote = await prisma.quote.update({
      where: { id },
      data
    })

    res.json(quote)
  } catch (error) {
    next(error)
  }
}

export const deleteQuote = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params
    console.log(id)
    const quote = await prisma.quote.delete({
      where: { id }
    })

    res.json(quote)
  } catch (error) {
    next(error)
  }
}
