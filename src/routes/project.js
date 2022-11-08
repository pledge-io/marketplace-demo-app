import express from 'express'
const router = express.Router()

/* GET project */
router.get('/project', function (req, res, next) {
  res.render('pages/project', { project: {} })
})

export default router
