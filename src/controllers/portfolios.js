import { pledgeApi } from '../services/pledge'

const { PLEDGE_API_URL } = process.env

export async function portfoliosController (req, res, next) {
  try {
    const result = await pledgeApi.get(`${PLEDGE_API_URL}/portfolios`, {
      params: {
        limit: 2,
        offset: 0
      }
    })

    res.render('pages/portfolios', { portfolios: result.data.data })
  } catch (error) {
    next(error)
  }
}
