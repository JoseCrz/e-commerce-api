const { dev } = require('../../config')

const logErrors = (error, req, res, next) => {
  console.log(error.stack)
  next(error)
}

// ? Catch errors for AJAX Requests
const clientErrorHandler = (error, req, res, next) => {
  if (req.xhr) {
    res.status(500).json({ error: error.message })
  } else {
    next(error)
  }
}

// ? Catch errors for streaming
const errorHandler = (error, req, res, next) => {
  if (res.headersSent) {
    next(error)
  }

  if (!dev) {
    delete error.stack
  }

  res.status(error.status || 500)
  res.render('error', { error })
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
}