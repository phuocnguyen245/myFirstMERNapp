import express from 'express';
import verify from '../middleware/auth/auth';
import {
    addToCart, renderCart, handleChangeQuantity, handleDeleteCartItem, getCartTotal,
    handleDeleteAllItems, handleCheckOut
} from '../controllers/cartController';
const router = express.Router()

router.post('/', verify, renderCart)
router.post('/add-to-cart', verify, addToCart)
router.put('/change-qty', verify, handleChangeQuantity)
router.delete('/delete-cart-item/:id', handleDeleteCartItem)
router.post('/get-cart-total', getCartTotal)
router.delete('/delete-all-item/:id', handleDeleteAllItems)
router.post('/check-out', handleCheckOut)

export default router