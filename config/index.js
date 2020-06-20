require('dotenv').config()

const config = {
  port: process.env.PORT || 8000,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST
}

module.exports = config