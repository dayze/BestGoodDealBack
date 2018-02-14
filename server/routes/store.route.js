const express = require('express')
const expressJwt = require('express-jwt')
const storeController = require('../controllers/store.controller')
const config = require('../../config/config')


const router = express.Router()

router.route('/').
  post(expressJwt({secret: config.jwtSecret}), storeController.create)

router.route('/findByLocation').
  get(expressJwt({secret: config.jwtSecret}), storeController.findByLocation)


module.exports = router