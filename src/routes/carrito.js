const express = require("express")
const router = express.Router()

const { database } = require("../config.json")
const factory = require("../factory")
const Cart = factory(`${database}C`)
const cart = new Cart("cart")

router.get("/listar/:id?", async (req, res) => {
  const { id } = req.params
  if (id) {
    const result = await cart.getProductById(id)
    result ? res.send(result) : res.send({ error: "Producto no encontrado." })
  } else {
    const result = await cart.getProducts()
    result
      ? res.send(result)
      : res.send({ error: "No hay productos cargados." })
  }
})

router.post("/agregar/:id_producto", async (req, res) => {
  const Products = require(`../classes/${database}P`)
  const products = new Products()
  const id = req.params.id_producto
  const newProduct = await products.getProductById(id)
  if (newProduct) {
    const result = await cart.addProduct({
      timestamp: new Date().toLocaleString(),
      producto: newProduct,
    })
    res.send(result)
  } else {
    res.send("El producto no existe, no se puede agregar al carrito.")
  }
})

router.delete("/borrar/:id", async (req, res) => {
  const { id } = req.params
  const deletedProduct = await cart.deleteProductById(id)
  deletedProduct
    ? res.send(deletedProduct)
    : res.send({ error: "Producto no encontrado." })
})

module.exports = router