const mongoose = require("mongoose")

const schema = mongoose.Schema(
  {
    timestamp: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    photoUrl: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { collection: "productos" }
)

const Product = mongoose.model("productos", schema)

module.exports = Product
