const express = require('express')
const exphbs = require('express-handlebars')
const shortenURL = require('./models/shortenURL')
const generateRandomString = require('./generateRandomString')
const bodyParser = require('body-parser')
const port = 3000
const server = `http://localhost:3000/`

require('./config/mongoose')
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index', {})
})

//輸入網址後資料庫先查詢inputURL是否存在，
//若存在輸出outputURL，若不存在則創建一個存於資料庫中
app.post('/', (req, res) => {
  const inputURL = req.body.inputURL
  let randomString = generateRandomString()
  const outputURL = server + `${randomString}`

  shortenURL.findOne({ inputURL })
    .lean()
    .then((item) => {
      if (item) {
        res.render('show', { successURL: item.outputURL })
      } else {
        shortenURL.create({ inputURL, outputURL })
          .then(() => res.render('show', { successURL: outputURL }))
          .catch(error => { console.log('create error') })
      }
    })
    .catch(error => { console.log('error') })
})

//短網址輸入後，資料庫查找後直接輸出，連結原始網址
app.get('/:string', (req, res) => {
  const string = req.params.string
  const outputURL = server + string
  shortenURL.findOne({ outputURL })
    .then((item) => res.redirect(item.inputURL))
    .catch((error) => console.log('error'))
})

app.listen(port, () => {
  console.log('now is running')
})
