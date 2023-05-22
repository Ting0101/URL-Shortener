const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenURL = new Schema({
  inputURL: {
    type: String,
    required: true
  },

  outputURL: {
    type: String,
    require: true
  }
})

module.exports = mongoose.model('ShortenURL', shortenURL)