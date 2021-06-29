const express = require("express")
const productos = require("./routes/productos")
const carrito = require("./routes/carrito")

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (err, req, res, next) {
  res.status(500).send(`Something broke! ${err.stack}`)
})

app.use("/productos", productos.router)
app.use("/carrito", carrito)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`)
})
