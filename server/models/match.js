const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
  date: Date,
  game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
  cup: {type: mongoose.Schema.Types.ObjectId, ref: 'Cup'},
  winner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},

  players: [{
    playerId: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'}
  }]

})

const Match = mongoose.model('Match', matchSchema)

module.exports = { Match }
