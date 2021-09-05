require("dotenv").config()
require("./passport/local")

const express = require("express")
const session = require("express-session")
const passport = require("passport")
const sessionConfig = require("./config/session")

const {
  productos,
  carrito,
  login,
  logout,
  signup,
  home,
  error,
} = require("./routes/index")

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (err, req, res, next) {
  res.status(500).send(`Something broke! ${err.stack}`)
})
app.use(express.static(__dirname + "/public"))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())

app.use("/productos", productos)
app.use("/carrito", carrito)
app.use("/login", login)
app.use("/logout", logout)
app.use("/signup", signup)
app.use("/error", error)
app.use("/", home)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`)
})
