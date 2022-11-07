import express from 'express'
import { ordersController, orderController } from '../controllers'
const router = express.Router()

/* GET orders */
router.get('/orders', ordersController)

/* GET order */
router.get('/orders/:orderId', orderController)

export default router
