require('dotenv').config();
const path = require('path')
module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  uploadPath: path.dirname(require.main.filename || process.mainModule.filename) + '/' + process.env.UPLOAD_PATH + '/'
}