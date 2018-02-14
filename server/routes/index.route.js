const express = require('express')

const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const productRoutes = require('./product.route')
const storeRoutes = require('./store.route')
const router = express.Router()

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.get('/debug', (req, res) => {
  res.send('debug')
})
// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

//mounter product routes at /product
router.use('/product', productRoutes)

//mounter store routes at /store
router.use('/store', storeRoutes)

module.exports = router