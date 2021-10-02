const mongoose = require("mongoose")

async function createConnection() {
  return await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASS}@cluster0.sqkzp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
}

module.exports = createConnection
