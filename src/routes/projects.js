import express from 'express';
import { projectController } from '../controllers';
const router = express.Router();

/* GET project */
router.get('/projects/:projectId', projectController);

export default router;
