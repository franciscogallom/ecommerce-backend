import { IProductReceived } from "../interfaces/Product"
import { ICart } from "../interfaces/Cart"

export class Cart {
  cart: ICart

  constructor(cart: ICart) {
    this.cart = cart
  }

  getProducts() {
    return this.cart.products.length > 0 ? this.cart : false
  }

  getProductById(idSearched: number) {
    const indexOfIdSearched = this.cart.products.findIndex(
      (element) => element.id === idSearched
    )
    return indexOfIdSearched !== -1
      ? this.cart.products[indexOfIdSearched]
      : false
  }

  addProduct(product: IProductReceived) {
    const newProduct = {
      id: this.cart.products.length + 1,
      timestamp: new Date().toLocaleString(),
      ...product,
    }
    this.cart.products.push(newProduct)
    return newProduct
  }

  deleteProductById(idSearched: number) {
    const indexOfIdSearched = this.cart.products.findIndex(
      (element) => element.id === idSearched
    )
    return indexOfIdSearched !== -1
      ? this.cart.products.splice(indexOfIdSearched, 1)
      : false
  }
}
