const { dev } = require('../config')

const cacheResponse = (res, seconds) => {
  if (!dev) {
    res.set('Cache-Control', `public, max-age=${seconds}`)
  }
}

module.exports = cacheResponse