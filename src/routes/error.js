const router = require("express").Router()

router.get("/:message", (req, res) => {
  const { message } = req.params
  res.render("error", { message })
})

module.exports = router
