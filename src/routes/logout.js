const router = require("express").Router()

router.post("/", async (req, res) => {
  req.logout()
  res.redirect("/")
})

module.exports = router
