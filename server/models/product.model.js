const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  name: {
    type: String,
    required: true
  },
  promotion: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  store: { type: Schema.Types.ObjectId, ref: 'Store' }
})

module.exports = mongoose.model('Product', ProductSchema)