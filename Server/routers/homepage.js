import express from 'express';
import { homepageSearchApi, hompageApi } from '../controllers/homepageController.js';
const router = express.Router()

router.get('/', hompageApi);
router.get('/search', homepageSearchApi)



export default router;