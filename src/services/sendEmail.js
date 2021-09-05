const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "mohammed.collier64@ethereal.email",
    pass: "JyaumcE3JZg5Zu8m1M",
  },
})

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
