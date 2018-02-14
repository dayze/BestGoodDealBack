const mongoose = require('mongoose')
const Schema = mongoose.Schema
const productSchema = require('./user.model')
const bcrypt = require('bcryptjs')

const UserSchema = Schema({
  //_id: Schema.Types.ObjectId, // disable because when adding new users, needed to specify the id
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
  subscriptions: [{type: Schema.Types.ObjectId, ref: 'User'}]
})

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password).then(res => res)
}

UserSchema.pre('save', async function (next) {
  try {
    let salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (e) {
    throw new Error(e)
  }
  next()
})

module.exports = mongoose.model('User', UserSchema)