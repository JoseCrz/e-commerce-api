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

  async getOneProduct({ productId }) {
    try {
      const product = await this.mongoDB.getOne(this.collection, productId)
      return product || {}
    } catch (error) {
      console.log(error)
    }
  }

  async createProduct({ product }) {
    try {
      const createdProductId = await this.mongoDB.create(this.collection, product)
      return createdProductId
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct({ productId, product }) {
    try {
      const updatedProductId = await this.mongoDB.update(this.collection, productId, product)
      return updatedProductId
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct({ productId }) {
    try {
      const deletedProductId = await this.mongoDB.delete(this.collection, productId)
      return deletedProductId
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ProductsService