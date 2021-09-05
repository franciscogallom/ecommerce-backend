const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const send = (name, username) =>
  client.messages
    .create({
      body: `Nueva compra - ${name} (${username}).`,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${process.env.ADMIN_PHONE}`,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })

module.exports = send
