require("dotenv").config()
require("./passport/local")

const express = require("express")
const handlebars = require("express-handlebars")
const path = require("path")
const passport = require("passport")
const logger = require("./config/log4js").getLogger()
const handlebarsConfig = require("./config/handlebars")
const sockets = require("./services/sockets")
const createConnection = require("./services/createConnection")
const session = require("express-session")
const sessionConfig = require("./config/session")

const {
  productos,
  carrito,
  login,
  logout,
  signup,
  home,
  error,
  info,
  chat,
} = require("./routes/index")

const PORT = process.env.PORT || 8080
const HOST = process.env.HOST || "0.0.0.0"
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

// DB Connection.
createConnection().catch(() => logger.error("Fallo la conexión a Mongoose."))

// Middlewares.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (err, req, res, next) {
  res.redirect(`/error/sistema. ${err.stack}`)
})
app.use(express.static(path.join(__dirname, "../public")))
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
app.use("/info", info)
app.use("/", home)
app.use("/chat", chat)

// Handlebars.
app.engine("hbs", handlebars(handlebarsConfig))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "../public/views"))

// Sockets.
io.on("connection", (socket) => sockets(io, socket))

http.listen(PORT, HOST, () => {
  logger.info(`server running on port ${PORT}!`)
})
