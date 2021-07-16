const producto = require("../models/product")
const Mongo = require("./Mongo")

class MongoP extends Mongo {
  async getProducts(filter) {
    try {
      let response
      if (filter) {
        if (filter.code || filter.name) {
          // Filtro por codigo de producto o nombre.
          response = await producto.find(filter)
        } else {
          const { priceMin, priceMax } = filter
          if (priceMin || priceMax) {
            // Filtro por precio (Si no recibo alguno de los dos, establezco un valor por defecto).
            response = await producto.find({
              price: { $gte: priceMin || 0, $lte: priceMax || 999999 },
            })
          } else {
            // Filtro por stock.
            const { stockMin, stockMax } = filter
            if (stockMin || stockMax) {
              response = await producto.find({
                stock: { $gte: stockMin || 0, $lte: stockMax || 999999 },
              })
            } else {
              // Sin filtro.
              response = await producto.find()
            }
          }
        }
      }
      return response.length > 0 ? response : false
    } catch (error) {
      console.log(error)
    }
  }

  async updateProduct(product, idSearched) {
    const newProduct = { _id: idSearched, ...product }
    try {
      const { n } = await producto.updateOne(
        { _id: idSearched },
        { $set: product }
      )
      return n ? newProduct : false
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MongoP
