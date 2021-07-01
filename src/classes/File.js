const fs = require("fs")

class File {
  constructor(fileName) {
    this.path = `./src/persistence/${fileName}.txt`
  }

  read() {
    const response = fs.readFileSync(this.path, "utf-8")
    return JSON.parse(response)
  }

  write(product) {
    fs.writeFileSync(this.path, JSON.stringify(product))
  }
}

module.exports = File
