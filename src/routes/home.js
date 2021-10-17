const router = require("express").Router()
const User = require("../classes/User")

router.get("/", async (req, res) => {
  let user
  if (req.session.passport?.user) {
    const userId = req.session.passport.user
    user = await User.findById(userId)
    user = user.name
  }
  res.render("home", { user })
})

module.exports = router
