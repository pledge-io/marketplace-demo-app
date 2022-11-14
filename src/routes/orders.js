import express from 'express'
import { ordersController, orderController, orderSimulatePayment } from '../controllers'
const router = express.Router()

/* GET orders */
router.get('/orders', ordersController)

/* GET order */
router.get('/orders/:orderId', orderController)

/* PUT order payment */
router.put('/orders/:orderId/pay', orderSimulatePayment)

export default router
