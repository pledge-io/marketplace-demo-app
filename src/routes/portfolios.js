import express from 'express'
import { portfoliosController } from '../controllers'
const router = express.Router()

/* GET portfolios */
router.get('/', portfoliosController)

export default router
