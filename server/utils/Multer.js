const multer = require('multer')
const config = require('./../../config/config')
const UPLOAD_PATH = 'picturesFromUsers'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${config.uploadPath}/${UPLOAD_PATH}`)
  },
  filename: function (req, file, cb) {
    let extension = file.originalname.split('.')[1]
    let renamedFile = `${Date.now()}.${extension}`
    cb(null, renamedFile)
  }
})

module.exports = multer({storage})

