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
    const cupObject = {
      name: req.body.cupName
    }

    player.addToDb(req.body.player1Name)
    .then(data => {
      cupObject.players = []
      cupObject.players.push({playerId:data._id})
    })
    .then (data => {
      player.addToDb(req.body.player2Name)
      .then(data => {
        cupObject.players.push({playerId:data._id})
        console.log(cupObject)
      })
    })
    .then(data => {
      cup.addToDb(cupObject)
    })
    .then(data => {
      readFile(path.join(__dirname, '../client/add-cup.html'))
      .then(data => {
        res.set('Content-Type', 'text/html').send(data)
      })
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
