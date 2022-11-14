import { orderBy } from 'lodash'
import { getHATEOASLink, getPortfolioById } from '../services/pledge'

export async function portfolioController (req, res, next) {
  try {
    const portfolio = await getPortfolioById(req.params.portfolioId)
    const projects = orderBy(await Promise.all(portfolio.allocations.map(async (allocation) => {
      const project = await getHATEOASLink(allocation.project.links.self.href)
      return { ...project, allocation }
    })), 'allocation.percentage', 'DESC')

    res.render('pages/portfolio', { portfolio, projects })
  } catch (error) {
    next(error)
  }
}
