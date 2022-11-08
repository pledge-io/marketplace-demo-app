import * as dotenv from 'dotenv'

import path from 'path'
import logger from 'morgan'
import express from 'express'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import routes from './routes'
import { setLocals } from './middleware';

dotenv.config()

const app = express()

app.locals.NODE_ENV = process.env.NODE_ENV

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('*', setLocals)

// routes
app.get('/', (req, res) => res.redirect('/marketplace'))
app.use(routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app
