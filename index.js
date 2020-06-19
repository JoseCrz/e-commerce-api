const express  = require('express')
const PORT = require('./config').port
const path = require('path')

const productsRouter = require('./routes/products')

const  app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use('/products', productsRouter)

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT} 🚀`)
})
