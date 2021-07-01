const File = require("../classes/File")

const file = new File("products")

class Products {
  constructor(products) {
    this.products = products
  }

  getProducts() {
    return this.products.length > 0 ? this.products : false
  }

  getProductById(idSearched) {
    const indexOfIdSearched = this.products.findIndex(
      (element) => element.id === idSearched
    )
    return indexOfIdSearched !== -1 ? this.products[indexOfIdSearched] : false
  }

  addProduct(product) {
    const newProduct = {
      id: this.products.length + 1,
      timestamp: new Date().toLocaleString(),
      ...product,
    }
    const newProducts = file.read() // Leo el archivo.
    newProducts.push(newProduct) // Agrego el producto al array.
    file.write(newProducts) // Actualizo el archivo.
    this.products = file.read() // Actualizo los productos de la clase.
    return newProduct
  }

  deleteProductById(idSearched) {
    const indexOfIdSearched = this.products.findIndex(
      (element) => element.id === idSearched
    )
    if (indexOfIdSearched !== -1) {
      const newProducts = file.read()
      newProducts.splice(indexOfIdSearched, 1)
      file.write(newProducts)
      this.products = file.read()
      return newProducts
    } else {
      return false
    }
  }

  updateProduct(product, idSearched) {
    const indexOfIdSearched = this.products.findIndex(
      (element) => element.id === idSearched
    )
    if (indexOfIdSearched !== -1) {
      const updatedProduct = {
        id: idSearched,
        timestamp: new Date().toLocaleString(),
        ...product,
      }
      const newProducts = file.read()
      newProducts[indexOfIdSearched] = updatedProduct
      file.write(newProducts)
      this.products = file.read()
      return updatedProduct
    }
    return false
  }
}

module.exports = Products
