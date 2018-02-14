const Product = require('../models/product.model')
const User = require('../models/user.model')
const config = require('../../config/config')
const mongoose = require('../../config/mongoose')

mongoose.connect()

Product.find({}).then((products) => {
  for (let i = 0; i < products.length; i++) {
    if (i < 7) {
      Product.findOneAndUpdate({_id: products[i]._id},
        {store: '5a8066e0bd1da446e012bae2'}
      ).then(() => {

      })

    } else {
      Product.findOneAndUpdate({_id: products[i]._id},
        {store: '5a8066f5bd1da446e012bae3'}
      ).then(() => {

      })

    }

  }
})
