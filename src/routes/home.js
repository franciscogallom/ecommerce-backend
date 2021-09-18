const router = require("express").Router()
const User = require("../models/user")
const Products = require("../models/product")
const Cart = require("../models/cart")

router.get("/", async (req, res) => {
  let user, products, cart
  if (req.session.passport?.user) {
    const userId = req.session.passport.user
    user = await User.findById(userId)
    user = user.name
    // .lean() to get a json object (instead of a mongoose one)
    products = await Products.find().lean()
    cart = await Cart.find().lean()
  }
  res.render("home", { user, products, cart })
})

module.exports = router
