const message = require("../models/message")
const logger = require("../config/log4js").getLogger("fileError")

class Message {
  constructor() {}

  async getAll() {
    try {
      const response = await message.find().lean()
      return response || false
    } catch (error) {
      logger.error(error)
    }
  }

  async getAllByEmail(email) {
    try {
      const response = await message.find({ email })
      return response || false
    } catch (error) {
      logger.error(error)
    }
  }

  async add(data) {
    try {
      const newData = {
        type: process.env.ADMIN === true ? "Sistema" : "Usuario",
        ...data,
      }
      const newMessage = await message.create(newData)
      return newMessage
    } catch (error) {
      logger.error(error)
    }
  }
}

module.exports = new Message()
