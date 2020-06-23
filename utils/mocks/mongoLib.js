const sinon = require('sinon')
const { productsMock, filteredProductsMock } = require('./products')

const getAllStub = sinon.stub()
const tagQuery = { tags: { $in: ['Hazelnut'] } }

getAllStub.withArgs('products').resolves(productsMock)
getAllStub.withArgs('products', tagQuery).resolves(filteredProductsMock('Hazelnut'))

const createStub = sinon.stub().resolves('5eeffd9be305be0d031e0660')

class MongoLibMock {
  getAll (collection, query) {
    return getAllStub(collection, query)
  }

  create (collection, data) {
    return createStub(collection, data)
  }
}

module.exports = {
  MongoLibMock,
  getAllStub,
  createStub
}