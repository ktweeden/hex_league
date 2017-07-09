const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  //type: String,
  //playerNumber: Number
})

const Game = mongoose.model('Game', gameSchema)

function addGameToDb(gameObject) {
  return new Game(gameObject).save()
}

function checkGameExists(name) {
  return Game.findOne({ name })
}

module.exports = {
  Game,
  addToDb: addGameToDb,
  checkExists: checkGameExists
}
