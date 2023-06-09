const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000
const routes = require('./routes')

require('./config/mongoose')
const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)


app.listen(port, () => {
  console.log('now is running')
})
