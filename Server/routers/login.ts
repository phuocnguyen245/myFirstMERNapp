import express from 'express';
import {
    addUser,
    checkUser,
    logout
} from '../controllers/homepageController';
const router = express.Router()
router.get('/logout', logout)
router.post('/add-user', addUser)
router.post('/check-user', checkUser)

export default router;