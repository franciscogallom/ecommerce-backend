const router = require("express").Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")

router.post("/", async (req, res, next) => {
  let token = null
  passport.authenticate("local-login", async (err, user, info) => {
    try {
      if (err || !user) {
        return next(new Error("Error"))
      }
      req.logIn(user, { session: false }, async (err) => {
        if (err) return next(err)
        const body = { _id: user._id, email: user.email }
        token = jwt.sign({ user: body }, "secret")
        res.redirect(`/profile?token=${token}`)
      })
    } catch (error) {
      res.redirect("/error/logIn")
    }
  })(req, res, next)
})

module.exports = router
