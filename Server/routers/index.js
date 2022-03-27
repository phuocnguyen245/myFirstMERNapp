import express from 'express';
import cart from './cart.js';
import homepage from './homepage.js';
import login from './login.js';
import product from './product.js'
const router = express.Router()

router.use('/api/homepage/', homepage)
router.use('/api/cart', cart)
router.use('/api/login', login)
router.use('/api/product', product)
export default router;