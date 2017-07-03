const mongoose = require('mongoose')

const cupSchema = mongoose.Schema({
  name: String,

  players: [{
    playerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
  }],

  matches: [{
    matchId: {type: mongoose.Schema.Types.ObjectId, ref: 'Match'},
    winner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
  }],

  isComplete: Boolean

})

const Game = mongoose.model('Game', gameSchema)

module.exports = { Game }
