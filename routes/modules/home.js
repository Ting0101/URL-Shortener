const express = require('express')
const router = express.Router()
const shortenURL = require('../../models/shortenURL')
const generateRandomString = require('../../generateRandomString')
const server = `http://localhost:3000/`

//首頁
router.get('/', (req, res) => {
  res.render('index', {})
})

//輸入網址後資料庫先查詢inputURL是否存在，
//若存在輸出outputURL，若不存在則創建一個存於資料庫中
router.post('/', (req, res) => {
  const inputURL = req.body.inputURL
  shortenURL.findOne({ inputURL })
    .lean()
    .then((item) => {
      if (item) {
        res.render('show', { successURL: item.outputURL })
      } else {
        let randomString = generateRandomString()
        const outputURL = server + `${randomString}`
        shortenURL.create({ inputURL, outputURL })
          .then(() => res.render('show', { successURL: outputURL }))
          .catch(error => { console.log('create error') })
      }
    })
    .catch(error => { console.log('error') })
})

//短網址輸入後，資料庫查找後直接輸出，連結原始網址
router.get('/:string', (req, res) => {
  const string = req.params.string
  const outputURL = server + string
  shortenURL.findOne({ outputURL })
    .then((item) => res.redirect(item.inputURL))
    .catch((error) => console.log('error'))
})


module.exports = router