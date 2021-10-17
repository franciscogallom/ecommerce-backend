const express = require("express")
const router = express.Router()
const factory = require("../services/factory")
const Cart = factory(`${process.env.DB}C`)
const cart = new Cart("cart")
const Order = factory(`${process.env.DB}O`)
const order = new Order("order")
const sendEmail = require("../services/sendEmailPurchase")
const logger = require("../config/log4js").getLogger("fileError")
const User = require("../models/user")

router.get("/:id?", async (req, res) => {
  const { id } = req.params
  if (id) {
    const result = await cart.getProductById(id)
    result ? res.send(result) : res.send({ error: "Producto no encontrado." })
  } else {
    const result = await cart.getProducts()
    res.render("cart", { cart: result })
  }
})

router.post("/agregar/:id_producto", async (req, res) => {
  const Products = require(`../classes/${process.env.DB}P`)
  const products = new Products("product")
  const id = req.params.id_producto
  const { quantity, address } = req.body
  let email
  if (req.session.passport?.user) {
    email = await User.findById(req.session.passport.user)
    email = email.username
  } else {
    res.send("No esta logueado")
  }

  const newProduct = await products.getProductById(id)
  if (newProduct) {
    const result = await cart.addProduct({
      timestamp: new Date().toLocaleString(),
      producto: newProduct,
      quantity,
      email,
      address,
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
    : res.send({ error: "Carrito no encontrado." })
})

router.post("/comprar", async (req, res) => {
  try {
    let user
    if (req.session.passport?.user) {
      const userId = req.session.passport.user
      user = await User.findById(userId)
    }

    const name = user.name
    const destinationEmail = user.username

    let items = await cart.getProducts()
    items = items.map((item) => {
      return { quantity: item.quantity, ...item.producto }
    })
    numberOfOrder = await order.getNextOrderNumber()

    await order.addProduct({
      email: destinationEmail,
      timestamp: new Date().toLocaleString(),
      state: "Generada",
      numberOfOrder,
      items,
    })

    // Send email to buyer.
    sendEmail(destinationEmail, name)
    // Send same email to admin.
    sendEmail(process.env.ADMIN_EMAIL, name)

    cart.deleteAll()
    res.redirect("/")
  } catch (error) {
    logger.error(error)
    res.redirect("/error/sistema")
  }
})

module.exports = router
