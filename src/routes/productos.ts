import express, { Request, Response } from "express"
import { Products } from "../classes/Products"
import { productsMock } from "../mocks/products"

const router = express.Router()
const admin = true
export const products = new Products(productsMock)

router.get("/listar/:id?", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (id) {
    const result = products.getProductById(id)
    result ? res.send(result) : res.send({ error: "Producto no encontrado." })
  } else {
    const result = products.getProducts()
    result
      ? res.send(result)
      : res.send({ error: "No hay productos cargados." })
  }
})

router.post("/agregar", (req: Request, res: Response) => {
  if (admin) {
    const newProduct = req.body
    const result = products.addProduct(newProduct)
    res.send(result)
  } else {
    res.send({
      error: -1,
      descripcion: `ruta /productos${req.route.path} no autorizada`,
    })
  }
})

router.put("/actualizar/:id", (req: Request, res: Response) => {
  if (admin) {
    const newProduct = req.body
    const id = parseInt(req.params.id)
    const result = products.updateProduct(newProduct, id)
    result ? res.send(result) : res.send({ error: "Producto no encotrado." })
  } else {
    res.send({
      error: -1,
      descripcion: `ruta /productos${req.route.path} no autorizada`,
    })
  }
})

router.delete("/borrar/:id", (req: Request, res: Response) => {
  if (admin) {
    const id = parseInt(req.params.id)
    const result = products.deleteProductById(id)
    result ? res.send(result) : res.send({ error: "Producto no encontrado." })
  } else {
    res.send({
      error: -1,
      descripcion: `ruta /productos${req.route.path} no autorizada`,
    })
  }
})

export default router
