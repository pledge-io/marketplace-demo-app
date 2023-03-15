import { orderBy } from 'lodash';
import { getPortfolioById } from '../services/pledge';

export async function portfolioController(req, res, next) {
  try {
    const portfolio = await getPortfolioById(req.params.portfolioId);
    const allocations = orderBy(portfolio.allocations, 'percentage', 'desc');

    res.render('pages/portfolio', { portfolio, allocations });
  } catch (error) {
    next(error);
  }
}
