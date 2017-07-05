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

function checkPlayerExists (playerName) {
  return new Promise ((resolve, reject) => {
    Player.findOne({'name': playerName}, (error, doc) => {
      if (!!error) {
        reject(error)
      }
      resolve(doc)
    })
  })
}

module.exports = {
  Player,
  addToDb: addPlayerToDb,
  checkExists: checkPlayerExists
}
