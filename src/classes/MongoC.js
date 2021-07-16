const cart = require("../models/cart")
const Mongo = require("./Mongo")

class MongoC extends Mongo {
  async getProducts() {
    try {
      const response = await cart.find()
      const result = response.map((cart) => cart.producto)
      return result.length > 0 ? result : false
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MongoC
