const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  title: String,
  type: String,
  playerNumber: Number

})

const Game = mongoose.model('Game', gameSchema)

module.exports = { Game }
