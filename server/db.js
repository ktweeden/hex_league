const mongoose = require('mongoose')
const cfg = require('../cfg')

/**
 * Opens connection to database and binds handlers
 */
function initialiseDbConnection(onDbInitialise) {
  mongoose.connect(cfg.DB_URL)
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', onDbInitialise)
}

module.exports = { initialiseDbConnection }
