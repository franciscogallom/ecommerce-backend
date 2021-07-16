const mysql = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: `${process.env.MYSQL_PASS}`,
    database: `${process.env.MYSQL_DB}`,
  },
  pool: { min: 0, max: 7 },
}

module.exports = mysql
