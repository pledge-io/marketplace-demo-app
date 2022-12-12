import express from 'express'
import {
  orderController,
  ordersController,
  orderProcessController,
  orderCheckoutController,
  orderSimulatePaymentController
} from '../controllers'

const router = express.Router()

/* GET orders */
router.get('/orders', ordersController)

/* GET order */
router.get('/orders/:orderId', orderController)

/* GET order checkout */
router.get('/orders/checkout/:portfolioId', orderCheckoutController)

/* POST order checkout */
router.post('/orders/checkout/:portfolioId', orderProcessController)

/* PUT order payment */
router.post('/orders/:orderId/pay', orderSimulatePaymentController)

export default router
