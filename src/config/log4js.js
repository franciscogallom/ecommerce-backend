const log4js = require("log4js")

log4js.configure({
  appenders: {
    loggerConsole: { type: "console" },
    loggerFile: { type: "file", filename: "./logs/warn.log" },
    loggerFile2: { type: "file", filename: "./logs/error.log" },
  },
  categories: {
    default: { appenders: ["loggerConsole"], level: "info" },
    fileWarn: { appenders: ["loggerFile", "loggerConsole"], level: "warn" },
    fileError: { appenders: ["loggerFile2", "loggerConsole"], level: "error" },
  },
})

module.exports = log4js
