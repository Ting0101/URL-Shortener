const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
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
  res.render('index', {})
  console.log('short_URL progect running')
})

app.listen(port, () => {
  console.log('now is running')
})
