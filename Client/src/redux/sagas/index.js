import { call, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'
import { getCategoriesSuccess, getShopSuccess, getSearchSuccess } from '../../components/homepage/homePageSlice'

function* getData(action) {
    const homepageApi = yield call(() => axios.get('http://localhost:5000/api/homepage/'))
    const data = yield homepageApi.data
    yield put(getCategoriesSuccess(data.categories))
    yield put(getShopSuccess(data.shops))
}

function* searchData(action) {
    const searchApi = yield call(() => axios.get(`http://localhost:5000/api/search?q=${action.payload}`))
    const data = yield searchApi.data
    yield put(getSearchSuccess(data.shops))
}

function* mySaga() {
    yield takeEvery('homepage/getHomepageDataFetch', getData)
    yield takeEvery('homepage/getSearchFetch', searchData)
}
export default mySaga;
