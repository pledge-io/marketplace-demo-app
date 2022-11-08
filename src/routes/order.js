import express from 'express'
const router = express.Router()

/* GET orders */
router.get('/orders', function (req, res, next) {
  res.render('pages/orders', { orders: [] })
})

export default router
