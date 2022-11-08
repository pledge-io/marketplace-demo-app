import express from 'express'
import { marketplaceController } from '../controllers'
const router = express.Router()

/* GET portfolios */
router.get('/marketplace', marketplaceController)

export default router
