import express from 'express';
import verify from '../middleware/auth/auth.js';
import { addToCart, renderCart } from '../controllers/cartController.js';
const router = express.Router()

router.post('/', verify, renderCart)
router.post('/add-to-cart', verify, addToCart)
router.post('/', verify, renderCart)
export default router