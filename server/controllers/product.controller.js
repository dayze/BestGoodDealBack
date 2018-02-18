const {getDistance} = require('../utils/Geolocation')
const jwt = require('jsonwebtoken')
const Product = require('../models/product.model')
const User = require('../models/user.model')
const Store = require('../models/store.model')
const config = require('../../config/config')
const base64 = require('base64-img')
module.exports = {
  uploadPicture: (req, res) => {
    let product = new Product(req.body)
    product.user = req.user.id
    product.store = req.body.store
    product.imagePath = req.file.path
    product.save().then((product) => {
      User.findOneAndUpdate({_id: req.user.id},
        {$push: {products: product._id}}).then((user) => {})
      Store.findOneAndUpdate({_id: req.body.store},
        {$push: {products: product._id}}).then((user) => {})
      res.json(product)
    }).catch((err) => {
      res.status(500).json('Une erreur s\'est produite')
    })
  },
  getAll: (req, res) => {
    Product.find({}).then((products) => {
      for (let product of products) {
        product.imagePath = base64.base64Sync(product.imagePath)
      }
      res.json(products)
    })
  },
  getByUser (req, res) {
    Product.find({user: req.query.user_id}).populate('user').then((result) => {
      res.json(result)
    }).catch((err) => {
      res.status(500).json('Une erreur s\'est produite')
    })
  },
  lastProductsFromSubscriber: (req, res) => {
    User.findOne({_id: req.user.id}).populate({
      path: 'subscriptions',
      populate: [
        {
          path: 'products',
          populate: {
            path: 'user',
            select: 'email'
          }
        },
        {
          path: 'products',
          populate: {
            path: 'store',
            select: 'name'
          }
        }
      ]    }).then((user) => {
      let products = []
      for (let subscriber of user.subscriptions) {
        for (let product of subscriber.products) {
          products.push({
            _id: product._id,
            name: product.name,
            user: product.user.email,
            promotion: product.promotion,
            store: product.store.name,
            imagePath: base64.base64Sync(
              product.imagePath)
          })
        }
      }
      res.json(products)
    }).catch((err) => {
      res.status(500).json(err)
    })
  },
  nearProducts: (req, res) => {
    let {lat, lng} = req.query
    Store.find({}).populate([
      {
        path: 'products',
        populate: {
          path: 'user',
          select: 'email'
        }
      },


    ]).then((stores) => {
      let products = []
      for (let store of stores) {
        let distance = getDistance({lat, lng}, {lat: store.lat, lng: store.lng})
        if (distance < 1500) {
          for (let product of store.products) {
            products.push({
              _id: product._id,
              name: product.name,
              user: product.user.email,
              promotion: product.promotion,
              imagePath: base64.base64Sync(
                product.imagePath)
            })
          }
        }
      }
      res.json(products)
    }).catch((err) => {
      console.log('ERROR', err)
      res.status(500).json(err)
    })
  }

}
