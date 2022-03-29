import express from 'express';
import verify from '../middleware/auth/auth.js';
import { addToCart, renderCart, handleChangeQuantity, handleDeleteCartItem } from '../controllers/cartController.js';
const router = express.Router()

router.post('/', verify, renderCart)
router.post('/add-to-cart', verify, addToCart)
router.put('/change-qty', verify, handleChangeQuantity)
router.delete('/delete-cart-item/:id', handleDeleteCartItem)
export default router