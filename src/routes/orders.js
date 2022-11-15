import express from 'express'
import {
  orderController,
  ordersController,
  orderSimulatePayment,
  orderProcessController,
  orderCheckoutController
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
router.put('/orders/:orderId/pay', orderSimulatePayment)

export default router