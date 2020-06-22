const express  = require('express')
const PORT = require('./config').port
const path = require('path')
const boom = require('@hapi/boom')

const productsRouter = require('./routes/views/products')
const productsAPIRouter = require('./routes/api/products')
const { logErrors, errorWrapper, clientErrorHandler, errorHandler } = require('./utils/middlewares/errorHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')

const  app = express()

// ? Middleware
app.use(express.json())

// ? Static files settings
app.use('/static', express.static(path.join(__dirname, 'static')))

// ? View engine settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// ? Routes
app.use('/products', productsRouter)
app.use('/api/products', productsAPIRouter)

// ? Home Redirect
app.get('/', (req, res) => {
  res.redirect('/products')
})

// ? Not Found
app.use((req, res, next) => {
  if (isRequestAjaxOrApi(req)) {
    const { output: { statusCode, payload } } = boom.notFound()
    res.status(statusCode).json(payload)
  }

  res.status(404).render('404')
})


// ? Error Handlers
app.use(logErrors)
app.use(errorWrapper)
app.use(clientErrorHandler)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 🚀`)
})
