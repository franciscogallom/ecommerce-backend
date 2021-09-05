const transporter = require("../config/nodemailerTransporter")

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
        console.log(err)
        return err
      }
      console.log(info)
    }
  )
}

module.exports = send
