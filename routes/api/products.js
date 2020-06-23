const express = require('express')
const passport = require('passport')

const ProductsService = require('../../services/products')
const validationHandler = require('../../utils/middlewares/validationHandler')
const { productIdSchema, createProductSchema, updateProductSchema} = require('../../utils/schemas/products')
const cacheResponse = require('../../utils/cacheResponse')
const { SIXTY_MINUTES, FIVE_MINUTES }  = require('../../utils/cacheTimes')

// ? JWT Strategy
require('../../utils/auth/strategies/jwt')

const productsService = new ProductsService()

const productsRoutes = app => {
  const router = express.Router()
  app.use('/api/products', router)
  
  // ? List all products
  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES)
    
    const { tags } = req.query
    
    try {
      const products = await productsService.getProducts({ tags })
      
      res.status(200).json({
        data: products,
        message: 'products listed'
      })
  
    } catch (error) {
      next(error)
    }
  })
  
  // ? Create new product
  router.post('/',
    validationHandler(createProductSchema),
    async (req, res, next) => {
      const product  = req.body
      try {
        const createdProduct = await productsService.createProduct({ product })
        
        res.status(201).json({
          data: createdProduct,
          message: 'product created'
        })
      } catch (error) {
        next(error)
      }
    }
  )
  
  // ? Product detail
  router.get('/:productId',
  validationHandler({ productId: productIdSchema }, 'params'),
  async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES)
      
      const { productId } = req.params
  
      try {
        const product = await productsService.getOneProduct({ productId })
        
        res.status('200').json({
          data: product,
          message: 'product retrieved'
        })
      } catch (error) {
        next(error)
      }
    }
  )
  
  // ? Update product
  router.put('/:productId',
    passport.authenticate('jwt',{ session: false }),
    validationHandler({productId: productIdSchema}, 'params'),
    validationHandler(updateProductSchema),
    async (req, res, next) => {
      const { productId } = req.params
      const product = req.body
      
      try {
        const updatedProduct = await productsService.updateProduct({ productId, product})
      
        res.status(200).json({
          data: updatedProduct,
          message: 'product updated'
        })
      } catch (error) {
        next(error)
      }
    }
  )

  // ? Delete a product
  router.delete('/:productId',
  passport.authenticate('jwt',{ session: false }),
  validationHandler({productId: productIdSchema}),
  async (req, res, next) => {
      const { productId } = req.params
      try {
        const deletedProduct = productsService.deleteProduct({ productId })
      
        res.status(200).json({
          data: deletedProduct,
          message: 'product deleted'
        })
      } catch (error) {
        next(error)
      }
    }
  )

}

module.exports = productsRoutes