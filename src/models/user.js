const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
  },
  { collection: "usuarios" }
)

schema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

schema.methods.isCorrectPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model("usuarios", schema)

module.exports = User
