import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

const { PLEDGE_API_KEY, PLEDGE_API_URL } = process.env

if (!PLEDGE_API_KEY) {
  throw new Error('PLEDGE_API_KEY environment variable is not defined')
}

if (!PLEDGE_API_URL) {
  throw new Error('PLEDGE_API_URL environment variable is not defined')
}

export const pledgeApi = axios.create({
  baseURL: `${PLEDGE_API_URL}`,
  headers: {
    'X-Api-Key': PLEDGE_API_KEY
  }
})

pledgeApi.interceptors.response.use(function responseDataUnpacker (axiosConfig) {
  // unpack HTTP responses so result is just the data instead of axios data wrapper
  if (!axiosConfig.config.packResponseData) {
    axiosConfig = axiosConfig.data
  }

  return axiosConfig
})

// Helpers

export function getHATEOASLink (link) {
  return pledgeApi.get(link, { baseURL: '' })
}

export async function getPortfolios () {
  const result = await pledgeApi.get('/portfolios', {
    params: {
      limit: 2,
      offset: 0
    }
  })

  return result.data
}

export function getPortfolioById (portfolioId) {
  return pledgeApi.get(`/portfolios/${portfolioId}`)
}

export async function getOrders () {
  const result = await pledgeApi.get('/orders', {
    params: {
      limit: 7,
      offset: 0
    }
  })

  return result.data
}

export function getOrderById (orderId) {
  return pledgeApi.get(`/orders/${orderId}`)
}

export function getProjectById (projectId) {
  return pledgeApi.get(`/projects/${projectId}`)
}

export function simulateOrderPayment (orderId) {
  return pledgeApi.put(`/orders/${orderId}/pay`)
}

export function placeOrderByWeight (portfolioId, amountInKg) {
  return pledgeApi.post('/orders/weight', {
    portfolio_id: portfolioId,
    amount_in_kg: amountInKg,
    metadata: {
      source: 'pledge-io-marketplace-demo'
    }
  })
}
