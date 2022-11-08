import express from 'express'
import { ordersController } from '../controllers'
const router = express.Router()

/* GET orders */
router.get('/orders', ordersController)

export default router
