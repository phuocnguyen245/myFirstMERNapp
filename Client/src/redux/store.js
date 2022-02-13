import { configureStore } from '@reduxjs/toolkit';
import homePageSlice from '../components/homepage/homePageSlice'
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer: {
        homepage: homePageSlice
    },
    middleware: [sagaMiddleware]
})
sagaMiddleware.run(mySaga)

export default store