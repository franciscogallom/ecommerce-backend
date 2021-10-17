const user = require("../models/user")
const logger = require("../config/log4js").getLogger("fileError")

class User {
  constructor() {}

  async findById(id) {
    try {
      const response = await user.findById(id)
      return response || false
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = new User()
