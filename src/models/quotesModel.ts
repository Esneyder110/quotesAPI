/**
 * @openapi
 * components:
 *   schemas:
 *
 *     Quote:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         text:
 *           type: string
 *           example: D'oh!
 *         author:
 *           type: string
 *           example: Homer Simpson
 *
 *     CreateQuote:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: D'oh!
 *         author:
 *           type: string
 *           example: Homer Simpson
 *       required:
 *        - text
 *        - author
 *
 *     UpdateQuote:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: D'oh!
 *         author:
 *           type: string
 *           example: Homer Simpson
 */

import { z } from 'zod'

export const QuoteSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid id.' }),
  text: z.string().min(1),
  author: z.string().min(1)
})

export const GetOneQuoteSchema = QuoteSchema.pick({ id: true })
export const DeleteQuoteSchema = QuoteSchema.pick({ id: true })
export const CreateQuoteSchema = QuoteSchema.omit({ id: true })
export const UpdateQuoteSchema = QuoteSchema.partial({ text: true, author: true })

export const GetByAuthorSchema = QuoteSchema.pick({ author: true }).partial()
