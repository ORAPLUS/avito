// server.js
// set up ======================================================================
// get all the tools we need
var express = require('express')
var app = express()
var mongoose = require('mongoose')
var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const cors = require('cors')
var config = require('./config/config.js')
// configuration mongoose =======================================================
mongoose.Promise = global.Promise
mongoose.connect(config.url, { useMongoClient: true }) // connect to our database
// set up our express application
app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser.json()) // get information from html forms
app.use(cors())
// required for passport
require('./passport')
// routes ======================================================================
require('./routes')(app) // load our routes and pass in our app and fully configured passport
// launch ======================================================================
app.listen(config.port)
console.log('AVITO SERVER STARTED ON ' + config.port)
