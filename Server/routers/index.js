import express from 'express';
import cart from './cart.js';
import homepage from './homepage.js';
import login from './login.js';
import product from './product.js'
import purchase from './purchase.js';
const router = express.Router()

router.use('/api/homepage/', homepage)
router.use('/api/cart', cart)
router.use('/api/login', login)
router.use('/api/product', product)
router.use('/api/purchase/', purchase)
export default router;