const transporter = require("../config/nodemailerTransporter")
const logger = require("../config/log4js").getLogger()
const loggerError = require("../config/log4js").getLogger("fileError")

const send = (name, username, cart) => {
  return transporter.sendMail(
    {
      from: "ecommerce-backend",
      to: process.env.ADMIN_EMAIL,
      subject: `Nuevo pedido de ${name} (${username}) - ${new Date().toLocaleString()}.`,
      html: cart.join(),
    },
    (err, info) => {
      if (err) {
        loggerError.error(err)
        return err
      }
      logger.info(info)
    }
  )
}

module.exports = send
