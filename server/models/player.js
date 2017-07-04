const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
  name: String,

  cups:[{
    name: String,
    cupId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cup'}
  }]
})

const Player = mongoose.model('Player', playerSchema)


//TODO save cup to player object also - figure out order for this when creating new cup
function addPlayerToDb(playerName) {
  return new Player({
    name: playerName
  }).save()
}

module.exports = {
  Player,
  addToDb: addPlayerToDb
}
