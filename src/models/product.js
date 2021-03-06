const mongoose = require("mongoose")

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    photoUrl: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { collection: "productos" }
)

const Product = mongoose.model("productos", schema)

module.exports = Product
