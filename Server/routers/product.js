import express from 'express';
import { getProductById } from '../controllers/homepageController.js';

const router = express.Router()

router.get('/:slug', getProductById)


export default router;