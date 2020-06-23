const assert = require('assert')
const proxyquire = require('proxyquire')

const { productsMock, ProductsServiceMock } = require('../utils/mocks/products')
const testServer = require('../utils/testServer')

describe('Routes - API - Products', () => {
  const route = proxyquire('../routes/api/products.js', {
    '../../services/products': ProductsServiceMock
  })

  const request = testServer(route)

  describe('GET /api/products', () => {

    it('Should respond with status: 200', done => {
      request.get('/api/products').expect(200, done)
    })

    it('Should respond with Content-type json/application', done => {
      request.get('/api/products').expect('Content-type', /json/, done)
    })

    it('Should NOT respond with an error', done => {
      request.get('/api/products').end((error, res) => {
        assert.strictEqual(error, null)
        done()
      })
    })

    it('should respond with the list of products', done => {
      request.get('/api/products').end((error, res) => {
        assert.deepEqual(res.body, {
          data: productsMock,
          message: 'products listed'
        })
        done()
      })
    })

  })
})