const assert = require('assert')
const isRequestAjaxOrApi = require('../utils/isRequestAjaxOrApi')
const { AssertionError } = require('assert')

describe('Utils - isRequestAjaxOrApi', () => {
  describe('When req accepts HTML & is not an XMLHttpRequest', () => {
    it('Should return: false', () => {
      const req = {
        accepts: () => true,
        xhr: false
      }

      const result = isRequestAjaxOrApi(req)
      const expected = false
      
      assert.strictEqual(result, expected)
    })
  })

  describe('When req does NOT accepts HTML & is not an XMLHttpRequest', () => {
    it('Should return: true', () => {
      const req = {
        accepts: () => false,
        xhr: false
      }

      const result = isRequestAjaxOrApi(req)
      const expected = true

      assert.strictEqual(result, expected)
    })
  })
  describe('When req does accepts HTML & is an XMLHttpRequest', () => {
    it('Should return: true', () => {
      const req = {
        accepts: () => true,
        xhr: true
      }

      const result = isRequestAjaxOrApi(req)
      const expected = true

      assert.strictEqual(result, expected)
    })
  })
})