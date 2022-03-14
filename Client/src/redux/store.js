import { configureStore } from '@reduxjs/toolkit';
import homePageSlice from '../components/homepage/homePageSlice'
import loginpageSlice from '../components/loginPage/loginSlice'
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        homepage: homePageSlice,
        loginpage: loginpageSlice
    },
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(mySaga)

export default store