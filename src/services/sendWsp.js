const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const logger = require("../config/log4js").getLogger()
const loggerError = require("../config/log4js").getLogger("fileError")

const send = (name, username) =>
  client.messages
    .create({
      body: `Nueva compra - ${name} (${username}).`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${process.env.ADMIN_PHONE}`,
    })
    .then((res) => {
      logger.info(res)
    })
    .catch((e) => {
      loggerError.error(e)
    })

module.exports = send
