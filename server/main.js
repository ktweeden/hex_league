const express = require('express')

const db = require('./db')
const cfg = require('../cfg')
const middlewares = require('./middlewares')
const nunjucks = require('nunjucks')
const path = require('path')

const app = express()
nunjucks.configure((path.join(__dirname, '../client')), {
    autoescape: true,
    express: app
})

// Initialise database connection and begin listening on port cfg.PORT
db.initialiseDbConnection(() => {
  middlewares.bind(app)
  app.listen(cfg.PORT, () => {
    console.log(`Hex League listening on port ${cfg.PORT}`)
  })
})
