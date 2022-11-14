import { getHATEOASLink, getOrderById, simulateOrderPayment } from '../services/pledge'

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

export async function orderSimulatePayment (req, res, next) {
  try {
    const { orderId } = req.params
    await simulateOrderPayment(orderId)

    res.json({ message: 'Payment successful' })
  } catch (error) {
    next(error)
  }
}
