const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const cup = require('./models/cup')
const player = require('./models/player')

function bindMiddlewares(app) {

  //body parser config
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.get('/', (req, res) => {
    readFile(path.join(__dirname, '../client/home.html'))
    .then(data => {
      res.set('Content-Type', 'text/html').send(data)
    })
    .catch(err => console.error(err))
  })

  app.get('/add-cup', (req, res) => {
    readFile(path.join(__dirname, '../client/add-cup.html'))
    .then(data => {
      res.set('Content-Type', 'text/html').send(data)
    })
    .catch(err => console.error(err))
  })

  app.post('/add-cup', (req, res) => {
    player.addToDb(req.body.player1Name)
    .then(newPlayer => {
      console.log(newplayer)
    })
    .catch(err => console.error(err))
    const player2 = player.addToDb(req.body.player2Name)
    const cupObject = {

    }
    /**
     * Parse out response into object
     * Foreach player:
     * Check if exists
     * Add player id to object if they exist
     * Create new player if they don't exist and add id to object
     * Add cupObject to DB
    **/

    console.log(req.body)

    readFile(path.join(__dirname, '../client/add-cup.html'))
    .then(data => {
      res.set('Content-Type', 'text/html').send(data)
    })
    .catch(err => console.error(err))
  })

}


function readFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, function(error, data) {
      if (!!error) {
        return reject(error)
      }
      resolve(data)
    })
  })
}

module.exports = {bind: bindMiddlewares}
