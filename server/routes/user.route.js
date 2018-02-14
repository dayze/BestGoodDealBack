const express = require('express')
const expressJwt = require('express-jwt')
const config = require('../../config/config')
const userController = require('../controllers/user.controller')
const router = express.Router()

router.route('/').
  post(userController.create)

/****** SUBSCRIPTION *******/
router.route('/subscribe').
  post(expressJwt({secret: config.jwtSecret}), userController.subscribe)

router.route('/subscriptions').
  get(expressJwt({secret: config.jwtSecret}), userController.subscriptions)

module.exports = router