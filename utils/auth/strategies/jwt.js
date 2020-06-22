const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('@hapi/boom')

const MongoLib = require('../../../lib/mongo')
const { authJwtSecret } = require('../../../config')

passport.use(new Strategy({
  secretOrKey: authJwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()

}, async (tokenPayload, callback) => {
  const mongoDB = new MongoLib()

  try {
    const [user] = await mongoDB.getAll('users', { email: tokenPayload.email})

    if (!user) {
      return callback(boom.unauthorized(), false)
    }

    delete user.password

    callback(null, user)
  } catch (error) {
    console.log(error)
  }
}))