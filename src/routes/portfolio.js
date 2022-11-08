import express from 'express'
const router = express.Router()

/* GET portfolios */
router.get('/portfolios', function (req, res, next) {
  const { baseUrl } = req
  res.render('pages/portfolios', { baseUrl, portfolios: [] })
})

/* GET portfolio */
router.get('/portfolio', function (req, res, next) {
  res.render('pages/portfolio', { portfolio: {} })
})

export default router
