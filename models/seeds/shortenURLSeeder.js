const mongoose = require('mongoose')
const shortenURL = require('../shortenURL')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 2; i++) {
    shortenURL.create({ inputURL: `name-${i}`, randomString: `test-1` })
  }
  console.log('done')
})