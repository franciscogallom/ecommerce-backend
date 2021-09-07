require("dotenv").config()
require("./passport/local")

const express = require("express")
const session = require("express-session")
const handlebars = require("express-handlebars")
const path = require("path")
const passport = require("passport")
const sessionConfig = require("./config/session")
const logger = require("./config/log4js").getLogger()
const handlebarsConfig = require("./config/handlebars")

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

// Middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (err, req, res, next) {
  res.status(500).send(`Something broke. ${err.stack}`)
})
app.use(express.static(__dirname + "/public"))
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())

// Routes.
app.use("/productos", productos)
app.use("/carrito", carrito)
app.use("/login", login)
app.use("/logout", logout)
app.use("/signup", signup)
app.use("/error", error)
app.use("/", home)

// Handlebars.
app.engine("hbs", handlebars(handlebarsConfig))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../public/views"))

app.listen(PORT, () => {
  logger.info(`server running on port ${PORT}!`)
})
