import { Router } from 'express'

import { createQuote, deleteQuote, getAllQoutes, getOneQoute, updateQuote } from '../controllers/quotesController'

const qouteRouter = Router()

qouteRouter.route('/').get(getAllQoutes)
qouteRouter.route('/:id').get(getOneQoute)

// Enpoints protected with auth middleware
// router.use(auth)
qouteRouter.route('/').post(createQuote)
qouteRouter.route('/:id').patch(updateQuote).delete(deleteQuote)

export default qouteRouter
