import express from 'express';
import cart from './cart';
import homepage from './homepage';
import login from './login';
import product from './product';
import purchase from './purchase';
const router = express.Router()

router.use('/api/homepage/', homepage)
router.use('/api/cart', cart)
router.use('/api/login', login)
router.use('/api/product', product)
router.use('/api/purchase/', purchase)
export default router;