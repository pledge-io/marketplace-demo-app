import express from 'express'
const router = express.Router()

/* GET portfolios */
router.get('/marketplace', function (req, res, next) {
  const { baseUrl } = req
  res.render('pages/marketplace', { baseUrl, portfolios: [{ name: 'PT 1' }, { name: 'PT 2' }, { name: 'PT 3' }, { name: 'PT 4' }] })
})

/* GET portfolio */
router.get('/portfolio', function (req, res, next) {
  res.render('pages/portfolio', { portfolio: {} })
})

export default router
