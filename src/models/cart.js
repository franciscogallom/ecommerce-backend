const mongoose = require("mongoose")

const product = mongoose.Schema({
  _id: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
})

const schema = mongoose.Schema(
  {
    email: { type: String, required: true },
    timestamp: { type: String, required: true },
    producto: { type: product, required: true },
    quantity: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { collection: "carrito" }
)

const Cart = mongoose.model("carrito", schema)

module.exports = Cart
