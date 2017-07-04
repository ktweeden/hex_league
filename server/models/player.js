const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
  name: String,
})

const Player = mongoose.model('Player', playerSchema)


function addPlayerToDb(playerName) {
  return new Player({
    name: playerName
  }).save()
}

module.exports = {
  Player,
  addToDb: addPlayerToDb
}
