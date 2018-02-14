const express = require('express')
const expressJwt = require('express-jwt')
const productController = require('../controllers/product.controller')
const config = require('../../config/config')
const {multerUpload} = require('../utils')

const router = express.Router()


router.route('/')
  .get(expressJwt({secret: config.jwtSecret}), productController.getAll)

router.route('/user')
  .get(expressJwt({secret: config.jwtSecret}), productController.getByUser)

/** POST /api/product/uploadPicture - Create new picture data*/
router.route('/uploadPicture')
  .post(expressJwt({secret: config.jwtSecret}), multerUpload.single('picture'), productController.uploadPicture)

router.route('/lastProductsFromSubscriber').
  get(expressJwt({secret: config.jwtSecret}), productController.lastProductsFromSubscriber)

router.route('/nearProducts').
  get(expressJwt({secret: config.jwtSecret}), productController.nearProducts)


module.exports = router