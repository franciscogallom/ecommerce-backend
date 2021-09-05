const router = require("express").Router()
const passport = require("passport")

router.post(
  "/",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/error/signUp",
    passReqToCallback: true,
  })
)

module.exports = router
