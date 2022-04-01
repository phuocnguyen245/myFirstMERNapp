import axios from 'axios'
import Cookies from 'js-cookie'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { getCategoriesSuccess, getHomepageDataFetch, getSearchFetch, getSearchSuccess, getShopsSuccess } from '../../components/homepage/homePageSlice'
import { getUserInfoFailure, getUserInfoFetch, getUserInfoSuccess } from '../../components/loginPage/loginSlice'
import { addToCartFailure, addToCartFetch, addToCartSuccess, getCartItemFailure, getCartItemFetch, getCartItemSuccess } from '../../components/shop/shopSlice'
import { putShopQtyFetch, putShopQtySuccess, putShopQtyFailure, deleteCartItemFetch, deleteCartItemFailure, getCartTotalFetch, getCartTotalFailure, getCartTotalSuccess, deleteAllItemFetch, deleteAllItemSuccess, deleteAllItemFailure } from '../../components/cart/cartSlice'
import { URL } from '../../constants'
const header = Cookies.get('accessToken')

function* getData() {
  const homepageApi = yield call(() => axios.get(`${URL}/homepage`))
  const data = yield homepageApi.data
  yield put(getCategoriesSuccess(data))
  yield put(getShopsSuccess(data))
}

function* searchData(action) {
  const searchApi = yield call(() => axios.get(`${URL}/homepage/search?q=${action.payload}`))
  const data = yield searchApi.data
  yield put(getSearchSuccess(data.shops))
}

function* checkData(action) {
  try {
    const userApi = yield call(() => axios.post(`${URL}/login/check-user`, action.payload, { withCredentials: true }))
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
        axios.post(`${URL}/cart/add-to-cart`, action.payload,
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
        axios.post(`${URL}/cart`, action.payload,
          { headers: { authorization: `Bearer ${header}` } }
        ))
      const data = yield fetch.data
      yield put(getCartItemSuccess(data))
    }
  } catch (error) {
    yield put(getCartItemFailure(400))
  }
}

function* putShopQty(action) {
  try {
    const fetch = yield call(() => axios.put(`${URL}/cart/change-qty`, action.payload,
      { headers: { authorization: `Bearer ${header}` } }
    ))
    const data = yield fetch.data
    yield put(putShopQtySuccess(data))
  } catch (error) {
    yield put(putShopQtyFailure(400))
  }
}

function* deleteCartItem(action) {
  try {
    console.log(action.payload);
    const fetch = yield call(() => axios.delete(`${URL}/cart/delete-cart-item/${action.payload}`,
      { headers: { authorization: `Bearer ${header}` } }
    ))
    const data = yield fetch.data
    yield put(putShopQtySuccess(data))
  } catch (error) {
    yield put(deleteCartItemFailure(400))
  }
}

function* getCartTotal(action) {
  try {
    if (header) {
      const fetch = yield call(() =>
        axios.post(`${URL}/cart/get-cart-total`, action.payload,
          { headers: { authorization: `Bearer ${header}` } }
        ))
      const data = yield fetch.data
      yield put(getCartTotalSuccess(data))
    }
  } catch (error) {
    yield put(getCartTotalFailure(400))
  }
}

function* deleteAllItem(action) {
  try {
    const fetch = yield call(() => axios.delete(`${URL}/cart/delete-all-item/${action.payload}`,
      { headers: { authorization: `Bearer ${header}` } }
    ))
    const data = yield fetch.data
    yield put(deleteAllItemSuccess(data))
  } catch (error) {
    yield put(deleteAllItemFailure(400))
  }
}
function* mySaga() {
  // Homepage
  yield takeEvery(getHomepageDataFetch.toString(), getData)
  yield takeEvery(getSearchFetch.toString(), searchData)
  // Login
  yield takeEvery(getUserInfoFetch.toString(), checkData)
  // Cart 
  yield takeLatest(addToCartFetch.toString(), addToCart)
  yield takeLatest(getCartItemFetch.toString(), getCartItem)

  yield takeEvery(putShopQtyFetch.toString(), putShopQty)
  yield takeEvery(deleteCartItemFetch.toString(), deleteCartItem)
  yield takeLatest(getCartTotalFetch.toString(), getCartTotal)
  yield takeLatest(deleteAllItemFetch.toString(), deleteAllItem)
}
export default mySaga;
