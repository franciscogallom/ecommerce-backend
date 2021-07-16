const factory = (type) => {
  try {
    const module = require(`./classes/${type}`)
    return module
  } catch (error) {
    console.log("No se encontro el tipo de persistencia: ", type, error)
  }
}

module.exports = factory
