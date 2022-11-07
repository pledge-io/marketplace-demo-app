import { sortBy } from 'lodash'
import { pledgeApi } from '../services/pledge'

const { PLEDGE_API_URL } = process.env

export async function portfolioController (req, res, next) {
  try {
    const response = await pledgeApi.get(`${PLEDGE_API_URL}/portfolios/${req.params.portfolioId}`)
    const portfolio = response.data
    const { allocations } = portfolio
    const projects = sortBy(await Promise.all(allocations.map(async (allocation) => {
      const response = await pledgeApi.get(allocation.project.links.self.href)
      return {
        ...response.data,
        allocation
      }
    })), 'allocation.percentage').reverse()

    res.render('pages/portfolio', { portfolio, projects })
  } catch (error) {
    next(error)
  }
}
