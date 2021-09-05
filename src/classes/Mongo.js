const mongoose = require("mongoose")
const logger = require("../config/log4js").getLogger("fileError")

async function createConnection() {
  return await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cluster0.sqkzp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}

createConnection().catch(() => logger.error("Fallo la conexión a Mongoose."))

class Mongo {
  constructor(type) {
    this.type = require(`../models/${type}`)
  }

  async getProductById(idSearched) {
    try {
      const response = await this.type.findById(idSearched)
      return response || false
    } catch (error) {
      logger.error(error)
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await this.type.create(product)
      return newProduct
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteProductById(idSearched) {
    try {
      const productToDelete = await this.type.findById(idSearched)
      await this.type.deleteOne({ _id: idSearched })
      return productToDelete
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = Mongo
