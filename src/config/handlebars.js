const path = require("path")

module.exports = {
  extname: ".hbs",
  defaultLayout: "index",
  layoutsDir: path.join(__dirname, "../../public/views/layouts"),
  partialsDir: path.join(__dirname, "../../public/views"),
}
