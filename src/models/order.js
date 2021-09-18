const mongoose = require("mongoose")

const product = mongoose.Schema({
  _id: { type: mongoose.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
})

const schema = mongoose.Schema(
  {
    email: { type: String, required: true },
    timestamp: { type: String, required: true },
    state: { type: String, required: true },
    numberOfOrder: { type: Number, required: true },
    items: { type: [product], required: true },
  },
  { collection: "ordenes" }
)

const Order = mongoose.model("ordenes", schema)

module.exports = Order
