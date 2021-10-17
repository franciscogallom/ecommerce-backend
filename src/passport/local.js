const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("../models/user")
const sendEmail = require("../services/sendEmailLogin")
const logger = require("../config/log4js").getLogger()
const loggerError = require("../config/log4js").getLogger("fileError")
const loggerWarn = require("../config/log4js").getLogger("fileWarn")
const JWTStrategy = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt

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
          loggerError.error(`error in signup: ${err}`)
          return done(err)
        }
        if (user) {
          logger.info(`user "${userReceived.username}" already exists`)
          return done(null, false)
        } else {
          if (userReceived.password === userReceived.passwordCheck) {
            const newUser = new User(userReceived)
            newUser.password = newUser.encryptPassword(password)
            newUser.save((err) => {
              if (err) {
                logger.error(`error saving user: ${err}`)
                throw err
              }
              logger.info(`user "${username}" registration successful.`)
              sendEmail(userReceived)
              return done(null, newUser)
            })
          } else {
            logger.info("incorrect password check")
            return done(null, false)
          }
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
          logger.info(`user nout found with username "${username}"`)
          return done(null, false)
        }
        if (!user.isCorrectPassword(password)) {
          loggerWarn.warn(`invalid pasword - user: ${username}`)
          return done(null, false)
        }
        logger.info(`Login - ${username}`)
        return done(null, user)
      })
    }
  )
)

passport.use(
  "jwt",
  new JWTStrategy(
    {
      secretOrKey: "secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        return next(error)
      }
    }
  )
)
