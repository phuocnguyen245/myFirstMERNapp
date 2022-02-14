import express from 'express';
import { hompageApi, homepageSearchApi } from '../controllers/homepageController.js';
const router = express.Router()

router.get('/api/homepage', hompageApi);
router.get('/api/search', homepageSearchApi)
export default router;