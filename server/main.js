const express = require('express')
const db = require('./db')
const cfg = require('../cfg')
const middlewares = require('./middlewares')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('../client', {
    autoescape: true,
    express: app
}


//Initialise database connection and begin listening on port 3000
db.initialiseDbConnection(() => {
  app.listen(cfg.PORT, () => {
    console.log(`Hex League listening on port ${cfg.PORT}`)
  })
})


middlewares.bind(app)
