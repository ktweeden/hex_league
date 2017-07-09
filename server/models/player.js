const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
  name: {type: String, required: true},
})

const Player = mongoose.model('Player', playerSchema)

function addPlayerToDb(name) {
  return new Player({ name }).save()
}

function checkPlayerExists(name) {
  return Player.findOne({ name })
}

module.exports = {
  Player,
  addToDb: addPlayerToDb,
  checkExists: checkPlayerExists
}
