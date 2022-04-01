import express from 'express';
import { getOrderInfor } from '../controllers/cartController.js';

const router = express.Router()

router.post('/get-order-info/type', getOrderInfor)

export default router;