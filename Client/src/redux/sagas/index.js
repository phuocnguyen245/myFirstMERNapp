import axios from 'axios'
import Cookies from 'js-cookie'
import { call, put, takeEvery } from 'redux-saga/effects'
import { getCategoriesSuccess, getHomepageDataFetch, getSearchFetch, getSearchSuccess, getShopsSuccess } from '../../components/homepage/homePageSlice'
import { getUserInfoFailure, getUserInfoFetch, getUserInfoSuccess } from '../../components/loginPage/loginSlice'
import { addToCartFailure, addToCartFetch, addToCartSuccess, getCartItemFailure, getCartItemFetch, getCartItemSuccess } from '../../components/shop/shopSlice'

const header = Cookies.get('accessToken')

function* getData() {
    const homepageApi = yield call(() => axios.get('http://localhost:5000/api/homepage'))
    const data = yield homepageApi.data
    yield put(getCategoriesSuccess(data))
    yield put(getShopsSuccess(data))
}

function* searchData(action) {
    const searchApi = yield call(() => axios.get(`http://localhost:5000/api/homepage/search?q=${action.payload}`))
    const data = yield searchApi.data
    yield put(getSearchSuccess(data.shops))
}

function* checkData(action) {
    try {
        const userApi = yield call(() => axios.post('http://localhost:5000/api/login/check-user', action.payload, { withCredentials: true }))
        const data = yield userApi.data
        yield put(getUserInfoSuccess(data))
    } catch (error) {
        yield put(getUserInfoFailure(400));
    }
}

function* addToCart(action) {
    try {
        if (header) {
            const fetch = yield call(() =>
                axios.post('http://localhost:5000/api/cart/add-to-cart', action.payload,
                    { headers: { authorization: `Bearer ${header}` } }
                ))
            const data = yield fetch.data
            yield put(addToCartSuccess(data))
        } else {
            yield put(addToCartFailure(400))
        }
    } catch (error) {
        yield put(addToCartFailure(400))
    }
}

function* getCartItem(action) {
    try {
        if (header) {
            const fetch = yield call(() =>
                axios.post('http://localhost:5000/api/cart', action.payload,
                    { headers: { authorization: `Bearer ${header}` } }
                ))
            const data = yield fetch.data
            yield put(getCartItemSuccess(data))
        }

    } catch (error) {
        yield put(getCartItemFailure(400))
    }
}
function* mySaga() {
    yield takeEvery(getHomepageDataFetch.toString(), getData)
    yield takeEvery(getSearchFetch.toString(), searchData)
    yield takeEvery(getUserInfoFetch.toString(), checkData)
    yield takeEvery(addToCartFetch.toString(), addToCart)
    yield takeEvery(getCartItemFetch.toString(), getCartItem)
}
export default mySaga;
