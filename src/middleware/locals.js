export function setLocals (req, res, next) {
  res.locals.url = req.baseUrl
  next()
}
