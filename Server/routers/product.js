import express from 'express';
import { getProductById } from '../controllers/homepageController.js';

const router = express.Router()

router.get('/:id', getProductById)


export default router;