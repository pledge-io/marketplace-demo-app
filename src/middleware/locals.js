import _ from 'lodash'

export function setLocals (req, res, next) {
  res.locals.url = req.baseUrl
  res.locals._ = _
  next()
}
