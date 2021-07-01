const File = require("../classes/File")

const file = new File("cart")

class Cart {
  constructor(cart) {
    this.cart = cart
  }

  getProducts() {
    return this.cart.products.length > 0 ? this.cart : false
  }

  getProductById(idSearched) {
    const indexOfIdSearched = this.cart.products.findIndex(
      (element) => element.id === idSearched
    )
    return indexOfIdSearched !== -1
      ? this.cart.products[indexOfIdSearched]
      : false
  }

  addProduct(product) {
    const newProduct = {
      id: this.cart.products.length + 1,
      timestamp: new Date().toLocaleString(),
      ...product,
    }
    const newProducts = file.read()
    newProducts.products.push(newProduct)
    file.write(newProducts) // Actualizo el archivo.
    this.cart = file.read() // Actualizo los productos de la clase.
    return newProduct
  }

  deleteProductById(idSearched) {
    const indexOfIdSearched = this.cart.products.findIndex(
      (element) => element.id === idSearched
    )

    if (indexOfIdSearched !== -1) {
      const newProducts = file.read()
      newProducts.products.splice(indexOfIdSearched, 1)
      file.write(newProducts)
      this.cart = file.read()
      return newProducts
    } else {
      return false
    }
  }
}

module.exports = Cart
