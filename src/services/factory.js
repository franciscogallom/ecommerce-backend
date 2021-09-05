const logger = require("../config/log4js").getLogger("fileError")

const factory = (type) => {
  try {
    const module = require(`../classes/${type}`)
    return module
  } catch (error) {
    logger.error(
      `No se encontro el tipo de persistencia "${type}". Error: ${error}"`
    )
  }
}

module.exports = factory
