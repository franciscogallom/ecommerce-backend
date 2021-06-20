import { IProduct, IProductReceived } from "../interfaces/Product"

export class Products {
  products: IProduct[]

  constructor(products: IProduct[]) {
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

  addProduct(product: IProductReceived) {
    const newProduct = {
      id: this.products.length + 1,
      timestamp: new Date().toLocaleString(),
      ...product,
    }
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

  updateProduct(product: IProductReceived, idSearched: number) {
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
