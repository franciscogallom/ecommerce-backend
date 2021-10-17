const router = require("express").Router()
const passport = require("passport")
const user = require("../models/user")

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { _id } = req.user
    const myUser = await user.findById(_id)
    res.render("home", { user: myUser.name })
  }
)

router.get("/", async (req, res) => {
  res.render("home", {})
})

module.exports = router
