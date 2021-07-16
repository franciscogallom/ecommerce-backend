const mongoose = require("mongoose")

const product = mongoose.Schema({
  _id: { type: mongoose.ObjectId, required: true },
  timestamp: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  photoUrl: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
})

const schema = mongoose.Schema(
  {
    timestamp: { type: String, required: true },
    producto: { type: product, required: true },
  },
  { collection: "carrito" }
)

const Cart = mongoose.model("carrito", schema)

module.exports = Cart
