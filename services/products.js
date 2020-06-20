const productsMock = require('../utils/mocks/products')
const MongoLib = require('../lib/mongo')

class ProductsService {
  constructor() {
    this.collection = 'products'
    this.mongoDB = new MongoLib()
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } }
    try {
      const products = await this.mongoDB.getAll(this.collection, query)
      return products || []
    } catch (error) {
      console.log(error)
    }
  }

  getOneProduct({ productId }) {
    return Promise.resolve(productsMock[0])
  }

  createProduct({ product }) {
    return Promise.resolve(productsMock)
  }

  updateProduct({ productId, product }) {
    return Promise.resolve(productsMock[0])
  }

  deleteProduct({ productId }) {
    return Promise.resolve(productsMock[0])
  }
}

module.exports = ProductsService