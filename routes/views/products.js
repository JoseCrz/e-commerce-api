const express = require('express')

const ProductsService = require('../../services/products')
const { dev } = require('../../config')
const productsService = new ProductsService()

const productsRoutes = app => {
  const router = express.Router()
  app.use('/products', router)

  router.get('/', async (req, res, next) => {
    const { tags } = req.query
    try {
      const products = await productsService.getProducts({ tags })
      res.render('products', { products, dev })
    } catch (error) {
      next(error)
    }
  })
}


module.exports = productsRoutes