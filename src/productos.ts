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
  products.addProduct(newProduct)
  res.render("index", {
    products: products.getProducts(),
    length: 1,
  })
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

router.get("/vista", (req: Request, res: Response) => {
  const result = products.getProducts()
  res.render("index", {
    nombre: "raul",
    products: result,
    length: result ? result.length : 0,
  })
})

export default router
