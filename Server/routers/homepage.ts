import express from 'express';
import {
  homepageSearchApi,
  hompageApi,
  getUser,
  handlePutUser,
  handlePutPassword,
  snackCategory,
  foodCategory,
  drinkCategory,
} from '../controllers/homepageController';
const router = express.Router();

router.get('/', hompageApi);
router.get('/search', homepageSearchApi);
router.get('/get-user/:accessToken', getUser);
router.put('/update-user-info', handlePutUser);
router.put('/update-password', handlePutPassword);

router.get('/category/snack-category/page-:page', snackCategory);
router.get('/category/food-category/page-:page', foodCategory);
router.get('/category/drink-category/page-:page', drinkCategory);
export default router;
