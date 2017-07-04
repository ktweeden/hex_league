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

const Cup = mongoose.model('Cup', cupSchema)

function addCupToDb (cupObject) {
  return new Cup ({
    name: cupObject.cupName,
    players: [{
      playerId: cupObject.player1Id
    },
    {
      playerId: cupObject.player2Id
    }]
  }).save()
}

module.exports = {
  Cup,
  addToDb: addCupToDb
}
