const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const cup = require('./models/cup')
const player = require('./models/player')
const match = require('./models/match')
const game = require('./models/game')

function bindMiddlewares(app) {

  //body parser config
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  for (const spec of [
    { path: '/', template: 'home' },
    { path: '/add-cup', template: 'add-cup' },
    { path: '/add-match', template: 'add-match' },
  ]) {
    app.get(spec.url, (req, res) => {
      readFile(path.join(__dirname, `../client/${spec.template}.html`))
      .then(data => {
        res.set('Content-Type', 'text/html').send(data)
      })
      .catch(err => {
        console.error(err)
        res.status(500).end()
      })
    })
  }

  app.post('/add-cup', (req, res) => {
    const cupObject = {
      name: req.body.cupName
    }

    player.addToDb(req.body.player1Name)
    .then(playerDoc => {
      cupObject.players = [ playerDoc._id ]
    })
    .then(() => player.addToDb(req.body.player2Name))
    .then(playerDoc => {
      cupObject.players.push(playerDoc._id)
    })
    .then(() => cup.addToDb(cupObject))
    .then(cupDoc => {
      readFile(path.join(__dirname, '../client/add-cup.html'))
      .then(data => {
        res.set('Content-Type', 'text/html').send(data)
      })
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
      // (A || B) will evaluate to A if !!A and otherwise B
      return gameDoc || game.addToDb({name: req.body.gameName})
    })
    .then(gameDoc => matchObject.game = gameDoc._id)
    .then(() => cup.checkExists(req.body.cupName))
    .then(cupDoc => {
      if (!cupDoc) {
        throw new Error("the cup doesn't exist")
      }
      return cupDoc
    })
    .then(cupDoc => matchObject.cup = cupDoc._id)
    .then(() => player.checkExists(req.body.winnerName))
    .then(playerDoc => {
      if (!playerDoc) {
        throw new Error("the winner doesn't exist")
      }
      return playerDoc
    })
    // TODO check player is part of cup
    .then(playerDoc => matchObject.winner = playerDoc._id)
    .then(() => match.addToDb(matchObject))
    .then(matchDoc => {
      readFile(path.join(__dirname, '../client/add-match.html'))
      .then(data => {
        res.set('Content-Type', 'text/html').send(data)
      })
    })
    .catch(err => console.error(err))
  })
}


function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) {
        return reject(error)
      }
      resolve(data)
    })
  })
}

module.exports = {bind: bindMiddlewares}
