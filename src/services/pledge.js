import got from 'got'
import * as dotenv from 'dotenv'
import NodeCache from 'node-cache'
dotenv.config()

const { PLEDGE_API_KEY, PLEDGE_API_URL } = process.env

if (!PLEDGE_API_KEY) {
  throw new Error('PLEDGE_API_KEY environment variable is not defined')
}

if (!PLEDGE_API_URL) {
  throw new Error('PLEDGE_API_URL environment variable is not defined')
}

// Let's use a cache to improve performance and reduce Pledge's API usage costs
const cache = new NodeCache()
const FIVE_MINUTES = 5 * 60
const ONE_DAY = 24 * 60 * 60

const pledgeApi = got.extend({
  prefixUrl: PLEDGE_API_URL,
  headers: { 'X-Api-Key': PLEDGE_API_KEY }
})

// Helpers
export function getHATEOASLink (link) {
  return pledgeApi.extend({ prefixUrl: '' }).get(link, { baseURL: '' }).json()
}

export async function getPortfolios () {
  if (cache.has('portfolios')) {
    return cache.get('portfolios')
  }

  const result = await pledgeApi.get('portfolios', {
    searchParams: {
      limit: 2,
      offset: 0
    }
  }).json()

  cache.set('portfolios', result.data, FIVE_MINUTES)

  return result.data
}

export async function getPortfolioById (portfolioId) {
  const path = `portfolios/${portfolioId}`

  if (cache.has(path)) {
    return cache.get(path)
  }

  const result = await pledgeApi.get(path, {
    searchParams: {
      expand: true
    }
  }).json()

  cache.set(path, result, FIVE_MINUTES)

  return result
}

export async function getProjectById (projectId) {
  const path = `projects/${projectId}`

  if (cache.has(path)) {
    return cache.get(path)
  }

  const result = await pledgeApi.get(path).json()

  // project's data rarely change, let's cache them for a day
  cache.set(path, result, ONE_DAY)

  return result
}

export async function getOrders () {
  const result = await pledgeApi.get('orders', {
    params: {
      limit: 7,
      offset: 0
    }
  }).json()

  return result.data
}

export function getOrderById (orderId) {
  return pledgeApi.get(`orders/${orderId}`).json()
}

export function simulateOrderPayment (orderId) {
  return pledgeApi.put(`orders/${orderId}/pay`).json()
}

export async function placeOrderByWeight (portfolioId, amountInKg, issuedOnBehalfOf = undefined) {
  return pledgeApi.post('orders/weight', {
    json: {
      portfolio_id: portfolioId,
      amount_in_kg: amountInKg,
      issued_on_behalf_of: issuedOnBehalfOf,
      metadata: {
        source: 'pledge-io-marketplace-demo'
      }
    }
  }).json()
}
