import express, { Request, Response } from "express"
import { Cart } from "../classes/Cart"
import { cartMock } from "../mocks/cart"
import { products } from "../routes/productos"

const cart = new Cart(cartMock)

const router = express.Router()

router.get("/listar/:id?", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (id) {
    const result = cart.getProductById(id)
    result
      ? res.send(result)
      : res.send({ error: "Producto no encontrado en el carrito." })
  } else {
    const result = cart.getProducts()
    result
      ? res.send(result)
      : res.send({ error: "No hay productos cargados en el carrito." })
  }
})

router.post("/agregar/:id_producto", (req: Request, res: Response) => {
  const id = parseInt(req.params.id_producto)
  const newProduct = products.getProductById(id)
  if (newProduct) {
    cart.addProduct(newProduct)
    res.send(newProduct)
  } else {
    res.send("El producto no existe, no se puede agregar al carrito.")
  }
})

router.delete("/borrar/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = cart.deleteProductById(id)
  result
    ? res.send(result)
    : res.send({ error: "Producto no encontrado en el carrito." })
})

export default router
