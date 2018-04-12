/**
 *
 * @author Adda Skogberg
 * @version 1.0
 */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('./config/mongoose.js')
// const session = require('express-session')
const app = express()
const path = require('path')

app.set('port', process.env.PORT || 3000)

// Connect to mongodb.
mongoose.run().catch(error => {
  console.error(error)
  process.exit(1)
})

// Parse application encoding
app.use(bodyParser.urlencoded({ extended: true }))

// Serve static files.
app.use(express.static(path.join(__dirname, 'public')))

// body-Parser
app.use(bodyParser.urlencoded({extended: true}))

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + ' ; press ctrl-c to terminate')
})
