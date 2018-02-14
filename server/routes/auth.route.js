const express = require('express')
const expressJwt = require('express-jwt')
const authController = require('../controllers/auth.controller')
const config = require('../../config/config')

const router = express.Router()

/** POST /api/auth/login - Returns token if correct username and password is provided */
/** data: token, email
 *  error: false
 *  msg: ""
 */
router.route('/login')
  .post(authController.login)

module.exports = router