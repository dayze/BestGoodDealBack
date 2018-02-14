const config = require('./config/config')
const app = require('./config/express')
const mongoose = require('./config/mongoose')

mongoose.connect()

app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`)
})