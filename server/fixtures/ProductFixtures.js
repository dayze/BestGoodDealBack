const Product = require('../models/product.model')
const User = require('../models/user.model')
const config = require('../../config/config')
const mongoose = require('../../config/mongoose')

mongoose.connect()

Product.findByIdAndRemove({_id: '5a897b78db0bbd1a3fab1140'}).then((products) => {
  console.log(products)
})
