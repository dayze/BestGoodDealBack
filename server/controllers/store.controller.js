const jwt = require('jsonwebtoken')
const Store = require('../models/store.model')
const config = require('../../config/config')
const {getDistance} = require('../utils/Geolocation')
module.exports = {
  create (req, res) {
    let store = new Store(req.body)
    store.save().then((result) => {
      res.json(result)
    }).catch((err) => {
      console.log('ERROR', err)
      res.status(500).json('Une erreur s\'est produite')
    })
  },
  findByLocation (req, res) { // 1500 meters
    let storeLocalisation = {lat: req.query.lat, lng: req.query.lng}
    Store.find().then((stores) => {
      let result = []
      for (let store of stores) {
        let distance = getDistance(storeLocalisation, {lat: store.lat, lng: store.lng})
        if (distance < 1500) {
          result.push(store)
        }
      }
      res.json(result)
    }).catch((err) => {
      console.log('ERROR', err)
      res.status(500).json('Une erreur s\'est produite')
    })
  }
}
