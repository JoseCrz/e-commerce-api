const Sentry = require('@sentry/node')
const boom = require('@hapi/boom')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')
const { dev, sentryDNS, sentryID } = require('../../config')

if (!dev) {
  Sentry.init({ dsn: `https://${sentryDNS}/${sentryID}` })
}

// ? Inner Util
const withErrorStack = (error, stack) => {
  if (dev) {
    return { ...error, stack }  // == Object.assign({}, error, stack)
  }
}

const logErrors = (error, req, res, next) => {
  if (!dev) {
    Sentry.captureException(error)
  }

  console.log(error.stack)
  next(error)
}

// * Wraps error with Boom
const errorWrapper = (error, req, res, next) => {
  if (!error.isBoom) {
    next(boom.badImplementation(error))
  }

  next(error)
}

const clientErrorHandler = (error, req, res, next) => {
  // Destructure from boom-wrapped error
  const { output: { statusCode, payload } } = error
  
  // Catch errors for AJAX, API or Streaming Requests
  if (isRequestAjaxOrApi(req) || req.headersSent) {
    res.status(statusCode).json(withErrorStack(payload, error.stack))
  } else {
    next(error)
  }
}


const errorHandler = (error, req, res, next) => {
  // Destructure from boom-wrapped error
  const { output: { statusCode, payload } } = error

  res.status(statusCode)
  res.render('error', withErrorStack(payload, error.stack))
}

module.exports = {
  logErrors,
  errorWrapper,
  clientErrorHandler,
  errorHandler
}