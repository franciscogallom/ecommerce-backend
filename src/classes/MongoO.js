const order = require("../models/order")
const Mongo = require("./Mongo")
const logger = require("../config/log4js").getLogger("fileError")

class MongoO extends Mongo {
  async getNextOrderNumber() {
    try {
      const result = await order.find()
      return result.length
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = MongoO
