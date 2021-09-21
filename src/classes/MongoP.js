const producto = require("../models/product")
const Mongo = require("./Mongo")
const logger = require("../config/log4js").getLogger("fileError")

class MongoP extends Mongo {
  async getProducts(filter) {
    try {
      let response
      if (filter) {
        if (filter.code || filter.name) {
          // Filtro por codigo de producto o nombre.
          response = await producto.find(filter).lean()
        } else {
          const { priceMin, priceMax } = filter
          if (priceMin || priceMax) {
            // Filtro por precio (Si no recibo alguno de los dos, establezco un valor por defecto).
            response = await producto
              .find({
                price: { $gte: priceMin || 0, $lte: priceMax || 999999 },
              })
              .lean()
          } else {
            // Filtro por stock.
            const { stockMin, stockMax } = filter
            if (stockMin || stockMax) {
              response = await producto
                .find({
                  stock: { $gte: stockMin || 0, $lte: stockMax || 999999 },
                })
                .lean()
            } else {
              // Sin filtro.
              response = await producto.find().lean()
            }
          }
        }
      }
      return response.length > 0 ? response : false
    } catch (error) {
      logger.error(error)
    }
  }

  async getProductsByCategory(category) {
    try {
      const response = await producto.find({ category })
      return response.length > 0 ? response : false
    } catch (error) {
      logger.error(error)
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
      logger.error(error)
    }
  }
}

module.exports = MongoP
