import express from 'express';
import verify from '../middleware/auth/auth.js';
import { addToCart, renderCart, handleChangeQuantity } from '../controllers/cartController.js';
const router = express.Router()

router.post('/', verify, renderCart)
router.post('/add-to-cart', verify, addToCart)
router.post('/change-qty', verify, handleChangeQuantity)
export default router