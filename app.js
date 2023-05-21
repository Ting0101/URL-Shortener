const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const shortenURL = require('./models/shortenURL')
const generateRandomString = require('./generateRandomString')
const bodyParser = require('body-parser')
const port = 3000
const server = `http://localhost:3000/`

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
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index', {})
})

app.post('/', (req, res) => {
  // console.log(req.body)
  const inputURL = req.body.inputURL
  let randomString = generateRandomString()
  const outputURL = server + `${randomString}`

  shortenURL.create({ inputURL, outputURL })
    .then(() => res.render('show', { successURL: outputURL }))
    .catch(error => { console.log('error') })
})

app.get('/:randomString', (req, res) => {
  const string = req.params.randomString
  const outputURL = server + string
  shortenURL.findOne({ outputURL })
    .then((shortenURL) => res.redirect(shortenURL.inputURL))
    .catch((err) => console.log(err))
})

app.listen(port, () => {
  console.log('now is running')
})
