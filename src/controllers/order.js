import { getHATEOASLink, getOrderById, simulateOrderPayment, placeOrderByWeight, getPortfolioById } from '../services/pledge'

export async function orderController (req, res, next) {
  try {
    const order = await getOrderById(req.params.orderId)
    const portfolio = await getHATEOASLink(order.portfolio.links.self.href)

    res.render('pages/order', {
      order: {
        ...order,
        portfolio
      }
    })
  } catch (error) {
    next(error)
  }
}

export async function orderCheckoutController (req, res, next) {
  try {
    const portfolio = await getPortfolioById(req.params.portfolioId)

    res.render('pages/order-checkout', { portfolio })
  } catch (error) {
    next(error)
  }
}

export async function orderProcessController (req, res, next) {
  try {
    const { portfolioId } = req.params
    const quantity = Number(req.body.quantity)
    const issuedOnBehalfOf = String(req.body.issuedOnBehalfOf)

    if (quantity < 3) {
      return res.status(400).json({ message: 'Invalid quantity, minimum order is 3 kilos' })
    }

    const order = await placeOrderByWeight(portfolioId, quantity, issuedOnBehalfOf)
    const portfolio = await getHATEOASLink(order.portfolio.links.self.href)

    res.render('pages/order', {
      order: {
        ...order,
        portfolio
      }
    })
  } catch {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export async function orderSimulatePaymentController (req, res, next) {
  try {
    const { orderId } = req.params
    const order = await simulateOrderPayment(orderId)
    const portfolio = await getHATEOASLink(order.portfolio.links.self.href)

    res.render('pages/order', {
      order: {
        ...order,
        portfolio
      }
    })
  } catch (error) {
    next(error)
  }
}
