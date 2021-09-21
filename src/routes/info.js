const router = require("express").Router()

router.get("/", (req, res) => {
  const info = {
    usoDeMemoria: process.memoryUsage(),
    versionDeNode: process.version,
    pathDeEjecucion: process.execPath,
    SO: process.platform,
    argumentosDeEntrada: process.argv,
    idDelproceso: process.pid,
    carpetaCorriente: process.cwd(),
    numerosDeCPU: require("os").cpus().length,
  }
  res.render("info", info)
})

module.exports = router
