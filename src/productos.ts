import express, { Request, Response } from "express"
import { Products } from "./Products"
import { productsMock } from "./productsMock"

const router = express.Router()

const products = new Products(productsMock)

router.get("/listar", (req: Request, res: Response) => {
  const result = products.getProducts()
  result ? res.send(result) : res.send({ error: "No hay productos cargados." })
})

router.get("/listar/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = products.getProductById(id)
  result ? res.send(result) : res.send({ error: "Producto no encontrado." })
})

router.post("/guardar", (req: Request, res: Response) => {
  const newProduct = req.body
  const result = products.addProduct(newProduct)
  res.send(result)
})

router.put("/actualizar/:id", (req: Request, res: Response) => {
  const newProduct = req.body
  const id = parseInt(req.params.id)
  const result = products.updateProduct(newProduct, id)
  result ? res.send(result) : res.send({ error: "Producto no encotrado." })
})

router.delete("/borrar/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = products.deleteProductById(id)
  result ? res.send(result) : res.send({ error: "Producto no encontrado." })
})

export default router
