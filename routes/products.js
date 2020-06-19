const express = require('express')
const router = express.Router()

const products = [
  {
    name: 'Red Honey',
    price: 75
  },
  {
    name: 'Lavado',
    price: 70
  }
] 

router.get('/', (req, res) => {
  res.render('products', { products })
})

module.exports = router