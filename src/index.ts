import express, { Request, Response, NextFunction } from "express"
import { Products } from "./Products"
import { productsMock } from "./productsMock"

const PORT = 8080
const products = new Products(productsMock)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(`Something broke! ${err.stack}`)
})

app.get("/api/productos/listar", (req: Request, res: Response) => {
  const result = products.getProducts()
  result ? res.send(result) : res.send({ error: "No hay productos cargados." })
})

app.get("/api/productos/listar/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const result = products.getProductById(id)
  result ? res.send(result) : res.send({ error: "Producto no encontrado." })
})

app.post("/api/productos/guardar", (req: Request, res: Response) => {
  const newProduct = req.body
  const result = products.addProduct(newProduct)
  res.send(result)
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`)
})
