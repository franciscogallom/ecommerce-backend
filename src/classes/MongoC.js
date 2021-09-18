const cart = require("../models/cart")
const Mongo = require("./Mongo")
const logger = require("../config/log4js").getLogger("fileError")

class MongoC extends Mongo {
  async getProducts() {
    try {
      const result = await cart.find().lean()
      return result.length > 0 ? result : false
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteAll() {
    try {
      await cart.deleteMany({})
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = MongoC
