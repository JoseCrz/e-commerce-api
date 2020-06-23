const productsMock = [
  {
    name: 'Thippanahalli Estate',
    price: 360,
    image: 'https://cdn.shopify.com/s/files/1/3006/6212/products/DCC_India_Thippa-250g_1200x.jpg?v=1558577723',
    tags: ['Dark Chocolate', 'Hazelnut', 'Brown Spice',]
  },
  {
    name: 'Thippanahalli Estate',
    price: 360,
    image: 'https://cdn.shopify.com/s/files/1/3006/6212/products/DCC_India_Thippa-250g_1200x.jpg?v=1558577723',
    tags: ['Dark Chocolate', 'Hazelnut', 'Brown Spice',]
  },
]

const filteredProductsMock = tag => {
  return productsMock.filter(product => product.tags.includes(tag))
}

class ProductsServiceMock {
  async getProducts() {
    return Promise.resolve(productsMock)
  }

  async getOneProduct() {
    return Promise.resolve(productsMock[0])
  }

  async createProducts() {
    return Promise.resolve('5eeffd9be305be0d031e0660')
  }
}

module.exports = {
  productsMock,
  filteredProductsMock,
  ProductsServiceMock
}