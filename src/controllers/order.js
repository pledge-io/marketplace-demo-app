import { pledgeApi } from '../services/pledge'

const { PLEDGE_API_URL } = process.env

export async function ordersController (req, res, next) {
  const response = await pledgeApi.get(`${PLEDGE_API_URL}/orders`, {
    params: {
      limit: 7,
      offset: 0
    }
  })
  const orders = response.data.data

  res.render('pages/orders', { orders })
}

export async function orderController (req, res, next) {
  const response = await pledgeApi.get(`${PLEDGE_API_URL}/orders/${req.params.orderId}`)
  const order = response.data

  res.render('pages/order', { order })
}
