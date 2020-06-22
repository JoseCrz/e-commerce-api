const express  = require('express')
const PORT = require('./config').port
const path = require('path')

const productsRouter = require('./routes/views/products')
const productsAPIRouter = require('./routes/api/products')
const authAPIRouter = require('./routes/api/auth')
const { logErrors, errorWrapper, clientErrorHandler, errorHandler } = require('./utils/middlewares/errorHandlers')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')
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
app.use('/api/auth', authAPIRouter)

// ? Home Redirect
app.get('/', (req, res) => {
  res.redirect('/products')
})

// ? Not Found
app.use(notFoundHandler)


// ? Error Handlers
app.use(logErrors)
app.use(errorWrapper)
app.use(clientErrorHandler)
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 🚀`)
})
