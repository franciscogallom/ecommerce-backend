const router = require("express").Router()

router.get("/", async (req, res) => {
  res.send("HOME")
})

module.exports = router
