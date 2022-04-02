import express from 'express';
import { getOrderInfor, handleReBuy } from '../controllers/cartController.js';

const router = express.Router()

router.post('/get-order-info/type', getOrderInfor)
router.post('/re-add-to-cart', handleReBuy)
export default router;