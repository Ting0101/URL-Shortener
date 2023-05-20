const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const shortenURL = require('./models/shortenURL')
const generateRandomString = require('./generateRandomString')
const port = 3000

const app = express()

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
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  console.log(req.query)
  let randomString = generateRandomString()
  console.log(randomString, typeof (randomString))
  shortenURL.create({ inputURL: `${req.query.inputURL}`, randomString: `${randomString}` })
    .then(() => res.render('index', {}))
    .catch(error => { console.log('error') })
})

app.listen(port, () => {
  console.log('now is running')
})
