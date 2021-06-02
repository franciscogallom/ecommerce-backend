interface Product {
  title: string
  price: number
  thumbnail: string
  id: number
}

interface ProductReceived {
  title: string
  price: number
  thumbnail: string
}

export class Products {
  products: Product[]

  constructor(products: Product[]) {
    this.products = products
  }

  getProducts() {
    return this.products.length > 0 ? this.products : false
  }

  getProductById(idSearched: number) {
    const indexOfIdSearched = this.products.findIndex(
      (element) => element.id === idSearched
    )
    return indexOfIdSearched !== -1 ? this.products[indexOfIdSearched] : false
  }

  addProduct(product: ProductReceived) {
    const newProduct = { ...product, id: this.products.length + 1 }
    this.products.push(newProduct)
    return newProduct
  }

  deleteProductById(idSearched: number) {
    const indexOfIdSearched = this.products.findIndex(
      (element) => element.id === idSearched
    )
    return indexOfIdSearched !== -1
      ? this.products.splice(indexOfIdSearched, 1)
      : false
  }

  updateProduct(product: ProductReceived, idSearched: number) {
    const indexOfIdSearched = this.products.findIndex(
      (element) => element.id === idSearched
    )
    if (indexOfIdSearched !== -1) {
      this.products[indexOfIdSearched] = { ...product, id: idSearched }
      return product
    }
    return false
  }
}
