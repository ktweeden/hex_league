const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')

const cup = require('./models/cup')
const player = require('./models/player')
const match = require('./models/match')
const game = require('./models/game')

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

  app.get('/add-match', (req, res) => {
    readFile(path.join(__dirname, '../client/add-match.html'))
    .then(data => {
      res.set('Content-Type', 'text/html').send(data)
    })
    .catch(err => console.error(err))
  })

  /**
   * get the cup by name from user (through form on home page)
   * find cupId by name
   * pass cupId to /cup-summary-page as request
   * find all matches by cupId
   * render the shit out of everything
  **/



  app.get('/cup-summary-page', (req, res) => {
    res.render(path.join(__dirname, '../client/cup-summary-page.njk'), {})
  })

    //TODO should recieve matches list from redirect



  app.post('/add-cup', (req, res) => {
    const cupObject = {
      name: req.body.cupName
    }

    player.addToDb(req.body.player1Name)
    .then(data => {
      cupObject.players = []
      cupObject.players.push({playerId:data._id})
    })
    .then (() => player.addToDb(req.body.player2Name))
    .then(data => {
      cupObject.players.push({playerId:data._id})
      console.log(cupObject)
    })
    .then(() => cup.addToDb(cupObject))
    .then(console.log)

    .then(() => {
      readFile(path.join(__dirname, '../client/add-cup.html'))
      .then(data => {
        res.set('Content-Type', 'text/html').send(data)
      })
    })
    .catch(err => console.error(err))
  })

  app.post('/cup-summary-page', (req, res) => {
    console.log(req.body)
    cup.checkExists(req.body.cupName)
    .then(cupDoc => match.findByCupId(cupDoc._id))
    .then(matches => {
      console.log(matches)
      res.render(path.join(__dirname, '../client/cup-summary-page.njk'),
      {matchList: matches})
    })
    .catch(err => console.error(err))
  })

  app.post('/add-match', (req, res) => {
    console.log(req.body)

    const matchObject = {
      date: req.body.datePlayed
    }

    game.checkExists(req.body.gameName)
    .then(gameDoc => {
      if (!gameDoc) {
        return game.addToDb({name: req.body.gameName})
      }
      else {
        return gameDoc
      }
    })
    .then(gameDoc => {matchObject.game = gameDoc._id})
    .then(() => cup.checkExists(req.body.cupName))
    .then(cupDoc => {
      if (!cupDoc) {
        throw new Error("the cup doesn't exist")
      }
      return cupDoc
    })
    .then(cupDoc => {matchObject.cup = cupDoc._id})
    .then(() => player.checkExists(req.body.winnerName))
    .then(playerDoc => {
      if (!playerDoc) {
        throw new Error("the winner doesn't exist")
      }
      return playerDoc
    })
    .then(playerDoc => {matchObject.winner = playerDoc._id})
    .then(() => match.addToDb(matchObject))
    .then(console.log)
    .then(() => {
      readFile(path.join(__dirname, '../client/add-match.html'))
      .then(data => {
        res.set('Content-Type', 'text/html').send(data)
      })
    })
    .catch(err => console.error(err))
    //TODO check player is part of cup
  })
}


function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (!!error) {
        return reject(error)
      }
      resolve(data)
    })
  })
}

module.exports = {bind: bindMiddlewares}
