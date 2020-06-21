const { MongoClient, ObjectId } = require('mongodb')
const { dbUser, dbPassword, dbHost, dbName  } = require('../config')

const MONGO_URI = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}.mongodb.net/${dbName}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    this.dbName = dbName
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(error => {
          if (error) {
            reject(error)
          }

          console.log('[DB] Connected Succesfully!')
          resolve(this.client.db(this.dbName))
        })
      })
    }
    return MongoLib.connection
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

  async getOne(collection, id) {
    try {
      const db = await this.connect()
      return db.collection(collection).findOne({ _id: ObjectId(id)})
    } catch (error) {
      console.log(error)
    }
  }

  async create(collection, data) {
    try {
      const db = await this.connect()
      const result = await db.collection(collection).insertOne(data)
      return result.insertedId
    } catch (error) {
      console.log(error)
    }
  }

  // ! Not Working
  async update(collection, id, data) {
    try {
      const db = await this.connect()
      const result = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true } )
      return result.upsertedId || id
    } catch (error) {
      console.log(error)
    }
  }

  async delete(collection, id) {
    try {
      const db = await this.connect()
      await db.collection(collection).deleteOne({ _id: ObjectId(id) })
      return id
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = MongoLib