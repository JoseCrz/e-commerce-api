const { MongoClient } = require('mongodb')
const { dbUser, dbPassword, dbHost, dbName  } = require('../config')

const MONGO_URI = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}.mongodb.net/${dbName}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    this.dbName = dbName
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(error => {
        if (error) reject(error)

        console.log('[DB] connected succesfully!')
        resolve(this.client.db(this.dbName))
      })
    })
  }

  async getAll(collection, query) {
    try {
      const db = await this.connect()
      return db.collection(collection).find(query).toArray()
    }
    catch (error) {
      console.log(error)
    }
  }
}

module.exports = MongoLib