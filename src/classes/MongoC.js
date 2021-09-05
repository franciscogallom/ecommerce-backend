const cart = require("../models/cart")
const Mongo = require("./Mongo")
const logger = require("../config/log4js").getLogger("fileError")

class MongoC extends Mongo {
  async getProducts() {
    try {
      const response = await cart.find()
      const result = response.map((cart) => cart.producto)
      return result.length > 0 ? result : false
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = MongoC
