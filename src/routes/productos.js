const express = require("express")
const Products = require("../classes/Products")
const productsMock = require("../mocks/products")

const router = express.Router()
const admin = true
const products = new Products(productsMock)

router.get("/listar/:id?", (req, res) => {
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

router.post("/agregar", (req, res) => {
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

router.put("/actualizar/:id", (req, res) => {
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

router.delete("/borrar/:id", (req, res) => {
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

module.exports = { router, products }
