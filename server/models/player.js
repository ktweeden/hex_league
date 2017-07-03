const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
  name: String,

  cups:[{
    title: String,
    cupId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cup'}
  }]
})

const Player = mongoose.model('Player', playerSchema)

module.exports = { Payer }
