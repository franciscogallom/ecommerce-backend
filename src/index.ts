import express, { Request, Response, NextFunction } from "express"
import path from "path"
import productos from "./productos"

const handlebars = require("express-handlebars")
const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static(path.join(__dirname, "/public")))

// Configuracion de Handlebars.
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index",
    layoutsDir: path.join(__dirname, "/views/layouts"),
    partialsDir: path.join(__dirname, "/views"),
  })
)

// Seteo el motor de plantillas.
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "/views"))

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(`Something broke! ${err.stack}`)
})

app.use("/api/productos", productos)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`)
})
