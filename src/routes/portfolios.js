import express from 'express'
import { portfoliosController, portfolioController } from '../controllers'
const router = express.Router()

/* GET portfolios */
router.get('/', portfoliosController)

/* GET portfolio */
router.get('/portfolios/:portfolioId', portfolioController)

export default router
