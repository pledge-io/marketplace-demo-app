import { getPortfolios } from '../services/pledge'

export async function portfoliosController (req, res, next) {
  try {
    const portfolios = await getPortfolios()

    res.render('pages/portfolios', { portfolios })
  } catch (error) {
    next(error)
  }
}
