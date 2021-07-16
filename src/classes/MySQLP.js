const mysql = require("../mysql.js")
const knex = require("knex")(mysql)

class MySQLP {
  constructor() {
    this.table = "productos"
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
      const response = await knex(this.table).where("id", idSearched)
      return response[0] || false
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async addProduct(product) {
    try {
      const id = await knex(this.table).insert(product)
      return { id: id[0], ...product }
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async deleteProductById(idSearched) {
    try {
      const deletedId = await knex(this.table).where("id", idSearched).del()
      return deletedId ? idSearched : false
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async updateProduct(product, idSearched) {
    const newProduct = { id: idSearched, ...product }
    try {
      const res = await knex(this.table)
        .where("id", idSearched)
        .update(newProduct)
      return res ? newProduct : false
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = MySQLP
