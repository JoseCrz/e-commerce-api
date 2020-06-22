const bcrypt = require('bcrypt')
const chalk = require('chalk')

const MongoLib = require('../../lib/mongo')

const { authAdminUsername, authAdminEmail, authAdminPassword} = require('../../config')

const buildAdminUser = password => {
  return {
    password,
    username: authAdminUsername,
    email: authAdminEmail
  }
}

const hasAdminUser = async mongoDB => {
  const adminUser = await mongoDB.getAll('users', { username: authAdminUsername} )
  
  return adminUser && adminUser.length
}

const createAdminUser = async mongoDB => {
  const hashedPassword = await bcrypt.hash(authAdminPassword, 10)
  const createdUserId = await mongoDB.create('users', buildAdminUser(hashedPassword))
  return createdUserId
}

const seedAdmin = async () => {
  try {
    const mongoDB = new MongoLib()
    
    if (await hasAdminUser(mongoDB)) {
      console.log(chalk.yellow('Admin user already exists'))
      return process.exit(0)
    }

    const adminUserId = await createAdminUser(mongoDB)
    console.log(chalk.green(`Admin user has been created with ID: ${adminUserId}`))

    return process.exit(0)
  } catch (error) {
    console.log(chalk.red(error))
    return process.exit(1)
  }
}

// * run from terminal
seedAdmin()