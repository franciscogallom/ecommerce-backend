const MongoStore = require("connect-mongo")

module.exports = {
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cluster0.sqkzp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: process.env.SECRET_SESSION,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: Number(process.env.SESSION_EXPIRATION_TIME),
  },
  rolling: true,
}
