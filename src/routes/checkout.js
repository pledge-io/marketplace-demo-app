import express from 'express'
import { checkoutController, processCheckoutController } from '../controllers'
const router = express.Router()

/* GET checkout */
router.get('/checkout/:portfolioId', checkoutController)

/* POST checkout */
router.post('/checkout/:portfolioId', processCheckoutController)

export default router
