const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const logger = require("../config/log4js").getLogger()
const loggerError = require("../config/log4js").getLogger("fileError")

const send = (to) =>
  client.messages
    .create({
      body: "Su pedido ha sido recibido y se encuentra en proceso.",
      from: "+19096554391",
      to,
    })
    .then((res) => {
      logger.info(res)
    })
    .catch((e) => {
      loggerError.error(e)
    })

module.exports = send
