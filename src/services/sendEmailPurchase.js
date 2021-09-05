const transporter = require("../config/nodemailerTransporter")

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
        console.log(err)
        return err
      }
      console.log(info)
    }
  )
}

module.exports = send
