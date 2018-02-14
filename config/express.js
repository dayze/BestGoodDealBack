const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')
const config = require('./config')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const httpStatus = require('http-status')
const expressWinston = require('express-winston')
const winstonInstance = require('./winston')
const routes = require('../server/routes/index.route')
const app = express()

if (config.env === 'development') {
  //app.use(logger('dev'))
}

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(compression())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms user: {{req.user.email}} ',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

app.use('/api', routes)

if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

module.exports = app
