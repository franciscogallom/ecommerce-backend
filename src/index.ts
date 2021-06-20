import express, { Request, Response, NextFunction } from "express"

import productos from "./routes/productos"
import carrito from "./routes/carrito"

const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(`Something broke! ${err.stack}`)
})

app.use("/productos", productos)
app.use("/carrito", carrito)

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`)
})
