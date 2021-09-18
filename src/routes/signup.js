const router = require("express").Router()
const passport = require("passport")

router.post(
  "/",
  passport.authenticate("local-signup", {
    successRedirect: "/productos",
    failureRedirect: "/error/signUp",
    passReqToCallback: true,
  })
)

module.exports = router
