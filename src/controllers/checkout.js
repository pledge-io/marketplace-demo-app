import { placeOrderByWeight, getPortfolioById } from '../services/pledge'

export async function checkoutController (req, res, next) {
  try {
    const portfolio = await getPortfolioById(req.params.portfolioId)

    res.render('pages/checkout', { portfolio })
  } catch (error) {
    next(error)
  }
}

export async function processCheckoutController (req, res, next) {
  try {
    const { portfolioId } = req.params
    const quantity = Number(req.body.quantity)

    if (quantity < 3) {
      return res.status(400).json({ message: 'Invalid quantity, minimum order is 3 kilos' })
    }

    const order = await placeOrderByWeight(portfolioId, quantity)

    res.json(order)
  } catch {
    res.send(500).json({ message: 'Something went wrong' })
  }
}
