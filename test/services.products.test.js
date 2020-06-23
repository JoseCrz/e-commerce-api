const assert = require('assert')
const proxyquire = require('proxyquire')

const { MongoLibMock, getAllStub, createStub } = require('../utils/mocks/mongoLib')
const { productsMock, filteredProductsMock  } = require('../utils/mocks/products')

describe('Services - Products', () => {
  const ProductsService = proxyquire('../services/products.js', {
    '../lib/mongo': MongoLibMock
  })

  const productsService = new ProductsService()

  describe('When getProducts method is called...', async () => {
    it('Should call getAll method from MongoLib', async () => {
      await productsService.getProducts({})
      assert.strictEqual(getAllStub.called, true)
    })

    it('Should return an array of products', async () => {
      const result = await productsService.getProducts({})
      const expected = productsMock
      assert.deepEqual(result, expected)
    })
  })

  describe('When getProducts method is called with tags', async () => {
    it('Should call getAll method from MongoLib with the tags', async () => {
      await  productsService.getProducts({ tags: ['Hazelnut'] })
      const tagQuery = { tags: { $in: ['Hazelnut'] } }
      assert.strictEqual(getAllStub.calledWith('products', tagQuery), true)
    })

    it('Should return an array of filtered products by tag', async () => {
      const result = await productsService.getProducts({ tags: ['Hazelnut'] })
      const expected = filteredProductsMock('Hazelnut')
      assert.deepEqual(result, expected)
    })
    
  })
})