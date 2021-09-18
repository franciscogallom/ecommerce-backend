const express = require("express")
const router = express.Router()
const factory = require("../services/factory")
const Products = factory(`${process.env.DB}P`)
const products = new Products("product")
const admin = process.env.ADMIN === "true"

router.get("/:id?", async (req, res) => {
  const { id } = req.params
  if (id) {
    const result = await products.getProductById(id)
    result ? res.send(result) : res.send({ error: "Producto no encontrado." })
  } else {
    const filter = req.query
    const result = await products.getProducts(filter)
    res.render("products", { products: result })
  }
})

router.post("/agregar", async (req, res) => {
  if (admin) {
    const newProduct = req.body
    const result = await products.addProduct(newProduct)
    res.send(result)
  } else {
    res.send({
      error: -1,
      descripcion: `ruta /productos${req.route.path} no autorizada`,
    })
  }
})

router.put("/actualizar/:id", async (req, res) => {
  if (admin) {
    const newProduct = req.body
    const { id } = req.params
    const result = await products.updateProduct(newProduct, id)
    result ? res.send(result) : res.send({ error: "Producto no encotrado." })
  } else {
    res.send({
      error: -1,
      descripcion: `ruta /productos${req.route.path} no autorizada`,
    })
  }
})

router.delete("/borrar/:id", async (req, res) => {
  if (admin) {
    const { id } = req.params
    const deletedProduct = await products.deleteProductById(id)
    deletedProduct
      ? res.send(deletedProduct)
      : res.send({ error: "Producto no encontrado." })
  } else {
    res.send({
      error: -1,
      descripcion: `ruta /productos${req.route.path} no autorizada`,
    })
  }
})

module.exports = router
