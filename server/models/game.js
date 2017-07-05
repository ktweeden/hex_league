const mongoose = require('mongoose')

const gameSchema = mongoose.Schema({
  name: String,
  //type: String,
  //playerNumber: Number

})

const Game = mongoose.model('Game', gameSchema)

function addGameToDb (gameObject) {
  return new Game ({
    name: gameObject.name
  }).save()
}

function checkGameExists (gameName) {
  return new Promise ((resolve, reject) => {
    Game.findOne({'name': gameName}, (error, doc) => {
      if (!!error) {
        reject(error)
      }
      resolve(doc)
    })
  })
}

module.exports = {
  Game,
  addToDb: addGameToDb,
  checkExists: checkGameExists
}
