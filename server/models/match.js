const mongoose = require('mongoose')

const matchSchema = mongoose.Schema({
  date: Date,
  game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
  cup: {type: mongoose.Schema.Types.ObjectId, ref: 'Cup'},
  winner: {type: mongoose.Schema.Types.ObjectId, ref: 'Player'},
})

const Match = mongoose.model('Match', matchSchema)

function addMatchToDb(matchObject) {
  return new Match(matchObject).save()
}

module.exports = {
  Match,
  addToDb: addMatchToDb
}
