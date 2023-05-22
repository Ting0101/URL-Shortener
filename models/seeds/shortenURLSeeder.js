const db = require('../../config/mongoose')
const shortenURL = require('../shortenURL')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 2; i++) {
    shortenURL.create({ inputURL: `name-${i}`, outputURL: `test-1` })
  }
  console.log('done')
})