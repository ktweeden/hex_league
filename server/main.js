const express = require('express')
const db = require('./db')
const cfg = require('../cfg')
const middlewares = require('./middlewares')

const app = express()

//Initialise database connection and begin listening on port 3000
db.initialiseDbConnection(() => {
  app.listen(cfg.PORT, () => {
    console.log(`Hex League listening on port ${cfg.PORT}`)
  })
})


middlewares.bind(app)
