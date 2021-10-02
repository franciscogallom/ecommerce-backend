const mongoose = require("mongoose")

const schema = mongoose.Schema(
  {
    email: { type: String, required: true },
    type: { type: String, required: true },
    timestamp: { type: String, required: true },
    body: { type: String, required: true },
  },
  { collection: "mensajes" }
)

const Message = mongoose.model("mensajes", schema)

module.exports = Message
