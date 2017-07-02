const express = require('express')
const fs = require('fs')
const path = require('path')

function bindMiddlewares(app) {

  app.get('/', (req, res) => {
    readFile(path.join(__dirname, '../client/home.html'))
    .then(data => {
      res.set('Content-Type', 'text/html').send(data)
    })
    .catch(err => console.error(err))
  })
  
}


function readFile(file) {
  return new Promise(function (resolve, reject) {
    fs.readFile(file, function(error, data) {
      if (!!error) {
        return reject(error)
      }
      resolve(data)
    })
  })
}

module.exports = {bind: bindMiddlewares}
