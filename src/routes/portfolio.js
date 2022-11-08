import express from 'express'
import { portfolioController } from '../controllers'
const router = express.Router()

/* GET portfolio */
router.get('/portfolio', portfolioController)

export default router
