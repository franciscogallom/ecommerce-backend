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
    this.products.push(newProduct)
    return newProduct
  }

  deleteProductById(idSearched) {
    const indexOfIdSearched = this.products.findIndex(
      (element) => element.id === idSearched
    )
    return indexOfIdSearched !== -1
      ? this.products.splice(indexOfIdSearched, 1)
      : false
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
      this.products[indexOfIdSearched] = updatedProduct
      return updatedProduct
    }
    return false
  }
}

module.exports = Products
