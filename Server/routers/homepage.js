import express from 'express';
import { getCategories } from '../controllers/homepageController.js';
const router = express.Router()

router.get('/', getCategories);

export default router;