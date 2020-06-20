const express = require('express')
const router = express.Router()
const ProductsService = require('../../services/products')

const productsService = new ProductsService()

router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
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
})

router.get('/:productId', async (req, res, next) => {
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
})

router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params
  const productData = req.body
  
  try {
    const updatedProduct = await productsService.updateProduct({ productId, productData})
  
    res.status(200).json({
      data: updatedProduct,
      message: 'product updated'
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async (req, res, next) => {
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
})

module.exports = router