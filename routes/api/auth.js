const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const { authJwtSecret } =require('../../config')


// ? Implement basic strategy
require('../../utils/auth/strategies/basic')

const authRoutes = app => {
  const router = express.Router()
  app.use('/api/auth', router)

  router.post('/sign-in', (req, res, next) => {
    passport.authenticate('basic', (error, user) => {
      try {
        if (error || !user) {
          next(boom.unauthorized())
        }
  
        req.login(user, { session: false }, async error => {
          if (error) {
            next(error)
          }
  
          const payload = {
            sub: user.username,
            email: user.email
          }
  
          const token = jwt.sign(payload, authJwtSecret, { expiresIn: '15m' })
  
          return res.status(200).json({
            accessToken: token
          })
  
        })
      } catch (error) {
        next(error)
      }
  
    })(req, res, next)
  })
}


module.exports = authRoutes