import axios, { AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  deleteAllItemFailure, deleteAllItemFetch,
  deleteAllItemSuccess, deleteCartItemFailure, deleteCartItemFetch, getCartTotalFailure, getCartTotalFetch, getCartTotalSuccess, putShopQtyFailure, putShopQtyFetch,
  putShopQtySuccess
} from '../../components/cart/cartSlice';
import {
  getCategoriesSuccess,
  getHomepageDataFetch,
  getSearchFetch,
  getSearchSuccess,
  getShopsSuccess
} from '../../components/homepage/homePageSlice';
import {
  getUserInfoFailure,
  getUserInfoFetch,
  getUserInfoSuccess
} from '../../components/loginPage/loginSlice';
import {
  addToCartFailure,
  addToCartFetch,
  addToCartSuccess,
  getCartItemFailure,
  getCartItemFetch,
  getCartItemSuccess
} from '../../components/shop/shopSlice';
import { URL } from '../../constants';
const header = Cookies.get('accessToken');

function* getData() {
  const homepageApi: AxiosResponse = yield call(() => axios.get(`${URL}/homepage`));
  const data: AxiosResponse = yield homepageApi.data;
  yield put(getCategoriesSuccess(data));
  yield put(getShopsSuccess(data));
}

function* searchData(action: any) {
  const searchApi: AxiosResponse = yield call(() =>
    axios.get(`${URL}/homepage/search?q=${action.payload}`)
  );
  const data: AxiosResponse = yield searchApi.data;
  yield put(getSearchSuccess(data));
}

function* checkData(action: any) {
  try {
    const userApi: AxiosResponse = yield call(() =>
      axios.post(`${URL}/login/check-user`, action.payload, { withCredentials: true })
    );
    const data: AxiosResponse = yield userApi.data;
    yield put(getUserInfoSuccess(data));
  } catch (error) {
    yield put(getUserInfoFailure(400));
  }
}

function* addToCart(action: any) {
  try {
    if (header) {
      const fetch: AxiosResponse = yield call(() =>
        axios.post(`${URL}/cart/add-to-cart`, action.payload, {
          headers: { authorization: `Bearer ${header}` },
        })
      );
      const data: AxiosResponse = yield fetch.data;
      yield put(addToCartSuccess(data));
    } else {
      yield put(addToCartFailure(400));
    }
  } catch (error) {
    yield put(addToCartFailure(400));
  }
}

function* getCartItem(action: any) {
  try {
    if (header) {
      const fetch: AxiosResponse = yield call(() =>
        axios.post(`${URL}/cart`, action.payload, {
          headers: { authorization: `Bearer ${header}` },
        })
      );
      const data: AxiosResponse = yield fetch.data;
      yield put(getCartItemSuccess(data));
    }
  } catch (error) {
    yield put(getCartItemFailure(400));
  }
}

function* putShopQty(action: any) {
  try {
    const fetch: AxiosResponse = yield call(() =>
      axios.put(`${URL}/cart/change-qty`, action.payload, {
        headers: { authorization: `Bearer ${header}` },
      })
    );
    const data: AxiosResponse = yield fetch.data;
    yield put(putShopQtySuccess(data));
  } catch (error) {
    yield put(putShopQtyFailure(400));
  }
}

function* deleteCartItem(action: any) {
  try {
    const fetch: AxiosResponse = yield call(() =>
      axios.delete(`${URL}/cart/delete-cart-item/${action.payload}`, {
        headers: { authorization: `Bearer ${header}` },
      })
    );
    const data: AxiosResponse = yield fetch.data;
    yield put(putShopQtySuccess(data));
  } catch (error) {
    yield put(deleteCartItemFailure(400));
  }
}

function* getCartTotal(action: any) {
  try {
    if (header) {
      const fetch: AxiosResponse = yield call(() =>
        axios.post(`${URL}/cart/get-cart-total`, action.payload, {
          headers: { authorization: `Bearer ${header}` },
        })
      );
      const data: AxiosResponse = yield fetch.data;
      yield put(getCartTotalSuccess(data));
    }
  } catch (error) {
    yield put(getCartTotalFailure(400));
  }
}

function* deleteAllItem(action: any) {
  try {
    const fetch: AxiosResponse = yield call(() =>
      axios.delete(`${URL}/cart/delete-all-item/${action.payload}`, {
        headers: { authorization: `Bearer ${header}` },
      })
    );
    const data: AxiosResponse = yield fetch.data;
    yield put(deleteAllItemSuccess(data));
  } catch (error) {
    yield put(deleteAllItemFailure(400));
  }
}
function* mySaga() {
  // Homepage
  yield takeEvery(getHomepageDataFetch.toString(), getData);
  yield takeEvery(getSearchFetch.toString(), searchData);
  // Login
  yield takeEvery(getUserInfoFetch.toString(), checkData);
  // Cart
  yield takeLatest(addToCartFetch.toString(), addToCart);
  yield takeLatest(getCartItemFetch.toString(), getCartItem);

  yield takeEvery(putShopQtyFetch.toString(), putShopQty);
  yield takeEvery(deleteCartItemFetch.toString(), deleteCartItem);
  yield takeLatest(getCartTotalFetch.toString(), getCartTotal);
  yield takeLatest(deleteAllItemFetch.toString(), deleteAllItem);
}
export default mySaga;
