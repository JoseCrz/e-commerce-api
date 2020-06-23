const express = require('express')

const { dev } = require('../../config')
const ProductsService = require('../../services/products')
const cacheResponse = require('../../utils/cacheResponse')
const { FIVE_MINUTES } = require('../../utils/cacheTimes')

const productsService = new ProductsService()

const productsRoutes = app => {
  const router = express.Router()
  app.use('/products', router)

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES)
    
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