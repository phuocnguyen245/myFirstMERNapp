import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import cartSlice from '../components/cart/cartSlice';
import homePageSlice from '../components/homepage/homePageSlice';
import loginpageSlice from '../components/loginPage/loginSlice';
import shopSlice from '../components/shop/shopSlice';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    homepage: homePageSlice,
    loginpage: loginpageSlice,
    shop: shopSlice,
    cart: cartSlice,
  },
  middleware: [sagaMiddleware],
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
sagaMiddleware.run(mySaga);

export default store;
