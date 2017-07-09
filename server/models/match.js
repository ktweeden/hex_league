const mongoose = require('mongoose')
const cup = require('./cup')

const matchSchema = mongoose.Schema({
  date: Date,
  game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
  cup: {type: mongoose.Schema.Types.ObjectId, ref: 'Cup'},
  winner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
})

const Match = mongoose.model('Match', matchSchema)

function addMatchToDb (matchObject) {
  return new Match ({
    date: matchObject.date,
    game: matchObject.game,
    winner: matchObject.winner,
    cup: matchObject.cup
  }).save()
}

function findMatchesByCupId (cupId) {
    return Match.find({'cup': cupId}).populate('game winner')
}

module.exports = {
  Match,
  addToDb: addMatchToDb,
  findByCupId: findMatchesByCupId
}
