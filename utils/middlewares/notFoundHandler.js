const boom = require('@hapi/boom')
const isRequestAjaxOrApi = require('../isRequestAjaxOrApi')


const notFoundHandler = (req, res, next) => {
  if (isRequestAjaxOrApi(req)) {
    const { output: { statusCode, payload } } = boom.notFound()
    res.status(statusCode).json(payload)
  }

  res.status(404).render('404')
}

module.exports = notFoundHandler