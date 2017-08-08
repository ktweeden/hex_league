const mongoose = require('mongoose')

const cupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  players: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Player'} ],

  isComplete: {
    type: Boolean,
    default: false,
  }
})

const Cup = mongoose.model('Cup', cupSchema)

function addCupToDb(cupObject) {
  return new Cup ({
    name: cupObject.name,
    players: [ cupObject.player1Id, cupObject.player2Id ]
  }).save()
}


function checkCupExists(name) {
  return Cup.findOne({ name })
}

module.exports = {
  Cup,
  addToDb: addCupToDb,
  checkExists: checkCupExists
}
