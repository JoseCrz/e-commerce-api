const express = require('express')
const router = express.Router()

const products = [
  {
    name: 'Red Honey',
    price: 75,
    image: 'https://cdn.shopify.com/s/files/1/0271/3472/2105/products/WhatsApp_Image_2020-06-04_at_11-removebg-preview_1296x.png?v=1591654871'
  },
  {
    name: 'Lavado',
    price: 70,
    image: 'https://cdn.shopify.com/s/files/1/0271/3472/2105/products/WhatsApp_Image_2020-06-04_at_11-removebg-preview_1296x.png?v=1591654871'
  }
] 

router.get('/', (req, res) => {
  res.render('products', { products })
})

module.exports = router