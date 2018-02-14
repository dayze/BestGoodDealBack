const mongoose = require('mongoose')
const config = require('./config')
mongoose.Promise = global.Promise

module.exports = {
  connect () {
    mongoose.connect(`${config.dbHost}`, {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useMongoClient: true
    })
      .then(() => console.log('MongoDB started'))
      .catch((err) => console.log(err))
  }
}