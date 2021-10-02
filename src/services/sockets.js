const messages = require("../classes/Message")
const logger = require("../config/log4js").getLogger("fileError")

async function socketFunction(io, socket) {
  socket.emit("messages", await messages.getAll())

  socket.on("new-message", async (data) => {
    // Save the message in the DB.
    try {
      await messages.add(data)
      io.sockets.emit("messages", await messages.getAll())
    } catch (error) {
      logger.error("Error al guardar el mensaje en la DB")
    }
  })
}

module.exports = socketFunction
