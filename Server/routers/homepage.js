import express from 'express';
import verify from '../middleware/auth/auth.js';
import {
    hompageApi, homepageSearchApi, getProductById, addUser,
    checkUser
} from '../controllers/homepageController.js';
const router = express.Router()

router.get('/api/homepage', verify, hompageApi);
router.get('/api/search', homepageSearchApi)
router.get('/api/product/:id', getProductById)
router.post('/api/add-user', verify, addUser)
router.post('/api/check-user', checkUser)
export default router;