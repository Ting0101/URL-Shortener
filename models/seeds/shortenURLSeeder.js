const db = require('../../config/mongoose')
const shortenURL = require('../shortenURL')

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 1; i++) {
    shortenURL.create({ inputURL: `https://tw.yahoo.com/`, outputURL: `http://localhost:3000/Ax37q` })
  }
  console.log('done')
})