export function marketplaceController (req, res, next) {
  const { baseUrl } = req
  res.render('pages/marketplace', { baseUrl, portfolios: [{ name: 'PT 1' }, { name: 'PT 2' }, { name: 'PT 3' }, { name: 'PT 4' }] })
}
