import { pledgeApi } from '../services/pledge'

export async function marketplaceController (req, res, next) {
  try {
    const result = await pledgeApi.get('/portfolios', {
      params: {
        limit: 2,
        offset: 0
      }
    })

    res.render('pages/marketplace', { portfolios: result.data.data })
  } catch (error) {
    next(error)
  }
}
