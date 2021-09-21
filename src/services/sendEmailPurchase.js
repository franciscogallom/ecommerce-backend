const transporter = require("../config/nodemailerTransporter")
const logger = require("../config/log4js").getLogger()
const loggerError = require("../config/log4js").getLogger("fileError")

const send = (to, name) => {
  return transporter.sendMail(
    {
      from: "ecommerce-backend",
      to,
      subject: `Gracias por su compra ${name} - ${new Date().toLocaleString()}.`,
      html: "Enviaremos su pedido en breve.",
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
