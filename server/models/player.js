const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
  name: String,

  cups:[{
    name: String,
    cupId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cup'}
  }]
})

const Player = mongoose.model('Player', playerSchema)

module.exports = { Payer }
