const transporter = require("../config/nodemailerTransporter")
const logger = require("../config/log4js").getLogger()
const loggerError = require("../config/log4js").getLogger("fileError")

const send = (user) => {
  return transporter.sendMail(
    {
      from: "ecommerce-backend",
      to: process.env.ADMIN_EMAIL,
      subject: `Nuevo registro - ${new Date().toLocaleString()}.`,
      html: `
        <p>${user.username}</p>
        <p>${user.name}</p>
        <p>${user.address}</p>
        <p>${user.age}</p>
        <p>${user.phone}</p>
      `,
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
