const express = require("express")
const router = express.Router()
const factory = require("../services/factory")
const Cart = factory(`${process.env.DB}C`)
const cart = new Cart("cart")
const user = require("../models/user")
const sendEmail = require("../services/sendEmailPurchase")
const sendSMS = require("../services/sendSMS")
const sendWsp = require("../services/sendWsp")

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
  const Products = require(`../classes/${process.env.DB}P`)
  const products = new Products("product")
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

router.post("/comprar", async (req, res) => {
  if (!req.session.passport?.user) {
    res.send("Expiro la sesion.")
  } else {
    const result = await cart.getProducts()
    const { name, username, phone } = await user.findById(
      req.session.passport.user
    )
    sendEmail(name, username, result)
    sendSMS(phone)
    sendWsp(name, username)
    res.send(result)
  }
})

module.exports = router
