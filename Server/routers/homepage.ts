import express from 'express';
import { homepageSearchApi, hompageApi, getUser, handlePutUser, handlePutPassword } from '../controllers/homepageController';
const router = express.Router()

router.get('/', hompageApi);
router.get('/search', homepageSearchApi)
router.get('/get-user/:accessToken', getUser)
router.put('/update-user-info', handlePutUser)
router.put('/update-password', handlePutPassword)
export default router;