import { Router } from 'express'

import { createQuote, deleteQuote, getAllQoutes, getOneQoute, getRandomQoute, updateQuote } from '../controllers/quotesController'
import { auth } from '../middleware/authMiddleware'

const qouteRouter = Router()
/**
 * @openapi
 * /api/v1/quotes:
 *   get:
 *     summary: Get all Quotes
 *     tags:
 *       - Quotes
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: false
 *         description: Author name of the quotes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Quote"
 *       5XX:
 *        description: Internal server error
 *
 */
qouteRouter.route('/').get(getAllQoutes)

/**
 * @openapi
 * /api/v1/quotes/random:
 *   get:
 *     summary: Get a Random Quote
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Quote not found
 *       5XX:
 *        description: Internal server error
 *
 */
qouteRouter.route('/random').get(getRandomQoute)

/**
 * @openapi
 * /api/v1/quotes/{id}:
 *   get:
 *     summary: Get a Quote by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the quote to get
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Quote not found
 *       5XX:
 *        description: Internal server error
 *
 */
qouteRouter.route('/:id').get(getOneQoute)

// Enpoints protected with auth middleware
qouteRouter.use(auth)

/**
 * @openapi
 * /api/v1/quotes:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a Quote
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuote'
 *     tags:
 *       - Quotes
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       400:
 *         description: Bad Request
 *       5XX:
 *        description: Internal server error
 *
 */
qouteRouter.route('/').post(createQuote)

/**
 * @openapi
 * /api/v1/quotes/{id}:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a Quote
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateQuote'
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Quote not found
 *       5XX:
 *        description: Internal server error
 *
 */
qouteRouter.route('/:id').patch(updateQuote)

/**
 * @openapi
 * /api/v1/quotes/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Delete a Quote
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: String ID of the quote to delete
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 data:
 *                   $ref: "#/components/schemas/Quote"
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Quote not found
 *       5XX:
 *        description: Internal server error
 *
 */
qouteRouter.route('/:id').delete(deleteQuote)

export default qouteRouter
