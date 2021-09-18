const router = require("express").Router()

router.get("/", async (req, res) => {
  // TO-DO: Get user from JWT and send it to "home"
  res.render("home", {})
})

module.exports = router
