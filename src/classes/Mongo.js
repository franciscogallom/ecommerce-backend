const logger = require("../config/log4js").getLogger("fileError")
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
