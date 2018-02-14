const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = Schema({
  name: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  lng: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],

})

module.exports = mongoose.model('Store', StoreSchema)