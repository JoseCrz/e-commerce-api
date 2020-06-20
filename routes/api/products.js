const express = require('express')
const router = express.Router()
const productsMock = require('../utils/mocks/products')

router.get('/', (req, res) => {
  res.status(200).json({
    data: productsMock,
    message: 'products listed'
  })
})

router.post('/', (req, res) => {
  res.status(201).json({
    data: '13432353423',
    message: 'product created'
  })
})

router.get('/:productId', (req, res) => {
  const { productId } = req.params

  res.status('200').json({
    data: productsMock[0],
    message: 'product retrieved'
  })
})

router.put('/:productId', (req, res) => {
  const productData = req.body

  res.status(200).json({
    data: '12556543432',
    message: 'product updated'
  })
})

router.delete('/:productId', (req, res) => {
  const { productId } = req.params

  res.status(200).json({
    data: '24654q232423',
    message: 'product deleted'
  })
})

module.exports = router