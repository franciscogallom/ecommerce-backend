const mysql = require("../mysql.js")
const knex = require("knex")(mysql)

class MySQLC {
  constructor() {
    this.table = "carrito"
  }

  async getProducts() {
    try {
      const response = await knex.select().from(this.table)
      return response.length > 0 ? response : false
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async getProductById(idSearched) {
    try {
      const response = await knex(this.table).where("idCart", idSearched)
      return response[0] || false
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async addProduct({ timestamp, producto }) {
    const newProduct = {
      timestampCart: timestamp,
      id: producto.id,
      timestamp: producto.timestamp,
      name: producto.name,
      description: producto.description,
      code: producto.code,
      photoUrl: producto.photoUrl,
      price: producto.price,
      stock: producto.stock,
    }
    try {
      const id = await knex(this.table).insert(newProduct)
      return { idCart: id[0], ...newProduct }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteProductById(idSearched) {
    try {
      const deletedId = await knex(this.table).where("idCart", idSearched).del()
      return deletedId ? idSearched : false
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = MySQLC
