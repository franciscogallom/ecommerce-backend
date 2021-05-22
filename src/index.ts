import express, { Request, Response } from "express"
import fs from "fs"

const PORT = 8080
let counterItems = 0
let counterItemRandom = 0

const app = express()

app.get("/items", async (req: Request, res: Response) => {
  counterItems++
  try {
    const products = await fs.promises.readFile("./src/products.txt", "utf-8")
    const productsParse = JSON.parse(products)
    const response = {
      items: productsParse,
      cantidad: productsParse.length,
    }
    res.send(response)
  } catch (error) {
    console.log(error)
  }
})

app.get("/item-random", async (req: Request, res: Response) => {
  counterItemRandom++
  try {
    const products = await fs.promises.readFile("./src/products.txt", "utf-8")
    const productsParse = JSON.parse(products)
    const randomNumber = Math.floor(Math.random() * productsParse.length)
    const response = {
      item: productsParse[randomNumber],
    }
    res.send(response)
  } catch (error) {
    console.log(error)
  }
})

app.get("/visitas", (req: Request, res: Response) => {
  res.send({ visitas: { items: counterItems, item: counterItemRandom } })
})

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`)
})
