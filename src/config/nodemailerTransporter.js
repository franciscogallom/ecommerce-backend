const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "mohammed.collier64@ethereal.email",
    pass: "JyaumcE3JZg5Zu8m1M",
  },
})

module.exports = transporter
