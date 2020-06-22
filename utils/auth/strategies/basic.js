const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const MongoLib = require('../../../lib/mongo')

passport.use(new BasicStrategy(async (email, password, callback) => {
  const mongoDB = new MongoLib()

  try {
    
    const [user] = await mongoDB.getAll('users', { email })
    
    // check if user exists
    if (!user) {
      return callback(boom.unauthorized(), false)
    }

    // check if passwords match
    if(!(await bcrypt.compare(password, user.password))) {
      return callback(boom.unauthorized(), false)
    }

    delete user.password

    return callback(null, user)

  } catch (error) {
    return callback(error)
  }
}))