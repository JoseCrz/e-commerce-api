const express  = require('express')
const PORT = require('./config').port
const path = require('path')

const productsRouter = require('./routes/views/products')
const productsAPIRouter = require('./routes/api/products')
const { logErrors, clientErrorHandler, errorHandler } = require('./utils/middlewares/errorHandlers')

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

// ? Error Handlers
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 🚀`)
})
