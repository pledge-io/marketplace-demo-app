import { getOrders } from '../services/pledge'

export async function ordersController (req, res, next) {
  try {
    const orders = await getOrders()

    res.render('pages/orders', { orders })
  } catch (error) {
    next(error)
  }
}
