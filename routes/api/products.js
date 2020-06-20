const express = require('express')
const router = express.Router()
const productsMock = require('../utils/mocks/products')

router.get('/', (req, res) => {
  res.status(200).json({
    data: productsMock,
    message: 'products listed'
  })
})

module.exports = router