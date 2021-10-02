const messageForm = document.querySelector("#messageForm")
const chat = document.querySelector("#chat")

const socket = io()

const chatTemplate = Handlebars.compile(`
  {{#if messages}}
    <div>
      {{#each messages}}
        <p><span style="color: blue; font-weight: bold">{{this.email}}</span> <span style="color: brown">[{{this.timestamp}}]</span>: <span style='color: green; font-style: italic'>{{this.body}}</span></p>
      {{/each}}
    </div>
  {{else}}
    <p style="color: black">Sé el primero en enviar un mensaje!</p>
  {{/if}}
`)

socket.on("messages", (messages = []) => {
  const html = chatTemplate({ messages })
  chat.innerHTML = html
})

messageForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.querySelector("#email").value
  const body = document.querySelector("#message").value
  socket.emit("new-message", {
    body,
    timestamp: new Date().toLocaleString(),
    email,
  })
  messageForm.reset()
})
