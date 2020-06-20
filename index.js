const express  = require('express')
const PORT = require('./config').port
const path = require('path')

const productsRouter = require('./routes/products')
const productsAPIRouter = require('./routes/api/products')

const  app = express()

// ? Middleware

app.use(express.json())

app.use('/static', express.static(path.join(__dirname, 'static')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/products', productsRouter)
app.use('/api/products', productsAPIRouter)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 🚀`)
})
