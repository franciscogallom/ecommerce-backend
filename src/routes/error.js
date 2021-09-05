const router = require("express").Router()

router.get("/:message", (req, res) => {
  const { message } = req.params
  res.send({ error: `Algo salio mal en ${message}` })
})

module.exports = router
