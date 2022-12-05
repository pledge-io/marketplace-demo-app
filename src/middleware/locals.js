import _ from 'lodash'
import packageJson from '../../package.json'

const SDGS_MAP = {
  NP: 'No Poverty',
  ZH: 'Zero Hunger',
  GHW: 'Good Health And Well Being',
  QE: 'Quality Education',
  GE: 'Gender Equality',
  CWS: 'Clean Water And Sanitation',
  ACE: 'Affordable And Clean Energy',
  DWEG: 'Decent Work And Economic Growth',
  III: 'Industry Innovation And Infrastructure',
  RI: 'Reducing Inequality',
  SCC: 'Sustainable Cities And Communities',
  RCP: 'Responsible Consumption And Production',
  CA: 'Climate Action',
  LBW: 'Life Below Water',
  LL: 'Life On Land',
  PJSI: 'Peace Justice And Strong Institutions',
  PG: 'Partnerships For The Goals'
}

export function setLocals (req, res, next) {
  res.locals._ = _
  res.locals.url = req.baseUrl
  res.locals.SDGS_MAP = SDGS_MAP
  res.locals.isPortfolioSoldOut = (portfolio) => {
    return portfolio.available_weight_kg <= 2
  }
  res.locals.version = packageJson.version
  next()
}
