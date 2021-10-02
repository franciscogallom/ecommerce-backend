const router = require("express").Router()
const messages = require("../classes/Message")

router.get("/", async (req, res) => {
  res.render("messages")
})

router.get("/:email", async (req, res) => {
  const { email } = req.params
  const response = await messages.getAllByEmail(email)
  res.send(response)
})

module.exports = router
