const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.render('.app/index.ejs', {})
})
  .listen(7777)
