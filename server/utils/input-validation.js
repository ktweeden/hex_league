const player = require('../models/player')


/**
 * TODO
 * Date input: match date before now
 * String input: accepted characters
 * Content input: check for player duplicates within the same cup
 **/

 function checkForPlayerDuplicates(newPlayerInput, cupId) {
   return (cup.findOne({_id: cupId}).populate(players)
   .then((cupDoc) => cupDoc.players)
   .then(players => {
     for (player of players) {
       if(player.name === newPlayerInput) {
         return true
       }
     }
     return false
   })
   .catch(console.error(err)))
 }
