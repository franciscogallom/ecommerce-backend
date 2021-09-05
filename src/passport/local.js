const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("../models/user")
const sendEmail = require("../services/sendEmail")

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    err ? done(err, user) : done(null, user)
  })
})

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      const userReceived = req.body
      User.findOne({ username }, (err, user) => {
        if (err) {
          console.log("error in signup: ", err)
          return done(err)
        }
        if (user) {
          console.log("user already exists")
          return done(null, false)
        } else {
          const newUser = new User(userReceived)
          newUser.password = newUser.encryptPassword(password)
          newUser.save((err) => {
            if (err) {
              console.log("error saving user: ", err)
              throw err
            }
            console.log("user registration succesfull!")
            sendEmail(userReceived)
            return done(null, newUser)
          })
        }
      })
    }
  )
)

passport.use(
  "local-login",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          console.log(`user nout found with username "${username}"`)
          return done(null, false)
        }
        if (!user.isCorrectPassword(password)) {
          console.log("invalid pasword")
          return done(null, false)
        }
        console.log("successful login")
        return done(null, user)
      })
    }
  )
)
