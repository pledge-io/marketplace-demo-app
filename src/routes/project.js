import express from 'express'
import { projectController } from '../controllers'
const router = express.Router()

/* GET project */
router.get('/project', projectController)

export default router
