const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

const send = (to) =>
  client.messages
    .create({
      body: "Su pedido ha sido recibido y se encuentra en proceso.",
      from: "+19096554391",
      to,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.log(e)
    })

module.exports = send
