const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000

const app = express()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('index', {})
  console.log('short_URL progect running')
})

app.listen(port, () => {
  console.log('now is running')
})
