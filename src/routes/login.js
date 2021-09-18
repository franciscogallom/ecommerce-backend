const router = require("express").Router()
const passport = require("passport")

router.post(
  "/",
  passport.authenticate("local-login", {
    successRedirect: "/productos",
    failureRedirect: "/error/logIn",
    passReqToCallback: true,
  })
)

module.exports = router
